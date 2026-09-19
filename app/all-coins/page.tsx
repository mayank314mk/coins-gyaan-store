import { SiteHeader } from "../../components/site-header";
import { SiteFooter, MobileBottomNav } from "../../components/homepage-sections";
import { Breadcrumb } from "../../components/breadcrumb";
import { ProductListing } from "../../components/product-listing";
import { getCatalog } from "../../lib/catalog";
import { getCategoryBySlug } from "../../lib/categories";

export const metadata = {
  title: "Coins Catalog | Coins Gyaan Store",
  description:
    "Browse the full collection of authentic Indian collectible coins at Coins Gyaan Store.",
};

export default async function AllCoinsPage({ searchParams }: { searchParams: Promise<{ category?: string; sort?: "new-arrivals" | "price-low-high" | "price-high-low" | "discount"; page?: string }> }) {
  const params = await searchParams;
  const category = params.category && params.category !== "all" ? getCategoryBySlug(params.category) : undefined;
  const result = await getCatalog({ category: category?.name, sort: params.sort, page: Number(params.page) || 1 });
  const title = category?.name ?? "All Coins";
  return (
    <main className="min-h-[100svh] bg-white pb-20 sm:pb-0">
      <SiteHeader />
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 lg:px-8"><Breadcrumb items={[{ label: "Home", href: "/" }, { label: "All Coins", href: category ? "/all-coins" : undefined }, ...(category ? [{ label: category.shortName ?? category.name }] : [])]} /></div>
      <ProductListing title={title} {...result} />
      <SiteFooter />
      <MobileBottomNav />
    </main>
  );
}
