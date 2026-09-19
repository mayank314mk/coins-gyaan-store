import { SiteHeader } from "../components/site-header";
import { HeroSection } from "../components/hero-section";
import { BenefitsSection, CategorySection, ChannelSection, MobileBottomNav, SiteFooter, TrendingSection } from "../components/homepage-sections";
import { getFeaturedProducts } from "../lib/catalog";

export default async function Home() {
  const products = await getFeaturedProducts();
  return (
    <main className="min-h-[100svh]">
      <SiteHeader />
      <HeroSection />
      <CategorySection />
      <TrendingSection products={products} />
      <ChannelSection />
      <BenefitsSection />
      <SiteFooter />
      <MobileBottomNav />
    </main>
  );
}
