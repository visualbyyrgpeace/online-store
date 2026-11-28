/**
 * CHỈNH SÂU VẬT LIỆU của 3D Studio (nước / nhựa / thủy tinh).
 *
 * Đây là bản chuyển của hàm updateEntry() trong engine Material Studio (app.js): cùng công thức,
 * cùng thông số, nên chỉnh ở đây cho ra đúng hình ảnh như khi chỉnh trong Material Studio.
 * Chỉ dùng các thuộc tính chuẩn của MeshPhysicalMaterial trên vật liệu mà viewer.js đã nạp,
 * không import thêm bản Three nào khác.
 *
 * Phần "độ sâu theo đường đi thật" của nước dùng hai hàm setLiquid / setLiquidBounds mà
 * public/3d-studio/viewer.js xuất ra qua window.MaterialViewer (bản viewer.js mới).
 */
import type { Col, Mat, PartStore, Viewer } from "@/lib/studio-3d";

export type TuneKind = "plastic" | "glass" | "water";
export type TuneParams = Record<string, number | string | boolean>;

export const KIND_LABEL: Record<TuneKind, string> = { plastic: "Nhựa", glass: "Thủy tinh", water: "Nước" };

/* ---------- mô tả các ô chỉnh (giống bảng "Vật liệu" của Material Studio) ---------- */

export type FieldDef = {
  k: string;
  label: string;
  group: string;
  type: "color" | "range" | "check";
  min?: number;
  max?: number;
  step?: number;
  /** Chỉ hiện ô này khi điều kiện đúng. */
  when?: (p: TuneParams) => boolean;
};

const range = (k: string, label: string, group: string, min: number, max: number, step: number, when?: FieldDef["when"]): FieldDef => ({
  k, label, group, type: "range", min, max, step, when,
});
const color = (k: string, label: string, group: string): FieldDef => ({ k, label, group, type: "color" });
const check = (k: string, label: string, group: string): FieldDef => ({ k, label, group, type: "check" });
const trans = (p: TuneParams) => Number(p.transmission) > 0;

export const TUNE_FIELDS: Record<TuneKind, FieldDef[]> = {
  plastic: [
    color("color", "Màu nhựa", "Màu và bề mặt"),
    range("roughness", "Độ nhám", "Màu và bề mặt", 0, 1, 0.005),
    range("clearcoat", "Lớp bóng (clearcoat)", "Màu và bề mặt", 0, 1, 0.01),
    range("clearcoatRoughness", "Nhám lớp bóng", "Màu và bề mặt", 0, 1, 0.01),
    range("specular", "Cường độ phản chiếu", "Màu và bề mặt", 0, 1, 0.01),
    range("sheen", "Sheen (bề mặt mềm)", "Màu và bề mặt", 0, 1, 0.01),
    range("transmission", "Độ trong (xuyên sáng)", "Độ trong", 0, 1, 0.01),
    range("thickness", "Độ dày (x đường kính)", "Độ trong", 0, 1, 0.005, trans),
    range("absorb", "Độ đậm màu khi trong", "Độ trong", 0, 1, 0.01, trans),
    range("ior", "IOR (chiết suất)", "Độ trong", 1, 2, 0.005),
    range("opacity", "Độ đục tổng", "Độ trong", 0.05, 1, 0.01),
    check("double", "Hai mặt (vỏ mỏng, nhìn xuyên)", "Độ trong"),
  ],
  glass: [
    color("color", "Màu kính", "Màu"),
    range("absorb", "Độ đậm màu (hấp thụ)", "Màu", 0, 1, 0.01),
    range("tint", "Phủ màu lớp mặt", "Màu", 0, 1, 0.01),
    range("thickness", "Độ dày (x đường kính)", "Khúc xạ", 0, 1, 0.005),
    range("ior", "IOR (kính ≈ 1.52)", "Khúc xạ", 1, 2.4, 0.005),
    range("dispersion", "Tán sắc", "Khúc xạ", 0, 5, 0.05),
    range("roughness", "Độ nhám (kính mờ)", "Bề mặt", 0, 0.8, 0.005),
    range("specular", "Cường độ phản chiếu", "Bề mặt", 0, 1, 0.01),
    check("double", "Hai mặt (vỏ mỏng, nhìn xuyên)", "Bề mặt"),
  ],
  water: [
    color("color", "Màu nước", "Màu"),
    range("absorb", "Độ đậm màu", "Màu", 0, 1, 0.01),
    range("tint", "Phủ màu lớp mặt", "Màu", 0, 1, 0.01),
    range("deepSat", "Đậm và rực hơn ở chỗ dày", "Màu", 0, 1, 0.01),
    range("turbidity", "Độ đục (tán xạ bên trong)", "Độ đục và chiều sâu", 0, 1, 0.01),
    range("chord", "Độ sâu theo đường đi thật (đáy, giữa đục hơn mép)", "Độ đục và chiều sâu", 0, 1, 0.01),
    range("thickness", "Độ dày (x đường kính)", "Khúc xạ", 0, 1.5, 0.01),
    range("ior", "IOR (nước = 1.333)", "Khúc xạ", 1, 1.6, 0.002),
    range("bend", "Độ bẻ cong khúc xạ (méo nền)", "Khúc xạ", 0, 3, 0.05),
    range("surface", "Lớp mặt bóng (phản chiếu sắc)", "Bề mặt", 0, 1, 0.01),
    range("roughness", "Độ nhám bề mặt", "Bề mặt", 0, 0.3, 0.002),
    range("specular", "Cường độ phản chiếu", "Bề mặt", 0, 1, 0.01),
    check("double", "Hai mặt (để thấy qua vỏ chai)", "Bề mặt"),
  ],
};

