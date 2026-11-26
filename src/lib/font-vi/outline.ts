/** Mô hình đường viền trung gian dùng chung cho TrueType (bậc 2) và CFF (bậc 3). */

export type Seg =
  | ["M", number, number]
  | ["L", number, number]
  | ["Q", number, number, number, number]
  | ["C", number, number, number, number, number, number]
  | ["Z"];
export type Path = Seg[];
export type BBox = [number, number, number, number]; // xMin, yMin, xMax, yMax
export interface Pt {
  x: number;
  y: number;
  on: boolean;
}

export function ttToPath(contours: Pt[][]): Path {
  const out: Path = [];
  for (const pts of contours) {
    const n = pts.length;
    if (n === 0) continue;
    const first = pts[0] as Pt;
    const si = pts.findIndex((p) => p.on);
    let sx: number;
    let sy: number;
    let seq: Pt[];
    if (si >= 0) {
      const s = pts[si] as Pt;
      sx = s.x;
      sy = s.y;
      seq = [...pts.slice(si + 1), ...pts.slice(0, si + 1)];
    } else {
      const last = pts[n - 1] as Pt;
      sx = (first.x + last.x) / 2;
      sy = (first.y + last.y) / 2;
      seq = [...pts, { x: sx, y: sy, on: true }];
    }
    out.push(["M", sx, sy]);
    let ctrl: Pt | null = null;
    for (const p of seq) {
      if (p.on) {
        if (ctrl) {
          out.push(["Q", ctrl.x, ctrl.y, p.x, p.y]);
          ctrl = null;
        } else out.push(["L", p.x, p.y]);
      } else {
        if (ctrl) out.push(["Q", ctrl.x, ctrl.y, (ctrl.x + p.x) / 2, (ctrl.y + p.y) / 2]);
        ctrl = p;
      }
    }
    out.push(["Z"]);
  }
  return out;
}

function splitCubicToQuads(p0: [number, number], c1: [number, number], c2: [number, number], p3: [number, number]): Seg[] {
  const mid = (a: [number, number], b: [number, number]): [number, number] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const a = mid(p0, c1);
  const b = mid(c1, c2);
  const c = mid(c2, p3);
  const ab = mid(a, b);
  const bc = mid(b, c);
  const m = mid(ab, bc);
  const approx = (s: [number, number], q1: [number, number], q2: [number, number], e: [number, number]): Seg => [
    "Q",
    (3 * (q1[0] + q2[0]) - (s[0] + e[0])) / 4,
    (3 * (q1[1] + q2[1]) - (s[1] + e[1])) / 4,
    e[0],
    e[1],
  ];
  return [approx(p0, a, ab, m), approx(m, bc, c, p3)];
}

/** Đường viền -> các contour TrueType (điểm on/off-curve). Cubic được xấp xỉ bằng 2 quad. */
export function pathToTt(path: Path): Pt[][] {
  const result: Pt[][] = [];
  let cur: Pt[] = [];
  let cx = 0;
  let cy = 0;
  const flush = () => {
    if (cur.length > 1) {
      const f = cur[0] as Pt;
      const l = cur[cur.length - 1] as Pt;
      if (l.on && l.x === f.x && l.y === f.y) cur.pop();
    }
    if (cur.length >= 2) result.push(cur);
    cur = [];
  };
  const add = (x: number, y: number, on: boolean) => cur.push({ x: Math.round(x), y: Math.round(y), on });
  for (const s of path) {
    switch (s[0]) {
      case "M":
        flush();
        add(s[1], s[2], true);
        cx = s[1];
        cy = s[2];
        break;
      case "L":
        add(s[1], s[2], true);
        cx = s[1];
        cy = s[2];
        break;
      case "Q":
        add(s[1], s[2], false);
        add(s[3], s[4], true);
        cx = s[3];
        cy = s[4];
        break;
      case "C": {
        for (const q of splitCubicToQuads([cx, cy], [s[1], s[2]], [s[3], s[4]], [s[5], s[6]])) {
          if (q[0] === "Q") {
            add(q[1], q[2], false);
            add(q[3], q[4], true);
          }
        }
        cx = s[5];
        cy = s[6];
        break;
      }
      case "Z":
        flush();
        break;
    }
  }
  flush();
  return result;
}

