"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ForumAvatar } from "@/components/forum/forum-avatar";
import { ForumPostCard } from "@/components/forum/forum-post-card";
import { FormMessage } from "@/components/ui/form";
import { ErrorState } from "@/components/ui/states";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/utilities/tool-icons";
import { useForumDayPosts } from "@/hooks/use-forum-day-posts";
import { MONTH_NAMES, WEEK_HEAD, dayKey, formatDayLong, parseDayKey } from "@/lib/forum-days";
import { deleteForumPost, forumErrorMessage, listForumCalendar, type ForumDayCell, type ForumPostItem } from "@/services/forum-service";
import { useQuery } from "@/hooks/use-query";

/**
 * Lịch kiểu Locket: mỗi ngày có bài là một ô vuông mang avatar của bài mới nhất trong ngày
 * (nhiều bài thì có số đếm). Bấm ô để mở lại các bài của ngày đó.
 */
export function ForumCalendar({
  today,
  mine,
  version,
  activeDay,
  onPick,
}: {
  today: string;
  mine: boolean;
  version: number;
  activeDay: string | null;
  onPick: (day: string) => void;
}) {
  const { ty, tm } = useMemo(() => {
    const date = parseDayKey(today);
    return { ty: date.getFullYear(), tm: date.getMonth() };
  }, [today]);
  const [view, setView] = useState({ y: ty, m: tm, dir: 0 });
  const state = useQuery<ForumDayCell[]>(`forum-cal:${view.y}-${view.m}:${mine}:${version}`, () => listForumCalendar(view.y, view.m, mine));

  const cells = state.status === "success" ? state.data : null;
  const byDay = useMemo(() => new Map((cells ?? []).map((cell) => [cell.day, cell])), [cells]);
  const totalPosts = (cells ?? []).reduce((sum, cell) => sum + cell.count, 0);

  const atCurrent = view.y > ty || (view.y === ty && view.m >= tm);
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const blanks = (new Date(view.y, view.m, 1).getDay() + 6) % 7; // tuần bắt đầu từ thứ hai

  function go(delta: number) {
    setView((v) => {
      const next = new Date(v.y, v.m + delta, 1);
      return { y: next.getFullYear(), m: next.getMonth(), dir: delta };
    });
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-950">
            {MONTH_NAMES[view.m]}, {view.y}
          </p>
          <p className="h-4 text-[11px] text-slate-400">
            {cells === null ? "" : cells.length === 0 ? "Chưa có bài nào" : `${cells.length} ngày · ${totalPosts} bài`}
          </p>
        </div>
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Tháng trước"
            className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 active:scale-90"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={atCurrent}
            aria-label="Tháng sau"
            className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 active:scale-90 disabled:opacity-30 disabled:hover:bg-slate-100 disabled:active:scale-100"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1.5 text-center text-[10px] font-medium text-slate-400">
        {WEEK_HEAD.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      {state.status === "error" && <p className="py-6 text-center text-xs text-red-700">Không tải được lịch.</p>}

      <div key={`${view.y}-${view.m}`} className={view.dir > 0 ? "cal-next" : view.dir < 0 ? "cal-prev" : ""}>
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: blanks }, (_, i) => (
            <span key={`b${i}`} aria-hidden="true" />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const d = i + 1;
            const key = dayKey(view.y, view.m, d);
            return (
              <DayCell
                key={key}
                day={d}
                dayKey={key}
                info={byDay.get(key)}
                isToday={key === today}
                isFuture={key > today}
                loading={state.status === "loading"}
                active={key === activeDay}
                onPick={onPick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DayCell({
  day,
  dayKey: key,
  info,
  isToday,
  isFuture,
  loading,
  active,
  onPick,
}: {
  day: number;
  dayKey: string;
  info: ForumDayCell | undefined;
  isToday: boolean;
  isFuture: boolean;
  loading: boolean;
  active: boolean;
  onPick: (day: string) => void;
}) {
  if (info) {
    return (
      <button
        type="button"
        onClick={() => onPick(key)}
        aria-label={`${formatDayLong(key)}, ${info.count} bài`}
        title={`${formatDayLong(key)} · ${info.count} bài`}
        className={`relative aspect-square rounded-2xl outline-none transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 active:scale-90 ${
          active ? "ring-2 ring-slate-900 ring-offset-2" : isToday ? "today-ring ring-2 ring-black ring-offset-1" : ""
        }`}
      >
        <span className="cal-cell block h-full w-full" style={{ "--i": day } as CSSProperties}>
          <ForumAvatar avatar={info.avatar} size="full" shape="squircle" />
        </span>
        <span className="absolute left-1 top-1 rounded-md bg-black/55 px-1 text-[9px] font-semibold leading-[14px] text-white backdrop-blur-sm">{day}</span>
        {info.count > 1 && (
          <span className="absolute -bottom-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-black px-1 text-[9px] font-semibold leading-none text-white ring-2 ring-white">
            {info.count > 99 ? "99+" : info.count}
          </span>
        )}
      </button>
    );
  }

  const tone = isToday ? "today-ring bg-black font-semibold text-white" : isFuture ? "text-slate-300" : loading ? "shimmer text-transparent" : "bg-slate-50 text-slate-400";
  return (
    <span aria-label={isToday ? `Hôm nay, ${day}` : undefined} className={`grid aspect-square place-items-center rounded-2xl text-[11px] font-medium ${tone}`}>
      {day}
    </span>
  );
}

/** Bảng xem lại các bài của một ngày trước đó. */
export function DaySheet({
  day,
  mine,
  blocked,
  onClose,
  onChanged,
}: {
  day: string;
  mine: boolean;
  blocked: boolean;
  onClose: () => void;
  onChanged: () => void;
}) {
  const [version, setVersion] = useState(0);
  const [closing, setClosing] = useState(false);
  const list = useForumDayPosts(day, mine, version);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<() => void>(() => {});

  useEffect(() => {
    closeRef.current = () => {
      if (closing) return;
      setClosing(true);
      window.setTimeout(onClose, 190);
    };
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus?.();
    };
  }, []);

  async function remove(post: ForumPostItem) {
    if (!window.confirm("Xóa bài viết này?")) return;
    list.setError(null);
    try {
      await deleteForumPost(post.id);
      setVersion((v) => v + 1);
      onChanged();
    } catch (err) {
      console.error(err);
      list.setError(forumErrorMessage(err));
    }
  }

  return (
    <div
      className={`${closing ? "backdrop-out" : "backdrop-in"} fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-[2px] sm:items-center sm:p-6`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeRef.current();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={formatDayLong(day)}
        tabIndex={-1}
        className={`${closing ? "sheet-out" : "sheet-in"} flex max-h-[86vh] w-full flex-col overflow-hidden rounded-t-[28px] bg-slate-50 shadow-2xl outline-none sm:max-w-md sm:rounded-3xl`}
      >
        <div aria-hidden="true" className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-slate-300 sm:hidden" />
        <div className="flex items-center justify-between gap-3 px-5 pb-2 pt-3 sm:pt-4">
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-slate-950">{formatDayLong(day)}</h2>
            <p className="text-xs text-slate-500">{list.status === "success" ? `${list.items.length}${list.hasMore ? "+" : ""} bài` : "Đang tải…"}</p>
          </div>
          <button
            type="button"
            onClick={() => closeRef.current()}
            aria-label="Đóng"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-slate-500 shadow-sm transition hover:text-slate-900 active:scale-90"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-2.5 overflow-y-auto px-4 pb-5">
          {list.error && <FormMessage kind="error">{list.error}</FormMessage>}
          {list.status === "loading" && [0, 1].map((i) => <div key={i} className="shimmer h-28 rounded-2xl" aria-busy="true" />)}
          {list.status === "error" && <ErrorState />}
          {list.status === "success" && list.items.length === 0 && <p className="py-10 text-center text-sm text-slate-500">Ngày này không có bài nào</p>}
          {list.items.map((post, index) => (
            <ForumPostCard key={post.id} post={post} index={index} blocked={blocked} clock onDelete={remove} />
          ))}
          {list.hasMore && (
            <button
              type="button"
              onClick={() => void list.loadMore()}
              disabled={list.loadingMore}
              className="mx-auto block rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 active:scale-95 disabled:opacity-50"
            >
              {list.loadingMore ? "Đang tải…" : "Xem thêm"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
