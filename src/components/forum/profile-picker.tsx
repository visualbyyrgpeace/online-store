"use client";

import { useState } from "react";
import { ForumAvatar } from "@/components/forum/forum-avatar";
import { ArrowRightIcon, CheckIcon } from "@/components/utilities/tool-icons";
import { FormMessage } from "@/components/ui/form";
import { useQuery } from "@/hooks/use-query";
import { ALL_AVATAR_KEYS, DEFAULT_AVATAR } from "@/lib/forum-avatars";
import { forumErrorMessage, listForumNames, saveForumProfile, type ForumProfile } from "@/services/forum-service";

/** Chọn tên nhân vật (trong danh sách do admin đặt) và avatar (trong bộ có sẵn). */
export function ProfilePicker({
  initial,
  submitLabel,
  onSaved,
}: {
  initial: ForumProfile | null;
  submitLabel: string;
  onSaved: (profile: ForumProfile) => void;
}) {
  const names = useQuery("forum-names", listForumNames);
  const [name, setName] = useState(initial?.display_name ?? "");
  const [avatar, setAvatar] = useState(initial && ALL_AVATAR_KEYS.includes(initial.avatar) ? initial.avatar : DEFAULT_AVATAR);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!name || busy) return;
    setBusy(true);
    setError(null);
    try {
      await saveForumProfile(name, avatar);
      onSaved({ display_name: name, avatar, blocked: false });
    } catch (err) {
      console.error(err);
      setError(forumErrorMessage(err));
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Xem trước nhân vật */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-5 py-5 text-white sm:px-7">
        <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <span className="rounded-full p-1.5 ring-2 ring-white/60">
            <ForumAvatar avatar={avatar} size={72} />
          </span>
          <p className={`min-w-0 break-words text-xl font-semibold tracking-tight sm:text-2xl ${name ? "text-white" : "text-white/30"}`}>
            {name || "Tên nhân vật"}
          </p>
        </div>
      </div>

      {/* Tên nhân vật */}
      <section>
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Tên nhân vật</h3>
        {names.status === "loading" && (
          <div className="flex flex-wrap gap-2" aria-busy="true">
            {[88, 104, 128, 96, 112, 80].map((w) => (
              <div key={w} style={{ width: w }} className="h-10 animate-pulse rounded-full bg-slate-100" />
            ))}
          </div>
        )}
        {names.status === "error" && <FormMessage kind="error">Không tải được danh sách tên.</FormMessage>}
        {names.status === "success" && (
          <div className="flex flex-wrap gap-2">
            {names.data.map((item) => {
              const selected = item.name === name;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setName(item.name)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                    selected ? "bg-black text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {selected && <CheckIcon className="h-4 w-4" />}
                  {item.name}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Avatar */}
      <section>
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Avatar</h3>
        <div className="grid grid-cols-4 gap-x-2 gap-y-3 sm:grid-cols-6">
          {ALL_AVATAR_KEYS.map((key, index) => {
            const selected = avatar === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                aria-label={`Avatar ${index + 1}`}
                onClick={() => setAvatar(key)}
                className={`relative mx-auto rounded-full p-1 transition duration-150 ${
                  selected ? "ring-2 ring-black ring-offset-2" : "opacity-80 hover:scale-105 hover:opacity-100"
                }`}
              >
                <ForumAvatar avatar={key} size={60} />
                {selected && (
                  <span className="absolute -bottom-0.5 -right-0.5 grid h-6 w-6 place-items-center rounded-full bg-black text-white ring-2 ring-white">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {error && <FormMessage kind="error">{error}</FormMessage>}
      <button
        type="button"
        onClick={submit}
        disabled={!name || busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold active:scale-[.98] text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitLabel}
        <ArrowRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
