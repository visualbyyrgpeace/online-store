"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
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
  skipMusic,
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

const SOUND_KEY = "forum-music-sound"; // "on" = thiết bị này đang nghe, "off" = đã dừng
const VOLUME_KEY = "forum-music-volume";
const TAB_CHANNEL = "forum-music-tabs";
const POLL_MS = 5000;
const DRIFT_SECONDS = 2; // lệch quá ngần này so với phòng thì tua lại cho khớp (lệch lâu sẽ nghe như vọng tiếng)
const UNSTARTED = -1;
const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
const BUFFERING = 3;
const CUED = 5;

function readStore(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeStore(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* bỏ qua */
  }
}

type Engine = "idle" | "loading" | "playing";

type MusicState = {
  ready: boolean;
  current: MusicTrack | null;
  queue: MusicTrack[];
  /** Thiết bị / tab này có đang nghe không (nút Phát / Dừng chỉ tác động lên máy của người bấm). */
  listening: boolean;
  engine: Engine;
  /** Vừa bị tab khác của cùng trình duyệt giành phát tiếng. */
  elsewhere: boolean;
  volume: number;
  muted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (value: number) => void;
  positionMs: () => number;
  add: (link: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  /** Chuyển bài đang phát sang bài kế: áp dụng cho cả phòng, ai cũng bấm được. */
  skip: () => Promise<void>;
};
const MusicContext = createContext<MusicState | null>(null);

/**
 * Giữ trình phát ở cấp layout của /forum nên nhạc không bị ngắt khi chuyển giữa trang chủ và bài viết.
 * Đồng bộ: server lưu giờ bắt đầu của bài đang phát; mỗi máy tự tính vị trí hiện tại và tua về cho khớp.
 * Chỉ máy / tab nào bấm Phát mới tải và phát video; bấm Dừng là dừng hẳn (không tải nữa).
 * Mỗi trình duyệt chỉ có MỘT tab phát tiếng: tab bấm Phát sau cùng giành quyền, các tab khác tự dừng (hết chồng tiếng).
 */
export function ForumMusicProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [ready, setReady] = useState(false);
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [listening, setListening] = useState(false);
  const [engine, setEngine] = useState<Engine>("idle");
  const [elsewhere, setElsewhere] = useState(false);
  const [volume, setVolumeState] = useState(80);
  const [muted, setMuted] = useState(false);

  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const playerReadyRef = useRef(false);
  const loadedRef = useRef<string | null>(null); // id bài đang nạp trong trình phát
  const metaSentRef = useRef<string | null>(null);
  const tracksRef = useRef<MusicTrack[]>([]);
  const signatureRef = useRef("");
  const anchorRef = useRef({ at: 0, elapsed: 0 });
  const listeningRef = useRef(false);
  const volumeRef = useRef(80);
  const mutedRef = useRef(false);
  const tabIdRef = useRef("");
  const tabChannelRef = useRef<BroadcastChannel | null>(null);
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

  /** Áp âm lượng / tắt tiếng hiện tại lên trình phát. */
  const applyAudio = useCallback(() => {
    const player = playerRef.current;
    if (!player || !playerReadyRef.current) return;
    try {
      if (mutedRef.current || volumeRef.current === 0) {
        player.mute();
      } else {
        player.unMute();
        player.setVolume(volumeRef.current);
      }
    } catch {
      /* bỏ qua */
    }
  }, []);

  /** Đưa trình phát về đúng bài và đúng vị trí theo dữ liệu mới nhất từ server (chỉ khi thiết bị này đang nghe). */
  const syncPlayer = useCallback(() => {
    const player = playerRef.current;
    if (!player || !playerReadyRef.current) return;
    const current = tracksRef.current.find((t) => t.is_current) ?? null;
    if (!listeningRef.current || !current) {
      if (loadedRef.current) {
        try {
          player.stopVideo();
        } catch {
          /* bỏ qua */
        }
        loadedRef.current = null;
      }
      setEngine("idle");
      return;
    }
    const seconds = positionMs() / 1000;
    if (loadedRef.current !== current.id) {
      loadedRef.current = current.id;
      metaSentRef.current = null;
      setEngine("loading");
      applyAudio();
      player.loadVideoById({ videoId: current.video_id, startSeconds: seconds });
      applyAudio();
      return;
    }
    const state = player.getPlayerState();
    if (state === PLAYING) {
      if (Math.abs(player.getCurrentTime() - seconds) > DRIFT_SECONDS) player.seekTo(seconds, true);
    } else if (state === PAUSED || state === UNSTARTED || state === CUED) {
      player.playVideo();
    }
  }, [positionMs, applyAudio]);

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

  /** Dừng nghe trên thiết bị này. persist=false khi bị tab khác giành quyền (không ghi "off" vì giá trị lưu dùng chung giữa các tab). */
  const stopPlayback = useCallback((persist: boolean) => {
    listeningRef.current = false;
    setListening(false);
    setEngine("idle");
    if (persist) writeStore(SOUND_KEY, "off");
    const player = playerRef.current;
    if (player && playerReadyRef.current) {
      try {
        player.stopVideo();
      } catch {
        /* bỏ qua */
      }
    }
    loadedRef.current = null;
  }, []);

  /** Bắt đầu nghe: vào lại đúng giây hiện tại của phòng, đồng thời báo các tab khác của trình duyệt này dừng. */
  const startPlayback = useCallback(() => {
    listeningRef.current = true;
    setListening(true);
    setElsewhere(false);
    setEngine("loading");
    writeStore(SOUND_KEY, "on");
    try {
      tabChannelRef.current?.postMessage({ type: "claim", id: tabIdRef.current });
    } catch {
      /* bỏ qua */
    }
    loadedRef.current = null;
    syncPlayer();
  }, [syncPlayer]);

  // Mỗi trình duyệt chỉ một tab phát tiếng.
  useEffect(() => {
    if (!userId || typeof BroadcastChannel === "undefined") return;
    const id = Math.random().toString(36).slice(2);
    tabIdRef.current = id;
    const channel = new BroadcastChannel(TAB_CHANNEL);
    tabChannelRef.current = channel;
    channel.onmessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; id?: string } | null;
      if (data?.type === "claim" && data.id !== id && listeningRef.current) {
        stopPlayback(false);
        setElsewhere(true);
      }
    };
    return () => {
      channel.close();
      tabChannelRef.current = null;
    };
  }, [userId, stopPlayback]);

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

              const storedVolume = readStore(VOLUME_KEY);
              if (storedVolume !== null && storedVolume !== "" && Number.isFinite(Number(storedVolume))) {
                const v = Math.max(0, Math.min(100, Math.round(Number(storedVolume))));
                volumeRef.current = v;
                setVolumeState(v);
              }
              applyAudio();

              if (readStore(SOUND_KEY) === "on") {
                // Lần trước đang nghe: thử nghe lại. Trình duyệt chặn tự phát có tiếng thì quay về trạng thái dừng để người dùng tự bấm Phát.
                listeningRef.current = true;
                setListening(true);
                setEngine("loading");
                try {
                  tabChannelRef.current?.postMessage({ type: "claim", id: tabIdRef.current });
                } catch {
                  /* bỏ qua */
                }
                syncPlayer();
                timer = setTimeout(() => {
                  if (!listeningRef.current) return;
                  if (!tracksRef.current.some((t) => t.is_current)) return;
                  const state = playerRef.current?.getPlayerState();
                  if (state !== PLAYING && state !== BUFFERING) stopPlayback(false);
                }, 3000);
              }
            },
            onStateChange: (event) => {
              const player = playerRef.current;
              if (!player) return;
              const state = event.data;
              if (state === ENDED) {
                if (!listeningRef.current) return;
                const id = loadedRef.current;
                if (id) nextMusic(id).catch(() => {}).finally(() => void refreshRef.current().then(broadcast));
                return;
              }
              if (!listeningRef.current) return;
              if (state === PLAYING) {
                setEngine("playing");
                // Vừa tải xong thường đã trễ vài giây so với phòng: tua ngay cho khớp để các máy không vọng tiếng nhau.
                if (tracksRef.current.some((t) => t.is_current)) {
                  const target = positionMs() / 1000;
                  if (Math.abs(player.getCurrentTime() - target) > DRIFT_SECONDS) player.seekTo(target, true);
                }
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
              } else if (state === BUFFERING || state === UNSTARTED || state === CUED || state === PAUSED) {
                setEngine("loading");
              }
            },
            onError: () => {
              // Video bị xóa / không cho nhúng: báo hết bài để cả phòng chuyển sang bài kế.
              if (!listeningRef.current) return;
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
  }, [userId, syncPlayer, broadcast, applyAudio, positionMs, stopPlayback]);

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

  const togglePlay = useCallback(() => {
    if (listeningRef.current) stopPlayback(true);
    else startPlayback();
  }, [startPlayback, stopPlayback]);

  const setVolume = useCallback(
    (value: number) => {
      const next = Math.max(0, Math.min(100, Math.round(value)));
      volumeRef.current = next;
      setVolumeState(next);
      if (next > 0 && mutedRef.current) {
        mutedRef.current = false;
        setMuted(false);
      }
      writeStore(VOLUME_KEY, String(next));
      applyAudio();
    },
    [applyAudio],
  );

  const toggleMute = useCallback(() => {
    if (volumeRef.current === 0) {
      setVolume(60);
      return;
    }
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    applyAudio();
  }, [applyAudio, setVolume]);

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

  const skip = useCallback(async () => {
    const current = tracksRef.current.find((t) => t.is_current);
    if (!current) return;
    await skipMusic(current.id);
    await refresh();
    broadcast();
  }, [refresh, broadcast]);

  const value = useMemo<MusicState>(
    () => ({
      ready,
      current: tracks.find((t) => t.is_current) ?? null,
      queue: tracks.filter((t) => !t.is_current),
      listening,
      engine,
      elsewhere,
      volume,
      muted,
      togglePlay,
      toggleMute,
      setVolume,
      positionMs,
      add,
      remove,
      skip,
    }),
    [ready, tracks, listening, engine, elsewhere, volume, muted, togglePlay, toggleMute, setVolume, positionMs, add, remove, skip],
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
function Svg({ className = "h-5 w-5", fill = false, children }: { className?: string; fill?: boolean; children: ReactNode }) {
  return fill ? (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      {children}
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {children}
    </svg>
  );
}
type IconProps = { className?: string };
const MusicIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M9 18V5l11-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="17" cy="16" r="3" />
  </Svg>
);
const PlayGlyph = ({ className }: IconProps) => (
  <Svg className={className} fill>
    <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14z" />
  </Svg>
);
const PauseGlyph = ({ className }: IconProps) => (
  <Svg className={className} fill>
    <rect x="6" y="4.5" width="4.2" height="15" rx="1.2" />
    <rect x="13.8" y="4.5" width="4.2" height="15" rx="1.2" />
  </Svg>
);
const NextGlyph = ({ className }: IconProps) => (
  <Svg className={className} fill>
    <path d="M6 5.2v13.6a.9.9 0 0 0 1.4.75l9.6-6.8a.9.9 0 0 0 0-1.5L7.4 4.45A.9.9 0 0 0 6 5.2z" />
    <rect x="17.5" y="4.5" width="2.5" height="15" rx="1.1" />
  </Svg>
);
const VolumeHighIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M11 5 6 9H3v6h3l5 4z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
  </Svg>
);
const VolumeLowIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M11 5 6 9H3v6h3l5 4z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
  </Svg>
);
const VolumeOffIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M11 5 6 9H3v6h3l5 4z" />
    <path d="m16 9 5 6M21 9l-5 6" />
  </Svg>
);

