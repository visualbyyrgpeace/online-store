import type { Metadata } from "next";
import { Suspense } from "react";
import { ForumPostView } from "@/components/forum/forum-post-view";

export const metadata: Metadata = { title: "Giangho Forum" };

export default function Page() {
  return (
    <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-slate-100" />}>
      <ForumPostView />
    </Suspense>
  );
}
