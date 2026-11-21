import { createClient } from "@/lib/supabase/client";

// ---- Kiểu dữ liệu (không có thông tin tài khoản thật: diễn đàn hoàn toàn ẩn danh) ----
export type ForumProfile = { display_name: string; avatar: string; blocked: boolean };
export type ForumName = { id: number; name: string };

export type ForumPostItem = {
  id: string;
  title: string;
  excerpt: string;
  display_name: string;
  avatar: string;
  created_at: string;
  comment_count: number;
  is_mine: boolean;
  reactions: Record<string, number>;
  my_reaction: string | null;
};
export type ForumPostDetail = Omit<ForumPostItem, "excerpt" | "comment_count"> & { body: string };
export type ForumComment = {
  id: string;
  body: string;
  display_name: string;
  avatar: string;
  created_at: string;
  is_mine: boolean;
  is_author: boolean;
  reactions: Record<string, number>;
  my_reaction: string | null;
};

export const FORUM_PAGE_SIZE = 15;
export const FORUM_TITLE_MAX = 120;
export const FORUM_POST_MAX = 5000;
export const FORUM_COMMENT_MAX = 1000;

async function rpc<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await createClient().rpc(fn, args);
  if (error) throw error;
  return data as T;
}

function rows<T>(data: unknown): T[] {
  return Array.isArray(data) ? (data as T[]) : [];
}

// ---- Nhân vật ----
export async function getMyForumProfile(): Promise<ForumProfile | null> {
  return rows<ForumProfile>(await rpc("forum_my_profile"))[0] ?? null;
}

export async function listForumNames(): Promise<ForumName[]> {
  return rows<ForumName>(await rpc("forum_names_list"));
}

export async function saveForumProfile(name: string, avatar: string): Promise<void> {
  await rpc("forum_save_profile", { p_name: name, p_avatar: avatar });
}

// ---- Bài viết (mới nhất lên đầu) ----
export type ForumCursor = { before: string; beforeId: string } | null;

export async function listForumPosts(cursor: ForumCursor, mine = false): Promise<{ items: ForumPostItem[]; hasMore: boolean }> {
  const data = rows<ForumPostItem>(
    await rpc("forum_list_posts", {
      p_limit: FORUM_PAGE_SIZE + 1,
      p_before: cursor?.before ?? null,
      p_before_id: cursor?.beforeId ?? null,
      p_mine: mine,
    }),
  );
  return { items: data.slice(0, FORUM_PAGE_SIZE), hasMore: data.length > FORUM_PAGE_SIZE };
}

export async function getForumPost(id: string): Promise<ForumPostDetail | null> {
  return rows<ForumPostDetail>(await rpc("forum_get_post", { p_id: id }))[0] ?? null;
}

export async function createForumPost(title: string, body: string): Promise<string> {
  return rpc<string>("forum_create_post", { p_title: title, p_body: body });
}

export async function deleteForumPost(id: string): Promise<void> {
  await rpc("forum_delete_post", { p_id: id });
}

// ---- Bình luận ----
export async function listForumComments(postId: string): Promise<ForumComment[]> {
  return rows<ForumComment>(await rpc("forum_list_comments", { p_post_id: postId }));
}

export async function createForumComment(postId: string, body: string): Promise<void> {
  await rpc("forum_create_comment", { p_post_id: postId, p_body: body });
}

export async function deleteForumComment(id: string): Promise<void> {
  await rpc("forum_delete_comment", { p_id: id });
}

// ---- Cảm xúc ----
export type ForumReactionSummary = { reactions: Record<string, number>; my_reaction: string | null };

/** reaction = null nghĩa là bỏ cảm xúc. */
export async function reactForum(target: "post" | "comment", id: string, reaction: string | null): Promise<ForumReactionSummary> {
  const row = rows<ForumReactionSummary>(await rpc("forum_react", { p_kind: target, p_id: id, p_reaction: reaction }))[0];
  return row ?? { reactions: {}, my_reaction: reaction };
}

export type ForumReactor = { display_name: string; avatar: string; kind: string; is_me: boolean };

