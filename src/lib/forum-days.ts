/** Tiện ích ngày cho diễn đàn. Ngày được gọi bằng chuỗi yyyy-MM-dd theo giờ máy của người xem. */
const WEEKDAY_FULL = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
export const MONTH_NAMES = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
export const WEEK_HEAD = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const pad = (n: number) => String(n).padStart(2, "0");

export function dayKey(y: number, m: number, d: number): string {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

export function dayKeyOf(date: Date): string {
  return dayKey(date.getFullYear(), date.getMonth(), date.getDate());
}

export function parseDayKey(key: string): Date {
  const [y = 1970, m = 1, d = 1] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Từ 0h đến 0h hôm sau của ngày đó. */
export function dayBounds(key: string): { start: Date; end: Date } {
  const start = parseDayKey(key);
  return { start, end: new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1) };
}

/** "Thứ bảy, 21/11" (thêm năm nếu không phải năm nay). */
export function formatDayLong(key: string): string {
  const date = parseDayKey(key);
  const base = `${WEEKDAY_FULL[date.getDay()]}, ${pad(date.getDate())}/${pad(date.getMonth() + 1)}`;
  return date.getFullYear() === new Date().getFullYear() ? base : `${base}/${date.getFullYear()}`;
}

export function formatClock(iso: string): string {
  const date = new Date(iso);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
