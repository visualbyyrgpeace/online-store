import type { FontModel } from "./font";
import { genBar, genHorn, genMark } from "./generate";
import { pathBBox, splitContours, transformPath, type BBox, type Path } from "./outline";
import { COMBINING_CPS, KIND_OF_CP, MARK_CP, MARK_SOURCES, VI_PRECOMPOSED, decompose, isUpper, uniName, type MarkKind } from "./vi";

/** Lập kế hoạch dựng glyph tiếng Việt: chọn nguồn dấu, tính vị trí theo "anchor" của từng chữ. */

export interface Params {
  gapLower: number; // khoảng cách dấu → chữ thường
  gapUpper: number; // khoảng cách dấu → chữ hoa
  stack: number; // khoảng cách giữa hai dấu chồng
  side: number; // độ lệch ngang của sắc/huyền khi đi cùng mũ/trăng (× bề rộng dấu mũ)
  nestle: number; // vị trí đáy của sắc/huyền so với chiều cao dấu mũ (0–1)
  gapBelow: number; // khoảng cách dấu nặng → chân chữ
}
export type Overrides = Record<number, { dx: number; dy: number }[]>;
export type CustomPaths = Record<string, Path>;

export interface PlanSettings {
  addCps: number[];
  params: Params;
  overrides: Overrides;
  custom: CustomPaths;
  nfd: boolean;
}

export interface Part {
  gid?: number; // dùng glyph có sẵn trong font
  key?: string; // hoặc đường viền riêng (glyph mới)
  dx: number;
  dy: number;
  s: number;
  bbox: BBox; // hộp bao sau khi đặt
  role: "base" | MarkKind | "bar";
}

export interface PlannedGlyph {
  cp: number;
  name: string;
  adv: number;
  parts: Part[];
  bbox: BBox | null;
  combining?: boolean;
}

export interface MarkSource {
  kind: MarkKind;
  from: "font" | "generated" | "custom";
  cp?: number;
  gid?: number;
  key?: string;
  bbox: BBox;
}

export interface Plan {
  glyphs: PlannedGlyph[];
  aliases: { cp: number; gid: number; from: number }[];
  customPaths: Map<string, { path: Path; adv: number }>;
  marks: Record<string, MarkSource>;
  /** chuỗi NFD → glyph (cp: ký tự đích, seq: base + các dấu rời) */
  sequences: { cp: number; seq: number[] }[];
  warnings: string[];
  params: Params;
}

const rect = (b: BBox): BBox => [b[0], b[1], b[2], b[3]];
const place = (b: BBox, s: number, dx: number, dy: number): BBox => [b[0] * s + dx, b[1] * s + dy, b[2] * s + dx, b[3] * s + dy];

function unionAll(list: BBox[]): BBox | null {
  let out: BBox | null = null;
  for (const b of list) out = out ? [Math.min(out[0], b[0]), Math.min(out[1], b[1]), Math.max(out[2], b[2]), Math.max(out[3], b[3])] : rect(b);
  return out;
}

/** Học khoảng cách dấu mà chính font đang dùng (đo từ á/Á…), nếu có. */
function learnGap(m: FontModel, baseCh: string, accented: number[], markKind: MarkKind): number | null {
  const baseGid = m.cmap.get(baseCh.codePointAt(0) as number);
  const baseBox = baseGid !== undefined ? m.bbox(baseGid) : null;
  if (!baseBox) return null;
  for (const cp of accented) {
    const gid = m.cmap.get(cp);
    if (gid === undefined) continue;
    const box = m.bbox(gid);
    const src = MARK_SOURCES[markKind].map((c) => m.cmap.get(c)).find((g) => g !== undefined);
    const mb = src !== undefined ? m.bbox(src) : null;
    if (!box || !mb) continue;
    const gap = box[3] - baseBox[3] - (mb[3] - mb[1]);
    if (gap >= 0 && gap <= m.upem * 0.16) return gap;
  }
  return null;
}

