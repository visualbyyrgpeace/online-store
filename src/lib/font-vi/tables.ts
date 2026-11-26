import { Writer, i16, u16, u32, u8, slice, concatBytes } from "./bytes";

/* ───────────── cmap ───────────── */

export interface RawSubtable {
  platform: number;
  encoding: number;
  data: Uint8Array;
}
export interface CmapData {
  map: Map<number, number>;
  keep: RawSubtable[]; // các subtable không phải Unicode: giữ nguyên
}

function parseSubtable(d: Uint8Array, map: Map<number, number>): boolean {
  const fmt = u16(d, 0);
  if (fmt === 0) {
    for (let c = 0; c < 256; c++) {
      const g = u8(d, 6 + c);
      if (g) map.set(c, g);
    }
    return true;
  }
  if (fmt === 4) {
    const segX2 = u16(d, 6);
    const endO = 14;
    const startO = endO + segX2 + 2;
    const deltaO = startO + segX2;
    const rangeO = deltaO + segX2;
    for (let i = 0; i < segX2 / 2; i++) {
      const end = u16(d, endO + i * 2);
      const start = u16(d, startO + i * 2);
      const delta = u16(d, deltaO + i * 2);
      const ro = u16(d, rangeO + i * 2);
      for (let c = start; c <= end && c !== 0xffff; c++) {
        let g: number;
        if (ro === 0) g = (c + delta) & 0xffff;
        else {
          const p = rangeO + i * 2 + ro + (c - start) * 2;
          if (p + 2 > d.length) continue;
          g = u16(d, p);
          if (g) g = (g + delta) & 0xffff;
        }
        if (g) map.set(c, g);
      }
    }
    return true;
  }
  if (fmt === 6) {
    const first = u16(d, 6);
    const cnt = u16(d, 8);
    for (let i = 0; i < cnt; i++) {
      const g = u16(d, 10 + i * 2);
      if (g) map.set(first + i, g);
    }
    return true;
  }
  if (fmt === 12) {
    const n = u32(d, 12);
    for (let i = 0; i < n; i++) {
      const s = u32(d, 16 + i * 12);
      const e = u32(d, 20 + i * 12);
      const g = u32(d, 24 + i * 12);
      if (e - s > 0x110000) throw new Error("cmap format 12 không hợp lệ.");
      for (let c = s; c <= e; c++) map.set(c, g + (c - s));
    }
    return true;
  }
  return false;
}

export function parseCmap(t: Uint8Array): CmapData {
  const n = u16(t, 2);
  const map = new Map<number, number>();
  const keep: RawSubtable[] = [];
  let parsed = 0;
  const seen = new Set<number>();
  for (let i = 0; i < n; i++) {
    const platform = u16(t, 4 + i * 8);
    const encoding = u16(t, 6 + i * 8);
    const off = u32(t, 8 + i * 8);
    const isUni = (platform === 0 && encoding !== 5) || (platform === 3 && (encoding === 1 || encoding === 10));
    const data = t.subarray(off, off + subtableLength(t, off));
    if (isUni) {
      if (seen.has(off)) continue;
      if (parseSubtable(data, map)) {
        seen.add(off);
        parsed++;
      } else keep.push({ platform, encoding, data: data.slice() });
    } else keep.push({ platform, encoding, data: data.slice() });
  }
  if (parsed === 0) throw new Error("Font không có bảng cmap Unicode (có thể là font mã hoá Symbol) — chưa hỗ trợ.");
  return { map, keep };
}

function subtableLength(t: Uint8Array, off: number): number {
  const fmt = u16(t, off);
  if (fmt === 12 || fmt === 13 || fmt === 14) return u32(t, off + 4);
  if (fmt === 8 || fmt === 10) return u32(t, off + 4);
  return u16(t, off + 2);
}

