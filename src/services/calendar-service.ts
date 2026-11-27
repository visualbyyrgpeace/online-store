import { createClient } from "@/lib/supabase/client";
import { lunarOccurrences } from "@/lib/lunar";

export type CalendarType = "solar" | "lunar";

export type CalendarNote = {
  id: string;
  note_date: string; // yyyy-MM-dd (dương lịch; với ghi chú âm lịch lặp lại là ngày dương của năm đang xem)
  title: string;
  detail: string;
  repeat_yearly: boolean;
  icon: string | null;
  calendar_type: CalendarType;
  lunar_day: number | null;
  lunar_month: number | null;
  lunar_year: number | null;
  lunar_leap: boolean;
};

export type CalendarNoteInput = {
  noteDate: string;
  title: string;
  detail: string;
  repeatYearly: boolean;
  icon: string | null;
  calendarType: CalendarType;
  lunarDay: number | null;
  lunarMonth: number | null;
  lunarYear: number | null;
  lunarLeap: boolean;
};

const BASE_COLUMNS = "id, note_date, title, detail, repeat_yearly";
const ICON_COLUMNS = `${BASE_COLUMNS}, icon`;
const FULL_COLUMNS = `${ICON_COLUMNS}, calendar_type, lunar_day, lunar_month, lunar_year, lunar_leap`;
// Thử từ đủ cột đến ít cột: cột nào chưa có (chưa chạy migration) thì lùi một bậc, lịch vẫn dùng được.
const COLUMN_TIERS = [FULL_COLUMNS, ICON_COLUMNS, BASE_COLUMNS];

function missingColumn(error: { code?: string } | null): boolean {
  return error?.code === "42703" || error?.code === "PGRST204";
}

/** Người dùng hiện tại có phải admin không. Khách / chưa đăng nhập luôn là false. */
export async function isCalendarAdmin(): Promise<boolean> {
  const { data, error } = await createClient().rpc("calendar_is_admin");
  if (error) return false;
  return data === true;
}

function loadRows(columns: string, year: number) {
  const supabase = createClient();
  return Promise.all([
    supabase.from("calendar_notes").select(columns).gte("note_date", `${year}-01-01`).lte("note_date", `${year}-12-31`),
    supabase.from("calendar_notes").select(columns).eq("repeat_yearly", true),
  ]);
}

type RawRow = Omit<CalendarNote, "icon" | "calendar_type" | "lunar_day" | "lunar_month" | "lunar_year" | "lunar_leap"> & Partial<CalendarNote>;

function normalize(row: RawRow): CalendarNote {
  return {
    ...row,
    icon: row.icon ?? null,
    calendar_type: row.calendar_type === "lunar" ? "lunar" : "solar",
    lunar_day: row.lunar_day ?? null,
    lunar_month: row.lunar_month ?? null,
    lunar_year: row.lunar_year ?? null,
    lunar_leap: row.lunar_leap ?? false,
  };
}

/**
 * Toàn bộ ghi chú rơi vào một năm dương:
 * - ghi chú một lần: theo ngày dương đã lưu (ghi chú âm lịch một lần đã được quy ra ngày dương lúc lưu);
 * - lặp lại theo dương lịch: cùng ngày/tháng mỗi năm;
 * - lặp lại theo âm lịch: quy đổi ngày âm đó sang ngày dương của chính năm này (mỗi năm một ngày dương khác).
 */
export async function listNotesForYear(year: number): Promise<CalendarNote[]> {
  let [inYear, repeating] = await loadRows(COLUMN_TIERS[0]!, year);
  for (let tier = 1; tier < COLUMN_TIERS.length && (missingColumn(inYear.error) || missingColumn(repeating.error)); tier++) {
    [inYear, repeating] = await loadRows(COLUMN_TIERS[tier]!, year);
  }
  if (inYear.error) throw inYear.error;
  if (repeating.error) throw repeating.error;

  const result: CalendarNote[] = [];
  for (const raw of (inYear.data ?? []) as unknown as RawRow[]) {
    const row = normalize(raw);
    if (!row.repeat_yearly) result.push(row);
  }
  for (const raw of (repeating.data ?? []) as unknown as RawRow[]) {
    const row = normalize(raw);
    if (row.calendar_type === "lunar" && row.lunar_day && row.lunar_month) {
      for (const key of lunarOccurrences(year, row.lunar_month, row.lunar_day)) result.push({ ...row, note_date: key });
      continue;
    }
    // Lặp lại theo dương lịch (29/2 chỉ có ở năm nhuận nên bỏ qua nếu không tồn tại).
    const [, m, d] = row.note_date.split("-");
    if (m === "02" && d === "29" && !isLeap(year)) continue;
    result.push({ ...row, note_date: `${year}-${m}-${d}` });
  }
  return result;
}

function payloads(input: CalendarNoteInput): Record<string, unknown>[] {
  const base = { note_date: input.noteDate, title: input.title, detail: input.detail, repeat_yearly: input.repeatYearly };
  const withIcon = { ...base, icon: input.icon };
  const full = {
    ...withIcon,
    calendar_type: input.calendarType,
    lunar_day: input.calendarType === "lunar" ? input.lunarDay : null,
    lunar_month: input.calendarType === "lunar" ? input.lunarMonth : null,
    lunar_year: input.calendarType === "lunar" ? input.lunarYear : null,
    lunar_leap: input.calendarType === "lunar" ? input.lunarLeap : false,
  };
  // Ghi chú âm lịch bắt buộc có cột âm lịch: không được lặng lẽ lưu thành ghi chú dương.
  return input.calendarType === "lunar" ? [full] : [full, withIcon, base];
}

export async function createNote(input: CalendarNoteInput): Promise<void> {
  let lastError: { code?: string } | null = null;
  for (const payload of payloads(input)) {
    const { error } = await createClient().from("calendar_notes").insert(payload);
    if (!error) return;
    lastError = error;
    if (!missingColumn(error)) throw error;
  }
  throw input.calendarType === "lunar" ? new Error("lunar_schema_missing") : lastError;
}

export async function updateNote(id: string, input: CalendarNoteInput): Promise<void> {
  let lastError: { code?: string } | null = null;
  for (const payload of payloads(input)) {
    const { data, error } = await createClient().from("calendar_notes").update(payload).eq("id", id).select("id");
    if (!error) {
      if (!data || data.length === 0) throw new Error("update_denied");
      return;
    }
    lastError = error;
    if (!missingColumn(error)) throw error;
  }
  throw input.calendarType === "lunar" ? new Error("lunar_schema_missing") : lastError;
}

export async function deleteNote(id: string): Promise<void> {
  const { error } = await createClient().from("calendar_notes").delete().eq("id", id);
  if (error) throw error;
}

function isLeap(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}
