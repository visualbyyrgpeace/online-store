"use client";

import Link from "next/link";
import { Fragment, useState, type ReactNode } from "react";
import { AuthGate } from "@/components/auth-gate";
import { ForumAvatar } from "@/components/forum/forum-avatar";
import { ChatIcon } from "@/components/forum/forum-icons";
import { ForumMusicBar } from "@/components/forum/forum-music";
import { ProfilePicker } from "@/components/forum/profile-picker";
import { FormMessage } from "@/components/ui/form";
import { ErrorState } from "@/components/ui/states";
import { Modal } from "@/components/utilities/modal";
import { useQuery } from "@/hooks/use-query";
import { getMyForumProfile, type ForumProfile } from "@/services/forum-service";

/** Khung chung của diễn đàn: bắt buộc đăng nhập, lần đầu vào thì chọn nhân vật, có nút đổi nhân vật. */
export function ForumFrame({ children, hideMusic = false }: { children: (profile: ForumProfile) => ReactNode; hideMusic?: boolean }) {
  return <AuthGate>{() => <ProfileGate hideMusic={hideMusic}>{children}</ProfileGate>}</AuthGate>;
}

function ProfileGate({ children, hideMusic }: { children: (profile: ForumProfile) => ReactNode; hideMusic: boolean }) {
  const initial = useQuery("forum-profile", getMyForumProfile);
  const [saved, setSaved] = useState<ForumProfile | null>(null);
  const [editing, setEditing] = useState(false);

  const profile = saved ?? (initial.status === "success" ? initial.data : null);

  if (!saved && initial.status === "loading") return <div className="shimmer h-40 rounded-2xl" aria-busy="true" />;
  if (!saved && initial.status === "error") return <ErrorState />;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col items-start gap-2">
          <Link href="/forum/" className="group flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-black text-white transition-transform duration-300 group-hover:-rotate-6 group-active:scale-90">
              <ChatIcon className="h-[18px] w-[18px]" />
            </span>
            <h1 className="truncate text-xl font-semibold tracking-tight text-slate-950">Giangho Forum</h1>
          </Link>
          {profile && !hideMusic && <ForumMusicBar />}
        </div>
        {profile && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label="Đổi nhân vật"
            title="Đổi nhân vật"
            className="flex max-w-[11rem] shrink-0 items-center gap-2 rounded-full bg-slate-100 py-1 pl-1 pr-3.5 text-[13px] font-medium text-slate-800 transition hover:bg-slate-200 active:scale-95"
          >
            <ForumAvatar avatar={profile.avatar} size={28} />
            <span className="truncate">{profile.display_name}</span>
          </button>
        )}
      </div>

      {profile ? (
        <div className="space-y-3">
          {profile.blocked && <FormMessage kind="error">Tài khoản của bạn đã bị chặn đăng bài và bình luận.</FormMessage>}
          {/* Đổi tên / avatar xong thì nội dung bên dưới tải lại để hiện đúng nhân vật mới. */}
          <Fragment key={`${profile.display_name}|${profile.avatar}`}>{children(profile)}</Fragment>
        </div>
      ) : (
        <div className="post-in mx-auto max-w-xl rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6">
          <h2 className="mb-5 text-center text-lg font-semibold tracking-tight text-slate-950">Chọn nhân vật</h2>
          <ProfilePicker initial={null} submitLabel="Vào diễn đàn" onSaved={setSaved} />
        </div>
      )}

      <Modal open={editing} onClose={() => setEditing(false)} title="Đổi nhân vật">
        <ProfilePicker
          initial={profile}
          submitLabel="Lưu"
          onSaved={(next) => {
            setSaved(next);
            setEditing(false);
          }}
        />
      </Modal>
    </div>
  );
}
