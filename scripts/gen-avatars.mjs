// Tự chạy trước mỗi lần build (npm run build / npm run dev).
// Quét thư mục public/avatars, lập danh sách ảnh avatar rồi ghi vào src/lib/avatar-files.ts.
// Chỉ cần bỏ ảnh vào public/avatars rồi đẩy lên GitHub, web sẽ tự hiện trong phần chọn avatar.
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const dir = "public/avatars";
const out = "src/lib/avatar-files.ts";
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const SAFE_NAME = /^[A-Za-z0-9._-]{1,80}$/; // phải khớp quy tắc kiểm tra trong cơ sở dữ liệu
const WARN_BYTES = 400 * 1024;

if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const files = [];
for (const name of readdirSync(dir).sort()) {
  if (!EXTENSIONS.has(extname(name).toLowerCase())) continue;
  if (!SAFE_NAME.test(name)) {
    console.warn(`[avatars] BỎ QUA "${name}": tên file chỉ được dùng chữ không dấu, số, dấu _ - . (không khoảng trắng).`);
    continue;
  }
  const size = statSync(join(dir, name)).size;
  if (size > WARN_BYTES) console.warn(`[avatars] "${name}" nặng ${Math.round(size / 1024)} KB, nên thu nhỏ còn khoảng 256x256 để web tải nhanh.`);
  files.push(name);
}

const source = `// FILE TỰ SINH bởi scripts/gen-avatars.mjs: đừng sửa tay.\nexport const AVATAR_FILES: string[] = ${JSON.stringify(files, null, 2)};\n`;
writeFileSync(out, source);
console.log(`[avatars] ${files.length} ảnh avatar trong ${dir}`);
