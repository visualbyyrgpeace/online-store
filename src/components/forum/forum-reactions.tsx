"use client";

import { useEffect, useRef, useState } from "react";
import { ForumAvatar } from "@/components/forum/forum-avatar";
import { ReactionGlyph } from "@/components/forum/forum-icons";
import { ErrorState } from "@/components/ui/states";
import { Modal } from "@/components/utilities/modal";
import { useQuery } from "@/hooks/use-query";
import { REACTIONS, reactionOf } from "@/lib/forum-reactions";
import { listForumReactors, reactForum, type ForumReactor } from "@/services/forum-service";

type Counts = Record<string, number>;
type Target = "post" | "comment";

/** Cập nhật số đếm tại chỗ (hiện ngay, không chờ máy chủ). */
function shift(counts: Counts, prev: string | null, next: string | null): Counts {
  const out: Counts = { ...counts };
  if (prev) out[prev] = Math.max(0, (out[prev] ?? 0) - 1);
  if (next) out[next] = (out[next] ?? 0) + 1;
  for (const key of Object.keys(out)) {
    if (!out[key]) delete out[key];
  }
  return out;
}

/**
 * Thả cảm xúc kiểu Facebook:
 *  - Rê chuột vào nút (hoặc nhấn giữ trên điện thoại) để mở khay 6 cảm xúc.
 *  - Bấm nút: thả "Thích", bấm lại để bỏ. Chọn cảm xúc khác thì đổi.
 *  - Bấm vào cụm icon + số đếm để xem ai đã thả.
 */
