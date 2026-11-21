"use client";

import { useRef, useState, type FormEvent } from "react";
import { DaySheet, ForumCalendar } from "@/components/forum/forum-calendar";
import { ForumAvatar } from "@/components/forum/forum-avatar";
import { ForumFrame } from "@/components/forum/forum-frame";
import { SendIcon } from "@/components/forum/forum-icons";
import { ForumPostCard } from "@/components/forum/forum-post-card";
import { FormMessage, inputClass, primaryButton } from "@/components/ui/form";
import { ErrorState } from "@/components/ui/states";
import { Modal } from "@/components/utilities/modal";
import { CalendarIcon, ChevronRightIcon, PlusIcon, RefreshIcon } from "@/components/utilities/tool-icons";
import { useForumDayPosts } from "@/hooks/use-forum-day-posts";
import { dayKeyOf, formatDayLong } from "@/lib/forum-days";
import {
  FORUM_POST_MAX,
  FORUM_TITLE_MAX,
  createForumPost,
  deleteForumPost,
  forumErrorMessage,
  type ForumPostItem,
  type ForumProfile,
} from "@/services/forum-service";

export function ForumHome() {
  return <ForumFrame>{(profile) => <Feed profile={profile} />}</ForumFrame>;
}

const card = "rounded-2xl border border-slate-200/80 bg-white";

/**
 * Trang chủ diễn đàn: chỉ hiện bài của HÔM NAY.
 * Các ngày trước nằm trong lịch (kiểu Locket): bấm một ô để mở lại bài của ngày đó.
 */
function Feed({ profile }: { profile: ForumProfile }) {
  const [today] = useState(() => dayKeyOf(new Date()));
  const [version, setVersion] = useState(0);
  const [mine, setMine] = useState(false);
  const [composing, setComposing] = useState(false);
  const [calOpen, setCalOpen] = useState(false);
  const [openDay, setOpenDay] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const list = useForumDayPosts(today, mine, version);

  const refresh = () => setVersion((v) => v + 1);

  async function remove(post: ForumPostItem) {
    if (!window.confirm("Xóa bài viết này?")) return;
    list.setError(null);
    try {
      await deleteForumPost(post.id);
      refresh();
    } catch (err) {
      console.error(err);
      list.setError(forumErrorMessage(err));
    }
  }

  function pickDay(day: string) {
    if (day === today) feedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    else setOpenDay(day);
  }

  const count = list.status === "success" ? `${list.items.length}${list.hasMore ? "+" : ""} bài` : "";

  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_17.5rem] md:items-start md:gap-6">
      {/* Lịch các ngày trước: thu gọn được trên điện thoại, luôn mở bên phải trên máy tính. */}
      <aside className="md:sticky md:top-[4.5rem] md:col-start-2 md:row-start-1">
        <button
          type="button"
          onClick={() => setCalOpen((v) => !v)}
          aria-expanded={calOpen}
          className={`${card} flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:border-slate-300 active:scale-[.99] md:hidden`}
        >
          <CalendarIcon className="h-[18px] w-[18px] text-slate-500" />
          <span className="flex-1">Xem lại những ngày trước</span>
          <ChevronRightIcon className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${calOpen ? "rotate-90" : ""}`} />
        </button>
        <div
          className={`grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-out md:visible md:grid-rows-[1fr] md:opacity-100 ${
            calOpen ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className={`${card} mt-2 p-3 md:mt-0`}>
              <ForumCalendar today={today} mine={mine} version={version} activeDay={openDay} onPick={pickDay} />
            </div>
          </div>
        </div>
      </aside>

      <div ref={feedRef} className="min-w-0 scroll-mt-20 space-y-3 md:col-start-1 md:row-start-1">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold leading-tight tracking-tight text-slate-950">Hôm nay</h2>
            <p className="truncate text-xs text-slate-500">
              {formatDayLong(today)}
              {count && ` · ${count}`}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Segmented value={mine} onChange={setMine} />
            <button
              type="button"
              onClick={refresh}
              aria-label="Làm mới"
              title="Làm mới"
              className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 active:scale-90"
            >
              <RefreshIcon key={version} className={`h-4 w-4 ${version > 0 ? "spin-once" : ""}`} />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setComposing(true)}
          disabled={profile.blocked}
          className={`${card} group flex w-full items-center gap-2.5 p-2 pr-3 text-left transition duration-200 hover:border-slate-300 hover:shadow-[0_8px_28px_-14px_rgba(0,0,0,.22)] active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-50`}
        >
          <ForumAvatar avatar={profile.avatar} size={32} />
          <span className="flex-1 truncate text-sm text-slate-400">Viết bài mới…</span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-90">
            <PlusIcon className="h-4 w-4" />
          </span>
        </button>

        {list.error && <FormMessage kind="error">{list.error}</FormMessage>}

        {list.status === "loading" && (
          <div className="space-y-3" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="shimmer h-[7.5rem] rounded-2xl" />
            ))}
          </div>
        )}
        {list.status === "error" && <ErrorState />}
        {list.status === "success" && list.items.length === 0 && (
          <div className="post-in rounded-2xl border border-dashed border-slate-300 bg-white/60 px-5 py-9 text-center">
            <p className="text-sm font-semibold text-slate-900">{mine ? "Hôm nay bạn chưa đăng bài" : "Hôm nay chưa có bài nào"}</p>
            <p className="mt-1 text-xs text-slate-500">Bài của những ngày trước nằm trong lịch.</p>
            {!profile.blocked && (
              <button
                type="button"
                onClick={() => setComposing(true)}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 active:scale-95"
              >
                <PlusIcon className="h-4 w-4" />
                Viết bài
              </button>
            )}
          </div>
        )}

        {list.items.map((post, index) => (
          <ForumPostCard key={post.id} post={post} index={index} blocked={profile.blocked} onDelete={remove} />
        ))}

        {list.hasMore && (
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={() => void list.loadMore()}
              disabled={list.loadingMore}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 active:scale-95 disabled:opacity-50"
            >
              {list.loadingMore ? "Đang tải…" : "Xem thêm"}
            </button>
          </div>
        )}
      </div>

      <Modal open={composing} onClose={() => setComposing(false)} title="Bài viết mới">
        <ComposeForm
          onPosted={() => {
            setComposing(false);
            refresh();
          }}
        />
      </Modal>

      {openDay && <DaySheet day={openDay} mine={mine} blocked={profile.blocked} onClose={() => setOpenDay(null)} onChanged={refresh} />}
    </div>
  );
}

