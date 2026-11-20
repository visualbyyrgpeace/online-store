"use client";

import { useState } from "react";
import { ForumAvatar } from "@/components/forum/forum-avatar";
import { CheckIcon } from "@/components/utilities/tool-icons";
import { FormMessage, primaryButton } from "@/components/ui/form";
import { useQuery } from "@/hooks/use-query";
import { DEFAULT_AVATAR, FORUM_AVATARS } from "@/lib/forum-avatars";
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
  const [avatar, setAvatar] = useState(initial?.avatar ?? DEFAULT_AVATAR);
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
      <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
        <ForumAvatar avatar={avatar} size={56} />
        <p className={`min-w-0 truncate text-lg font-semibold ${name ? "text-slate-950" : "text-slate-400"}`}>{name || "Tên nhân vật"}</p>
      </div>

      <section>
        <h3 className="mb-2.5 text-sm font-medium text-slate-700">Tên nhân vật</h3>
        {names.status === "loading" && <div className="h-20 animate-pulse rounded-xl bg-slate-100" aria-busy="true" />}
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
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-medium transition ${
                    selected ? "border-black bg-black text-white" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
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

      <section>
        <h3 className="mb-2.5 text-sm font-medium text-slate-700">Avatar</h3>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {FORUM_AVATARS.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={avatar === item.key}
              aria-label={`Avatar ${item.glyph}`}
              onClick={() => setAvatar(item.key)}
              className={`grid place-items-center rounded-full p-1 transition ${
                avatar === item.key ? "ring-2 ring-black ring-offset-2" : "hover:scale-105"
              }`}
            >
              <ForumAvatar avatar={item.key} size={44} />
            </button>
          ))}
        </div>
      </section>

      {error && <FormMessage kind="error">{error}</FormMessage>}
      <button type="button" onClick={submit} disabled={!name || busy} className={`${primaryButton} w-full`}>
        {submitLabel}
      </button>
    </div>
  );
}
