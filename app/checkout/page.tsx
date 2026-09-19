import type { Metadata } from "next";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter, MobileBottomNav } from "../../components/homepage-sections";
import { CheckoutView } from "../../components/checkout-view";

export const metadata: Metadata = { title: "Delivery Information | Coins Gyaan Store" };

export default function CheckoutPage() {
  return <main className="min-h-[100svh] bg-white pb-20 sm:pb-0"><SiteHeader /><CheckoutView /><SiteFooter /><MobileBottomNav /></main>;
}
