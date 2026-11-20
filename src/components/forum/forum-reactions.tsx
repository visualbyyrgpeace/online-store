"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  REACTION_KEYS,
  forumErrorMessage,
  getForumReactions,
  setForumReaction,
  type ReactionKey,
  type ReactionKind,
  type ReactionState,
} from "@/services/forum-service";

const EMPTY: ReactionState = { counts: {}, mine: null };
const INK = "#4a2f0b";

const LABELS: Record<ReactionKey, string> = {
  like: "Thích",
  love: "Yêu thích",
  haha: "Haha",
  wow: "Wow",
  sad: "Buồn",
  angry: "Phẫn nộ",
};

/** Mặt icon vẽ phẳng, một bộ màu thống nhất. */
export function ReactionFace({ kind, size = 24 }: { kind: ReactionKey; size?: number }) {
  const stroke = { stroke: INK, strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" className="block shrink-0">
      {kind === "like" && (
        <>
          <circle cx="16" cy="16" r="16" fill="#3b82f6" />
          <g transform="translate(7.6 7.4) scale(.7)" fill="#fff" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M7 10v12H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zM7 10l4.2-8a3.1 3.1 0 0 1 3.8 3.9L14 10h5.8a2 2 0 0 1 1.9 2.6l-2.3 8a2 2 0 0 1-1.9 1.4H7z" />
          </g>
        </>
      )}
      {kind === "love" && (
        <>
          <circle cx="16" cy="16" r="16" fill="#ef4444" />
          <path d="M16 23.4s-6.8-4.1-6.8-8.9A3.9 3.9 0 0 1 16 11.8a3.9 3.9 0 0 1 6.8 2.7c0 4.8-6.8 8.9-6.8 8.9z" fill="#fff" />
        </>
      )}
      {kind === "haha" && (
        <>
          <circle cx="16" cy="16" r="16" fill="#fbbf24" />
          <path d="M8.8 13.4q2-2.8 4 0M19.2 13.4q2-2.8 4 0" {...stroke} />
          <path d="M8.6 17.4h14.8a7.4 7.4 0 0 1-14.8 0z" fill={INK} />
          <ellipse cx="16" cy="23" rx="3.4" ry="1.5" fill="#f87171" />
        </>
      )}
      {kind === "wow" && (
        <>
          <circle cx="16" cy="16" r="16" fill="#fbbf24" />
          <path d="M8.2 9.8q2.6-2.2 5.2 0M18.6 9.8q2.6-2.2 5.2 0" {...stroke} strokeWidth={1.6} />
          <circle cx="11" cy="14.2" r="1.8" fill={INK} />
          <circle cx="21" cy="14.2" r="1.8" fill={INK} />
          <ellipse cx="16" cy="22" rx="3" ry="3.8" fill={INK} />
        </>
      )}
      {kind === "sad" && (
        <>
          <circle cx="16" cy="16" r="16" fill="#fbbf24" />
          <path d="M8.4 11.2l4.2-1.8M23.6 11.2l-4.2-1.8" {...stroke} strokeWidth={1.6} />
          <circle cx="11.2" cy="14.6" r="1.7" fill={INK} />
          <circle cx="20.8" cy="14.6" r="1.7" fill={INK} />
          <path d="M11 22.8q5-4.6 10 0" {...stroke} />
          <path d="M24.4 17.4q1.8 2.5 0 3.6q-1.8-1.1 0-3.6z" fill="#60a5fa" />
        </>
      )}
      {kind === "angry" && (
        <>
          <circle cx="16" cy="16" r="16" fill="#f97316" />
          <path d="M8 11.4l5.4 2.4M24 11.4l-5.4 2.4" {...stroke} strokeWidth={2.1} />
          <circle cx="11.6" cy="16.6" r="1.6" fill={INK} />
          <circle cx="20.4" cy="16.6" r="1.6" fill={INK} />
          <path d="M10.6 23.6q5.4-4 10.8 0" {...stroke} />
        </>
      )}
    </svg>
  );
}

function SmilePlusIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M22 11v1a10 10 0 1 1-9-10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9h.01M15 9h.01M16 5h6M19 2v6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------------------------
// Dữ liệu: tải icon theo lô, cập nhật ngay trên màn hình rồi mới gửi lên máy chủ.

function applyReaction(state: ReactionState, next: ReactionKey | null): ReactionState {
  const counts = { ...state.counts };
  if (state.mine) {
    const left = (counts[state.mine] ?? 1) - 1;
    if (left > 0) counts[state.mine] = left;
    else delete counts[state.mine];
  }
  if (next) counts[next] = (counts[next] ?? 0) + 1;
  return { counts, mine: next };
}