/** Danh sách người đã thả cảm xúc (chỉ có tên nhân vật và avatar). */
export async function listForumReactors(target: "post" | "comment", id: string): Promise<ForumReactor[]> {
  return rows<ForumReactor>(await rpc("forum_reaction_users", { p_kind: target, p_id: id }));
}

// ---- Quản trị ----
export type AdminForumPost = {
  id: string;
  title: string;
  excerpt: string;
  display_name: string;
  author_id: string;
  author_email: string;
  hidden: boolean;
  author_blocked: boolean;
  created_at: string;
  comment_count: number;
};
export type AdminForumComment = {
  id: string;
  post_id: string;
  post_title: string;
  body: string;
  display_name: string;
  author_id: string;
  author_email: string;
  hidden: boolean;
  author_blocked: boolean;
  created_at: string;
};
export type AdminBlockedUser = { user_id: string; email: string; display_name: string; blocked_at: string; blocked_reason: string | null };
export type AdminBannedWord = { id: number; word: string; created_at: string };

export const adminListForumPosts = async () => rows<AdminForumPost>(await rpc("forum_admin_posts"));
export const adminListForumComments = async () => rows<AdminForumComment>(await rpc("forum_admin_comments"));
export const adminListBlockedUsers = async () => rows<AdminBlockedUser>(await rpc("forum_admin_blocked_list"));
export const adminListBannedWords = async () => rows<AdminBannedWord>(await rpc("forum_admin_words_list"));

export async function adminSetHidden(kind: "post" | "comment", id: string, hidden: boolean): Promise<void> {
  await rpc("forum_admin_set_hidden", { p_kind: kind, p_id: id, p_hidden: hidden });
}

export async function adminSetBlocked(userId: string, blocked: boolean, reason = "", hideContent = false): Promise<void> {
  await rpc("forum_admin_set_blocked", { p_user_id: userId, p_blocked: blocked, p_reason: reason, p_hide: hideContent });
}

export const adminAddBannedWord = (word: string) => rpc<void>("forum_admin_word_add", { p_word: word });
export const adminRemoveBannedWord = (id: number) => rpc<void>("forum_admin_word_remove", { p_id: id });
export const adminAddForumName = (name: string) => rpc<void>("forum_admin_name_add", { p_name: name });
export const adminRemoveForumName = (id: number) => rpc<void>("forum_admin_name_remove", { p_id: id });

// ---- Thông báo lỗi thân thiện (không bao giờ hiện lỗi thô) ----
export function forumErrorMessage(err: unknown): string {
  const e = err as { code?: string; message?: string } | null;
  const msg = e?.message ?? "";
  if (msg.includes("banned_word")) return "Nội dung có từ ngữ không được phép.";
  if (msg.includes("too_fast")) return "Bạn thao tác quá nhanh, hãy chờ một chút rồi thử lại.";
  if (msg.includes("blocked")) return "Tài khoản của bạn đã bị chặn khỏi diễn đàn.";
  if (msg.includes("account_banned")) return "Tài khoản của bạn đang bị khóa.";
  if (msg.includes("invalid_reaction")) return "Cảm xúc không hợp lệ.";
  if (msg.includes("invalid_title")) return `Tiêu đề cần từ 3 đến ${FORUM_TITLE_MAX} ký tự.`;
  if (msg.includes("invalid_body")) return "Nội dung chưa hợp lệ hoặc quá dài.";
  if (msg.includes("invalid_name")) return "Tên nhân vật không hợp lệ.";
  if (msg.includes("invalid_avatar")) return "Avatar không hợp lệ.";
  if (msg.includes("invalid_word")) return "Từ không hợp lệ.";
  if (msg.includes("cannot_ban_admin")) return "Không thể chặn tài khoản quản trị viên.";
  if (msg.includes("user_not_found")) return "Không tìm thấy người dùng.";
  if (msg.includes("not_found")) return "Nội dung không còn tồn tại.";
  if (msg.includes("login_required")) return "Bạn cần đăng nhập.";
  if (msg.includes("no_profile")) return "Hãy chọn nhân vật trước.";
  if (msg.includes("forbidden") || e?.code === "42501") return "Bạn không có quyền thực hiện thao tác này.";
  return "Thao tác không thành công, vui lòng thử lại.";
}
