import Image from "next/image";
import type { Product } from "../lib/products";
import { formatPrice } from "../lib/products";

export function ProductCard({ name, price, originalPrice, image, discount }: Product) {
  return (
    <article className="relative flex h-full w-full cursor-pointer flex-col rounded-2xl border border-gray-200 bg-gray-50 p-3.5 shadow-sm transition-all hover:border-gray-300 hover:shadow-md">
      <button
        type="button"
        aria-label={`Add ${name} to wishlist`}
        className="cursor-pointer absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full text-accent transition-transform hover:bg-white"
      >
        <HeartIcon />
      </button>
      <div className="relative flex aspect-square w-full items-center justify-center rounded-xl bg-gray-50 p-2 sm:p-3">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 30vw, 20vw"
          className="object-contain p-2"
        />
      </div>
      <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-5 text-brand-strong">
        {name}
      </h3>
      <div className="flex flex-col items-start gap-1.5">
        <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
          <span className="text-xl sm:text-[22px] font-bold text-brand-strong leading-tight">
            {formatPrice(price)}
          </span>
          {originalPrice ? (
            <span className="text-xs sm:text-sm font-medium text-text-muted line-through">
              {formatPrice(originalPrice)}
            </span>
          ) : null}
        </div>
        {discount ? (
          <span className="rounded-full mb-3 bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
            {discount}% OFF
          </span>
        ) : null}
      </div>
      <button className="cursor-pointer mt-auto h-9 w-full rounded-md bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-strong">
        Add to Cart
      </button>
    </article>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-accent"
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