export const DEFAULT_PARAMS: Record<TuneKind, TuneParams> = {
  plastic: { color: "#2f6fe0", roughness: 0.32, clearcoat: 0.6, clearcoatRoughness: 0.08, specular: 1, ior: 1.46, sheen: 0, transmission: 0, thickness: 0.05, absorb: 0.3, opacity: 1, double: false },
  glass: { color: "#e4f4ee", tint: 0, absorb: 0.15, thickness: 0.08, ior: 1.52, roughness: 0, specular: 1, dispersion: 0, double: true },
  water: { color: "#8fd0ff", tint: 0.35, absorb: 0.5, thickness: 0.7, ior: 1.333, roughness: 0.02, specular: 1, double: true, turbidity: 0, deepSat: 0, surface: 0, chord: 0, bend: 1 },
};

/** Mẫu nhanh lấy nguyên từ Material Studio. */
export const TUNE_PRESETS: Record<TuneKind, { name: string; p: TuneParams }[]> = {
  plastic: [
    {"name": "Nhựa bóng đặc (ABS / PP)", "p": {"roughness": 0.25, "clearcoat": 0.8, "clearcoatRoughness": 0.05, "transmission": 0, "sheen": 0, "specular": 1, "opacity": 1, "double": false}},
    {"name": "Nhựa mờ đục", "p": {"roughness": 0.6, "clearcoat": 0, "transmission": 0, "sheen": 0, "specular": 0.8, "opacity": 1, "double": false}},
    {"name": "Nhựa PET trong", "p": {"color": "#ffffff", "roughness": 0.05, "clearcoat": 0, "transmission": 1, "thickness": 0.03, "ior": 1.575, "absorb": 0, "sheen": 0, "specular": 1, "opacity": 1, "double": true}},
    {"name": "Nhựa mờ trong (frosted)", "p": {"color": "#ffffff", "roughness": 0.45, "clearcoat": 0, "transmission": 0.9, "thickness": 0.06, "ior": 1.5, "absorb": 0.1, "sheen": 0, "specular": 1, "opacity": 1, "double": true}},
    {"name": "PET chai nước (trong, hơi ngả xanh)", "p": {"color": "#eef8f8", "roughness": 0.035, "clearcoat": 0.85, "clearcoatRoughness": 0.02, "transmission": 1, "thickness": 0.02, "ior": 1.575, "absorb": 0.06, "sheen": 0, "specular": 1, "opacity": 1, "double": true}},
    {"name": "PET chai thực tế (hơi sương)", "p": {"color": "#f2f7f7", "roughness": 0.1, "clearcoat": 0.85, "clearcoatRoughness": 0.03, "transmission": 0.96, "thickness": 0.025, "ior": 1.575, "absorb": 0.08, "sheen": 0, "specular": 1, "opacity": 1, "double": true}},
    {"name": "Nắp HDPE trắng sữa (bán mờ)", "p": {"color": "#f1f1ee", "roughness": 0.4, "clearcoat": 0.22, "clearcoatRoughness": 0.28, "transmission": 0.12, "thickness": 0.04, "ior": 1.54, "absorb": 0.25, "sheen": 0.1, "specular": 0.9, "opacity": 1, "double": false}},
    {"name": "Nắp PP màu bóng khuôn ép", "p": {"roughness": 0.3, "clearcoat": 0.35, "clearcoatRoughness": 0.15, "transmission": 0, "sheen": 0.05, "specular": 1, "ior": 1.49, "opacity": 1, "double": false}},
    {"name": "Cao su / silicone mềm", "p": {"roughness": 0.85, "clearcoat": 0, "transmission": 0, "sheen": 0.6, "specular": 0.5, "opacity": 1, "double": false}},
  ],
  glass: [
    {"name": "Kính trong", "p": {"color": "#ffffff", "tint": 0, "absorb": 0, "roughness": 0, "ior": 1.52, "thickness": 0.08}},
    {"name": "Kính xanh lục nhạt", "p": {"color": "#9fdcc0", "tint": 0, "absorb": 0.4, "roughness": 0, "ior": 1.52, "thickness": 0.1}},
    {"name": "Kính hổ phách", "p": {"color": "#d9822b", "tint": 0.1, "absorb": 0.6, "roughness": 0, "ior": 1.52, "thickness": 0.1}},
    {"name": "Kính xanh coban", "p": {"color": "#2b4fd0", "tint": 0.1, "absorb": 0.6, "roughness": 0, "ior": 1.52, "thickness": 0.1}},
    {"name": "Kính mờ (nhám)", "p": {"color": "#ffffff", "tint": 0, "absorb": 0, "roughness": 0.35, "ior": 1.52, "thickness": 0.08}},
  ],
  water: [
    {"name": "Nước lọc (trong suốt)", "p": {"color": "#d4ecf6", "tint": 0, "absorb": 0.04, "thickness": 1, "ior": 1.333, "roughness": 0, "specular": 1, "turbidity": 0, "deepSat": 0, "surface": 0, "chord": 0, "bend": 1.3, "double": true}},
    {"name": "Nước khoáng (xanh rất nhẹ)", "p": {"color": "#b8e0ee", "tint": 0.02, "absorb": 0.14, "thickness": 1, "ior": 1.333, "roughness": 0, "specular": 1, "turbidity": 0.02, "deepSat": 0.2, "surface": 0, "chord": 0.2, "bend": 1.3, "double": true}},
    {"name": "Nước ép táo (vàng, trong)", "p": {"color": "#e6b02e", "tint": 0.14, "absorb": 0.55, "thickness": 0.9, "ior": 1.34, "roughness": 0.02, "specular": 1, "turbidity": 0.12, "deepSat": 0.7, "surface": 1, "chord": 0.5, "bend": 1, "double": true}},
    {"name": "Nước cam (đục nhẹ)", "p": {"color": "#f08a1a", "tint": 0.28, "absorb": 0.7, "thickness": 0.9, "ior": 1.345, "roughness": 0.02, "specular": 1, "turbidity": 0.45, "deepSat": 0.6, "surface": 1, "chord": 0.5, "bend": 1, "double": true}},
    {"name": "Nước trái cây đỏ (đục nhẹ)", "p": {"color": "#d4202c", "tint": 0.22, "absorb": 0.62, "thickness": 0.9, "ior": 1.34, "roughness": 0.02, "specular": 1, "turbidity": 0.3, "deepSat": 0.7, "surface": 1, "chord": 0.45, "bend": 1, "double": true}},
    {"name": "Nước hồng (dưa hấu / dâu)", "p": {"color": "#ee5876", "tint": 0.25, "absorb": 0.55, "thickness": 0.9, "ior": 1.34, "roughness": 0.02, "specular": 1, "turbidity": 0.35, "deepSat": 0.6, "surface": 1, "chord": 0.45, "bend": 1, "double": true}},
    {"name": "Trà (nâu trong)", "p": {"color": "#a8581c", "tint": 0.1, "absorb": 0.6, "thickness": 0.9, "ior": 1.34, "roughness": 0.01, "specular": 1, "turbidity": 0.05, "deepSat": 0.6, "surface": 0.6, "chord": 0.4, "bend": 1, "double": true}},
    {"name": "Nước ép đục đậm (xoài / cà chua)", "p": {"color": "#f2a00f", "tint": 0.4, "absorb": 0.5, "thickness": 0.9, "ior": 1.35, "roughness": 0.02, "specular": 1, "turbidity": 0.75, "deepSat": 0.5, "surface": 1, "chord": 0.6, "bend": 0.5, "double": true}},
    {"name": "Nước dừa (trắng đục nhẹ)", "p": {"color": "#eee9dd", "tint": 0.5, "absorb": 0.15, "thickness": 0.9, "ior": 1.34, "roughness": 0.02, "specular": 1, "turbidity": 0.55, "deepSat": 0, "surface": 1, "chord": 0.5, "bend": 0.7, "double": true}},
    {"name": "Sữa tươi (đục hoàn toàn)", "p": {"color": "#f6f3ec", "tint": 0.9, "absorb": 0.15, "thickness": 0.8, "ior": 1.35, "roughness": 0.02, "specular": 1, "turbidity": 1, "deepSat": 0, "surface": 1, "chord": 0.3, "bend": 0.1, "double": true}},
    {"name": "Sữa / chất lỏng đục", "p": {"color": "#f3eee4", "tint": 0.8, "absorb": 0.2, "thickness": 0.8, "ior": 1.35, "roughness": 0.02, "specular": 1, "turbidity": 0.9, "deepSat": 0, "surface": 1, "chord": 0.55, "bend": 0.3, "double": true}},
  ],
};