function format4(entries: [number, number][]): Uint8Array {
  const segs: { s: number; e: number; delta: number }[] = [];
  for (const [c, g] of entries) {
    if (c >= 0xffff) continue;
    const last = segs[segs.length - 1];
    if (last && c === last.e + 1 && g - c === last.delta) last.e = c;
    else segs.push({ s: c, e: c, delta: g - c });
  }
  segs.push({ s: 0xffff, e: 0xffff, delta: 1 });
  const n = segs.length;
  let pow = 1;
  let log = 0;
  while (pow * 2 <= n) {
    pow *= 2;
    log++;
  }
  const length = 16 + 8 * n;
  if (length > 0xffff) throw new Error("cmap quá lớn cho format 4.");
  const w = new Writer();
  w.u16(4).u16(length).u16(0).u16(n * 2).u16(pow * 2).u16(log).u16(n * 2 - pow * 2);
  for (const s of segs) w.u16(s.e);
  w.u16(0);
  for (const s of segs) w.u16(s.s);
  for (const s of segs) w.u16(s.delta & 0xffff);
  for (let i = 0; i < n; i++) w.u16(0);
  return w.toBytes();
}

function format12(entries: [number, number][]): Uint8Array {
  const groups: { s: number; e: number; g: number }[] = [];
  for (const [c, g] of entries) {
    const last = groups[groups.length - 1];
    if (last && c === last.e + 1 && g === last.g + (c - last.s)) last.e = c;
    else groups.push({ s: c, e: c, g });
  }
  const w = new Writer();
  w.u16(12).u16(0).u32(16 + groups.length * 12).u32(0).u32(groups.length);
  for (const gr of groups) w.u32(gr.s).u32(gr.e).u32(gr.g);
  return w.toBytes();
}

export function buildCmap(map: Map<number, number>, keep: RawSubtable[]): Uint8Array {
  const entries = [...map.entries()].sort((a, b) => a[0] - b[0]);
  const bmp = format4(entries);
  const hasAstral = entries.some(([c]) => c > 0xffff);
  const full = hasAstral ? format12(entries) : null;
  const recs: RawSubtable[] = [
    { platform: 0, encoding: 3, data: bmp },
    { platform: 3, encoding: 1, data: bmp },
  ];
  if (full) recs.push({ platform: 0, encoding: 4, data: full }, { platform: 3, encoding: 10, data: full });
  recs.push(...keep);
  recs.sort((a, b) => a.platform - b.platform || a.encoding - b.encoding);
  const w = new Writer();
  w.u16(0).u16(recs.length);
  let off = 4 + recs.length * 8;
  const offsets = new Map<Uint8Array, number>();
  for (const r of recs) {
    if (!offsets.has(r.data)) {
      offsets.set(r.data, off);
      off += r.data.length;
    }
    w.u16(r.platform).u16(r.encoding).u32(offsets.get(r.data) as number);
  }
  const done = new Set<Uint8Array>();
  for (const r of recs) {
    if (done.has(r.data)) continue;
    done.add(r.data);
    w.bytes(r.data);
  }
  return w.toBytes();
}

/* ───────────── hmtx ───────────── */

export function readHmtx(hmtx: Uint8Array, numHMetrics: number, numGlyphs: number): { adv: number[]; lsb: number[] } {
  const adv: number[] = [];
  const lsb: number[] = [];
  for (let i = 0; i < numGlyphs; i++) {
    if (i < numHMetrics) {
      adv.push(u16(hmtx, i * 4));
      lsb.push(i16(hmtx, i * 4 + 2));
    } else {
      adv.push(adv[numHMetrics - 1] as number);
      lsb.push(i16(hmtx, numHMetrics * 4 + (i - numHMetrics) * 2));
    }
  }
  return { adv, lsb };
}

export function buildHmtx(adv: number[], lsb: number[]): Uint8Array {
  const w = new Writer();
  for (let i = 0; i < adv.length; i++) w.u16(adv[i] as number).u16(lsb[i] as number);
  return w.toBytes();
}

/* ───────────── post ───────────── */

export function appendPostNames(post: Uint8Array, oldCount: number, newNames: string[]): Uint8Array {
  const version = u32(post, 0);
  if (version !== 0x00020000) {
    // v1/v3/v2.5: không lưu tên glyph tuỳ chỉnh → chuyển v3 (không tên)
    const out = post.slice(0, 32);
    out[0] = 0;
    out[1] = 3;
    out[2] = 0;
    out[3] = 0;
    return out;
  }
  const n = u16(post, 32);
  const head = post.slice(0, 32);
  const idx: number[] = [];
  for (let i = 0; i < n; i++) idx.push(u16(post, 34 + i * 2));
  let o = 34 + n * 2;
  const strs: Uint8Array[] = [];
  while (o < post.length) {
    const len = u8(post, o);
    strs.push(post.slice(o + 1, o + 1 + len));
    o += 1 + len;
  }
  while (idx.length < oldCount) idx.push(0);
  const w = new Writer();
  w.bytes(head).u16(oldCount + newNames.length);
  for (let i = 0; i < oldCount; i++) w.u16(idx[i] as number);
  let next = strs.length;
  const extra: Uint8Array[] = [];
  for (const name of newNames) {
    w.u16(258 + next++);
    const b = new Uint8Array([...name].map((c) => c.charCodeAt(0) & 0x7f));
    extra.push(concatBytes([new Uint8Array([b.length]), b]));
  }
  for (const s of strs) w.u8(s.length).bytes(s);
  for (const e of extra) w.bytes(e);
  return w.toBytes();
}

