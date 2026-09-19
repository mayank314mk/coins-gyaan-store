"use server";

import { OrderStatus, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "../../lib/admin";
import { prisma } from "../../lib/prisma";
import { CATEGORIES } from "../../lib/categories";

type ProductInput = { id?: string; name: string; price: string; originalPrice: string; image: string; backImage: string; category: string; description: string; isTrending: boolean; stock: number };
type AdminResult<T> = { ok: true; data: T } | { ok: false; error: string };
type AdminData = { products: Prisma.ProductGetPayload<{ select: { id: true; name: true; price: true; originalPrice: true; image: true; backImage: true; category: true; isTrending: true; description: true; stock: true; createdAt: true } }>[]; orders: Prisma.OrderGetPayload<{ include: { user: { select: { name: true; email: true } }; items: true } }>[] };

function validateProduct(input: ProductInput) {
  const name = input.name.trim(); const image = input.image.trim(); const category = input.category.trim();
  const price = Number(input.price); const originalPrice = input.originalPrice.trim() ? Number(input.originalPrice) : null;
  if (!name || name.length > 160 || !CATEGORIES.some((item) => item.name === category)) throw new Error("Product name and category are required.");
  if (!Number.isFinite(price) || price < 0 || (originalPrice !== null && (!Number.isFinite(originalPrice) || originalPrice < 0 || (originalPrice !== 0 && originalPrice < price)))) throw new Error("Enter valid product pricing.");
  if (!image.startsWith("/images/")) throw new Error("Product image must use an existing /images/ asset path.");
  if (input.backImage && !input.backImage.startsWith("/images/")) throw new Error("Back image must use an existing /images/ asset path.");
  if (!Number.isInteger(input.stock) || input.stock < 0 || input.stock > 1) throw new Error("Stock must be 0 or 1 for a unique coin.");
  return { name, price, originalPrice, image, backImage: input.backImage.trim() || null, category, description: input.description.trim() || null, isTrending: input.isTrending, stock: input.stock };
}

export async function getAdminData(): Promise<AdminResult<AdminData>> {
  try {
    await requireAdmin();
    const [products, orders] = await Promise.all([
      prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.order.findMany({ orderBy: { createdAt: "desc" }, include: { user: { select: { name: true, email: true } }, items: true } }),
    ]);
    return { ok: true, data: { products, orders } };
  } catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Unable to load admin data." }; }
}

export async function saveProduct(input: ProductInput): Promise<AdminResult<null>> {
  try {
    await requireAdmin(); const data = validateProduct(input);
    if (input.id) await prisma.product.update({ where: { id: input.id }, data });
    else await prisma.product.create({ data: { id: `p-${crypto.randomUUID()}`, ...data } });
    revalidatePath("/admin"); revalidatePath("/all-coins"); return { ok: true, data: null };
  } catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Unable to save product." }; }
}

export async function deleteProduct(id: string): Promise<AdminResult<null>> {
  try { await requireAdmin(); await prisma.product.delete({ where: { id } }); revalidatePath("/admin"); revalidatePath("/all-coins"); return { ok: true, data: null }; }
  catch (error) { return { ok: false, error: error instanceof Error ? "This product cannot be deleted while it is referenced by an active cart or wishlist." : "Unable to delete product." }; }
}

export async function updateOrderStatus(id: string, status: string): Promise<AdminResult<null>> {
  try { await requireAdmin(); if (!Object.values(OrderStatus).includes(status as OrderStatus)) throw new Error("Invalid order status."); await prisma.order.update({ where: { id }, data: { status: status as OrderStatus } }); revalidatePath("/admin"); revalidatePath("/orders"); return { ok: true, data: null }; }
  catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Unable to update order status." }; }
}