export function defaultParams(m: FontModel): Params {
  const e = m.upem;
  const lower = learnGap(m, "a", [0xe1, 0xe0, 0xe2, 0xe3], "acute") ?? Math.round(e * 0.05);
  const upper = learnGap(m, "A", [0xc1, 0xc0, 0xc2, 0xc3], "acute") ?? Math.round(e * 0.045);
  return {
    gapLower: Math.round(lower),
    gapUpper: Math.round(upper),
    stack: Math.max(Math.round(e * 0.03), Math.round(lower * 0.75)),
    side: 0.55,
    nestle: 0.55,
    gapBelow: Math.max(Math.round(e * 0.05), Math.round(lower)),
  };
}

type MarkLib = Partial<Record<MarkKind, MarkSource>>;

function resolveMarks(m: FontModel, custom: CustomPaths, plan: Plan): MarkLib {
  const lib: MarkLib = {};
  for (const kind of Object.keys(MARK_CP) as MarkKind[]) {
    if (kind === "horn") continue;
    const key = `mark.${kind}`;
    let src: MarkSource | undefined;
    const userPath = custom[key];
    if (userPath && userPath.length) {
      const bb = pathBBox(userPath);
      if (bb) {
        plan.customPaths.set(key, { path: userPath, adv: 0 });
        src = { kind, from: "custom", key, bbox: bb };
      }
    }
    if (!src) {
      for (const cp of MARK_SOURCES[kind]) {
        const gid = m.cmap.get(cp);
        const bb = gid !== undefined ? m.bbox(gid) : null;
        if (gid !== undefined && bb && bb[2] > bb[0] && bb[3] > bb[1]) {
          src = { kind, from: "font", cp, gid, bbox: bb };
          break;
        }
      }
    }
    if (!src) {
      const path = genMark(kind, m.metrics);
      const bb = pathBBox(path) as BBox;
      plan.customPaths.set(key, { path, adv: 0 });
      src = { kind, from: "generated", key, bbox: bb };
      plan.warnings.push(`Font không có dấu “${kind}” — đã tạo dấu mặc định, bạn nên chỉnh trong Glyph Editor.`);
    }
    lib[kind] = src;
  }
  return lib;
}

const TONES = new Set<MarkKind>(["grave", "acute", "hook", "tilde"]);

