"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumb } from "./breadcrumb";
import { ProductListing } from "./product-listing";
import { searchProducts } from "../lib/products";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const products = useMemo(() => searchProducts(query), [query]);

  const title = query ? `Search results for "${query}"` : "Search Coins";
  const emptyMessage = query
    ? `No coins matched "${query}". Try a year, category, or coin name.`
    : "Enter a coin name, year, or category to start searching.";

  return (
    <>
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Search" },
          ]}
        />
      </div>
      <ProductListing
        title={title}
        products={products}
        emptyMessage={emptyMessage}
      />
    </>
  );
}

export function SearchResultsView() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[1440px] px-4 py-8 text-center text-text-muted">
          Loading search results...
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}