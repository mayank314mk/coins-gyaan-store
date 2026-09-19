import type { Metadata } from "next";
import { SiteHeader } from "../../components/site-header";
import { AuthPanel } from "../../components/auth-panel";
import { MobileBottomNav } from "../../components/homepage-sections";

export const metadata: Metadata = {
  title: "Login | Coins Gyaan Store",
  description: "Log in to your Coins Gyaan Store collector account.",
};

export default function LoginPage() {
  return (
    <main className="min-h-[100svh] bg-[#fbfaf7] pb-20 sm:pb-0">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-360 justify-center px-4 py-12 sm:px-6 sm:py-20 xl:px-8">
        <AuthPanel />
      </div>
      <MobileBottomNav />
    </main>
  );
}
