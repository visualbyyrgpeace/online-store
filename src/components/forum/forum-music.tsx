"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ForumAvatar } from "@/components/forum/forum-avatar";
import { CloseIcon, PlusIcon } from "@/components/utilities/tool-icons";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import {
  MUSIC_FALLBACK_TITLE,
  addMusic,
  fetchYouTubeTitle,
  listMusic,
  musicErrorMessage,
  nextMusic,
  parseYouTubeId,
  removeMusic,
  setMusicMeta,
  type MusicTrack,
} from "@/services/forum-music-service";

// ---- Kiểu tối thiểu của YouTube IFrame API ----
type YTPlayer = {
  loadVideoById(options: { videoId: string; startSeconds?: number }): void;
  stopVideo(): void;
  playVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  setVolume(volume: number): void;
  getPlayerState(): number;
  getCurrentTime(): number;
  getDuration(): number;
  getVideoData(): { title?: string };
  destroy(): void;
};
type YTNamespace = {
  Player: new (
    element: HTMLElement,
    options: {
      width: number;
      height: number;
      host?: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (event: { data: number }) => void;
        onError?: (event: { data: number }) => void;
      };
    },
  ) => YTPlayer;
};
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;
function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise<YTNamespace>((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        if (window.YT) resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        apiPromise = null;
        reject(new Error("youtube_api"));
      };
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

const SOUND_KEY = "forum-music-sound";
const POLL_MS = 5000;
const PLAYING = 1;
const PAUSED = 2;
const ENDED = 0;

type MusicState = {
  ready: boolean;
  current: MusicTrack | null;
  queue: MusicTrack[];
  muted: boolean;
  toggleMute: () => void;
  positionMs: () => number;
  add: (link: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
};
const MusicContext = createContext<MusicState | null>(null);

/**
 * Giữ trình phát ở cấp layout của /forum nên nhạc không bị ngắt khi chuyển giữa trang chủ và bài viết.
 * Cách đồng bộ: server lưu giờ bắt đầu của bài đang phát; mỗi máy tự tính vị trí hiện tại và tua về cho khớp.
 * Trình phát luôn khởi động ở chế độ tắt tiếng (trình duyệt cho phép), bấm nút loa để nghe.
 */
export function ForumMusicProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [ready, setReady] = useState(false);
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [muted, setMuted] = useState(true);

  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const playerReadyRef = useRef(false);
  const loadedRef = useRef<string | null>(null); // id bài đang nạp trong trình phát
  const metaSentRef = useRef<string | null>(null);
  const tracksRef = useRef<MusicTrack[]>([]);
  const signatureRef = useRef("");
  const anchorRef = useRef({ at: 0, elapsed: 0 });
  const mutedRef = useRef(true);
  const channelRef = useRef<ReturnType<ReturnType<typeof createClient>["channel"]> | null>(null);
  const refreshRef = useRef<() => Promise<void>>(async () => {});

  const positionMs = useCallback(() => {
    if (!tracksRef.current.some((t) => t.is_current)) return 0;
    return Math.max(0, anchorRef.current.elapsed + (Date.now() - anchorRef.current.at));
  }, []);

  const broadcast = useCallback(() => {
    try {
      void channelRef.current?.send({ type: "broadcast", event: "sync", payload: {} });
    } catch {
      /* đồng bộ tức thì chỉ là phụ, các máy khác vẫn tự cập nhật sau vài giây */
    }
  }, []);

  /** Đưa trình phát về đúng bài và đúng vị trí theo dữ liệu mới nhất từ server. */
  const syncPlayer = useCallback(() => {
    const player = playerRef.current;
    if (!player || !playerReadyRef.current) return;
    const current = tracksRef.current.find((t) => t.is_current) ?? null;
    if (!current) {
      if (loadedRef.current) player.stopVideo();
      loadedRef.current = null;
      return;
    }
    const seconds = positionMs() / 1000;
    if (loadedRef.current !== current.id) {
      loadedRef.current = current.id;
      metaSentRef.current = null;
      player.loadVideoById({ videoId: current.video_id, startSeconds: seconds });
      if (mutedRef.current) player.mute();
      else player.unMute();
      return;
    }
    const state = player.getPlayerState();
    if (state === PLAYING) {
      if (Math.abs(player.getCurrentTime() - seconds) > 4) player.seekTo(seconds, true);
    } else if (state === PAUSED || state === -1 || state === 5) {
      player.playVideo();
    }
  }, [positionMs]);

  const refresh = useCallback(async () => {
    try {
      const started = Date.now();
      const list = await listMusic();
      const finished = Date.now();
      const current = list.find((t) => t.is_current);
      anchorRef.current = { at: (started + finished) / 2, elapsed: current?.elapsed_ms ?? 0 };
      tracksRef.current = list;
      const signature = list.map((t) => `${t.id}:${t.is_current ? 1 : 0}:${t.title}:${t.can_remove ? 1 : 0}`).join("|");
      if (signature !== signatureRef.current) {
        signatureRef.current = signature;
        setTracks(list);
      }
      setReady(true);
      syncPlayer();
    } catch (err) {
      console.error(err);
    }
  }, [syncPlayer]);

  useEffect(() => {
    refreshRef.current = refresh;
  }, [refresh]);

  // Trình phát YouTube (ẩn, chỉ lấy tiếng).
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    loadYouTubeApi()
      .then((YT) => {
        const host = hostRef.current;
        if (cancelled || !host) return;
        const slot = document.createElement("div");
        host.appendChild(slot);
        playerRef.current = new YT.Player(slot, {
          width: 220,
          height: 124,
          host: "https://www.youtube-nocookie.com",
          playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, playsinline: 1, rel: 0, iv_load_policy: 3, origin: window.location.origin },
          events: {
            onReady: () => {
              const player = playerRef.current;
              if (!player) return;
              playerReadyRef.current = true;
              player.mute();
              let wantSound = false;
              try {
                wantSound = window.localStorage.getItem(SOUND_KEY) === "on";
              } catch {
                /* bỏ qua */
              }
              if (wantSound) {
                // Lần trước đã bật tiếng: thử bật lại, trình duyệt từ chối thì giữ tắt tiếng để người dùng tự bấm.
                mutedRef.current = false;
                player.unMute();
                timer = setTimeout(() => {
                  if (playerRef.current?.isMuted()) {
                    mutedRef.current = true;
                    setMuted(true);
                  } else {
                    setMuted(false);
                  }
                }, 800);
              }
              syncPlayer();
            },
            onStateChange: (event) => {
              const player = playerRef.current;
              if (!player) return;
              if (event.data === ENDED) {
                const id = loadedRef.current;
                if (id) nextMusic(id).catch(() => {}).finally(() => void refreshRef.current().then(broadcast));
                return;
              }
              if (event.data === PLAYING) {
                const current = tracksRef.current.find((t) => t.is_current);
                if (!current || current.id !== loadedRef.current || metaSentRef.current === current.id) return;
                metaSentRef.current = current.id;
                const duration = Math.round(player.getDuration());
                const title = player.getVideoData().title ?? "";
                const needDuration = current.duration_seconds == null && duration > 0;
                const needTitle = current.title === MUSIC_FALLBACK_TITLE && title !== "";
                if (needDuration || needTitle) {
                  setMusicMeta(current.id, duration > 0 ? duration : null, title)
                    .then(() => refreshRef.current())
                    .catch(() => {});
                }
              }
            },
            onError: () => {
              // Video bị xóa / không cho nhúng: báo hết bài để cả phòng chuyển sang bài kế.
              const id = loadedRef.current;
              if (id) nextMusic(id).catch(() => {}).finally(() => void refreshRef.current().then(broadcast));
            },
          },
        });
      })
      .catch((err) => console.error(err));

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      try {
        playerRef.current?.destroy();
      } catch {
        /* bỏ qua */
      }
      playerRef.current = null;
      playerReadyRef.current = false;
      loadedRef.current = null;
      clearHost(hostRef.current);
    };
  }, [userId, syncPlayer, broadcast]);

  // Cập nhật định kỳ + khi quay lại tab + nhận tín hiệu tức thì từ máy khác.
  useEffect(() => {
    if (!userId) return;
    void refresh();
    const poll = setInterval(() => void refresh(), POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    document.addEventListener("visibilitychange", onVisible);

    const supabase = createClient();
    const channel = supabase.channel("forum-music").on("broadcast", { event: "sync" }, () => void refresh());
    channel.subscribe();
    channelRef.current = channel;

    return () => {
      clearInterval(poll);
      document.removeEventListener("visibilitychange", onVisible);
      channelRef.current = null;
      void supabase.removeChannel(channel);
    };
  }, [userId, refresh]);

  const toggleMute = useCallback(() => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    try {
      window.localStorage.setItem(SOUND_KEY, next ? "off" : "on");
    } catch {
      /* bỏ qua */
    }
    const player = playerRef.current;
    if (!player || !playerReadyRef.current) return;
    if (next) {
      player.mute();
    } else {
      player.unMute();
      player.setVolume(100);
      if (player.getPlayerState() !== PLAYING) player.playVideo();
    }
  }, []);

  const add = useCallback(
    async (link: string) => {
      const id = parseYouTubeId(link);
      if (!id) throw new Error("invalid_link");
      const title = await fetchYouTubeTitle(id);
      await addMusic(id, title ?? MUSIC_FALLBACK_TITLE);
      await refresh();
      broadcast();
    },
    [refresh, broadcast],
  );

  const remove = useCallback(
    async (id: string) => {
      await removeMusic(id);
      await refresh();
      broadcast();
    },
    [refresh, broadcast],
  );

  const value = useMemo<MusicState>(
    () => ({
      ready,
      current: tracks.find((t) => t.is_current) ?? null,
      queue: tracks.filter((t) => !t.is_current),
      muted,
      toggleMute,
      positionMs,
      add,
      remove,
    }),
    [ready, tracks, muted, toggleMute, positionMs, add, remove],
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
      {/* Trình phát đặt ngoài màn hình: chỉ dùng để phát tiếng. */}
      <div ref={hostRef} aria-hidden="true" style={{ position: "fixed", left: -10000, top: 0, width: 220, height: 124, pointerEvents: "none" }} />
    </MusicContext.Provider>
  );
}

