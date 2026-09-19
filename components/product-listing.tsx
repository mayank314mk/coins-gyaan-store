"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "./product-card";
import { SortDropdown } from "./sort-dropdown";
import { Pagination } from "./pagination";
import { type Product, type SortOption } from "../lib/products";

export function ProductListing({
  title,
  products,
  total = products.length,
  page = 1,
  totalPages = Math.max(1, Math.ceil(products.length / 20)),
  emptyMessage = "No coins found in this category yet.",
}: {
  title: string;
  products: Product[];
  total?: number;
  page?: number;
  totalPages?: number;
  emptyMessage?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = (searchParams.get("sort") as SortOption) || "new-arrivals";

  function handleSortChange(value: SortOption) {
    const next = new URLSearchParams(searchParams.toString());
    next.set("sort", value); next.delete("page");
    router.push(`?${next.toString()}`);
  }

  function handlePageChange(next: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === 1) params.delete("page"); else params.set("page", String(next));
    router.push(`?${params.toString()}`);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <div className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-brand-strong sm:text-2xl">
            {title}
          </h1>
          <p className="mt-0.5 text-xs font-medium text-text-muted sm:text-sm">
            {total} {total === 1 ? "Coin" : "Coins"}
          </p>
        </div>
        <SortDropdown value={sort} onChange={handleSortChange} />
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-text-muted">
          {emptyMessage}
        </p>
      )}

      <div className="mt-6 sm:mt-8">
        <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
      </div>
    </div>
  );
}
