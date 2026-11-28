/**
 * 3D Studio: lớp mỏng bao quanh viewer.js (public/3d-studio/viewer.js).
 * viewer.js đã gom sẵn Three.js nhưng không xuất THREE ra ngoài, nên ở đây chỉ dùng các
 * phương thức có sẵn trên đối tượng viewer trả về. Không import thêm bản Three nào khác.
 */

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const VIEWER_SRC = `${BASE}/3d-studio/viewer.js`;

export const MAX_TEXTURE_PX = 2048;

/** Cạnh dài tối đa (px) của khung vẽ khi siêu lấy mẫu lúc xuất ảnh. */
const SUPERSAMPLE_MAX_PX = 4096;

/* ---------- kiểu tối thiểu của các đối tượng Three mà viewer trả về ---------- */

type Vec = { x: number; y: number; z: number; set(x: number, y: number, z: number): unknown };
export type Col = { set(v: string | number): Col; clone(): Col; getHexString(): string };
export type Tex = {
  isTexture?: boolean;
  image: unknown;
  source: { constructor: new (data: unknown) => unknown };
  flipY: boolean;
  colorSpace: string;
  anisotropy: number;
  wrapS: number;
  wrapT: number;
  rotation: number;
  needsUpdate: boolean;
  repeat: { x: number; y: number; set(x: number, y: number): unknown };
  offset: { x: number; y: number; set(x: number, y: number): unknown };
  center: { x: number; y: number; set(x: number, y: number): unknown };
  clone(): Tex;
  dispose(): void;
};
export type Mat = {
  name: string;
  userData: Record<string, unknown>;
  color?: Col;
  attenuationColor?: Col;
  attenuationDistance?: number;
  map?: Tex | null;
  needsUpdate: boolean;
  dispose(): void;
};
type Obj = {
  isMesh?: boolean;
  name: string;
  parent?: Obj | null;
  material?: Mat | Mat[];
  geometry?: { dispose(): void };
  traverse(cb: (o: Obj) => void): void;
};
export type Viewer = {
  renderer: {
    domElement: HTMLCanvasElement;
    toneMappingExposure: number;
    capabilities: { maxTextureSize: number; getMaxAnisotropy(): number };
    getContext(): WebGL2RenderingContext | WebGLRenderingContext;
    getPixelRatio(): number;
    setPixelRatio(v: number): void;
    setSize(w: number, h: number, updateStyle?: boolean): void;
    setClearColor(c: Col | number, alpha?: number): void;
    render(scene: Viewer["scene"], camera: Viewer["camera"]): void;
  };
  scene: { background: Col | null; environment?: { constructor: new (img: unknown) => Tex } | null };
  camera: { position: Vec; aspect: number; updateProjectionMatrix(): void };
  controls: { autoRotate: boolean; target: Vec; update(): void };
  root: Obj;
  /** "high" = siêu lấy mẫu (mặc định), "light" = nhẹ cho máy yếu. Có từ bản viewer.js mới. */
  setQuality?(q: "high" | "light"): void;
  dispose(): void;
};
type MountFn = (
  el: HTMLElement,
  opts: { glb: string; config: Record<string, unknown>; hdri?: string; hdriType?: string },
) => Promise<Viewer>;

declare global {
  interface Window {
    MaterialViewer?: { mount: MountFn; Texture?: new (img: unknown) => Tex };
  }
}

/* ---------- nạp viewer.js (một lần) ---------- */

let viewerScript: Promise<MountFn> | null = null;

export function loadViewer(): Promise<MountFn> {
  if (window.MaterialViewer) return Promise.resolve(window.MaterialViewer.mount);
  if (!viewerScript) {
    viewerScript = new Promise<MountFn>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = VIEWER_SRC;
      s.async = true;
      s.onload = () =>
        window.MaterialViewer ? resolve(window.MaterialViewer.mount) : reject(new Error("viewer_missing"));
      s.onerror = () => reject(new Error("viewer_load_failed"));
      document.head.appendChild(s);
    }).catch((e) => {
      viewerScript = null; // cho phép thử lại
      throw e;
    });
  }
  return viewerScript;
}