/* ---------- màu (tính trong không gian tuyến tính, đúng như THREE.Color) ---------- */

type RGB = [number, number, number];
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const s2l = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

function hexToLin(hex: string): RGB {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.padEnd(6, "0");
  const n = (i: number) => s2l(parseInt(full.slice(i, i + 2), 16) / 255 || 0);
  return [n(0), n(2), n(4)];
}

function rgbToHsl([r, g, b]: RGB): RGB {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
}

function hslToRgb([h, s, l]: RGB): RGB {
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
    return p;
  };
  return [f(h + 1 / 3), f(h), f(h - 1 / 3)];
}

/** Nước ép ngoài đời ở chỗ dày có màu sâu và rực hơn chỗ mỏng. */
function deepen(hex: string, s: number): RGB {
  const c = hexToLin(hex);
  if (!(s > 0)) return c;
  const [h, sat, l] = rgbToHsl(c);
  return hslToRgb([h, Math.min(1, sat * (1 + s)), Math.max(0.04, l * (1 - 0.35 * s))]);
}

const lerp3 = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const mixWhite = (hex: string, t: number): RGB => lerp3([1, 1, 1], hexToLin(hex), t);

/* ---------- kiểu tối thiểu của vật liệu / hộp bao ---------- */

type LinCol = Col & { setRGB(r: number, g: number, b: number): Col; copy(c: Col): Col };
type PhysMat = Mat & {
  metalness: number;
  side: number;
  ior: number;
  specularIntensity: number;
  thickness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  sheen: number;
  sheenRoughness: number;
  sheenColor: LinCol;
  transmission: number;
  dispersion: number;
  opacity: number;
  transparent: boolean;
  color: LinCol;
  attenuationColor: LinCol;
  attenuationDistance: number;
};
type MeshLike = { renderOrder: number; material?: Mat | Mat[] };
type BoxLike = {
  min: { x: number; y: number; z: number };
  max: { x: number; y: number; z: number };
  setFromObject(o: unknown): BoxLike;
  union(b: BoxLike): BoxLike;
  isEmpty(): boolean;
};
type LiquidApi = {
  setLiquid?: (m: unknown, o: { chord: number; blur: number }) => void;
  setLiquidBounds?: (m: unknown, box: BoxLike, ref: number) => void;
  Box3?: new () => BoxLike;
};
const liquidApi = (): LiquidApi | undefined =>
  typeof window === "undefined" ? undefined : (window as unknown as { MaterialViewer?: LiquidApi }).MaterialViewer;

