import Link from "next/link";
import { SiteHeader } from "../../../components/site-header";
import { SiteFooter, MobileBottomNav } from "../../../components/homepage-sections";

export default function CoinNotFound() {
  return (
    <main className="min-h-[100svh] bg-white pb-20 sm:pb-0 flex flex-col justify-between">
      <SiteHeader />
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:py-28">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
          <CoinIcon className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-brand-strong sm:text-3xl">
          Coin Not Found
        </h1>
        <p className="mt-3 text-sm text-text-muted sm:text-base leading-relaxed">
          The coin you are looking for does not exist in our catalog or may have been moved. Explore our active collection of authentic Indian coins below.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/all-coins"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-strong"
          >
            Browse All Coins
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-brand-strong transition-colors hover:border-gray-300 hover:bg-gray-50"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <SiteFooter />
      <MobileBottomNav />
    </main>
  );
}

function CoinIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9a2.5 2.5 0 0 0-5 0v6a2.5 2.5 0 0 0 5 0" />
      <path d="M9.5 12h5" />
    </svg>
  );
}

