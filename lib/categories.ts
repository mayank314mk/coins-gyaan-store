import type { CoinCategory } from "./products";

export type CategoryItem = {
  name: CoinCategory;
  slug: string;
  href: string;
  image: string;
  shortName?: string;
};

export const CATEGORIES: CategoryItem[] = [
  {
    name: "Republic India",
    slug: "republic-india",
    href: "/all-coins?category=republic-india",
    image: "/images/coins/1 Rs 1985 F.png",
  },
  {
    name: "British India",
    slug: "british-india",
    href: "/all-coins?category=british-india",
    image: "/images/coins/1 Pice 1953 B.png",
  },
  {
    name: "Princely States",
    slug: "princely-states",
    href: "/all-coins?category=princely-states",
    image: "/images/coins/1 Rs 1970 B.png",
  },
  {
    name: "Ancient India",
    slug: "ancient-india",
    href: "/all-coins?category=ancient-india",
    image: "/images/coins/50 Paise 1957 B.png",
  },
  {
    name: "Commemorative Coins",
    slug: "commemorative-coins",
    href: "/all-coins?category=commemorative-coins",
    image: "/images/coins/5 Rs 1st WAR F.png",
  },
  {
    name: "Rare",
    slug: "rare",
    href: "/all-coins?category=rare",
    image: "/images/coins/50 Paise 1959 B.png",
  },
  {
    name: "Scare",
    slug: "scare",
    href: "/all-coins?category=scare",
    image: "/images/coins/50 Paise 1986 F.png",
  },
  {
    name: "Medieval India",
    slug: "medieval-india",
    href: "/all-coins?category=medieval-india",
    image: "/images/coins/5 Rs 1st WAR B.png",
  },
  {
    name: "Error Coin",
    slug: "error-coins",
    href: "/all-coins?category=error-coins",
    image: "/images/coins/1 Pice 1953 B.png",
    shortName: "Error Coins",
  },
  {
    name: "Die Variety",
    slug: "die-variety",
    href: "/all-coins?category=die-variety",
    image: "/images/coins/25 Paise 1993 F.png",
  },
];

// Curated items for desktop category bar so they fit comfortably on desktop screens without horizontal scroll
export const DESKTOP_NAV_CATEGORIES = [
  { label: "All Coins", href: "/all-coins", slug: "all" },
  { label: "Republic India", href: "/all-coins?category=republic-india", slug: "republic-india" },
  { label: "British India", href: "/all-coins?category=british-india", slug: "british-india" },
  { label: "Princely States", href: "/all-coins?category=princely-states", slug: "princely-states" },
  { label: "Ancient India", href: "/all-coins?category=ancient-india", slug: "ancient-india" },
  { label: "Commemorative", href: "/all-coins?category=commemorative-coins", slug: "commemorative-coins" },
  { label: "Rare", href: "/all-coins?category=rare", slug: "rare" },
  { label: "Scare", href: "/all-coins?category=scare", slug: "scare" },
  { label: "Medieval India", href: "/all-coins?category=medieval-india", slug: "medieval-india" },
  { label: "Error Coins", href: "/all-coins?category=error-coins", slug: "error-coins" },
  { label: "Die Variety", href: "/all-coins?category=die-variety", slug: "die-variety" },
] as const;

export function getCategoryBySlug(slug: string): CategoryItem | undefined {
  const normalized = slug.toLowerCase().trim();
  return CATEGORIES.find(
    (c) => c.slug.toLowerCase() === normalized || c.name.toLowerCase() === normalized
  );
}
