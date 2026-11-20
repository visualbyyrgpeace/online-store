"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { BanIcon, ChatIcon, EyeIcon, EyeOffIcon, TypeIcon, UserIcon } from "@/components/forum/forum-icons";
import { FormMessage, inputClass, primaryButton, secondaryButton } from "@/components/ui/form";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { Modal } from "@/components/utilities/modal";
import { ClipboardIcon, CloseIcon, PlusIcon, TrashIcon } from "@/components/utilities/tool-icons";
import { useQuery } from "@/hooks/use-query";
import {
  adminAddBannedWord,
  adminAddForumName,
  adminListBannedWords,
  adminListBlockedUsers,
  adminListForumComments,
  adminListForumPosts,
  adminRemoveBannedWord,
  adminRemoveForumName,
  adminSetBlocked,
  adminSetHidden,
  deleteForumComment,
  deleteForumPost,
  forumErrorMessage,
  listForumNames,
} from "@/services/forum-service";
import { timeAgo } from "@/utils/time-ago";

const TABS = [
  { key: "posts", label: "Bài viết", Icon: ClipboardIcon },
  { key: "comments", label: "Bình luận", Icon: ChatIcon },
  { key: "words", label: "Từ cấm", Icon: TypeIcon },
  { key: "names", label: "Tên nhân vật", Icon: UserIcon },
  { key: "blocked", label: "Bị chặn", Icon: BanIcon },
] as const;
type TabKey = (typeof TABS)[number]["key"];