/** Quad -> cubic chính xác (CFF chỉ có cubic). */
export function pathToCubic(path: Path): Path {
  const out: Path = [];
  let cx = 0;
  let cy = 0;
  for (const s of path) {
    if (s[0] === "Q") {
      out.push(["C", cx + (2 / 3) * (s[1] - cx), cy + (2 / 3) * (s[2] - cy), s[3] + (2 / 3) * (s[1] - s[3]), s[4] + (2 / 3) * (s[2] - s[4]), s[3], s[4]]);
      cx = s[3];
      cy = s[4];
    } else {
      out.push(s);
      if (s[0] === "M" || s[0] === "L") {
        cx = s[1];
        cy = s[2];
      } else if (s[0] === "C") {
        cx = s[5];
        cy = s[6];
      }
    }
  }
  return out;
}

export function transformPath(path: Path, scale: number, dx: number, dy: number): Path {
  const f = (v: number, d: number) => v * scale + d;
  return path.map((s): Seg => {
    switch (s[0]) {
      case "M":
        return ["M", f(s[1], dx), f(s[2], dy)];
      case "L":
        return ["L", f(s[1], dx), f(s[2], dy)];
      case "Q":
        return ["Q", f(s[1], dx), f(s[2], dy), f(s[3], dx), f(s[4], dy)];
      case "C":
        return ["C", f(s[1], dx), f(s[2], dy), f(s[3], dx), f(s[4], dy), f(s[5], dx), f(s[6], dy)];
      default:
        return ["Z"];
    }
  });
}

/** Ma trận 2×2 + dịch chuyển (dùng khi giải component TrueType). */
export function transformPathMatrix(path: Path, a: number, b: number, c: number, d: number, dx: number, dy: number): Path {
  const X = (x: number, y: number) => a * x + c * y + dx;
  const Y = (x: number, y: number) => b * x + d * y + dy;
  return path.map((s): Seg => {
    switch (s[0]) {
      case "M":
        return ["M", X(s[1], s[2]), Y(s[1], s[2])];
      case "L":
        return ["L", X(s[1], s[2]), Y(s[1], s[2])];
      case "Q":
        return ["Q", X(s[1], s[2]), Y(s[1], s[2]), X(s[3], s[4]), Y(s[3], s[4])];
      case "C":
        return ["C", X(s[1], s[2]), Y(s[1], s[2]), X(s[3], s[4]), Y(s[3], s[4]), X(s[5], s[6]), Y(s[5], s[6])];
      default:
        return ["Z"];
    }
  });
}

/** Hộp bao chính xác (tính cả điểm cực trị của đường cong). */
export function pathBBox(path: Path): BBox | null {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  const add = (x: number, y: number) => {
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  };
  let cx = 0;
  let cy = 0;
  for (const s of path) {
    if (s[0] === "M" || s[0] === "L") {
      add(s[1], s[2]);
      cx = s[1];
      cy = s[2];
    } else if (s[0] === "Q") {
      add(s[3], s[4]);
      for (const [p0, c, p1, axis] of [
        [cx, s[1], s[3], 0],
        [cy, s[2], s[4], 1],
      ] as const) {
        const den = p0 - 2 * c + p1;
        if (den !== 0) {
          const t = (p0 - c) / den;
          if (t > 0 && t < 1) {
            const u = 1 - t;
            const qx = axis === 0 ? u * u * p0 + 2 * u * t * c + t * t * p1 : u * u * cx + 2 * u * t * s[1] + t * t * s[3];
            const qy = axis === 1 ? u * u * p0 + 2 * u * t * c + t * t * p1 : u * u * cy + 2 * u * t * s[2] + t * t * s[4];
            add(qx, qy);
          }
        }
      }
      cx = s[3];
      cy = s[4];
    } else if (s[0] === "C") {
      add(s[5], s[6]);
      const evalAt = (a: number, b: number, c2: number, d: number, t: number) => {
        const u = 1 - t;
        return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c2 + t * t * t * d;
      };
      for (const axis of [0, 1]) {
        const p0 = axis === 0 ? cx : cy;
        const p1 = axis === 0 ? s[1] : s[2];
        const p2 = axis === 0 ? s[3] : s[4];
        const p3 = axis === 0 ? s[5] : s[6];
        const a = -p0 + 3 * p1 - 3 * p2 + p3;
        const b = 2 * (p0 - 2 * p1 + p2);
        const c = p1 - p0;
        const roots: number[] = [];
        if (Math.abs(a) < 1e-9) {
          if (Math.abs(b) > 1e-9) roots.push(-c / b);
        } else {
          const disc = b * b - 4 * a * c;
          if (disc >= 0) {
            const sq = Math.sqrt(disc);
            roots.push((-b + sq) / (2 * a), (-b - sq) / (2 * a));
          }
        }
        for (const t of roots) {
          if (t > 0 && t < 1) {
            add(
              evalAt(cx, s[1], s[3], s[5], t),
              evalAt(cy, s[2], s[4], s[6], t),
            );
          }
        }
      }
      cx = s[5];
      cy = s[6];
    }
  }
  return Number.isFinite(x0) ? [x0, y0, x1, y1] : null;
}

