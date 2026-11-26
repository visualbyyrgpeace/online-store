import { Writer, tag4, u16, u32 } from "./bytes";

async function deflate(data: Uint8Array): Promise<Uint8Array> {
  const cs = new CompressionStream("deflate");
  const writer = cs.writable.getWriter();
  void writer.write(data as unknown as BufferSource);
  void writer.close();
  return new Uint8Array(await new Response(cs.readable).arrayBuffer());
}

/** Đóng gói sfnt thành WOFF 1.0 (nén zlib ngay trên trình duyệt). */
export async function toWoff(sfnt: Uint8Array): Promise<Uint8Array> {
  const n = u16(sfnt, 4);
  const entries: { tag: string; sum: number; data: Uint8Array; comp: Uint8Array }[] = [];
  for (let i = 0; i < n; i++) {
    const rec = 12 + i * 16;
    const off = u32(sfnt, rec + 8);
    const len = u32(sfnt, rec + 12);
    const data = sfnt.subarray(off, off + len);
    const z = await deflate(data);
    entries.push({ tag: tag4(sfnt, rec), sum: u32(sfnt, rec + 4), data, comp: z.length < data.length ? z : data });
  }
  entries.sort((a, b) => (a.tag < b.tag ? -1 : 1));
  const dirEnd = 44 + n * 20;
  let off = dirEnd;
  const placed = entries.map((e) => {
    const o = off;
    off += (e.comp.length + 3) & ~3;
    return { ...e, o };
  });
  const totalSfnt = 12 + n * 16 + entries.reduce((s, e) => s + ((e.data.length + 3) & ~3), 0);
  const w = new Writer();
  w.tag("wOFF").u32(u32(sfnt, 0)).u32(off).u16(n).u16(0).u32(totalSfnt).u16(1).u16(0).u32(0).u32(0).u32(0).u32(0).u32(0);
  for (const e of placed) w.tag(e.tag).u32(e.o).u32(e.comp.length).u32(e.data.length).u32(e.sum);
  for (const e of placed) w.bytes(e.comp).pad4();
  return w.toBytes();
}
