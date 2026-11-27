import { createClient } from "@/lib/supabase/client";

export type CalendarNote = {
  id: string;
  note_date: string; // yyyy-MM-dd
  title: string;
  detail: string;
  repeat_yearly: boolean;
  icon: string | null;
};

export type CalendarNoteInput = {
  noteDate: string;
  title: string;
  detail: string;
  repeatYearly: boolean;
  icon: string | null;
};

const BASE_COLUMNS = "id, note_date, title, detail, repeat_yearly";
const COLUMNS = `${BASE_COLUMNS}, icon`;

/** Cột "icon" chưa có (chưa chạy migration icon) -> vẫn dùng được lịch, chỉ không lưu icon. */
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

/** Toàn bộ ghi chú của một năm, cộng thêm các ghi chú lặp lại hằng năm từ những năm khác. */
export async function listNotesForYear(year: number): Promise<CalendarNote[]> {
  let [inYear, repeating] = await loadRows(COLUMNS, year);
  if (missingColumn(inYear.error) || missingColumn(repeating.error)) [inYear, repeating] = await loadRows(BASE_COLUMNS, year);
  if (inYear.error) throw inYear.error;
  if (repeating.error) throw repeating.error;

  const normalize = (row: Omit<CalendarNote, "icon"> & { icon?: string | null }): CalendarNote => ({ ...row, icon: row.icon ?? null });
  const seen = new Set<string>();
  const result: CalendarNote[] = [];
  for (const raw of (inYear.data ?? []) as unknown as Parameters<typeof normalize>[0][]) {
    const row = normalize(raw);
    seen.add(row.id);
    result.push(row);
  }
  for (const raw of (repeating.data ?? []) as unknown as Parameters<typeof normalize>[0][]) {
    const row = normalize(raw);
    if (seen.has(row.id)) continue;
    // Chiếu ghi chú lặp lại sang năm đang xem (29/2 chỉ có ở năm nhuận nên bỏ qua nếu không tồn tại).
    const [, m, d] = row.note_date.split("-");
    if (m === "02" && d === "29" && !isLeap(year)) continue;
    result.push({ ...row, note_date: `${year}-${m}-${d}` });
  }
  return result;
}

export async function createNote(input: CalendarNoteInput): Promise<void> {
  const base = { note_date: input.noteDate, title: input.title, detail: input.detail, repeat_yearly: input.repeatYearly };
  const table = () => createClient().from("calendar_notes");
  let { error } = await table().insert({ ...base, icon: input.icon });
  if (missingColumn(error)) ({ error } = await table().insert(base));
  if (error) throw error;
}

export async function updateNote(id: string, input: CalendarNoteInput): Promise<void> {
  const base = { note_date: input.noteDate, title: input.title, detail: input.detail, repeat_yearly: input.repeatYearly };
  const run = (patch: Record<string, unknown>) => createClient().from("calendar_notes").update(patch).eq("id", id).select("id");
  let { data, error } = await run({ ...base, icon: input.icon });
  if (missingColumn(error)) ({ data, error } = await run(base));
  if (error) throw error;
  if (!data || data.length === 0) throw new Error("update_denied");
}

export async function deleteNote(id: string): Promise<void> {
  const { error } = await createClient().from("calendar_notes").delete().eq("id", id);
  if (error) throw error;
}

function isLeap(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}
