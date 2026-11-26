import { Writer, tag4, u16, u32 } from "./bytes";

/** Bộ chứa sfnt: giữ nguyên từng bảng ở dạng nhị phân để chỉ sửa đúng chỗ cần. */
export interface Sfnt {
  flavor: number; // 0x00010000 (TrueType) hoặc 0x4F54544F ("OTTO", CFF)
  tables: Map<string, Uint8Array>;
}

export const FLAVOR_TTF = 0x00010000;
export const FLAVOR_CFF = 0x4f54544f;

export function parseSfnt(data: Uint8Array): Sfnt {
  if (data.length < 12) throw new Error("Tệp quá nhỏ, không phải font.");
  const sig = tag4(data, 0);
  if (sig === "ttcf") throw new Error("Tệp .ttc (bộ sưu tập font) chưa được hỗ trợ — hãy tách từng font ra trước.");
  if (sig === "wOFF" || sig === "wOF2") throw new Error("Hãy chọn tệp TTF hoặc OTF gốc (không phải WOFF/WOFF2).");
  const flavor = u32(data, 0);
  if (flavor !== FLAVOR_TTF && flavor !== FLAVOR_CFF && sig !== "true") throw new Error("Không phải tệp font TTF/OTF hợp lệ.");
  const count = u16(data, 4);
  const tables = new Map<string, Uint8Array>();
  for (let i = 0; i < count; i++) {
    const rec = 12 + i * 16;
    const name = tag4(data, rec);
    const offset = u32(data, rec + 8);
    const length = u32(data, rec + 12);
    if (offset + length > data.length) throw new Error(`Bảng "${name}" nằm ngoài tệp — font bị hỏng.`);
    tables.set(name, data.slice(offset, offset + length));
  }
  return { flavor: sig === "true" ? FLAVOR_TTF : flavor, tables };
}

export function checksum(d: Uint8Array): number {
  let sum = 0;
  const n = d.length;
  for (let i = 0; i < n; i += 4) {
    const w =
      (((d[i] as number) << 24) |
        (((d[i + 1] ?? 0) as number) << 16) |
        (((d[i + 2] ?? 0) as number) << 8) |
        ((d[i + 3] ?? 0) as number)) >>>
      0;
    sum = (sum + w) >>> 0;
  }
  return sum;
}

export function serializeSfnt(font: Sfnt): Uint8Array {
  const tags = [...font.tables.keys()].sort();
  const n = tags.length;
  let pow = 1;
  let log = 0;
  while (pow * 2 <= n) {
    pow *= 2;
    log++;
  }
  const searchRange = pow * 16;
  const w = new Writer();
  w.u32(font.flavor).u16(n).u16(searchRange).u16(log).u16(n * 16 - searchRange);

  // head: đặt checkSumAdjustment = 0 trước khi tính
  const head = font.tables.get("head");
  if (head && head.length >= 12) {
    const copy = head.slice();
    copy.fill(0, 8, 12);
    font.tables.set("head", copy);
  }
  let offset = 12 + n * 16;
  const placed: { tag: string; data: Uint8Array; offset: number }[] = [];
  for (const t of tags) {
    const data = font.tables.get(t) as Uint8Array;
    placed.push({ tag: t, data, offset });
    offset += (data.length + 3) & ~3;
  }
  for (const p of placed) w.tag(p.tag).u32(checksum(p.data)).u32(p.offset).u32(p.data.length);
  for (const p of placed) {
    w.bytes(p.data).pad4();
  }
  const out = w.toBytes();
  const headPlaced = placed.find((p) => p.tag === "head");
  if (headPlaced) {
    const adj = (0xb1b0afba - checksum(out)) >>> 0;
    const view = new DataView(out.buffer, out.byteOffset, out.byteLength);
    view.setUint32(headPlaced.offset + 8, adj);
    const stored = font.tables.get("head") as Uint8Array;
    new DataView(stored.buffer, stored.byteOffset, stored.byteLength).setUint32(8, adj);
  }
  return out;
}
