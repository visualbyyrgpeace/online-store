import { i16, u16, u32 } from "./bytes";
import { rebuildCff, pathToCharstring, type NewCffGlyph } from "./cff";
import { openFont, type FontModel } from "./font";
import { buildLigatureLookup, installCcmp, type LigSeq } from "./layout";
import { orientPath, pathBBox, pathToCubic, pathToTt, transformPath, type BBox, type Path } from "./outline";
import { serializeSfnt } from "./sfnt";
import { appendPostNames, buildCmap, buildHmtx, buildName, parseName, renameRecords } from "./tables";
import { buildCompositeGlyph, buildSimpleGlyph, glyphStats } from "./ttf";
import type { Part, Plan } from "./plan";
import { Writer } from "./bytes";
import { VI_PRECOMPOSED } from "./vi";

export interface BuildOptions {
  nfd: boolean;
  widenWin: boolean;
  renameSuffix: string; // rỗng = giữ nguyên tên font
}

export interface Check {
  label: string;
  status: "ok" | "warn" | "fail";
  detail?: string;
}
export interface BuildResult {
  data: Uint8Array;
  checks: Check[];
  added: number;
  totalGlyphs: number;
  family: string;
}

interface NewGlyph {
  name: string;
  adv: number;
  bbox: BBox | null;
  ttf?: Uint8Array;
  points: number;
  contours: number;
  cff?: Uint8Array;
}

const outward = (b: BBox): BBox => [Math.floor(b[0]), Math.floor(b[1]), Math.ceil(b[2]), Math.ceil(b[3])];
const safeName = (s: string) => `vi.${s.replace(/[^A-Za-z0-9.]/g, "_")}`;

function patchOs2(os2: Uint8Array, cps: number[], maxY: number, minY: number, widen: boolean): Uint8Array {
  const o = os2.slice();
  if (o.length < 78) return o;
  const v = new DataView(o.buffer, o.byteOffset, o.byteLength);
  const version = v.getUint16(0);
  const lo = Math.min(...cps);
  const hi = Math.max(...cps);
  if (cps.length) {
    if (lo < v.getUint16(64)) v.setUint16(64, Math.min(lo, 0xffff));
    if (hi > v.getUint16(66)) v.setUint16(66, Math.min(hi, 0xffff));
    // Basic Latin, Latin-1, Latin Ext-A, Latin Ext-B, Combining Diacritical Marks, Latin Ext Additional
    const mask = (1 << 0) | (1 << 1) | (1 << 2) | (1 << 3) | (1 << 6) | (1 << 29);
    v.setUint32(42, (v.getUint32(42) | mask) >>> 0);
    if (version >= 1 && o.length >= 86) v.setUint32(78, (v.getUint32(78) | (1 << 8)) >>> 0); // Vietnamese (1258)
  }
  if (widen) {
    if (maxY > v.getUint16(74)) v.setUint16(74, Math.min(0xffff, Math.ceil(maxY)));
    if (-minY > v.getUint16(76)) v.setUint16(76, Math.min(0xffff, Math.ceil(-minY)));
  }
  return o;
}

