"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { FormMessage, inputClass, primaryButton, secondaryButton } from "@/components/ui/form";
import { Modal } from "@/components/utilities/modal";
import { ChevronLeftIcon, ChevronRightIcon, EditIcon, PlusIcon, TrashIcon } from "@/components/utilities/tool-icons";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@/hooks/use-query";
import { dayKey, dayKeyOf, MONTH_NAMES, parseDayKey } from "@/lib/forum-days";
import { dayCanChi, lunarLabel, solarToLunar, yearName } from "@/lib/lunar";
import { createNote, deleteNote, isCalendarAdmin, listNotesForYear, updateNote, type CalendarNote } from "@/services/calendar-service";

const WEEK_HEAD = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const WEEKDAY_FULL = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
const pad = (n: number) => String(n).padStart(2, "0");

function viDate(key: string): string {
  const d = parseDayKey(key);
  return `${WEEKDAY_FULL[d.getDay()]}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function lunarText(key: string): string {
  const d = parseDayKey(key);
  const l = solarToLunar(d.getDate(), d.getMonth() + 1, d.getFullYear());
  return `${l.day}/${l.month}${l.leap ? " nhuận" : ""} năm ${yearName(l.year)}`;
}

function groupByDay(notes: CalendarNote[]): Map<string, CalendarNote[]> {
  const map = new Map<string, CalendarNote[]>();
  for (const note of notes) {
    const list = map.get(note.note_date);
    if (list) list.push(note);
    else map.set(note.note_date, [note]);
  }
  return map;
}

/** Lịch xem ngày dương + âm. Chỉ admin mới thấy và ghi chú được các ngày đặc biệt. */
export function CalendarUtility() {
  const { user } = useAuth();
  const admin = useQuery<boolean>(`cal-admin:${user?.id ?? "anon"}`, () => (user ? isCalendarAdmin() : Promise.resolve(false)));
  const isAdmin = admin.status === "success" && admin.data;

  const [today, setToday] = useState<string | null>(null);
  const [view, setView] = useState<{ y: number; m: number } | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  const [showYear, setShowYear] = useState(false);

  // Ngày hôm nay lấy theo giờ máy người xem (chỉ ở trình duyệt, tránh lệch với bản dựng tĩnh).
  useEffect(() => {
    const now = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(dayKeyOf(now));
    setView({ y: now.getFullYear(), m: now.getMonth() });
  }, []);

  const todayYear = today ? parseDayKey(today).getFullYear() : 0;
  const viewYear = view?.y ?? 0;

  const yearNotes = useQuery<CalendarNote[]>(`cal-notes:${viewYear}:${isAdmin}:${version}`, () =>
    isAdmin && viewYear ? listNotesForYear(viewYear) : Promise.resolve([]),
  );
  const upcomingPool = useQuery<CalendarNote[]>(`cal-up:${todayYear}:${isAdmin}:${version}`, async () => {
    if (!isAdmin || !todayYear) return [];
    const [a, b] = await Promise.all([listNotesForYear(todayYear), listNotesForYear(todayYear + 1)]);
    return [...a, ...b];
  });

  const notesByDay = useMemo(() => groupByDay(yearNotes.status === "success" ? yearNotes.data : []), [yearNotes]);

  const next = useMemo(() => {
    if (!today || upcomingPool.status !== "success") return null;
    const sorted = upcomingPool.data.filter((n) => n.note_date >= today).sort((a, b) => (a.note_date < b.note_date ? -1 : a.note_date > b.note_date ? 1 : 0));
    const first = sorted[0];
    if (!first) return null;
    const days = Math.round((parseDayKey(first.note_date).getTime() - parseDayKey(today).getTime()) / 86400000);
    return { note: first, days };
  }, [today, upcomingPool]);

  const cells = useMemo(() => {
    if (!view) return [];
    const total = new Date(view.y, view.m + 1, 0).getDate();
    const blanks = new Date(view.y, view.m, 1).getDay(); // tuần bắt đầu từ Chủ nhật
    const list: ({ key: string; day: number; lunar: ReturnType<typeof solarToLunar> } | null)[] = Array.from({ length: blanks }, () => null);
    for (let d = 1; d <= total; d++) list.push({ key: dayKey(view.y, view.m, d), day: d, lunar: solarToLunar(d, view.m + 1, view.y) });
    while (list.length % 7 !== 0) list.push(null);
    return list;
  }, [view]);

  if (!today || !view) {
    return <div className="shimmer h-[520px] rounded-2xl" aria-busy="true" />;
  }

  function go(delta: number) {
    setView((v) => {
      if (!v) return v;
      const d = new Date(v.y, v.m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  }

  const todayDate = parseDayKey(today);
  const todayLunar = solarToLunar(todayDate.getDate(), todayDate.getMonth() + 1, todayDate.getFullYear());
  const atToday = view.y === todayDate.getFullYear() && view.m === todayDate.getMonth();
  const monthLunarYear = yearName(solarToLunar(15, view.m + 1, view.y).year);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        {isAdmin ? (
          <button
            type="button"
            onClick={() => setShowYear(true)}
            aria-label={`Xem các ngày quan trọng năm ${view.y}`}
            title="Xem các ngày quan trọng trong năm"
            className="group -m-1 rounded-xl p-1 text-left outline-none transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-black"
          >
            <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">Năm {monthLunarYear}</p>
            <p className="mt-0.5 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              {MONTH_NAMES[view.m]} <span className="text-slate-400 transition group-hover:text-slate-900">{view.y}</span>
            </p>
          </button>
        ) : (
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">Năm {monthLunarYear}</p>
            <p className="mt-0.5 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
              {MONTH_NAMES[view.m]} <span className="text-slate-400">{view.y}</span>
            </p>
          </div>
        )}
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Tháng trước" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 active:scale-95">
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setView({ y: todayDate.getFullYear(), m: todayDate.getMonth() })}
            disabled={atToday}
            className="h-10 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-95 disabled:opacity-40"
          >
            Hôm nay
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Tháng sau" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 active:scale-95">
            <ChevronRightIcon className="h-4 w-4" />
          </button>
          {isAdmin && (
            <button type="button" onClick={() => setSelected(today)} className={`${primaryButton} h-10`}>
              <PlusIcon className="h-4 w-4" /> Thêm
            </button>
          )}
        </div>
      </div>

      <p className="mb-4 text-sm text-slate-500">
        Hôm nay: <span className="font-semibold text-slate-950">{viDate(today)}</span> · Âm lịch {todayLunar.day}/{todayLunar.month}
        {todayLunar.leap ? " nhuận" : ""}
      </p>

      {isAdmin && next && (
        <button
          type="button"
          onClick={() => {
            const d = parseDayKey(next.note.note_date);
            setView({ y: d.getFullYear(), m: d.getMonth() });
            setSelected(next.note.note_date);
          }}
          className="mb-5 block w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-slate-900"
        >
          <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">Ngày quan trọng tiếp theo</p>
          <p className="mt-1 text-2xl font-semibold text-slate-950">{next.days === 0 ? "Hôm nay" : `Còn ${next.days} ngày`}</p>
          <p className="mt-1 text-sm text-slate-700">
            {next.note.title} <span className="text-slate-400">· {viDate(next.note.note_date)}</span>
          </p>
        </button>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white">
        <div className="grid grid-cols-7 border-b border-slate-300 bg-slate-50 text-center text-xs font-semibold text-slate-700">
          {WEEK_HEAD.map((label, i) => (
            <span key={label} className={`py-2.5 ${i > 0 ? "border-l border-slate-200" : ""}`}>
              {label}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((cell, i) => {
            const edge = `${i % 7 !== 0 ? "border-l" : ""} ${i >= 7 ? "border-t" : ""} border-slate-200`;
            if (!cell) return <span key={`b${i}`} aria-hidden="true" className={`min-h-[64px] bg-slate-50/50 sm:min-h-[100px] ${edge}`} />;
            const notes = notesByDay.get(cell.key) ?? [];
            const isToday = cell.key === today;
            return (
              <button
                key={cell.key}
                type="button"
                onClick={() => setSelected(cell.key)}
                aria-label={`${viDate(cell.key)}, âm lịch ${cell.lunar.day}/${cell.lunar.month}${notes.length ? `, ${notes.length} ghi chú` : ""}`}
                className={`flex min-h-[64px] flex-col items-stretch gap-1 p-1.5 text-left outline-none transition hover:bg-slate-100 focus-visible:bg-slate-100 sm:min-h-[100px] sm:p-2 ${edge}`}
              >
                <span className="flex items-start justify-between gap-1">
                  <span className={`grid h-6 min-w-6 place-items-center rounded-full px-1 text-xs font-semibold sm:text-sm ${isToday ? "bg-black text-white" : "text-slate-900"}`}>
                    {cell.day}
                  </span>
                  <span className={`pt-1 text-[10px] leading-none sm:text-[11px] ${cell.lunar.day === 1 ? "font-semibold text-slate-900" : "text-slate-400"}`}>
                    {lunarLabel(cell.lunar)}
                  </span>
                </span>
                {notes.length > 0 && (
                  <>
                    <span className="hidden flex-col gap-0.5 sm:flex">
                      {notes.slice(0, 2).map((n) => (
                        <span key={n.id} className="truncate rounded border-l-2 border-black bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-800">
                          {n.title}
                        </span>
                      ))}
                      {notes.length > 2 && <span className="px-1 text-[10px] text-slate-400">+{notes.length - 2} nữa</span>}
                    </span>
                    <span className="flex gap-0.5 sm:hidden" aria-hidden="true">
                      {notes.slice(0, 3).map((n) => (
                        <span key={n.id} className="h-1.5 w-1.5 rounded-full bg-black" />
                      ))}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {showYear && isAdmin && (
        <YearModal
          year={view.y}
          lunarYear={monthLunarYear}
          loading={yearNotes.status === "loading"}
          failed={yearNotes.status === "error"}
          notes={yearNotes.status === "success" ? yearNotes.data : []}
          today={today}
          onClose={() => setShowYear(false)}
          onPick={(key) => {
            const d = parseDayKey(key);
            setView({ y: d.getFullYear(), m: d.getMonth() });
            setShowYear(false);
            setSelected(key);
          }}
        />
      )}

      {selected && (
        <DayModal
          key={selected}
          dayKeyValue={selected}
          isAdmin={isAdmin}
          notes={notesByDay.get(selected) ?? []}
          loadingNotes={isAdmin && yearNotes.status === "loading"}
          onClose={() => setSelected(null)}
          onChanged={() => setVersion((v) => v + 1)}
        />
      )}
    </div>
  );
}

function YearModal({
  year,
  lunarYear,
  loading,
  failed,
  notes,
  today,
  onClose,
  onPick,
}: {
  year: number;
  lunarYear: string;
  loading: boolean;
  failed: boolean;
  notes: CalendarNote[];
  today: string;
  onClose: () => void;
  onPick: (key: string) => void;
}) {
  const sorted = useMemo(() => [...notes].sort((a, b) => (a.note_date < b.note_date ? -1 : a.note_date > b.note_date ? 1 : a.title.localeCompare(b.title))), [notes]);
  const months = useMemo(() => {
    const groups = new Map<number, CalendarNote[]>();
    for (const note of sorted) {
      const m = Number(note.note_date.slice(5, 7)) - 1;
      const list = groups.get(m);
      if (list) list.push(note);
      else groups.set(m, [note]);
    }
    return [...groups.entries()];
  }, [sorted]);

  return (
    <Modal open onClose={onClose} title={`Ngày quan trọng năm ${year}`} description={`Năm ${lunarYear} · ${sorted.length} ghi chú`}>
      {loading && <div className="shimmer h-24 rounded-xl" aria-busy="true" />}
      {failed && <FormMessage kind="error">Không tải được ghi chú.</FormMessage>}
      {!loading && !failed && sorted.length === 0 && <p className="py-6 text-center text-sm text-slate-500">Năm này chưa có ngày quan trọng nào.</p>}
      <div className="space-y-5">
        {months.map(([m, list]) => (
          <section key={m}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">{MONTH_NAMES[m]}</h3>
            <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">
              {list.map((note) => {
                const d = parseDayKey(note.note_date);
                const lunar = solarToLunar(d.getDate(), d.getMonth() + 1, d.getFullYear());
                const past = note.note_date < today;
                return (
                  <li key={note.id}>
                    <button type="button" onClick={() => onPick(note.note_date)} className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-slate-50 ${past ? "opacity-50" : ""}`}>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-black text-white">
                        <span className="text-base font-semibold leading-none">{d.getDate()}</span>
                        <span className="-mt-2 text-[9px] leading-none text-white/70">{WEEK_HEAD[d.getDay()]}</span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold text-slate-950">{note.title}</span>
                        <span className="block text-xs text-slate-500">
                          {pad(d.getDate())}/{pad(d.getMonth() + 1)} · Âm lịch {lunar.day}/{lunar.month}
                          {note.repeat_yearly ? " · Hằng năm" : ""}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </Modal>
  );
}

