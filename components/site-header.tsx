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
  "Coins",
  "Coin Sets",
  "Ancient Coins",
  "New Arrivals",
  "Best Sellers",
  "About Us",
  "Contact Us",
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle/70 bg-surface/95 shadow-[0_1px_0_rgba(20,57,47,0.04)] backdrop-blur-sm">
      <TopTrustBar />
      <div className="border-b border-border-subtle/70 bg-surface/90">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:gap-6 lg:px-6 xl:px-8">
          <BrandBlock />
          <SearchBar />
          <ActionLinks />
        </div>
      </div>
      <nav className="bg-surface">
        <div className="mx-auto flex w-full max-w-[1440px] items-center gap-3 overflow-x-auto px-4 py-2 text-sm text-foreground lg:px-6 xl:px-8">
          <button className="flex items-center gap-2 whitespace-nowrap font-medium text-foreground transition-colors hover:text-accent">
            <MenuIcon />
            <span>All Categories</span>
          </button>
          <div className="flex items-center gap-2 whitespace-nowrap">
            {primaryNavItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`px-3 py-1 transition-colors text-foreground/80 hover:text-accent ${
                  item === "Home" ? "text-accent border-b-[2px] border-accent pb-0.5" : ""
                }`}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

function TopTrustBar() {
  return (
    <div className="hidden bg-brand px-4 py-1.5 text-xs font-medium text-surface/90 md:block lg:px-6 xl:px-8">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 overflow-x-auto">
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
    <a href="#" className="flex items-center gap-4 self-start lg:self-auto">
      <div className="relative h-12 w-12 flex-none overflow-hidden rounded-full border border-border-subtle/80 bg-surface shadow-sm">
        <Image src="/logo.png" alt="Coins Gyaan Store logo" fill className="object-cover p-1" priority />
      </div>
      <div className="min-w-0">
        <div className="text-lg md:text-xl font-semibold tracking-tight text-brand-strong">
          Coins Gyaan Store
        </div>
        <div className="text-xs leading-tight text-text-muted sm:text-sm">
          Preserve History. Treasure India.
        </div>
      </div>
    </a>
  );
}

function SearchBar() {
  return (
    <label className="relative flex w-full flex-1 max-w-[900px] mx-4 items-center">
      <span className="sr-only">Search coins, sets, years</span>
      <SearchIcon className="pointer-events-none absolute left-3 h-3 w-3 text-accent" />
      <input
        type="search"
        placeholder="Search coins, sets, years..."
        className="h-11 w-full rounded-full border border-border-subtle bg-surface px-12 pr-14 text-sm text-foreground outline-none transition-colors placeholder:text-text-muted/80 focus:border-accent focus:ring-2 focus:ring-accent/10"
      />
      <button
        type="button"
        className="absolute right-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-accent transition-colors hover:bg-accent/10"
        aria-label="Search"
      >
        <SearchIcon className="h-3 w-3" />
      </button>
    </label>
  );
}

function ActionLinks() {
  const actions: { label: string; icon: () => React.ReactElement; badge?: string }[] = [
    { label: "Track Order", icon: TrackIcon },
    { label: "Wishlist", icon: HeartIcon },
    { label: "Cart", icon: CartIcon, badge: "0" },
    { label: "Login / Signup", icon: UserIcon },
  ];

  return (
    <div className="flex items-center gap-6 sm:gap-8 lg:shrink-0">
      {actions.map(({ label, icon: Icon, badge }) => (
        <a
          key={label}
          href="#"
          className="relative flex flex-col items-center gap-1 px-2 py-1 text-xs font-medium text-foreground transition-colors hover:text-accent"
        >
          <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-transparent text-foreground sm:bg-surface sm:text-brand-strong sm:hover:bg-brand/6">
            <Icon />
            {badge ? (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white shadow-sm">
                {badge}
              </span>
            ) : null}
          </span>
          <span className="text-[12px] leading-tight">{label}</span>
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
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
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

function TrackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-brand-strong" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a6.5 6.5 0 0 0-6.5 6.5c0 4.6 6.5 13 6.5 13s6.5-8.4 6.5-13A6.5 6.5 0 0 0 12 2Z" />
      <circle cx="12" cy="8.5" r="2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-brand-strong" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20.2s-7.2-4.4-9.2-8.9C1.2 7.8 3.3 5 6.5 5c1.8 0 3 .8 3.8 2 0 0 1.2-2 3.8-2 3.2 0 5.3 2.8 3.7 6.3-2 4.5-9.8 9.9-9.8 9.9Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-brand-strong" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3.5 4 1.2 2.2h15.2l-1.8 8.6H7L5.8 6.2H3.5" />
      <circle cx="9" cy="19" r="1.6" />
      <circle cx="17" cy="19" r="1.6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-brand-strong" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 20c1.2-3.6 4-5.5 6.5-5.5S17.3 16.4 18.5 20" />
    </svg>
  );
}