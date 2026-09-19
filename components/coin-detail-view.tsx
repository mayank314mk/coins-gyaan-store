"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Breadcrumb, type BreadcrumbItem } from "./breadcrumb";
import { ProductCard } from "./product-card";
import { formatPrice, type Product } from "../lib/products";
import { getCategoryBySlug } from "../lib/categories";
import { useCart } from "../context/cart-context";
import { useWishlist } from "../context/wishlist-context";

export function CoinDetailView({
  product,
  relatedProducts,
  isTrendingFallback = false,
}: {
  product: Product;
  relatedProducts: Product[];
  isTrendingFallback?: boolean;
}) {
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState<"front" | "back">(
    "front"
  );
  const [cartFeedback, setCartFeedback] = useState<"added" | "already" | null>(null);

  const isWishlisted = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  const ZOOM_FACTOR = 3;

  // Zoom state
  const [isZooming, setIsZooming] = useState(false);
  const [lensPos, setLensPos] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  const [imageBounds, setImageBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const zoomPanelRef = useRef<HTMLDivElement>(null);

  const activeImageSrc =
    selectedImage === "back" && product.backImage
      ? product.backImage
      : product.image;

  const activeSideLabel =
    selectedImage === "front" ? "Front (Obverse)" : "Back (Reverse)";

  const matchedCat = getCategoryBySlug(product.category);

  const categoryHref = matchedCat
    ? matchedCat.href
    : `/all-coins?category=${encodeURIComponent(product.category)}`;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "All Coins", href: "/all-coins" },
    { label: product.category, href: categoryHref },
    { label: product.name },
  ];

  /*
   * Calculate the actual rendered image rectangle.
   */
  const updateZoomPositions = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = imageContainerRef.current;
      const image = imageRef.current;
      const zoomPanel = zoomPanelRef.current;

      if (!container || !image || !zoomPanel) return;

      const containerRect = container.getBoundingClientRect();
      const zoomRect = zoomPanel.getBoundingClientRect();

      const naturalWidth = image.naturalWidth;
      const naturalHeight = image.naturalHeight;

      if (!naturalWidth || !naturalHeight) return;

      const computedStyle = window.getComputedStyle(container);

      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
      const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
      const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;

      const contentWidth =
        containerRect.width - paddingLeft - paddingRight;

      const contentHeight =
        containerRect.height - paddingTop - paddingBottom;

      const scale = Math.min(
        contentWidth / naturalWidth,
        contentHeight / naturalHeight
      );

      const renderedWidth = naturalWidth * scale;
      const renderedHeight = naturalHeight * scale;

      const imageLeft =
        paddingLeft + (contentWidth - renderedWidth) / 2;

      const imageTop =
        paddingTop + (contentHeight - renderedHeight) / 2;

      setImageBounds({
        left: imageLeft,
        top: imageTop,
        width: renderedWidth,
        height: renderedHeight,
      });

      const zoomAspectRatio = zoomRect.width / zoomRect.height;

      let lensHeight = zoomRect.height / ZOOM_FACTOR;
      let lensWidth = lensHeight * zoomAspectRatio;

      if (lensWidth > renderedWidth) {
        lensWidth = renderedWidth;
        lensHeight = lensWidth / zoomAspectRatio;
      }

      if (lensHeight > renderedHeight) {
        lensHeight = renderedHeight;
        lensWidth = lensHeight * zoomAspectRatio;
      }

      const mouseX =
        e.clientX - containerRect.left - imageLeft;

      const mouseY =
        e.clientY - containerRect.top - imageTop;

      const clampedX = Math.max(
        0,
        Math.min(mouseX, renderedWidth)
      );

      const clampedY = Math.max(
        0,
        Math.min(mouseY, renderedHeight)
      );

      const maxLensLeft = Math.max(
        0,
        renderedWidth - lensWidth
      );

      const maxLensTop = Math.max(
        0,
        renderedHeight - lensHeight
      );

      const lensLeft = Math.max(
        0,
        Math.min(
          clampedX - lensWidth / 2,
          maxLensLeft
        )
      );

      const lensTop = Math.max(
        0,
        Math.min(
          clampedY - lensHeight / 2,
          maxLensTop
        )
      );

      setLensPos({
        left: imageLeft + lensLeft,
        top: imageTop + lensTop,
        width: lensWidth,
        height: lensHeight,
      });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      updateZoomPositions(e);
    },
    [updateZoomPositions]
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsZooming(true);
      updateZoomPositions(e);
    },
    [updateZoomPositions]
  );

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      {/* Breadcrumb navigation */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main 2-column Detail Section */}
      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-3 lg:col-span-5">
          {/* On mobile: image on top, thumbnails below. On sm+: thumbnails on left, image on right */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            {/* Main Large Coin Image Box — first on mobile, right side on sm+ */}
            <div className="flex-1 min-w-0 order-first sm:order-last">
              <div
                ref={imageContainerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                className="group relative aspect-square w-full select-none overflow-hidden rounded-2xl transition-all sm:p-6"
              >
                {/* Main Coin Image */}
                <div className="relative h-full w-full">
                  <Image
                    ref={imageRef}
                    src={activeImageSrc}
                    alt={`${product.name} - ${activeSideLabel}`}
                    fill
                    priority
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 500px"
                    className="object-contain"
                  />
                </div>

                {/* Lens */}
                {isZooming && imageBounds.width > 0 && (
                  <div
                    style={{
                      top: `${lensPos.top}px`,
                      left: `${lensPos.left}px`,
                      width: `${lensPos.width}px`,
                      height: `${lensPos.height}px`,
                    }}
                    className="pointer-events-none absolute hidden rounded-[16px] border-accent bg-[#00000032] shadow-md lg:block"
                  />
                )}
              </div>

              {/* Hover Hint with ample gap below the coin image */}
              <div className="mt-3.5 hidden items-center justify-center gap-1.5 text-center text-xs text-text-muted lg:flex">
                <ZoomIcon className="h-3.5 w-3.5 text-accent" />
                <span>Hover over coin to zoom details</span>
              </div>
            </div>

            {/* Thumbnails — below image on mobile (flex-row), left side on sm+ (sm:flex-col) */}
            <div className="flex flex-row gap-2 shrink-0 order-last sm:order-first sm:flex-col">
              {/* Front Thumbnail */}
              <button
                type="button"
                onClick={() => setSelectedImage("front")}
                aria-label="View front side of coin"
                className={`relative aspect-square w-14 sm:w-16 overflow-hidden rounded-xl transition-opacity cursor-pointer ${
                  selectedImage === "front"
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-80"
                }`}
              >
                <Image
                  src={product.image}
                  alt={`${product.name} Front`}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </button>

              {/* Back Thumbnail */}
              {product.backImage && (
                <button
                  type="button"
                  onClick={() => setSelectedImage("back")}
                  aria-label="View back side of coin"
                  className={`relative aspect-square w-14 sm:w-16 overflow-hidden rounded-xl transition-opacity cursor-pointer ${
                    selectedImage === "back"
                      ? "opacity-100"
                      : "opacity-40 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={product.backImage}
                    alt={`${product.name} Back`}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative flex flex-col justify-between lg:col-span-7">
          {/* Zoom Panel */}
          <div
            ref={zoomPanelRef}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-30 hidden overflow-hidden rounded-2xl bg-gray-50 shadow-2xl transition-opacity lg:block ${
              isZooming && imageBounds.width > 0
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            {imageBounds.width > 0 && (
              <div
                className="absolute"
                style={{
                  width: `${imageBounds.width * ZOOM_FACTOR}px`,
                  height: `${imageBounds.height * ZOOM_FACTOR}px`,
                  left: `${
                    -(
                      lensPos.left -
                      imageBounds.left
                    ) * ZOOM_FACTOR
                  }px`,
                  top: `${
                    -(
                      lensPos.top -
                      imageBounds.top
                    ) * ZOOM_FACTOR
                  }px`,
                }}
              >
                <Image
                  src={activeImageSrc}
                  alt="Zoomed coin details"
                  fill
                  sizes="100vw"
                  className="object-fill"
                  priority
                />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Title */}
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-brand-strong sm:text-3xl lg:text-3xl">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-brand-strong sm:text-4xl">
                {formatPrice(product.price)}
              </span>

              {product.originalPrice ? (
                <span className="text-base font-medium text-text-muted line-through sm:text-lg">
                  {formatPrice(product.originalPrice)}
                </span>
              ) : null}

              {product.discount ? (
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                  Save {product.discount}%
                </span>
              ) : null}
            </div>

            <p className="mt-1 text-xs text-text-muted">
              Inclusive of all taxes. Free shipping on qualifying orders.
            </p>

            {/* Description */}
            <div className="mt-5 border-t border-gray-100 pt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-strong">
                Numismatic Overview
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">
                {product.description ??
                  `Genuine collectible coin from the ${product.category} category. Preserved with authentic historical patina and crisp detailing suitable for discerning coin collectors.`}
              </p>
            </div>

            {/* Wishlist & Actions */}
            <div className="mt-6 border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between">
                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={
                    isWishlisted
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                    isWishlisted
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-gray-200 bg-white text-brand-strong hover:border-accent hover:text-accent"
                  }`}
                >
                  <HeartIcon
                    filled={isWishlisted}
                    className="h-4 w-4"
                  />

                  <span>
                    {isWishlisted
                      ? "Wishlisted"
                      : "Add to Wishlist"}
                  </span>
                </button>
              </div>

              {/* Main Actions */}
              {product.stock === 0 ? (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  This coin is no longer available.
                </p>
              ) : product.stock === 1 ? (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                  type="button"
                  onClick={async () => {
                    if (inCart) {
                      setCartFeedback("already");
                      setTimeout(() => setCartFeedback(null), 2000);
                      return;
                    }
                    const added = await addToCart(product.id);
                    if (!added) return;
                    setCartFeedback("added");
                    setTimeout(() => setCartFeedback(null), 2000);
                  }}
                  className={`flex h-12 w-full cursor-pointer items-center justify-center rounded-xl text-base font-bold text-white shadow-sm transition-all ${
                    cartFeedback === "added"
                      ? "bg-accent scale-[0.99]"
                      : cartFeedback === "already"
                      ? "bg-brand-strong text-amber-200 scale-[0.99]"
                      : inCart
                      ? "bg-brand/90 hover:bg-brand-strong hover:shadow"
                      : "bg-brand hover:bg-brand-strong hover:shadow"
                  }`}
                >
                  {cartFeedback === "added"
                    ? "Added to Cart ✓"
                    : cartFeedback === "already"
                    ? "Already added to your cart"
                    : inCart
                    ? "Already in Cart"
                    : "Add to Cart"}
                  </button>

                  <button
                  type="button"
                  onClick={async () => {
                    if (!inCart && !(await addToCart(product.id))) return;
                    router.push("/cart");
                  }}
                  className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-accent text-base font-bold text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow"
                >
                  Buy Now
                  </button>
                </div>
              ) : null}
            </div>

            {/* Collector Trust Features */}
            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50/80 p-4 shadow-sm sm:p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-strong">
                Coins Gyaan Collector Assurance
              </h3>

              <div className="mt-3 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                <div className="flex items-center gap-2.5">
                  <ShieldIcon className="h-5 w-5 shrink-0 text-accent" />
                  <span className="font-medium text-brand-strong">
                    100% Guaranteed Authentic Coin
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <BoxIcon className="h-5 w-5 shrink-0 text-accent" />
                  <span className="font-medium text-brand-strong">
                    Secure Packaging
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <TruckIcon className="h-5 w-5 shrink-0 text-accent" />
                  <span className="font-medium text-brand-strong">
                    Pan India Fast Tracked Shipping
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <SafePaymentIcon className="h-5 w-5 shrink-0 text-accent" />
                  <span className="font-medium text-brand-strong">
                    100% Safe Payments
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED COINS */}
      {relatedProducts.length > 0 && (
        <section className="mt-14 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-brand-strong sm:text-2xl">
              {isTrendingFallback ? "You May Also Like" : "You May Also Like"}
            </h2>

            <Link
              href={isTrendingFallback ? "/trending" : categoryHref}
              className="text-sm font-semibold text-accent transition-colors hover:text-brand"
            >
              View More
            </Link>
          </div>

          <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2 sm:gap-4 lg:grid lg:grid-cols-5 lg:overflow-visible">
            {relatedProducts.map((relProduct) => (
              <div
                key={relProduct.id}
                className="w-[66vw] max-w-[300px] flex-none sm:w-[200px] lg:w-auto lg:flex-auto"
              >
                <ProductCard {...relProduct} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* Icons */

function ZoomIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
    </svg>
  );
}

function HeartIcon({
  filled = false,
  className = "h-5 w-5",
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 8.6c0 5-8 10-8 10s-8-5-8-10a4.3 4.3 0 0 1 8-2.4 4.3 4.3 0 0 1 8 2.4Z" />
    </svg>
  );
}

function ShieldIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
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
      <path d="M12 3 19 6v5c0 4.6-3.1 8.7-7 10-3.9-1.3-7-5.4-7-10V6l7-3Z" />
      <path d="m9.5 12 1.9 1.9L15 10.3" />
    </svg>
  );
}

function BoxIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
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
      <path d="m3.5 7 8.5-4 8.5 4-8.5 4-8.5-4Z" />
      <path d="M3.5 7v10l8.5 4 8.5-4V7" />
      <path d="M12 11v10" />
    </svg>
  );
}

function TruckIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
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
      <path d="M3 7h12v9H3z" />
      <path d="M15 10h3l3 3v3h-6z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="18" cy="18" r="1.8" />
    </svg>
  );
}

function SafePaymentIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
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
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 15h4" />
      <path d="M14 15h1" />
    </svg>
  );
}