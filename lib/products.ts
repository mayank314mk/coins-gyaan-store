export type CoinCategory =
  | "Republic India"
  | "British India"
  | "Princely States"
  | "Ancient India"
  | "Commemorative Coins"
  | "Rare"
  | "Scare"
  | "Medieval India"
  | "Error Coin"
  | "Die Variety";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  backImage?: string;
  category: CoinCategory;
  isNew?: boolean;
  discount?: number;
  description?: string;
};

const rawProducts: Omit<Product, "discount">[] = [
  {
    id: "p-001",
    name: "Republic India 1970 1 Rupee Definitive Coin",
    price: 550,
    originalPrice: 950,
    image: "/images/coins/1 Rs 1970 F.png",
    backImage: "/images/coins/1 Rs 1970 B.png",
    category: "Commemorative Coins",
    isNew: true,
    description:
      "Authentic Republic India 1970 1 Rupee coin in collectible grade condition. Features the iconic Lion Capital of Ashoka on the obverse and value with ear of corn design on the reverse.",
  },
  {
    id: "p-002",
    name: "Republic India 2005 5 Rupees 75 Years of Dandi March",
    price: 650,
    originalPrice: 900,
    image: "/images/coins/5 Rs DANDI F.png",
    backImage: "/images/coins/5 Rs DAANDI B.png",
    category: "Commemorative Coins",
    description:
      "Commemorating the historic 75th anniversary of Mahatma Gandhi's Salt Satyagraha / Dandi March. A sought-after commemorative issue for Indian history collectors.",
  },
  {
    id: "p-003",
    name: "Republic India 2007 5 Rupees 50 Years of Khadi & Village Industries",
    price: 480,
    originalPrice: 700,
    image: "/images/coins/5 Rs KHADI F.png",
    backImage: "/images/coins/5 Rs KHAADI B.png",
    category: "Commemorative Coins",
    description:
      "Special commemorative issue marking the golden jubilee of the Khadi and Village Industries Commission (KVIC), showcasing the spinning wheel motif.",
  },
  {
    id: "p-004",
    name: "Republic India 1982 1 Rupee National Integration Map Coin",
    price: 320,
    originalPrice: 500,
    image: "/images/coins/1 Rs 1982 F.png",
    backImage: "/images/coins/1 Rs 1982 B.png",
    category: "Republic India",
    isNew: true,
    description:
      "Issued in 1982 to promote national solidarity, depicting the outline map of India with national flag and integration motifs.",
  },
  {
    id: "p-005",
    name: "Republic India 1959 50 Naye Paise Rare Bombay Mint Coin",
    price: 1650,
    originalPrice: 2200,
    image: "/images/coins/50 Paise 1959 F.png",
    backImage: "/images/coins/50 Paise 1959 B.png",
    category: "Rare",
    description:
      "Highly collectible 1959 50 Naye Paise coin from the early decimal coinage era of Republic India. Preserved in exceptional collector condition.",
  },
  {
    id: "p-006",
    name: "Republic India 1993 25 Paise Rhinoceros Wildlife Issue",
    price: 240,
    originalPrice: 380,
    image: "/images/coins/25 Paise 1993 F.png",
    backImage: "/images/coins/25 Paise 1993 B.png",
    category: "Die Variety",
    description:
      "Iconic 25 Paise stainless steel coin depicting the Indian One-Horned Rhinoceros, a favorite among thematic wildlife and numismatic collectors.",
  },
  {
    id: "p-007",
    name: "Republic India 1957 50 Naye Paise First Year Decimal Series",
    price: 850,
    originalPrice: 1200,
    image: "/images/coins/50 Paise 1957 F.png",
    backImage: "/images/coins/50 Paise 1957 B.png",
    category: "Republic India",
    description:
      "First year of issue for India's decimal coinage system introduced on 1st April 1957. Featuring Ashoka Lion Capital and fractional rupee denomination.",
  },
  {
    id: "p-008",
    name: "Republic India 2007 5 Rupees 150 Years of First War of Independence",
    price: 350,
    originalPrice: 500,
    image: "/images/coins/5 Rs 1st WAR F.png",
    backImage: "/images/coins/5 Rs 1st WAR B.png",
    category: "Medieval India",
    isNew: true,
    description:
      "Issued to commemorate 150 years of the historic 1857 First War of Indian Independence. Depicts freedom fighters with national insignia.",
  },
  {
    id: "p-009",
    name: "Republic India 2021 5 Rupees Azadi Ka Amrit Mahotsav Definitive",
    price: 150,
    originalPrice: 220,
    image: "/images/coins/5 Rs 2021 F.png",
    backImage: "/images/coins/5 Rs 2021 B.png",
    category: "Republic India",
    description:
      "Modern commemorative bi-metallic/nickel-brass theme celebrating 75 years of India's independence under the Azadi Ka Amrit Mahotsav initiative.",
  },
  {
    id: "p-010",
    name: "Republic India 1996 2 Rupees Netaji Subhas Chandra Bose Centenary",
    price: 280,
    image: "/images/coins/2 Rs 1996 F.png",
    backImage: "/images/coins/2 Rs 1996 B.png",
    category: "Commemorative Coins",
    description:
      "Centenary commemorative issue celebrating the birth of Netaji Subhas Chandra Bose, featuring a prominent military portrait of Netaji.",
  },
  {
    id: "p-011",
    name: "Republic India 1998 2 Rupees Deshbandhu Chittaranjan Das",
    price: 240,
    image: "/images/coins/2 Rs 1998 F.png",
    backImage: "/images/coins/2 Rs 1998 B.png",
    category: "Commemorative Coins",
    description:
      "Commemorating the legacy of freedom fighter and jurist Deshbandhu Chittaranjan Das, with portrait and bilingual inscriptions.",
  },
  {
    id: "p-012",
    name: "Republic India 1985 1 Rupee International Youth Year Commemorative",
    price: 450,
    originalPrice: 650,
    image: "/images/coins/1 Rs 1985 F.png",
    backImage: "/images/coins/1 Rs 1985 B.png",
    category: "Republic India",
    isNew: true,
    description:
      "Cupro-nickel commemorative 1 Rupee coin marking the UN International Youth Year 1985, featuring profile motifs symbolizing youth advancement.",
  },
  {
    id: "p-013",
    name: "Republic India 1991 1 Rupee Tourism Year Commemorative Coin",
    price: 180,
    originalPrice: 280,
    image: "/images/coins/1 Rs 1991 F.png",
    backImage: "/images/coins/1 Rs 1991 B.png",
    category: "Republic India",
    description:
      "Official 1 Rupee issue highlighting India Tourism Year 1991 with stylized peacock motif representing Indian heritage.",
  },
  {
    id: "p-014",
    name: "Republic India 1986 50 Paise Fisheries Development Issue",
    price: 340,
    originalPrice: 480,
    image: "/images/coins/50 Paise 1986 F.png",
    backImage: "/images/coins/50 Paise 1986 B.png",
    category: "Scare",
    isNew: true,
    description:
      "Commemorative issue celebrating fisheries development in India with fisherman boat and ocean wave relief artwork.",
  },
  {
    id: "p-015",
    name: "Republic India 1988 50 Paise Definitive Series Coin",
    price: 210,
    originalPrice: 320,
    image: "/images/coins/50 Paise 1988 F.png",
    backImage: "/images/coins/50 Paise 1988 B.png",
    category: "Commemorative Coins",
    description:
      "Classic cupro-nickel 50 Paise coin from 1988 with crisp Ashoka Lion emblem and clean reverse typography.",
  },
  {
    id: "p-016",
    name: "Republic India 1983 1 Rupee Definitive Cupro-Nickel Coin",
    price: 260,
    originalPrice: 390,
    image: "/images/coins/1 Rs 1983 F.png",
    backImage: "/images/coins/1 Rs 1983 B.png",
    category: "Republic India",
    description:
      "Standard circulating coin of 1983 representing the iconic large cupro-nickel 1 Rupee series of the 1980s.",
  },
  {
    id: "p-017",
    name: "Republic India 1980 25 Paise Definitive Issue",
    price: 190,
    originalPrice: 300,
    image: "/images/coins/25 Paise 1980 F.png",
    backImage: "/images/coins/25 Paise 1980 B.png",
    category: "Republic India",
    description:
      "Vintage 1980 25 Paise coin featuring bold numeral 25, flanked by grain ears and national lion pillar crest.",
  },
  {
    id: "p-018",
    name: "Republic India 1996 50 Paise Sardar Vallabhbhai Patel",
    price: 220,
    originalPrice: 320,
    image: "/images/coins/50 Paise 1996 CROP F.png",
    backImage: "/images/coins/50 Paise 1996 CROP B.png",
    category: "Commemorative Coins",
    description:
      "Issued in honor of the Iron Man of India, Sardar Vallabhbhai Patel, commemorating his immense role in Indian national integration.",
  },
  {
    id: "p-019",
    name: "Republic India 1982 25 Paise IX Asian Games Delhi Commemorative",
    price: 290,
    originalPrice: 450,
    image: "/images/coins/25 Paise 1982 F.png",
    backImage: "/images/coins/25 Paise 1982 B.png",
    category: "Scare",
    description:
      "Special sports commemorative issue celebrating the 9th Asian Games held in New Delhi, featuring the Appu mascot and Asian Games emblem.",
  },
  {
    id: "p-020",
    name: "Republic India 1955 Two Annas Bull Type Rare Coin",
    price: 2400,
    originalPrice: 3200,
    image: "/images/coins/2 anna 1955 F.png",
    backImage: "/images/coins/2 anna 1955 B.png",
    category: "Rare",
    description:
      "Extremely popular pre-decimal cupro-nickel Two Annas coin depicting the charging Zebu bull, one of the most aesthetic Republic India coins.",
  },
  {
    id: "p-021",
    name: "Republic India 1953 1 Pice Single Paisa Galloping Horse",
    price: 890,
    originalPrice: 1300,
    image: "/images/coins/1 Pice 1953 F.png",
    backImage: "/images/coins/1 Pice 1953 B.png",
    category: "British India",
    isNew: true,
    description:
      "Historic bronze One Pice coin showing the dynamic galloping horse motif, minted during the formative post-independence transition era.",
  },
  {
    id: "p-022",
    name: "Republic India 1957 50 Naye Paise Choice Uncirculated",
    price: 780,
    originalPrice: 1100,
    image: "/images/coins/50 Paise 1957 B.png",
    backImage: "/images/coins/50 Paise 1957 F.png",
    category: "Ancient India",
    isNew: true,
    description:
      "Choice specimen of the initial decimal 50 Naye Paise series with sharp strikes on the Ashoka Lion crest and denomination.",
  },
  {
    id: "p-023",
    name: "Republic India 1986 50 Paise Special Mint Strike",
    price: 340,
    originalPrice: 500,
    image: "/images/coins/50 Paise 1986 B.png",
    backImage: "/images/coins/50 Paise 1986 F.png",
    category: "Scare",
    description:
      "Clean strike 1986 50 Paise coin highlighting FAO Fisheries initiative with crisp rim denticles and detailed reverse.",
  },
  {
    id: "p-024",
    name: "Republic India 1983 1 Rupee Collector Condition",
    price: 180,
    originalPrice: 280,
    image: "/images/coins/1 Rs 1983 B.png",
    backImage: "/images/coins/1 Rs 1983 F.png",
    category: "Republic India",
    description:
      "Well preserved 1983 1 Rupee specimen featuring clear date stamp and standard Indian Lion Capital obverse.",
  },
  {
    id: "p-025",
    name: "Republic India 1970 1 Rupee Vintage Series",
    price: 490,
    originalPrice: 750,
    image: "/images/coins/1 Rs 1970 B.png",
    backImage: "/images/coins/1 Rs 1970 F.png",
    category: "Princely States",
    description:
      "Vintage 1970 1 Rupee coin preserved in coin sleeve, featuring authentic mint patina and sharp edge reeding.",
  },
  {
    id: "p-026",
    name: "Republic India 1955 Two Annas Reverse View Variant",
    price: 2350,
    originalPrice: 3100,
    image: "/images/coins/2 anna 1955 B.png",
    backImage: "/images/coins/2 anna 1955 F.png",
    category: "Rare",
    description:
      "A prized two annas piece with distinct 1955 mint mark and bull engraving, highly sought after by vintage Indian coin enthusiasts.",
  },
  {
    id: "p-027",
    name: "Republic India 1953 1 Pice Galloping Horse Heritage Issue",
    price: 890,
    originalPrice: 1300,
    image: "/images/coins/1 Pice 1953 B.png",
    backImage: "/images/coins/1 Pice 1953 F.png",
    category: "Error Coin",
    isNew: true,
    description:
      "Classic 1953 One Pice showing pristine galloping horse design, high rims, and clear lettering.",
  },
];

