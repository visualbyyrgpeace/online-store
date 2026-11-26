import { Writer, i16, u16, u8 } from "./bytes";
import { pathBBox, ttToPath, transformPathMatrix, type BBox, type Path, type Pt } from "./outline";

/** Đọc/ghi bảng glyf (TrueType). */

export interface Component {
  gid: number;
  dx: number;
  dy: number;
  a: number;
  b: number;
  c: number;
  d: number;
  flags: number;
}

const f2dot14 = (d: Uint8Array, o: number) => i16(d, o) / 16384;

export function glyphHeaderBBox(g: Uint8Array): BBox | null {
  if (g.length < 10) return null;
  return [i16(g, 2), i16(g, 4), i16(g, 6), i16(g, 8)];
}

export function numberOfContours(g: Uint8Array): number {
  return g.length < 10 ? 0 : i16(g, 0);
}

export function readSimpleGlyph(g: Uint8Array): Pt[][] {
  const nc = i16(g, 0);
  if (nc <= 0) return [];
  let o = 10;
  const ends: number[] = [];
  for (let i = 0; i < nc; i++) {
    ends.push(u16(g, o));
    o += 2;
  }
  const nPts = (ends[nc - 1] as number) + 1;
  const il = u16(g, o);
  o += 2 + il;
  const flags: number[] = [];
  while (flags.length < nPts) {
    const f = u8(g, o++);
    flags.push(f);
    if (f & 8) {
      let r = u8(g, o++);
      while (r-- > 0 && flags.length < nPts) flags.push(f);
    }
  }
  const xs: number[] = [];
  let x = 0;
  for (const f of flags) {
    if (f & 2) {
      const dx = u8(g, o++);
      x += f & 16 ? dx : -dx;
    } else if (!(f & 16)) {
      x += i16(g, o);
      o += 2;
    }
    xs.push(x);
  }
  const ys: number[] = [];
  let y = 0;
  for (const f of flags) {
    if (f & 4) {
      const dy = u8(g, o++);
      y += f & 32 ? dy : -dy;
    } else if (!(f & 32)) {
      y += i16(g, o);
      o += 2;
    }
    ys.push(y);
  }
  const contours: Pt[][] = [];
  let start = 0;
  for (const end of ends) {
    const c: Pt[] = [];
    for (let i = start; i <= end; i++) c.push({ x: xs[i] as number, y: ys[i] as number, on: ((flags[i] as number) & 1) === 1 });
    contours.push(c);
    start = end + 1;
  }
  return contours;
}

export function readComponents(g: Uint8Array): Component[] {
  const out: Component[] = [];
  let o = 10;
  for (;;) {
    const flags = u16(g, o);
    const gid = u16(g, o + 2);
    o += 4;
    let dx = 0;
    let dy = 0;
    if (flags & 1) {
      if (flags & 2) {
        dx = i16(g, o);
        dy = i16(g, o + 2);
      }
      o += 4;
    } else {
      if (flags & 2) {
        dx = (u8(g, o) << 24) >> 24;
        dy = (u8(g, o + 1) << 24) >> 24;
      }
      o += 2;
    }
    let a = 1;
    let b = 0;
    let c = 0;
    let d = 1;
    if (flags & 8) {
      a = d = f2dot14(g, o);
      o += 2;
    } else if (flags & 0x40) {
      a = f2dot14(g, o);
      d = f2dot14(g, o + 2);
      o += 4;
    } else if (flags & 0x80) {
      a = f2dot14(g, o);
      b = f2dot14(g, o + 2);
      c = f2dot14(g, o + 4);
      d = f2dot14(g, o + 6);
      o += 8;
    }
    if (flags & 0x800) {
      // SCALED_COMPONENT_OFFSET
      dx *= Math.hypot(a, b);
      dy *= Math.hypot(c, d);
    }
    out.push({ gid, dx, dy, a, b, c, d, flags });
    if (!(flags & 0x20)) break;
    if (out.length > 256) throw new Error("Glyph ghép có quá nhiều thành phần.");
  }
  return out;
}

/** Đường viền đầy đủ của glyph (giải đệ quy glyph ghép). */
export function ttGlyphPath(getGlyph: (gid: number) => Uint8Array, gid: number, depth = 0): Path {
  if (depth > 8) throw new Error("Glyph ghép lồng quá sâu.");
  const g = getGlyph(gid);
  if (g.length < 10) return [];
  const nc = i16(g, 0);
  if (nc >= 0) return ttToPath(readSimpleGlyph(g));
  const out: Path = [];
  for (const comp of readComponents(g)) {
    const sub = ttGlyphPath(getGlyph, comp.gid, depth + 1);
    out.push(...transformPathMatrix(sub, comp.a, comp.b, comp.c, comp.d, comp.dx, comp.dy));
  }
  return out;
}