export function createPlan(m: FontModel, s: PlanSettings): Plan {
  const plan: Plan = { glyphs: [], aliases: [], customPaths: new Map(), marks: {}, sequences: [], warnings: [], params: s.params };
  const lib = resolveMarks(m, s.custom, plan);
  for (const [k, v] of Object.entries(lib)) if (v) plan.marks[k] = v;
  const P = s.params;
  const slant = Math.tan((-m.metrics.italic * Math.PI) / 180);

  // i không chấm
  let dotless: { gid?: number; key?: string; bbox: BBox } | null = null;
  const dotlessGid = m.cmap.get(0x131);
  if (dotlessGid !== undefined && m.bbox(dotlessGid)) dotless = { gid: dotlessGid, bbox: m.bbox(dotlessGid) as BBox };

  const ensureDotless = (): { gid?: number; key?: string; bbox: BBox } | null => {
    if (dotless) return dotless;
    const iGid = m.cmap.get(0x69);
    if (iGid === undefined) return null;
    const contours = splitContours(m.path(iGid));
    if (contours.length < 2) return null;
    let dotIdx = 0;
    let best = -Infinity;
    contours.forEach((c, i) => {
      const bb = pathBBox(c);
      if (bb && bb[1] > best) {
        best = bb[1];
        dotIdx = i;
      }
    });
    const path = s.custom["dotlessi"] ?? contours.filter((_, i) => i !== dotIdx).flat();
    const bb = pathBBox(path);
    if (!bb) return null;
    plan.customPaths.set("dotlessi", { path, adv: m.adv[iGid] as number });
    dotless = { key: "dotlessi", bbox: bb };
    plan.warnings.push("Font không có chữ ı (i không chấm) — đã tạo từ chữ i bằng cách bỏ dấu chấm (glyph mới, i gốc giữ nguyên).");
    return dotless;
  };

  const baseOf = (ch: number): { gid: number; bbox: BBox } | null => {
    const gid = m.cmap.get(ch);
    const bb = gid !== undefined ? m.bbox(gid) : null;
    return gid !== undefined && bb ? { gid, bbox: bb } : null;
  };

  const make = (cp: number): PlannedGlyph | null => {
    const upper = isUpper(cp);
    const nfd = decompose(cp);
    const baseCp = nfd[0] as number;
    let marks = nfd.slice(1);
    const ov = s.overrides[cp] ?? [];
    const parts: Part[] = [];
    let adv = 0;
    let baseBox: BBox;
    let baseSrc: { gid?: number; key?: string };

    // Đ / đ: gạch ngang
    if (cp === 0x110 || cp === 0x111) {
      const b = baseOf(cp === 0x110 ? 0x44 : 0x64);
      if (!b) return null;
      baseBox = b.bbox;
      adv = m.adv[b.gid] as number;
      parts.push({ gid: b.gid, dx: 0, dy: 0, s: 1, bbox: rect(b.bbox), role: "base" });
      const t = Math.max(m.metrics.stem, m.upem * 0.04);
      const key = cp === 0x110 ? "bar.upper" : "bar.lower";
      const w = baseBox[2] - baseBox[0];
      const barW = cp === 0x110 ? 0.62 * w : 0.5 * w;
      let barPath = s.custom[key];
      if (!barPath) {
        barPath = genBar(m.metrics, barW);
        const x0 = cp === 0x110 ? baseBox[0] - 0.12 * w : baseBox[2] - barW + 0.04 * w;
        const y0 = cp === 0x110 ? m.metrics.capHeight / 2 - t / 2 : baseBox[3] - 0.23 * (baseBox[3] - m.metrics.xHeight) - t;
        barPath = transformPath(barPath, 1, Math.round(x0), Math.round(y0));
      }
      const bb = pathBBox(barPath);
      if (!bb) return null;
      plan.customPaths.set(key, { path: barPath, adv: 0 });
      const o = ov[0] ?? { dx: 0, dy: 0 };
      parts.push({ key, dx: o.dx, dy: o.dy, s: 1, bbox: place(bb, 1, o.dx, o.dy), role: "bar" });
      return { cp, name: uniName(cp), adv, parts, bbox: unionAll(parts.map((p) => p.bbox)) };
    }

    const needDotless = baseCp === 0x69 && marks.some((k) => TONES.has(KIND_OF_CP.get(k) as MarkKind));
    if (needDotless) {
      const d = ensureDotless();
      if (!d) return null;
      baseBox = d.bbox;
      baseSrc = d.gid !== undefined ? { gid: d.gid } : { key: d.key as string };
      adv = m.adv[m.cmap.get(0x69) as number] as number;
    } else {
      const b = baseOf(baseCp);
      if (!b) return null;
      baseBox = b.bbox;
      baseSrc = { gid: b.gid };
      adv = m.adv[b.gid] as number;
    }
    parts.push({ ...baseSrc, dx: 0, dy: 0, s: 1, bbox: rect(baseBox), role: "base" });

    const cxBase = (baseBox[0] + baseBox[2]) / 2;
    const midY = (baseBox[1] + baseBox[3]) / 2;
    const centerAt = (y: number) => cxBase + slant * (y - midY);
    let prev: { kind: MarkKind; box: BBox } | null = null;
    marks = marks.slice();
    marks.forEach((mc, idx) => {
      const kind = KIND_OF_CP.get(mc);
      if (!kind) return;
      const o = ov[idx] ?? { dx: 0, dy: 0 };
      if (kind === "horn") {
        const round = baseCp === 0x4f || baseCp === 0x6f;
        const key = `horn.${String.fromCodePoint(baseCp)}`;
        let hp = s.custom[key];
        if (!hp) hp = genHorn(baseBox, round, m.metrics);
        const bb = pathBBox(hp);
        if (!bb) return;
        plan.customPaths.set(key, { path: hp, adv: 0 });
        parts.push({ key, dx: o.dx, dy: o.dy, s: 1, bbox: place(bb, 1, o.dx, o.dy), role: "horn" });
        return;
      }
      const src = lib[kind];
      if (!src) return;
      const mb = src.bbox;
      const mw = mb[2] - mb[0];
      const mh = mb[3] - mb[1];
      let cx: number;
      let yMin: number | null = null;
      let yMax: number | null = null;
      if (kind === "dotbelow") {
        yMax = baseBox[1] - P.gapBelow;
        cx = centerAt(yMax - mh / 2);
      } else if (prev) {
        const pw = prev.box[2] - prev.box[0];
        const ph = prev.box[3] - prev.box[1];
        const pcx = (prev.box[0] + prev.box[2]) / 2;
        if ((prev.kind === "circumflex" || prev.kind === "breve") && (kind === "acute" || kind === "grave")) {
          cx = pcx + (kind === "acute" ? 1 : -1) * P.side * pw;
          yMin = prev.box[1] + P.nestle * ph;
        } else {
          cx = pcx + slant * (mh / 2 + P.stack);
          yMin = prev.box[3] + P.stack;
        }
      } else {
        yMin = baseBox[3] + (upper ? P.gapUpper : P.gapLower);
        cx = centerAt(yMin + mh / 2);
      }
      const dx = Math.round(cx - (mb[0] + mb[2]) / 2) + o.dx;
      const dy = Math.round(yMax !== null ? yMax - mb[3] : (yMin as number) - mb[1]) + o.dy;
      const placed = place(mb, 1, dx, dy);
      void mw;
      parts.push({ gid: src.gid, key: src.key, dx, dy, s: 1, bbox: placed, role: kind });
      if (kind !== "dotbelow") prev = { kind, box: placed };
    });
    return { cp, name: uniName(cp), adv, parts, bbox: unionAll(parts.map((p) => p.bbox)) };
  };

  for (const cp of s.addCps) {
    // Đ → dùng lại Ð (Eth) của font nếu có để giữ nguyên thiết kế
    if (cp === 0x110) {
      const eth = m.cmap.get(0xd0);
      if (eth !== undefined && !s.custom["bar.upper"] && !s.overrides[0x110]) {
        plan.aliases.push({ cp, gid: eth, from: 0xd0 });
        continue;
      }
    }
    const g = make(cp);
    if (g) plan.glyphs.push(g);
    else plan.warnings.push(`Không dựng được U+${cp.toString(16).toUpperCase().padStart(4, "0")} (thiếu chữ gốc trong font).`);
  }

  // dấu rời (NFD): glyph rộng 0 đặt lệch trái để nằm trên chữ trước nó
  if (s.nfd) {
    const aGid = m.cmap.get(0x6f) ?? m.cmap.get(0x61);
    const refAdv = aGid !== undefined ? (m.adv[aGid] as number) : Math.round(m.upem * 0.5);
    for (const cp of COMBINING_CPS) {
      if (m.cmap.has(cp)) continue;
      const kind = KIND_OF_CP.get(cp) as MarkKind;
      const parts: Part[] = [];
      if (kind === "horn") {
        const ob = baseOf(0x6f);
        if (!ob) continue;
        const hp = transformPath(s.custom["horn.o"] ?? genHorn(ob.bbox, true, m.metrics), 1, -refAdv, 0);
        const key = "horn.comb";
        plan.customPaths.set(key, { path: hp, adv: 0 });
        parts.push({ key, dx: 0, dy: 0, s: 1, bbox: pathBBox(hp) as BBox, role: "horn" });
      } else {
        const src = lib[kind];
        if (!src) continue;
        const mb = src.bbox;
        const dx = Math.round(-refAdv / 2 - (mb[0] + mb[2]) / 2);
        const dy = Math.round(kind === "dotbelow" ? -P.gapBelow - mb[3] : m.metrics.xHeight + P.gapLower - mb[1]);
        parts.push({ gid: src.gid, key: src.key, dx, dy, s: 1, bbox: place(mb, 1, dx, dy), role: kind });
      }
      plan.glyphs.push({ cp, name: uniName(cp), adv: 0, parts, bbox: unionAll(parts.map((p) => p.bbox)), combining: true });
    }
  }

  // Chuỗi NFD → glyph dựng sẵn (dùng cho ccmp)
  if (s.nfd) {
    for (const cp of VI_PRECOMPOSED) {
      const seq = decompose(cp);
      if (seq.length < 2) continue;
      if (plan.glyphs.some((g) => g.cp === cp) || m.cmap.has(cp) || plan.aliases.some((a) => a.cp === cp)) plan.sequences.push({ cp, seq });
    }
  }
  return plan;
}
