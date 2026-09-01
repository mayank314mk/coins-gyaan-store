import { Breadcrumb } from "./breadcrumb";
import { ProductListing } from "./product-listing";
import { allProducts } from "../lib/products";

// For now, trending = the first 5 products (same slice as homepage)
// This can later be driven by a `trending: true` flag or a dedicated API.
const trendingProducts = allProducts.slice(0, 5);

export function TrendingCoinsView() {
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
      <ProductListing title="Trending Coins" products={trendingProducts} />
    </>
  );
}