export function ForumAdmin() {
  const [tab, setTab] = useState<TabKey>("posts");
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Giangho Forum</h1>
      <div role="tablist" className="flex gap-2 overflow-x-auto">
        {TABS.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition ${
              tab === key ? "bg-brand-600 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
      {tab === "posts" && <ContentTab kind="post" />}
      {tab === "comments" && <ContentTab kind="comment" />}
      {tab === "words" && <WordsTab />}
      {tab === "names" && <NamesTab />}
      {tab === "blocked" && <BlockedTab />}
    </div>
  );
}

/** Chạy một thao tác, báo lỗi thân thiện, rồi tải lại danh sách. */
function useRunner(reload: () => void) {
  const [error, setError] = useState<string | null>(null);
  async function run(action: () => Promise<void>) {
    setError(null);
    try {
      await action();
      reload();
    } catch (err) {
      console.error(err);
      setError(forumErrorMessage(err));
    }
  }
  return { error, run };
}

function IconButton({ label, onClick, danger, children }: { label: string; onClick: () => void; danger?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid h-9 w-9 place-items-center rounded-lg border transition ${
        danger ? "border-red-200 text-red-600 hover:bg-red-50" : "border-slate-200 text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}

// ---------- Bài viết / bình luận ----------
type Row = {
  id: string;
  userId: string;
  name: string;
  email: string;
  createdAt: string;
  heading?: string;
  text: string;
  hidden: boolean;
  blocked: boolean;
};

function ContentTab({ kind }: { kind: "post" | "comment" }) {
  const [version, setVersion] = useState(0);
  const [target, setTarget] = useState<{ userId: string; name: string } | null>(null);
  const { error, run } = useRunner(() => setVersion((v) => v + 1));
  const state = useQuery(`forum-admin-${kind}:${version}`, async (): Promise<Row[]> => {
    if (kind === "post") {
      return (await adminListForumPosts()).map((p) => ({
        id: p.id, userId: p.author_id, name: p.display_name, email: p.author_email, createdAt: p.created_at,
        heading: p.title, text: p.excerpt, hidden: p.hidden, blocked: p.author_blocked,
      }));
    }
    return (await adminListForumComments()).map((c) => ({
      id: c.id, userId: c.author_id, name: c.display_name, email: c.author_email, createdAt: c.created_at,
      heading: c.post_title, text: c.body, hidden: c.hidden, blocked: c.author_blocked,
    }));
  });

  return (
    <div className="space-y-4">
      {error && <FormMessage kind="error">{error}</FormMessage>}
      {state.status === "loading" && <div className="h-32 animate-pulse rounded-2xl bg-slate-100" aria-busy="true" />}
      {state.status === "error" && <ErrorState />}
      {state.status === "success" && state.data.length === 0 && <EmptyState title="Chưa có nội dung" />}
      {state.status === "success" && state.data.length > 0 && (
        <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {state.data.map((row) => (
            <li key={row.id} className={`flex items-start gap-3 p-4 ${row.hidden ? "bg-slate-50" : ""}`}>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  <span className="font-semibold text-slate-950">{row.name}</span>
                  <span className="text-slate-500">{row.email}</span>
                  <span className="text-xs text-slate-400">{timeAgo(row.createdAt)}</span>
                  {row.hidden && <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-700">Đã ẩn</span>}
                  {row.blocked && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-medium text-red-700">Bị chặn</span>}
                </div>
                {row.heading && <p className="break-words text-sm font-medium text-slate-800">{row.heading}</p>}
                <p className="line-clamp-3 whitespace-pre-line break-words text-sm text-slate-600">{row.text}</p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <IconButton label={row.hidden ? "Hiện lại" : "Ẩn"} onClick={() => run(() => adminSetHidden(kind, row.id, !row.hidden))}>
                  {row.hidden ? <EyeIcon className="h-[18px] w-[18px]" /> : <EyeOffIcon className="h-[18px] w-[18px]" />}
                </IconButton>
                <IconButton
                  label={row.blocked ? "Bỏ chặn" : "Chặn người dùng"}
                  onClick={() => (row.blocked ? run(() => adminSetBlocked(row.userId, false)) : setTarget({ userId: row.userId, name: row.name }))}
                >
                  <BanIcon className="h-[18px] w-[18px]" />
                </IconButton>
                <IconButton
                  label="Xóa"
                  danger
                  onClick={() => {
                    if (!window.confirm("Xóa vĩnh viễn nội dung này?")) return;
                    void run(() => (kind === "post" ? deleteForumPost(row.id) : deleteForumComment(row.id)));
                  }}
                >
                  <TrashIcon className="h-[18px] w-[18px]" />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Modal open={target !== null} onClose={() => setTarget(null)} title="Chặn người dùng" description={target?.name}>
        {target && (
          <BlockForm
            onCancel={() => setTarget(null)}
            onConfirm={(reason, hide) => {
              const userId = target.userId;
              setTarget(null);
              void run(() => adminSetBlocked(userId, true, reason, hide));
            }}
          />
        )}
      </Modal>
    </div>
  );
}

function BlockForm({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: (reason: string, hide: boolean) => void }) {
  const [reason, setReason] = useState("");
  const [hide, setHide] = useState(false);
  return (
    <form
      className="space-y-4"
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        onConfirm(reason, hide);
      }}
    >
      <input value={reason} onChange={(e) => setReason(e.target.value)} maxLength={300} placeholder="Lý do" aria-label="Lý do" className={inputClass} />
      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
        <input type="checkbox" checked={hide} onChange={(e) => setHide(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-black" />
        Ẩn toàn bộ bài viết và bình luận của người này
      </label>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className={secondaryButton}>Hủy</button>
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700">
          <BanIcon className="h-4 w-4" />
          Chặn
        </button>
      </div>
    </form>
  );
}

// ---------- Danh sách chip dùng chung cho từ cấm và tên nhân vật ----------
function ChipEditor({
  items,
  placeholder,
  maxLength,
  onAdd,
  onRemove,
}: {
  items: { id: number; label: string }[];
  placeholder: string;
  maxLength: number;
  onAdd: (text: string) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
}) {
  const [text, setText] = useState("");
  return (
    <div className="space-y-4">
      <form
        className="flex gap-2"
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          const value = text.trim();
          if (!value) return;
          setText("");
          void onAdd(value);
        }}
      >
        <input value={text} onChange={(e) => setText(e.target.value)} maxLength={maxLength} placeholder={placeholder} aria-label={placeholder} className={inputClass} />
        <button type="submit" disabled={!text.trim()} aria-label="Thêm" title="Thêm" className={`${primaryButton} shrink-0`}>
          <PlusIcon className="h-4 w-4" />
          Thêm
        </button>
      </form>
      {items.length === 0 ? (
        <EmptyState title="Danh sách trống" />
      ) : (
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item.id} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white py-1.5 pl-3.5 pr-1.5 text-sm text-slate-800">
              {item.label}
              <button
                type="button"
                onClick={() => void onRemove(item.id)}
                aria-label={`Xóa ${item.label}`}
                title="Xóa"
                className="grid h-6 w-6 place-items-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              >
                <CloseIcon className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function WordsTab() {
  const [version, setVersion] = useState(0);
  const { error, run } = useRunner(() => setVersion((v) => v + 1));
  const state = useQuery(`forum-admin-words:${version}`, adminListBannedWords);
  return (
    <div className="space-y-4">
      {error && <FormMessage kind="error">{error}</FormMessage>}
      {state.status === "loading" && <div className="h-24 animate-pulse rounded-2xl bg-slate-100" aria-busy="true" />}
      {state.status === "error" && <ErrorState />}
      {state.status === "success" && (
        <ChipEditor
          items={state.data.map((w) => ({ id: w.id, label: w.word }))}
          placeholder="Từ hoặc cụm từ cấm"
          maxLength={60}
          onAdd={(word) => run(() => adminAddBannedWord(word))}
          onRemove={(id) => run(() => adminRemoveBannedWord(id))}
        />
      )}
    </div>
  );
}

function NamesTab() {
  const [version, setVersion] = useState(0);
  const { error, run } = useRunner(() => setVersion((v) => v + 1));
  const state = useQuery(`forum-admin-names:${version}`, listForumNames);
  return (
    <div className="space-y-4">
      {error && <FormMessage kind="error">{error}</FormMessage>}
      {state.status === "loading" && <div className="h-24 animate-pulse rounded-2xl bg-slate-100" aria-busy="true" />}
      {state.status === "error" && <ErrorState />}
      {state.status === "success" && (
        <ChipEditor
          items={state.data.map((n) => ({ id: n.id, label: n.name }))}
          placeholder="Tên nhân vật mới"
          maxLength={40}
          onAdd={(name) => run(() => adminAddForumName(name))}
          onRemove={(id) => run(() => adminRemoveForumName(id))}
        />
      )}
    </div>
  );
}

// ---------- Người bị chặn ----------
function BlockedTab() {
  const [version, setVersion] = useState(0);
  const { error, run } = useRunner(() => setVersion((v) => v + 1));
  const state = useQuery(`forum-admin-blocked:${version}`, adminListBlockedUsers);
  return (
    <div className="space-y-4">
      {error && <FormMessage kind="error">{error}</FormMessage>}
      {state.status === "loading" && <div className="h-24 animate-pulse rounded-2xl bg-slate-100" aria-busy="true" />}
      {state.status === "error" && <ErrorState />}
      {state.status === "success" && state.data.length === 0 && <EmptyState title="Chưa chặn ai" />}
      {state.status === "success" && state.data.length > 0 && (
        <ul className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {state.data.map((u) => (
            <li key={u.user_id} className="flex items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">
                  <span className="font-semibold text-slate-950">{u.display_name}</span>
                  <span className="ml-2 text-slate-500">{u.email}</span>
                </p>
                <p className="text-xs text-slate-500">
                  {timeAgo(u.blocked_at)}
                  {u.blocked_reason ? ` · ${u.blocked_reason}` : ""}
                </p>
              </div>
              <button type="button" onClick={() => void run(() => adminSetBlocked(u.user_id, false))} className={secondaryButton}>
                Bỏ chặn
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
