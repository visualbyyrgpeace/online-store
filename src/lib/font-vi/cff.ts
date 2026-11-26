import { Writer, concatBytes, u16, u8, i16, slice } from "./bytes";
import type { Path, Seg } from "./outline";

/** Đọc/ghi bảng CFF (Type 2 charstring) cho font OTF dạng tên glyph (name-keyed). */

export interface CffIndex {
  items: Uint8Array[];
  end: number;
}

export function parseIndex(d: Uint8Array, off: number): CffIndex {
  const count = u16(d, off);
  if (count === 0) return { items: [], end: off + 2 };
  const offSize = u8(d, off + 2);
  const read = (i: number) => {
    let v = 0;
    for (let k = 0; k < offSize; k++) v = v * 256 + u8(d, off + 3 + i * offSize + k);
    return v;
  };
  const base = off + 3 + (count + 1) * offSize - 1;
  const items: Uint8Array[] = [];
  for (let i = 0; i < count; i++) items.push(slice(d, base + read(i), read(i + 1) - read(i)));
  return { items, end: base + read(count) };
}

export function buildIndex(items: Uint8Array[]): Uint8Array {
  const w = new Writer();
  w.u16(items.length);
  if (items.length === 0) return w.toBytes();
  let total = 1;
  for (const it of items) total += it.length;
  const offSize = total < 0x100 ? 1 : total < 0x10000 ? 2 : total < 0x1000000 ? 3 : 4;
  w.u8(offSize);
  let o = 1;
  const put = (v: number) => {
    for (let k = offSize - 1; k >= 0; k--) w.u8(Math.floor(v / 256 ** k) & 0xff);
  };
  put(o);
  for (const it of items) {
    o += it.length;
    put(o);
  }
  for (const it of items) w.bytes(it);
  return w.toBytes();
}

export interface DictEntry {
  op: number; // 0..21, hoặc 0x0c00|x cho toán tử mở rộng
  operands: number[];
  raw: Uint8Array; // byte của các toán hạng (không gồm toán tử)
}

export function parseDict(d: Uint8Array): DictEntry[] {
  const out: DictEntry[] = [];
  let ops: number[] = [];
  let rawStart = 0;
  let o = 0;
  while (o < d.length) {
    const b0 = u8(d, o);
    if (b0 <= 21) {
      let op = b0;
      let len = 1;
      if (b0 === 12) {
        op = 0x0c00 | u8(d, o + 1);
        len = 2;
      }
      out.push({ op, operands: ops, raw: d.slice(rawStart, o) });
      ops = [];
      o += len;
      rawStart = o;
    } else if (b0 === 28) {
      ops.push(i16(d, o + 1));
      o += 3;
    } else if (b0 === 29) {
      const v = (u8(d, o + 1) << 24) | (u8(d, o + 2) << 16) | (u8(d, o + 3) << 8) | u8(d, o + 4);
      ops.push(v);
      o += 5;
    } else if (b0 === 30) {
      let s = "";
      o++;
      let done = false;
      while (!done && o < d.length) {
        const b = u8(d, o++);
        for (const n of [b >> 4, b & 15]) {
          if (n === 15) {
            done = true;
            break;
          }
          s += n < 10 ? String(n) : n === 10 ? "." : n === 11 ? "E" : n === 12 ? "E-" : n === 14 ? "-" : "";
        }
      }
      ops.push(parseFloat(s) || 0);
    } else if (b0 >= 32 && b0 <= 246) {
      ops.push(b0 - 139);
      o++;
    } else if (b0 >= 247 && b0 <= 250) {
      ops.push((b0 - 247) * 256 + u8(d, o + 1) + 108);
      o += 2;
    } else if (b0 >= 251 && b0 <= 254) {
      ops.push(-(b0 - 251) * 256 - u8(d, o + 1) - 108);
      o += 2;
    } else {
      throw new Error("CFF: toán hạng DICT không hợp lệ.");
    }
  }
  return out;
}

const int5 = (v: number): Uint8Array => new Uint8Array([29, (v >>> 24) & 255, (v >>> 16) & 255, (v >>> 8) & 255, v & 255]);

function opBytes(op: number): Uint8Array {
  return op >= 0x0c00 ? new Uint8Array([12, op & 0xff]) : new Uint8Array([op]);
}

export const OP = {
  charset: 15,
  encoding: 16,
  charStrings: 17,
  private: 18,
  subrs: 19,
  defaultWidthX: 20,
  nominalWidthX: 21,
  ros: 0x0c1e,
  fdArray: 0x0c24,
  fdSelect: 0x0c25,
} as const;