export function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function friendlyLoadError(e: unknown): string {
  const msg = e instanceof Error ? e.message : String(e);
  if (msg === "viewer_load_failed" || msg === "viewer_missing")
    return "Không tải được bộ hiển thị 3D. Hãy kiểm tra kết nối mạng rồi thử lại.";
  return "Không tải được mẫu chai này. Hãy kiểm tra kết nối mạng rồi thử lại.";
}

/* ---------- danh sách bộ phận (vật liệu) ---------- */

export type PartKind = "water" | "plastic" | "glass" | "other";
export type PartInfo = { id: number; name: string; kind: PartKind; color: string; hasImage: boolean };

type Original = {
  color: string | null;
  attenuationColor: string | null;
  attenuationDistance: number | null;
  map: Tex | null;
  replaced: Tex | null; // texture do người dùng tạo (cần dispose)
};

export type PartStore = {
  mats: Mat[];
  originals: Map<Mat, Original>;
  meshes: { chain: string[]; mat: Mat }[]; // chain = [tên mesh, tên nhóm cha, ...]
};

export function collectParts(root: Obj): { store: PartStore; parts: PartInfo[] } {
  const seen = new Map<Mat, string>(); // vật liệu -> tên mesh đầu tiên dùng nó
  const meshes: PartStore["meshes"] = [];
  root.traverse((o) => {
    if (!o.isMesh || !o.material) return;
    const chain: string[] = [];
    for (let n: Obj | null | undefined = o; n; n = n.parent) if (n.name) chain.push(n.name);
    for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
      if (!seen.has(m)) seen.set(m, o.name);
      meshes.push({ chain, mat: m });
    }
  });
  const store: PartStore = { mats: [], originals: new Map(), meshes };
  const parts: PartInfo[] = [];
  const used = new Map<string, number>();
  for (const [m, meshName] of seen) {
    const rv = m.userData?.rvKind;
    const kind: PartKind = rv === "water" || rv === "plastic" || rv === "glass" ? rv : "other";
    let base = (m.name || meshName || "Bộ phận").trim() || "Bộ phận";
    const n = (used.get(base) ?? 0) + 1;
    used.set(base, n);
    if (n > 1) base = `${base} (${n})`;
    store.originals.set(m, {
      color: m.color ? `#${m.color.getHexString()}` : null,
      attenuationColor: m.attenuationColor ? `#${m.attenuationColor.getHexString()}` : null,
      attenuationDistance: typeof m.attenuationDistance === "number" ? m.attenuationDistance : null,
      map: m.map ?? null,
      replaced: null,
    });
    parts.push({
      id: store.mats.length,
      name: base,
      kind,
      color: m.color ? `#${m.color.getHexString()}` : "#ffffff",
      hasImage: !!m.map,
    });
    store.mats.push(m);
  }
  return { store, parts };
}

const fold = (t: string) =>
  t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").toLowerCase();

/**
 * Tìm các vật liệu của mesh có tên (hoặc nhóm cha có tên) trùng `name`.
 * Nếu không có, đoán theo `fallback` (ví dụ nhãn: label / nhan / sleeve). Trả về chỉ số vật liệu.
 */
export function findPartIds(store: PartStore, name: string, fallback: RegExp): number[] {
  const want = fold(name);
  const pick = (test: (chain: string[]) => boolean) => {
    const ids = new Set<number>();
    for (const e of store.meshes) if (test(e.chain)) ids.add(store.mats.indexOf(e.mat));
    return [...ids].filter((i) => i >= 0);
  };
  const exact = pick((c) => c.some((n) => fold(n) === want));
  return exact.length ? exact : pick((c) => c.some((n) => fallback.test(fold(n))));
}

/* ---------- màu ---------- */

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const toHex = (r: number, g: number, b: number) =>
  "#" + [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.padEnd(6, "0");
  return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  h /= 6;
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255];
}

