"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { Breadcrumb } from "./breadcrumb";
import { ProductListing } from "./product-listing";
import { allProducts } from "../lib/products";
import { getCategoryBySlug } from "../lib/categories";

function AllCoinsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const { title, products, breadcrumbItems } = useMemo(() => {
    if (!categoryParam || categoryParam === "all") {
      return {
        title: "All Coins",
        products: allProducts,
        breadcrumbItems: [
          { label: "Home", href: "/" },
          { label: "All Coins" },
        ],
      };
    }

    const matchedCategory = getCategoryBySlug(categoryParam);
    if (matchedCategory) {
      const filtered = allProducts.filter(
        (p) => p.category === matchedCategory.name
      );
      return {
        title: matchedCategory.name,
        products: filtered,
        breadcrumbItems: [
          { label: "Home", href: "/" },
          { label: "All Coins", href: "/all-coins" },
          { label: matchedCategory.shortName ?? matchedCategory.name },
        ],
      };
    }

    return {
      title: "All Coins",
      products: allProducts,
      breadcrumbItems: [
        { label: "Home", href: "/" },
        { label: "All Coins" },
      ],
    };
  }, [categoryParam]);

  return (
    <>
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {/* key resets page state when the category changes */}
      <ProductListing key={categoryParam ?? "all"} title={title} products={products} />
    </>
  );
}

export function AllCoinsView() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[1440px] px-4 py-8 text-center text-text-muted">
          Loading coins...
        </div>
      }
    >
      <AllCoinsContent />
    </Suspense>
  );
}

