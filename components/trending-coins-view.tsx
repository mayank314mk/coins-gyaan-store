import { Suspense } from "react";
import { Breadcrumb } from "./breadcrumb";
import { ProductListing } from "./product-listing";
import type { Product } from "../lib/products";

export function TrendingCoinsView({ products }: { products: Product[] }) {
  return (
    <>
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Trending Coins" },
          ]}
        />
      </div>
      <Suspense fallback={null}>
        <ProductListing title="Trending Coins" products={products} />
      </Suspense>
    </>
  );
}