const MUSIC_CSS = `
@keyframes fm-eq{0%,100%{transform:scaleY(.28)}50%{transform:scaleY(1)}}
.fm-bar{height:100%;transform-origin:bottom;transform:scaleY(.28)}
.fm-eq[data-active="1"] .fm-bar{animation:fm-eq .9s ease-in-out infinite}
@keyframes fm-spin{to{transform:rotate(360deg)}}
.fm-range{-webkit-appearance:none;appearance:none;height:4px;border-radius:9999px;cursor:pointer;outline:none;background:linear-gradient(to right,#fff var(--v,0%),rgba(255,255,255,.22) var(--v,0%))}
.fm-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:12px;height:12px;border-radius:9999px;background:#fff;box-shadow:0 1px 5px rgba(0,0,0,.55)}
.fm-range::-moz-range-thumb{width:12px;height:12px;border:0;border-radius:9999px;background:#fff;box-shadow:0 1px 5px rgba(0,0,0,.55)}
.fm-range:focus-visible{outline:2px solid rgba(255,255,255,.7);outline-offset:5px}
@media (prefers-reduced-motion:reduce){.fm-eq[data-active="1"] .fm-bar{animation:none}}
`;

/** Bốn thanh nhảy theo nhạc khi đang phát. */
function Equalizer({ active, className = "h-3" }: { active: boolean; className?: string }) {
  return (
    <span aria-hidden="true" data-active={active ? "1" : "0"} className={`fm-eq inline-flex items-end gap-[2px] ${className}`}>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="fm-bar block w-[2px] rounded-full bg-current" style={{ animationDelay: `${i * 0.17}s` }} />
      ))}
    </span>
  );
}

