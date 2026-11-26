/** Đọc/ghi nhị phân big-endian cho dữ liệu sfnt (OTF/TTF). */

function need(d: Uint8Array, o: number, n: number): void {
  if (!Number.isInteger(o) || o < 0 || o + n > d.length) {
    throw new Error("Font bị cắt cụt hoặc hỏng (đọc vượt biên).");
  }
}

export function u8(d: Uint8Array, o: number): number {
  need(d, o, 1);
  return d[o] as number;
}
export function u16(d: Uint8Array, o: number): number {
  need(d, o, 2);
  return ((d[o] as number) << 8) | (d[o + 1] as number);
}
export function i16(d: Uint8Array, o: number): number {
  const v = u16(d, o);
  return v >= 0x8000 ? v - 0x10000 : v;
}
export function u32(d: Uint8Array, o: number): number {
  need(d, o, 4);
  return (d[o] as number) * 0x1000000 + (((d[o + 1] as number) << 16) | ((d[o + 2] as number) << 8) | (d[o + 3] as number));
}
export function i32(d: Uint8Array, o: number): number {
  const v = u32(d, o);
  return v >= 0x80000000 ? v - 0x100000000 : v;
}
export function tag4(d: Uint8Array, o: number): string {
  need(d, o, 4);
  return String.fromCharCode(d[o] as number, d[o + 1] as number, d[o + 2] as number, d[o + 3] as number);
}
export function slice(d: Uint8Array, o: number, n: number): Uint8Array {
  need(d, o, n);
  return d.subarray(o, o + n);
}

/** Bộ ghi byte tự giãn. */
export class Writer {
  private buf = new Uint8Array(512);
  private n = 0;

  get length(): number {
    return this.n;
  }
  private grow(extra: number): void {
    if (this.n + extra <= this.buf.length) return;
    let cap = this.buf.length;
    while (cap < this.n + extra) cap *= 2;
    const next = new Uint8Array(cap);
    next.set(this.buf.subarray(0, this.n));
    this.buf = next;
  }
  u8(v: number): this {
    this.grow(1);
    this.buf[this.n++] = v & 0xff;
    return this;
  }
  u16(v: number): this {
    this.grow(2);
    this.buf[this.n++] = (v >> 8) & 0xff;
    this.buf[this.n++] = v & 0xff;
    return this;
  }
  u32(v: number): this {
    const x = v >>> 0;
    this.grow(4);
    this.buf[this.n++] = (x >>> 24) & 0xff;
    this.buf[this.n++] = (x >>> 16) & 0xff;
    this.buf[this.n++] = (x >>> 8) & 0xff;
    this.buf[this.n++] = x & 0xff;
    return this;
  }
  tag(t: string): this {
    for (let i = 0; i < 4; i++) this.u8(t.charCodeAt(i) || 32);
    return this;
  }
  bytes(b: Uint8Array): this {
    this.grow(b.length);
    this.buf.set(b, this.n);
    this.n += b.length;
    return this;
  }
  pad4(): this {
    while (this.n % 4) this.u8(0);
    return this;
  }
  setU16(pos: number, v: number): void {
    this.buf[pos] = (v >> 8) & 0xff;
    this.buf[pos + 1] = v & 0xff;
  }
  setU32(pos: number, v: number): void {
    const x = v >>> 0;
    this.buf[pos] = (x >>> 24) & 0xff;
    this.buf[pos + 1] = (x >>> 16) & 0xff;
    this.buf[pos + 2] = (x >>> 8) & 0xff;
    this.buf[pos + 3] = x & 0xff;
  }
  toBytes(): Uint8Array {
    return this.buf.slice(0, this.n);
  }
}

export function concatBytes(parts: Uint8Array[]): Uint8Array {
  let total = 0;
  for (const p of parts) total += p.length;
  const out = new Uint8Array(total);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}
