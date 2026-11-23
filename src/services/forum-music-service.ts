import { forumErrorMessage } from "@/services/forum-service";
import { createClient } from "@/lib/supabase/client";

export type MusicTrack = {
  id: string;
  video_id: string;
  title: string;
  duration_seconds: number | null;
  display_name: string;
  avatar: string;
  is_current: boolean;
  elapsed_ms: number;
  can_remove: boolean;
};

export const MUSIC_FALLBACK_TITLE = "Bài hát YouTube";

async function rpc<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await createClient().rpc(fn, args);
  if (error) throw error;
  return data as T;
}

/** Bài đang phát đứng đầu, sau đó là danh sách chờ theo thứ tự thêm vào. */
export async function listMusic(): Promise<MusicTrack[]> {
  const data = await rpc<unknown>("forum_music_state");
  if (!Array.isArray(data)) return [];
  return (data as MusicTrack[]).map((row) => ({
    ...row,
    duration_seconds: row.duration_seconds == null ? null : Number(row.duration_seconds),
    elapsed_ms: Number(row.elapsed_ms) || 0,
  }));
}

export const addMusic = (videoId: string, title: string) => rpc<string>("forum_music_add", { p_video_id: videoId, p_title: title });
export const nextMusic = (id: string) => rpc<void>("forum_music_next", { p_id: id });
export const removeMusic = (id: string) => rpc<void>("forum_music_remove", { p_id: id });
/** Bỏ qua bài đang phát: ai đăng nhập cũng bấm được (cần chạy file SQL 20261123000200_forum_music_skip.sql). */
export const skipMusic = (id: string) => rpc<void>("forum_music_skip", { p_id: id });
export const setMusicMeta = (id: string, duration: number | null, title: string) =>
  rpc<void>("forum_music_set_meta", { p_id: id, p_duration: duration, p_title: title });

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

/** Lấy mã video từ link YouTube (watch, youtu.be, shorts, embed, live, music.youtube.com...). Không phải link YouTube thì trả về null. */
export function parseYouTubeId(raw: string): string | null {
  const text = raw.trim();
  if (!text) return null;
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`);
  } catch {
    return null;
  }
  const host = url.hostname.toLowerCase().replace(/^(www\.|m\.|music\.)/, "");
  let id: string | null = null;
  if (host === "youtu.be") {
    id = url.pathname.split("/")[1] ?? null;
  } else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    if (url.pathname === "/watch") id = url.searchParams.get("v");
    else id = url.pathname.match(/^\/(?:shorts|embed|live|v)\/([^/?#]+)/)?.[1] ?? null;
  }
  return id && VIDEO_ID.test(id) ? id : null;
}

/**
 * Lấy tên bài qua oEmbed của YouTube. Trả về null khi không lấy được (mạng, chặn truy cập...): lúc đó bài vẫn được thêm
 * và tên thật sẽ được điền khi bài bắt đầu phát. Video không tồn tại / không cho nhúng thì báo lỗi ngay.
 */
export async function fetchYouTubeTitle(videoId: string): Promise<string | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 4000);
  try {
    const target = encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`);
    const res = await fetch(`https://www.youtube.com/oembed?url=${target}&format=json`, { signal: ctrl.signal });
    if (res.status === 404) throw new Error("music_not_found");
    if (res.status === 401 || res.status === 403) throw new Error("music_no_embed");
    if (!res.ok) return null;
    const json = (await res.json()) as { title?: unknown };
    return typeof json.title === "string" && json.title.trim() ? json.title.trim() : null;
  } catch (err) {
    if (err instanceof Error && /^music_/.test(err.message)) throw err;
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export function musicErrorMessage(err: unknown): string {
  const msg = (err as { message?: string } | null)?.message ?? "";
  if (msg.includes("invalid_link")) return "Link YouTube chưa hợp lệ.";
  if (msg.includes("music_not_found")) return "Không tìm thấy video này.";
  if (msg.includes("music_no_embed")) return "Video này không cho phép phát ở trang khác.";
  if (msg.includes("already_queued")) return "Bài này đang có trong danh sách.";
  if (msg.includes("queue_limit")) return "Bạn đang có 5 bài trong danh sách, hãy chờ bớt rồi thêm tiếp.";
  if (msg.includes("queue_full")) return "Danh sách chờ đã đầy.";
  if (msg.includes("forum_music_skip")) return "Chưa bật được nút chuyển bài: cần chạy file SQL 20261123000200_forum_music_skip.sql trên Supabase.";
  return forumErrorMessage(err);
}