export interface CffFont {
  nameIndex: Uint8Array[];
  topDict: DictEntry[];
  strings: Uint8Array[];
  gsubrs: Uint8Array[];
  charStrings: Uint8Array[];
  sids: number[]; // SID của từng glyph (glyph 0 = 0)
  privateDict: DictEntry[];
  lsubrs: Uint8Array[];
  defaultWidthX: number;
  nominalWidthX: number;
  header: Uint8Array;
}

const STD_STRING_COUNT = 391;

export function parseCff(d: Uint8Array): CffFont {
  const hdrSize = u8(d, 2);
  const header = d.slice(0, hdrSize);
  const nameIdx = parseIndex(d, hdrSize);
  const topIdx = parseIndex(d, nameIdx.end);
  const strIdx = parseIndex(d, topIdx.end);
  const gsubrIdx = parseIndex(d, strIdx.end);
  const top = parseDict(topIdx.items[0] ?? new Uint8Array(0));
  const get = (op: number) => top.find((e) => e.op === op);
  if (get(OP.ros) || get(OP.fdArray)) throw new Error("Font OTF dạng CID-keyed chưa được hỗ trợ. Hãy dùng TTF hoặc OTF thường.");
  const csOff = get(OP.charStrings)?.operands[0];
  if (csOff === undefined) throw new Error("CFF thiếu CharStrings.");
  const charStrings = parseIndex(d, csOff).items;
  const n = charStrings.length;
  const csetOff = get(OP.charset)?.operands[0] ?? 0;
  const sids: number[] = [0];
  if (csetOff <= 2) {
    if (csetOff !== 0) throw new Error("CFF: charset Expert chưa được hỗ trợ.");
    for (let i = 1; i < n; i++) sids.push(i);
  } else {
    const fmt = u8(d, csetOff);
    let o = csetOff + 1;
    if (fmt === 0) {
      for (let i = 1; i < n; i++, o += 2) sids.push(u16(d, o));
    } else {
      while (sids.length < n) {
        const first = u16(d, o);
        const left = fmt === 1 ? u8(d, o + 2) : u16(d, o + 2);
        o += fmt === 1 ? 3 : 4;
        for (let k = 0; k <= left && sids.length < n; k++) sids.push(first + k);
      }
    }
  }
  const priv = get(OP.private);
  let privateDict: DictEntry[] = [];
  let lsubrs: Uint8Array[] = [];
  let defaultWidthX = 0;
  let nominalWidthX = 0;
  if (priv && priv.operands.length >= 2) {
    const size = priv.operands[0] as number;
    const off = priv.operands[1] as number;
    privateDict = parseDict(slice(d, off, size));
    const sub = privateDict.find((e) => e.op === OP.subrs)?.operands[0];
    if (sub !== undefined) lsubrs = parseIndex(d, off + sub).items;
    defaultWidthX = privateDict.find((e) => e.op === OP.defaultWidthX)?.operands[0] ?? 0;
    nominalWidthX = privateDict.find((e) => e.op === OP.nominalWidthX)?.operands[0] ?? 0;
  }
  return {
    nameIndex: nameIdx.items,
    topDict: top,
    strings: strIdx.items,
    gsubrs: gsubrIdx.items,
    charStrings,
    sids,
    privateDict,
    lsubrs,
    defaultWidthX,
    nominalWidthX,
    header,
  };
}

export function cffGlyphName(font: CffFont, gid: number, std: readonly string[]): string {
  const sid = font.sids[gid] ?? 0;
  if (sid < STD_STRING_COUNT) return std[sid] ?? `sid${sid}`;
  const s = font.strings[sid - STD_STRING_COUNT];
  return s ? String.fromCharCode(...s) : `glyph${gid}`;
}

const bias = (n: number) => (n < 1240 ? 107 : n < 33900 ? 1131 : 32768);

