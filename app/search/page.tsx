import { SiteHeader } from "../../components/site-header";
import { SiteFooter, MobileBottomNav } from "../../components/homepage-sections";
import { Breadcrumb } from "../../components/breadcrumb";
import { ProductListing } from "../../components/product-listing";
import { getCatalog } from "../../lib/catalog";

export const metadata = {
  title: "Search Coins | Coins Gyaan Store",
  description: "Search authentic Indian collectible coins at Coins Gyaan Store.",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; sort?: "new-arrivals" | "price-low-high" | "price-high-low" | "discount"; page?: string }> }) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const result = await getCatalog({ query, sort: params.sort, page: Number(params.page) || 1 });
  return (
    <main className="min-h-[100svh] bg-white pb-20 sm:pb-0">
      <SiteHeader />
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 lg:px-8"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search" }]} /></div>
      <ProductListing title={query ? `Search results for \"${query}\"` : "Search Coins"} {...result} emptyMessage={query ? `No coins matched \"${query}\". Try a year, category, or coin name.` : "Enter a coin name, year, or category to start searching."} />
      <SiteFooter />
      <MobileBottomNav />
    </main>
  );
}
