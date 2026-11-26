import { i16, i32, u16, u32, tag4, slice } from "./bytes";
import { parseCmap, parseName, decodeName, readHmtx, type RawSubtable } from "./tables";
import { parseSfnt, type Sfnt } from "./sfnt";
import { glyphHeaderBBox, ttGlyphPath } from "./ttf";
import { parseCff, runCharstring, type CffFont } from "./cff";
import { pathBBox, type BBox, type Path } from "./outline";
import type { Metrics } from "./generate";

export interface FontNames {
  family: string;
  style: string;
  full: string;
  ps: string;
  version: string;
  copyright: string;
  license: string;
  designer: string;
}

export interface FontModel {
  kind: "ttf" | "otf";
  sfnt: Sfnt;
  fileSize: number;
  upem: number;
  numGlyphs: number;
  cmap: Map<number, number>;
  keepCmap: RawSubtable[];
  adv: number[];
  lsb: number[];
  loca?: number[];
  glyf?: Uint8Array;
  cff?: CffFont;
  glyphBytes: (gid: number) => Uint8Array;
  path: (gid: number) => Path;
  bbox: (gid: number) => BBox | null;
  metrics: Metrics;
  names: FontNames;
  gsubTags: string[];
  gposTags: string[];
  scripts: string[];
}

function layoutTags(t: Uint8Array | undefined): { features: string[]; scripts: string[] } {
  if (!t || t.length < 10) return { features: [], scripts: [] };
  try {
    const sl = u16(t, 4);
    const fl = u16(t, 6);
    const scripts: string[] = [];
    const features: string[] = [];
    const sc = u16(t, sl);
    for (let i = 0; i < sc; i++) scripts.push(tag4(t, sl + 2 + i * 6));
    const fc = u16(t, fl);
    for (let i = 0; i < fc; i++) features.push(tag4(t, fl + 2 + i * 6));
    return { features: [...new Set(features)], scripts };
  } catch {
    return { features: [], scripts: [] };
  }
}

export function openFont(input: ArrayBuffer | Uint8Array): FontModel {
  // Sao chép sang Uint8Array thường: Buffer của Node.js trả về view khi slice().
  const data = new Uint8Array(input instanceof Uint8Array ? input : new Uint8Array(input));
  const sfnt = parseSfnt(data);
  const T = (name: string): Uint8Array => {
    const t = sfnt.tables.get(name);
    if (!t) throw new Error(`Font thiếu bảng bắt buộc "${name}".`);
    return t;
  };
  const head = T("head");
  const maxp = T("maxp");
  const hhea = T("hhea");
  const upem = u16(head, 18);
  const numGlyphs = u16(maxp, 4);
  const { adv, lsb } = readHmtx(T("hmtx"), u16(hhea, 34), numGlyphs);
  const cm = parseCmap(T("cmap"));

  let kind: "ttf" | "otf";
  let loca: number[] | undefined;
  let glyf: Uint8Array | undefined;
  let cff: CffFont | undefined;
  if (sfnt.tables.has("glyf")) {
    kind = "ttf";
    glyf = T("glyf");
    const lt = T("loca");
    const long = i16(head, 50) === 1;
    loca = [];
    for (let i = 0; i <= numGlyphs; i++) loca.push(long ? u32(lt, i * 4) : u16(lt, i * 2) * 2);
  } else if (sfnt.tables.has("CFF ")) {
    kind = "otf";
    cff = parseCff(T("CFF "));
  } else {
    throw new Error("Font không có đường viền glyf hoặc CFF (CFF2 / bitmap chưa hỗ trợ).");
  }

  const empty = new Uint8Array(0);
  const glyphBytes = (gid: number): Uint8Array => {
    if (!loca || !glyf || gid < 0 || gid >= numGlyphs) return empty;
    const a = loca[gid] as number;
    const b = loca[gid + 1] as number;
    return b > a ? slice(glyf, a, b - a) : empty;
  };
  const pathCache = new Map<number, Path>();
  const path = (gid: number): Path => {
    const hit = pathCache.get(gid);
    if (hit) return hit;
    let p: Path;
    if (kind === "ttf") p = ttGlyphPath(glyphBytes, gid);
    else {
      const cs = cff?.charStrings[gid];
      p = cs && cff ? runCharstring(cff, cs).path : [];
    }
    pathCache.set(gid, p);
    return p;
  };
  const bbox = (gid: number): BBox | null => {
    if (kind === "ttf") {
      const g = glyphBytes(gid);
      if (g.length < 10) return null;
      return glyphHeaderBBox(g) ?? pathBBox(path(gid));
    }
    return pathBBox(path(gid));
  };

  // tên font
  const nameTable = sfnt.tables.get("name");
  const recs = nameTable ? parseName(nameTable) : null;
  const pick = (id: number, alt?: number): string => {
    if (!recs) return "";
    const r =
      recs.find((x) => x.id === id && x.platform === 3 && x.language === 0x409) ??
      recs.find((x) => x.id === id && (x.platform === 3 || x.platform === 0)) ??
      recs.find((x) => x.id === id);
    if (r) return decodeName(r);
    return alt !== undefined ? pick(alt) : "";
  };
  const names: FontNames = {
    family: pick(16, 1) || pick(1),
    style: pick(17, 2) || pick(2),
    full: pick(4),
    ps: pick(6),
    version: pick(5),
    copyright: pick(0),
    license: pick(13),
    designer: pick(9),
  };

  const gsub = layoutTags(sfnt.tables.get("GSUB"));
  const gpos = layoutTags(sfnt.tables.get("GPOS"));

  // số đo của font
  const g = (ch: string) => cm.map.get(ch.codePointAt(0) as number);
  const top = (ch: string): number | null => {
    const gid = g(ch);
    return gid === undefined ? null : (bbox(gid)?.[3] ?? null);
  };
  const os2 = sfnt.tables.get("OS/2");
  const os2x = os2 && os2.length >= 90 && u16(os2, 0) >= 2 ? i16(os2, 86) : 0;
  const os2c = os2 && os2.length >= 90 && u16(os2, 0) >= 2 ? i16(os2, 88) : 0;
  const hy = g("-") !== undefined ? bbox(g("-") as number) : null;
  const hyH = hy ? hy[3] - hy[1] : 0;
  const post = sfnt.tables.get("post");
  const metrics: Metrics = {
    upem,
    xHeight: top("x") ?? (os2x > 0 ? os2x : Math.round(upem * 0.5)),
    capHeight: top("H") ?? (os2c > 0 ? os2c : Math.round(upem * 0.7)),
    ascender: top("d") ?? top("l") ?? Math.round(upem * 0.72),
    stem: hyH > upem * 0.02 && hyH < upem * 0.2 ? hyH : Math.round(upem * 0.075),
    italic: post && post.length >= 8 ? i32(post, 4) / 65536 : 0,
  };

  return {
    kind,
    sfnt,
    fileSize: data.length,
    upem,
    numGlyphs,
    cmap: cm.map,
    keepCmap: cm.keep,
    adv,
    lsb,
    loca,
    glyf,
    cff,
    glyphBytes,
    path,
    bbox,
    metrics,
    names,
    gsubTags: gsub.features,
    gposTags: gpos.features,
    scripts: [...new Set([...gsub.scripts])],
  };
}
