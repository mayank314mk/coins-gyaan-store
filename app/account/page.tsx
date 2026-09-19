import type { Metadata } from "next";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter, MobileBottomNav } from "../../components/homepage-sections";
import { AccountView } from "../../components/account-view";
import { isAdmin } from "../../lib/admin";

export const metadata: Metadata = {
  title: "My Account | Coins Gyaan Store",
  description: "Manage your Coins Gyaan Store collector account.",
};

export default async function AccountPage() {
  const admin = await isAdmin();

  return (
    <main className="min-h-[100svh] bg-white pb-20 sm:pb-0">
      <SiteHeader />
      <AccountView isAdmin={admin} />
      <SiteFooter />
      <MobileBottomNav />
    </main>
  );
}
