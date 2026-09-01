"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "./product-card";
import { SortDropdown } from "./sort-dropdown";
import { Pagination } from "./pagination";
import { sortProducts, type Product, type SortOption } from "../lib/products";

const PAGE_SIZE = 20;

export function ProductListing({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  const [sort, setSort] = useState<SortOption>("new-arrivals");
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSortChange(value: SortOption) {
    setSort(value);
    setPage(1);
  }

  function handlePageChange(next: number) {
    setPage(next);
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
            {products.length} {products.length === 1 ? "Coin" : "Coins"}
          </p>
        </div>
        <SortDropdown value={sort} onChange={handleSortChange} />
      </div>

      {paged.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {paged.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-text-muted">
          No coins found in this category yet.
        </p>
      )}

      <div className="mt-6 sm:mt-8">
        <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
      </div>
    </div>
  );
}
