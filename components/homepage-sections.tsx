"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "./product-card";
import { CATEGORIES } from "../lib/categories";
import type { Product } from "../lib/products";

export function CategorySection() {
  function openSidebar() {
    window.dispatchEvent(new CustomEvent("open-category-sidebar"));
  }

  return (
    <section
      id="categories"
      className="bg-white px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          title="Explore by Category"
          action="View All"
          onActionClick={openSidebar}
        />
        <div className="hide-scrollbar flex gap-2 sm:gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-10 lg:gap-3 lg:overflow-visible">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={category.href}
              className="group flex w-[100px] flex-none flex-col items-center rounded-2xl p-2.5 text-center transition-colors hover:bg-gray-100 lg:w-auto"
            >
              <div className="relative flex h-[76px] w-[76px] items-center justify-center sm:h-[84px] sm:w-[84px]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="84px"
                  className="object-contain p-1 transition-transform duration-200 group-hover:scale-100"
                />
              </div>
              <span className="mt-2 block text-xs font-semibold leading-4 text-brand-strong">
                {category.shortName ?? category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrendingSection({ products }: { products: Product[] }) {
  return (
    <section
      id="trending"
      className="bg-white px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading title="Trending Coins" action="View All" actionHref="/trending" />
        {/* Mobile: one card fills ~85% of the screen width; the next peeks
            in to signal there is more to scroll. sm: fixed 190px. lg: 5-col grid. */}
        <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2 sm:gap-4 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[66vw] max-w-[300px] flex-none sm:w-[200px] lg:w-auto lg:flex-auto"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ChannelSection() {
  return (
    <section className="bg-white px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto grid max-w-[1440px] gap-4 lg:grid-cols-2 lg:gap-6">
        <article className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-7 shadow-sm">
          <p className="text-sm sm:text-base font-bold uppercase tracking-[0.12em] text-accent">
            Coins Gyaan Channel
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Image
              src="/images/logo.png"
              alt="Coins Gyaan logo"
              width={100}
              height={100}
              className="h-20 w-20 shrink-0 rounded-full border border-gray-200 bg-white object-cover sm:h-24 sm:w-24"
            />
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 sm:gap-10">
                <Stat value="10K+" label="Subscribers" icon={<UsersIcon />} />
                <Stat value="1.1M+" label="Total Views" icon={<ViewIcon />} />
              </div>
              <a
                href="https://www.youtube.com/@COINNEWS-rn5br"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-md bg-brand px-3.5 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-brand-strong sm:px-4 sm:py-2.5 sm:text-sm"
              >
                View Our Channel
              </a>
            </div>
          </div>
          <p className="mt-4 text-sm leading-5 text-text-muted">
            Coins Gyaan brings together a trusted Indian numismatic YouTube
            channel and an online store for collectors.
          </p>
        </article>
        <article className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-7 shadow-sm">
          {/* Label at top — visible on all screen sizes */}
          <p className="text-sm sm:text-base font-bold uppercase tracking-[0.12em] text-accent">
            Most Viewed Video
          </p>

          {/* Thumbnail + views/button row — side-by-side on desktop, stacked on mobile */}
          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <a
              href="https://www.youtube.com/watch?v=pQk5S_6z0yk&t=2s"
              target="_blank"
              rel="noreferrer"
              className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl sm:w-72 lg:w-48"
            >
              <Image
                src="/images/Thumbnail.jpg"
                alt="PRICE of All Rare Coins of Republic India video thumbnail"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 288px, 200px"
                className="rounded-xl object-cover"
              />
            </a>

            {/* Views + button */}
            <div className="flex items-center justify-between lg:flex-1 lg:flex-col lg:items-start lg:justify-center lg:gap-2.5">
              <div className="flex items-center gap-2">
                <ViewIcon />
                <span className="text-sm font-semibold leading-4 text-brand-strong">
                  100K+
                  <small className="block text-[11px] font-medium text-text-muted">
                    Views
                  </small>
                </span>
              </div>
              <a
                href="https://www.youtube.com/watch?v=pQk5S_6z0yk&t=2s"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center justify-center rounded-md bg-brand px-3.5 py-2 text-center text-xs font-semibold text-white transition-colors hover:bg-brand-strong sm:px-4 sm:py-2.5 sm:text-sm"
              >
                Watch on YouTube
              </a>
            </div>
          </div>

          {/* Video title */}
          <p className="mt-3 text-sm leading-5 text-text-muted">
            PRICE of All Rare Coins of Republic India | सभी दुर्लभ सिक्कों की कीमत जानें | COINS GYAAN
          </p>
        </article>
      </div>
    </section>
  );
}

const benefits = [
  [ShieldIcon, "100% Authentic Coins", "Guaranteed genuine coins"],
  [PackageIcon, "Secure Packaging", "Safe and tamper-proof packaging"],
  [TruckIcon, "Pan India Delivery", "Fast and reliable delivery"],
  [SafePaymentIcon, "Safe Payments", "Secure payment processing"],
] as const;

export function BenefitsSection() {
  return (
    <section className="bg-white px-4 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 rounded-2xl border border-gray-200 bg-gray-50 shadow-sm sm:grid-cols-4">
        {benefits.map(([Icon, title, text]) => (
          <article
            key={title}
            className="flex items-center gap-3 px-4 py-4 sm:border-r sm:border-gray-200 sm:last:border-r-0"
          >
            <Icon className="h-8 w-8" />
            <div>
              <h3 className="text-sm font-semibold text-brand-strong">
                {title}
              </h3>
              <p className="mt-1 text-[11px] leading-4 text-text-muted">
                {text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  const shopLinks = [
    { label: "All Coins", href: "/all-coins" },
    ...CATEGORIES.map((c) => ({ label: c.shortName ?? c.name, href: c.href })),
  ];

  const serviceLinks = [
    { label: "Track Order", href: "/orders" },
    { label: "View Cart", href: "/cart" },
    { label: "Wishlist", href: "/wishlist" },
  ];
  const shopLinkColumns = [
    shopLinks.slice(0, Math.ceil(shopLinks.length / 2)),
    shopLinks.slice(Math.ceil(shopLinks.length / 2)),
  ];

  return (
    <footer className="bg-brand px-4 pb-[88px] pt-10 text-white sm:px-6 lg:px-8 lg:pb-8">
      <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Coins Gyaan Store"
              width={46}
              height={46}
              className="rounded-full"
            />
            <span className="text-xl font-bold tracking-tight">
              Coins Gyaan Store
            </span>
          </Link>
          <p className="mt-3 text-sm font-medium text-white/85">
            Preserve History. Treasure India.
          </p>
          <p className="mt-3 max-w-[280px] text-xs leading-5 text-white/70">
            A focused home for Indian numismatics, collectible coins and
            collecting knowledge.
          </p>
          <div className="mt-5 max-w-[220px] border-t border-white/15 pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/55">
              Email us
            </p>
            <a
              href="mailto:mayank314mk@gmail.com"
              className="mt-1 inline-block text-xs text-white/80 transition-colors hover:text-white"
            >
              mayank314mk@gmail.com
            </a>
          </div>
        </div>

        {/* Shop */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Shop
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-x-8">
            {shopLinkColumns.map((links, columnIndex) => (
              <ul key={columnIndex} className="space-y-2 text-xs text-white/70">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Customer Service
          </h2>
          <ul className="mt-3 space-y-2 text-xs text-white/70">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
      <div className="mx-auto mt-8 flex max-w-[1440px] flex-col gap-2 border-t border-white/15 pt-4 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <span>Copyright 2026 Coins Gyaan Store. All rights reserved.</span>
        <span>Secure payments - Cards - UPI</span>
      </div>
    </footer>
  );
}

export function MobileBottomNav() {
  function openSidebar() {
    window.dispatchEvent(new CustomEvent("open-category-sidebar"));
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-gray-200 bg-white/95 px-3 py-2 text-[11px] font-semibold text-brand-strong backdrop-blur sm:hidden">
      <Link href="/" className="grid place-items-center gap-1 hover:text-accent transition-colors">
        <HomeIcon />
        <span>Home</span>
      </Link>
      <button
        type="button"
        onClick={openSidebar}
        className="grid place-items-center gap-1 hover:text-accent transition-colors"
      >
        <GridIcon />
        <span>Categories</span>
      </button>
      <Link href="/cart" className="grid place-items-center gap-1 hover:text-accent transition-colors">
        <CartIcon />
        <span>Cart</span>
      </Link>
      <Link href="/account" className="grid place-items-center gap-1 hover:text-accent transition-colors">
        <UserIcon />
        <span>Account</span>
      </Link>
    </nav>
  );
}

function SectionHeading({
  title,
  action,
  actionHref = "/all-coins",
  onActionClick,
}: {
  title: string;
  action?: string;
  actionHref?: string;
  onActionClick?: () => void;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-bold tracking-tight text-brand-strong sm:text-2xl">
        {title}
      </h2>
      {action && (
        onActionClick ? (
          <button
            type="button"
            onClick={onActionClick}
            className="text-sm font-semibold text-accent transition-colors hover:text-brand"
          >
            {action}
          </button>
        ) : (
          <Link
            href={actionHref}
            className="text-sm font-semibold text-accent transition-colors hover:text-brand"
          >
            {action}
          </Link>
        )
      )}
    </div>
  );
}

function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon ?? <ViewIcon />}
      <span className="text-sm font-semibold text-brand-strong">
        {value}
        <small className="block text-[11px] font-medium text-text-muted">
          {label}
        </small>
      </span>
    </div>
  );
}

function IconShell({
  children,
  className = "h-5 w-5",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`${className} shrink-0 text-accent`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path d="m12 3 7 3v5c0 4.6-3.1 8.7-7 10-3.9-1.3-7-5.4-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </IconShell>
  );
}

function PackageIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path d="m3 7 9-4 9 4-9 4-9-4Z" />
      <path d="M3 7v10l9 4 9-4V7M12 11v10" />
    </IconShell>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
    </IconShell>
  );
}

function SafePaymentIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
      <path d="M14 15h1" />
    </IconShell>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconShell>
  );
}

function ViewIcon() {
  return (
    <IconShell>
      <path d="M2.5 12s3.3-5 9.5-5 9.5 5 9.5 5-3.3 5-9.5 5-9.5-5-9.5-5Z" />
      <circle cx="12" cy="12" r="2" />
    </IconShell>
  );
}

function HomeIcon() {
  return (
    <IconShell>
      <path d="m3 11 9-7 9 7v9H3z" />
      <path d="M9 20v-6h6v6" />
    </IconShell>
  );
}

function GridIcon() {
  return (
    <IconShell>
      <rect x="4" y="4" width="6" height="6" />
      <rect x="14" y="4" width="6" height="6" />
      <rect x="4" y="14" width="6" height="6" />
      <rect x="14" y="14" width="6" height="6" />
    </IconShell>
  );
}

function CartIcon() {
  return (
    <IconShell>
      <path d="M3 4h2l2 11h11l2-8H6" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </IconShell>
  );
}

function UserIcon() {
  return (
    <IconShell>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c1-3.5 3.7-5 7-5s6 1.5 7 5" />
    </IconShell>
  );
}
