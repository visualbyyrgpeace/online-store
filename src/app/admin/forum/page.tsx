import type { Metadata } from "next";
import { ForumAdmin } from "@/components/admin/forum-admin";

export const metadata: Metadata = { title: "Giangho Forum" };

export default function Page() {
  return <ForumAdmin />;
}
