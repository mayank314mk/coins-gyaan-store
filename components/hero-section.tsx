"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    image: "/banner1.png",
    alt: "Coins Gyaan collectible coin collection",
  },
  {
    image: "/banner2.png",
    alt: "Coins Gyaan rare Indian coin collection",
  },
  {
    image: "/banner3.png",
    alt: "Coins Gyaan heritage coin collection",
  },
] as const;

const AUTOPLAY_MS = 4500;

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto slide
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(nextSlide, AUTOPLAY_MS);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Touch handling
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart.current - touchEnd;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Desktop hover pause
  const handleMouseEnter = () => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover)").matches
    ) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover)").matches
    ) {
      setIsPaused(false);
    }
  };

  return (
    <section className="w-full bg-white px-3 py-2.5 sm:px-5 sm:py-3.5 md:px-0 md:py-0">
      <div className="w-full md:mx-auto">
        <div
          className="relative aspect-[2120/742] w-full overflow-hidden rounded-2xl md:rounded-none"
          style={{ touchAction: "pan-y" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Track */}
          <div
            className="flex h-full w-full transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${current * 100}%)`,
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={slide.image}
                className="relative h-full w-full shrink-0"
                style={{ flex: "0 0 100%" }}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Previous */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/20 text-white shadow-md backdrop-blur-md transition hover:bg-white/35 md:grid lg:left-6"
          >
            <Chevron direction="left" />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/20 text-white shadow-md backdrop-blur-md transition hover:bg-white/35 md:grid lg:right-6"
          >
            <Chevron direction="right" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-1.5 md:flex">
            {slides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrent(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === dotIdx
                    ? "w-6 bg-white shadow-sm"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      className="h-5 w-5"
    >
      <path
        d={
          direction === "left"
            ? "m14 6-6 6 6 6"
            : "m10 6 6 6-6 6"
        }
      />
    </svg>
  );
}