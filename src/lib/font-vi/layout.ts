import { Writer, u16, u32, tag4, slice } from "./bytes";

/** Thêm tính năng ccmp (ghép dấu rời → glyph dựng sẵn) vào GSUB, giữ nguyên mọi lookup gốc. */

export interface LigSeq {
  glyphs: number[]; // base + các dấu rời
  lig: number; // glyph dựng sẵn
}

export function buildLigatureLookup(seqs: LigSeq[]): Uint8Array {
  const byFirst = new Map<number, { rest: number[]; lig: number }[]>();
  for (const s of seqs) {
    const first = s.glyphs[0] as number;
    const arr = byFirst.get(first) ?? [];
    arr.push({ rest: s.glyphs.slice(1), lig: s.lig });
    byFirst.set(first, arr);
  }
  const firsts = [...byFirst.keys()].sort((a, b) => a - b);
  const sets = firsts.map((f) => (byFirst.get(f) as { rest: number[]; lig: number }[]).sort((a, b) => b.rest.length - a.rest.length));
  const setSizes = sets.map((set) => 2 + 2 * set.length + set.reduce((n, l) => n + 4 + 2 * l.rest.length, 0));
  const headerLen = 6 + 2 * firsts.length;
  const covOff = headerLen + setSizes.reduce((a, b) => a + b, 0);
  const sub = new Writer();
  sub.u16(1).u16(covOff).u16(firsts.length);
  let off = headerLen;
  for (const size of setSizes) {
    sub.u16(off);
    off += size;
  }
  sets.forEach((set) => {
    sub.u16(set.length);
    let lo = 2 + 2 * set.length;
    for (const l of set) {
      sub.u16(lo);
      lo += 4 + 2 * l.rest.length;
    }
    for (const l of set) {
      sub.u16(l.lig).u16(l.rest.length + 1);
      for (const g of l.rest) sub.u16(g);
    }
  });
  sub.u16(1).u16(firsts.length);
  for (const f of firsts) sub.u16(f);
  const subBytes = sub.toBytes();
  const lookup = new Writer();
  lookup.u16(4).u16(0).u16(1).u16(8).bytes(subBytes);
  return lookup.toBytes();
}

interface LangSys {
  req: number;
  feats: number[];
}
interface ScriptRec {
  tag: string;
  def: LangSys | null;
  langs: { tag: string; ls: LangSys }[];
}

function readLangSys(t: Uint8Array, o: number): LangSys {
  const req = u16(t, o + 2);
  const n = u16(t, o + 4);
  const feats: number[] = [];
  for (let i = 0; i < n; i++) feats.push(u16(t, o + 6 + i * 2));
  return { req, feats };
}

function writeLangSys(ls: LangSys): Uint8Array {
  const w = new Writer();
  w.u16(0).u16(ls.req).u16(ls.feats.length);
  for (const f of ls.feats) w.u16(f);
  return w.toBytes();
}

function writeScriptList(scripts: ScriptRec[]): Uint8Array {
  const sorted = [...scripts].sort((a, b) => (a.tag < b.tag ? -1 : a.tag > b.tag ? 1 : 0));
  const bodies = sorted.map((s) => {
    const langs = [...s.langs].sort((a, b) => (a.tag < b.tag ? -1 : a.tag > b.tag ? 1 : 0));
    const w = new Writer();
    const hdr = 4 + 6 * langs.length;
    const defBytes = s.def ? writeLangSys(s.def) : new Uint8Array(0);
    w.u16(s.def ? hdr : 0).u16(langs.length);
    let off = hdr + defBytes.length;
    const bytes = langs.map((l) => writeLangSys(l.ls));
    langs.forEach((l, i) => {
      w.tag(l.tag).u16(off);
      off += (bytes[i] as Uint8Array).length;
    });
    w.bytes(defBytes);
    for (const b of bytes) w.bytes(b);
    return w.toBytes();
  });
  const w = new Writer();
  w.u16(sorted.length);
  let off = 2 + 6 * sorted.length;
  sorted.forEach((s, i) => {
    w.tag(s.tag).u16(off);
    off += (bodies[i] as Uint8Array).length;
  });
  for (const b of bodies) w.bytes(b);
  return w.toBytes();
}

function checkU16(v: number, what: string): number {
  if (v > 0xffff) throw new Error(`GSUB quá lớn để thêm lookup mới (${what}).`);
  return v;
}