const FRONT = 0;
const DOUBLE = 2;
const renderOrderOf = (kind: unknown) => (kind === "water" ? 0 : kind === "plastic" ? 1 : kind === "glass" ? 2 : 0);

/* ---------- trạng thái mỗi vật liệu ---------- */

type Snapshot = {
  color: Col; attColor: Col; sheenColor: Col;
  attDist: number; thickness: number; ior: number; specular: number; roughness: number;
  clearcoat: number; clearcoatRoughness: number; sheen: number; sheenRoughness: number;
  transmission: number; dispersion: number; opacity: number; transparent: boolean;
  side: number; metalness: number; kind: unknown; chord: unknown; blur: unknown;
};

export type TuneEntry = {
  id: number; // chỉ số vật liệu trong PartStore
  mat: PhysMat;
  kind: TuneKind;
  baseKind: TuneKind;
  params: TuneParams;
  baseParams: TuneParams;
  /** Chỉ nước: hệ số nhân khoảng hấp thụ, do thanh "Nhạt ↔ Đậm" ở mục Màu nước đặt. */
  densityFactor: number;
  unit: number;
  bounds: BoxLike | null;
  meshes: { o: MeshLike; ro: number }[];
  snap: Snapshot;
  sig: string;
};

export type TuneInfo = { id: number; name: string; kind: TuneKind; canSwitch: boolean; params: TuneParams };