/** Chạy charstring Type 2 và trả về đường viền tuyệt đối + độ rộng. */
export function runCharstring(font: CffFont, cs: Uint8Array): { width: number; path: Path } {
  const path: Path = [];
  const stack: number[] = [];
  let x = 0;
  let y = 0;
  let open = false;
  let stems = 0;
  let widthDone = false;
  let width = font.defaultWidthX;
  let ended = false;
  const gb = bias(font.gsubrs.length);
  const lb = bias(font.lsubrs.length);

  const takeWidth = (hasExtra: boolean) => {
    if (widthDone) return;
    widthDone = true;
    if (hasExtra) width = font.nominalWidthX + (stack.shift() as number);
  };
  const moveTo = (dx: number, dy: number) => {
    if (open) path.push(["Z"]);
    x += dx;
    y += dy;
    path.push(["M", x, y]);
    open = true;
  };
  const lineTo = (dx: number, dy: number) => {
    x += dx;
    y += dy;
    path.push(["L", x, y]);
  };
  const curveTo = (a: number, b: number, c: number, d: number, e: number, f: number) => {
    const x1 = x + a;
    const y1 = y + b;
    const x2 = x1 + c;
    const y2 = y1 + d;
    x = x2 + e;
    y = y2 + f;
    path.push(["C", x1, y1, x2, y2, x, y]);
  };

  const exec = (code: Uint8Array, depth: number) => {
    if (depth > 10) throw new Error("CFF: subr lồng quá sâu.");
    let o = 0;
    while (o < code.length && !ended) {
      const b0 = code[o++] as number;
      if (b0 >= 32 || b0 === 28) {
        if (b0 === 28) {
          stack.push(i16(code, o));
          o += 2;
        } else if (b0 <= 246) stack.push(b0 - 139);
        else if (b0 <= 250) stack.push((b0 - 247) * 256 + (code[o++] as number) + 108);
        else if (b0 <= 254) stack.push(-(b0 - 251) * 256 - (code[o++] as number) - 108);
        else {
          const v = ((code[o] as number) << 24) | ((code[o + 1] as number) << 16) | ((code[o + 2] as number) << 8) | (code[o + 3] as number);
          stack.push(v / 65536);
          o += 4;
        }
        continue;
      }
      switch (b0) {
        case 1:
        case 3:
        case 18:
        case 23:
          takeWidth(stack.length % 2 === 1);
          stems += stack.length >> 1;
          stack.length = 0;
          break;
        case 19:
        case 20:
          takeWidth(stack.length % 2 === 1);
          stems += stack.length >> 1;
          stack.length = 0;
          o += Math.ceil(stems / 8);
          break;
        case 21:
          takeWidth(stack.length > 2);
          moveTo(stack[0] as number, stack[1] as number);
          stack.length = 0;
          break;
        case 22:
          takeWidth(stack.length > 1);
          moveTo(stack[0] as number, 0);
          stack.length = 0;
          break;
        case 4:
          takeWidth(stack.length > 1);
          moveTo(0, stack[0] as number);
          stack.length = 0;
          break;
        case 5:
          for (let i = 0; i + 1 < stack.length; i += 2) lineTo(stack[i] as number, stack[i + 1] as number);
          stack.length = 0;
          break;
        case 6:
        case 7: {
          let h = b0 === 6;
          for (const v of stack) {
            if (h) lineTo(v, 0);
            else lineTo(0, v);
            h = !h;
          }
          stack.length = 0;
          break;
        }
        case 8:
          for (let i = 0; i + 5 < stack.length; i += 6) curveTo(stack[i] as number, stack[i + 1] as number, stack[i + 2] as number, stack[i + 3] as number, stack[i + 4] as number, stack[i + 5] as number);
          stack.length = 0;
          break;
        case 24: {
          let i = 0;
          for (; i + 7 < stack.length; i += 6) curveTo(stack[i] as number, stack[i + 1] as number, stack[i + 2] as number, stack[i + 3] as number, stack[i + 4] as number, stack[i + 5] as number);
          lineTo(stack[i] as number, stack[i + 1] as number);
          stack.length = 0;
          break;
        }
        case 25: {
          let i = 0;
          for (; i + 7 < stack.length; i += 2) lineTo(stack[i] as number, stack[i + 1] as number);
          curveTo(stack[i] as number, stack[i + 1] as number, stack[i + 2] as number, stack[i + 3] as number, stack[i + 4] as number, stack[i + 5] as number);
          stack.length = 0;
          break;
        }
        case 26: {
          let i = 0;
          let dx1 = 0;
          if (stack.length % 2) dx1 = stack[i++] as number;
          for (; i + 3 < stack.length; i += 4) {
            curveTo(dx1, stack[i] as number, stack[i + 1] as number, stack[i + 2] as number, 0, stack[i + 3] as number);
            dx1 = 0;
          }
          stack.length = 0;
          break;
        }
        case 27: {
          let i = 0;
          let dy1 = 0;
          if (stack.length % 2) dy1 = stack[i++] as number;
          for (; i + 3 < stack.length; i += 4) {
            curveTo(stack[i] as number, dy1, stack[i + 1] as number, stack[i + 2] as number, stack[i + 3] as number, 0);
            dy1 = 0;
          }
          stack.length = 0;
          break;
        }
        case 30:
        case 31: {
          let horiz = b0 === 31;
          let i = 0;
          while (i + 3 < stack.length) {
            const extra = stack.length - i === 5 ? (stack[i + 4] as number) : 0;
            if (horiz) curveTo(stack[i] as number, 0, stack[i + 1] as number, stack[i + 2] as number, extra, stack[i + 3] as number);
            else curveTo(0, stack[i] as number, stack[i + 1] as number, stack[i + 2] as number, stack[i + 3] as number, extra);
            horiz = !horiz;
            i += 4;
          }
          stack.length = 0;
          break;
        }
        case 10: {
          const idx = (stack.pop() as number) + lb;
          const sub = font.lsubrs[idx];
          if (!sub) throw new Error("CFF: subr cục bộ không tồn tại.");
          exec(sub, depth + 1);
          break;
        }
        case 29: {
          const idx = (stack.pop() as number) + gb;
          const sub = font.gsubrs[idx];
          if (!sub) throw new Error("CFF: subr toàn cục không tồn tại.");
          exec(sub, depth + 1);
          break;
        }
        case 11:
          return;
        case 14:
          takeWidth(stack.length === 1 || stack.length === 5);
          if (open) path.push(["Z"]);
          open = false;
          ended = true;
          return;
        case 12: {
          const b1 = code[o++] as number;
          const s = stack;
          if (b1 === 34) {
            const [dx1, dx2, dy2, dx3, dx4, dx5, dx6] = s as [number, number, number, number, number, number, number];
            curveTo(dx1, 0, dx2, dy2, dx3, 0);
            curveTo(dx4, 0, dx5, -dy2, dx6, 0);
          } else if (b1 === 35) {
            curveTo(s[0] as number, s[1] as number, s[2] as number, s[3] as number, s[4] as number, s[5] as number);
            curveTo(s[6] as number, s[7] as number, s[8] as number, s[9] as number, s[10] as number, s[11] as number);
          } else if (b1 === 36) {
            const [dx1, dy1, dx2, dy2, dx3, dx4, dx5, dy5, dx6] = s as [number, number, number, number, number, number, number, number, number];
            curveTo(dx1, dy1, dx2, dy2, dx3, 0);
            curveTo(dx4, 0, dx5, dy5, dx6, -(dy1 + dy2 + dy5));
          } else if (b1 === 37) {
            const sx = (s[0] as number) + (s[2] as number) + (s[4] as number) + (s[6] as number) + (s[8] as number);
            const sy = (s[1] as number) + (s[3] as number) + (s[5] as number) + (s[7] as number) + (s[9] as number);
            curveTo(s[0] as number, s[1] as number, s[2] as number, s[3] as number, s[4] as number, s[5] as number);
            if (Math.abs(sx) > Math.abs(sy)) curveTo(s[6] as number, s[7] as number, s[8] as number, s[9] as number, s[10] as number, -sy);
            else curveTo(s[6] as number, s[7] as number, s[8] as number, s[9] as number, -sx, s[10] as number);
          } else {
            throw new Error("CFF: toán tử charstring chưa hỗ trợ.");
          }
          stack.length = 0;
          break;
        }
        default:
          stack.length = 0;
      }
    }
  };
  exec(cs, 0);
  if (open) path.push(["Z"]);
  return { width, path };
}

