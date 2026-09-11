import { SiteHeader } from "../../components/site-header";
import { SiteFooter, MobileBottomNav } from "../../components/homepage-sections";
import { SearchResultsView } from "../../components/search-results-view";

export const metadata = {
  title: "Search Coins | Coins Gyaan Store",
  description: "Search authentic Indian collectible coins at Coins Gyaan Store.",
};

export default function SearchPage() {
  return (
    <main className="min-h-[100svh] bg-white pb-20 sm:pb-0">
      <SiteHeader />
      <SearchResultsView />
      <SiteFooter />
      <MobileBottomNav />
    </main>
  );
}