export const tuneInfo = (e: TuneEntry): TuneInfo => ({
  id: e.id,
  name: e.mat.name || KIND_LABEL[e.baseKind],
  kind: e.kind,
  canSwitch: e.baseKind !== "water",
  params: { ...e.params },
});

const num = (p: TuneParams, k: string, d = 0) => (typeof p[k] === "number" && Number.isFinite(p[k]) ? (p[k] as number) : d);
const str = (p: TuneParams, k: string, d: string) => (typeof p[k] === "string" ? (p[k] as string) : d);

const absorbDist = (a: number, unit: number) => (a <= 0.001 ? Infinity : unit * (0.05 + Math.pow(1 - Math.min(a, 1), 2) * 10));
const sigOf = (m: PhysMat) =>
  [m.transmission > 0, m.clearcoat > 0, m.sheen > 0, m.dispersion > 0, m.side, m.transparent, m.attenuationDistance === Infinity].join();

/* ---------- dựng danh sách từ model vừa nạp ---------- */

function cleanParams(raw: unknown): TuneParams {
  const out: TuneParams = {};
  if (raw && typeof raw === "object") {
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      if (typeof v === "number" || typeof v === "string" || typeof v === "boolean") out[k] = v;
    }
  }
  return out;
}

export function buildTunes(v: Viewer, store: PartStore, cfg: Record<string, unknown>): TuneEntry[] {
  const cfgMats = Array.isArray(cfg.materials) ? (cfg.materials as { name?: string; kind?: string; params?: unknown }[]) : [];
  const api = liquidApi();
  const entries: TuneEntry[] = [];
  const byMat = new Map<Mat, TuneEntry>();

  store.mats.forEach((m, id) => {
    const rv = m.userData?.rvKind;
    if (rv !== "water" && rv !== "plastic" && rv !== "glass") return;
    const kind: TuneKind = rv;
    const fromCfg = cleanParams(cfgMats.find((c) => c.name === m.name && c.kind === kind)?.params);
    const params: TuneParams = { ...DEFAULT_PARAMS[kind], ...fromCfg };
    const pm = m as PhysMat;
    const e: TuneEntry = {
      id,
      mat: pm,
      kind,
      baseKind: kind,
      params,
      baseParams: { ...params },
      densityFactor: 1,
      unit: 0,
      bounds: null,
      meshes: [],
      sig: sigOf(pm),
      snap: {
        color: pm.color.clone(), attColor: pm.attenuationColor.clone(), sheenColor: pm.sheenColor.clone(),
        attDist: pm.attenuationDistance, thickness: pm.thickness, ior: pm.ior, specular: pm.specularIntensity,
        roughness: pm.roughness, clearcoat: pm.clearcoat, clearcoatRoughness: pm.clearcoatRoughness,
        sheen: pm.sheen, sheenRoughness: pm.sheenRoughness, transmission: pm.transmission,
        dispersion: pm.dispersion, opacity: pm.opacity, transparent: pm.transparent,
        side: pm.side, metalness: pm.metalness,
        kind: pm.userData.rvKind, chord: pm.userData.rvChord, blur: pm.userData.rvBlur,
      },
    };
    // đơn vị chiều dài (≈ đường kính chai): rvRef do Material Studio ghi vào GLB, hoặc suy từ độ dày
    const ref = pm.userData.rvRef;
    if (typeof ref === "number" && ref > 0) e.unit = ref;
    else if (typeof params.thickness === "number" && params.thickness > 0 && pm.thickness > 0) e.unit = pm.thickness / params.thickness;
    entries.push(e);
    byMat.set(m, e);
  });
  if (!entries.length) return entries;

  // mesh nào dùng vật liệu nào (để đặt lại thứ tự vẽ khi đổi loại) + hộp bao của nước
  v.root.traverse((o) => {
    if (!o.isMesh || !o.material) return;
    for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
      const e = byMat.get(m);
      if (!e) continue;
      const mo = o as unknown as MeshLike;
      e.meshes.push({ o: mo, ro: mo.renderOrder });
      if (api?.Box3) {
        const b = new api.Box3().setFromObject(o);
        if (!b.isEmpty()) {
          if (e.bounds) e.bounds.union(b);
          else e.bounds = b;
        }
      }
    }
  });

  let shared = entries.find((e) => e.unit > 0)?.unit ?? 0;
  if (!(shared > 0) && api?.Box3) {
    const b = new api.Box3().setFromObject(v.root);
    if (!b.isEmpty()) {
      const s = [b.max.x - b.min.x, b.max.y - b.min.y, b.max.z - b.min.z].sort((a, c) => a - c);
      const mid = s[1] ?? 0;
      shared = mid > 0 ? mid : 0;
    }
  }
  for (const e of entries) if (!(e.unit > 0)) e.unit = shared > 0 ? shared : 1;
  return entries;
}

