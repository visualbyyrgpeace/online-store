"use client";

import { useState } from "react";
import { ForumAvatar } from "@/components/forum/forum-avatar";
import { CheckIcon } from "@/components/utilities/tool-icons";
import { FormMessage, primaryButton } from "@/components/ui/form";
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
    <div className="space-y-7">
      <div className="flex flex-col items-center rounded-3xl bg-slate-50 px-4 pb-6 pt-7">
        <div key={avatar} className="reaction-pop rounded-full bg-white p-1.5 shadow-md ring-1 ring-slate-200">
          <ForumAvatar avatar={avatar} size={96} />
        </div>
        {name ? (
          <p className="mt-4 max-w-full truncate text-xl font-semibold tracking-tight text-slate-950">{name}</p>
        ) : (
          <span className="mt-4 h-5 w-32 rounded-full bg-slate-200" aria-hidden="true" />
        )}
      </div>

      <section aria-label="Tên nhân vật">
        {names.status === "loading" && (
          <div className="flex flex-wrap justify-center gap-2" aria-busy="true">
            {[88, 104, 72, 96, 80, 112].map((w, i) => (
              <span key={i} style={{ width: w }} className="h-10 animate-pulse rounded-full bg-slate-100" />
            ))}
          </div>
        )}
        {names.status === "error" && <FormMessage kind="error">Không tải được danh sách tên.</FormMessage>}
        {names.status === "success" && (
          <div className="flex flex-wrap justify-center gap-2">
            {names.data.map((item) => {
              const selected = item.name === name;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setName(item.name)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
                    selected
                      ? "bg-black text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        )}
      </section>

      <section aria-label="Avatar">
        <div className="grid grid-cols-5 gap-3 px-1.5 sm:gap-4">
          {ALL_AVATAR_KEYS.map((key, index) => {
            const selected = avatar === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                aria-label={`Avatar ${index + 1}`}
                onClick={() => setAvatar(key)}
                className={`relative rounded-2xl outline-none transition duration-200 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                  selected ? "ring-2 ring-black ring-offset-2" : "opacity-80 hover:-translate-y-0.5 hover:opacity-100 hover:shadow-lg"
                }`}
              >
                <ForumAvatar avatar={key} size="full" shape="squircle" />
                {selected && (
                  <span className="reaction-pop absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black text-white ring-2 ring-white">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {error && <FormMessage kind="error">{error}</FormMessage>}
      <button type="button" onClick={submit} disabled={!name || busy} className={`${primaryButton} w-full rounded-2xl py-3.5 text-[15px]`}>
        {submitLabel}
      </button>
    </div>
  );
}
