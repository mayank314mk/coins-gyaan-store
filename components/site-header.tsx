"use client";

import React from "react";
import Image from "next/image";

const trustItems = [
  {
    label: "Trusted by 10,000+ Collectors Across India",
    icon: ShieldIcon,
  },
  {
    label: "100% Authentic Coins",
    icon: CheckIcon,
  },
  {
    label: "Secure Packaging",
    icon: BoxIcon,
  },
  {
    label: "Pan India Delivery",
    icon: TruckIcon,
  },
] as const;

const primaryNavItems = [
  "Home",
  "Republic India",
  "British India",
  "Princely States",
  "Ancient India",
  "Commemorative Coins",
  "Rare",
  "Scare",
  "Medieval India",
  "Error Coin",
  "Die Variety",
] as const;

export function SiteHeader() {
  return (
    <>
      <input id="category-menu-toggle" type="checkbox" className="peer sr-only" />
      <header className="site-header relative z-30 bg-white max-[768px]:shadow-none shadow-[0_1px_0_rgba(0,0,0,0.05)]">
        <TopTrustBar />
        <div className="border-b border-gray-200 max-[768px]:border-none bg-white">
          <div className="site-header-row mx-auto w-full max-w-360 xl:px-8">
            <div className="site-header-mobile-bar px-4 py-3">
              <div className="site-header-brand flex items-center gap-2">
                <label
                  htmlFor="category-menu-toggle"
                  aria-label="Open category menu"
                  role="button"
                  className="site-header-menu-toggle inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-strong transition-colors hover:text-accent"
                >
                  <MenuIcon />
                </label>
                <BrandBlock />
              </div>
              <ActionLinks className="site-header-actions" />
            </div>
            <div className="site-header-mobile-search px-4 pb-3">
              <SearchBar className="site-header-search" />
            </div>
          </div>
        </div>
      </header>
      <nav className="sticky top-0 z-40 border-b max-[768px]:border-none border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-360 px-4 min-[930px]:px-6 xl:px-8">
          <div className="site-header-nav-row items-center justify-start gap-3 overflow-x-auto whitespace-nowrap py-1.5 text-sm text-foreground">
            {primaryNavItems.map((item) => (
              <a
                key={item}
                href="#"
                className="shrink-0 px-3 py-1 font-medium text-foreground/80 hover:text-accent"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <div className="site-header-mobile-backdrop pointer-events-none fixed inset-0 z-40 min-[930px]:hidden">
        <label htmlFor="category-menu-toggle" aria-label="Close category menu" className="absolute inset-0 h-[100lvh] bg-black/25" />
      </div>
      <aside className="site-header-mobile-drawer fixed top-0 z-50 flex h-[100lvh] w-[82vw] max-w-80 flex-col border-r border-gray-200 bg-white shadow-2xl min-[930px]:hidden">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <BrandBlock />
          <label
            htmlFor="category-menu-toggle"
            aria-label="Close category menu"
            role="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-strong transition-colors hover:text-accent"
          >
            <span className="text-lg leading-none">×</span>
          </label>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <div className="flex flex-col gap-1">
            {primaryNavItems.map((item) => (
              <a
                key={item}
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-gray-100 hover:text-accent"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

function TopTrustBar() {
  return (
    <div className="site-header-topbar border-b border-white/10 bg-brand px-4 py-1.5 text-xs font-medium text-white lg:px-6 xl:px-8">
      <div className="mx-auto flex w-full max-w-360 items-center justify-between gap-4 overflow-x-auto">
        {trustItems.map(({ label, icon: Icon }) => (
          <div key={label} className="flex items-center gap-2 whitespace-nowrap">
            <Icon />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandBlock() {
  return (
    <a href="#" className="flex min-w-0 items-center gap-3 self-start min-[930px]:self-auto">
      <div className="relative h-10 w-10 flex-none overflow-hidden rounded-full min-[930px]:h-11 min-[930px]:w-11">
        <Image src="/logo.png" alt="Coins Gyaan Store logo" fill className="object-cover " priority />
      </div>
      <div className="min-w-0">
        <div className="text-[15px] font-bold leading-[1.05] tracking-tight text-brand-strong min-[390px]:text-base min-[930px]:text-lg">
          <span className="block whitespace-nowrap min-[930px]:inline">Coins Gyaan</span>
          <span className="block min-[930px]:ml-1 min-[930px]:inline">Store</span>
        </div>
      </div>
    </a>
  );
}

function SearchBar({ className = "" }: { className?: string }) {
  return (
    <label className={`relative mx-0 flex w-full flex-1 max-w-225 items-center min-[930px]:mx-2 min-[930px]:max-w-75 ${className}`}>
      <span className="sr-only">Search coins, sets, years</span>
      <input
        type="search"
        placeholder="Search"
        className="h-11 w-full rounded-2xl border border-accent/75 bg-gray-50 px-5 pr-14 text-base text-foreground outline-none placeholder:text-text-muted/80 focus:border-accent focus:ring-2 focus:ring-accent/10 min-[930px]:h-10 min-[930px]:rounded-full min-[930px]:text-sm"
      />
      <button
        type="button"
        className="absolute right-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-accent min-[930px]:h-8 min-[930px]:w-8"
        aria-label="Search"
      >
        <SearchIcon className="h-5 w-5" />
      </button>
    </label>
  );
}

function ActionLinks({ className = "" }: { className?: string }) {
  const actions: { label: string; icon: React.ComponentType<{ className?: string }>; badge?: string; iconClassName?: string }[] = [
    { label: "Wishlist", icon: HeartIcon },
    { label: "Cart", icon: CartIcon, badge: "0" },
    { label: "Login / Signup", icon: UserIcon, iconClassName: "h-5.5 w-5.5" },
  ];

  return (
    <div className={`flex items-center gap-3 sm:gap-4 min-[930px]:shrink-0 ${className}`}>
      {actions.map(({ label, icon: Icon, badge, iconClassName }) => (
        <a
          key={label}
          href="#"
          className="relative flex flex-col items-center gap-0.5 px-0.5 py-0 text-xs font-medium text-brand-strong hover:text-accent"
        >
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent">
            <Icon className={iconClassName ?? "h-5 w-5"} />
            {badge ? (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white shadow-sm min-[930px]:bg-accent">
                {badge}
              </span>
            ) : null}
          </span>
          <span className="site-header-action-label text-[12px] leading-tight text-inherit">{label}</span>
        </a>
      ))}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16.2 16.2 4.3 4.3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 19 6v5c0 4.6-3.1 8.7-7 10-3.9-1.3-7-5.4-7-10V6l7-3Z" />
      <path d="m9.5 12 1.9 1.9L15 10.3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4.5 12 4.2 4.2L19.5 5.5" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3.5 7 8.5-4 8.5 4-8.5 4-8.5-4Z" />
      <path d="M3.5 7v10l8.5 4 8.5-4V7" />
      <path d="M12 11v10" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h12v9H3z" />
      <path d="M15 10h3l3 3v3h-6z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="18" cy="18" r="1.8" />
    </svg>
  );
}

function HeartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" aria-hidden="true" className={className} fill="currentColor">
      <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
    </svg>
  );
}

function CartIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" aria-hidden="true" className={className} fill="currentColor">
      <path d="M223.5-103.5Q200-127 200-160t23.5-56.5Q247-240 280-240t56.5 23.5Q360-193 360-160t-23.5 56.5Q313-80 280-80t-56.5-23.5Zm400 0Q600-127 600-160t23.5-56.5Q647-240 680-240t56.5 23.5Q760-193 760-160t-23.5 56.5Q713-80 680-80t-56.5-23.5ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
    </svg>
  );
}

function UserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20c1.2-3.6 4-5.5 6.5-5.5S17.3 16.4 18.5 20" />
    </svg>
  );
}