function DayModal({
  dayKeyValue,
  isAdmin,
  notes,
  loadingNotes,
  onClose,
  onChanged,
}: {
  dayKeyValue: string;
  isAdmin: boolean;
  notes: CalendarNote[];
  loadingNotes: boolean;
  onClose: () => void;
  onChanged: () => void;
}) {
  const date = parseDayKey(dayKeyValue);
  const [editing, setEditing] = useState<CalendarNote | null>(null);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [noteDate, setNoteDate] = useState(dayKeyValue);
  const [repeat, setRepeat] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setEditing(null);
    setTitle("");
    setDetail("");
    setNoteDate(dayKeyValue);
    setRepeat(false);
  }

  function startEdit(note: CalendarNote) {
    setEditing(note);
    setTitle(note.title);
    setDetail(note.detail);
    setNoteDate(note.note_date);
    setRepeat(note.repeat_yearly);
    setError(null);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Hãy nhập nội dung ghi chú (ví dụ: Sinh nhật, Họp, Ngày giỗ…).");
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(noteDate)) {
      setError("Ngày không hợp lệ.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const input = { noteDate, title: cleanTitle, detail: detail.trim(), repeatYearly: repeat };
      if (editing) await updateNote(editing.id, input);
      else await createNote(input);
      reset();
      onChanged();
    } catch (err) {
      console.error(err);
      setError("Không lưu được ghi chú. Hãy thử lại.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(note: CalendarNote) {
    if (!window.confirm(`Xóa ghi chú "${note.title}"?`)) return;
    setError(null);
    try {
      await deleteNote(note.id);
      if (editing?.id === note.id) reset();
      onChanged();
    } catch (err) {
      console.error(err);
      setError("Không xóa được ghi chú.");
    }
  }

  return (
    <Modal open onClose={onClose} title={viDate(dayKeyValue)} description={`Âm lịch: ${lunarText(dayKeyValue)}`}>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <dt className="text-xs text-slate-500">Dương lịch</dt>
          <dd className="mt-0.5 font-semibold text-slate-950">
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
          </dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <dt className="text-xs text-slate-500">Âm lịch</dt>
          <dd className="mt-0.5 font-semibold text-slate-950">{lunarText(dayKeyValue)}</dd>
        </div>
        <div className="col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <dt className="text-xs text-slate-500">Ngày can chi</dt>
          <dd className="mt-0.5 font-semibold text-slate-950">Ngày {dayCanChi(date.getDate(), date.getMonth() + 1, date.getFullYear())}</dd>
        </div>
      </dl>

      {isAdmin && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-950">Ghi chú</h3>
          {loadingNotes && <div className="shimmer mt-2 h-12 rounded-xl" aria-busy="true" />}
          {!loadingNotes && notes.length === 0 && <p className="mt-2 text-sm text-slate-500">Ngày này chưa có ghi chú.</p>}
          <ul className="mt-2 space-y-2">
            {notes.map((note) => (
              <li key={note.id} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <div className="min-w-0 flex-1">
                  <p className="break-words text-sm font-semibold text-slate-950">{note.title}</p>
                  {note.detail && <p className="mt-0.5 whitespace-pre-wrap break-words text-sm text-slate-600">{note.detail}</p>}
                  {note.repeat_yearly && <p className="mt-1 text-xs text-slate-400">Lặp lại hằng năm</p>}
                </div>
                <button type="button" onClick={() => startEdit(note)} aria-label={`Sửa ${note.title}`} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                  <EditIcon className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => void remove(note)} aria-label={`Xóa ${note.title}`} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-red-600">
                  <TrashIcon className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={submit} className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-950">{editing ? "Sửa ghi chú" : "Thêm ghi chú"}</p>
            <div>
              <label htmlFor="cal-title" className="mb-1.5 block text-sm font-medium text-slate-700">
                Hôm nay là ngày gì?
              </label>
              <input id="cal-title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} placeholder="Ví dụ: Sinh nhật bố, Ngày giỗ, Hạn nộp…" className={inputClass} />
            </div>
            <div>
              <label htmlFor="cal-detail" className="mb-1.5 block text-sm font-medium text-slate-700">
                Chi tiết (không bắt buộc)
              </label>
              <textarea id="cal-detail" value={detail} onChange={(e) => setDetail(e.target.value)} maxLength={1000} rows={3} className={inputClass} />
            </div>
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label htmlFor="cal-date" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Ngày (dương lịch)
                </label>
                <input id="cal-date" type="date" value={noteDate} onChange={(e) => setNoteDate(e.target.value)} className={inputClass} />
              </div>
              <label className="flex items-center gap-2 pb-2.5 text-sm text-slate-700">
                <input type="checkbox" checked={repeat} onChange={(e) => setRepeat(e.target.checked)} className="h-4 w-4 accent-black" />
                Lặp lại hằng năm
              </label>
            </div>
            {error && <FormMessage kind="error">{error}</FormMessage>}
            <div className="flex gap-2">
              <button type="submit" disabled={busy} className={primaryButton}>
                {busy ? "Đang lưu…" : editing ? "Lưu thay đổi" : "Thêm ghi chú"}
              </button>
              {editing && (
                <button type="button" onClick={reset} className={secondaryButton}>
                  Hủy sửa
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}
