/** Đọc file SVG (do người dùng tự thiết kế dấu / râu) thành Path theo hệ tọa độ font (trục Y hướng lên). */

import { pathBBox, roundPath, transformPath, transformPathMatrix, type BBox, type Path, type Seg } from "./outline";

type Mat = [number, number, number, number, number, number];

const IDENT: Mat = [1, 0, 0, 1, 0, 0];

// parent ∘ child (child áp dụng trước)
const mul = (m: Mat, n: Mat): Mat => [
  m[0] * n[0] + m[2] * n[1],
  m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3],
  m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4],
  m[1] * n[4] + m[3] * n[5] + m[5],
];

function parseTransform(src: string | null): Mat {
  let m: Mat = IDENT;
  if (!src) return m;
  const re = /(matrix|translate|scale|rotate|skewX|skewY)\s*\(([^)]*)\)/g;
  let hit: RegExpExecArray | null;
  while ((hit = re.exec(src))) {
    const a = (hit[2] ?? "")
      .trim()
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(Number);
    if (a.some((v) => !Number.isFinite(v))) continue;
    let t: Mat = IDENT;
    switch (hit[1]) {
      case "matrix":
        if (a.length >= 6) t = [a[0] as number, a[1] as number, a[2] as number, a[3] as number, a[4] as number, a[5] as number];
        break;
      case "translate":
        t = [1, 0, 0, 1, a[0] ?? 0, a[1] ?? 0];
        break;
      case "scale":
        t = [a[0] ?? 1, 0, 0, a[1] ?? a[0] ?? 1, 0, 0];
        break;
      case "rotate": {
        const r = ((a[0] ?? 0) * Math.PI) / 180;
        const c = Math.cos(r);
        const s = Math.sin(r);
        const cx = a[1] ?? 0;
        const cy = a[2] ?? 0;
        t = mul(mul([1, 0, 0, 1, cx, cy], [c, s, -s, c, 0, 0]), [1, 0, 0, 1, -cx, -cy]);
        break;
      }
      case "skewX":
        t = [1, 0, Math.tan(((a[0] ?? 0) * Math.PI) / 180), 1, 0, 0];
        break;
      case "skewY":
        t = [1, Math.tan(((a[0] ?? 0) * Math.PI) / 180), 0, 1, 0, 0];
        break;
    }
    m = mul(m, t);
  }
  return m;
}

