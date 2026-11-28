/**
 * DANH MỤC CHAI CỦA 3D STUDIO: nơi duy nhất cần sửa khi thêm / bớt loại chai.
 *
 * Thêm một loại chai mới:
 *   1) Tạo thư mục public/3d-studio/models/<id>/ rồi chép vào đó model.glb và config.json
 *      (xuất từ Material Studio). Tùy chọn: thumb.png (ảnh nhỏ vuông) và env.exr.
 *   2) Thêm một mục vào STUDIO_MODELS bên dưới.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ROOT = `${BASE}/3d-studio/models`;

export type StudioModel = {
  id: string;
  name: string;
  description: string;
  glb: string;
  config: string;
  /** Ảnh xem trước trong danh sách chọn (không bắt buộc). */
  thumb?: string;
  /** HDRI môi trường (không bắt buộc, nặng ~95 MB nên mặc định không dùng). */
  hdri?: { url: string; type: "exr" | "hdr" };
  /** Tên mesh (hoặc nhóm cha) của nhãn và nắp trong tệp GLB. */
  labelMesh: string;
  capMesh: string;
};

const folder = (id: string) => `${ROOT}/${id}`;

export const STUDIO_MODELS: StudioModel[] = [
  {
    id: "chai-nuoc",
    name: "Chai nước",
    description: "Chai nước trong, có nhãn và nắp.",
    glb: `${folder("chai-nuoc")}/model.glb`,
    config: `${folder("chai-nuoc")}/config.json`,
    labelMesh: "nhan",
    capMesh: "nap",
  },
];

/** Màu thương hiệu và tên hiển thị của trang. */
export const STUDIO_BRAND = {
  title: "3D Studio",
  tagline: "Chọn chai, đổi màu, thay nhãn rồi tải ảnh PNG.",
};
