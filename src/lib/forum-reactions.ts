/** 6 cảm xúc kiểu Facebook. key lưu trong cơ sở dữ liệu; cơ sở dữ liệu chỉ nhận đúng 6 giá trị này. */
export const REACTIONS = [
  { kind: "like", label: "Thích", color: "text-blue-600", bg: "bg-blue-600" },
  { kind: "love", label: "Yêu thích", color: "text-rose-500", bg: "bg-rose-500" },
  { kind: "haha", label: "Haha", color: "text-amber-500", bg: "bg-amber-500" },
  { kind: "wow", label: "Wow", color: "text-violet-500", bg: "bg-violet-500" },
  { kind: "sad", label: "Buồn", color: "text-sky-500", bg: "bg-sky-500" },
  { kind: "angry", label: "Phẫn nộ", color: "text-orange-600", bg: "bg-orange-600" },
] as const;

export type ReactionKind = (typeof REACTIONS)[number]["kind"];

export function reactionOf(kind: string) {
  return REACTIONS.find((item) => item.kind === kind) ?? null;
}