/* ---------- áp thông số lên vật liệu (công thức của Material Studio) ---------- */

export function applyTune(e: TuneEntry) {
  const m = e.mat;
  const p = e.params;
  const u = e.unit;
  const col = str(p, "color", "#ffffff");

  m.userData.rvKind = e.kind;
  m.metalness = 0;
  m.side = p.double ? DOUBLE : FRONT;
  m.ior = num(p, "ior", 1.5);
  m.specularIntensity = num(p, "specular", 1);
  m.thickness = num(p, "thickness") * u;
  m.attenuationColor.setRGB(...hexToLin(col));

  if (e.kind === "plastic") {
    m.color.setRGB(...hexToLin(col));
    m.roughness = num(p, "roughness");
    m.clearcoat = num(p, "clearcoat");
    m.clearcoatRoughness = num(p, "clearcoatRoughness");
    m.sheen = num(p, "sheen");
    m.sheenRoughness = 0.5;
    m.sheenColor.setRGB(...hexToLin(col));
    m.transmission = num(p, "transmission");
    m.attenuationDistance = absorbDist(m.transmission > 0 ? num(p, "absorb") : 0, u);
    m.dispersion = 0;
    m.opacity = num(p, "opacity", 1);
    m.transparent = m.opacity < 1;
  } else {
    const isWater = e.kind === "water";
    const tb = isWater ? num(p, "turbidity") : 0;
    let c = mixWhite(col, num(p, "tint"));
    if (tb > 0) c = lerp3(c, deepen(col, num(p, "deepSat") * 0.5), Math.min(1, tb * 1.6));
    m.color.setRGB(...c);
    // đục = một phần ánh sáng bị tán xạ (hiện như màu khuếch tán), phần còn lại xuyên qua
    m.roughness = Math.min(1, num(p, "roughness") + tb * 0.1);
    m.clearcoat = isWater ? num(p, "surface") : 0;
    m.clearcoatRoughness = 0.02;
    m.sheen = 0;
    m.transmission = isWater ? Math.max(0, 1 - tb * 0.6 - Math.max(0, tb - 0.6)) : 1;
    m.attenuationDistance = absorbDist(num(p, "absorb"), u);
    if (isWater) {
      // độ bẻ cong: nhân độ dày và bù khoảng hấp thụ cùng hệ số để màu nước không đổi
      const bend = Math.max(0.02, num(p, "bend", 1));
      m.thickness = num(p, "thickness") * u * bend;
      if (m.attenuationDistance !== Infinity) m.attenuationDistance *= bend * e.densityFactor;
      m.attenuationColor.setRGB(...deepen(col, num(p, "deepSat")));
    }
    m.dispersion = num(p, "dispersion");
    m.opacity = 1;
    m.transparent = false;
    if (isWater) {
      const chord = num(p, "chord");
      const blur = tb * 0.25;
      m.userData.rvChord = chord;
      m.userData.rvBlur = blur;
      m.userData.rvRef = u;
      const api = liquidApi();
      api?.setLiquid?.(m, { chord, blur });
      if (e.bounds) api?.setLiquidBounds?.(m, e.bounds, u);
    }
  }
  refreshOrder(e);
  const sig = sigOf(m);
  if (sig !== e.sig) {
    e.sig = sig;
    m.needsUpdate = true;
  }
}