export function ReactionBar({
  target,
  id,
  reactions,
  mine,
  disabled = false,
  compact = false,
}: {
  target: Target;
  id: string;
  reactions: Counts;
  mine: string | null;
  disabled?: boolean;
  compact?: boolean;
}) {
  const [counts, setCounts] = useState<Counts>(reactions);
  const [current, setCurrent] = useState<string | null>(mine);
  const [open, setOpen] = useState(false);
  const [showWho, setShowWho] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const longPress = useRef(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  function clearTimers() {
    if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }

  function scheduleOpen(delay: number) {
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpen(true), delay);
  }

  function scheduleClose() {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(false), 350);
  }

  async function choose(next: string | null) {
    if (disabled) return;
    const prev = current;
    clearTimers();
    setOpen(false);
    setCurrent(next);
    setCounts((c) => shift(c, prev, next));
    try {
      const result = await reactForum(target, id, next);
      setCounts(result.reactions);
      setCurrent(result.my_reaction);
    } catch (err) {
      console.error(err);
      setCurrent(prev);
      setCounts((c) => shift(c, next, prev));
    }
  }

  function onButtonClick() {
    if (longPress.current) {
      longPress.current = false;
      return;
    }
    void choose(current ? null : "like");
  }

  const active = current ? reactionOf(current) : null;
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  const top = REACTIONS.filter((item) => (counts[item.kind] ?? 0) > 0)
    .sort((a, b) => (counts[b.kind] ?? 0) - (counts[a.kind] ?? 0))
    .slice(0, 3);
  const iconSize = compact ? "h-4 w-4" : "h-5 w-5";

  return (
    <>
      <div
        ref={wrapRef}
        className="relative flex items-center gap-1"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse" && !disabled) scheduleOpen(250);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") scheduleClose();
        }}
      >
        {open && (
          <div className="absolute bottom-full left-0 z-20 pb-2">
            <div role="menu" className="flex gap-0.5 rounded-full border border-slate-200 bg-white p-1.5 shadow-xl">
              {REACTIONS.map((item) => (
                <button
                  key={item.kind}
                  type="button"
                  role="menuitem"
                  aria-label={item.label}
                  title={item.label}
                  onClick={() => void choose(current === item.kind ? null : item.kind)}
                  className={`grid place-items-center rounded-full p-1.5 transition duration-150 hover:-translate-y-1 hover:scale-125 ${
                    current === item.kind ? "bg-slate-100" : ""
                  }`}
                >
                  <ReactionGlyph kind={item.kind} className={`${compact ? "h-6 w-6" : "h-7 w-7"} ${item.color}`} />
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          disabled={disabled}
          onClick={onButtonClick}
          onContextMenu={(e) => e.preventDefault()}
          onPointerDown={(e) => {
            if (e.pointerType === "mouse" || disabled) return;
            longPress.current = false;
            clearTimers();
            openTimer.current = window.setTimeout(() => {
              longPress.current = true;
              setOpen(true);
            }, 400);
          }}
          onPointerUp={() => {
            if (openTimer.current !== null) window.clearTimeout(openTimer.current);
            openTimer.current = null;
          }}
          onPointerCancel={() => {
            if (openTimer.current !== null) window.clearTimeout(openTimer.current);
            openTimer.current = null;
          }}
          className={`inline-flex select-none items-center gap-1.5 rounded-full font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 ${
            compact ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"
          } ${active ? active.color : "text-slate-500"}`}
        >
          <ReactionGlyph kind={active ? active.kind : "like"} className={iconSize} />
          {active ? active.label : "Thích"}
        </button>

        {total > 0 && (
          <button
            type="button"
            onClick={() => setShowWho(true)}
            aria-label="Xem ai đã thả cảm xúc"
            className={`inline-flex items-center gap-1.5 rounded-full px-1.5 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            <span className="flex -space-x-1.5">
              {top.map((item) => (
                <span key={item.kind} className={`grid h-5 w-5 place-items-center rounded-full text-white ring-2 ring-white ${item.bg}`}>
                  <ReactionGlyph kind={item.kind} className="h-3 w-3" />
                </span>
              ))}
            </span>
            {total}
          </button>
        )}
      </div>

      <Modal open={showWho} onClose={() => setShowWho(false)} title="Cảm xúc">
        <ReactorList target={target} id={id} />
      </Modal>
    </>
  );
}

function ReactorList({ target, id }: { target: Target; id: string }) {
  const state = useQuery<ForumReactor[]>(`forum-reactors:${target}:${id}`, () => listForumReactors(target, id));
  const [filter, setFilter] = useState("all");

  if (state.status === "loading") return <div className="h-40 animate-pulse rounded-2xl bg-slate-100" aria-busy="true" />;
  if (state.status === "error") return <ErrorState />;

  const all = state.data;
  if (all.length === 0) return <p className="py-8 text-center text-sm text-slate-500">Chưa có ai thả cảm xúc</p>;

  const tabs = REACTIONS.map((item) => ({ item, n: all.filter((u) => u.kind === item.kind).length })).filter((t) => t.n > 0);
  const shown = filter === "all" ? all : all.filter((u) => u.kind === filter);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
            filter === "all" ? "bg-black text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Tất cả {all.length}
        </button>
        {tabs.map(({ item, n }) => (
          <button
            key={item.kind}
            type="button"
            onClick={() => setFilter(item.kind)}
            aria-label={item.label}
            title={item.label}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition ${
              filter === item.kind ? "bg-black text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <ReactionGlyph kind={item.kind} className={`h-4 w-4 ${filter === item.kind ? "text-white" : item.color}`} />
            {n}
          </button>
        ))}
      </div>

      <ul className="max-h-[50vh] divide-y divide-slate-100 overflow-y-auto">
        {shown.map((user, index) => {
          const meta = reactionOf(user.kind);
          return (
            <li key={`${user.display_name}-${index}`} className="flex items-center gap-3 py-2.5">
              <span className="relative shrink-0">
                <ForumAvatar avatar={user.avatar} size={44} />
                {meta && (
                  <span className={`absolute -bottom-1 -right-1 grid h-[22px] w-[22px] place-items-center rounded-full text-white ring-2 ring-white ${meta.bg}`}>
                    <ReactionGlyph kind={user.kind} className="h-3 w-3" />
                  </span>
                )}
              </span>
              <p className="min-w-0 flex-1 truncate font-medium text-slate-900">{user.display_name}</p>
              {user.is_me && <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">Bạn</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
