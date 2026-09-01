import { SiteHeader } from "../../components/site-header";
import { SiteFooter, MobileBottomNav } from "../../components/homepage-sections";
import { AllCoinsView } from "../../components/all-coins-view";

export const metadata = {
  title: "Coins Catalog | Coins Gyaan Store",
  description:
    "Browse the full collection of authentic Indian collectible coins at Coins Gyaan Store.",
};

export default function AllCoinsPage() {
  return (
    <main className="min-h-[100svh] bg-white pb-20 sm:pb-0">
      <SiteHeader />
      <AllCoinsView />
      <SiteFooter />
      <MobileBottomNav />
    </main>
  );
}
