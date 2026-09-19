"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/cart-context";
import { formatPrice } from "../lib/products";
import { Breadcrumb } from "./breadcrumb";

export function CartView() {
  const {
    items,
    itemCount,
    subtotal,
    removeFromCart,
    clearCart,
    isHydrated,
  } = useCart();

  // During hydration, show skeleton or empty layout to prevent mismatch
  if (!isHydrated) {
    return (
      <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200 mb-4" />
        <div className="h-64 w-full animate-pulse rounded-2xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <div className="mb-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shopping Cart" }]} />
      </div>

      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3 border-gray-100 pb-4 sm:mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-brand-strong sm:text-2xl">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            {itemCount > 0
              ? `You have ${itemCount} ${itemCount === 1 ? "coin" : "coins"} in your cart`
              : "Your cart is empty"}
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-semibold text-text-muted hover:text-red-600 transition-colors cursor-pointer"
          >
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyCartState />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {items.map(({ productId, product }) => {
              return (
                <div
                  key={productId}
                  className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  {/* Product Thumbnail & Details */}
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/coin/${product.id}`}
                      className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-2 border border-gray-100 sm:h-24 sm:w-24"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="96px"
                        className="object-contain p-1"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-accent">
                        {product.category}
                      </span>
                      <Link
                        href={`/coin/${product.id}`}
                        className="mt-0.5 block text-sm font-bold text-brand-strong hover:text-accent transition-colors line-clamp-2 sm:text-base"
                      >
                        {product.name}
                      </Link>
                      <div className="mt-1">
                        <span className="text-sm font-bold text-brand-strong sm:hidden">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 sm:border-t-0 sm:pt-0 sm:gap-6">
                    <div className="text-right hidden sm:block">
                      <span className="text-base font-bold text-brand-strong">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(productId)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="mt-4 flex items-center justify-between">
              <Link
                href="/all-coins"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-accent transition-colors"
              >
                <span>← Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-gray-200 bg-gray-50/90 p-5 sm:p-6 shadow-xs sticky top-24">
              <h2 className="text-base font-bold text-brand-strong">
                Order Summary
              </h2>

              <div className="mt-4 space-y-3 border-b border-gray-200 pb-4 text-sm">
                <div className="flex justify-between text-text-muted">
                  <span>Items Total ({itemCount})</span>
                  <span className="font-medium text-brand-strong">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-text-muted">
                  <span>Shipping & Packaging</span>
                  <span className="font-medium text-brand-strong">{formatPrice(80)}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-baseline">
                <span className="text-base font-bold text-brand-strong">
                  Total Amount
                </span>
                <span className="text-2xl font-extrabold text-brand-strong">
                  {formatPrice(subtotal + 80)}
                </span>
              </div>

              <p className="mt-1 text-[11px] text-text-muted">
                Shipping and packaging is charged at a flat ₹80.
              </p>

              <Link
                href="/checkout"
                className="mt-6 flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-brand text-base font-bold text-white shadow-sm transition-all hover:bg-brand-strong hover:shadow"
              >
                Add Delivery Info
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyCartState() {
  return (
    <div className="mx-auto my-12 flex max-w-md flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50/70 p-8 text-center sm:p-12">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-accent/10 text-accent">
        <EmptyCartIcon className="h-8 w-8" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-brand-strong">
        Your cart is empty
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        Looks like you haven&apos;t added any historical collectible coins to your cart yet. Browse our curated catalogue to find your next treasure.
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

function TrashIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

function EmptyCartIcon({ className = "h-6 w-6" }: { className?: string }) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