export function buildFont(m: FontModel, plan: Plan, opt: BuildOptions): BuildResult {
  const isTtf = m.kind === "ttf";
  const baseCount = m.numGlyphs;
  const checks: Check[] = [];
  const tables = new Map(m.sfnt.tables);
  const added: NewGlyph[] = [];
  const keyGid = new Map<string, number>();
  const orient = (p: Path) => orientPath(p, isTtf);

  // ── 1. Glyph mới ──
  const usedKeys = new Set<string>();
  for (const g of plan.glyphs) for (const p of g.parts) if (p.key) usedKeys.add(p.key);
  if (isTtf) {
    for (const key of usedKeys) {
      const c = plan.customPaths.get(key);
      if (!c) continue;
      const sg = buildSimpleGlyph(pathToTt(orient(c.path)));
      keyGid.set(key, baseCount + added.length);
      added.push({ name: safeName(key), adv: c.adv, bbox: sg.bbox, ttf: sg.data, points: sg.points, contours: pathToTt(c.path).length });
    }
  }
  const partPath = (p: Part): Path => {
    const src = p.gid !== undefined ? m.path(p.gid) : orient(plan.customPaths.get(p.key as string)?.path ?? []);
    return transformPath(src, p.s, p.dx, p.dy);
  };
  const cff = m.cff;
  for (const g of plan.glyphs) {
    if (isTtf) {
      const comps = g.parts.map((p, i) => ({
        gid: p.gid !== undefined ? p.gid : (keyGid.get(p.key as string) as number),
        dx: p.dx,
        dy: p.dy,
        scale: p.s,
        useMyMetrics: i === 0 && !g.combining,
      }));
      if (!g.bbox) continue;
      const bb = outward(g.bbox);
      added.push({ name: g.name, adv: g.adv, bbox: bb, ttf: buildCompositeGlyph(comps, bb), points: 0, contours: 0 });
    } else if (cff) {
      const path = pathToCubic(g.parts.flatMap(partPath));
      added.push({ name: g.name, adv: g.adv, bbox: pathBBox(path), cff: pathToCharstring(path, g.adv, cff.defaultWidthX, cff.nominalWidthX), points: 0, contours: 0 });
    }
  }
  const gidOfPlanned = new Map<number, number>();
  {
    let idx = baseCount + (isTtf ? keyGid.size : 0);
    for (const g of plan.glyphs) {
      if (!g.bbox) continue;
      gidOfPlanned.set(g.cp, idx++);
    }
  }
  const total = baseCount + added.length;
  if (total > 65535) throw new Error("Tổng số glyph vượt 65.535 — không thể thêm.");

  // ── 2. Đường viền: glyf/loca hoặc CFF ──
  if (isTtf && m.glyf && m.loca) {
    const oldEnd = m.loca[baseCount] as number;
    const base = m.glyf.subarray(0, oldEnd);
    const w = new Writer();
    w.bytes(base).pad4();
    const offsets = m.loca.slice(0, baseCount);
    offsets.push(w.length);
    // glyph cũ giữ nguyên offset; glyph mới nối vào cuối
    const newBytes: Uint8Array[] = [];
    for (const g of added) {
      newBytes.push(g.ttf as Uint8Array);
      w.bytes(g.ttf as Uint8Array).pad4();
      offsets.push(w.length);
    }
    const glyf = w.toBytes();
    const long = glyf.length >= 0x20000 || offsets.some((o) => o % 2);
    const lw = new Writer();
    for (const o of offsets) {
      if (long) lw.u32(o);
      else lw.u16(o / 2);
    }
    tables.set("glyf", glyf);
    tables.set("loca", lw.toBytes());
    const head = (tables.get("head") as Uint8Array).slice();
    new DataView(head.buffer).setInt16(50, long ? 1 : 0);
    tables.set("head", head);

    // maxp
    const getGlyph = (gid: number): Uint8Array => {
      const a = offsets[gid] as number;
      const b = offsets[gid + 1] as number;
      return b > a ? glyf.subarray(a, b) : new Uint8Array(0);
    };
    const maxp = (tables.get("maxp") as Uint8Array).slice();
    const mv = new DataView(maxp.buffer);
    mv.setUint16(4, total);
    if (maxp.length >= 32) {
      let pts = mv.getUint16(6);
      let cts = mv.getUint16(8);
      let cpts = mv.getUint16(10);
      let ccts = mv.getUint16(12);
      let elems = mv.getUint16(28);
      let depth = mv.getUint16(30);
      for (let gid = baseCount; gid < total; gid++) {
        const g = getGlyph(gid);
        if (g.length < 10) continue;
        const st = glyphStats(getGlyph, gid);
        if (i16(g, 0) >= 0) {
          pts = Math.max(pts, st.points);
          cts = Math.max(cts, st.contours);
        } else {
          cpts = Math.max(cpts, st.points);
          ccts = Math.max(ccts, st.contours);
          elems = Math.max(elems, (g.length - 10) / 8);
          depth = Math.max(depth, st.depth);
        }
      }
      mv.setUint16(6, pts);
      mv.setUint16(8, cts);
      mv.setUint16(10, cpts);
      mv.setUint16(12, ccts);
      mv.setUint16(28, Math.min(0xffff, Math.ceil(elems)));
      mv.setUint16(30, Math.max(depth, 1));
    }
    tables.set("maxp", maxp);
  } else if (cff) {
    const maxp = (tables.get("maxp") as Uint8Array).slice();
    new DataView(maxp.buffer).setUint16(4, total);
    tables.set("maxp", maxp);
  }

  // ── 3. hmtx / hhea / head ──
  const adv = m.adv.slice();
  const lsb = m.lsb.slice();
  for (const g of added) {
    adv.push(g.adv);
    lsb.push(g.bbox ? Math.round(g.bbox[0]) : 0);
  }
  tables.set("hmtx", buildHmtx(adv, lsb));
  const hhea = (tables.get("hhea") as Uint8Array).slice();
  const hv = new DataView(hhea.buffer);
  hv.setUint16(34, total);
  let maxY = -Infinity;
  let minY = Infinity;
  const head2 = (tables.get("head") as Uint8Array).slice();
  const hd = new DataView(head2.buffer);
  for (const g of added) {
    if (!g.bbox) continue;
    const [x0, y0, x1, y1] = g.bbox;
    hd.setInt16(36, Math.min(hd.getInt16(36), x0));
    hd.setInt16(38, Math.min(hd.getInt16(38), y0));
    hd.setInt16(40, Math.max(hd.getInt16(40), x1));
    hd.setInt16(42, Math.max(hd.getInt16(42), y1));
    if (y1 > maxY) maxY = y1;
    if (y0 < minY) minY = y0;
    hv.setUint16(10, Math.max(hv.getUint16(10), g.adv));
    hv.setInt16(12, Math.min(hv.getInt16(12), x0));
    hv.setInt16(14, Math.min(hv.getInt16(14), g.adv - x1));
    hv.setInt16(16, Math.max(hv.getInt16(16), x1));
  }
  tables.set("hhea", hhea);
  tables.set("head", head2);

  // ── 4. cmap ──
  const map = new Map(m.cmap);
  for (const [cp, gid] of gidOfPlanned) if (!map.has(cp)) map.set(cp, gid);
  for (const a of plan.aliases) if (!map.has(a.cp)) map.set(a.cp, a.gid);
  tables.set("cmap", buildCmap(map, m.keepCmap));

  // ── 5. NFD → ccmp ──
  let ccmpOk = false;
  if (opt.nfd && plan.sequences.length) {
    const seqs: LigSeq[] = [];
    for (const s of plan.sequences) {
      const glyphs = s.seq.map((c) => map.get(c));
      const lig = map.get(s.cp);
      if (lig === undefined || glyphs.some((g) => g === undefined)) continue;
      seqs.push({ glyphs: glyphs as number[], lig });
    }
    try {
      tables.set("GSUB", installCcmp(tables.get("GSUB"), buildLigatureLookup(seqs)));
      ccmpOk = true;
    } catch (e) {
      plan.warnings.push(`Không ghép được ccmp cho NFD: ${(e as Error).message}`);
    }
  }

  // ── 6. OS/2, post, name ──
  const os2 = tables.get("OS/2");
  const newCps = [...gidOfPlanned.keys(), ...plan.aliases.map((a) => a.cp)];
  if (os2) tables.set("OS/2", patchOs2(os2, newCps, maxY, minY, opt.widenWin));
  const post = tables.get("post");
  if (post && post.length >= 32) tables.set("post", appendPostNames(post, baseCount, added.map((g) => g.name)));

  let family = m.names.family;
  let psName: string | undefined;
  const nameT = tables.get("name");
  if (opt.renameSuffix.trim() && nameT) {
    const recs = parseName(nameT);
    if (recs) {
      const r = renameRecords(recs, opt.renameSuffix.trim());
      tables.set("name", buildName(r.recs));
      family = r.family;
      psName = r.ps || undefined;
    } else plan.warnings.push("Bảng name dạng mở rộng — giữ nguyên tên font.");
  }
  if (cff) tables.set("CFF ", rebuildCff(cff, cffAddedList(added), psName));

  const data = serializeSfnt({ flavor: m.sfnt.flavor, tables });
  const result: BuildResult = { data, checks, added: added.length, totalGlyphs: total, family };
  checks.push(...validateBuilt(m, data, plan, { ccmpOk, maxY, minY, widenWin: opt.widenWin, nfd: opt.nfd }));
  return result;
}