/** k ∈ [-1, 1]: dương = đậm hơn (tăng bão hòa, giảm sáng nhẹ), âm = nhạt hơn. */
export function deepenColor(hex: string, k: number): string {
  const [r, g, b] = parseHex(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [nr, ng, nb] = hslToRgb(h, clamp01(s * (1 + 0.3 * k)), clamp01(l * (1 - 0.15 * k)));
  return toHex(nr, ng, nb);
}

const mix = (a: [number, number, number], b: [number, number, number], t: number): [number, number, number] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

export function setPartColor(store: PartStore, id: number, hex: string) {
  const m = store.mats[id];
  m?.color?.set(hex);
}

/** Độ đậm 0..1 (0,5 = nguyên bản) -> hệ số nhân khoảng cách hấp thụ 2,5 .. 0,4 (đậm hơn = ngắn hơn). */
export const densityFactor = (t: number) => Math.exp(Math.log(2.5) + (Math.log(0.4) - Math.log(2.5)) * clamp01(t));

/**
 * Đổi màu nước thật (không loang): chỉ đổi attenuationColor, color (phủ lớp mặt theo tint),
 * và attenuationDistance. Không đụng tới thickness / ior, không đặt needsUpdate.
 */
export type WaterParams = { tint: number; turbidity: number };

export function applyWater(store: PartStore, hex: string, density: number, params: WaterParams) {
  const k = (clamp01(density) - 0.5) * 2;
  const factor = densityFactor(density);
  const target = parseHex(hex);
  for (const m of store.mats) {
    if (m.userData?.rvKind !== "water") continue;
    const orig = store.originals.get(m);
    m.attenuationColor?.set(deepenColor(hex, k));
    if (m.color) {
      const tint = clamp01(params.tint);
      const turbidity = clamp01(params.turbidity);
      let c = mix([255, 255, 255], target, tint);
      if (turbidity > 0) c = mix(c, [target[0] * 0.35, target[1] * 0.35, target[2] * 0.35], turbidity * 0.5);
      m.color.set(toHex(c[0], c[1], c[2]));
    }
    const base = orig?.attenuationDistance;
    if (typeof base === "number" && Number.isFinite(base)) m.attenuationDistance = base * factor;
  }
}

export function resetWater(store: PartStore) {
  for (const m of store.mats) {
    if (m.userData?.rvKind !== "water") continue;
    const o = store.originals.get(m);
    if (!o) continue;
    if (o.attenuationColor) m.attenuationColor?.set(o.attenuationColor);
    if (o.color) m.color?.set(o.color);
    if (o.attenuationDistance !== null) m.attenuationDistance = o.attenuationDistance;
  }
}

/* ---------- ảnh nhãn ---------- */

export type ImageAdjust = { zoom: number; shiftX: number; shiftY: number; rotate: number; flip: boolean };
export const DEFAULT_ADJUST: ImageAdjust = { zoom: 1, shiftX: 0, shiftY: 0, rotate: 0, flip: false };

/** Đọc ảnh, tự thu nhỏ về tối đa 2048 px cạnh dài. Trả về canvas (giữ chất lượng, không nhòe). */
export async function prepareImage(file: File): Promise<HTMLCanvasElement> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("Không đọc được ảnh này. Hãy thử ảnh PNG hoặc JPG khác.");
  }
  try {
    const scale = Math.min(1, MAX_TEXTURE_PX / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Trình duyệt không xử lý được ảnh.");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, w, h);
    return canvas;
  } finally {
    bitmap.close();
  }
}

/**
 * Thay ảnh lên một bộ phận. Nếu đã có map gốc: clone để giữ nguyên UV/transform/flipY/colorSpace/kênh UV,
 * nhưng tạo Source mới (clone dùng chung Source với bản gốc, đặt .image sẽ ghi đè luôn ảnh gốc).
 * Nếu chưa có map: tạo Texture mới từ lớp Texture mà viewer.js xuất ra (MaterialViewer.Texture).
 */
export function replaceImage(v: Viewer, store: PartStore, id: number, canvas: HTMLCanvasElement): boolean {
  const m = store.mats[id];
  const orig = m ? store.originals.get(m) : undefined;
  if (!m || !orig) return false;

  let tex: Tex;
  if (orig.map) {
    tex = orig.map.clone();
    const Source = orig.map.source.constructor;
    tex.source = new Source(canvas) as Tex["source"];
    tex.flipY = orig.map.flipY;
  } else {
    const TexClass = window.MaterialViewer?.Texture ?? v.scene.environment?.constructor;
    if (!TexClass) return false;
    tex = new TexClass(canvas);
    tex.flipY = false;
    tex.wrapS = 1001; // CanvasTexture mặc định cho UV glTF
    tex.wrapT = 1001;
  }
  tex.colorSpace = "srgb";
  tex.anisotropy = v.renderer.capabilities.getMaxAnisotropy();
  tex.needsUpdate = true;

  const hadMap = !!m.map;
  if (orig.replaced) orig.replaced.dispose();
  orig.replaced = tex;
  m.map = tex;
  if (!hadMap || !orig.map) {
    m.color?.set("#ffffff"); // tránh ảnh bị nhuốm màu
    m.needsUpdate = true; // bắt buộc: vật liệu vừa có map lần đầu
  }
  return true;
}

