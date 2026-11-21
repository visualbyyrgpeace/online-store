import type { Metadata } from "next";
import { Suspense } from "react";
import { ForumPostView } from "@/components/forum/forum-post-view";

export const metadata: Metadata = { title: "Giangho Forum" };

export default function Page() {
  return (
    <Suspense fallback={<div className="shimmer h-40 rounded-2xl" />}>
      <ForumPostView />
    </Suspense>
  );
}
