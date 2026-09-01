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
  year: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: CoinCategory;
  isNew?: boolean;
  discount?: number;
};

const rawProducts: Omit<Product, "discount">[] = [
  {
    id: "p-001",
    name: "Republic India 1970 ",
    year: "1970",
    price: 550,
    originalPrice: 950,
    image: "/images/coins/10 Rs Food fol All F.png",
    category: "Commemorative Coins",
    isNew: true,
  },
  {
    id: "p-002",
    name: "Republic India 1969",
    year: "1969",
    price: 1850,
    image: "/images/coins/10 Rs Gandhi F.png",
    category: "Commemorative Coins",
  },
  {
    id: "p-003",
    name: "Republic India 1972 10 Rupees 25th Anniversary of Independence",
    year: "1972",
    price: 850,
    originalPrice: 1200,
    image: "/images/coins/10 Rs 25th Ani Ind F.png",
    category: "Commemorative Coins",
  },
  {
    id: "p-004",
    name: "Republic India 1973 20 Rupees Grow More Food / Water For Life",
    year: "1973",
    price: 1250,
    originalPrice: 1800,
    image: "/images/coins/20 Rs Rain Drop F.png",
    category: "Commemorative Coins",
    isNew: true,
  },
  {
    id: "p-005",
    name: "Republic India 2006 10 Rupees VIP Proof Set State Bank of India",
    year: "2006",
    price: 4500,
    originalPrice: 6000,
    image: "/images/coins/10 Rs 2006 VIP Set B.png",
    category: "Rare",
  },
  {
    id: "p-006",
    name: "Republic India 2005 10 Rupees Unity in Diversity Cross Mumbai Mint",
    year: "2005",
    price: 1200,
    originalPrice: 1750,
    image: "/images/coins/10 Cross B Mumbai Mint.png",
    category: "Error Coin",
  },
  {
    id: "p-007",
    name: "Republic India 2015 10 Rupees Tatya Tope Commemorative Coin",
    year: "2015",
    price: 220,
    originalPrice: 350,
    image: "/images/coins/10 Rs Tatya Tope B.png",
    category: "Commemorative Coins",
  },
  {
    id: "p-008",
    name: "Republic India 2007 5 Rupees 150 Years of First War of Independence",
    year: "2007",
    price: 350,
    originalPrice: 500,
    image: "/images/coins/5 Rs 1st WAR F.png",
    category: "Medieval India",
    isNew: true,
  },
  {
    id: "p-009",
    name: "Republic India 2021 5 Rupees Azadi Ka Amrit Mahotsav Definitive",
    year: "2021",
    price: 150,
    originalPrice: 220,
    image: "/images/coins/5 Rs 2021 B.png",
    category: "Republic India",
  },
  {
    id: "p-010",
    name: "Republic India 1996 2 Rupees Netaji Subhas Chandra Bose Centenary",
    year: "1996",
    price: 280,
    image: "/images/coins/2 Rs 1996 F.png",
    category: "Commemorative Coins",
  },
  {
    id: "p-011",
    name: "Republic India 1998 2 Rupees Deshbandhu Chittaranjan Das",
    year: "1998",
    price: 240,
    image: "/images/coins/2 Rs 1998 F.png",
    category: "Commemorative Coins",
  },
  {
    id: "p-012",
    name: "Republic India 1985 1 Rupee International Youth Year Commemorative",
    year: "1985",
    price: 450,
    originalPrice: 650,
    image: "/images/coins/1 Rs 1985 F.png",
    category: "Republic India",
    isNew: true,
  },
  {
    id: "p-013",
    name: "Republic India 1991 1 Rupee Tourism Year Commemorative Coin",
    year: "1991",
    price: 180,
    originalPrice: 280,
    image: "/images/coins/1 Rs 1991 B.png",
    category: "Republic India",
  },
  {
    id: "p-014",
    name: "Republic India 1959 50 Naye Paise Rare Bombay Mint Coin",
    year: "1959",
    price: 1650,
    originalPrice: 2200,
    image: "/images/coins/50 Paise 1959 B.png",
    category: "Rare",
    isNew: true,
  },
  {
    id: "p-015",
    name: "Republic India 1978 50 Paise Food & Work For All FAO Issue",
    year: "1978",
    price: 320,
    image: "/images/coins/50 Paise 1978 B.png",
    category: "Commemorative Coins",
  },
  {
    id: "p-016",
    name: "Republic India 1982 50 Paise National Integration Map Coin",
    year: "1982",
    price: 260,
    originalPrice: 390,
    image: "/images/coins/50 Paise 1982 B.png",
    category: "Republic India",
  },
  {
    id: "p-017",
    name: "Republic India 1993 50 Paise Parliament House Mumbai Mint",
    year: "1993",
    price: 190,
    originalPrice: 300,
    image: "/images/coins/50 Paise 1993 MUMBAI B.png",
    category: "Republic India",
  },
  {
    id: "p-018",
    name: "Republic India 1996 50 Paise Sardar Vallabhbhai Patel",
    year: "1996",
    price: 220,
    originalPrice: 320,
    image: "/images/coins/50 Paise 1996 CROP F.png",
    category: "Commemorative Coins",
  },
  {
    id: "p-019",
    name: "Republic India 1981 25 Paise Rural Women's Advancement FAO",
    year: "1981",
    price: 290,
    originalPrice: 450,
    image: "/images/coins/25 Paise 1981 B.png",
    category: "Scare",
  },
  {
    id: "p-020",
    name: "Republic India 1982 25 Paise IX Asian Games Delhi Commemorative",
    year: "1982",
    price: 210,
    originalPrice: 350,
    image: "/images/coins/25 Paise 1982 F.png",
    category: "Commemorative Coins",
  },
  {
    id: "p-021",
    name: "Republic India 1993 25 Paise Rhinoceros Wildlife Issue",
    year: "1993",
    price: 180,
    originalPrice: 260,
    image: "/images/coins/25 paise 1993 F new.png",
    category: "Die Variety",
  },
  {
    id: "p-022",
    name: "Republic India 1968 20 Paise Lotus Aluminum Bronze Coin",
    year: "1968",
    price: 380,
    originalPrice: 550,
    image: "/images/coins/20 Paisa B.png",
    category: "Ancient India",
    isNew: true,
  },
  {
    id: "p-023",
    name: "Republic India 1997 20 Paise 50 Years of Independence Commemorative",
    year: "1997",
    price: 340,
    originalPrice: 500,
    image: "/images/coins/20 Paise 1997 B.png",
    category: "Scare",
  },
  {
    id: "p-024",
    name: "Republic India 1984 5 Paise Square Aluminum Coin",
    year: "1984",
    price: 120,
    originalPrice: 200,
    image: "/images/coins/5 Paise 1984 B.png",
    category: "Republic India",
  },
  {
    id: "p-025",
    name: "Republic India 1969 2 Paise Mahatma Gandhi Centenary Aluminum Coin",
    year: "1969",
    price: 350,
    image: "/images/coins/2 Paise 1969 B.png",
    category: "Princely States",
  },
  {
    id: "p-026",
    name: "Republic India 1955 Two Annas Bull Type Rare Coin",
    year: "1955",
    price: 2400,
    originalPrice: 3200,
    image: "/images/coins/2 anna 1955 B.png",
    category: "Rare",
  },
  {
    id: "p-027",
    name: "Republic India 1953 1 Pice Single Paisa Galloping Horse",
    year: "1953",
    price: 890,
    originalPrice: 1300,
    image: "/images/coins/1 Pice 1953 B.png",
    category: "British India",
    isNew: true,
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

export function getProductsByCategory(category: CoinCategory | "all"): Product[] {
  if (category === "all") return allProducts;
  return allProducts.filter((p) => p.category === category);
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
