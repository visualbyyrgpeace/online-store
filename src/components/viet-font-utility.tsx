"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type DragEvent, type PointerEvent as ReactPointerEvent } from "react";
import { DownloadIcon, RefreshIcon, UploadIcon } from "@/components/utilities/tool-icons";
import { buildFont, type BuildResult } from "@/lib/font-vi/emit";
import { openFont, type FontModel } from "@/lib/font-vi/font";
import { pathBBox, pathToSvgD, transformPath, type Path } from "@/lib/font-vi/outline";
import { createPlan, defaultParams, type CustomPaths, type Overrides, type Params, type Plan, type PlannedGlyph } from "@/lib/font-vi/plan";
import { MARK_LABEL, VI_PRECOMPOSED, hex4, type MarkKind } from "@/lib/font-vi/vi";
import { fitPath, parseSvgToPath, scaleAround } from "@/lib/font-vi/svg";
import { toWoff } from "@/lib/font-vi/woff";

const STEPS = ["Import", "Phân tích", "Glyph", "Unicode", "Kỹ thuật", "Kiểm tra", "Xuất font"];
const SAMPLE = "Tiếng Việt: Ấn ắc Ầm ẩn ẫn ặc Ơn ớ ờ ở ỡ ợ Ưu ứ ừ ử ữ ự Đđ";

const btn =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 text-sm font-medium text-slate-800 transition hover:border-slate-900 disabled:cursor-not-allowed disabled:opacity-50";
const btnPrimary =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-black px-4 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300";
const card = "rounded-2xl border border-slate-200 bg-white p-5";

function saveBlob(data: Uint8Array, filename: string, type: string) {
  const blob = new Blob([data as unknown as BlobPart], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

const flip = (path: Path): Path =>
  transformPath(path, 1, 0, 0).map((s) => {
    if (s[0] === "Z") return s;
    const out = [...s] as (string | number)[];
    for (let i = 2; i < out.length; i += 2) out[i] = -(out[i] as number);
    return out as unknown as Path[number];
  });

function partPaths(m: FontModel, plan: Plan, g: PlannedGlyph): { d: string; role: string }[] {
  return g.parts.map((p) => {
    const src = p.gid !== undefined ? m.path(p.gid) : (plan.customPaths.get(p.key as string)?.path ?? []);
    return { d: pathToSvgD(flip(transformPath(src, p.s, p.dx, p.dy))), role: p.role };
  });
}

function GlyphSvg({ upem, adv, layers, height = 220 }: { upem: number; adv: number; layers: { d: string; role: string }[]; height?: number }) {
  const w = Math.max(adv, upem * 0.4) + upem * 0.5;
  return (
    <svg viewBox={`${-upem * 0.25} ${-upem * 1.4} ${w} ${upem * 1.75}`} style={{ height }} className="w-full rounded-xl bg-slate-50" aria-hidden="true">
      <line x1={-upem * 0.25} x2={w} y1={0} y2={0} stroke="#cbd5e1" strokeWidth={upem * 0.004} />
      <line x1={0} x2={0} y1={-upem * 1.4} y2={upem * 0.35} stroke="#e2e8f0" strokeWidth={upem * 0.004} />
      <line x1={adv} x2={adv} y1={-upem * 1.4} y2={upem * 0.35} stroke="#e2e8f0" strokeWidth={upem * 0.004} />
      {layers.map((l, i) => (
        <path key={i} d={l.d} fill={l.role === "base" ? "#0f172a" : "#e11d48"} fillRule="nonzero" />
      ))}
    </svg>
  );
}

function PathEditor({ path, onChange }: { path: Path; onChange: (p: Path) => void }) {
  const ref = useRef<SVGSVGElement>(null);
  const drag = useRef<{ seg: number; idx: number } | null>(null);
  const bb = pathBBox(path) ?? [0, 0, 100, 100];
  const pad = Math.max(bb[2] - bb[0], bb[3] - bb[1]) * 0.25 + 10;
  const vb = `${bb[0] - pad} ${-bb[3] - pad} ${bb[2] - bb[0] + pad * 2} ${bb[3] - bb[1] + pad * 2}`;
  const r = Math.max(bb[2] - bb[0], bb[3] - bb[1]) / 45 + 1;
  const pts: { seg: number; idx: number; x: number; y: number; on: boolean }[] = [];
  path.forEach((s, seg) => {
    if (s[0] === "Z") return;
    const n = (s.length - 1) / 2;
    for (let k = 0; k < n; k++) pts.push({ seg, idx: k, x: s[1 + k * 2] as number, y: s[2 + k * 2] as number, on: k === n - 1 });
  });
  const move = (e: ReactPointerEvent<SVGCircleElement>) => {
    const d = drag.current;
    const svg = ref.current;
    if (!d || !svg) return;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(ctm.inverse());
    const next = path.map((s, i) => {
      if (i !== d.seg || s[0] === "Z") return s;
      const c = [...s] as (string | number)[];
      c[1 + d.idx * 2] = Math.round(p.x);
      c[2 + d.idx * 2] = Math.round(-p.y);
      return c as unknown as Path[number];
    });
    onChange(next);
  };
  return (
    <svg ref={ref} viewBox={vb} className="h-64 w-full touch-none rounded-xl bg-slate-50">
      <path d={pathToSvgD(flip(path))} fill="#0f172a" fillOpacity={0.85} />
      {pts.map((p) => (
        <circle
          key={`${p.seg}-${p.idx}`}
          cx={p.x}
          cy={-p.y}
          r={r}
          fill={p.on ? "#e11d48" : "#fff"}
          stroke="#e11d48"
          strokeWidth={r / 3}
          className="cursor-grab"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            drag.current = { seg: p.seg, idx: p.idx };
          }}
          onPointerMove={move}
          onPointerUp={() => {
            drag.current = null;
          }}
        />
      ))}
    </svg>
  );
}

