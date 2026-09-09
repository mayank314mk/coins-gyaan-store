import type { Metadata } from "next";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter, MobileBottomNav } from "../../components/homepage-sections";
import { WishlistView } from "../../components/wishlist-view";

export const metadata: Metadata = {
  title: "My Wishlist | Coins Gyaan Store",
  description:
    "View and manage your saved Indian historical and collectible coins at Coins Gyaan Store.",
};

export default function WishlistPage() {
  return (
    <main className="min-h-[100svh] bg-white pb-20 sm:pb-0">
      <SiteHeader />
      <WishlistView />
      <SiteFooter />
      <MobileBottomNav />
    </main>
  );
}

