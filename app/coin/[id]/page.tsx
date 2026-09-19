import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "../../../components/site-header";
import { SiteFooter, MobileBottomNav } from "../../../components/homepage-sections";
import { CoinDetailView } from "../../../components/coin-detail-view";
import { getProduct, getRelatedProducts } from "../../../lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

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
      `Buy authentic collectible ${product.name} at Coins Gyaan Store.`,
  };
}

export default async function CoinDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  // Count coins in the same category excluding this one
  const related = await getRelatedProducts(product);

  return (
    <main className="min-h-[100svh] bg-white pb-20 sm:pb-0">
      <SiteHeader />
      <CoinDetailView
        product={product}
        relatedProducts={related.products}
        isTrendingFallback={related.fallback}
      />
      <SiteFooter />
      <MobileBottomNav />
    </main>
  );
}