function arcToCubics(x1: number, y1: number, rxIn: number, ryIn: number, phiDeg: number, fa: number, fs: number, x2: number, y2: number): Seg[] {
  if (rxIn === 0 || ryIn === 0) return [["L", x2, y2]];
  if (x1 === x2 && y1 === y2) return [];
  let rx = Math.abs(rxIn);
  let ry = Math.abs(ryIn);
  const phi = (phiDeg * Math.PI) / 180;
  const cos = Math.cos(phi);
  const sin = Math.sin(phi);
  const dx = (x1 - x2) / 2;
  const dy = (y1 - y2) / 2;
  const x1p = cos * dx + sin * dy;
  const y1p = -sin * dx + cos * dy;
  const lam = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
  if (lam > 1) {
    const s = Math.sqrt(lam);
    rx *= s;
    ry *= s;
  }
  const sign = fa === fs ? -1 : 1;
  const num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
  const den = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
  const co = den === 0 ? 0 : sign * Math.sqrt(Math.max(0, num / den));
  const cxp = (co * rx * y1p) / ry;
  const cyp = (-co * ry * x1p) / rx;
  const cx = cos * cxp - sin * cyp + (x1 + x2) / 2;
  const cy = sin * cxp + cos * cyp + (y1 + y2) / 2;
  const ang = (ux: number, uy: number, vx: number, vy: number) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
  const th1 = ang(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
  let dth = ang((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
  if (!fs && dth > 0) dth -= 2 * Math.PI;
  else if (fs && dth < 0) dth += 2 * Math.PI;
  const n = Math.max(1, Math.ceil(Math.abs(dth) / (Math.PI / 2) - 1e-9));
  const delta = dth / n;
  const t = (4 / 3) * Math.tan(delta / 4);
  const P = (a: number): [number, number] => [cx + rx * Math.cos(a) * cos - ry * Math.sin(a) * sin, cy + rx * Math.cos(a) * sin + ry * Math.sin(a) * cos];
  const D = (a: number): [number, number] => [-rx * Math.sin(a) * cos - ry * Math.cos(a) * sin, -rx * Math.sin(a) * sin + ry * Math.cos(a) * cos];
  const out: Seg[] = [];
  for (let k = 0; k < n; k++) {
    const a1 = th1 + k * delta;
    const a2 = a1 + delta;
    const p1 = P(a1);
    const d1 = D(a1);
    const p2 = P(a2);
    const d2 = D(a2);
    const end: [number, number] = k === n - 1 ? [x2, y2] : p2;
    out.push(["C", p1[0] + t * d1[0], p1[1] + t * d1[1], p2[0] - t * d2[0], p2[1] - t * d2[1], end[0], end[1]]);
  }
  return out;
}

const NUM = /[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/y;

/** Chuyển thuộc tính d của <path> thành Path tuyệt đối (vẫn theo trục Y hướng xuống của SVG). */
function parseD(d: string): Path {
  const out: Path = [];
  const n = d.length;
  let i = 0;
  let cx = 0;
  let cy = 0;
  let sx = 0;
  let sy = 0;
  let open = false;
  let lastC: [number, number] | null = null;
  let lastQ: [number, number] | null = null;
  let cmd = "";

  const ws = () => {
    while (i < n && /[\s,]/.test(d[i] as string)) i++;
  };
  const num = (): number | null => {
    ws();
    NUM.lastIndex = i;
    const m = NUM.exec(d);
    if (!m) return null;
    i += m[0].length;
    return parseFloat(m[0]);
  };
  const flag = (): number | null => {
    ws();
    const c = d[i];
    if (c === "0" || c === "1") {
      i++;
      return Number(c);
    }
    return null;
  };
  const take = (k: number): number[] | null => {
    const r: number[] = [];
    for (let j = 0; j < k; j++) {
      const v = num();
      if (v === null) return null;
      r.push(v);
    }
    return r;
  };
  const ensureOpen = () => {
    if (!open) {
      out.push(["M", cx, cy]);
      sx = cx;
      sy = cy;
      open = true;
    }
  };

  while (true) {
    ws();
    if (i >= n) break;
    const ch = d[i] as string;
    if (/[A-Za-z]/.test(ch)) {
      cmd = ch;
      i++;
    } else if (!cmd) break;
    const rel = cmd === cmd.toLowerCase();
    const C = cmd.toUpperCase();
    const ox = rel ? cx : 0;
    const oy = rel ? cy : 0;

    if (C === "Z") {
      if (open) out.push(["Z"]);
      open = false;
      cx = sx;
      cy = sy;
      lastC = lastQ = null;
      cmd = "";
      continue;
    }
    if (C === "M") {
      const v = take(2);
      if (!v) break;
      if (open) out.push(["Z"]);
      cx = ox + (v[0] as number);
      cy = oy + (v[1] as number);
      sx = cx;
      sy = cy;
      out.push(["M", cx, cy]);
      open = true;
      lastC = lastQ = null;
      cmd = rel ? "l" : "L";
    } else if (C === "L") {
      const v = take(2);
      if (!v) break;
      ensureOpen();
      cx = ox + (v[0] as number);
      cy = oy + (v[1] as number);
      out.push(["L", cx, cy]);
      lastC = lastQ = null;
    } else if (C === "H") {
      const v = take(1);
      if (!v) break;
      ensureOpen();
      cx = ox + (v[0] as number);
      out.push(["L", cx, cy]);
      lastC = lastQ = null;
    } else if (C === "V") {
      const v = take(1);
      if (!v) break;
      ensureOpen();
      cy = oy + (v[0] as number);
      out.push(["L", cx, cy]);
      lastC = lastQ = null;
    } else if (C === "C") {
      const v = take(6);
      if (!v) break;
      ensureOpen();
      const [x1, y1, x2, y2, x, y] = [ox + (v[0] as number), oy + (v[1] as number), ox + (v[2] as number), oy + (v[3] as number), ox + (v[4] as number), oy + (v[5] as number)];
      out.push(["C", x1, y1, x2, y2, x, y]);
      lastC = [x2, y2];
      lastQ = null;
      cx = x;
      cy = y;
    } else if (C === "S") {
      const v = take(4);
      if (!v) break;
      ensureOpen();
      const x1: number = lastC ? 2 * cx - lastC[0] : cx;
      const y1: number = lastC ? 2 * cy - lastC[1] : cy;
      const [x2, y2, x, y] = [ox + (v[0] as number), oy + (v[1] as number), ox + (v[2] as number), oy + (v[3] as number)];
      out.push(["C", x1, y1, x2, y2, x, y]);
      lastC = [x2, y2];
      lastQ = null;
      cx = x;
      cy = y;
    } else if (C === "Q") {
      const v = take(4);
      if (!v) break;
      ensureOpen();
      const [x1, y1, x, y] = [ox + (v[0] as number), oy + (v[1] as number), ox + (v[2] as number), oy + (v[3] as number)];
      out.push(["Q", x1, y1, x, y]);
      lastQ = [x1, y1];
      lastC = null;
      cx = x;
      cy = y;
    } else if (C === "T") {
      const v = take(2);
      if (!v) break;
      ensureOpen();
      const x1: number = lastQ ? 2 * cx - lastQ[0] : cx;
      const y1: number = lastQ ? 2 * cy - lastQ[1] : cy;
      const x = ox + (v[0] as number);
      const y = oy + (v[1] as number);
      out.push(["Q", x1, y1, x, y]);
      lastQ = [x1, y1];
      lastC = null;
      cx = x;
      cy = y;
    } else if (C === "A") {
      const rx = num();
      const ry = num();
      const rot = num();
      const fa = flag();
      const fs = flag();
      const x = num();
      const y = num();
      if (rx === null || ry === null || rot === null || fa === null || fs === null || x === null || y === null) break;
      ensureOpen();
      const ex = ox + x;
      const ey = oy + y;
      out.push(...arcToCubics(cx, cy, rx, ry, rot, fa, fs, ex, ey));
      cx = ex;
      cy = ey;
      lastC = lastQ = null;
    } else break;
  }
  if (open) out.push(["Z"]);
  return out;
}

const attrNum = (el: Element, name: string, def = 0): number => {
  const v = parseFloat(el.getAttribute(name) ?? "");
  return Number.isFinite(v) ? v : def;
};

function styleOf(el: Element, prop: string): string | null {
  const direct = el.getAttribute(prop);
  const style = el.getAttribute("style");
  if (style) {
    const m = new RegExp(`(?:^|;)\\s*${prop}\\s*:\\s*([^;]+)`, "i").exec(style);
    if (m) return (m[1] as string).trim();
  }
  return direct ? direct.trim() : null;
}

function shapeToD(el: Element): string | null {
  switch (el.tagName.toLowerCase()) {
    case "path":
      return el.getAttribute("d");
    case "rect": {
      const x = attrNum(el, "x");
      const y = attrNum(el, "y");
      const w = attrNum(el, "width");
      const h = attrNum(el, "height");
      if (w <= 0 || h <= 0) return null;
      let rx = attrNum(el, "rx", NaN);
      let ry = attrNum(el, "ry", NaN);
      if (Number.isNaN(rx) && Number.isNaN(ry)) return `M${x} ${y}H${x + w}V${y + h}H${x}Z`;
      if (Number.isNaN(rx)) rx = ry;
      if (Number.isNaN(ry)) ry = rx;
      rx = Math.min(rx, w / 2);
      ry = Math.min(ry, h / 2);
      return `M${x + rx} ${y}H${x + w - rx}A${rx} ${ry} 0 0 1 ${x + w} ${y + ry}V${y + h - ry}A${rx} ${ry} 0 0 1 ${x + w - rx} ${y + h}H${x + rx}A${rx} ${ry} 0 0 1 ${x} ${y + h - ry}V${y + ry}A${rx} ${ry} 0 0 1 ${x + rx} ${y}Z`;
    }
    case "circle": {
      const cx = attrNum(el, "cx");
      const cy = attrNum(el, "cy");
      const r = attrNum(el, "r");
      if (r <= 0) return null;
      return `M${cx - r} ${cy}A${r} ${r} 0 1 0 ${cx + r} ${cy}A${r} ${r} 0 1 0 ${cx - r} ${cy}Z`;
    }
    case "ellipse": {
      const cx = attrNum(el, "cx");
      const cy = attrNum(el, "cy");
      const rx = attrNum(el, "rx");
      const ry = attrNum(el, "ry");
      if (rx <= 0 || ry <= 0) return null;
      return `M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}Z`;
    }
    case "polygon":
    case "polyline": {
      const v = (el.getAttribute("points") ?? "").trim().split(/[\s,]+/).map(Number);
      if (v.length < 6 || v.some((x) => !Number.isFinite(x))) return null;
      let d = `M${v[0]} ${v[1]}`;
      for (let k = 2; k + 1 < v.length; k += 2) d += `L${v[k]} ${v[k + 1]}`;
      return `${d}Z`;
    }
    default:
      return null;
  }
}

const SKIP = new Set(["defs", "clippath", "mask", "symbol", "style", "title", "desc", "metadata", "pattern", "marker", "lineargradient", "radialgradient", "filter"]);

export interface SvgResult {
  /** Đường viền theo tọa độ font (Y hướng lên), chưa co giãn. */
  path: Path;
  /** Có hình chỉ có nét viền (stroke, không tô) bị bỏ qua. */
  skippedStroke: boolean;
}

/** Đọc file SVG: lấy mọi hình tô đặc (path, rect, circle, ellipse, polygon) gộp thành một Path. */
export function parseSvgToPath(text: string): SvgResult | null {
  const doc = new DOMParser().parseFromString(text, "image/svg+xml");
  const root = doc.documentElement;
  if (!root || root.tagName.toLowerCase() !== "svg" || doc.getElementsByTagName("parsererror").length > 0) return null;

  const out: Path = [];
  let skippedStroke = false;

  const walk = (el: Element, parent: Mat) => {
    const tag = el.tagName.toLowerCase();
    if (SKIP.has(tag)) return;
    if (styleOf(el, "display") === "none") return;
    const m = mul(parent, parseTransform(el.getAttribute("transform")));
    const d = shapeToD(el);
    if (d) {
      const fill = styleOf(el, "fill");
      if (fill === "none" || fill === "transparent") {
        skippedStroke = true;
      } else {
        const p = parseD(d);
        if (p.length) out.push(...transformPathMatrix(p, m[0], m[1], m[2], m[3], m[4], m[5]));
      }
    }
    for (const child of Array.from(el.children)) walk(child, m);
  };
  walk(root, IDENT);

  if (!out.length) return { path: [], skippedStroke };
  // SVG: Y hướng xuống → font: Y hướng lên
  return { path: transformPathMatrix(out, 1, 0, 0, -1, 0, 0), skippedStroke };
}

/** Co hình vào vừa khung `target` (giữ tỉ lệ), căn giữa khung. */
export function fitPath(path: Path, target: BBox): Path {
  const b = pathBBox(path);
  if (!b) return path;
  const sw = b[2] - b[0];
  const sh = b[3] - b[1];
  const tw = target[2] - target[0];
  const th = target[3] - target[1];
  if (sw <= 0 || sh <= 0 || tw <= 0 || th <= 0) return path;
  const s = Math.min(tw / sw, th / sh);
  const dx = (target[0] + target[2]) / 2 - (s * (b[0] + b[2])) / 2;
  const dy = (target[1] + target[3]) / 2 - (s * (b[1] + b[3])) / 2;
  return roundPath(transformPath(path, s, dx, dy));
}

/** Phóng to / thu nhỏ quanh tâm hình. */
export function scaleAround(path: Path, factor: number): Path {
  const b = pathBBox(path);
  if (!b) return path;
  const cx = (b[0] + b[2]) / 2;
  const cy = (b[1] + b[3]) / 2;
  return roundPath(transformPath(path, factor, cx - factor * cx, cy - factor * cy));
}