export function adjustImage(store: PartStore, id: number, a: ImageAdjust) {
  const m = store.mats[id];
  const orig = m ? store.originals.get(m) : undefined;
  const tex = orig?.replaced;
  if (!m || !orig || !tex) return;
  const base = orig.map; // map gốc (nếu có) quyết định phép biến đổi gốc
  const r0x = base ? base.repeat.x : 1;
  const r0y = base ? base.repeat.y : 1;
  const o0x = base ? base.offset.x : 0;
  const o0y = base ? base.offset.y : 0;
  const rot0 = base ? base.rotation : 0;
  const z = Math.max(0.05, a.zoom);
  const dx = a.shiftX; // đơn vị: phần của ảnh (−0,5 .. 0,5)
  const dy = a.shiftY;
  tex.center.set(0.5, 0.5);
  tex.repeat.set((r0x / z) * (a.flip ? -1 : 1), r0y / z);
  tex.offset.set(o0x + r0x * (0.5 + dx) - 0.5, o0y + r0y * (0.5 + dy) - 0.5);
  tex.rotation = rot0 + (a.rotate * Math.PI) / 180;
}

export function restoreImage(store: PartStore, id: number) {
  const m = store.mats[id];
  const orig = m ? store.originals.get(m) : undefined;
  if (!m || !orig) return;
  if (orig.replaced) {
    orig.replaced.dispose();
    orig.replaced = null;
  }
  if (orig.map) m.map = orig.map;
  else {
    m.map = null;
    if (orig.color) m.color?.set(orig.color);
    m.needsUpdate = true;
  }
}

export function resetAllParts(store: PartStore) {
  resetWater(store);
  store.mats.forEach((m, id) => {
    const o = store.originals.get(m);
    if (!o) return;
    if (m.userData?.rvKind !== "water" && o.color) m.color?.set(o.color);
    restoreImage(store, id);
  });
}

/* ---------- góc nhìn ---------- */

export type ViewName = "front" | "angle" | "back" | "top";
const VIEW_DIR: Record<ViewName, [number, number, number]> = {
  front: [0, 0.12, 1],
  angle: [0.7, 0.35, 0.7],
  back: [0, 0.12, -1],
  top: [0, 1, 0.001],
};

export type CameraPose = { pos: [number, number, number]; target: [number, number, number] };

export function readPose(v: Viewer): CameraPose {
  const p = v.camera.position;
  const t = v.controls.target;
  return { pos: [p.x, p.y, p.z], target: [t.x, t.y, t.z] };
}

export function viewPose(v: Viewer, name: ViewName): CameraPose {
  const t = v.controls.target;
  const p = v.camera.position;
  const d = Math.hypot(p.x - t.x, p.y - t.y, p.z - t.z) || 1;
  const [x, y, z] = VIEW_DIR[name];
  const len = Math.hypot(x, y, z);
  return { pos: [t.x + (x / len) * d, t.y + (y / len) * d, t.z + (z / len) * d], target: [t.x, t.y, t.z] };
}