function refreshOrder(e: TuneEntry) {
  for (const { o } of e.meshes) {
    const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
    o.renderOrder = ms.reduce((a, x) => Math.max(a, renderOrderOf(x.userData?.rvKind)), 0);
  }
}

/* ---------- thao tác cho giao diện ---------- */

export function setTuneParam(e: TuneEntry, k: string, value: number | string | boolean) {
  e.params = { ...e.params, [k]: value };
  applyTune(e);
}

/** Đổi vỏ giữa nhựa và thủy tinh (nước luôn là nước). */
export function setTuneKind(e: TuneEntry, kind: TuneKind) {
  if (e.baseKind === "water" || kind === "water" || kind === e.kind) return;
  e.kind = kind;
  e.params = { ...DEFAULT_PARAMS[kind], double: e.params.double !== false };
  applyTune(e);
}

export function applyTunePreset(e: TuneEntry, index: number) {
  const preset = TUNE_PRESETS[e.kind][index];
  if (!preset) return;
  e.params = { ...e.params, ...preset.p };
  applyTune(e);
}

/** Mục "Màu nước" nhanh: đổi màu và độ nhạt / đậm nhưng giữ mọi thông số tinh chỉnh khác. */
export function setWaterQuick(e: TuneEntry, hex: string, factor: number) {
  e.params = { ...e.params, color: hex };
  e.densityFactor = factor;
  applyTune(e);
}

export function resetTune(e: TuneEntry) {
  const m = e.mat;
  const s = e.snap;
  e.kind = e.baseKind;
  e.params = { ...e.baseParams };
  e.densityFactor = 1;
  m.color.copy(s.color);
  m.attenuationColor.copy(s.attColor);
  m.sheenColor.copy(s.sheenColor);
  m.attenuationDistance = s.attDist;
  m.thickness = s.thickness;
  m.ior = s.ior;
  m.specularIntensity = s.specular;
  m.roughness = s.roughness;
  m.clearcoat = s.clearcoat;
  m.clearcoatRoughness = s.clearcoatRoughness;
  m.sheen = s.sheen;
  m.sheenRoughness = s.sheenRoughness;
  m.transmission = s.transmission;
  m.dispersion = s.dispersion;
  m.opacity = s.opacity;
  m.transparent = s.transparent;
  m.side = s.side;
  m.metalness = s.metalness;
  m.userData.rvKind = s.kind;
  m.userData.rvChord = s.chord;
  m.userData.rvBlur = s.blur;
  if (e.baseKind === "water") {
    liquidApi()?.setLiquid?.(m, { chord: Number(s.chord) || 0, blur: Number(s.blur) || 0 });
  }
  for (const x of e.meshes) x.o.renderOrder = x.ro;
  e.sig = sigOf(m);
  m.needsUpdate = true;
}
