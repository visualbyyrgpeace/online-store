import { AVATAR_GLYPHS } from "@/components/forum/forum-icons";
import { avatarOf } from "@/lib/forum-avatars";

/** Avatar tròn từ bộ có sẵn của web (không có ảnh người dùng tải lên). */
export function ForumAvatar({ avatar, size = 40 }: { avatar: string; size?: number }) {
  const option = avatarOf(avatar);
  const glyph = AVATAR_GLYPHS[option.glyph];
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`grid shrink-0 place-items-center rounded-full ${option.tone}`}
    >
      {glyph({ className: "h-[55%] w-[55%]" })}
    </span>
  );
}
