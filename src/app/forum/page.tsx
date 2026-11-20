import type { Metadata } from "next";
import { ForumHome } from "@/components/forum/forum-home";

export const metadata: Metadata = { title: "Giangho Forum" };

export default function Page() {
  return <ForumHome />;
}
