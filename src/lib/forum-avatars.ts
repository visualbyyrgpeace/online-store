/**
 * Bộ avatar có sẵn của diễn đàn. Thành viên chỉ chọn trong bộ này, không tải ảnh lên.
 * key (a01…a16) là giá trị lưu trong cơ sở dữ liệu; cơ sở dữ liệu chỉ nhận đúng dạng này.
 */
export type AvatarOption = { key: string; glyph: string; tone: string };

export const FORUM_AVATARS: AvatarOption[] = [
  { key: "a01", glyph: "star", tone: "bg-amber-100 text-amber-700" },
  { key: "a02", glyph: "moon", tone: "bg-indigo-100 text-indigo-700" },
  { key: "a03", glyph: "sun", tone: "bg-orange-100 text-orange-700" },
  { key: "a04", glyph: "heart", tone: "bg-rose-100 text-rose-700" },
  { key: "a05", glyph: "bolt", tone: "bg-yellow-100 text-yellow-700" },
  { key: "a06", glyph: "leaf", tone: "bg-emerald-100 text-emerald-700" },
  { key: "a07", glyph: "flame", tone: "bg-red-100 text-red-700" },
  { key: "a08", glyph: "crown", tone: "bg-purple-100 text-purple-700" },
  { key: "a09", glyph: "skull", tone: "bg-slate-200 text-slate-700" },
  { key: "a10", glyph: "ghost", tone: "bg-sky-100 text-sky-700" },
  { key: "a11", glyph: "cat", tone: "bg-lime-100 text-lime-700" },
  { key: "a12", glyph: "coffee", tone: "bg-stone-200 text-stone-700" },
  { key: "a13", glyph: "music", tone: "bg-fuchsia-100 text-fuchsia-700" },
  { key: "a14", glyph: "anchor", tone: "bg-cyan-100 text-cyan-700" },
  { key: "a15", glyph: "smile", tone: "bg-teal-100 text-teal-700" },
  { key: "a16", glyph: "diamond", tone: "bg-blue-100 text-blue-700" },
];

export const DEFAULT_AVATAR = FORUM_AVATARS[0].key;

export function avatarOf(key: string): AvatarOption {
  return FORUM_AVATARS.find((item) => item.key === key) ?? FORUM_AVATARS[0];
}