export function useReactions(kind: ReactionKind, ids: string[], onError?: (message: string) => void) {
  const [map, setMap] = useState<Record<string, ReactionState>>({});
  const requested = useRef<Set<string>>(new Set());
  const latest = useRef(map);
  const errorRef = useRef(onError);
  const key = ids.join(",");

  useEffect(() => {
    latest.current = map;
    errorRef.current = onError;
  });

  useEffect(() => {
    const missing = ids.filter((id) => !requested.current.has(id));
    if (missing.length === 0) return;
    missing.forEach((id) => requested.current.add(id));
    for (let i = 0; i < missing.length; i += 100) {
      const chunk = missing.slice(i, i + 100);
      getForumReactions(kind, chunk)
        .then((data) => setMap((current) => ({ ...data, ...current })))
        .catch((err) => {
          console.error(err);
          chunk.forEach((id) => requested.current.delete(id));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, key]);

  const react = useCallback(
    async (id: string, next: ReactionKey | null) => {
      const before = latest.current[id] ?? EMPTY;
      setMap((current) => ({ ...current, [id]: applyReaction(current[id] ?? EMPTY, next) }));
      try {
        await setForumReaction(kind, id, next);
      } catch (err) {
        console.error(err);
        setMap((current) => ({ ...current, [id]: before }));
        errorRef.current?.(forumErrorMessage(err));
      }
    },
    [kind],
  );

  const get = useCallback((id: string): ReactionState => map[id] ?? EMPTY, [map]);
  return { get, react };
}

// ---------------------------------------------------------------------------------------------
// Giao diện

/** Các icon đang được thả nhiều nhất, xếp chồng nhẹ, kèm tổng số. */
function Summary({ state, size }: { state: ReactionState; size: "md" | "sm" }) {
  const entries = REACTION_KEYS.map((k) => [k, state.counts[k] ?? 0] as const)
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, n]) => sum + n, 0);
  if (total === 0) return null;
  const face = size === "sm" ? 15 : 19;
  return (
    <span className={`inline-flex items-center gap-1.5 pr-2 tabular-nums text-slate-600 ${size === "sm" ? "text-xs" : "text-sm"}`}>
      <span className="inline-flex items-center">
        {entries.slice(0, 3).map(([k], index) => (
          <span key={k} style={{ zIndex: 3 - index }} className="-ml-1 inline-flex rounded-full bg-white p-[1.5px] first:ml-0">
            <ReactionFace kind={k} size={face} />
          </span>
        ))}
      </span>
      {total}
    </span>
  );
}

export function ReactionBar({
  state,
  onReact,
  disabled = false,
  size = "md",
}: {
  state: ReactionState;
  onReact: (next: ReactionKey | null) => void;
  disabled?: boolean;
  size?: "md" | "sm";
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const pressTimer = useRef<number | null>(null);
  const longPressed = useRef(false);

  const clearTimers = () => {
    for (const ref of [openTimer, closeTimer, pressTimer]) {
      if (ref.current) window.clearTimeout(ref.current);
      ref.current = null;
    }
  };

  useEffect(() => clearTimers, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function hoverIn(event: ReactPointerEvent) {
    if (disabled || event.pointerType !== "mouse") return;
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpen(true), 320);
  }

  function hoverOut(event: ReactPointerEvent) {
    if (event.pointerType !== "mouse") return;
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpen(false), 260);
  }

  function pressStart(event: ReactPointerEvent) {
    if (disabled || event.pointerType === "mouse") return;
    longPressed.current = false;
    pressTimer.current = window.setTimeout(() => {
      longPressed.current = true;
      setOpen(true);
    }, 380);
  }

  function pressEnd() {
    if (pressTimer.current) window.clearTimeout(pressTimer.current);
    pressTimer.current = null;
  }

  function quickToggle() {
    if (disabled) return;
    if (longPressed.current) {
      longPressed.current = false;
      return;
    }
    setOpen(false);
    onReact(state.mine ? null : "like");
  }

  function choose(key: ReactionKey) {
    setOpen(false);
    onReact(state.mine === key ? null : key);
  }

  const trigger = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const triggerFace = size === "sm" ? 18 : 24;

  return (
    <div ref={root} className="relative flex items-center" onPointerEnter={hoverIn} onPointerLeave={hoverOut}>
      <button
        type="button"
        disabled={disabled}
        aria-label={state.mine ? LABELS[state.mine] : LABELS.like}
        aria-pressed={state.mine !== null}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={quickToggle}
        onPointerDown={pressStart}
        onPointerUp={pressEnd}
        onPointerCancel={pressEnd}
        onContextMenu={(event) => event.preventDefault()}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp" || event.key === "ArrowRight") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        style={{ WebkitTouchCallout: "none", touchAction: "manipulation" }}
        className={`grid ${trigger} select-none place-items-center rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-50 ${
          state.mine ? "hover:bg-slate-100" : "text-slate-500 hover:bg-slate-100 hover:text-black"
        }`}
      >
        {state.mine ? (
          <span key={state.mine} className="reaction-pop inline-flex">
            <ReactionFace kind={state.mine} size={triggerFace} />
          </span>
        ) : (
          <SmilePlusIcon className={size === "sm" ? "h-[18px] w-[18px]" : "h-5 w-5"} />
        )}
      </button>

      <Summary state={state} size={size} />

      {open && (
        <div
          role="group"
          className="absolute bottom-full left-0 z-30 mb-1.5 flex items-center gap-0.5 rounded-full border border-slate-200 bg-white p-1.5 shadow-xl"
          onPointerEnter={() => {
            if (closeTimer.current) window.clearTimeout(closeTimer.current);
          }}
        >
          {REACTION_KEYS.map((key, index) => (
            <button
              key={key}
              type="button"
              aria-label={LABELS[key]}
              aria-pressed={state.mine === key}
              onClick={() => choose(key)}
              style={{ "--i": index } as React.CSSProperties}
              className={`reaction-in grid h-10 w-10 origin-bottom place-items-center rounded-full transition duration-150 hover:-translate-y-1.5 hover:scale-[1.35] focus-visible:-translate-y-1.5 focus-visible:scale-[1.35] focus-visible:outline-none ${
                state.mine === key ? "bg-slate-100" : ""
              }`}
            >
              <ReactionFace kind={key} size={30} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