function encodeNum(n: number): number[] {
  const v = Math.round(n);
  if (v >= -107 && v <= 107) return [v + 139];
  if (v >= 108 && v <= 1131) {
    const t = v - 108;
    return [247 + (t >> 8), t & 255];
  }
  if (v <= -108 && v >= -1131) {
    const t = -v - 108;
    return [251 + (t >> 8), t & 255];
  }
  const c = Math.max(-32768, Math.min(32767, v));
  return [28, (c >> 8) & 255, c & 255];
}

/** Sinh charstring Type 2 mới (không hint) từ đường viền cubic tuyệt đối. */
export function pathToCharstring(path: Path, width: number, defaultW: number, nominalW: number): Uint8Array {
  const out: number[] = [];
  let first = true;
  let x = 0;
  let y = 0;
  const wArg = Math.round(width) !== Math.round(defaultW) ? encodeNum(width - nominalW) : [];
  const delta = (nx: number, ny: number): [number, number] => {
    const rx = Math.round(nx);
    const ry = Math.round(ny);
    const d: [number, number] = [rx - x, ry - y];
    x = rx;
    y = ry;
    return d;
  };
  for (const s of path) {
    if (s[0] === "M") {
      const [dx, dy] = delta(s[1], s[2]);
      if (first) out.push(...wArg);
      first = false;
      out.push(...encodeNum(dx), ...encodeNum(dy), 21);
    } else if (s[0] === "L") {
      const [dx, dy] = delta(s[1], s[2]);
      out.push(...encodeNum(dx), ...encodeNum(dy), 5);
    } else if (s[0] === "C") {
      const [a, b] = delta(s[1], s[2]);
      const [c, d] = delta(s[3], s[4]);
      const [e, f] = delta(s[5], s[6]);
      for (const v of [a, b, c, d, e, f]) out.push(...encodeNum(v));
      out.push(8);
    }
  }
  if (first) out.push(...wArg);
  out.push(14);
  return new Uint8Array(out);
}