/** Trả về GSUB mới đã có ccmp → lookup; ném lỗi nếu cấu trúc GSUB gốc quá phức tạp để ghép an toàn. */
export function installCcmp(gsub: Uint8Array | undefined, lookup: Uint8Array): Uint8Array {
  const fresh = !gsub || gsub.length < 10;
  let scripts: ScriptRec[] = [];
  let features: { tag: string; bytes: Uint8Array }[] = [];
  let lookupRegion = new Uint8Array(0);
  let lookupOffsets: number[] = [];
  let fvBytes: Uint8Array | null = null;
  let version = 0x00010000;

  if (!fresh && gsub) {
    version = u32(gsub, 0);
    const sl = u16(gsub, 4);
    const fl = u16(gsub, 6);
    const ll = u16(gsub, 8);
    const fvOff = version >= 0x00010001 ? u32(gsub, 10) : 0;
    const sc = u16(gsub, sl);
    for (let i = 0; i < sc; i++) {
      const tag = tag4(gsub, sl + 2 + i * 6);
      const so = sl + u16(gsub, sl + 6 + i * 6);
      const defOff = u16(gsub, so);
      const lc = u16(gsub, so + 2);
      const langs: ScriptRec["langs"] = [];
      for (let k = 0; k < lc; k++) langs.push({ tag: tag4(gsub, so + 4 + k * 6), ls: readLangSys(gsub, so + u16(gsub, so + 8 + k * 6)) });
      scripts.push({ tag, def: defOff ? readLangSys(gsub, so + defOff) : null, langs });
    }
    const fc = u16(gsub, fl);
    for (let i = 0; i < fc; i++) {
      const tag = tag4(gsub, fl + 2 + i * 6);
      const fo = fl + u16(gsub, fl + 6 + i * 6);
      if (u16(gsub, fo) !== 0) throw new Error("GSUB có feature params — bỏ qua ghép ccmp.");
      const n = u16(gsub, fo + 2);
      features.push({ tag, bytes: slice(gsub, fo, 4 + 2 * n).slice() });
    }
    const n = u16(gsub, ll);
    lookupOffsets = [];
    for (let i = 0; i < n; i++) lookupOffsets.push(u16(gsub, ll + 2 + i * 2));
    const ends = [sl, fl, fvOff].filter((v) => v > ll);
    const end = ends.length ? Math.min(...ends) : gsub.length;
    lookupRegion = slice(gsub, ll + 2 + 2 * n, end - (ll + 2 + 2 * n)).slice();
    if (fvOff) fvBytes = slice(gsub, fvOff, gsub.length - fvOff).slice();
  }

  // thêm feature ccmp
  const newFeatIndex = features.length;
  const newLookupIndex = lookupOffsets.length;
  const fb = new Writer();
  fb.u16(0).u16(1).u16(newLookupIndex);
  features.push({ tag: "ccmp", bytes: fb.toBytes() });
  const targets = scripts.filter((s) => s.tag === "DFLT" || s.tag === "latn");
  for (const s of targets) {
    for (const ls of [s.def, ...s.langs.map((l) => l.ls)]) if (ls && !ls.feats.includes(newFeatIndex)) ls.feats.push(newFeatIndex);
  }
  for (const tag of ["DFLT", "latn"]) {
    if (!scripts.some((s) => s.tag === tag)) scripts.push({ tag, def: { req: 0xffff, feats: [newFeatIndex] }, langs: [] });
  }
  scripts = scripts.slice();

  const scriptBytes = writeScriptList(scripts);
  const fw = new Writer();
  fw.u16(features.length);
  let fo = 2 + 6 * features.length;
  for (const f of features) {
    fw.tag(f.tag).u16(checkU16(fo, "FeatureList"));
    fo += f.bytes.length;
  }
  for (const f of features) fw.bytes(f.bytes);
  const featureBytes = fw.toBytes();

  const newHdr = 2 + 2 * (lookupOffsets.length + 1);
  const lw = new Writer();
  lw.u16(lookupOffsets.length + 1);
  for (const o of lookupOffsets) lw.u16(checkU16(o + 2, "LookupList"));
  lw.u16(checkU16(newHdr + lookupRegion.length, "LookupList"));
  lw.bytes(lookupRegion).bytes(lookup);
  const lookupBytes = lw.toBytes();

  const headerLen = version >= 0x00010001 ? 14 : 10;
  const w = new Writer();
  const scriptOff = headerLen;
  const featOff = scriptOff + scriptBytes.length;
  const lookOff = featOff + featureBytes.length;
  w.u32(version).u16(checkU16(scriptOff, "header")).u16(checkU16(featOff, "header")).u16(checkU16(lookOff, "header"));
  if (version >= 0x00010001) w.u32(fvBytes ? lookOff + lookupBytes.length : 0);
  w.bytes(scriptBytes).bytes(featureBytes).bytes(lookupBytes);
  if (fvBytes) w.bytes(fvBytes);
  return w.toBytes();
}
