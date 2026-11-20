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

const LABELS: Record<ReactionKey, string> = {
  like: "Thích",
  love: "Yêu thích",
  haha: "Haha",
  wow: "Wow",
  sad: "Buồn",
  angry: "Phẫn nộ",
  fire: "Cháy",
  party: "Ăn mừng",
  cool: "Ngầu",
  star: "Tuyệt vời",
  skull: "Xỉu",
  watch: "Hóng",
};

/** Mỗi icon một màu nét riêng. */
const COLORS: Record<ReactionKey, string> = {
  like: "#3b82f6",
  love: "#ec4899",
  haha: "#f59e0b",
  wow: "#14b8a6",
  sad: "#0ea5e9",
  angry: "#ef4444",
  fire: "#f97316",
  party: "#a855f7",
  cool: "#6366f1",
  star: "#eab308",
  skull: "#64748b",
  watch: "#22c55e",
};

const dot = (x: number, y: number) => <circle cx={x} cy={y} r={0.95} fill="currentColor" stroke="none" />;

/** Icon nét mảnh (lưới 24, nét 1.7, đầu nét tròn), cùng kiểu với bộ icon của web. */
const ICONS: Record<ReactionKey, React.ReactNode> = {
  like: (
    <>
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </>
  ),
  love: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  haha: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z" />
      {dot(9, 9)}
      {dot(15, 9)}
    </>
  ),
  wow: (
    <>
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="16" rx="2" ry="2.6" />
      <path d="M7.4 7q1.6-1.3 3.2 0M13.4 7q1.6-1.3 3.2 0" />
      {dot(9, 10.2)}
      {dot(15, 10.2)}
    </>
  ),
  sad: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      {dot(9, 9)}
      {dot(15, 9)}
    </>
  ),
  angry: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2M7.5 8 10 9M14 9l2.5-1" />
      {dot(9, 12)}
      {dot(15, 12)}
    </>
  ),
  fire: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />,
  party: (
    <>
      <path d="M5.8 11.3 2 22l10.7-3.79" />
      <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
      <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
      <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11-.11.7-.72 1.22-1.43 1.22H17" />
      <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" />
      <path d="M4 3h.01M22 8h.01M15 2h.01M22 20h.01" />
    </>
  ),
  cool: (
    <>
      <circle cx="12" cy="12" r="10" />
      <rect x="5.4" y="8.6" width="5.6" height="3.8" rx="1.7" />
      <rect x="13" y="8.6" width="5.6" height="3.8" rx="1.7" />
      <path d="M11 10.2h2M9 16s1 1.7 3 1.7 3-1.7 3-1.7" />
    </>
  ),
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  skull: (
    <>
      <path d="M6.5 15.2V18a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-2.8a7.5 7.5 0 1 0-11 0z" />
      <path d="M10.5 19v2M13.5 19v2" />
      <circle cx="9.3" cy="12" r="1.2" />
      <circle cx="14.7" cy="12" r="1.2" />
    </>
  ),
  watch: (
    <>
      <path d="M2.5 12C3.5 10.5 7 5.5 12 5.5s8.5 5 9.5 6.5c-1 1.5-4.5 6.5-9.5 6.5S3.5 13.5 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
};

/** Icon thả (nét line, đúng màu của nó). */
export function ReactionFace({ kind, size = 24 }: { kind: ReactionKey; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ color: COLORS[kind] }}
      className="block shrink-0"
    >
      {ICONS[kind]}
    </svg>
  );
}

const tint = (kind: ReactionKey, percent = 14) => `color-mix(in srgb, ${COLORS[kind]} ${percent}%, white)`;

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
  const badge = size === "sm" ? "h-[18px] w-[18px]" : "h-[22px] w-[22px]";
  return (
    <span className={`inline-flex items-center gap-1.5 pr-2 tabular-nums text-slate-600 ${size === "sm" ? "text-xs" : "text-sm"}`}>
      <span className="inline-flex items-center">
        {entries.slice(0, 3).map(([k], index) => (
          <span
            key={k}
            style={{ zIndex: 3 - index, backgroundColor: tint(k, 16) }}
            className={`-ml-1.5 grid ${badge} place-items-center rounded-full ring-2 ring-white first:ml-0`}
          >
            <ReactionFace kind={k} size={size === "sm" ? 11 : 14} />
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
        style={{
          WebkitTouchCallout: "none",
          touchAction: "manipulation",
          backgroundColor: state.mine ? tint(state.mine, 14) : undefined,
        }}
        className={`grid ${trigger} select-none place-items-center rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-50 ${
          state.mine ? "" : "text-slate-500 hover:bg-slate-100 hover:text-black"
        }`}
      >
        {state.mine ? (
          <span key={state.mine} className="reaction-pop inline-flex">
            <ReactionFace kind={state.mine} size={triggerFace - 3} />
          </span>
        ) : (
          <SmilePlusIcon className={size === "sm" ? "h-[18px] w-[18px]" : "h-5 w-5"} />
        )}
      </button>

      <Summary state={state} size={size} />

      {open && (
        <div
          role="group"
          style={{ gridTemplateColumns: "repeat(6, 2.5rem)" }}
          className="absolute bottom-full left-0 z-30 mb-1.5 grid w-max gap-0.5 rounded-3xl border border-slate-200 bg-white p-2 shadow-xl"
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
              style={{ "--i": index, "--c": COLORS[key], backgroundColor: state.mine === key ? tint(key, 16) : undefined } as React.CSSProperties}
              className="reaction-in reaction-tray-btn grid h-10 w-10 shrink-0 origin-bottom place-items-center rounded-full transition duration-150 hover:-translate-y-1 hover:scale-[1.22] focus-visible:-translate-y-1 focus-visible:scale-[1.22] focus-visible:outline-none"
            >
              <ReactionFace kind={key} size={24} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