function calcDiscount(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export const allProducts: Product[] = rawProducts.map((p) => ({
  ...p,
  discount: calcDiscount(p.price, p.originalPrice),
}));

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProductsByCategory(category: CoinCategory | "all"): Product[] {
  if (category === "all") return allProducts;
  return allProducts.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  return allProducts.filter((product) =>
    [product.name, product.category, product.description]
      .filter(Boolean)
      .some((field) => field!.toLowerCase().includes(normalizedQuery))
  );
}

export function getRelatedProducts(currentProduct: Product, limit: number = 5): Product[] {
  const sameCategory = allProducts.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const otherCoins = allProducts.filter(
    (p) => p.id !== currentProduct.id && !sameCategory.some((sc) => sc.id === p.id)
  );
  return [...sameCategory, ...otherCoins].slice(0, limit);
}

export type SortOption =
  | "new-arrivals"
  | "price-low-high"
  | "price-high-low"
  | "discount";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "new-arrivals", label: "New Arrivals" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "discount", label: "Discount" },
];

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const list = [...products];
  switch (sort) {
    case "price-low-high":
      return list.sort((a, b) => a.price - b.price);
    case "price-high-low":
      return list.sort((a, b) => b.price - a.price);
    case "discount":
      return list.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
    case "new-arrivals":
    default:
      return list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  }
}

export function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
