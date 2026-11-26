import type { BBox, Path } from "./outline";
import type { MarkKind } from "./vi";

/** Sinh hình dấu mặc định khi font không có sẵn (người dùng có thể chỉnh lại trong Glyph Editor). */

export interface Metrics {
  upem: number;
  xHeight: number;
  capHeight: number;
  ascender: number;
  stem: number; // độ dày nét ngang
  italic: number; // độ nghiêng (độ, âm = nghiêng phải)
}

type P = [number, number];

function quad(a: P, c: P, b: P, t: number): P {
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]];
}

/** Lấy mẫu đường tâm: dãy đoạn Q (có điểm điều khiển) hoặc đoạn thẳng. */
function centerline(start: P, parts: { c?: P; to: P }[], per = 18): P[] {
  const out: P[] = [start];
  let cur = start;
  for (const p of parts) {
    if (p.c) for (let i = 1; i <= per; i++) out.push(quad(cur, p.c, p.to, i / per));
    else out.push(p.to);
    cur = p.to;
  }
  return out;
}

/** Biến đường tâm thành viền khép kín với độ dày thay đổi. */
function stroke(pts: P[], widthAt: (u: number) => number): Path {
  const n = pts.length;
  const left: P[] = [];
  const right: P[] = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)] as P;
    const b = pts[Math.min(n - 1, i + 1)] as P;
    let tx = b[0] - a[0];
    let ty = b[1] - a[1];
    const len = Math.hypot(tx, ty) || 1;
    tx /= len;
    ty /= len;
    const w = widthAt(i / (n - 1)) / 2;
    const p = pts[i] as P;
    left.push([p[0] - ty * w, p[1] + tx * w]);
    right.push([p[0] + ty * w, p[1] - tx * w]);
  }
  const path: Path = [["M", (left[0] as P)[0], (left[0] as P)[1]]];
  for (const p of left.slice(1)) path.push(["L", p[0], p[1]]);
  for (const p of right.slice().reverse()) path.push(["L", p[0], p[1]]);
  path.push(["Z"]);
  return path;
}

function poly(points: P[]): Path {
  const path: Path = points.map((p, i) => (i === 0 ? (["M", p[0], p[1]] as const) : (["L", p[0], p[1]] as const))) as Path;
  path.push(["Z"]);
  return path;
}

export function genCircle(r: number): Path {
  const k = r / Math.cos(Math.PI / 8);
  const path: Path = [["M", r, 0]];
  for (let i = 1; i <= 8; i++) {
    const a = (i * Math.PI) / 4;
    const c = a - Math.PI / 8;
    path.push(["Q", Math.cos(c) * k, Math.sin(c) * k, Math.cos(a) * r, Math.sin(a) * r]);
  }
  path.push(["Z"]);
  return path;
}

export function genMark(kind: MarkKind, m: Metrics): Path {
  const x = m.xHeight;
  const t = Math.max(m.stem, m.upem * 0.04);
  switch (kind) {
    case "acute": {
      const w = 0.34 * x;
      const h = 0.4 * x;
      const tt = 1.3 * t;
      return poly([[0, 0], [tt, 0], [w, h], [w - tt, h]]);
    }
    case "grave": {
      const w = 0.34 * x;
      const h = 0.4 * x;
      const tt = 1.3 * t;
      return poly([[w, 0], [w - tt, 0], [0, h], [tt, h]]);
    }
    case "circumflex": {
      const w = 0.6 * x;
      const h = 0.38 * x;
      const tt = 1.15 * t;
      return poly([[0, 0], [w / 2, h], [w, 0], [w - tt, 0], [w / 2, h - 1.7 * t], [tt, 0]]);
    }
    case "breve": {
      const w = 0.56 * x;
      const h = 0.3 * x;
      return [
        ["M", 0, h],
        ["Q", w / 2, -0.9 * h, w, h],
        ["L", w - 0.9 * t, h],
        ["Q", w / 2, -0.9 * h + 2.1 * t, 0.9 * t, h],
        ["Z"],
      ];
    }
    case "tilde": {
      const w = 0.58 * x;
      const h = 0.24 * x;
      const line = centerline([0, 0.3 * h], [
        { c: [w * 0.22, h * 1.15], to: [w * 0.5, 0.55 * h] },
        { c: [w * 0.78, -0.1 * h], to: [w, 0.75 * h] },
      ]);
      return stroke(line, (u) => 0.9 * t * (0.75 + 0.25 * Math.sin(Math.PI * u)));
    }
    case "hook": {
      const w = 0.32 * x;
      const h = 0.4 * x;
      const line = centerline([0.08 * w, 0.72 * h], [
        { c: [0.1 * w, h], to: [0.5 * w, h] },
        { c: [w * 0.97, h], to: [w * 0.97, 0.74 * h] },
        { c: [w * 0.97, 0.48 * h], to: [0.5 * w, 0.4 * h] },
        { to: [0.5 * w, 0.05 * h] },
      ]);
      return stroke(line, (u) => t * (u > 0.9 ? 1 : 0.95));
    }
    case "dotbelow":
      return genCircle(Math.max(t * 0.62, m.upem * 0.03));
    case "horn":
      return [];
  }
}

/** Gạch ngang của Đ/đ (độ dày = nét ngang của font). */
export function genBar(m: Metrics, width: number): Path {
  const t = Math.max(m.stem, m.upem * 0.04);
  return poly([[0, 0], [width, 0], [width, t], [0, t]]);
}

/** Râu của Ơ/ơ/Ư/ư, tính theo hộp bao của chữ gốc. round = ơ/Ơ (bầu tròn), false = ư/Ư (thân đứng). */
export function genHorn(b: BBox, round: boolean, m: Metrics): Path {
  const w = b[2] - b[0];
  const h = b[3] - b[1];
  const t = Math.max(m.stem, m.upem * 0.04);
  const tv = 1.1 * t;
  if (round) {
    const rx = b[2] - 0.146 * w;
    const ry = b[3] - 0.146 * h;
    const line = centerline([rx - 0.45 * t, ry - 0.45 * t], [{ c: [rx + 0.16 * w, ry - 0.03 * h], to: [rx + 0.15 * w, ry + 0.27 * h] }]);
    return stroke(line, (u) => t * (1 - 0.3 * u));
  }
  const sx = b[2] - 0.5 * tv;
  const sy = b[3] - 0.4 * t;
  const line = centerline([sx, sy - 0.5 * t], [{ c: [sx + 0.2 * w, sy], to: [sx + 0.16 * w, sy + 0.3 * h] }]);
  return stroke(line, (u) => t * (1 - 0.3 * u));
}