/* ───────────── name ───────────── */

export interface NameRecord {
  platform: number;
  encoding: number;
  language: number;
  id: number;
  raw: Uint8Array;
}

export function parseName(t: Uint8Array): NameRecord[] | null {
  if (u16(t, 0) !== 0) return null; // format 1 (language tags) → không đổi tên
  const n = u16(t, 2);
  const so = u16(t, 4);
  const out: NameRecord[] = [];
  for (let i = 0; i < n; i++) {
    const o = 6 + i * 12;
    out.push({
      platform: u16(t, o),
      encoding: u16(t, o + 2),
      language: u16(t, o + 4),
      id: u16(t, o + 6),
      raw: slice(t, so + u16(t, o + 10), u16(t, o + 8)).slice(),
    });
  }
  return out;
}

export function decodeName(r: NameRecord): string {
  if (r.platform === 3 || r.platform === 0) {
    let s = "";
    for (let i = 0; i + 1 < r.raw.length; i += 2) s += String.fromCharCode(((r.raw[i] as number) << 8) | (r.raw[i + 1] as number));
    return s;
  }
  return String.fromCharCode(...r.raw);
}

export function encodeName(r: NameRecord, s: string): Uint8Array {
  if (r.platform === 3 || r.platform === 0) {
    const b = new Uint8Array(s.length * 2);
    for (let i = 0; i < s.length; i++) {
      b[i * 2] = s.charCodeAt(i) >> 8;
      b[i * 2 + 1] = s.charCodeAt(i) & 255;
    }
    return b;
  }
  return new Uint8Array([...s].map((c) => (c.charCodeAt(0) < 256 ? c.charCodeAt(0) : 63)));
}

export function buildName(recs: NameRecord[]): Uint8Array {
  const sorted = [...recs].sort((a, b) => a.platform - b.platform || a.encoding - b.encoding || a.language - b.language || a.id - b.id);
  const w = new Writer();
  const so = 6 + sorted.length * 12;
  w.u16(0).u16(sorted.length).u16(so);
  let off = 0;
  for (const r of sorted) {
    w.u16(r.platform).u16(r.encoding).u16(r.language).u16(r.id).u16(r.raw.length).u16(off);
    off += r.raw.length;
  }
  for (const r of sorted) w.bytes(r.raw);
  return w.toBytes();
}

/** Thêm hậu tố vào tên font để bản Việt hoá không trùng bản gốc. */
export function renameRecords(recs: NameRecord[], suffix: string): { recs: NameRecord[]; family: string; ps: string } {
  const text = (id: number) => {
    const r = recs.find((x) => x.id === id && (x.platform === 3 || x.platform === 0)) ?? recs.find((x) => x.id === id);
    return r ? decodeName(r) : "";
  };
  const family = text(16) || text(1);
  const compact = suffix.replace(/\s+/g, "");
  const ps = text(6);
  const newPs = ps ? (ps.includes("-") ? ps.replace("-", `${compact}-`) : ps + compact) : "";
  const out = recs.map((r) => {
    let s = decodeName(r);
    if (r.id === 1 || r.id === 16 || r.id === 21) s = `${s} ${suffix}`;
    else if (r.id === 4) s = family && s.startsWith(family) ? `${family} ${suffix}${s.slice(family.length)}` : `${s} ${suffix}`;
    else if (r.id === 6) s = s.includes("-") ? s.replace("-", `${compact}-`) : s + compact;
    else if (r.id === 3) s = `${s};${compact}`;
    else return r;
    return { ...r, raw: encodeName(r, s) };
  });
  return { recs: out, family: `${family} ${suffix}`, ps: newPs };
}