/** Chuyển camera mượt tới pose mới; trả về hàm hủy. */
export function flyTo(v: Viewer, to: CameraPose, ms = 450): () => void {
  const from = readPose(v);
  const start = performance.now();
  let raf = 0;
  const step = (now: number) => {
    const k = clamp01((now - start) / ms);
    const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    const l = (a: number, b: number) => a + (b - a) * e;
    v.camera.position.set(l(from.pos[0], to.pos[0]), l(from.pos[1], to.pos[1]), l(from.pos[2], to.pos[2]));
    v.controls.target.set(l(from.target[0], to.target[0]), l(from.target[1], to.target[1]), l(from.target[2], to.target[2]));
    v.controls.update();
    if (k < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

/* ---------- xuất ảnh ---------- */

export const EXPORT_SIZES = [1080, 2048, 4096] as const;

export function maxRenderSize(v: Viewer): number {
  const gl = v.renderer.getContext();
  const rb = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE) as number;
  const vp = gl.getParameter(gl.MAX_VIEWPORT_DIMS) as Int32Array;
  return Math.min(v.renderer.capabilities.maxTextureSize, rb, vp[0] ?? Infinity, vp[1] ?? Infinity);
}

/**
 * Renderer không bật preserveDrawingBuffer, nên render và toBlob phải nằm trong cùng một tác vụ.
 * toBlob chụp bitmap ngay lúc gọi, nên có thể khôi phục kích thước ngay sau đó.
 */
export async function renderToBlob(
  v: Viewer,
  host: HTMLElement,
  longEdge: number,
  transparent: boolean,
  bgColor: Col,
  bgVisible: boolean,
): Promise<Blob> {
  const cw = Math.max(10, host.clientWidth);
  const ch = Math.max(10, host.clientHeight);
  const aspect = cw / ch;
  const W = aspect >= 1 ? longEdge : Math.round(longEdge * aspect);
  const H = aspect >= 1 ? Math.round(longEdge / aspect) : longEdge;
  const max = maxRenderSize(v);
  if (W > max || H > max) {
    throw new Error(`Thiết bị này chỉ xuất được tối đa ${max}px. Hãy chọn kích thước nhỏ hơn.`);
  }

  // Siêu lấy mẫu 2x rồi thu nhỏ: cạnh kính, vệt sáng và chữ trên nhãn mịn hơn hẳn MSAA đơn thuần.
  // Chỉ bật khi thiết bị đủ sức (cạnh dài x2 không vượt SUPERSAMPLE_MAX_PX).
  const ss = longEdge * 2 <= Math.min(max, SUPERSAMPLE_MAX_PX) ? 2 : 1;
  const RW = W * ss;
  const RH = H * ss;

  const { renderer, scene, camera } = v;
  const prevRatio = renderer.getPixelRatio();
  const prevBg = scene.background;
  let pending: Promise<Blob | null>;
  try {
    renderer.setPixelRatio(1);
    renderer.setSize(RW, RH, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    if (transparent || !bgVisible) {
      scene.background = null;
      renderer.setClearColor(0, 0);
    } else {
      scene.background = bgColor;
      renderer.setClearColor(bgColor, 1);
    }
    renderer.render(scene, camera);
    // Không có preserveDrawingBuffer: phải sao chép khung vẽ ngay trong cùng tác vụ với render.
    let source: HTMLCanvasElement = renderer.domElement;
    if (ss > 1) {
      const down = document.createElement("canvas");
      down.width = W;
      down.height = H;
      const ctx = down.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(renderer.domElement, 0, 0, W, H);
        source = down;
      }
    }
    pending = new Promise<Blob | null>((resolve) => source.toBlob(resolve, "image/png"));
  } finally {
    renderer.setPixelRatio(prevRatio);
    renderer.setSize(cw, ch, false);
    camera.aspect = cw / ch;
    camera.updateProjectionMatrix();
    scene.background = prevBg;
    if (prevBg) renderer.setClearColor(prevBg, 1);
    else renderer.setClearColor(0, 0);
  }
  const blob = await pending;
  if (!blob) throw new Error("Không tạo được ảnh. Hãy thử kích thước nhỏ hơn.");
  return blob;
}

export function exportFileName(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `san-pham-${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}.png`;
}

/* ---------- dọn dẹp ---------- */

export function disposeModel(v: Viewer, store: PartStore | null) {
  if (store) {
    for (const o of store.originals.values()) o.replaced?.dispose();
  }
  v.root.traverse((o) => {
    o.geometry?.dispose();
    if (!o.material) return;
    for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
      for (const val of Object.values(m)) {
        if (val && typeof val === "object" && (val as Tex).isTexture) (val as Tex).dispose();
      }
      m.dispose();
    }
  });
  v.dispose();
}
