"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@/hooks/use-query";
import { listCategories, listProducts } from "@/services/product-service";
import { ProductGrid } from "@/components/product-card";
import { SearchBox } from "@/components/search-box";
import { EmptyState, ErrorState, ProductGridSkeleton } from "@/components/ui/states";

const chip = "rounded-full border px-3.5 py-1.5 text-sm font-medium transition";
const on = "border-black bg-black text-white";
const off = "border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-black";

// bỏ dấu + chữ thường để nhận ra danh mục "Mô hình 3D" dù tên hay slug viết thế nào
const plain = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").toLowerCase();
const is3d = (c: { name: string; slug: string }) => /(^|[^a-z0-9])3d([^a-z0-9]|$)/.test(plain(`${c.name} ${c.slug}`));

function buildHref(base: string, opts: { category?: string; q?: string; page?: number }) {
  const q = new URLSearchParams();
  if (opts.q) q.set("q", opts.q);
  if (opts.category) q.set("category", opts.category);
  if (opts.page && opts.page > 1) q.set("page", String(opts.page));
  const s = q.toString();
  return s ? `${base}?${s}` : base;
}

/** The browsing page: search, filters, grid, pagination. `lead` is shown to the left of the search box. */
export function ProductsView({
  base = "/products/",
  lead,
  showSearch = true,
  anchor,
}: {
  base?: string;
  lead?: React.ReactNode;
  showSearch?: boolean;
  anchor?: string; // id of the section: page changes scroll back to it
}) {
  const params = useSearchParams();
  const page = Math.max(1, Number.parseInt(params?.get("page") ?? "1", 10) || 1);
  const category = params?.get("category") ?? undefined;
  const q = params?.get("q")?.slice(0, 100) || undefined;

  const categories = useQuery("categories", listCategories);

  // Danh mục 3D đứng đầu, các danh mục khác theo sau (giữ nguyên thứ tự cũ)
  const ordered = categories.status === "success" ? [...categories.data.filter(is3d), ...categories.data.filter((c) => !is3d(c))] : [];
  // Không có ?category= và không đang tìm kiếm => mặc định hiện danh mục đầu tiên (3D)
  const needsDefault = !category && !q;
  const waitingDefault = needsDefault && categories.status === "loading";
  const activeCategory = category ?? (needsDefault ? ordered[0]?.slug : undefined);

  const list = useQuery(`products:${page}:${waitingDefault ? "wait" : (activeCategory ?? "")}:${q ?? ""}`, () =>
    // đang chờ danh sách danh mục thì chưa tải sản phẩm, tránh nháy hiện "tất cả" rồi mới nhảy sang 3D
    waitingDefault ? new Promise<never>(() => {}) : listProducts({ page, categorySlug: activeCategory, q }),
  );

  return (
    <div>
      {(lead || showSearch) && (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {lead ?? <span />}
          {showSearch && <SearchBox key={q ?? ""} base={base} defaultValue={q ?? ""} anchor={anchor} className="w-full sm:max-w-sm" />}
        </div>
      )}

      {ordered.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {ordered.map((c) => (
            <Link key={c.id} scroll={false} href={buildHref(base, { q, category: c.slug })} className={`${chip} ${activeCategory === c.slug ? on : off}`}>
              {c.name}
            </Link>
          ))}
        </div>
      )}

      {list.status === "success" && list.data.items.length > 0 && (
        <p className="mb-4 text-sm text-slate-500">
          {list.data.total} tài nguyên{q ? ` cho “${q}”` : ""}
        </p>
      )}
      {list.status === "loading" && <ProductGridSkeleton count={12} />}
      {list.status === "error" && <ErrorState />}
      {list.status === "success" && list.data.items.length === 0 && (
        <EmptyState title="Không tìm thấy tài nguyên" description="Thử từ khóa hoặc bộ lọc khác." href={base} actionLabel="Xóa bộ lọc" />
      )}
      {list.status === "success" && list.data.items.length > 0 && (
        <>
          <ProductGrid products={list.data.items} />
          <Pagination page={page} totalPages={Math.ceil(list.data.total / list.data.pageSize)} href={(p) => `${buildHref(base, { category, q, page: p })}${anchor ? `#${anchor}` : ""}`} />
        </>
      )}
    </div>
  );
}

function Pagination({ page, totalPages, href }: { page: number; totalPages: number; href: (p: number) => string }) {
  if (totalPages <= 1) return null;
  const btn = "rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:border-slate-400";
  return (
    <nav className="mt-12 flex items-center justify-center gap-4" aria-label="Phân trang">
      {page > 1 ? <Link href={href(page - 1)} className={btn}>← Trước</Link> : <span />}
      <span className="text-sm text-slate-500">Trang {page} / {totalPages}</span>
      {page < totalPages ? <Link href={href(page + 1)} className={btn}>Sau →</Link> : <span />}
    </nav>
  );
}
