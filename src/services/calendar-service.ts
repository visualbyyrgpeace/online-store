import { createClient } from "@/lib/supabase/client";

export type CalendarNote = {
  id: string;
  note_date: string; // yyyy-MM-dd
  title: string;
  detail: string;
  repeat_yearly: boolean;
};

export type CalendarNoteInput = {
  noteDate: string;
  title: string;
  detail: string;
  repeatYearly: boolean;
};

const COLUMNS = "id, note_date, title, detail, repeat_yearly";

/** Người dùng hiện tại có phải admin không. Khách / chưa đăng nhập luôn là false. */
export async function isCalendarAdmin(): Promise<boolean> {
  const { data, error } = await createClient().rpc("calendar_is_admin");
  if (error) return false;
  return data === true;
}

/** Toàn bộ ghi chú của một năm, cộng thêm các ghi chú lặp lại hằng năm từ những năm khác. */
export async function listNotesForYear(year: number): Promise<CalendarNote[]> {
  const supabase = createClient();
  const [inYear, repeating] = await Promise.all([
    supabase.from("calendar_notes").select(COLUMNS).gte("note_date", `${year}-01-01`).lte("note_date", `${year}-12-31`),
    supabase.from("calendar_notes").select(COLUMNS).eq("repeat_yearly", true),
  ]);
  if (inYear.error) throw inYear.error;
  if (repeating.error) throw repeating.error;

  const seen = new Set<string>();
  const result: CalendarNote[] = [];
  for (const row of (inYear.data ?? []) as unknown as CalendarNote[]) {
    seen.add(row.id);
    result.push(row);
  }
  for (const row of (repeating.data ?? []) as unknown as CalendarNote[]) {
    if (seen.has(row.id)) continue;
    // Chiếu ghi chú lặp lại sang năm đang xem (29/2 chỉ có ở năm nhuận nên bỏ qua nếu không tồn tại).
    const [, m, d] = row.note_date.split("-");
    if (m === "02" && d === "29" && !isLeap(year)) continue;
    result.push({ ...row, note_date: `${year}-${m}-${d}` });
  }
  return result;
}

export async function createNote(input: CalendarNoteInput): Promise<void> {
  const { error } = await createClient().from("calendar_notes").insert({
    note_date: input.noteDate,
    title: input.title,
    detail: input.detail,
    repeat_yearly: input.repeatYearly,
  });
  if (error) throw error;
}

export async function updateNote(id: string, input: CalendarNoteInput): Promise<void> {
  const { data, error } = await createClient()
    .from("calendar_notes")
    .update({ note_date: input.noteDate, title: input.title, detail: input.detail, repeat_yearly: input.repeatYearly })
    .eq("id", id)
    .select("id");
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
