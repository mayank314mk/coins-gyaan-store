import { SiteHeader } from "../components/site-header";
import { HeroSection } from "../components/hero-section";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <HeroSection />
    </main>
  );
}
