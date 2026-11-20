"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type KeyboardEvent } from "react";
import { ForumAvatar } from "@/components/forum/forum-avatar";
import { ForumFrame } from "@/components/forum/forum-frame";
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
    <Link href="/forum/" className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-black">
      <ChevronLeftIcon className="h-4 w-4" />
      Diễn đàn
    </Link>
  );

  if (post.status === "loading") return <div className="h-48 animate-pulse rounded-2xl bg-slate-100" aria-busy="true" />;
  if (post.status === "error") return <ErrorState />;
  if (!post.data) return <EmptyState title="Bài viết không còn tồn tại" href="/forum/" actionLabel="Về diễn đàn" />;

  const p = post.data;
  return (
    <>
      {back}
      <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <ForumAvatar avatar={p.avatar} size={44} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-950">{p.display_name}</p>
            <p className="text-xs text-slate-500">{timeAgo(p.created_at)}</p>
          </div>
          {p.is_mine && (
            <button
              type="button"
              onClick={removePost}
              aria-label="Xóa bài viết"
              title="Xóa bài viết"
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            >
              <TrashIcon className="h-[18px] w-[18px]" />
            </button>
          )}
        </div>
        <h2 className="mt-4 break-words text-xl font-semibold text-slate-950 sm:text-2xl">{p.title}</h2>
        <p className="mt-3 whitespace-pre-line break-words text-[15px] leading-relaxed text-slate-700">{p.body}</p>
      </article>

      <section className="space-y-3">
        <h3 className="flex items-center gap-2 text-base font-semibold text-slate-950">
          <ChatIcon className="h-5 w-5" />
          {comments?.length ?? 0}
        </h3>

        {loaded.status === "error" && !fresh && <ErrorState />}
        {comments?.map((c) => (
          <div key={c.id} className="flex gap-3">
            <ForumAvatar avatar={c.avatar} size={36} />
            <div className="min-w-0 flex-1 rounded-2xl bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-slate-950">{c.display_name}</p>
                {c.is_author && <span className="shrink-0 rounded-full bg-black px-2 py-0.5 text-[11px] font-medium text-white">Chủ bài</span>}
                <span className="shrink-0 text-xs text-slate-500">{timeAgo(c.created_at)}</span>
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
              <p className="mt-1 whitespace-pre-line break-words text-sm text-slate-700">{c.body}</p>
            </div>
          </div>
        ))}
      </section>

      {error && <FormMessage kind="error">{error}</FormMessage>}

      {!profile.blocked && (
        <div className="sticky bottom-3 flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-lg">
          <ForumAvatar avatar={profile.avatar} size={36} />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            maxLength={FORUM_COMMENT_MAX}
            rows={1}
            placeholder="Viết bình luận…"
            aria-label="Bình luận"
            className={`${inputClass} max-h-40 min-h-[40px] flex-1 resize-none py-2`}
          />
          <button
            type="button"
            onClick={() => void send()}
            disabled={busy || !text.trim()}
            aria-label="Gửi bình luận"
            title="Gửi bình luận"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendIcon className="h-[18px] w-[18px]" />
          </button>
        </div>
      )}
    </>
  );
}
