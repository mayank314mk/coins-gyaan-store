import Image from "next/image";

const heroStats = [
  {
    value: "10,000+",
    label: "Happy Collectors",
    icon: PeopleIcon,
  },
  {
    value: "5000+",
    label: "Coins Available",
    icon: CoinStackIcon,
  },
  {
    value: "4.9",
    label: "Average Rating",
    icon: StarIcon,
  },
] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle/60 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_35%),linear-gradient(180deg,#f7f1e5_0%,#f5efdf_48%,#f6f0e6_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_28%,rgba(20,57,47,0.06),transparent_18%),radial-gradient(circle_at_18%_12%,rgba(183,139,71,0.08),transparent_16%)]" />
      <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 sm:py-6 lg:px-8 xl:px-10 lg:py-8">
        <div className="grid w-full items-center gap-5 rounded-[28px] bg-[linear-gradient(135deg,#102b22_0%,#14392f_55%,#0a1d15_100%)] px-5 py-6 text-surface shadow-[0_18px_40px_rgba(20,57,47,0.16)] sm:px-6 sm:py-7 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 lg:px-8 lg:py-8 lg:rounded-[36px]">
          <div className="relative z-10 max-w-[620px] pb-1 pt-1 text-surface lg:pb-4 lg:pt-3">
            <h1 className="max-w-[520px] text-[clamp(2rem,7vw,4.1rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-surface sm:text-[clamp(2.35rem,5.2vw,4.1rem)]">
              Own a Piece of Indian History
            </h1>
            <p className="mt-4 max-w-[540px] text-[clamp(0.95rem,3.8vw,1.12rem)] leading-[1.56] text-surface/80 lg:mt-5">
              Discover a wide collection of Indian Coins from different eras and celebrate our rich heritage.
            </p>

            <div className="mt-6 lg:mt-7">
              <a
                href="#"
                className="inline-flex h-12 items-center gap-3 rounded-xl bg-brand px-6 text-sm font-medium text-white shadow-[0_10px_24px_rgba(20,57,47,0.18)] transition-colors hover:bg-brand-strong"
              >
                <span>Shop Now</span>
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-7 hidden max-w-[560px] grid-cols-3 gap-4 sm:grid sm:gap-6 lg:mt-8">
              {heroStats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border border-border-subtle bg-surface text-brand-strong shadow-sm">
                    <Icon />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[1.05rem] font-semibold tracking-tight text-foreground">
                      {value}
                    </div>
                    <div className="text-xs leading-tight text-text-muted sm:text-sm">
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-[320px] items-center justify-center lg:min-h-[440px]">
            <div className="absolute inset-x-12 bottom-10 h-20 rounded-full bg-[radial-gradient(circle,rgba(183,139,71,0.25)_0%,rgba(183,139,71,0.12)_34%,transparent_72%)] blur-2xl lg:inset-x-20 lg:bottom-14 lg:h-24" />

            <div className="relative h-[250px] w-full max-w-[540px] sm:h-[320px] lg:h-[430px] xl:h-[460px]">
              <CoinImage
                src="/coin-large-left.png"
                alt="Aged Indian coin"
                className="left-[6%] top-[16%] h-[54%] w-[54%] rotate-[-9deg]"
                priority
              />
              <CoinImage
                src="/coin-medium-top.png"
                alt="Silver Indian coin"
                className="left-[50%] top-[7%] h-[45%] w-[45%] rotate-[2deg]"
                priority
              />
              <CoinImage
                src="/coin-scalloped-front.png"
                alt="Scalloped Indian coin"
                className="left-[34%] top-[49%] h-[34%] w-[34%] rotate-[1deg]"
              />
              <CoinImage
                src="/coin-gold-small.png"
                alt="Gold Indian coin"
                className="left-[69%] top-[43%] h-[37%] w-[37%] rotate-[5deg]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoinImage({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
}) {
  return (
    <div className={`absolute drop-shadow-[0_18px_30px_rgba(72,53,25,0.22)] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 40vw, 24vw"
        className="object-contain"
      />
    </div>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h12" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M13.5 11a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" />
      <path d="M3.8 19.5c.6-2.7 2.6-4.4 5.2-4.4s4.6 1.7 5.2 4.4" />
      <path d="M12.6 18.8c.4-1.7 1.7-2.8 3.4-2.8 1.8 0 3.1 1.1 3.6 2.8" />
    </svg>
  );
}

function CoinStackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="7.2" rx="5.8" ry="2.4" />
      <path d="M6.2 7.2v5.2c0 1.3 2.6 2.4 5.8 2.4s5.8-1.1 5.8-2.4V7.2" />
      <path d="M6.2 12.4v3.3c0 1.3 2.6 2.4 5.8 2.4s5.8-1.1 5.8-2.4v-3.3" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3.5 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9L12 3.5Z" />
    </svg>
  );
}