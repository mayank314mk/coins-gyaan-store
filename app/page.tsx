import { SiteHeader } from "../components/site-header";
import { HeroSection } from "../components/hero-section";
import { BenefitsSection, CategorySection, ChannelSection, MobileBottomNav, SiteFooter, TrendingSection } from "../components/homepage-sections";

export default function Home() {
  return (
    <main className="min-h-[100svh]">
      <SiteHeader />
      <HeroSection />
      <CategorySection />
      <TrendingSection />
      <ChannelSection />
      <BenefitsSection />
      <SiteFooter />
      <MobileBottomNav />
    </main>
  );
}
