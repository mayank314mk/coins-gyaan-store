import type { Metadata } from "next";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter, MobileBottomNav } from "../../components/homepage-sections";
import { CartView } from "../../components/cart-view";

export const metadata: Metadata = {
  title: "Shopping Cart | Coins Gyaan Store",
  description:
    "Review your selected historical and collectible Indian coins in the Coins Gyaan Store shopping cart.",
};

export default function CartPage() {
  return (
    <main className="min-h-[100svh] bg-white pb-20 sm:pb-0">
      <SiteHeader />
      <CartView />
      <SiteFooter />
      <MobileBottomNav />
    </main>
  );
}

