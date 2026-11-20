"use client";

import { useState } from "react";
import { AVATAR_GLYPHS } from "@/components/forum/forum-icons";
import { DEFAULT_AVATAR, avatarFileUrl, avatarOf } from "@/lib/forum-avatars";

/** Avatar tròn: ảnh có sẵn trong thư mục public/avatars hoặc hình icon có sẵn của web (không có ảnh người dùng tải lên). */
export function ForumAvatar({ avatar, size = 40 }: { avatar: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const url = avatarFileUrl(avatar);

  if (url && !failed) {
    return (
      <span aria-hidden="true" style={{ width: size, height: size }} className="block shrink-0 overflow-hidden rounded-full bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="" width={size} height={size} onError={() => setFailed(true)} className="h-full w-full object-cover" />
      </span>
    );
  }

  const option = avatarOf(url ? DEFAULT_AVATAR : avatar);
  const glyph = AVATAR_GLYPHS[option.glyph];
  return (
    <span aria-hidden="true" style={{ width: size, height: size }} className={`grid shrink-0 place-items-center rounded-full ${option.tone}`}>
      {glyph ? glyph({ className: "h-[55%] w-[55%]" }) : null}
    </span>
  );
}
