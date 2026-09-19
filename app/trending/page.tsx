import { SiteHeader } from "../../components/site-header";
import { SiteFooter, MobileBottomNav } from "../../components/homepage-sections";
import { TrendingCoinsView } from "../../components/trending-coins-view";
import { getFeaturedProducts } from "../../lib/catalog";

export const metadata = {
  title: "Trending Coins | Coins Gyaan Store",
  description:
    "Explore the most popular and trending collectible Indian coins at Coins Gyaan Store.",
};

export default async function TrendingPage() {
  const products = await getFeaturedProducts();
  return (
    <main className="min-h-[100svh] bg-white pb-20 sm:pb-0">
      <SiteHeader />
      <TrendingCoinsView products={products} />
      <SiteFooter />
      <MobileBottomNav />
    </main>
  );
}