/** Ảnh bìa lấy từ YouTube; không có ảnh thì hiện biểu tượng nốt nhạc. */
function Cover({ videoId, className = "" }: { videoId: string | null; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <span aria-hidden="true" className={`relative block shrink-0 overflow-hidden bg-neutral-800 ${className}`}>
      {videoId && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`} alt="" draggable={false} onError={() => setFailed(true)} className="h-full w-full object-cover" />
      ) : (
        <span className="grid h-full w-full place-items-center text-white/35">
          <MusicIcon className="h-[45%] w-[45%]" />
        </span>
      )}
    </span>
  );
}

/** Vị trí hiện tại của bài trong phòng, cập nhật mỗi giây. */
function useRoomPosition(positionMs: () => number, active: boolean) {
  const [pos, setPos] = useState(0);
  useEffect(() => {
    if (!active) return;
    const read = () => setPos(positionMs());
    const first = setTimeout(read, 0);
    const timer = setInterval(read, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [positionMs, active]);
  return pos;
}

function formatTime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = String(total % 60).padStart(2, "0");
  if (m >= 60) return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}:${s}`;
  return `${m}:${s}`;
}

const noPosition = () => 0;
const scrollbar = "[scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,.25)_transparent]";

/**
 * Trình phát nhạc dưới khung nhân vật.
 * - Thanh nhỏ: ảnh bìa, tên bài, nút Phát / Dừng. Bấm vào tên bài để mở bảng đầy đủ.
 * - Bảng đầy đủ: ảnh bìa lớn, thanh tiến trình, Phát / Dừng, Bài tiếp theo (ai cũng bấm được), âm lượng, thêm bài và danh sách chờ.
 */
export function ForumMusicBar({ layout = "popover" }: { layout?: "popover" | "inline" }) {
  const inline = layout === "inline";
  const music = useContext(MusicContext);
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const [busy, setBusy] = useState(false);
  const [skipping, setSkipping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const current = music?.current ?? null;
  const pos = useRoomPosition(music?.positionMs ?? noPosition, !!current);

  // Bấm ra ngoài hoặc nhấn Esc thì đóng bảng.
  useEffect(() => {
    if (!open || inline) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, inline]);

  if (!music) return null;
  const { queue, ready, listening, engine, elsewhere, volume, muted } = music;

  const playing = listening && engine === "playing";
  const loading = listening && engine === "loading" && !!current;
  const duration = current?.duration_seconds ?? null;
  const shownPos = duration ? Math.min(pos, duration * 1000) : pos;
  const pct = duration ? Math.min(100, (shownPos / (duration * 1000)) * 100) : 0;
  const silent = muted || volume === 0;
  const VolumeGlyph = silent ? VolumeOffIcon : volume < 50 ? VolumeLowIcon : VolumeHighIcon;
  const statusText = !current
    ? ready
      ? "Chưa có bài nào"
      : "Đang tải..."
    : listening
      ? loading
        ? "Đang kết nối..."
        : "Bạn đang nghe cùng mọi người"
      : "Đã dừng trên máy này. Bấm ▶ để nghe tiếp";

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

  async function skipCurrent() {
    if (skipping) return;
    setSkipping(true);
    setError(null);
    try {
      await music!.skip();
    } catch (err) {
      console.error(err);
      setError(musicErrorMessage(err));
    } finally {
      setSkipping(false);
    }
  }

  const playLabel = listening ? "Dừng phát" : "Phát nhạc";

  return (
    <div ref={boxRef} className={inline ? "relative w-full" : "relative w-[17.5rem] max-w-full"}>
      <style>{MUSIC_CSS}</style>

      {/* Thanh nhỏ */}
      <div className="relative flex items-center gap-1 overflow-hidden rounded-2xl bg-neutral-950 p-1.5 text-white shadow-[0_10px_26px_-14px_rgba(0,0,0,.6)] ring-1 ring-black/5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Mở trình phát nhạc"
          title={current ? current.title : "Nhạc"}
          className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl text-left transition active:scale-[.98]"
        >
          <Cover key={current?.video_id ?? "none"} videoId={current?.video_id ?? null} className="h-11 w-11 rounded-xl" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-semibold leading-tight">{current ? current.title : ready ? "Chưa có bài nào" : "Đang tải..."}</span>
            <span className="mt-1 flex items-center gap-1.5 text-[11px] leading-tight text-white/55">
              {current ? (
                <>
                  <Equalizer active={playing} className="h-2.5 shrink-0 text-white/80" />
                  <span className="truncate">Mở bởi {current.display_name}</span>
                </>
              ) : (
                <span className="truncate">Bấm để thêm bài</span>
              )}
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={music.togglePlay}
          disabled={!current}
          aria-label={playLabel}
          title={playLabel}
          aria-pressed={listening}
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-black transition hover:scale-105 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          {listening ? <PauseGlyph className="h-4 w-4" /> : <PlayGlyph className="ml-0.5 h-4 w-4" />}
          {loading && <span aria-hidden="true" className="absolute inset-[3px] rounded-full border-2 border-transparent border-t-black/60" style={{ animation: "fm-spin .8s linear infinite" }} />}
        </button>
        {current && (
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
            <span className="block h-full bg-white/80 transition-[width] duration-1000 ease-linear" style={{ width: `${pct}%` }} />
          </span>
        )}
      </div>

      {/* Bảng đầy đủ */}
      {open && (
        <section
          aria-label="Trình phát nhạc"
          className={`post-in overflow-hidden rounded-3xl bg-neutral-950 p-4 text-white ring-1 ring-white/10 ${
            inline
              ? "relative mt-2 w-full shadow-[0_10px_26px_-14px_rgba(0,0,0,.6)]"
              : "absolute left-0 top-full z-30 mt-2 w-[min(21rem,calc(100vw-2rem))] shadow-[0_28px_70px_-18px_rgba(0,0,0,.6)]"
          }`}
        >
          {current && (
            // eslint-disable-next-line @next/next/no-img-element
            <img aria-hidden="true" alt="" src={`https://i.ytimg.com/vi/${current.video_id}/mqdefault.jpg`} className="pointer-events-none absolute inset-0 h-full w-full scale-150 object-cover opacity-25 blur-3xl" />
          )}
          <div className="relative">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                <Equalizer active={playing} className="h-3 text-white" />
                Đang phát chung
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Đóng"
                title="Đóng"
                className="grid h-7 w-7 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white active:scale-90"
              >
                <CloseIcon className="h-3.5 w-3.5" />
              </button>
            </div>

            <Cover key={current?.video_id ?? "none"} videoId={current?.video_id ?? null} className="mt-3 aspect-video w-full rounded-2xl shadow-[0_16px_36px_-10px_rgba(0,0,0,.75)]" />

            <div className="mt-4 min-h-[3.25rem]">
              {current ? (
                <>
                  <p className="line-clamp-2 text-[17px] font-semibold leading-snug tracking-tight" title={current.title}>
                    {current.title}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-white/60">
                    <ForumAvatar avatar={current.avatar} size={16} />
                    <span className="truncate">Mở bởi {current.display_name}</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[17px] font-semibold tracking-tight">{ready ? "Chưa có bài nào" : "Đang tải..."}</p>
                  {ready && <p className="mt-1.5 text-[13px] text-white/60">Dán link YouTube bên dưới để mở bài đầu tiên.</p>}
                </>
              )}
            </div>

            {/* Tiến trình của bài trong phòng */}
            <div className="mt-3">
              <div className="h-1 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
                <div className="h-full rounded-full bg-white transition-[width] duration-1000 ease-linear" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-white/50">
                <span>{current ? formatTime(shownPos) : "0:00"}</span>
                <span>{duration ? `-${formatTime(duration * 1000 - shownPos)}` : "--:--"}</span>
              </div>
            </div>

            {/* Điều khiển */}
            <div className="mt-2 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={music.togglePlay}
                disabled={!current}
                aria-label={playLabel}
                title={playLabel}
                aria-pressed={listening}
                className="relative grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-[0_10px_24px_-8px_rgba(255,255,255,.35)] transition hover:scale-105 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                {listening ? <PauseGlyph className="h-6 w-6" /> : <PlayGlyph className="ml-1 h-6 w-6" />}
                {loading && <span aria-hidden="true" className="absolute inset-[4px] rounded-full border-[3px] border-transparent border-t-black/55" style={{ animation: "fm-spin .8s linear infinite" }} />}
              </button>
              <button
                type="button"
                onClick={() => void skipCurrent()}
                disabled={!current || skipping}
                aria-label="Bài tiếp theo (chuyển bài cho cả phòng)"
                title="Bài tiếp theo (chuyển bài cho cả phòng)"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {skipping ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <NextGlyph className="h-[18px] w-[18px]" />}
              </button>
            </div>
            <p className="mt-2.5 text-center text-xs text-white/50">{statusText}</p>
            {elsewhere && !listening && <p className="mt-2 rounded-xl bg-white/10 px-3 py-2 text-center text-xs text-white/80">Nhạc đang phát ở tab khác của bạn. Bấm ▶ để chuyển sang tab này.</p>}

            {/* Âm lượng: chỉ ảnh hưởng máy của bạn */}
            <div className="mt-3 flex items-center gap-2.5">
              <button
                type="button"
                onClick={music.toggleMute}
                aria-label={silent ? "Bật tiếng" : "Tắt tiếng"}
                title={silent ? "Bật tiếng" : "Tắt tiếng"}
                aria-pressed={silent}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white active:scale-90"
              >
                <VolumeGlyph className="h-[18px] w-[18px]" />
              </button>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={silent ? 0 : volume}
                onChange={(e) => music.setVolume(Number(e.target.value))}
                aria-label="Âm lượng"
                className="fm-range min-w-0 flex-1"
                style={{ "--v": `${silent ? 0 : volume}%` } as CSSProperties}
              />
              <span className="w-8 shrink-0 text-right text-[11px] tabular-nums text-white/50">{silent ? 0 : volume}</span>
            </div>

            {/* Thêm bài */}
            <form onSubmit={submit} noValidate className="mt-4 flex items-center gap-2">
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                type="text"
                inputMode="url"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="Dán link YouTube để thêm bài"
                aria-label="Link YouTube"
                maxLength={300}
                className="h-10 min-w-0 flex-1 rounded-full bg-white/10 px-4 text-[13px] text-white outline-none transition placeholder:text-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                disabled={busy || !link.trim()}
                aria-label="Thêm bài"
                title="Thêm bài"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-black transition hover:scale-105 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" /> : <PlusIcon className="h-4 w-4" />}
              </button>
            </form>
            {error && (
              <p role="alert" className="mt-2 text-xs text-red-400">
                {error}
              </p>
            )}

            {/* Danh sách chờ */}
            {queue.length > 0 && (
              <div className="mt-4 border-t border-white/10 pt-3">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">Tiếp theo · {queue.length}</p>
                <ul className={`max-h-48 space-y-0.5 overflow-y-auto ${scrollbar}`}>
                  {queue.map((track, index) => (
                    <li key={track.id} className="flex items-center gap-2.5 rounded-xl p-1.5 transition hover:bg-white/5">
                      <span className="w-4 shrink-0 text-center text-[11px] tabular-nums text-white/40">{index + 1}</span>
                      <Cover videoId={track.video_id} className="h-10 w-10 rounded-lg" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium leading-tight text-white" title={track.title}>
                          {track.title}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-white/50">
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
                          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white active:scale-90"
                        >
                          <CloseIcon className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
