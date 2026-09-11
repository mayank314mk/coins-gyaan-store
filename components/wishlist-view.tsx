"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWishlist } from "../context/wishlist-context";
import { useCart } from "../context/cart-context";
import { ProductCard } from "./product-card";

export function WishlistView() {
  const {
    items,
    itemCount,
    clearWishlist,
    isHydrated,
  } = useWishlist();
  const { addToCart } = useCart();
  const [movedAllNotification, setMovedAllNotification] = useState(false);

  // Guard against hydration mismatches
  if (!isHydrated) {
    return (
      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200 mb-8" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="aspect-[3/4] animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  function handleMoveAllToCart() {
    if (items.length === 0) return;
    for (const item of items) {
      addToCart(item.id);
    }
    clearWishlist();
    setMovedAllNotification(true);
    setTimeout(() => setMovedAllNotification(false), 3000);
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-text-muted">
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-brand-strong">My Wishlist</span>
      </nav>

      {/* Header Bar */}
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-strong sm:text-3xl">
            My Wishlist
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            {itemCount > 0
              ? `${itemCount} saved ${itemCount === 1 ? "coin" : "coins"}`
              : "No saved coins"}
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleMoveAllToCart}
              className="inline-flex items-center justify-center rounded-lg border border-accent bg-accent/10 px-3.5 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white cursor-pointer"
            >
              Move All to Cart
            </button>
            <button
              type="button"
              onClick={clearWishlist}
              className="text-xs font-semibold text-text-muted hover:text-red-600 transition-colors cursor-pointer"
            >
              Clear Wishlist
            </button>
          </div>
        )}
      </div>

      {movedAllNotification && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800 animate-in fade-in duration-200">
          All wishlisted coins have been moved to your cart.
        </div>
      )}

      {items.length === 0 ? (
        <EmptyWishlistState />
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/all-coins"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-accent transition-colors"
            >
              <span>← Continue Exploring Coins</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyWishlistState() {
  return (
    <div className="mx-auto my-12 flex max-w-md flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/70 p-8 text-center sm:p-12">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
        <HeartEmptyIcon className="h-8 w-8" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-brand-strong">
        Your wishlist is empty
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        Explore our curated collection of ancient, British India, and Republic India coins, and tap the heart icon to save your favorites here.
      </p>

      <Link
        href="/all-coins"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-strong"
      >
        Explore Coins
      </Link>
    </div>
  );
}

function HeartEmptyIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 8.6c0 5-8 10-8 10s-8-5-8-10a4.3 4.3 0 0 1 8-2.4 4.3 4.3 0 0 1 8 2.4Z" />
    </svg>
  );
}

