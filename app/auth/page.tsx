import { SiteHeader } from "../../components/site-header";
import { AuthPanel } from "../../components/auth-panel";

export const metadata = {
  title: "Sign in | Coins Gyaan Store",
  description: "Sign in to Coins Gyaan Store with Google.",
};

export default function AuthPage() {
  return (
    <main className="min-h-[100svh] bg-[#fbfaf7]">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-360 justify-center px-4 py-12 sm:px-6 sm:py-20 xl:px-8">
        <AuthPanel />
      </div>
    </main>
  );
}
