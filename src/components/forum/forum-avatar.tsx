"use client";

import { useState } from "react";
import { AVATAR_GLYPHS } from "@/components/forum/forum-icons";
import { avatarFileUrl, avatarOf } from "@/lib/forum-avatars";

/** Avatar: ảnh có sẵn trong thư mục public/avatars hoặc hình icon có sẵn của web. size="full" thì lấp đầy ô chứa (hình vuông). */
export function ForumAvatar({
  avatar,
  size = 40,
  shape = "circle",
}: {
  avatar: string;
  size?: number | "full";
  shape?: "circle" | "squircle";
}) {
  const [failed, setFailed] = useState(false);
  const url = avatarFileUrl(avatar);
  const radius = shape === "squircle" ? "rounded-2xl" : "rounded-full";
  const box = size === "full" ? { width: "100%", aspectRatio: "1 / 1" } : { width: size, height: size };

  if (url && !failed) {
    return (
      <span aria-hidden="true" style={box} className={`block shrink-0 overflow-hidden bg-slate-100 ${radius}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="" onError={() => setFailed(true)} draggable={false} className="h-full w-full object-cover" />
      </span>
    );
  }

  const option = avatarOf(url ? "a01" : avatar);
  const glyph = AVATAR_GLYPHS[option.glyph];
  return (
    <span aria-hidden="true" style={box} className={`grid shrink-0 place-items-center ${radius} ${option.tone}`}>
      {glyph ? glyph({ className: "h-[52%] w-[52%]" }) : null}
    </span>
  );
}