function clearHost(host: HTMLElement | null) {
  if (host) host.replaceChildren();
}

// ---- Icon ----
function Svg({ className = "h-5 w-5", children }: { className?: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {children}
    </svg>
  );
}
const MusicIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M9 18V5l11-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="17" cy="16" r="3" />
  </Svg>
);
const VolumeIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M11 5 6 9H3v6h3l5 4z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
  </Svg>
);
const VolumeOffIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="M11 5 6 9H3v6h3l5 4z" />
    <path d="m16 9 5 6M21 9l-5 6" />
  </Svg>
);
const SkipIcon = ({ className }: { className?: string }) => (
  <Svg className={className}>
    <path d="m5 5 9 7-9 7z" />
    <path d="M19 5v14" />
  </Svg>
);

function Thumb({ videoId, size, playing = false }: { videoId: string; size: number; playing?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <span style={{ width: size, height: size }} className="relative block shrink-0 overflow-hidden rounded-xl bg-slate-100">
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`} alt="" draggable={false} onError={() => setFailed(true)} className="h-full w-full object-cover" />
      )}
      {playing && <span className="absolute bottom-1 right-1 h-1.5 w-1.5 animate-pulse rounded-full bg-white shadow-[0_0_0_1px_rgba(0,0,0,.35)]" />}
    </span>
  );
}

function Progress({ duration, positionMs }: { duration: number | null; positionMs: () => number }) {
  const [pos, setPos] = useState(0);
  useEffect(() => {
    const read = () => setPos(positionMs());
    const first = setTimeout(read, 0);
    const timer = setInterval(read, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [positionMs]);
  const pct = duration ? Math.min(100, (pos / (duration * 1000)) * 100) : 0;
  return (
    <div className="h-[3px] overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
      <div className="h-full rounded-full bg-black transition-[width] duration-1000 ease-linear" style={{ width: `${pct}%` }} />
    </div>
  );
}

const iconButton =
  "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 active:scale-90";

/** Thanh nhạc nhỏ gọn đặt đầu trang diễn đàn: bài đang phát, ô dán link và danh sách chờ. */
export function ForumMusicBar() {
  const music = useContext(MusicContext);
  const [link, setLink] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listOpen, setListOpen] = useState(true);

  if (!music) return null;
  const { current, queue, muted, ready } = music;

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy || !link.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await music!.add(link);
      setLink("");
    } catch (err) {
      console.error(err);
      setError(musicErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function drop(track: MusicTrack) {
    setError(null);
    try {
      await music!.remove(track.id);
    } catch (err) {
      console.error(err);
      setError(musicErrorMessage(err));
    }
  }

  return (
    <section aria-label="Nhạc" className="rounded-2xl border border-slate-200/80 bg-white p-2.5">
      <div className="flex items-center gap-2.5">
        {current ? (
          <Thumb key={current.id} videoId={current.video_id} size={40} playing />
        ) : (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500">
            <MusicIcon className="h-[18px] w-[18px]" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          {current ? (
            <>
              <p className="truncate text-[13px] font-medium leading-tight text-slate-900" title={current.title}>
                {current.title}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                <ForumAvatar avatar={current.avatar} size={14} />
                <span className="truncate">Mở bởi {current.display_name}</span>
              </p>
            </>
          ) : (
            <p className="text-[13px] text-slate-500">{ready ? "Chưa có bài nào" : "Đang tải..."}</p>
          )}
        </div>
        {current?.can_remove && (
          <button type="button" onClick={() => void drop(current)} aria-label="Bỏ qua bài này" title="Bỏ qua bài này" className={iconButton}>
            <SkipIcon className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={music.toggleMute}
          aria-label={muted ? "Bật tiếng" : "Tắt tiếng"}
          title={muted ? "Bật tiếng" : "Tắt tiếng"}
          aria-pressed={!muted}
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition active:scale-90 ${
            muted ? "bg-black text-white hover:bg-slate-800" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {muted ? <VolumeOffIcon className="h-4 w-4" /> : <VolumeIcon className="h-4 w-4" />}
        </button>
      </div>

      {current && (
        <div className="mt-2">
          <Progress key={current.id} duration={current.duration_seconds} positionMs={music.positionMs} />
        </div>
      )}

      <form onSubmit={submit} className="mt-2.5 flex items-center gap-2">
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          type="url"
          inputMode="url"
          placeholder="Link YouTube"
          aria-label="Link YouTube"
          maxLength={300}
          className="h-9 min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-black focus:ring-4 focus:ring-black/10"
        />
        <button
          type="submit"
          disabled={busy || !link.trim()}
          aria-label="Thêm bài"
          title="Thêm bài"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-black text-white transition hover:bg-slate-800 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <PlusIcon className="h-4 w-4" />}
        </button>
      </form>
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}

      {queue.length > 0 && (
        <div className="mt-2 border-t border-slate-100 pt-2">
          <button
            type="button"
            onClick={() => setListOpen((v) => !v)}
            aria-expanded={listOpen}
            className="flex w-full items-center justify-between text-xs font-medium text-slate-500 transition hover:text-slate-800"
          >
            <span>Danh sách chờ · {queue.length}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`h-4 w-4 transition-transform duration-300 ${listOpen ? "rotate-180" : ""}`}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {listOpen && (
            <ul className="mt-1.5 max-h-40 space-y-1 overflow-y-auto">
              {queue.map((track, index) => (
                <li key={track.id} className="post-in flex items-center gap-2 rounded-xl px-1 py-1 hover:bg-slate-50">
                  <span className="w-4 shrink-0 text-center text-[11px] tabular-nums text-slate-400">{index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] leading-tight text-slate-800" title={track.title}>
                      {track.title}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                      <ForumAvatar avatar={track.avatar} size={12} />
                      <span className="truncate">Mở bởi {track.display_name}</span>
                    </p>
                  </div>
                  {track.can_remove && (
                    <button
                      type="button"
                      onClick={() => void drop(track)}
                      aria-label="Xóa khỏi danh sách"
                      title="Xóa khỏi danh sách"
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 active:scale-90"
                    >
                      <CloseIcon className="h-3.5 w-3.5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