export interface NewCffGlyph {
  name: string;
  charstring: Uint8Array;
}

/** Dựng lại bảng CFF: giữ nguyên mọi dữ liệu gốc, chỉ thêm glyph mới (và tuỳ chọn đổi tên PostScript). */
export function rebuildCff(font: CffFont, added: NewCffGlyph[], psName?: string): Uint8Array {
  const strings = [...font.strings];
  const sids = [...font.sids];
  const charStrings = [...font.charStrings];
  for (const g of added) {
    const sid = STD_STRING_COUNT + strings.length;
    strings.push(new Uint8Array([...g.name].map((c) => c.charCodeAt(0))));
    sids.push(sid);
    charStrings.push(g.charstring);
  }
  const nameItems = psName ? [new Uint8Array([...psName].map((c) => c.charCodeAt(0) & 0x7f))] : font.nameIndex;
  const nameBytes = buildIndex(nameItems);
  const strBytes = buildIndex(strings);
  const gsubrBytes = buildIndex(font.gsubrs);
  const csBytes = buildIndex(charStrings);
  const cs = new Writer();
  cs.u8(0);
  for (let i = 1; i < sids.length; i++) cs.u16(sids[i] as number);
  const charsetBytes = cs.toBytes();

  // Private DICT (Subrs luôn đặt ngay sau)
  const privEntries = font.privateDict.filter((e) => e.op !== OP.subrs);
  const hasSubrs = font.lsubrs.length > 0;
  const privParts: Uint8Array[] = privEntries.map((e) => concatBytes([e.raw, opBytes(e.op)]));
  const subrsOpLen = hasSubrs ? 5 + 1 : 0;
  const privSize = privParts.reduce((s, p) => s + p.length, 0) + subrsOpLen;
  const privBytes = concatBytes([...privParts, ...(hasSubrs ? [int5(privSize), opBytes(OP.subrs)] : [])]);
  const lsubrBytes = hasSubrs ? buildIndex(font.lsubrs) : new Uint8Array(0);

  const topFor = (charsetOff: number, csOff: number, privOff: number): Uint8Array => {
    const parts: Uint8Array[] = [];
    for (const e of font.topDict) {
      if (e.op === OP.encoding) continue;
      if (e.op === OP.charset) parts.push(concatBytes([int5(charsetOff), opBytes(OP.charset)]));
      else if (e.op === OP.charStrings) parts.push(concatBytes([int5(csOff), opBytes(OP.charStrings)]));
      else if (e.op === OP.private) parts.push(concatBytes([int5(privBytes.length), int5(privOff), opBytes(OP.private)]));
      else parts.push(concatBytes([e.raw, opBytes(e.op)]));
    }
    if (!font.topDict.some((e) => e.op === OP.charset)) parts.push(concatBytes([int5(charsetOff), opBytes(OP.charset)]));
    return concatBytes(parts);
  };
  const dummyTop = buildIndex([topFor(0, 0, 0)]);
  const headLen = font.header.length + nameBytes.length + dummyTop.length + strBytes.length + gsubrBytes.length;
  const charsetOff = headLen;
  const csOff = charsetOff + charsetBytes.length;
  const privOff = csOff + csBytes.length;
  const topBytes = buildIndex([topFor(charsetOff, csOff, privOff)]);
  if (topBytes.length !== dummyTop.length) throw new Error("CFF: kích thước Top DICT thay đổi ngoài dự kiến.");
  return concatBytes([font.header, nameBytes, topBytes, strBytes, gsubrBytes, charsetBytes, csBytes, privBytes, lsubrBytes]);
}
