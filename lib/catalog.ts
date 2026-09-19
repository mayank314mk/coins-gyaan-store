import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import type { Product, SortOption } from "./products";

const select = {
  id: true, name: true, price: true, originalPrice: true, image: true,
  backImage: true, category: true, isTrending: true, description: true, stock: true,
} satisfies Prisma.ProductSelect;

export function toProduct(product: Prisma.ProductGetPayload<{ select: typeof select }>): Product {
  const price = Number(product.price);
  const originalPrice = product.originalPrice === null ? undefined : Number(product.originalPrice);
  return { ...product, category: product.category as Product["category"], backImage: product.backImage ?? undefined, description: product.description ?? undefined, price, originalPrice, discount: originalPrice && originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0 };
}

export async function getProduct(id: string) {
  const product = await prisma.product.findUnique({ where: { id }, select });
  return product ? toProduct(product) : null;
}

export async function getRelatedProducts(product: Product, limit = 5) {
  const same = await prisma.product.findMany({ where: { category: product.category, id: { not: product.id } }, orderBy: { createdAt: "desc" }, take: limit, select });
  if (same.length >= limit) return { products: same.map(toProduct), fallback: false };
  const other = await prisma.product.findMany({ where: { id: { notIn: [product.id, ...same.map((item) => item.id)] } }, orderBy: { createdAt: "desc" }, take: limit - same.length, select });
  return { products: [...same, ...other].map(toProduct), fallback: same.length < limit };
}

export async function getCatalog({ category, sort = "new-arrivals", page = 1, query }: { category?: string; sort?: SortOption; page?: number; query?: string }) {
  const where: Prisma.ProductWhereInput = {
    ...(category && category !== "all" ? { category } : {}),
    ...(query?.trim() ? { OR: [{ name: { contains: query.trim(), mode: "insensitive" } }, { category: { contains: query.trim(), mode: "insensitive" } }, { description: { contains: query.trim(), mode: "insensitive" } }] } : {}),
  };
  const orderBy: Prisma.ProductOrderByWithRelationInput[] = sort === "price-low-high" ? [{ price: "asc" }] : sort === "price-high-low" ? [{ price: "desc" }] : [{ isTrending: "desc" }, { createdAt: "desc" }];
  const safePage = Math.max(1, Number.isFinite(page) ? page : 1);
  const [total, rows] = await Promise.all([prisma.product.count({ where }), prisma.product.findMany({ where, orderBy, ...(sort === "discount" ? {} : { skip: (safePage - 1) * 20, take: 20 }), select })]);
  const ordered = rows.map(toProduct).sort(sort === "discount" ? (a, b) => (b.discount ?? 0) - (a.discount ?? 0) : () => 0);
  const products = sort === "discount" ? ordered.slice((safePage - 1) * 20, safePage * 20) : ordered;
  return { products, total, page: safePage, totalPages: Math.max(1, Math.ceil(total / 20)) };
}

export async function getFeaturedProducts(limit = 5) {
  return (await prisma.product.findMany({ orderBy: [{ isTrending: "desc" }, { createdAt: "desc" }], take: limit, select })).map(toProduct);
}
