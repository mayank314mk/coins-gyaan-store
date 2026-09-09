"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavLink } from "./nav-link";
import { CATEGORIES, DESKTOP_NAV_CATEGORIES } from "../lib/categories";
import { useCart } from "../context/cart-context";
import { useWishlist } from "../context/wishlist-context";

const trustItems = [
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
  {
    label: "Safe Payments",
    icon: SafePaymentIcon,
  },
] as const;

export function SiteHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Close drawer on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDrawerOpen(false);
      }
    };
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen]);

  // Listen for custom event fired by homepage "View All" in Explore by Category
  useEffect(() => {
    const handler = () => setIsDrawerOpen(true);
    window.addEventListener("open-category-sidebar", handler);
    return () => window.removeEventListener("open-category-sidebar", handler);
  }, []);

  return (
    <>
      <header className="site-header relative z-30 bg-white max-[768px]:shadow-none shadow-[0_1px_0_rgba(0,0,0,0.05)]">
        <TopTrustBar />
        <div className="border-b border-gray-200 max-[768px]:border-none bg-white">
          <div className="site-header-row mx-auto w-full max-w-360 xl:px-8">
            <div className="site-header-mobile-bar px-4 py-3">
              <div className="site-header-brand flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  aria-label="Open category menu"
                  className="site-header-menu-toggle inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-strong transition-colors hover:text-accent"
                >
                  <MenuIcon />
                </button>
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

      {/* Category Bar Navigation */}
      <nav className="sticky top-0 z-40 border-b max-[768px]:border-none border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-360 px-4 min-[930px]:px-6 xl:px-8">
          <div className="site-header-nav-row max-h-[42px] flex flex-wrap items-center justify-start gap-1.5 md:gap-2.5 py-1.5 text-sm text-foreground overflow-hidden">
            {/* See All button with Hamburger Menu */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="group flex shrink-0 items-center gap-1.5 rounded-md bg-white px-3 py-1 text-sm font-semibold text-brand-strong transition-colors hover:text-accent"
              aria-label="See all categories"
            >
              <MenuIcon className="h-4 w-4 text-brand-strong group-hover:text-accent transition-colors" />
              <span>See All</span>
            </button>

            {/* Desktop Category Bar Items without horizontal scrolling */}
            {DESKTOP_NAV_CATEGORIES.map((item) => (
              <NavLink
                key={item.label}
                href={item.href}
                slug={item.slug}
                className="shrink-0 px-2.5 py-1 text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
                activeClassName="shrink-0 px-2.5 py-1 text-sm font-bold text-accent border-b-2 border-accent transition-colors"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Category Sidebar Drawer & Backdrop (Accessible for both Desktop and Mobile) */}
      {isDrawerOpen && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsDrawerOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setIsDrawerOpen(false);
          }}
          aria-label="Close category sidebar"
          className="h-[100lvh] fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
        />
      )}

      <aside
        className={`site-header-mobile-drawer fixed top-0 left-0 bottom-0 z-50 flex h-[100lvh] w-[82vw] max-w-80 flex-col border-r border-gray-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <BrandBlock />
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close category menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-strong transition-colors hover:text-accent"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <div className="flex flex-col gap-1">
            <NavLink
              href="/all-coins"
              slug="all"
              onClick={() => setIsDrawerOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-gray-100 hover:text-accent"
              activeClassName="rounded-md px-3 py-2 text-sm font-bold text-accent bg-accent/10"
            >
              All Coins
            </NavLink>
            {CATEGORIES.map((item) => (
              <NavLink
                key={item.slug}
                href={item.href}
                slug={item.slug}
                onClick={() => setIsDrawerOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-gray-100 hover:text-accent"
                activeClassName="rounded-md px-3 py-2 text-sm font-bold text-accent bg-accent/10"
              >
                {item.name}
              </NavLink>
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
    <Link href="/" className="flex min-w-0 items-center gap-3 self-start min-[930px]:self-auto">
      <div className="relative h-10 w-10 flex-none overflow-hidden rounded-full min-[930px]:h-11 min-[930px]:w-11">
        <Image src="/images/logo.png" alt="Coins Gyaan Store logo" fill className="object-cover" priority />
      </div>
      <div className="min-w-0">
        <div className="text-[15px] font-bold leading-[1.05] tracking-tight text-brand-strong min-[390px]:text-base min-[930px]:text-lg">
          <span className="block whitespace-nowrap min-[930px]:inline">Coins Gyaan</span>
          <span className="block min-[930px]:ml-1 min-[930px]:inline">Store</span>
        </div>
      </div>
    </Link>
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
  const actions: { label: string; href: string; icon: React.ComponentType<{ className?: string }>; badge?: string; iconClassName?: string }[] = [
    { label: "Wishlist", href: "#wishlist", icon: HeartIcon },
    { label: "Cart", href: "#cart", icon: CartIcon, badge: "0" },
  const { itemCount: cartCount, isHydrated: isCartHydrated } = useCart();
  const { itemCount: wishlistCount, isHydrated: isWishlistHydrated } = useWishlist();

  const cartBadge = isCartHydrated ? String(cartCount) : "0";
  const wishlistBadge =
    isWishlistHydrated && wishlistCount > 0 ? String(wishlistCount) : undefined;

  const actions: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    iconClassName?: string;
  }[] = [
    { label: "Wishlist", href: "/wishlist", icon: HeartIcon, badge: wishlistBadge },
    { label: "Cart", href: "/cart", icon: CartIcon, badge: cartBadge },
    { label: "Login / Signup", href: "#login", icon: UserIcon, iconClassName: "h-5.5 w-5.5" },
  ];

  return (
    <div className={`flex items-center gap-3 sm:gap-4 min-[930px]:shrink-0 ${className}`}>
      {actions.map(({ label, href, icon: Icon, badge, iconClassName }) => (
        <Link
          key={label}
          href={href}
          className="relative flex flex-col items-center  px-0.5 py-0 text-xs font-medium text-brand-strong hover:text-accent transition-colors"
        >
          <span className="relative inline-flex h-7 w-9 items-center justify-center rounded-full bg-transparent">
            <Icon className={iconClassName ?? "h-5 w-5"} />
            {badge ? (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white shadow-sm min-[930px]:bg-accent">
                {badge}
              </span>
            ) : null}
          </span>
          <span className="site-header-action-label text-[12px] leading-tight text-inherit">{label}</span>
        </Link>
      ))}
    </div>
  );
}

function MenuIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
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

function SafePaymentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
      <path d="M14 15h1" />
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
