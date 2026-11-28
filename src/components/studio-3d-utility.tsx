"use client";

import { useCallback, useEffect, useRef, useState, type DragEvent, type ReactNode } from "react";
import {
  DEFAULT_ADJUST,
  EXPORT_SIZES,
  adjustImage,
  applyWater,
  collectParts,
  disposeModel,
  exportFileName,
  findPartIds,
  flyTo,
  friendlyLoadError,
  loadViewer,
  maxRenderSize,
  prepareImage,
  readPose,
  renderToBlob,
  replaceImage,
  resetAllParts,
  restoreImage,
  setPartColor,
  viewPose,
  webglAvailable,
  type Col,
  type ImageAdjust,
  type PartStore,
  type ViewName,
  type Viewer,
  type WaterParams,
} from "@/lib/studio-3d";
import { STUDIO_BRAND, STUDIO_MODELS, type StudioModel } from "@/lib/studio-3d-catalog";
import { validateImageFile } from "@/utils/image";
import {
  ChevronDownIcon,
  CopyImageIcon,
  CubeIcon,
  DownloadIcon,
  ImageIcon,
  RefreshIcon,
} from "@/components/utilities/tool-icons";

/* ---------- giao diện nhỏ dùng lại ---------- */

const btn =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-800 transition hover:border-slate-900 disabled:cursor-not-allowed disabled:opacity-50";
const btnPrimary =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-black px-4 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300";
const chip =
  "inline-flex h-9 items-center justify-center rounded-full border px-3 text-xs font-medium backdrop-blur transition";

const WATER_COLORS = [
  { name: "Nước lọc", hex: "#bfe6ff" },
  { name: "Nước cam", hex: "#ff9f1c" },
  { name: "Chanh", hex: "#e8f26a" },
  { name: "Dưa hấu", hex: "#ff5a6e" },
  { name: "Nho", hex: "#7b3fa0" },
  { name: "Trà đào", hex: "#f4a261" },
  { name: "Trà đen", hex: "#b5651d" },
  { name: "Cà phê", hex: "#4b2e1e" },
  { name: "Bạc hà", hex: "#6fe0b1" },
  { name: "Việt quất", hex: "#3b5bdb" },
];

const BG_COLORS = ["#e9e9ec", "#ffffff", "#f5efe6", "#dfe9f3", "#fde7e0", "#1f2937"];

const CAP_COLORS = [
  { name: "Đen", hex: "#111827" },
  { name: "Trắng", hex: "#f8fafc" },
  { name: "Bạc", hex: "#cbd5e1" },
  { name: "Đỏ", hex: "#dc2626" },
  { name: "Cam", hex: "#f97316" },
  { name: "Vàng", hex: "#facc15" },
  { name: "Xanh lá", hex: "#16a34a" },
  { name: "Xanh dương", hex: "#2563eb" },
  { name: "Hồng", hex: "#ec4899" },
];

const VIEWS: { id: ViewName; label: string }[] = [
  { id: "front", label: "Trước" },
  { id: "angle", label: "Nghiêng" },
  { id: "back", label: "Sau" },
  { id: "top", label: "Trên" },
];