function cffAddedList(added: NewGlyph[]): NewCffGlyph[] {
  return added.map((g) => ({ name: g.name, charstring: g.cff as Uint8Array }));
}

function same(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

/** Kiểm tra bản xuất: đọc lại bằng chính bộ phân tích và đối chiếu với font gốc. */
export function validateBuilt(orig: FontModel, data: Uint8Array, plan: Plan, ctx: { ccmpOk: boolean; maxY: number; minY: number; widenWin: boolean; nfd: boolean }): Check[] {
  const out: Check[] = [];
  let re: FontModel;
  try {
    re = openFont(data);
    out.push({ label: "Cấu trúc font đọc lại thành công", status: "ok", detail: `${re.numGlyphs} glyph · ${re.sfnt.tables.size} bảng` });
  } catch (e) {
    return [{ label: "Cấu trúc font", status: "fail", detail: (e as Error).message }];
  }

  const missing = VI_PRECOMPOSED.filter((cp) => !re.cmap.has(cp));
  out.push(
    missing.length === 0
      ? { label: "Đủ 134 chữ tiếng Việt (NFC)", status: "ok" }
      : { label: "Thiếu chữ tiếng Việt", status: "warn", detail: missing.map((c) => String.fromCodePoint(c)).join(" ") },
  );

  let changed = 0;
  for (const [cp, gid] of orig.cmap) if (re.cmap.get(cp) !== gid) changed++;
  out.push(changed === 0 ? { label: "Ánh xạ Unicode gốc không bị đổi", status: "ok" } : { label: "Ánh xạ Unicode gốc bị đổi", status: "fail", detail: `${changed} mã` });

  let outlineSame = true;
  if (orig.kind === "ttf" && orig.glyf && orig.loca && re.glyf && re.loca) {
    for (let g = 0; g < orig.numGlyphs && outlineSame; g++) if (!same(orig.glyphBytes(g), re.glyphBytes(g))) outlineSame = false;
  } else if (orig.cff && re.cff) {
    for (let g = 0; g < orig.numGlyphs && outlineSame; g++) if (!same(orig.cff.charStrings[g] as Uint8Array, re.cff.charStrings[g] as Uint8Array)) outlineSame = false;
  }
  out.push(outlineSame ? { label: "Glyph gốc giữ nguyên từng byte", status: "ok" } : { label: "Glyph gốc bị thay đổi", status: "fail" });

  let advSame = true;
  for (let g = 0; g < orig.numGlyphs; g++) if (re.adv[g] !== orig.adv[g]) advSame = false;
  out.push(advSame ? { label: "Độ rộng chữ (spacing) gốc giữ nguyên", status: "ok" } : { label: "Độ rộng chữ gốc bị đổi", status: "fail" });

  const lostTables = [...orig.sfnt.tables.keys()].filter((t) => !re.sfnt.tables.has(t));
  out.push(lostTables.length ? { label: "Mất bảng font", status: "fail", detail: lostTables.join(", ") } : { label: "Mọi bảng OpenType gốc còn nguyên (GPOS, GSUB, kern, GDEF…)", status: "ok" });

  const lost = orig.gsubTags.filter((t) => !re.gsubTags.includes(t));
  out.push(lost.length ? { label: "Mất tính năng OpenType", status: "fail", detail: lost.join(", ") } : { label: "Giữ nguyên tính năng OpenType gốc", status: "ok", detail: orig.gsubTags.concat(orig.gposTags).filter((v, i, a) => a.indexOf(v) === i).join(" ") || "không có" });

  if (ctx.nfd) {
    out.push(
      ctx.ccmpOk
        ? { label: "Hỗ trợ NFD: chuỗi chữ + dấu rời tự ghép về chữ dựng sẵn (ccmp)", status: "ok", detail: `${plan.sequences.length} chuỗi` }
        : { label: "NFD (ccmp) chưa được thêm", status: "warn", detail: "GSUB gốc quá phức tạp để ghép an toàn." },
    );
  }

  const os2 = re.sfnt.tables.get("OS/2");
  if (os2 && os2.length >= 78 && Number.isFinite(ctx.maxY)) {
    const winA = u16(os2, 74);
    const winD = u16(os2, 76);
    const clipTop = ctx.maxY > winA;
    const clipBot = -ctx.minY > winD;
    out.push(
      clipTop || clipBot
        ? { label: "Dấu có thể bị cắt trên Windows", status: "warn", detail: `cao nhất ${Math.round(ctx.maxY)} (winAscent ${winA}), thấp nhất ${Math.round(ctx.minY)} (winDescent ${winD})` }
        : { label: "Dấu nằm trọn trong vùng hiển thị (winAscent/winDescent)", status: "ok", detail: `cao nhất ${Math.round(ctx.maxY)} / ${winA}` },
    );
    const hhea = re.sfnt.tables.get("hhea");
    if (hhea) {
      const asc = i16(hhea, 4);
      if (ctx.maxY > asc * 1.35) out.push({ label: "Dấu chồng cao hơn nhiều so với ascender — dòng chữ hoa có dấu có thể chạm dòng trên", status: "warn", detail: `ascender ${asc}, dấu cao nhất ${Math.round(ctx.maxY)}. Line height gốc không bị đổi.` });
    }
  }

  const overhang = plan.glyphs.filter((g) => g.bbox && !g.combining && g.bbox[2] > g.adv + 2);
  out.push(
    overhang.length
      ? { label: "Một số chữ (râu ơ/ư) vươn quá độ rộng chữ", status: "warn", detail: `${overhang.length} glyph — kiểm tra spacing khi gõ liền nhau` }
      : { label: "Không glyph nào tràn khỏi độ rộng chữ", status: "ok" },
  );

  const hasKern = orig.sfnt.tables.has("kern") || orig.gposTags.includes("kern");
  if (hasKern) out.push({ label: "Kerning gốc giữ nguyên; glyph mới chưa có cặp kerning riêng", status: "warn", detail: "Chữ có dấu dùng khoảng cách của chính nó (chưa kế thừa kerning của chữ gốc)." });
  void u32;
  return out;
}