export function ttGlyphBBox(getGlyph: (gid: number) => Uint8Array, gid: number): BBox | null {
  const g = getGlyph(gid);
  if (g.length < 10) return null;
  return glyphHeaderBBox(g) ?? pathBBox(ttGlyphPath(getGlyph, gid));
}

/** Số điểm / contour của glyph (đệ quy) — dùng để cập nhật maxp. */
export function glyphStats(getGlyph: (gid: number) => Uint8Array, gid: number, depth = 0): { points: number; contours: number; depth: number } {
  const g = getGlyph(gid);
  if (g.length < 10 || depth > 8) return { points: 0, contours: 0, depth };
  const nc = i16(g, 0);
  if (nc >= 0) {
    if (nc === 0) return { points: 0, contours: 0, depth };
    return { points: u16(g, 10 + (nc - 1) * 2) + 1, contours: nc, depth };
  }
  let points = 0;
  let contours = 0;
  let dmax = depth;
  for (const c of readComponents(g)) {
    const s = glyphStats(getGlyph, c.gid, depth + 1);
    points += s.points;
    contours += s.contours;
    dmax = Math.max(dmax, s.depth);
  }
  return { points, contours, depth: dmax };
}

function f2(v: number): number {
  return Math.max(-32768, Math.min(32767, Math.round(v * 16384)));
}

export function buildSimpleGlyph(contours: Pt[][]): { data: Uint8Array; bbox: BBox | null; points: number } {
  const all = contours.flat();
  if (all.length === 0) return { data: new Uint8Array(0), bbox: null, points: 0 };
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const p of all) {
    x0 = Math.min(x0, p.x);
    x1 = Math.max(x1, p.x);
    y0 = Math.min(y0, p.y);
    y1 = Math.max(y1, p.y);
  }
  const w = new Writer();
  w.u16(contours.length).u16(x0).u16(y0).u16(x1).u16(y1);
  let end = -1;
  for (const c of contours) {
    end += c.length;
    w.u16(end);
  }
  w.u16(0); // instructionLength
  const flags: number[] = [];
  const xb: number[][] = [];
  const yb: number[][] = [];
  let px = 0;
  let py = 0;
  const xw = new Writer();
  const yw = new Writer();
  for (const p of all) {
    let f = p.on ? 1 : 0;
    const dx = p.x - px;
    const dy = p.y - py;
    if (dx === 0) f |= 16;
    else if (Math.abs(dx) < 256) {
      f |= 2 | (dx > 0 ? 16 : 0);
      xw.u8(Math.abs(dx));
    } else xw.u16(dx);
    if (dy === 0) f |= 32;
    else if (Math.abs(dy) < 256) {
      f |= 4 | (dy > 0 ? 32 : 0);
      yw.u8(Math.abs(dy));
    } else yw.u16(dy);
    flags.push(f);
    px = p.x;
    py = p.y;
  }
  void xb;
  void yb;
  for (const f of flags) w.u8(f);
  w.bytes(xw.toBytes()).bytes(yw.toBytes()).pad4();
  return { data: w.toBytes(), bbox: [x0, y0, x1, y1], points: all.length };
}

export interface NewComponent {
  gid: number;
  dx: number;
  dy: number;
  scale: number;
  useMyMetrics: boolean;
}

export function buildCompositeGlyph(comps: NewComponent[], bbox: BBox): Uint8Array {
  const w = new Writer();
  w.u16(0xffff).u16(bbox[0]).u16(bbox[1]).u16(bbox[2]).u16(bbox[3]);
  comps.forEach((c, i) => {
    let flags = 0x1 | 0x2 | 0x1000; // words, XY values, UNSCALED_COMPONENT_OFFSET
    if (c.scale !== 1) flags |= 0x8;
    if (c.useMyMetrics) flags |= 0x200;
    if (i < comps.length - 1) flags |= 0x20;
    w.u16(flags).u16(c.gid).u16(Math.round(c.dx)).u16(Math.round(c.dy));
    if (c.scale !== 1) w.u16(f2(c.scale));
  });
  w.pad4();
  return w.toBytes();
}