export function unionBBox(a: BBox | null, b: BBox | null): BBox | null {
  if (!a) return b;
  if (!b) return a;
  return [Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[2], b[2]), Math.max(a[3], b[3])];
}

/** Tách thành các contour riêng (mỗi contour bắt đầu bằng M). */
export function splitContours(path: Path): Path[] {
  const out: Path[] = [];
  let cur: Path = [];
  for (const s of path) {
    if (s[0] === "M" && cur.length) {
      out.push(cur);
      cur = [];
    }
    cur.push(s);
  }
  if (cur.length) out.push(cur);
  return out;
}

export function reverseContour(c: Path): Path {
  const segs = c.filter((s) => s[0] !== "Z");
  const first = segs[0];
  if (!first || first[0] !== "M") return c;
  const starts: [number, number][] = [];
  let px = first[1];
  let py = first[2];
  for (const s of segs.slice(1)) {
    starts.push([px, py]);
    if (s[0] === "L") {
      px = s[1];
      py = s[2];
    } else if (s[0] === "Q") {
      px = s[3];
      py = s[4];
    } else if (s[0] === "C") {
      px = s[5];
      py = s[6];
    }
  }
  const body = segs.slice(1);
  const out: Path = [["M", px, py]];
  for (let i = body.length - 1; i >= 0; i--) {
    const s = body[i] as Seg;
    const st = starts[i] as [number, number];
    if (s[0] === "L") out.push(["L", st[0], st[1]]);
    else if (s[0] === "Q") out.push(["Q", s[1], s[2], st[0], st[1]]);
    else if (s[0] === "C") out.push(["C", s[3], s[4], s[1], s[2], st[0], st[1]]);
  }
  out.push(["Z"]);
  return out;
}

/** Diện tích có dấu của contour (dương = ngược chiều kim đồng hồ khi trục y hướng lên). */
export function contourArea(c: Path): number {
  const pts: [number, number][] = [];
  for (const s of c) {
    if (s[0] === "M" || s[0] === "L") pts.push([s[1], s[2]]);
    else if (s[0] === "Q") pts.push([s[1], s[2]], [s[3], s[4]]);
    else if (s[0] === "C") pts.push([s[1], s[2]], [s[3], s[4]], [s[5], s[6]]);
  }
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i] as [number, number];
    const q = pts[(i + 1) % pts.length] as [number, number];
    a += p[0] * q[1] - q[0] * p[1];
  }
  return a / 2;
}

/** Ép chiều contour: TrueType ngoài = thuận kim đồng hồ, CFF ngoài = ngược kim đồng hồ. */
export function orientPath(path: Path, clockwise: boolean): Path {
  const out: Path = [];
  for (const c of splitContours(path)) {
    const area = contourArea(c);
    const isCw = area < 0;
    out.push(...(isCw === clockwise ? c : reverseContour(c)));
  }
  return out;
}

export function roundPath(path: Path): Path {
  return path.map((s): Seg => (s[0] === "Z" ? s : ([s[0], ...s.slice(1).map((v) => Math.round(v as number))] as Seg)));
}

export function pathToSvgD(path: Path): string {
  const f = (n: number) => (Math.round(n * 10) / 10).toString();
  return path
    .map((s) => (s[0] === "Z" ? "Z" : `${s[0]}${s.slice(1).map((v) => f(v as number)).join(" ")}`))
    .join("");
}
