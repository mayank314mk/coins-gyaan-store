"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/cart-context";
import { formatPrice } from "../lib/products";

export function CartView() {
  const {
    items,
    itemCount,
    subtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    isHydrated,
  } = useCart();

  const [checkoutNotice, setCheckoutNotice] = useState(false);

  // During hydration, show skeleton or empty layout to prevent mismatch
  if (!isHydrated) {
    return (
      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200 mb-8" />
        <div className="h-64 w-full animate-pulse rounded-2xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* Breadcrumb / Top Bar */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-text-muted">
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-brand-strong">Shopping Cart</span>
      </nav>

      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-strong sm:text-3xl">
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
            {items.map(({ productId, quantity, product }) => {
              const itemTotal = product.price * quantity;

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
                      <div className="mt-1 flex items-center gap-3 text-xs text-text-muted">
                        <span>Year: {product.year}</span>
                        <span>•</span>
                        <span className="font-medium text-brand-strong">
                          {formatPrice(product.price)} each
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price / Remove */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 sm:border-t-0 sm:pt-0 sm:gap-6">
                    {/* Quantity Control */}
                    <div className="flex items-center rounded-lg border border-gray-200 bg-white shadow-xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(productId, quantity - 1)}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                        className="inline-flex h-8 w-8 items-center justify-center text-sm font-medium text-brand-strong transition-colors hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer rounded-l-lg"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-brand-strong select-none">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(productId, quantity + 1)}
                        aria-label="Increase quantity"
                        className="inline-flex h-8 w-8 items-center justify-center text-sm font-medium text-brand-strong transition-colors hover:bg-gray-100 cursor-pointer rounded-r-lg"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal & Delete */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-sm sm:text-base font-bold text-brand-strong">
                          {formatPrice(itemTotal)}
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
                  <span className="font-semibold text-emerald-700">Free</span>
                </div>

                <div className="flex justify-between text-text-muted">
                  <span>Taxes</span>
                  <span className="text-xs text-text-muted">Included</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-baseline">
                <span className="text-base font-bold text-brand-strong">
                  Total Amount
                </span>
                <span className="text-2xl font-extrabold text-brand-strong">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <p className="mt-1 text-[11px] text-text-muted">
                Free insured packaging on all collector orders across India.
              </p>

              <button
                type="button"
                onClick={() => setCheckoutNotice(true)}
                className="mt-6 flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-brand text-base font-bold text-white shadow-sm transition-all hover:bg-brand-strong hover:shadow"
              >
                Proceed to Checkout
              </button>

              {checkoutNotice && (
                <div className="mt-3 rounded-xl border border-accent/30 bg-accent/10 p-3 text-xs text-brand-strong animate-in fade-in duration-200">
                  <p className="font-semibold text-accent">Frontend Preview</p>
                  <p className="mt-0.5 text-text-muted">
                    Checkout and Razorpay payments will be connected in a future development phase. Your cart is preserved locally.
                  </p>
                </div>
              )}

              {/* Collector Assurance features */}
              <div className="mt-6 space-y-2 border-t border-gray-200/80 pt-5 text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <CheckShieldIcon className="h-4 w-4 shrink-0 text-accent" />
                  <span>100% Genuine Numismatic Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <SafeTruckIcon className="h-4 w-4 shrink-0 text-accent" />
                  <span>Pan India Insured Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <SecureLockIcon className="h-4 w-4 shrink-0 text-accent" />
                  <span>Secure & Discreet Packaging</span>
                </div>
              </div>
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

function CheckShieldIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function SafeTruckIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14v10Z" />
      <circle cx="17" cy="18.5" r="2.5" />
      <circle cx="7" cy="18.5" r="2.5" />
    </svg>
  );
}

function SecureLockIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