function Section({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-sm font-semibold text-slate-900">{title}</span>
        <ChevronDownIcon className={`h-4 w-4 text-slate-500 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="space-y-4 border-t border-slate-100 px-4 pb-4 pt-4">{children}</div>}
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-xs font-medium text-slate-600">
        <span>{label}</span>
        <span className="tabular-nums text-slate-400">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 h-2 w-full cursor-pointer accent-black disabled:cursor-not-allowed disabled:opacity-40"
      />
    </label>
  );
}

function Swatch({
  color,
  label,
  active,
  onClick,
}: {
  color: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`h-8 w-8 rounded-full border-2 transition hover:scale-110 ${
        active ? "border-black ring-2 ring-black/20" : "border-white shadow-[0_0_0_1px_rgb(203_213_225)]"
      }`}
      style={{ background: color }}
    />
  );
}

function ColorPick({ value, onChange, label }: { value: string; onChange: (hex: string) => void; label: string }) {
  return (
    <label
      title={label}
      className="relative grid h-8 w-8 cursor-pointer place-items-center overflow-hidden rounded-full border border-slate-300 bg-[conic-gradient(red,yellow,lime,aqua,blue,magenta,red)]"
    >
      <span className="sr-only">{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </label>
  );
}

/* ---------- thành phần chính ---------- */

type Phase = "loading" | "ready" | "error";

const DEFAULT_WATER: WaterParams = { tint: 0.35, turbidity: 0 };

function waterParamsFrom(cfg: Record<string, unknown>): WaterParams {
  const mats = Array.isArray(cfg.materials) ? (cfg.materials as { kind?: string; params?: Record<string, unknown> }[]) : [];
  const p = mats.find((m) => m.kind === "water")?.params;
  const n = (v: unknown, d: number) => (typeof v === "number" && Number.isFinite(v) ? v : d);
  return p ? { tint: n(p.tint, DEFAULT_WATER.tint), turbidity: n(p.turbidity, DEFAULT_WATER.turbidity) } : DEFAULT_WATER;
}

export function Studio3DUtility() {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const storeRef = useRef<PartStore | null>(null);
  const bgColorRef = useRef<Col | null>(null);
  const poseRef = useRef<ReturnType<typeof readPose> | null>(null);
  const stopFlyRef = useRef<(() => void) | null>(null);
  const tokenRef = useRef(0);
  const waterParamsRef = useRef<WaterParams>(DEFAULT_WATER);
  const labelIdsRef = useRef<number[]>([]);
  const capIdsRef = useRef<number[]>([]);
  const labelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const [modelId, setModelId] = useState<string>(STUDIO_MODELS[0]?.id ?? "");
  const [phase, setPhase] = useState<Phase>("loading");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [hasWater, setHasWater] = useState(false);
  const [hasCap, setHasCap] = useState(false);
  const [hasLabel, setHasLabel] = useState(false);
  const [waterHex, setWaterHex] = useState("#bfe6ff");
  const [waterDensity, setWaterDensity] = useState(0.5);
  const [waterTouched, setWaterTouched] = useState(false);
  const [capHex, setCapHex] = useState("#111827");
  const [capTouched, setCapTouched] = useState(false);

  const [labelOn, setLabelOn] = useState(false);
  const [adjust, setAdjust] = useState<ImageAdjust>(DEFAULT_ADJUST);
  const [imageBusy, setImageBusy] = useState(false);
  const [imageDrag, setImageDrag] = useState(false);

  const [bgHex, setBgHex] = useState(BG_COLORS[0] ?? "#e9e9ec");
  const [bgTransparent, setBgTransparent] = useState(false);
  const [exposure, setExposure] = useState(1);
  const [autoRotate, setAutoRotate] = useState(false);
  const [lite, setLite] = useState(false);

  const [exportSize, setExportSize] = useState<number>(2048);
  const [exportTransparent, setExportTransparent] = useState(false);
  const [exporting, setExporting] = useState<"save" | "copy" | null>(null);
  const [sizeLimit, setSizeLimit] = useState(Infinity);

  // Giá trị mới nhất cho các hàm async (tránh đóng băng state cũ).
  const settings = useRef({ bgHex, bgTransparent, exposure, autoRotate, adjust, lite });
  useEffect(() => {
    settings.current = { bgHex, bgTransparent, exposure, autoRotate, adjust, lite };
  }, [bgHex, bgTransparent, exposure, autoRotate, adjust, lite]);

  const canCopy = typeof ClipboardItem !== "undefined" && !!navigator.clipboard?.write;
  const say = useCallback((msg: string) => setNotice(msg), []);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(t);
  }, [notice]);

  const teardown = useCallback(() => {
    stopFlyRef.current?.();
    const v = viewerRef.current;
    if (v) disposeModel(v, storeRef.current);
    viewerRef.current = null;
    storeRef.current = null;
    bgColorRef.current = null;
    poseRef.current = null;
  }, []);

  const applyBackground = useCallback((hex: string, transparent: boolean) => {
    const v = viewerRef.current;
    const col = bgColorRef.current;
    if (!v || !col) return;
    if (transparent) {
      v.scene.background = null;
      v.renderer.setClearColor(0, 0);
    } else {
      col.set(hex);
      v.scene.background = col;
      v.renderer.setClearColor(col, 1);
    }
  }, []);

  /* ----- nạp một loại chai trong danh mục ----- */

  const loadModel = useCallback(
    async (model: StudioModel) => {
      const token = ++tokenRef.current;
      setModelId(model.id);
      setError(null);
      setPhase("loading");
      teardown();
      try {
        if (!webglAvailable()) {
          throw new Error("no_webgl");
        }
        const mount = await loadViewer();
        const host = hostRef.current;
        if (!host || token !== tokenRef.current) return;

        let cfg: Record<string, unknown> = {};
        try {
          const r = await fetch(model.config);
          if (r.ok) cfg = (await r.json()) as Record<string, unknown>;
        } catch {
          /* thiếu config.json: dùng mặc định */
        }
        waterParamsRef.current = waterParamsFrom(cfg);
        const sceneCfg = (cfg.scene ?? {}) as Record<string, unknown>;

        const v = await mount(host, {
          glb: model.glb,
          hdri: model.hdri?.url,
          hdriType: model.hdri?.type,
          config: {
            ...cfg,
            scene: {
              ...sceneCfg,
              env: model.hdri ? "hdri" : "product",
              tone: sceneCfg.tone ?? "Neutral",
              bgMode: "color",
              bg: BG_COLORS[0] ?? "#e9e9ec",
              hdriBg: false,
              autoRotate: false,
              exposure: 1,
            },
          },
        });
        if (token !== tokenRef.current) {
          disposeModel(v, null);
          return;
        }
        viewerRef.current = v;
        bgColorRef.current = v.scene.background;
        poseRef.current = readPose(v);
        setSizeLimit(maxRenderSize(v));

        const { store } = collectParts(v.root);
        storeRef.current = store;
        const waterMat = store.mats.find((m) => m.userData?.rvKind === "water");
        labelIdsRef.current = findPartIds(store, model.labelMesh, /label|nhan|sleeve/);
        capIdsRef.current = findPartIds(store, model.capMesh, /(^|[^a-z])(cap|nap|lid)([^a-z]|$)/);

        setHasWater(!!waterMat);
        setHasCap(capIdsRef.current.length > 0);
        setHasLabel(labelIdsRef.current.length > 0);
        setWaterHex(waterMat?.attenuationColor ? `#${waterMat.attenuationColor.getHexString()}` : "#bfe6ff");
        setWaterDensity(0.5);
        setWaterTouched(false);
        const capMat = store.mats[capIdsRef.current[0] ?? -1];
        setCapHex(capMat?.color ? `#${capMat.color.getHexString()}` : "#111827");
        setCapTouched(false);

        // giữ nguyên nền / độ sáng / tự xoay đã chọn, và nhãn người dùng đã tải
        const s = settings.current;
        applyBackground(s.bgHex, s.bgTransparent);
        v.renderer.toneMappingExposure = s.exposure;
        v.controls.autoRotate = s.autoRotate;
        if (s.lite) v.setQuality?.("light");
        const canvas = labelCanvasRef.current;
        if (canvas && labelIdsRef.current.length) {
          for (const id of labelIdsRef.current) {
            replaceImage(v, store, id, canvas);
            adjustImage(store, id, s.adjust);
          }
          setLabelOn(true);
        } else {
          setLabelOn(false);
        }
        setPhase("ready");
      } catch (e) {
        if (token !== tokenRef.current) return;
        console.error(e);
        teardown();
        setError(
          e instanceof Error && e.message === "no_webgl"
            ? "Trình duyệt hoặc thiết bị này không hỗ trợ hiển thị 3D. Hãy thử Chrome, Edge hoặc Safari bản mới."
            : friendlyLoadError(e),
        );
        setPhase("error");
      }
    },
    [applyBackground, teardown],
  );

  useEffect(() => {
    const first = STUDIO_MODELS[0];
    const t = window.setTimeout(() => {
      if (first) void loadModel(first);
      else {
        setError("Chưa có mẫu chai nào trong danh mục.");
        setPhase("error");
      }
    }, 0);
    return () => {
      window.clearTimeout(t);
      // eslint-disable-next-line react-hooks/exhaustive-deps -- cố ý: tăng bộ đếm để hủy lần nạp đang chạy
      tokenRef.current++;
      teardown();
    };
  }, [loadModel, teardown]);

  /* ----- màu nước ----- */

  const changeWater = (hex: string, density: number) => {
    setWaterHex(hex);
    setWaterDensity(density);
    setWaterTouched(true);
    if (storeRef.current) applyWater(storeRef.current, hex, density, waterParamsRef.current);
  };

  /* ----- màu nắp ----- */

  const changeCap = (hex: string) => {
    setCapHex(hex);
    setCapTouched(true);
    const store = storeRef.current;
    if (store) for (const id of capIdsRef.current) setPartColor(store, id, hex);
  };

  /* ----- nhãn ----- */

  const loadImage = async (file: File) => {
    const v = viewerRef.current;
    const store = storeRef.current;
    if (!v || !store || !labelIdsRef.current.length) return;
    const problem = validateImageFile(file);
    if (problem) {
      say(problem.replace("chỉ nhận ảnh JPG, PNG hoặc WebP", "chỉ nhận ảnh PNG hoặc JPG"));
      return;
    }
    setImageBusy(true);
    try {
      const canvas = await prepareImage(file);
      let ok = false;
      for (const id of labelIdsRef.current) {
        if (replaceImage(v, store, id, canvas)) {
          adjustImage(store, id, adjust);
          ok = true;
        }
      }
      if (!ok) {
        say("Chưa thay được ảnh cho nhãn này.");
        return;
      }
      labelCanvasRef.current = canvas;
      setLabelOn(true);
    } catch (e) {
      say(e instanceof Error ? e.message : "Không thể dùng ảnh này.");
    } finally {
      setImageBusy(false);
    }
  };

  const changeAdjust = (patch: Partial<ImageAdjust>) => {
    const next = { ...adjust, ...patch };
    setAdjust(next);
    const store = storeRef.current;
    if (store) for (const id of labelIdsRef.current) adjustImage(store, id, next);
  };

  const restoreLabel = () => {
    const store = storeRef.current;
    if (!store) return;
    for (const id of labelIdsRef.current) restoreImage(store, id);
    labelCanvasRef.current = null;
    setLabelOn(false);
    setAdjust(DEFAULT_ADJUST);
  };

  const onImageDrop = (e: DragEvent) => {
    e.preventDefault();
    setImageDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) void loadImage(f);
  };

  /* ----- góc nhìn, nền, ánh sáng ----- */

  const goView = (name: ViewName) => {
    const v = viewerRef.current;
    if (!v) return;
    stopFlyRef.current?.();
    stopFlyRef.current = flyTo(v, viewPose(v, name));
  };

  const resetView = () => {
    const v = viewerRef.current;
    const pose = poseRef.current;
    if (!v || !pose) return;
    stopFlyRef.current?.();
    stopFlyRef.current = flyTo(v, pose);
  };

  const toggleRotate = () => {
    const next = !autoRotate;
    setAutoRotate(next);
    if (viewerRef.current) viewerRef.current.controls.autoRotate = next;
  };

  const changeBg = (hex: string) => {
    setBgHex(hex);
    setBgTransparent(false);
    applyBackground(hex, false);
  };

  const changeTransparent = (on: boolean) => {
    setBgTransparent(on);
    applyBackground(bgHex, on);
  };

  const changeLite = (on: boolean) => {
    setLite(on);
    viewerRef.current?.setQuality?.(on ? "light" : "high");
  };

  const changeExposure = (value: number) => {
    setExposure(value);
    if (viewerRef.current) viewerRef.current.renderer.toneMappingExposure = value;
  };

  /* ----- đặt lại tất cả ----- */

  const resetAll = () => {
    const v = viewerRef.current;
    const store = storeRef.current;
    if (!v || !store) return;
    resetAllParts(store);
    labelCanvasRef.current = null;
    setLabelOn(false);
    setAdjust(DEFAULT_ADJUST);
    const waterMat = store.mats.find((m) => m.userData?.rvKind === "water");
    setWaterHex(waterMat?.attenuationColor ? `#${waterMat.attenuationColor.getHexString()}` : "#bfe6ff");
    setWaterDensity(0.5);
    setWaterTouched(false);
    const capMat = store.mats[capIdsRef.current[0] ?? -1];
    setCapHex(capMat?.color ? `#${capMat.color.getHexString()}` : "#111827");
    setCapTouched(false);
    const defaultBg = BG_COLORS[0] ?? "#e9e9ec";
    setBgHex(defaultBg);
    setBgTransparent(false);
    applyBackground(defaultBg, false);
    setExposure(1);
    v.renderer.toneMappingExposure = 1;
    setAutoRotate(false);
    v.controls.autoRotate = false;
    resetView();
    say("Đã đặt lại tất cả.");
  };

  /* ----- xuất ảnh ----- */

  const doExport = async (mode: "save" | "copy") => {
    const v = viewerRef.current;
    const host = hostRef.current;
    const col = bgColorRef.current;
    if (!v || !host || !col) return;
    setExporting(mode);
    try {
      // Cho trình duyệt kịp vẽ trạng thái "đang xuất" trước khi tác vụ nặng bắt đầu.
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      const blob = await renderToBlob(v, host, exportSize, exportTransparent || bgTransparent, col, !bgTransparent);
      if (mode === "copy") {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        say("Đã sao chép ảnh vào bộ nhớ tạm.");
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = exportFileName();
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
        say("Đã tạo ảnh PNG.");
      }
    } catch (e) {
      console.error(e);
      say(
        e instanceof Error && e.message
          ? e.message
          : mode === "copy"
            ? "Trình duyệt không cho sao chép ảnh. Hãy dùng nút Tải ảnh PNG."
            : "Không xuất được ảnh. Hãy thử kích thước nhỏ hơn.",
      );
    } finally {
      setExporting(null);
    }
  };

  /* ---------- giao diện ---------- */

  const ready = phase === "ready";
  const active = STUDIO_MODELS.find((m) => m.id === modelId);

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2.5 text-sm font-semibold text-slate-900">Chọn loại chai</p>
        <ul className="flex gap-3 overflow-x-auto pb-1" aria-label="Danh sách loại chai">
          {STUDIO_MODELS.map((m) => {
            const on = m.id === modelId;
            return (
              <li key={m.id} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={on}
                  disabled={phase === "loading"}
                  onClick={() => (on && ready ? undefined : void loadModel(m))}
                  className={`flex w-44 items-center gap-3 rounded-2xl border bg-white p-3 text-left transition disabled:cursor-wait ${
                    on ? "border-slate-900 ring-2 ring-slate-900" : "border-slate-200 hover:border-slate-900"
                  }`}
                >
                  {m.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.thumb} alt="" className="h-12 w-12 shrink-0 rounded-xl bg-slate-100 object-cover" />
                  ) : (
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-950 text-white">
                      <CubeIcon className="h-6 w-6" />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-slate-950">{m.name}</span>
                    <span className="line-clamp-2 text-xs leading-4 text-slate-500">{m.description}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        {/* Khung 3D */}
        <div className="min-w-0">
          <div
            className="relative h-[58vh] min-h-[340px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 lg:h-[680px]"
            style={
              ready && bgTransparent
                ? {
                    backgroundImage:
                      "linear-gradient(45deg,#e5e7eb 25%,transparent 25%,transparent 75%,#e5e7eb 75%),linear-gradient(45deg,#e5e7eb 25%,#fff 25%,#fff 75%,#e5e7eb 75%)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0,10px 10px",
                  }
                : undefined
            }
          >
            {/* canvas của viewer được gắn vào đây; React không đặt phần tử con vào div này */}
            <div ref={hostRef} className="absolute inset-0" />

            {phase === "loading" && (
              <div className="absolute inset-0 grid place-items-center bg-white/70 backdrop-blur-sm" role="status" aria-live="polite">
                <div className="w-64 text-center">
                  <p className="text-sm font-medium text-slate-700">Đang tải {active?.name.toLowerCase() ?? "mẫu chai"}…</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-1/3 animate-[studio-slide_1.1s_ease-in-out_infinite] rounded-full bg-black" />
                  </div>
                </div>
              </div>
            )}

            {phase === "error" && (
              <div className="absolute inset-0 grid place-items-center p-6">
                <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-sm">
                  <p role="alert" className="text-sm leading-6 text-slate-700">
                    {error}
                  </p>
                  {active && (
                    <button type="button" onClick={() => void loadModel(active)} className={`${btnPrimary} mt-4`}>
                      <RefreshIcon className="h-4 w-4" />
                      Thử lại
                    </button>
                  )}
                </div>
              </div>
            )}

            {ready && (
              <>
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={toggleRotate}
                    aria-pressed={autoRotate}
                    className={`${chip} ${autoRotate ? "border-black bg-black text-white" : "border-slate-200 bg-white/85 text-slate-800 hover:border-slate-900"}`}
                  >
                    Tự xoay
                  </button>
                  <button type="button" onClick={resetView} className={`${chip} border-slate-200 bg-white/85 text-slate-800 hover:border-slate-900`}>
                    Đặt lại góc nhìn
                  </button>
                </div>
                <div className="absolute inset-x-0 bottom-3 flex justify-center">
                  <div className="flex gap-1 rounded-full bg-white/85 p-1 shadow-sm backdrop-blur" role="group" aria-label="Góc nhìn nhanh">
                    {VIEWS.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => goView(v.id)}
                        className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-900 hover:text-white"
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-3 min-h-6" aria-live="polite">
            {notice && (
              <p role="status" className="inline-block rounded-xl bg-slate-900 px-3.5 py-2 text-sm text-white">
                {notice}
              </p>
            )}
          </div>
        </div>

        {/* Bảng điều khiển */}
        <aside className="min-w-0 space-y-3 lg:max-h-[720px] lg:overflow-y-auto lg:pr-1">
          {!ready ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-500">
              <p className="font-semibold text-slate-900">{STUDIO_BRAND.title}</p>
              <p className="mt-1">{STUDIO_BRAND.tagline}</p>
            </div>
          ) : (
            <>
              {hasWater && (
                <Section title="Màu nước">
                  <div className="flex flex-wrap items-center gap-2">
                    {WATER_COLORS.map((c) => (
                      <Swatch key={c.hex} color={c.hex} label={c.name} active={waterTouched && waterHex.toLowerCase() === c.hex} onClick={() => changeWater(c.hex, waterDensity)} />
                    ))}
                    <ColorPick value={waterHex} label="Chọn màu tự do" onChange={(hex) => changeWater(hex, waterDensity)} />
                  </div>
                  <Slider
                    label="Nhạt  ↔  Đậm"
                    value={waterDensity}
                    min={0}
                    max={1}
                    step={0.01}
                    display={waterDensity === 0.5 ? "Gốc" : `${Math.round(waterDensity * 100)}%`}
                    onChange={(d) => changeWater(waterHex, d)}
                  />
                </Section>
              )}

              {hasCap && (
                <Section title="Màu nắp chai">
                  <div className="flex flex-wrap items-center gap-2">
                    {CAP_COLORS.map((c) => (
                      <Swatch key={c.hex} color={c.hex} label={c.name} active={capTouched && capHex.toLowerCase() === c.hex} onClick={() => changeCap(c.hex)} />
                    ))}
                    <ColorPick value={capHex} label="Chọn màu nắp tự do" onChange={changeCap} />
                  </div>
                </Section>
              )}

              {hasLabel && (
                <Section title="Nhãn chai" defaultOpen={false}>
                  <input
                    ref={imageInput}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="sr-only"
                    tabIndex={-1}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      e.target.value = "";
                      if (f) void loadImage(f);
                    }}
                  />
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setImageDrag(true);
                    }}
                    onDragLeave={() => setImageDrag(false)}
                    onDrop={onImageDrop}
                    className={`rounded-2xl border-2 border-dashed p-4 text-center transition ${imageDrag ? "border-slate-900 bg-slate-50" : "border-slate-300"}`}
                  >
                    <ImageIcon className="mx-auto h-6 w-6 text-slate-400" />
                    <p className="mt-1.5 text-xs text-slate-500">Kéo thả ảnh PNG / JPG vào đây</p>
                    <button type="button" disabled={imageBusy} onClick={() => imageInput.current?.click()} className={`${btn} mt-2.5 h-9`}>
                      {imageBusy ? "Đang xử lý…" : labelOn ? "Chọn ảnh khác" : "Chọn ảnh nhãn"}
                    </button>
                  </div>

                  <Slider label="Phóng to / thu nhỏ" value={adjust.zoom} min={0.5} max={3} step={0.01} display={`${adjust.zoom.toFixed(2)}×`} disabled={!labelOn} onChange={(zoom) => changeAdjust({ zoom })} />
                  <Slider label="Dịch ngang" value={adjust.shiftX} min={-0.5} max={0.5} step={0.005} display={`${Math.round(adjust.shiftX * 100)}%`} disabled={!labelOn} onChange={(shiftX) => changeAdjust({ shiftX })} />
                  <Slider label="Dịch dọc" value={adjust.shiftY} min={-0.5} max={0.5} step={0.005} display={`${Math.round(adjust.shiftY * 100)}%`} disabled={!labelOn} onChange={(shiftY) => changeAdjust({ shiftY })} />
                  <Slider label="Xoay" value={adjust.rotate} min={-180} max={180} step={1} display={`${adjust.rotate}°`} disabled={!labelOn} onChange={(rotate) => changeAdjust({ rotate })} />

                  <label className="flex items-center gap-2.5 text-sm text-slate-700">
                    <input type="checkbox" checked={adjust.flip} disabled={!labelOn} onChange={(e) => changeAdjust({ flip: e.target.checked })} className="h-4 w-4 accent-black" />
                    Lật ngang
                  </label>

                  <button type="button" disabled={!labelOn} onClick={restoreLabel} className={`${btn} w-full`}>
                    Khôi phục nhãn gốc
                  </button>
                </Section>
              )}

              <Section title="Nền và ánh sáng" defaultOpen={false}>
                <div className="flex flex-wrap items-center gap-2">
                  {BG_COLORS.map((c) => (
                    <Swatch key={c} color={c} label={`Nền ${c}`} active={!bgTransparent && bgHex.toLowerCase() === c} onClick={() => changeBg(c)} />
                  ))}
                  <ColorPick value={bgHex} label="Chọn màu nền tự do" onChange={changeBg} />
                </div>
                <label className="flex items-center gap-2.5 text-sm text-slate-700">
                  <input type="checkbox" checked={bgTransparent} onChange={(e) => changeTransparent(e.target.checked)} className="h-4 w-4 accent-black" />
                  Nền trong suốt
                </label>
                <label className="flex items-center gap-2.5 text-sm text-slate-700" title="Giảm độ nét khi xem để mượt hơn trên máy yếu. Ảnh tải về vẫn giữ chất lượng cao.">
                  <input type="checkbox" checked={lite} onChange={(e) => changeLite(e.target.checked)} className="h-4 w-4 accent-black" />
                  Chế độ nhẹ (máy yếu)
                </label>
                <Slider label="Độ sáng" value={exposure} min={0.6} max={1.6} step={0.01} display={`${Math.round(exposure * 100)}%`} onChange={changeExposure} />
              </Section>

              <Section title="Tải ảnh về">
                <div role="radiogroup" aria-label="Kích thước ảnh" className="grid grid-cols-3 rounded-2xl bg-slate-100 p-1">
                  {EXPORT_SIZES.map((s) => {
                    const tooBig = s > sizeLimit;
                    return (
                      <button
                        key={s}
                        type="button"
                        role="radio"
                        aria-checked={exportSize === s}
                        disabled={tooBig}
                        title={tooBig ? "Thiết bị này không đủ sức xuất cỡ này" : undefined}
                        onClick={() => setExportSize(s)}
                        className={`rounded-xl px-2 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                          exportSize === s ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
                <p className="-mt-2 text-xs text-slate-400">Số pixel của cạnh dài nhất.</p>
                <label className="flex items-center gap-2.5 text-sm text-slate-700">
                  <input type="checkbox" checked={exportTransparent || bgTransparent} disabled={bgTransparent} onChange={(e) => setExportTransparent(e.target.checked)} className="h-4 w-4 accent-black" />
                  Xuất nền trong suốt
                </label>
                <button type="button" disabled={exporting !== null} onClick={() => void doExport("save")} className={`${btnPrimary} w-full`}>
                  <DownloadIcon className="h-4 w-4" />
                  {exporting === "save" ? "Đang tạo ảnh…" : "Tải ảnh PNG"}
                </button>
                {canCopy && (
                  <button type="button" disabled={exporting !== null} onClick={() => void doExport("copy")} className={`${btn} w-full`}>
                    <CopyImageIcon className="h-4 w-4" />
                    {exporting === "copy" ? "Đang sao chép…" : "Sao chép ảnh"}
                  </button>
                )}
              </Section>

              <button type="button" onClick={resetAll} className={`${btn} w-full`}>
                <RefreshIcon className="h-4 w-4" />
                Đặt lại tất cả
              </button>
            </>
          )}
        </aside>
      </div>

      <style>{`@keyframes studio-slide{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
    </div>
  );
}
