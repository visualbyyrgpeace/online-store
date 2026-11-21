"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type KeyboardEvent } from "react";
import { ForumAvatar } from "@/components/forum/forum-avatar";
import { ForumFrame } from "@/components/forum/forum-frame";
import { ReactionBar } from "@/components/forum/forum-reactions";
import { ChatIcon, SendIcon } from "@/components/forum/forum-icons";
import { FormMessage, inputClass } from "@/components/ui/form";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { ChevronLeftIcon, TrashIcon } from "@/components/utilities/tool-icons";
import { useQuery } from "@/hooks/use-query";
import {
  FORUM_COMMENT_MAX,
  createForumComment,
  deleteForumComment,
  deleteForumPost,
  forumErrorMessage,
  getForumPost,
  listForumComments,
  type ForumComment,
  type ForumPostDetail,
  type ForumProfile,
} from "@/services/forum-service";
import { timeAgo } from "@/utils/time-ago";

export function ForumPostView() {
  return <ForumFrame>{(profile) => <Thread profile={profile} />}</ForumFrame>;
}

function Thread({ profile }: { profile: ForumProfile }) {
  const id = useSearchParams()?.get("id") ?? "";
  const router = useRouter();
  const post = useQuery<ForumPostDetail | null>(`forum-post:${id}`, () => (id ? getForumPost(id) : Promise.resolve(null)));
  const loaded = useQuery<ForumComment[]>(`forum-comments:${id}`, () => (id ? listForumComments(id) : Promise.resolve([])));
  const [fresh, setFresh] = useState<ForumComment[] | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const comments = fresh ?? (loaded.status === "success" ? loaded.data : null);

  async function reload() {
    setFresh(await listForumComments(id));
  }

  async function send() {
    if (busy || !text.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await createForumComment(id, text);
      setText("");
      await reload();
    } catch (err) {
      console.error(err);
      setError(forumErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function removeComment(commentId: string) {
    if (!window.confirm("Xóa bình luận này?")) return;
    setError(null);
    try {
      await deleteForumComment(commentId);
      await reload();
    } catch (err) {
      console.error(err);
      setError(forumErrorMessage(err));
    }
  }

  async function removePost() {
    if (!window.confirm("Xóa bài viết này?")) return;
    try {
      await deleteForumPost(id);
      router.replace("/forum/");
    } catch (err) {
      console.error(err);
      setError(forumErrorMessage(err));
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      void send();
    }
  }

  const back = (
    <Link
      href="/forum/"
      className="group inline-flex items-center gap-1 rounded-full bg-slate-100 py-1.5 pl-2 pr-3.5 text-[13px] font-medium text-slate-700 transition hover:bg-slate-200 active:scale-95"
    >
      <ChevronLeftIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      Diễn đàn
    </Link>
  );

  if (post.status === "loading") return <div className="shimmer mx-auto h-48 max-w-2xl rounded-2xl" aria-busy="true" />;
  if (post.status === "error") return <ErrorState />;
  if (!post.data) return <EmptyState title="Bài viết không còn tồn tại" href="/forum/" actionLabel="Về diễn đàn" />;

  const p = post.data;
  return (
    <div className="mx-auto w-full max-w-2xl space-y-3">
      {back}
      <article className="post-in rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5">
        <div className="flex items-center gap-2.5">
          <ForumAvatar avatar={p.avatar} size={36} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-slate-950">{p.display_name}</p>
            <p className="text-[11px] text-slate-400" title={new Date(p.created_at).toLocaleString("vi-VN")}>
              {timeAgo(p.created_at)}
            </p>
          </div>
          {p.is_mine && (
            <button
              type="button"
              onClick={removePost}
              aria-label="Xóa bài viết"
              title="Xóa bài viết"
              className="grid h-8 w-8 place-items-center rounded-lg text-slate-300 transition hover:bg-red-50 hover:text-red-600 active:scale-90"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          )}
        </div>
        <h2 className="mt-3 break-words text-lg font-semibold leading-snug text-slate-950 sm:text-xl">{p.title}</h2>
        <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-slate-700">{p.body}</p>
        <div className="mt-3 border-t border-slate-100 pt-1.5">
          <ReactionBar
            key={`${p.id}:${JSON.stringify(p.reactions)}:${p.my_reaction ?? ""}`}
            target="post"
            id={p.id}
            reactions={p.reactions}
            mine={p.my_reaction}
            disabled={profile.blocked}
          />
        </div>
      </article>

      <section className="space-y-2.5">
        <h3 className="flex items-center gap-1.5 text-sm font-semibold text-slate-950">
          <ChatIcon className="h-4 w-4" />
          {comments?.length ?? 0}
        </h3>

        {loaded.status === "error" && !fresh && <ErrorState />}
        {loaded.status === "loading" && !fresh && <div className="shimmer h-16 rounded-2xl" aria-busy="true" />}
        {comments?.map((c, index) => (
          <div key={c.id} style={{ "--i": index } as React.CSSProperties} className="post-in flex gap-2.5">
            <ForumAvatar avatar={c.avatar} size={30} />
            <div className="min-w-0 flex-1">
              <div className="rounded-2xl rounded-tl-md bg-slate-100/80 px-3.5 py-2.5">
              <div className="flex items-center gap-2">
                <p className="truncate text-[13px] font-semibold text-slate-950">{c.display_name}</p>
                {c.is_author && <span className="shrink-0 rounded-full bg-black px-1.5 py-px text-[10px] font-medium text-white">Chủ bài</span>}
                <span className="shrink-0 text-[11px] text-slate-400">{timeAgo(c.created_at)}</span>
                {c.is_mine && (
                  <button
                    type="button"
                    onClick={() => removeComment(c.id)}
                    aria-label="Xóa bình luận"
                    title="Xóa bình luận"
                    className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p className="mt-0.5 whitespace-pre-line break-words text-[13px] leading-relaxed text-slate-700">{c.body}</p>
              </div>
              <div className="mt-0.5 pl-1.5">
                <ReactionBar
                  key={`${c.id}:${JSON.stringify(c.reactions)}:${c.my_reaction ?? ""}`}
                  compact
                  target="comment"
                  id={c.id}
                  reactions={c.reactions}
                  mine={c.my_reaction}
                  disabled={profile.blocked}
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {error && <FormMessage kind="error">{error}</FormMessage>}

      {!profile.blocked && (
        <div className="sticky bottom-3 flex items-end gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_10px_34px_-12px_rgba(0,0,0,.28)] backdrop-blur transition focus-within:border-slate-300">
          <ForumAvatar avatar={profile.avatar} size={32} />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            maxLength={FORUM_COMMENT_MAX}
            rows={1}
            placeholder="Viết bình luận…"
            aria-label="Bình luận"
            className={`${inputClass} max-h-40 min-h-[38px] flex-1 resize-none py-2`}
          />
          <button
            type="button"
            onClick={() => void send()}
            disabled={busy || !text.trim()}
            aria-label="Gửi bình luận"
            title="Gửi bình luận"
            className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-xl bg-black text-white transition hover:bg-neutral-800 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <SendIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
