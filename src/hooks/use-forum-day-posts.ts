"use client";

import { useState } from "react";
import { useQuery } from "@/hooks/use-query";
import { forumErrorMessage, listForumDay, type ForumPostItem } from "@/services/forum-service";

type More = { scope: string; items: ForumPostItem[]; hasMore: boolean };

/** Bài của một ngày, có "Xem thêm". Đổi `version` để tải lại. */
export function useForumDayPosts(day: string, mine: boolean, version: number) {
  const scope = `${day}:${mine ? "mine" : "all"}:${version}`;
  const first = useQuery(`forum-day:${scope}`, () => listForumDay(day, null, mine));
  const [more, setMore] = useState<More | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extra = more && more.scope === scope ? more : null;
  const items = first.status === "success" ? [...first.data.items, ...(extra?.items ?? [])] : [];
  const hasMore = extra ? extra.hasMore : first.status === "success" && first.data.hasMore;

  async function loadMore() {
    const last = items[items.length - 1];
    if (!last || loadingMore) return;
    setLoadingMore(true);
    setError(null);
    try {
      const page = await listForumDay(day, { before: last.created_at, beforeId: last.id }, mine);
      setMore({ scope, items: [...(extra?.items ?? []), ...page.items], hasMore: page.hasMore });
    } catch (err) {
      console.error(err);
      setError(forumErrorMessage(err));
    } finally {
      setLoadingMore(false);
    }
  }

  return { status: first.status, items, hasMore, loadingMore, error, setError, loadMore };
}