function Slider({ label, value, min, max, step = 1, onChange }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="flex justify-between text-sm text-slate-600">
        {label}
        <span className="tabular-nums text-slate-900">{value}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-1 w-full accent-black" />
    </label>
  );
}

const BLOCKS: { name: string; from: number; to: number }[] = [
  { name: "Basic Latin", from: 0x20, to: 0x7e },
  { name: "Latin-1", from: 0xa0, to: 0xff },
  { name: "Latin Extended-A", from: 0x100, to: 0x17f },
  { name: "Latin Extended-B", from: 0x180, to: 0x24f },
  { name: "Dấu rời (0300–036F)", from: 0x300, to: 0x36f },
  { name: "Latin Extended Additional", from: 0x1e00, to: 0x1eff },
];

export function VietFontUtility() {
  const [step, setStep] = useState(0);
  const [model, setModel] = useState<FontModel | null>(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [drop, setDrop] = useState(false);
  const [sel, setSel] = useState<number[]>([]);
  const [params, setParams] = useState<Params | null>(null);
  const [overrides, setOverrides] = useState<Overrides>({});
  const [custom, setCustom] = useState<CustomPaths>({});
  const [nfd, setNfd] = useState(true);
  const [widen, setWiden] = useState(true);
  const [suffix, setSuffix] = useState("VN");
  const [cp, setCp] = useState<number | null>(null);
  const [editKey, setEditKey] = useState("");
  const [svgMsg, setSvgMsg] = useState("");
  const [hornAll, setHornAll] = useState(true);
  const [built, setBuilt] = useState<BuildResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [sample, setSample] = useState(SAMPLE);
  const [previewFamily, setPreviewFamily] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function load(file: File) {
    setError("");
    try {
      const m = openFont(await file.arrayBuffer());
      const missing = VI_PRECOMPOSED.filter((c) => !m.cmap.has(c));
      setModel(m);
      setFileName(file.name);
      setSel(missing);
      setParams(defaultParams(m));
      setOverrides({});
      setCustom({});
      setBuilt(null);
      setCp(missing[0] ?? null);
      setEditKey("");
      setStep(1);
    } catch (e) {
      setModel(null);
      setError(e instanceof Error ? e.message : "Không đọc được font.");
    }
  }

  const planState = useMemo<{ plan: Plan | null; error: string }>(() => {
    if (!model || !params) return { plan: null, error: "" };
    try {
      return { plan: createPlan(model, { addCps: sel, params, overrides, custom, nfd }), error: "" };
    } catch (e) {
      return { plan: null, error: e instanceof Error ? e.message : "Lỗi lập kế hoạch." };
    }
  }, [model, params, sel, overrides, custom, nfd]);
  const plan = planState.plan;

  const analysis = useMemo(() => {
    if (!model) return null;
    const tables = [...model.sfnt.tables.entries()].map(([tag, d]) => ({ tag, size: d.length })).sort((a, b) => b.size - a.size);
    const blocks = BLOCKS.map((b) => {
      let n = 0;
      for (const c of model.cmap.keys()) if (c >= b.from && c <= b.to) n++;
      return { ...b, n, total: b.to - b.from + 1 };
    });
    const have = VI_PRECOMPOSED.filter((c) => model.cmap.has(c)).length;
    return { tables, blocks, have };
  }, [model]);

  useEffect(() => {
    if (!built) {
      setPreviewFamily("");
      return;
    }
    let alive = true;
    const name = `VNPreview${Date.now()}`;
    const face = new FontFace(name, built.data.slice().buffer as ArrayBuffer);
    face
      .load()
      .then((f) => {
        if (!alive) return;
        document.fonts.add(f);
        setPreviewFamily(name);
      })
      .catch(() => setPreviewFamily(""));
    return () => {
      alive = false;
    };
  }, [built]);

  function build() {
    if (!model || !plan) return;
    setBusy(true);
    setError("");
    window.setTimeout(() => {
      try {
        setBuilt(buildFont(model, plan, { nfd, widenWin: widen, renameSuffix: suffix }));
        setStep(5);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Dựng font thất bại.");
      }
      setBusy(false);
    }, 30);
  }

  async function exportAs(kind: "native" | "woff") {
    if (!built || !model) return;
    const base = `${built.family.replace(/\s+/g, "")}-${model.names.style || "Regular"}`.replace(/[^A-Za-z0-9_-]/g, "");
    if (kind === "woff") saveBlob(await toWoff(built.data), `${base}.woff`, "font/woff");
    else saveBlob(built.data, `${base}.${model.kind === "ttf" ? "ttf" : "otf"}`, model.kind === "ttf" ? "font/ttf" : "font/otf");
  }

  const toggle = (c: number) => setSel((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));
  const nudge = (c: number, idx: number, dx: number, dy: number) =>
    setOverrides((o) => {
      const arr = [...(o[c] ?? [])];
      while (arr.length <= idx) arr.push({ dx: 0, dy: 0 });
      const cur = arr[idx] ?? { dx: 0, dy: 0 };
      arr[idx] = { dx: cur.dx + dx, dy: cur.dy + dy };
      return { ...o, [c]: arr };
    });

  const selGlyph = plan && cp !== null ? plan.glyphs.find((g) => g.cp === cp) : undefined;

  // danh sách hình dấu có thể chỉnh tay
  const editables = useMemo(() => {
    if (!plan || !model) return [] as { key: string; label: string }[];
    const list: { key: string; label: string }[] = [];
    for (const [kind, src] of Object.entries(plan.marks)) list.push({ key: `mark.${kind}`, label: `Dấu ${MARK_LABEL[kind as MarkKind].toLowerCase()} (${src.from === "font" ? "từ font" : src.from === "generated" ? "tạo mới" : "đã chỉnh"})` });
    for (const k of plan.customPaths.keys()) if (!k.startsWith("mark.")) list.push({ key: k, label: k.startsWith("horn") ? `Râu ${k.slice(5)}` : k.startsWith("bar") ? `Gạch ${k.endsWith("upper") ? "Đ" : "đ"}` : "i không chấm" });
    return list;
  }, [plan, model]);

  const editPath: Path | null = useMemo(() => {
    if (!editKey || !plan || !model) return null;
    const c = custom[editKey];
    if (c) return c;
    const cp2 = plan.customPaths.get(editKey);
    if (cp2) return cp2.path;
    const kind = editKey.replace("mark.", "") as MarkKind;
    const gid = plan.marks[kind]?.gid;
    return gid !== undefined ? model.path(gid) : null;
  }, [editKey, custom, plan, model]);

  // hình hiện tại của một khóa dấu / râu (đã chỉnh hoặc mặc định)
  const pathOfKey = (key: string): Path | null => {
    if (!plan || !model) return null;
    const c = custom[key];
    if (c) return c;
    const cp2 = plan.customPaths.get(key);
    if (cp2) return cp2.path;
    const gid = plan.marks[key.replace("mark.", "") as MarkKind]?.gid;
    return gid !== undefined ? model.path(gid) : null;
  };

  // tải file SVG tự thiết kế để thay hình dấu / râu đang chọn
  async function onSvgFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editKey) return;
    setSvgMsg("");
    if (file.size > 2_000_000) {
      setSvgMsg("File quá lớn (tối đa 2 MB).");
      return;
    }
    const res = parseSvgToPath(await file.text());
    if (!res) {
      setSvgMsg("Không đọc được file. Hãy xuất lại dưới dạng SVG.");
      return;
    }
    if (!res.path.length) {
      setSvgMsg(res.skippedStroke ? "File chỉ có nét viền (stroke). Hãy chuyển nét thành hình đặc (Outline Stroke / Object to Path) rồi xuất lại." : "File SVG không có hình vẽ nào để dùng.");
      return;
    }
    const keys = hornAll && editKey.startsWith("horn.") ? editables.filter((x) => x.key.startsWith("horn.") && x.key !== "horn.comb").map((x) => x.key) : [editKey];
    setCustom((c) => {
      const next = { ...c };
      for (const k of keys) {
        const cur = pathOfKey(k);
        const box = cur ? pathBBox(cur) : null;
        next[k] = box ? fitPath(res.path, box) : res.path;
      }
      return next;
    });
    setSvgMsg(res.skippedStroke ? "Đã áp dụng. Một số hình chỉ có nét viền nên bị bỏ qua." : "Đã áp dụng hình từ file SVG.");
  }

  const maxStep = model ? 6 : 0;

  return (
    <div className="space-y-5">
      <nav className="flex gap-1.5 overflow-x-auto pb-1" aria-label="Quy trình">
        {STEPS.map((name, i) => (
          <button
            key={name}
            type="button"
            disabled={i > maxStep}
            onClick={() => setStep(i)}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition disabled:opacity-40 ${
              step === i ? "border-black bg-black text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-900"
            }`}
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-xs">{i + 1}</span>
            {name}
          </button>
        ))}
      </nav>

      {error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
      {planState.error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{planState.error}</p>}

      {step === 0 && (
        <section className={card}>
          <div
            onDragOver={(e: DragEvent) => {
              e.preventDefault();
              setDrop(true);
            }}
            onDragLeave={() => setDrop(false)}
            onDrop={(e: DragEvent) => {
              e.preventDefault();
              setDrop(false);
              const f = e.dataTransfer.files[0];
              if (f) void load(f);
            }}
            className={`grid min-h-56 place-items-center rounded-2xl border-2 border-dashed p-8 text-center transition ${drop ? "border-black bg-slate-50" : "border-slate-300"}`}
          >
            <div>
              <UploadIcon className="mx-auto h-8 w-8 text-slate-500" />
              <p className="mt-3 font-semibold text-slate-900">Kéo thả font OTF / TTF vào đây</p>
              <p className="mt-1 text-sm text-slate-500">Font được xử lý ngay trên máy bạn, không tải lên đâu cả.</p>
              <button type="button" className={`${btnPrimary} mt-5`} onClick={() => fileRef.current?.click()}>
                Chọn tệp font
              </button>
              <input
                ref={fileRef}
                type="file"
                accept=".otf,.ttf"
                className="hidden"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const f = e.target.files?.[0];
                  if (f) void load(f);
                  e.target.value = "";
                }}
              />
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">Chỉ chỉnh sửa font bạn sở hữu hoặc font có giấy phép cho phép sửa đổi (ví dụ SIL OFL). Hỗ trợ TTF (glyf) và OTF (CFF dạng tên glyph).</p>
        </section>
      )}

      {model && analysis && step === 1 && (
        <section className="space-y-4">
          <div className={card}>
            <h2 className="text-lg font-semibold text-slate-950">{model.names.full || model.names.family || fileName}</h2>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
              {[
                ["Định dạng", model.kind === "ttf" ? "TrueType (glyf)" : "OpenType (CFF)"],
                ["Số glyph", String(model.numGlyphs)],
                ["Units/em", String(model.upem)],
                ["Dung lượng", `${Math.round(model.fileSize / 1024)} KB`],
                ["x-height", String(model.metrics.xHeight)],
                ["Cap height", String(model.metrics.capHeight)],
                ["Ascender (d)", String(model.metrics.ascender)],
                ["Nét ngang", String(model.metrics.stem)],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-medium text-slate-900">{v}</dd>
                </div>
              ))}
            </dl>
            {model.names.version && <p className="mt-4 text-xs text-slate-500">{model.names.version}</p>}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className={card}>
              <h3 className="font-semibold text-slate-900">Phủ Unicode</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {analysis.blocks.map((b) => (
                  <li key={b.name}>
                    <div className="flex justify-between text-slate-600">
                      <span>{b.name}</span>
                      <span className="tabular-nums">
                        {b.n}/{b.total}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-slate-100">
                      <div className="h-1.5 rounded-full bg-slate-900" style={{ width: `${(b.n / b.total) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Tiếng Việt: <b>{analysis.have}</b>/{VI_PRECOMPOSED.length} chữ dựng sẵn
              </p>
            </div>
            <div className={card}>
              <h3 className="font-semibold text-slate-900">OpenType</h3>
              <p className="mt-3 text-sm text-slate-600">GSUB: {model.gsubTags.join(" ") || "không có"}</p>
              <p className="mt-1 text-sm text-slate-600">GPOS: {model.gposTags.join(" ") || "không có"}</p>
              <h3 className="mt-5 font-semibold text-slate-900">Bảng font</h3>
              <p className="mt-2 flex flex-wrap gap-1.5">
                {analysis.tables.map((t) => (
                  <span key={t.tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                    {t.tag.trim()} · {t.size > 1024 ? `${Math.round(t.size / 1024)}K` : t.size}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" className={btnPrimary} onClick={() => setStep(2)}>
              Tiếp tục
            </button>
          </div>
        </section>
      )}

      {model && plan && params && step === 2 && (
        <section className="grid gap-4 lg:grid-cols-[1fr_20rem]">
          <div className={card}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Chữ cần thêm ({sel.length})</h2>
              <div className="flex gap-2 text-sm">
                <button type="button" className="text-slate-500 underline" onClick={() => setSel(VI_PRECOMPOSED.filter((c) => !model.cmap.has(c)))}>
                  Chọn tất cả còn thiếu
                </button>
                <button type="button" className="text-slate-500 underline" onClick={() => setSel([])}>
                  Bỏ chọn
                </button>
              </div>
            </div>
            <div className="grid grid-cols-8 gap-1.5 sm:grid-cols-12">
              {VI_PRECOMPOSED.map((c) => {
                const has = model.cmap.has(c);
                const on = sel.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCp(c);
                      if (!has) toggle(c);
                    }}
                    title={`U+${hex4(c)}${has ? " · đã có trong font" : ""}`}
                    className={`aspect-square rounded-lg border text-lg transition ${
                      cp === c ? "ring-2 ring-black" : ""
                    } ${has ? "border-slate-100 bg-slate-50 text-slate-400" : on ? "border-black bg-black text-white" : "border-slate-200 bg-white text-slate-900"}`}
                  >
                    {String.fromCodePoint(c)}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-4">
            <div className={card}>
              {cp !== null && (
                <>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <b className="text-base">{String.fromCodePoint(cp)}</b>
                    <span className="text-slate-500">U+{hex4(cp)}</span>
                  </div>
                  <GlyphSvg
                    upem={model.upem}
                    adv={selGlyph?.adv ?? (model.adv[model.cmap.get(cp) ?? 0] as number)}
                    layers={
                      selGlyph
                        ? partPaths(model, plan, selGlyph)
                        : model.cmap.has(cp)
                          ? [{ d: pathToSvgD(flip(model.path(model.cmap.get(cp) as number))), role: "base" }]
                          : []
                    }
                  />
                  {selGlyph?.parts.slice(1).map((p, i) => (
                    <div key={i} className="mt-3 flex items-center justify-between gap-2 text-sm">
                      <span className="text-slate-600">{p.role === "bar" ? "Gạch" : MARK_LABEL[p.role as MarkKind]}</span>
                      <span className="flex gap-1">
                        {(
                          [
                            ["←", -1, 0],
                            ["→", 1, 0],
                            ["↑", 0, 1],
                            ["↓", 0, -1],
                          ] as const
                        ).map(([label, x, y]) => (
                          <button key={label} type="button" className="h-8 w-8 rounded-lg border border-slate-200 hover:border-slate-900" onClick={() => nudge(selGlyph.cp, i, x * Math.round(model.upem / 200), y * Math.round(model.upem / 200))}>
                            {label}
                          </button>
                        ))}
                        <button type="button" className="h-8 rounded-lg border border-slate-200 px-2 text-xs hover:border-slate-900" onClick={() => setOverrides((o) => ({ ...o, [selGlyph.cp]: (o[selGlyph.cp] ?? []).map((v, k) => (k === i ? { dx: 0, dy: 0 } : v)) }))}>
                          Đặt lại
                        </button>
                      </span>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className={card}>
              <h3 className="font-semibold text-slate-900">Hình dấu / râu</h3>
              <select value={editKey} onChange={(e) => {
                  setEditKey(e.target.value);
                  setSvgMsg("");
                }} className="mt-3 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm">
                <option value="">Chọn hình cần chỉnh…</option>
                {editables.map((e) => (
                  <option key={e.key} value={e.key}>
                    {e.label}
                  </option>
                ))}
              </select>
              <div className="mt-3 space-y-2">
                <label className={`${btn} w-full cursor-pointer ${editKey ? "" : "pointer-events-none opacity-50"}`}>
                  <UploadIcon className="h-4 w-4" /> Tải file SVG làm hình này
                  <input type="file" accept=".svg,image/svg+xml" className="hidden" disabled={!editKey} onChange={onSvgFile} />
                </label>
                {editKey.startsWith("horn.") && editKey !== "horn.comb" && (
                  <label className="flex items-center gap-2 text-xs text-slate-600">
                    <input type="checkbox" checked={hornAll} onChange={(e) => setHornAll(e.target.checked)} className="accent-black" />
                    Dùng cho cả các râu khác (ơ, Ơ, ư, Ư)
                  </label>
                )}
                <p className="text-xs leading-relaxed text-slate-500">
                  {editKey ? "Vẽ bằng Illustrator, Figma, Inkscape… rồi xuất SVG (nét viền phải đổi thành hình đặc). Hình tự co vừa khung hiện tại, sau đó vẫn kéo điểm hoặc bấm nút to/nhỏ để chỉnh tiếp." : "Chọn hình cần chỉnh ở trên, rồi tải file SVG của bạn lên."}
                </p>
                {svgMsg && <p className="text-xs font-medium text-slate-700">{svgMsg}</p>}
              </div>
              {editKey && editPath && (
                <div className="mt-3 space-y-2">
                  <PathEditor path={editPath} onChange={(p) => setCustom((c) => ({ ...c, [editKey]: p }))} />
                  <div className="flex gap-2">
                    <button type="button" className={`${btn} flex-1`} onClick={() => setCustom((c) => ({ ...c, [editKey]: scaleAround(editPath, 0.9) }))}>
                      Nhỏ lại 10%
                    </button>
                    <button type="button" className={`${btn} flex-1`} onClick={() => setCustom((c) => ({ ...c, [editKey]: scaleAround(editPath, 1.1) }))}>
                      To ra 10%
                    </button>
                  </div>
                  <button
                    type="button"
                    className={btn}
                    onClick={() =>
                      setCustom((c) => {
                        const next = { ...c };
                        delete next[editKey];
                        return next;
                      })
                    }
                  >
                    <RefreshIcon className="h-4 w-4" /> Khôi phục
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {model && plan && step === 3 && (
        <section className={card}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Gán mã Unicode</h2>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={nfd} onChange={(e) => setNfd(e.target.checked)} className="accent-black" />
              Hỗ trợ NFD (chữ + dấu rời)
            </label>
          </div>
          <div className="max-h-96 overflow-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-3 py-2">Chữ</th>
                  <th className="px-3 py-2">Unicode</th>
                  <th className="px-3 py-2">Glyph</th>
                  <th className="px-3 py-2">Chuỗi NFD</th>
                </tr>
              </thead>
              <tbody>
                {[...plan.glyphs.map((g) => ({ cp: g.cp, name: g.name, note: g.combining ? "dấu rời, rộng 0" : "" })), ...plan.aliases.map((a) => ({ cp: a.cp, name: `dùng lại U+${hex4(a.from)}`, note: "" }))].map((r) => (
                  <tr key={r.cp} className="border-t border-slate-100">
                    <td className="px-3 py-1.5 text-base">{String.fromCodePoint(r.cp)}</td>
                    <td className="px-3 py-1.5 tabular-nums">U+{hex4(r.cp)}</td>
                    <td className="px-3 py-1.5 text-slate-600">{r.name}</td>
                    <td className="px-3 py-1.5 text-slate-500">
                      {r.note || (nfd ? Array.from(String.fromCodePoint(r.cp).normalize("NFD"), (c) => hex4(c.codePointAt(0) as number)).join(" + ") : "—")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button type="button" className={btnPrimary} onClick={() => setStep(4)}>
              Tiếp tục
            </button>
          </div>
        </section>
      )}

      {model && plan && params && step === 4 && (
        <section className="grid gap-4 md:grid-cols-2">
          <div className={`${card} space-y-4`}>
            <h2 className="font-semibold text-slate-900">Vị trí dấu (anchor)</h2>
            <Slider label="Khoảng cách dấu – chữ thường" value={params.gapLower} min={0} max={Math.round(model.upem * 0.2)} onChange={(v) => setParams({ ...params, gapLower: v })} />
            <Slider label="Khoảng cách dấu – chữ hoa" value={params.gapUpper} min={0} max={Math.round(model.upem * 0.2)} onChange={(v) => setParams({ ...params, gapUpper: v })} />
            <Slider label="Khoảng cách hai dấu chồng" value={params.stack} min={0} max={Math.round(model.upem * 0.15)} onChange={(v) => setParams({ ...params, stack: v })} />
            <Slider label="Dấu nặng cách chân chữ" value={params.gapBelow} min={0} max={Math.round(model.upem * 0.2)} onChange={(v) => setParams({ ...params, gapBelow: v })} />
            <Slider label="Lệch ngang sắc/huyền trên mũ (%)" value={Math.round(params.side * 100)} min={0} max={120} onChange={(v) => setParams({ ...params, side: v / 100 })} />
            <Slider label="Độ lún sắc/huyền vào mũ (%)" value={Math.round(params.nestle * 100)} min={0} max={120} onChange={(v) => setParams({ ...params, nestle: v / 100 })} />
            <button type="button" className={btn} onClick={() => setParams(defaultParams(model))}>
              <RefreshIcon className="h-4 w-4" /> Về giá trị đo từ font
            </button>
          </div>
          <div className={`${card} space-y-4`}>
            <h2 className="font-semibold text-slate-900">Tuỳ chọn xuất</h2>
            <label className="flex items-start gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={nfd} onChange={(e) => setNfd(e.target.checked)} className="mt-0.5 accent-black" />
              Thêm ccmp để chữ + dấu rời (NFD) tự ghép về chữ dựng sẵn
            </label>
            <label className="flex items-start gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={widen} onChange={(e) => setWiden(e.target.checked)} className="mt-0.5 accent-black" />
              Mở rộng winAscent/winDescent để dấu không bị cắt (không đổi line height hhea/typo)
            </label>
            <label className="block text-sm text-slate-700">
              Hậu tố tên font (để trống = giữ nguyên tên)
              <input value={suffix} onChange={(e) => setSuffix(e.target.value)} className="mt-1 h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-slate-500" />
            </label>
            {plan.warnings.length > 0 && (
              <ul className="space-y-1 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                {plan.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            )}
            <button type="button" className={`${btnPrimary} w-full`} disabled={busy || sel.length === 0} onClick={build}>
              {busy ? "Đang dựng font…" : `Dựng font (${plan.glyphs.length} glyph mới)`}
            </button>
          </div>
        </section>
      )}

      {model && step === 5 && (
        <section className="space-y-4">
          {!built ? (
            <div className={card}>
              <p className="text-sm text-slate-600">Hãy dựng font ở bước Kỹ thuật trước.</p>
              <button type="button" className={`${btnPrimary} mt-3`} onClick={() => setStep(4)}>
                Quay lại
              </button>
            </div>
          ) : (
            <>
              <div className={card}>
                <h2 className="font-semibold text-slate-900">Kết quả kiểm tra</h2>
                <ul className="mt-3 space-y-2">
                  {built.checks.map((c) => (
                    <li key={c.label} className="flex gap-3 text-sm">
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${c.status === "ok" ? "bg-emerald-500" : c.status === "warn" ? "bg-amber-500" : "bg-rose-500"}`} />
                      <span>
                        <span className="text-slate-900">{c.label}</span>
                        {c.detail && <span className="block text-xs text-slate-500">{c.detail}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={card}>
                <h3 className="font-semibold text-slate-900">Hiển thị thử</h3>
                <textarea value={sample} onChange={(e) => setSample(e.target.value)} rows={2} className="mt-3 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-slate-500" />
                {previewFamily && (
                  <div className="mt-3 space-y-3 text-4xl leading-snug text-slate-950" style={{ fontFamily: `"${previewFamily}", sans-serif` }}>
                    <p>{sample.normalize("NFC")}</p>
                    <p className="border-t border-slate-100 pt-3">{sample.normalize("NFD")}</p>
                  </div>
                )}
                <p className="mt-2 text-xs text-slate-500">Dòng trên: NFC · dòng dưới: NFD (đi qua ccmp).</p>
              </div>
              <div className="flex justify-end">
                <button type="button" className={btnPrimary} onClick={() => setStep(6)}>
                  Tiếp tục
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {model && step === 6 && (
        <section className={card}>
          {!built ? (
            <p className="text-sm text-slate-600">Chưa có font để xuất — hãy dựng font ở bước Kỹ thuật.</p>
          ) : (
            <>
              <h2 className="font-semibold text-slate-900">{built.family}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {built.totalGlyphs} glyph (+{built.added}) · {Math.round(built.data.length / 1024)} KB
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button type="button" className={btnPrimary} onClick={() => void exportAs("native")}>
                  <DownloadIcon className="h-4 w-4" /> Tải {model.kind === "ttf" ? "TTF" : "OTF"}
                </button>
                <button type="button" className={btn} onClick={() => void exportAs("woff")}>
                  <DownloadIcon className="h-4 w-4" /> Tải WOFF
                </button>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}
