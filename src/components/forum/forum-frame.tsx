"use client";

import Link from "next/link";
import { Fragment, useState, type ReactNode } from "react";
import { AuthGate } from "@/components/auth-gate";
import { ForumAvatar } from "@/components/forum/forum-avatar";
import { ChatIcon } from "@/components/forum/forum-icons";
import { ProfilePicker } from "@/components/forum/profile-picker";
import { FormMessage } from "@/components/ui/form";
import { ErrorState } from "@/components/ui/states";
import { Modal } from "@/components/utilities/modal";
import { useQuery } from "@/hooks/use-query";
import { getMyForumProfile, type ForumProfile } from "@/services/forum-service";

/** Khung chung của diễn đàn: bắt buộc đăng nhập, lần đầu vào thì chọn nhân vật, có nút đổi nhân vật. */
export function ForumFrame({ children }: { children: (profile: ForumProfile) => ReactNode }) {
  return <AuthGate>{() => <ProfileGate>{children}</ProfileGate>}</AuthGate>;
}

function ProfileGate({ children }: { children: (profile: ForumProfile) => ReactNode }) {
  const initial = useQuery("forum-profile", getMyForumProfile);
  const [saved, setSaved] = useState<ForumProfile | null>(null);
  const [editing, setEditing] = useState(false);

  const profile = saved ?? (initial.status === "success" ? initial.data : null);

  if (!saved && initial.status === "loading") return <div className="h-40 animate-pulse rounded-2xl bg-slate-100" aria-busy="true" />;
  if (!saved && initial.status === "error") return <ErrorState />;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
        <Link href="/forum/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-black text-white">
            <ChatIcon className="h-5 w-5" />
          </span>
          <h1 className="truncate text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Giangho Forum</h1>
        </Link>
        {profile && (
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label="Đổi nhân vật"
            className="group flex max-w-[12rem] shrink-0 items-center gap-2 rounded-full bg-slate-100 py-1 pl-1 pr-4 text-sm font-medium text-slate-800 transition hover:bg-slate-200"
          >
            <ForumAvatar avatar={profile.avatar} size={32} />
            <span className="truncate">{profile.display_name}</span>
          </button>
        )}
      </div>

      {profile ? (
        <div className="space-y-4">
          {profile.blocked && <FormMessage kind="error">Tài khoản của bạn đã bị chặn đăng bài và bình luận.</FormMessage>}
          {/* Đổi tên / avatar xong thì nội dung bên dưới tải lại để hiện đúng nhân vật mới. */}
          <Fragment key={`${profile.display_name}|${profile.avatar}`}>{children(profile)}</Fragment>
        </div>
      ) : (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="mb-6 text-center text-xl font-semibold tracking-tight text-slate-950">Chọn nhân vật</h2>
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
