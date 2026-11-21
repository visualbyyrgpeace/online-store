"use client";

import Link from "next/link";
import { ForumAvatar } from "@/components/forum/forum-avatar";
import { ChatIcon } from "@/components/forum/forum-icons";
import { ReactionBar } from "@/components/forum/forum-reactions";
import { TrashIcon } from "@/components/utilities/tool-icons";
import { formatClock } from "@/lib/forum-days";
import type { ForumPostItem } from "@/services/forum-service";
import { timeAgo } from "@/utils/time-ago";

/** Thẻ bài viết gọn: dùng cho bài hôm nay và cho bảng xem lại từng ngày. */
export function ForumPostCard({
  post,
  index = 0,
  blocked,
  clock = false,
  onDelete,
}: {
  post: ForumPostItem;
  index?: number;
  blocked: boolean;
  /** true: hiện giờ (14:32) thay vì "3 giờ trước". */
  clock?: boolean;
  onDelete?: (post: ForumPostItem) => void;
}) {
  const href = `/forum/post/?id=${post.id}`;
  return (
    <article
      style={{ "--i": index } as React.CSSProperties}
      className="post-in rounded-2xl border border-slate-200/80 bg-white p-3.5 transition duration-200 hover:border-slate-300 hover:shadow-[0_8px_28px_-14px_rgba(0,0,0,.22)]"
    >
      <div className="flex items-center gap-2.5">
        <ForumAvatar avatar={post.avatar} size={32} />
        <div className="flex min-w-0 flex-1 items-baseline gap-2">
          <p className="truncate text-[13px] font-semibold text-slate-950">{post.display_name}</p>
          <p className="shrink-0 text-[11px] text-slate-400" title={new Date(post.created_at).toLocaleString("vi-VN")}>
            {clock ? formatClock(post.created_at) : timeAgo(post.created_at)}
          </p>
        </div>
        {post.is_mine && onDelete && (
          <button
            type="button"
            onClick={() => onDelete(post)}
            aria-label="Xóa bài viết"
            title="Xóa bài viết"
            className="-mr-1 grid h-8 w-8 place-items-center rounded-lg text-slate-300 transition hover:bg-red-50 hover:text-red-600 active:scale-90"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      <Link href={href} className="mt-2 block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-black/20">
        <h2 className="break-words text-[15px] font-semibold leading-snug text-slate-950">{post.title}</h2>
        {post.excerpt && <p className="mt-0.5 line-clamp-2 whitespace-pre-line break-words text-[13px] leading-relaxed text-slate-500">{post.excerpt}</p>}
      </Link>

      <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-100 pt-1.5">
        <ReactionBar
          key={`${post.id}:${JSON.stringify(post.reactions)}:${post.my_reaction ?? ""}`}
          compact
          target="post"
          id={post.id}
          reactions={post.reactions}
          mine={post.my_reaction}
          disabled={blocked}
        />
        <Link
          href={href}
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-black active:scale-95"
        >
          <ChatIcon className="h-4 w-4" />
          {post.comment_count}
        </Link>
      </div>
    </article>
  );
}