/** Công tắc Tất cả / Của tôi, nền trượt theo lựa chọn. */
function Segmented({ value, onChange }: { value: boolean; onChange: (mine: boolean) => void }) {
  const tabs = [
    { value: false, label: "Tất cả" },
    { value: true, label: "Của tôi" },
  ];
  return (
    <div role="tablist" className="relative grid h-8 grid-cols-2 rounded-full bg-slate-100 p-0.5 text-xs font-medium">
      <span
        aria-hidden="true"
        className="absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-black shadow-sm transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
        style={{ transform: value ? "translateX(100%)" : "none" }}
      />
      {tabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          role="tab"
          aria-selected={value === tab.value}
          onClick={() => onChange(tab.value)}
          className={`relative z-10 whitespace-nowrap px-3 transition-colors duration-300 ${value === tab.value ? "text-white" : "text-slate-600"}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function ComposeForm({ onPosted }: { onPosted: () => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await createForumPost(title, body);
      onPosted();
    } catch (err) {
      console.error(err);
      setError(forumErrorMessage(err));
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={FORUM_TITLE_MAX}
        placeholder="Tiêu đề"
        aria-label="Tiêu đề"
        autoFocus
        className={inputClass}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={FORUM_POST_MAX}
        rows={6}
        placeholder="Nội dung"
        aria-label="Nội dung"
        className={`${inputClass} resize-y`}
      />
      {error && <FormMessage kind="error">{error}</FormMessage>}
      <button type="submit" disabled={busy || title.trim().length < 3 || !body.trim()} className={`${primaryButton} w-full`}>
        <SendIcon className="h-4 w-4" />
        Đăng bài
      </button>
    </form>
  );
}
