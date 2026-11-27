"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { FormMessage, inputClass, primaryButton, secondaryButton } from "@/components/ui/form";
import { Modal } from "@/components/utilities/modal";
import { guessNoteIcon, NOTE_ICONS, NoteIcon, noteIconLabel } from "@/components/utilities/note-icons";
import { ChevronLeftIcon, ChevronRightIcon, EditIcon, PlusIcon, TrashIcon } from "@/components/utilities/tool-icons";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@/hooks/use-query";
import { dayKey, dayKeyOf, MONTH_NAMES, parseDayKey } from "@/lib/forum-days";
import { holidaysForYear, type FixedHoliday } from "@/lib/fixed-holidays";
import { dayCanChi, lunarLabel, lunarToSolar, solarToLunar, yearName } from "@/lib/lunar";
import { createNote, deleteNote, isCalendarAdmin, listNotesForYear, updateNote, type CalendarNote, type CalendarType } from "@/services/calendar-service";

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
  const [mode, setMode] = useState<"month" | "year">("month");

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
  // Ngày lễ cố định: tính trực tiếp, ai cũng thấy (không cần đăng nhập).
  const holidaysByDay = useMemo(() => (viewYear ? holidaysForYear(viewYear) : new Map<string, FixedHoliday[]>()), [viewYear]);

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
      const d = new Date(v.y, v.m + (mode === "year" ? delta * 12 : delta), 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  }

  const todayDate = parseDayKey(today);
  const todayLunar = solarToLunar(todayDate.getDate(), todayDate.getMonth() + 1, todayDate.getFullYear());
  const atToday = view.y === todayDate.getFullYear() && (mode === "year" || view.m === todayDate.getMonth());
  const monthLunarYear = yearName(solarToLunar(15, mode === "year" ? 7 : view.m + 1, view.y).year);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <button
          type="button"
          onClick={() => setMode(mode === "year" ? "month" : "year")}
          aria-label={mode === "year" ? "Quay lại xem theo tháng" : `Xem cả năm ${view.y}`}
          title={mode === "year" ? "Quay lại xem theo tháng" : "Xem cả năm"}
          className="group -m-1 rounded-xl p-1 text-left outline-none transition hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-black"
        >
          <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">Năm {monthLunarYear}</p>
          <p className="mt-0.5 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            {mode === "year" ? "Cả năm" : MONTH_NAMES[view.m]} <span className="text-slate-400 transition group-hover:text-slate-900">{view.y}</span>
          </p>
        </button>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => go(-1)} aria-label={mode === "year" ? "Năm trước" : "Tháng trước"} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 active:scale-95">
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
          <button type="button" onClick={() => go(1)} aria-label={mode === "year" ? "Năm sau" : "Tháng sau"} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 active:scale-95">
            <ChevronRightIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === "year" ? "month" : "year")}
            className="h-10 rounded-xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-95"
          >
            {mode === "year" ? "Xem tháng" : "Cả năm"}
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
            setMode("month");
            setSelected(next.note.note_date);
          }}
          className="mb-5 block w-full rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-slate-900"
        >
          <p className="text-[11px] font-medium uppercase tracking-widest text-slate-400">Ngày quan trọng tiếp theo</p>
          <p className="mt-1 text-2xl font-semibold text-slate-950">{next.days === 0 ? "Hôm nay" : `Còn ${next.days} ngày`}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-700">
            <NoteIcon id={next.note.icon} className="h-4 w-4 shrink-0 text-slate-950" />
            {next.note.title} <span className="text-slate-400">· {viDate(next.note.note_date)}</span>
          </p>
        </button>
      )}

      {mode === "month" ? (
        <>
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
            const holidays = holidaysByDay.get(cell.key) ?? [];
            const isToday = cell.key === today;
            return (
              <button
                key={cell.key}
                type="button"
                onClick={() => setSelected(cell.key)}
                aria-label={`${viDate(cell.key)}, âm lịch ${cell.lunar.day}/${cell.lunar.month}${notes.length ? `, ${notes.length} ghi chú` : ""}${holidays.length ? `, ${holidays.map((h) => h.name).join(", ")}` : ""}`}
                title={holidays.length ? holidays.map((h) => h.name).join(" · ") : undefined}
                className={`flex min-h-[64px] flex-col items-stretch gap-1 p-1.5 text-left outline-none transition hover:bg-slate-100 focus-visible:bg-slate-100 sm:min-h-[100px] sm:p-2 ${edge}`}
              >
                <span className="flex items-start justify-between gap-1">
                  <span className="flex items-start gap-0.5">
                    <span className={`grid h-6 min-w-6 place-items-center rounded-full px-1 text-xs font-semibold sm:text-sm ${isToday ? "bg-black text-white" : "text-slate-900"}`}>
                      {cell.day}
                    </span>
                    {holidays.length > 0 && <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />}
                  </span>
                  <span className={`pt-1 text-[10px] leading-none sm:text-[11px] ${cell.lunar.day === 1 ? "font-semibold text-slate-900" : "text-slate-400"}`}>
                    {lunarLabel(cell.lunar)}
                  </span>
                </span>
                {notes.length > 0 && (
                  <>
                    <span className="hidden flex-col gap-0.5 sm:flex">
                      {notes.slice(0, 2).map((n) => (
                        <span key={n.id} className="flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-800">
                          <NoteIcon id={n.icon} className="h-3 w-3 shrink-0" />
                          <span className="truncate">{n.title}</span>
                        </span>
                      ))}
                      {notes.length > 2 && <span className="px-1 text-[10px] text-slate-400">+{notes.length - 2} nữa</span>}
                    </span>
                    <span className="flex gap-0.5 sm:hidden" aria-hidden="true">
                      {notes.slice(0, 3).map((n) => (
                        <NoteIcon key={n.id} id={n.icon} className="h-3 w-3" />
                      ))}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
        </>
      ) : (
        <>
          <YearView
            year={view.y}
            today={today}
            notesByDay={notesByDay}
            holidaysByDay={holidaysByDay}
            onMonth={(m) => {
              setView({ y: view.y, m });
              setMode("month");
            }}
            onPick={(key) => {
              const d = parseDayKey(key);
              setView({ y: d.getFullYear(), m: d.getMonth() });
              setMode("month");
              setSelected(key);
            }}
          />
          {isAdmin && (
            <YearNotes
              year={view.y}
              loading={yearNotes.status === "loading"}
              failed={yearNotes.status === "error"}
              notes={yearNotes.status === "success" ? yearNotes.data : []}
              today={today}
              onPick={(key) => {
                const d = parseDayKey(key);
                setView({ y: d.getFullYear(), m: d.getMonth() });
                setMode("month");
                setSelected(key);
              }}
            />
          )}
        </>
      )}

      {selected && (
        <DayModal
          key={selected}
          dayKeyValue={selected}
          isAdmin={isAdmin}
          notes={notesByDay.get(selected) ?? []}
          holidays={holidaysByDay.get(selected) ?? []}
          loadingNotes={isAdmin && yearNotes.status === "loading"}
          onClose={() => setSelected(null)}
          onChanged={() => setVersion((v) => v + 1)}
        />
      )}
    </div>
  );
}

function YearView({
  year,
  today,
  notesByDay,
  holidaysByDay,
  onMonth,
  onPick,
}: {
  year: number;
  today: string;
  notesByDay: Map<string, CalendarNote[]>;
  holidaysByDay: Map<string, FixedHoliday[]>;
  onMonth: (m: number) => void;
  onPick: (key: string) => void;
}) {
  const months = useMemo(
    () =>
      Array.from({ length: 12 }, (_, m) => ({
        m,
        blanks: new Date(year, m, 1).getDay(), // tuần bắt đầu từ Chủ nhật
        total: new Date(year, m + 1, 0).getDate(),
      })),
    [year],
  );

  return (
    <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4">
      {months.map(({ m, blanks, total }) => (
        <section key={m} className="rounded-xl border border-slate-300 bg-white p-3">
          <button type="button" onClick={() => onMonth(m)} className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-950 outline-none hover:underline focus-visible:underline">
            Tháng {m + 1}
          </button>
          <div className="grid grid-cols-7 text-center text-[10px] font-medium text-slate-400">
            {WEEK_HEAD.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-y-1">
            {Array.from({ length: blanks }, (_, i) => (
              <span key={`b${i}`} aria-hidden="true" />
            ))}
            {Array.from({ length: total }, (_, i) => {
              const d = i + 1;
              const key = dayKey(year, m, d);
              const notes = notesByDay.get(key);
              const holidays = holidaysByDay.get(key);
              const isToday = key === today;
              // Ô cố định dạng vuông (aspect-square) + rounded-full => luôn là hình tròn tuyệt đối.
              const tone = notes
                ? `bg-black font-semibold text-white ${isToday ? "ring-2 ring-black ring-offset-2" : ""}`
                : isToday
                  ? "font-semibold text-slate-950 ring-2 ring-black"
                  : "text-slate-700 group-hover:bg-slate-100";
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onPick(key)}
                  title={[...(holidays ?? []).map((h) => h.name), ...(notes ?? []).map((n) => n.title)].join(" · ") || undefined}
                  aria-label={`${viDate(key)}${notes ? `, ${notes.length} ghi chú` : ""}${holidays ? `, ${holidays.map((h) => h.name).join(", ")}` : ""}`}
                  className="group block w-full rounded-full outline-none"
                >
                  <span className={`relative mx-auto grid aspect-square w-full max-w-7 place-items-center rounded-full text-[11px] font-medium transition group-focus-visible:ring-2 group-focus-visible:ring-slate-500 ${tone}`}>
                    {d}
                    {holidays && <span aria-hidden="true" className="absolute bottom-[3px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-500 ring-1 ring-white" />}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function YearNotes({
  year,
  loading,
  failed,
  notes,
  today,
  onPick,
}: {
  year: number;
  loading: boolean;
  failed: boolean;
  notes: CalendarNote[];
  today: string;
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
    <section className="mt-8">
      <h2 className="text-base font-semibold text-slate-950">Ngày quan trọng năm {year}</h2>
      <p className="mb-4 text-sm text-slate-500">{sorted.length} ghi chú</p>
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
                  <li key={`${note.id}-${note.note_date}`}>
                    <button type="button" onClick={() => onPick(note.note_date)} className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-slate-50 ${past ? "opacity-50" : ""}`}>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-black text-white">
                        <span className="text-base font-semibold leading-none">{d.getDate()}</span>
                        <span className="-mt-2 text-[9px] leading-none text-white/70">{WEEK_HEAD[d.getDay()]}</span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-950">
                          <NoteIcon id={note.icon} className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{note.title}</span>
                        </span>
                        <span className="block text-xs text-slate-500">
                          {pad(d.getDate())}/{pad(d.getMonth() + 1)} · Âm lịch {lunar.day}/{lunar.month}
                          {note.calendar_type === "lunar" ? " · Theo âm lịch" : ""}
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
    </section>
  );
}

function DayModal({
  dayKeyValue,
  isAdmin,
  notes,
  holidays,
  loadingNotes,
  onClose,
  onChanged,
}: {
  dayKeyValue: string;
  isAdmin: boolean;
  notes: CalendarNote[];
  holidays: FixedHoliday[];
  loadingNotes: boolean;
  onClose: () => void;
  onChanged: () => void;
}) {
  const date = useMemo(() => parseDayKey(dayKeyValue), [dayKeyValue]);
  const [editing, setEditing] = useState<CalendarNote | null>(null);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [noteDate, setNoteDate] = useState(dayKeyValue);
  const [repeat, setRepeat] = useState(false);
  const initialLunar = useMemo(() => solarToLunar(date.getDate(), date.getMonth() + 1, date.getFullYear()), [date]);
  const [calType, setCalType] = useState<CalendarType>("solar");
  const [lunarDay, setLunarDay] = useState(initialLunar.day);
  const [lunarMonth, setLunarMonth] = useState(initialLunar.month);
  const [lunarYear, setLunarYear] = useState(initialLunar.year);
  const [lunarLeap, setLunarLeap] = useState(initialLunar.leap);
  const [icon, setIcon] = useState<string | null>(null);
  const [iconTouched, setIconTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setEditing(null);
    setTitle("");
    setDetail("");
    setNoteDate(dayKeyValue);
    setRepeat(false);
    setCalType("solar");
    setLunarDay(initialLunar.day);
    setLunarMonth(initialLunar.month);
    setLunarYear(initialLunar.year);
    setLunarLeap(initialLunar.leap);
    setIcon(null);
    setIconTouched(false);
  }

  // Ngày dương ứng với ngày âm đang chọn: 3 năm liền nhau cho ghi chú lặp lại, 1 năm cho ghi chú một lần.
  const lunarSolar: { year: number; key: string | null; adjusted: boolean }[] | null =
    calType === "lunar"
      ? (repeat ? [lunarYear, lunarYear + 1, lunarYear + 2] : [lunarYear]).map((y) => {
          const found = lunarToSolar(lunarDay, lunarMonth, y, repeat ? false : lunarLeap);
          return { year: y, key: found?.key ?? null, adjusted: found?.adjusted ?? false };
        })
      : null;

  /** Đổi giữa dương/âm: giữ nguyên ngày đang chọn, chỉ quy đổi sang cách ghi còn lại. */
  function switchType(next: CalendarType) {
    if (next === calType) return;
    if (next === "lunar" && /^\d{4}-\d{2}-\d{2}$/.test(noteDate)) {
      const d = parseDayKey(noteDate);
      const l = solarToLunar(d.getDate(), d.getMonth() + 1, d.getFullYear());
      setLunarDay(l.day);
      setLunarMonth(l.month);
      setLunarYear(l.year);
      setLunarLeap(l.leap);
    }
    const firstKey = lunarSolar?.[0]?.key;
    if (next === "solar" && firstKey) setNoteDate(firstKey);
    setCalType(next);
  }

  function startEdit(note: CalendarNote) {
    setEditing(note);
    setTitle(note.title);
    setDetail(note.detail);
    setNoteDate(note.note_date);
    setRepeat(note.repeat_yearly);
    setCalType(note.calendar_type);
    if (note.calendar_type === "lunar") {
      setLunarDay(note.lunar_day ?? initialLunar.day);
      setLunarMonth(note.lunar_month ?? initialLunar.month);
      setLunarYear(note.lunar_year ?? initialLunar.year);
      setLunarLeap(note.lunar_leap);
    }
    setIcon(note.icon);
    setIconTouched(true);
    setError(null);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Hãy nhập nội dung ghi chú (ví dụ: Sinh nhật, Họp, Ngày giỗ…).");
      return;
    }
    let finalDate = noteDate;
    if (calType === "lunar") {
      // Ghi chú âm lịch lưu kèm ngày dương gốc; nếu lặp lại thì mỗi năm app tự quy đổi lại.
      const first = lunarSolar?.[0];
      if (!first?.key) {
        setError("Ngày âm này không tồn tại trong năm đã chọn (tháng nhuận chỉ có ở một số năm).");
        return;
      }
      finalDate = first.key;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(noteDate)) {
      setError("Ngày không hợp lệ.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const input = {
        noteDate: finalDate,
        title: cleanTitle,
        detail: detail.trim(),
        repeatYearly: repeat,
        icon,
        calendarType: calType,
        lunarDay: calType === "lunar" ? lunarDay : null,
        lunarMonth: calType === "lunar" ? lunarMonth : null,
        lunarYear: calType === "lunar" ? lunarYear : null,
        lunarLeap: calType === "lunar" && !repeat ? lunarLeap : false,
      };
      if (editing) await updateNote(editing.id, input);
      else await createNote(input);
      reset();
      onChanged();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error && err.message === "lunar_schema_missing"
          ? "Chưa bật được ghi chú âm lịch: hãy chạy file SQL 20261127000300_calendar_note_lunar.sql trong Supabase."
          : "Không lưu được ghi chú. Hãy thử lại.",
      );
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

      {holidays.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-slate-950">Ngày lễ</h3>
          <ul className="mt-2 space-y-1.5">
            {holidays.map((h) => (
              <li key={h.name} className="flex items-start gap-2 text-sm text-slate-800">
                <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                <span>
                  {h.name}
                  <span className="text-slate-400"> · {h.lunar ? `theo âm lịch ${h.day}/${h.month}` : "theo dương lịch"}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isAdmin && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-950">Ghi chú</h3>
          {loadingNotes && <div className="shimmer mt-2 h-12 rounded-xl" aria-busy="true" />}
          {!loadingNotes && notes.length === 0 && <p className="mt-2 text-sm text-slate-500">Ngày này chưa có ghi chú.</p>}
          <ul className="mt-2 space-y-2">
            {notes.map((note) => (
              <li key={note.id} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-black text-white">
                  <NoteIcon id={note.icon} className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="break-words text-sm font-semibold text-slate-950">{note.title}</p>
                  {note.detail && <p className="mt-0.5 whitespace-pre-wrap break-words text-sm text-slate-600">{note.detail}</p>}
                  {(note.calendar_type === "lunar" || note.repeat_yearly) && (
                    <p className="mt-1 text-xs text-slate-400">
                      {note.calendar_type === "lunar" ? `Theo âm lịch ${note.lunar_day}/${note.lunar_month}${note.lunar_leap ? " nhuận" : ""}` : "Theo dương lịch"}
                      {note.repeat_yearly ? " · lặp lại hằng năm" : ""}
                    </p>
                  )}
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
              <input
                id="cal-title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!iconTouched) setIcon(guessNoteIcon(e.target.value));
                }} maxLength={120} placeholder="Ví dụ: Sinh nhật bố, Ngày giỗ, Hạn nộp…"
                className={inputClass}
              />
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium text-slate-700">
                Biểu tượng{icon ? <span className="font-normal text-slate-500"> · {noteIconLabel(icon)}</span> : null}
              </p>
              <div role="group" aria-label="Chọn biểu tượng" className="grid grid-cols-6 gap-1.5">
                {NOTE_ICONS.map(({ id, label, Icon }) => {
                  const on = icon === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      title={label}
                      aria-label={label}
                      aria-pressed={on}
                      onClick={() => {
                        setIconTouched(true);
                        setIcon(on ? null : id);
                      }}
                      className={`grid h-10 place-items-center rounded-lg border transition active:scale-90 ${
                        on ? "border-black bg-black text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-900 hover:text-slate-900"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label htmlFor="cal-detail" className="mb-1.5 block text-sm font-medium text-slate-700">
                Chi tiết (không bắt buộc)
              </label>
              <textarea id="cal-detail" value={detail} onChange={(e) => setDetail(e.target.value)} maxLength={1000} rows={3} className={inputClass} />
            </div>
            <div>
              <p className="mb-1.5 text-sm font-medium text-slate-700">Ghi chú theo lịch nào?</p>
              <div role="group" aria-label="Loại lịch" className="grid grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-white p-1">
                {([
                  ["solar", "Dương lịch"],
                  ["lunar", "Âm lịch"],
                ] as const).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={calType === value}
                    onClick={() => switchType(value)}
                    className={`rounded-lg py-2 text-sm font-medium transition ${calType === value ? "bg-black text-white" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {calType === "solar" ? (
              <div>
                <label htmlFor="cal-date" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Ngày (dương lịch)
                </label>
                <input id="cal-date" type="date" value={noteDate} onChange={(e) => setNoteDate(e.target.value)} className={inputClass} />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex flex-wrap items-end gap-3">
                  <div className="w-24">
                    <label htmlFor="cal-lday" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Ngày âm
                    </label>
                    <select id="cal-lday" value={lunarDay} onChange={(e) => setLunarDay(Number(e.target.value))} className={inputClass}>
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <label htmlFor="cal-lmonth" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Tháng âm
                    </label>
                    <select id="cal-lmonth" value={lunarMonth} onChange={(e) => setLunarMonth(Number(e.target.value))} className={inputClass}>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  {!repeat && (
                    <>
                      <div className="w-28">
                        <label htmlFor="cal-lyear" className="mb-1.5 block text-sm font-medium text-slate-700">
                          Năm âm
                        </label>
                        <input
                          id="cal-lyear"
                          type="number"
                          min={1900}
                          max={2100}
                          value={lunarYear}
                          onChange={(e) => setLunarYear(Math.min(2100, Math.max(1900, Number(e.target.value) || lunarYear)))}
                          className={inputClass}
                        />
                      </div>
                      <label className="flex items-center gap-2 pb-2.5 text-sm text-slate-700">
                        <input type="checkbox" checked={lunarLeap} onChange={(e) => setLunarLeap(e.target.checked)} className="h-4 w-4 accent-black" />
                        Tháng nhuận
                      </label>
                    </>
                  )}
                </div>
                {lunarSolar && (
                  <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm">
                    <p className="text-xs font-medium text-slate-500">{repeat ? "Mỗi năm rơi vào ngày dương khác nhau:" : "Ứng với ngày dương:"}</p>
                    <ul className="mt-1.5 space-y-1">
                      {lunarSolar.map((row) => (
                        <li key={row.year} className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="text-slate-500">Năm {yearName(row.year)}</span>
                          <span className="font-semibold text-slate-950">
                            {row.key ? viDate(row.key) : "Không có ngày này"}
                            {row.adjusted ? <span className="font-normal text-slate-400"> · tháng thiếu, tính ngày 29</span> : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={repeat} onChange={(e) => setRepeat(e.target.checked)} className="h-4 w-4 accent-black" />
              Lặp lại hằng năm {calType === "lunar" ? "(theo ngày âm)" : "(theo ngày dương)"}
            </label>
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
