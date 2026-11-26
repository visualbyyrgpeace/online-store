/** Dữ liệu chữ Việt: bộ ký tự dựng sẵn, dấu thanh và nguồn glyph dấu. */

export type MarkKind = "grave" | "acute" | "circumflex" | "tilde" | "breve" | "hook" | "horn" | "dotbelow";

export const MARK_CP: Record<MarkKind, number> = {
  grave: 0x0300,
  acute: 0x0301,
  circumflex: 0x0302,
  tilde: 0x0303,
  breve: 0x0306,
  hook: 0x0309,
  horn: 0x031b,
  dotbelow: 0x0323,
};

export const KIND_OF_CP = new Map<number, MarkKind>(
  (Object.keys(MARK_CP) as MarkKind[]).map((k) => [MARK_CP[k], k]),
);

export const COMBINING_CPS = (Object.keys(MARK_CP) as MarkKind[]).map((k) => MARK_CP[k]);

/** Mã Unicode có sẵn trong font có thể dùng làm hình dấu (ưu tiên từ trái sang). */
export const MARK_SOURCES: Record<MarkKind, number[]> = {
  grave: [0x0300, 0x0060, 0x02cb],
  acute: [0x0301, 0x00b4, 0x02ca],
  circumflex: [0x0302, 0x02c6],
  tilde: [0x0303, 0x02dc],
  breve: [0x0306, 0x02d8],
  hook: [0x0309],
  horn: [],
  dotbelow: [0x0323, 0x002e],
};

export const MARK_LABEL: Record<MarkKind, string> = {
  grave: "Huyền",
  acute: "Sắc",
  circumflex: "Mũ",
  tilde: "Ngã",
  breve: "Trăng",
  hook: "Hỏi",
  horn: "Râu",
  dotbelow: "Nặng",
};

/** 134 chữ cái tiếng Việt dựng sẵn (NFC), không gồm chữ Latin cơ bản. */
export const VI_PRECOMPOSED: number[] = (() => {
  const list = [
    0xc0, 0xc1, 0xc2, 0xc3, 0xc8, 0xc9, 0xca, 0xcc, 0xcd, 0xd2, 0xd3, 0xd4, 0xd5, 0xd9, 0xda, 0xdd,
    0xe0, 0xe1, 0xe2, 0xe3, 0xe8, 0xe9, 0xea, 0xec, 0xed, 0xf2, 0xf3, 0xf4, 0xf5, 0xf9, 0xfa, 0xfd,
    0x102, 0x103, 0x110, 0x111, 0x128, 0x129, 0x168, 0x169, 0x1a0, 0x1a1, 0x1af, 0x1b0,
  ];
  for (let c = 0x1ea0; c <= 0x1ef9; c++) list.push(c);
  return list;
})();

export const isUpper = (cp: number): boolean => {
  const ch = String.fromCodePoint(cp);
  return ch !== ch.toLowerCase();
};

export const hex4 = (cp: number): string => cp.toString(16).toUpperCase().padStart(4, "0");
export const uniName = (cp: number): string => (cp > 0xffff ? `u${hex4(cp)}` : `uni${hex4(cp)}`);

export const decompose = (cp: number): number[] =>
  Array.from(String.fromCodePoint(cp).normalize("NFD"), (c) => c.codePointAt(0) as number);
