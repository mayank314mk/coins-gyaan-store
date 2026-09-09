import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "../../../components/site-header";
import { SiteFooter, MobileBottomNav } from "../../../components/homepage-sections";
import { CoinDetailView } from "../../../components/coin-detail-view";
import { getProductById, allProducts } from "../../../lib/products";

export async function generateStaticParams() {
  return allProducts.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Coin Not Found | Coins Gyaan Store",
      description: "The requested collectible coin could not be found.",
    };
  }

  return {
    title: `${product.name} | Coins Gyaan Store`,
    description:
      product.description ??
      `Buy authentic collectible ${product.name} (${product.year}) at Coins Gyaan Store.`,
  };
}

export default async function CoinDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  // Count coins in the same category excluding this one
  const sameCategoryCoins = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  // If fewer than 5 same-category coins (which means if current category coins is less than 6 including current),
  // show trending coins (first 5 from all products, excluding current)
  const isTrendingFallback = sameCategoryCoins.length < 5;
  const relatedProducts = isTrendingFallback
    ? allProducts.filter((p) => p.id !== product.id).slice(0, 5)
    : sameCategoryCoins.slice(0, 5);

  return (
    <main className="min-h-[100svh] bg-white pb-20 sm:pb-0">
      <SiteHeader />
      <CoinDetailView
        product={product}
        relatedProducts={relatedProducts}
        isTrendingFallback={isTrendingFallback}
      />
      <SiteFooter />
      <MobileBottomNav />
    </main>
  );
}
