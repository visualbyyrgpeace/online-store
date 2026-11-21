"use client";

/** Nếu có lỗi bất ngờ ở diễn đàn, hiện thông báo gọn và nút thử lại thay vì cả trang trắng. */
export default function ForumError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <p className="text-base font-semibold text-slate-950">Diễn đàn tạm thời không tải được</p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700"
      >
        Thử lại
      </button>
    </div>
  );
}
