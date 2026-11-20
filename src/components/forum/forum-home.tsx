"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ForumAvatar } from "@/components/forum/forum-avatar";
import { ForumFrame } from "@/components/forum/forum-frame";
import { ChatIcon, SendIcon } from "@/components/forum/forum-icons";
import { FormMessage, inputClass, primaryButton, secondaryButton } from "@/components/ui/form";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { Modal } from "@/components/utilities/modal";
import { RefreshIcon, TrashIcon } from "@/components/utilities/tool-icons";
import { useQuery } from "@/hooks/use-query";
import {
  FORUM_POST_MAX,
  FORUM_TITLE_MAX,
  createForumPost,
  deleteForumPost,
  forumErrorMessage,
  listForumPosts,
  type ForumPostItem,
  type ForumProfile,
} from "@/services/forum-service";
import { timeAgo } from "@/utils/time-ago";

export function ForumHome() {
  return <ForumFrame>{(profile) => <Feed profile={profile} />}</ForumFrame>;
}

type MorePages = { version: number; items: ForumPostItem[]; hasMore: boolean };

function Feed({ profile }: { profile: ForumProfile }) {
  const [version, setVersion] = useState(0);
  const [composing, setComposing] = useState(false);
  const [more, setMore] = useState<MorePages | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const first = useQuery(`forum-feed:${version}`, () => listForumPosts(null));

  const extra = more && more.version === version ? more : null;
  const items = first.status === "success" ? [...first.data.items, ...(extra?.items ?? [])] : [];
  const hasMore = extra ? extra.hasMore : first.status === "success" && first.data.hasMore;

  async function loadMore() {
    const last = items[items.length - 1];
    if (!last || loadingMore) return;
    setLoadingMore(true);
    setError(null);
    try {
      const page = await listForumPosts({ before: last.created_at, beforeId: last.id });
      setMore({ version, items: [...(extra?.items ?? []), ...page.items], hasMore: page.hasMore });
    } catch (err) {
      console.error(err);
      setError(forumErrorMessage(err));
    } finally {
      setLoadingMore(false);
    }
  }

  async function remove(post: ForumPostItem) {
    if (!window.confirm("Xóa bài viết này?")) return;
    setError(null);
    try {
      await deleteForumPost(post.id);
      setVersion((v) => v + 1);
    } catch (err) {
      console.error(err);
      setError(forumErrorMessage(err));
    }
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setComposing(true)}
          disabled={profile.blocked}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-slate-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ForumAvatar avatar={profile.avatar} size={36} />
          <span className="truncate text-sm text-slate-500">Viết bài mới…</span>
        </button>
        <button
          type="button"
          onClick={() => setVersion((v) => v + 1)}
          aria-label="Làm mới"
          title="Làm mới"
          className="grid h-[60px] w-[60px] shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshIcon className="h-5 w-5" />
        </button>
      </div>

      {error && <FormMessage kind="error">{error}</FormMessage>}

      {first.status === "loading" && (
        <div className="space-y-4" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-36 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      )}
      {first.status === "error" && <ErrorState />}
      {first.status === "success" && items.length === 0 && <EmptyState title="Chưa có bài viết nào" />}

      {items.map((post) => (
        <article key={post.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 sm:p-5">
          <div className="flex items-center gap-3">
            <ForumAvatar avatar={post.avatar} size={40} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-950">{post.display_name}</p>
              <p className="text-xs text-slate-500">{timeAgo(post.created_at)}</p>
            </div>
            {post.is_mine && (
              <button
                type="button"
                onClick={() => remove(post)}
                aria-label="Xóa bài viết"
                title="Xóa bài viết"
                className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              >
                <TrashIcon className="h-[18px] w-[18px]" />
              </button>
            )}
          </div>
          <Link href={`/forum/post/?id=${post.id}`} className="mt-3 block">
            <h2 className="break-words text-base font-semibold text-slate-950">{post.title}</h2>
            <p className="mt-1 line-clamp-3 whitespace-pre-line break-words text-sm text-slate-600">{post.excerpt}</p>
          </Link>
          <Link
            href={`/forum/post/?id=${post.id}`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-black"
          >
            <ChatIcon className="h-4 w-4" />
            {post.comment_count}
          </Link>
        </article>
      ))}

      {hasMore && (
        <div className="flex justify-center pt-2">
          <button type="button" onClick={loadMore} disabled={loadingMore} className={secondaryButton}>
            {loadingMore ? "Đang tải…" : "Xem thêm"}
          </button>
        </div>
      )}

      <Modal open={composing} onClose={() => setComposing(false)} title="Bài viết mới">
        <ComposeForm
          onPosted={() => {
            setComposing(false);
            setVersion((v) => v + 1);
          }}
        />
      </Modal>
    </>
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
    <form onSubmit={submit} className="space-y-4">
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
        rows={8}
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
