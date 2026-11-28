"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent, type ReactNode } from "react";
import {
  DEFAULT_ADJUST,
  EXPORT_SIZES,
  adjustImage,
  applyWater,
  collectParts,
  disposeModel,
  exportFileName,
  flyTo,
  friendlyLoadError,
  guessLabelPart,
  loadViewer,
  maxRenderSize,
  prepareImage,
  readPose,
  renderToBlob,
  replaceImage,
  resetAllParts,
  restoreImage,
  setPartColor,
  validateModelFile,
  viewPose,
  webglAvailable,
  type Col,
  type ImageAdjust,
  type PartInfo,
  type PartStore,
  type ViewName,
  type Viewer,
} from "@/lib/studio-3d";
import { validateImageFile } from "@/utils/image";
import {
  ChevronDownIcon,
  CopyImageIcon,
  CubeIcon,
  DownloadIcon,
  ImageIcon,
  RefreshIcon,
  UploadIcon,
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

const BG_COLORS = ["#eef0f3", "#ffffff", "#f5efe6", "#dfe9f3", "#fde7e0", "#1f2937"];

const KIND_LABEL: Record<PartInfo["kind"], string> = {
  water: "Nước",
  plastic: "Nhựa",
  glass: "Kính",
  other: "",
};

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

type Phase = "empty" | "loading" | "ready";

export function Studio3DUtility() {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const storeRef = useRef<PartStore | null>(null);
  const bgColorRef = useRef<Col | null>(null);
  const poseRef = useRef<ReturnType<typeof readPose> | null>(null);
  const stopFlyRef = useRef<(() => void) | null>(null);
  const tokenRef = useRef(0);
  const modelInput = useRef<HTMLInputElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  const [phase, setPhase] = useState<Phase>("empty");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);

  const [parts, setParts] = useState<PartInfo[]>([]);
  const [partColors, setPartColors] = useState<Record<number, string>>({});
  const [waterHex, setWaterHex] = useState("#bfe6ff");
  const [waterDensity, setWaterDensity] = useState(0.5);
  const [waterTouched, setWaterTouched] = useState(false);

  const [imagePart, setImagePart] = useState<number | null>(null);
  const [adjustByPart, setAdjustByPart] = useState<Record<number, ImageAdjust>>({});
  const [imageOn, setImageOn] = useState<Record<number, boolean>>({});
  const [imageBusy, setImageBusy] = useState(false);
  const [imageDrag, setImageDrag] = useState(false);

  const [bgHex, setBgHex] = useState(BG_COLORS[0] ?? "#eef0f3");
  const [bgTransparent, setBgTransparent] = useState(false);
  const [exposure, setExposure] = useState(1);
  const [autoRotate, setAutoRotate] = useState(false);

  const [exportSize, setExportSize] = useState<number>(2048);
  const [exportTransparent, setExportTransparent] = useState(false);
  const [exporting, setExporting] = useState<"save" | "copy" | null>(null);

  // Giá trị mới nhất cho các hàm async (tránh đóng băng state cũ).
  const settings = useRef({ bgHex, bgTransparent, exposure, autoRotate });
  useEffect(() => {
    settings.current = { bgHex, bgTransparent, exposure, autoRotate };
  }, [bgHex, bgTransparent, exposure, autoRotate]);
  const [sizeLimit, setSizeLimit] = useState(Infinity);

  const hasWater = parts.some((p) => p.kind === "water");
  const colorParts = useMemo(() => parts.filter((p) => p.kind !== "water"), [parts]);
  const canCopy = typeof ClipboardItem !== "undefined" && !!navigator.clipboard?.write;

  const say = useCallback((msg: string) => {
    setNotice(msg);
  }, []);

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

  useEffect(() => () => teardown(), [teardown]);

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

  /* ----- nạp mô hình ----- */

  const openModel = useCallback(
    async (file: File) => {
      const problem = await validateModelFile(file);
      if (problem) {
        say(problem);
        return;
      }
      if (!webglAvailable()) {
        setError("Trình duyệt hoặc thiết bị này không hỗ trợ hiển thị 3D (WebGL). Hãy thử Chrome, Edge hoặc Safari bản mới.");
        setPhase("empty");
        return;
      }
      const token = ++tokenRef.current;
      setError(null);
      setPhase("loading");
      teardown();
      const url = URL.createObjectURL(file);
      try {
        const mount = await loadViewer();
        const host = hostRef.current;
        if (!host || token !== tokenRef.current) return;
        const v = await mount(host, {
          glb: url,
          config: {
            scene: { env: "product", envGain: 1, exposure: 1, tone: "Neutral", bgMode: "color", bg: "#eef0f3", autoRotate: false },
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

        const { store, parts: found } = collectParts(v.root);
        storeRef.current = store;
        setParts(found);
        setPartColors(Object.fromEntries(found.map((p) => [p.id, p.color])));
        const firstWater = found.find((p) => p.kind === "water");
        const mat = firstWater ? store.mats[firstWater.id] : undefined;
        setWaterHex(mat?.attenuationColor ? `#${mat.attenuationColor.getHexString()}` : "#bfe6ff");
        setWaterDensity(0.5);
        setWaterTouched(false);
        setImagePart(guessLabelPart(found));
        setAdjustByPart({});
        setImageOn({});
        setFileName(file.name);

        // giữ nguyên lựa chọn nền / sáng / tự xoay người dùng đã đặt
        const s = settings.current;
        applyBackground(s.bgHex, s.bgTransparent);
        v.renderer.toneMappingExposure = s.exposure;
        v.controls.autoRotate = s.autoRotate;
        setPhase("ready");
      } catch (e) {
        if (token !== tokenRef.current) return;
        console.error(e);
        teardown();
        setError(friendlyLoadError(e));
        setPhase("empty");
      } finally {
        URL.revokeObjectURL(url);
      }
    },
    [applyBackground, say, teardown],
  );

  const onModelDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) void openModel(f);
  };

  /* ----- màu nước ----- */

  const changeWater = (hex: string, density: number) => {
    setWaterHex(hex);
    setWaterDensity(density);
    setWaterTouched(true);
    if (storeRef.current) applyWater(storeRef.current, hex, density);
  };

  /* ----- màu bộ phận ----- */

  const changePartColor = (id: number, hex: string) => {
    setPartColors((c) => ({ ...c, [id]: hex }));
    if (storeRef.current) setPartColor(storeRef.current, id, hex);
  };

  /* ----- ảnh nhãn ----- */

  const adjust = imagePart !== null ? (adjustByPart[imagePart] ?? DEFAULT_ADJUST) : DEFAULT_ADJUST;
  const imageActive = imagePart !== null && !!imageOn[imagePart];

  const loadImage = async (file: File) => {
    const v = viewerRef.current;
    const store = storeRef.current;
    if (!v || !store || imagePart === null) return;
    const problem = validateImageFile(file);
    if (problem) {
      say(problem.replace("chỉ nhận ảnh JPG, PNG hoặc WebP", "chỉ nhận ảnh PNG hoặc JPG"));
      return;
    }
    setImageBusy(true);
    try {
      const canvas = await prepareImage(file);
      if (!replaceImage(v, store, imagePart, canvas)) {
        say("Bộ phận này chưa thể thay ảnh. Hãy chọn bộ phận khác.");
        return;
      }
      const a = adjustByPart[imagePart] ?? DEFAULT_ADJUST;
      adjustImage(store, imagePart, a);
      setImageOn((o) => ({ ...o, [imagePart]: true }));
    } catch (e) {
      say(e instanceof Error ? e.message : "Không thể dùng ảnh này.");
    } finally {
      setImageBusy(false);
    }
  };

  const changeAdjust = (patch: Partial<ImageAdjust>) => {
    if (imagePart === null) return;
    const next = { ...adjust, ...patch };
    setAdjustByPart((m) => ({ ...m, [imagePart]: next }));
    if (storeRef.current) adjustImage(storeRef.current, imagePart, next);
  };

  const restoreLabel = () => {
    if (imagePart === null || !storeRef.current) return;
    restoreImage(storeRef.current, imagePart);
    setImageOn((o) => ({ ...o, [imagePart]: false }));
    setAdjustByPart((m) => ({ ...m, [imagePart]: DEFAULT_ADJUST }));
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
    setPartColors(Object.fromEntries(parts.map((p) => [p.id, p.color])));
    const firstWater = parts.find((p) => p.kind === "water");
    const mat = firstWater ? store.mats[firstWater.id] : undefined;
    setWaterHex(mat?.attenuationColor ? `#${mat.attenuationColor.getHexString()}` : "#bfe6ff");
    setWaterDensity(0.5);
    setWaterTouched(false);
    setAdjustByPart({});
    setImageOn({});
    const defaultBg = BG_COLORS[0] ?? "#eef0f3";
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

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <input
        ref={modelInput}
        type="file"
        accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (f) void openModel(f);
        }}
      />

      {/* Khung 3D */}
      <div className="min-w-0">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onModelDrop}
          className={`relative h-[58vh] min-h-[340px] overflow-hidden rounded-3xl border bg-slate-100 lg:h-[680px] ${
            dragging ? "border-slate-900 ring-2 ring-slate-900" : "border-slate-200"
          }`}
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

          {phase === "empty" && (
            <div className="absolute inset-0 grid place-items-center p-6">
              <div className="w-full max-w-md rounded-3xl border-2 border-dashed border-slate-300 bg-white/80 p-8 text-center backdrop-blur">
                <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-slate-950 text-white">
                  <CubeIcon className="h-7 w-7" />
                </span>
                <h2 className="text-lg font-semibold text-slate-950">Tải mô hình 3D lên</h2>
                <p className="mt-1.5 text-sm leading-6 text-slate-500">
                  Kéo thả tệp <strong className="font-semibold text-slate-700">.glb</strong> vào đây hoặc chọn từ máy. Tối đa 100 MB.
                </p>
                {error && (
                  <p role="alert" className="mt-4 rounded-xl bg-red-50 px-3 py-2.5 text-left text-sm leading-5 text-red-700">
                    {error}
                  </p>
                )}
                <button type="button" onClick={() => modelInput.current?.click()} className={`${btnPrimary} mt-5`}>
                  <UploadIcon className="h-4 w-4" />
                  Chọn mô hình
                </button>
                <p className="mt-4 text-xs text-slate-400">Tệp được xử lý ngay trên thiết bị của bạn, không tải lên máy chủ.</p>
              </div>
            </div>
          )}

          {phase === "loading" && (
            <div className="absolute inset-0 grid place-items-center bg-white/70 backdrop-blur-sm" role="status" aria-live="polite">
              <div className="w-64 text-center">
                <p className="text-sm font-medium text-slate-700">Đang tải mô hình…</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-1/3 animate-[studio-slide_1.1s_ease-in-out_infinite] rounded-full bg-black" />
                </div>
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
              <div className="absolute right-3 top-3 flex max-w-[55%] items-center gap-2">
                <span className="truncate rounded-full bg-white/85 px-3 py-2 text-xs text-slate-500 backdrop-blur" title={fileName}>
                  {fileName}
                </span>
                <button type="button" onClick={() => modelInput.current?.click()} className={`${chip} shrink-0 border-slate-200 bg-white/85 text-slate-800 hover:border-slate-900`}>
                  Đổi mô hình
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
            <p className="font-semibold text-slate-900">Sau khi tải mô hình, bạn có thể:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Xoay, phóng to, kéo xem mọi góc.</li>
              <li>Đổi màu từng bộ phận, màu nước, màu nền.</li>
              <li>Thay ảnh nhãn rồi chỉnh vị trí, độ lớn.</li>
              <li>Xuất ảnh PNG 1080, 2048 hoặc 4096 px.</li>
            </ul>
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

            {colorParts.length > 0 && (
              <Section title="Màu từng bộ phận" defaultOpen={!hasWater}>
                <ul className="space-y-2.5">
                  {colorParts.map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block truncate text-sm text-slate-800">{p.name}</span>
                        {KIND_LABEL[p.kind] && <span className="text-xs text-slate-400">{KIND_LABEL[p.kind]}</span>}
                      </span>
                      <ColorPick value={partColors[p.id] ?? p.color} label={`Đổi màu ${p.name}`} onChange={(hex) => changePartColor(p.id, hex)} />
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section title="Ảnh nhãn" defaultOpen={false}>
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
              {colorParts.length === 0 ? (
                <p className="text-sm text-slate-500">Mô hình này không có bộ phận nào để thay ảnh.</p>
              ) : (
                <>
                  <label className="block text-xs font-medium text-slate-600">
                    Dán ảnh lên bộ phận
                    <select
                      value={imagePart ?? ""}
                      onChange={(e) => setImagePart(Number(e.target.value))}
                      className="mt-1.5 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-slate-900"
                    >
                      {colorParts.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </label>

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
                    <button type="button" disabled={imageBusy || imagePart === null} onClick={() => imageInput.current?.click()} className={`${btn} mt-2.5 h-9`}>
                      {imageBusy ? "Đang xử lý…" : imageActive ? "Chọn ảnh khác" : "Chọn ảnh"}
                    </button>
                  </div>

                  <Slider label="Phóng to / thu nhỏ" value={adjust.zoom} min={0.5} max={3} step={0.01} display={`${adjust.zoom.toFixed(2)}×`} disabled={!imageActive} onChange={(zoom) => changeAdjust({ zoom })} />
                  <Slider label="Dịch ngang" value={adjust.shiftX} min={-0.5} max={0.5} step={0.005} display={`${Math.round(adjust.shiftX * 100)}%`} disabled={!imageActive} onChange={(shiftX) => changeAdjust({ shiftX })} />
                  <Slider label="Dịch dọc" value={adjust.shiftY} min={-0.5} max={0.5} step={0.005} display={`${Math.round(adjust.shiftY * 100)}%`} disabled={!imageActive} onChange={(shiftY) => changeAdjust({ shiftY })} />
                  <Slider label="Xoay" value={adjust.rotate} min={-180} max={180} step={1} display={`${adjust.rotate}°`} disabled={!imageActive} onChange={(rotate) => changeAdjust({ rotate })} />

                  <label className="flex items-center gap-2.5 text-sm text-slate-700">
                    <input type="checkbox" checked={adjust.flip} disabled={!imageActive} onChange={(e) => changeAdjust({ flip: e.target.checked })} className="h-4 w-4 accent-black" />
                    Lật ngang
                  </label>

                  <button type="button" disabled={!imageActive} onClick={restoreLabel} className={`${btn} w-full`}>
                    Khôi phục nhãn gốc
                  </button>
                </>
              )}
            </Section>

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
              <Slider label="Độ sáng" value={exposure} min={0.6} max={1.6} step={0.01} display={`${Math.round(exposure * 100)}%`} onChange={changeExposure} />
            </Section>

            <Section title="Xuất ảnh">
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

      <style>{`@keyframes studio-slide{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
    </div>
  );
}
