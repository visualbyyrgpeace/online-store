import type { ReactNode } from "react";
import { ForumMusicProvider } from "@/components/forum/forum-music";

/** Layout dùng chung cho /forum và /forum/post: trình phát nhạc nằm ở đây nên không bị ngắt khi chuyển trang trong diễn đàn. */
export default function ForumLayout({ children }: { children: ReactNode }) {
  return <ForumMusicProvider>{children}</ForumMusicProvider>;
}
