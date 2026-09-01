import Image from "next/image";

const categories = [
  "Republic India",
  "British India",
  "Princely States",
  "Ancient India",
  "Commemorative Coins",
  "Rare",
  "Scare",
  "Medieval India",
  "Error Coin",
  "Die Variety",
] as const;

const categoryImages = [
  "/coin-large-left.png",
  "/coin-medium-top.png",
  "/coin-gold-small.png",
  "/coin-scalloped-front.png",
] as const;

const products = [
  {
    name: "Republic India 1970 20 Rupees Food & Agriculture Organization",
    price: "₹550",
    originalPrice: "₹950",
    image: "/coin-medium-top.png",
  },
  {
    name: "Republic India 1988 10 Paise Scalloped Edge Commemorative Coin",
    price: "₹150",
    originalPrice: "₹300",
    image: "/coin-scalloped-front.png",
  },
  {
    name: "Republic India 2010 2 Rupees Ashoka Pillar Lion Capital Definitive",
    price: "₹350",
    originalPrice: "₹650",
    image: "/coin-large-left.png",
  },
  {
    name: "Republic India 1997 2 Rupees Netaji Subhas Chandra Bose Centenary",
    price: "₹250",
    originalPrice: "₹450",
    image: "/coin-gold-small.png",
  },
  {
    name: "Republic India 2010 5 Rupees Platinum Jubilee of Reserve Bank",
    price: "₹450",
    originalPrice: "₹850",
    image: "/coin-large-left.png",
  },
] as const;

export function CategorySection() {
  return (
    <section
      id="categories"
      className="bg-white px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading title="Explore by Category" />
        <div className="hide-scrollbar flex gap-2 sm:gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-10 lg:gap-3 lg:overflow-visible">
          {categories.map((category, index) => (
            <a
              key={category}
              href="#"
              className="group flex w-[100px] flex-none flex-col items-center rounded-2xl p-2.5 text-center transition-colors hover:bg-gray-100 lg:w-auto"
            >
              <div className="relative flex h-[76px] w-[76px] items-center justify-center sm:h-[84px] sm:w-[84px]">
                <Image
                  src={categoryImages[index % categoryImages.length]}
                  alt=""
                  fill
                  sizes="84px"
                  className="object-contain p-1 transition-transform duration-200 group-hover:scale-100"
                />
              </div>
              <span className="mt-2 block text-xs font-semibold leading-4 text-brand-strong">
                {category}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrendingSection() {
  return (
    <section
      id="trending"
      className="bg-white px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading title="Trending Coins" action="View All" />
        <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-2 sm:gap-4 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
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
                alt="PRICE of All Rare Coins of Republic India video thumbnail"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 288px, 200px"
                className="rounded-xl object-cover"
              />
            </a>

            {/* Views + button:
                mobile  → full-width row, justify-between (views left, button right)
                desktop → centered column */}
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

          {/* Video title — below everything, full card width on all screen sizes */}
          <p className="mt-3 text-sm leading-5 text-text-muted lg:text-center">
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
  [SupportIcon, "Easy Returns & Support", "Customer support and return policy"],
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
  const groups = [
    {
      title: "Shop",
      links: [
        "All Coins",
        "Republic India",
        "British India",
        "Princely States",
        "Ancient India",
        "Commemorative Coins",
        "Rare",
        "Scare",
        "Error Coin",
        "Die Variety",
      ],
    },
    {
      title: "Customer Service",
      links: [
        "Track Order",
        "Shipping & Delivery",
        "Returns & Refunds",
        "FAQs",
        "Contact Us",
      ],
    },
    {
      title: "Company",
      links: [
        "About Us",
        "YouTube Channel",
        "Coin Guide",
        "Terms & Conditions",
        "Privacy Policy",
      ],
    },
  ];

  return (
    <footer className="bg-brand px-4 pb-[88px] pt-10 text-white sm:px-6 lg:px-8 lg:pb-8">
      <div className="mx-auto grid max-w-[1440px] gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a href="#" className="flex items-center gap-3">
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
          </a>
          <p className="mt-3 text-sm font-medium text-white/85">
            Preserve History. Treasure India.
          </p>
          <p className="mt-3 max-w-[280px] text-xs leading-5 text-white/70">
            A focused home for Indian numismatics, collectible coins and
            collecting knowledge.
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              {group.title}
            </h2>
            <ul className="mt-3 space-y-2 text-xs text-white/70">
              {group.links.map((link) => (
                <li key={link}>
                  <a href="#" className="transition-colors hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-8 flex max-w-[1440px] flex-col gap-2 border-t border-white/15 pt-4 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <span>Copyright 2026 Coins Gyaan Store. All rights reserved.</span>
        <span>Secure payments - Cards - UPI</span>
      </div>
    </footer>
  );
}

export function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex justify-around border-t border-gray-200 bg-white/95 px-3 py-2 text-[11px] font-semibold text-brand-strong backdrop-blur sm:hidden">
      <NavItem label="Home" icon={<HomeIcon />} />
      <a href="#categories" className="grid place-items-center gap-1">
        <GridIcon />
        <span>Categories</span>
      </a>
      <a href="#trending" className="grid place-items-center gap-1">
        <CartIcon />
        <span>Cart</span>
      </a>
      <NavItem label="Account" icon={<UserIcon />} />
    </nav>
  );
}

function ProductCard({
  name,
  price,
  originalPrice,
  image,
}: (typeof products)[number]) {
  return (
    <article className="cursor-pointer flex w-[245px] flex-none flex-col rounded-2xl border border-gray-200 bg-gray-50 p-3.5 shadow-sm transition-all hover:border-gray-300 hover:shadow-md sm:w-[265px] lg:w-auto">
      <div className="relative flex h-40 sm:h-44 items-center justify-center rounded-xl bg-gray-50 p-2">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 220px, 20vw"
          className="object-contain p-2"
        />
      </div>
      <h3 className="mt-3 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-brand-strong">
        {name}
      </h3>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <p className="text-lg font-bold text-brand-strong">{price}</p>
          <span className="text-xs font-medium text-text-muted line-through">
            {originalPrice}
          </span>
        </div>
        <button
          aria-label={`Add ${name} to wishlist`}
          className="grid h-8 w-8 place-items-center rounded-full text-brand-strong transition-colors hover:bg-gray-200"
        >
          <HeartIcon />
        </button>
      </div>
      <button className="mt-3 h-9 rounded-md bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-strong">
        Add to Cart
      </button>
    </article>
  );
}

function SectionHeading({ title, action }: { title: string; action?: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-bold tracking-tight text-brand-strong sm:text-2xl">
        {title}
      </h2>
      {action && (
        <a
          href="#"
          className="text-sm font-semibold text-accent transition-colors hover:text-brand"
        >
          {action} <span aria-hidden="true">-&gt;</span>
        </a>
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

function NavItem({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <a href="#" className="grid place-items-center gap-1">
      {icon}
      <span>{label}</span>
    </a>
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

function SupportIcon({ className }: { className?: string }) {
  return (
    <IconShell className={className}>
      <path d="M5 14v-2a7 7 0 0 1 14 0v2" />
      <path d="M5 14v3h3v-4H5M19 14v3h-3v-4h3M16 19c-1 1-2 1-4 1" />
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

function HeartIcon() {
  return (
    <IconShell>
      <path d="M20 8.6c0 5-8 10-8 10s-8-5-8-10a4.3 4.3 0 0 1 8-2.4 4.3 4.3 0 0 1 8 2.4Z" />
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
