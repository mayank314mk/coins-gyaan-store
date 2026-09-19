"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { auth } from "../../lib/auth";
import { toProduct } from "../../lib/catalog";

const cartInclude = { items: { include: { product: { select: { id: true, name: true, price: true, originalPrice: true, image: true, backImage: true, category: true, stock: true, isTrending: true, description: true } } }, orderBy: { createdAt: "asc" as const } } };
const wishlistInclude = { items: { include: { product: { select: { id: true, name: true, price: true, originalPrice: true, image: true, backImage: true, category: true, stock: true, isTrending: true, description: true } } }, orderBy: { createdAt: "desc" as const } } };
export type StoreState = { cart: { productId: string; quantity: number; product: ReturnType<typeof toProduct> }[]; wishlist: ReturnType<typeof toProduct>[] };
export type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string };

async function currentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Please sign in to continue.");
  return session.user;
}

function ids(value: unknown): string[] {
  return Array.isArray(value) ? [...new Set(value.filter((id): id is string => typeof id === "string"))].slice(0, 100) : [];
}

export async function getStoreState() {
  try { return { ok: true, data: await getStoreStateForUser((await currentUser()).id) } satisfies ActionResult<StoreState>; }
  catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Could not load your saved items." } satisfies ActionResult<StoreState>; }
}

async function getStoreStateForUser(userId: string): Promise<StoreState> {
  const [cart, wishlist] = await Promise.all([
    prisma.cart.findUnique({ where: { userId }, include: cartInclude }),
    prisma.wishlist.findUnique({ where: { userId }, include: wishlistInclude }),
  ]);
  return { cart: (cart?.items ?? []).map((item) => ({ productId: item.productId, quantity: item.quantity, product: toProduct(item.product) })), wishlist: (wishlist?.items ?? []).map((item) => toProduct(item.product)) };
}

export async function mergeGuestStore(guestCart: unknown, guestWishlist: unknown) {
  try {
    const user = await currentUser(); const cartIds = ids(guestCart); const wishlistIds = ids(guestWishlist);
    const existing = await prisma.product.findMany({ where: { id: { in: [...new Set([...cartIds, ...wishlistIds])] }, stock: { gt: 0 } }, select: { id: true } });
    const available = new Set(existing.map((product) => product.id));
    await prisma.$transaction(async (tx) => {
      if (cartIds.length) { const cart = await tx.cart.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id } }); for (const productId of cartIds.filter((id) => available.has(id))) await tx.cartItem.upsert({ where: { cartId_productId: { cartId: cart.id, productId } }, update: { quantity: 1 }, create: { cartId: cart.id, productId, quantity: 1 } }); }
      if (wishlistIds.length) { const wishlist = await tx.wishlist.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id } }); for (const productId of wishlistIds.filter((id) => available.has(id))) await tx.wishlistItem.upsert({ where: { wishlistId_productId: { wishlistId: wishlist.id, productId } }, update: {}, create: { wishlistId: wishlist.id, productId } }); }
    });
    return { ok: true, data: await getStoreStateForUser(user.id) } satisfies ActionResult<StoreState>;
  } catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Could not sync your saved items." } satisfies ActionResult<StoreState>; }
}

export async function addCartItem(productId: string, quantity = 1) {
  try {
    const user = await currentUser();
    if (quantity !== 1) throw new Error("Each collectible coin can only be purchased once.");
    const product = await prisma.product.findFirst({ where: { id: productId, stock: { gte: 1 } }, select: { id: true } });
    if (!product) throw new Error("This coin is no longer available.");
    const cart = await prisma.cart.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id } });
    await prisma.cartItem.upsert({ where: { cartId_productId: { cartId: cart.id, productId } }, update: { quantity: 1 }, create: { cartId: cart.id, productId, quantity: 1 } });
    revalidatePath("/cart"); return { ok: true, data: await getStoreStateForUser(user.id) } satisfies ActionResult<StoreState>;
  } catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Could not add this coin to your cart." } satisfies ActionResult<StoreState>; }
}

export async function removeCartItem(productId: string) {
  try { const user = await currentUser(); const cart = await prisma.cart.findUnique({ where: { userId: user.id }, select: { id: true } }); if (cart) await prisma.cartItem.deleteMany({ where: { cartId: cart.id, productId } }); revalidatePath("/cart"); return { ok: true, data: await getStoreStateForUser(user.id) } satisfies ActionResult<StoreState>; }
  catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Could not remove that coin." } satisfies ActionResult<StoreState>; }
}

export async function clearCartItems() {
  try { const user = await currentUser(); const cart = await prisma.cart.findUnique({ where: { userId: user.id }, select: { id: true } }); if (cart) await prisma.cartItem.deleteMany({ where: { cartId: cart.id } }); return { ok: true, data: await getStoreStateForUser(user.id) } satisfies ActionResult<StoreState>; }
  catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Could not clear your cart." } satisfies ActionResult<StoreState>; }
}

export async function toggleWishlistItem(productId: string) {
  try { const user = await currentUser(); const product = await prisma.product.findUnique({ where: { id: productId }, select: { id: true } }); if (!product) throw new Error("Coin not found."); const wishlist = await prisma.wishlist.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id } }); const existing = await prisma.wishlistItem.findUnique({ where: { wishlistId_productId: { wishlistId: wishlist.id, productId } } }); if (existing) await prisma.wishlistItem.delete({ where: { id: existing.id } }); else await prisma.wishlistItem.create({ data: { wishlistId: wishlist.id, productId } }); revalidatePath("/wishlist"); return { ok: true, data: await getStoreStateForUser(user.id) } satisfies ActionResult<StoreState>; }
  catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Could not update your wishlist." } satisfies ActionResult<StoreState>; }
}

export async function clearWishlistItems() {
  try { const user = await currentUser(); const wishlist = await prisma.wishlist.findUnique({ where: { userId: user.id }, select: { id: true } }); if (wishlist) await prisma.wishlistItem.deleteMany({ where: { wishlistId: wishlist.id } }); revalidatePath("/wishlist"); return { ok: true, data: await getStoreStateForUser(user.id) } satisfies ActionResult<StoreState>; }
  catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Could not clear your wishlist." } satisfies ActionResult<StoreState>; }
}

export async function createOrder(formData: FormData) {
  try {
    const user = await currentUser();
    const details = Object.fromEntries(["name", "phone", "address", "city", "state", "pin"].map((key) => [key, String(formData.get(key) ?? "").trim()]));
    if (!details.name || !details.address || !details.city || !details.state || !/^\d{6}$/.test(details.pin) || !/^\d{10}$/.test(details.phone.replace(/\D/g, ""))) throw new Error("Please provide valid delivery information.");
    const order = await prisma.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({ where: { userId: user.id }, include: { items: { include: { product: true } } } });
      if (!cart?.items.length) throw new Error("Your cart is empty.");
      if (cart.items.some((item) => item.quantity !== 1)) throw new Error("Each collectible coin can only be purchased once.");
      for (const item of cart.items) { const updated = await tx.product.updateMany({ where: { id: item.productId, stock: { gte: 1 } }, data: { stock: { decrement: 1 } } }); if (updated.count === 0) throw new Error(`${item.product.name} is no longer available.`); }
      const subtotal = cart.items.reduce((total, item) => total + Number(item.product.price), 0); const shippingCharge = 80;
      const created = await tx.order.create({ data: { userId: user.id, subtotal, shippingCharge, total: subtotal + shippingCharge, deliveryName: details.name, deliveryPhone: details.phone, deliveryAddress: details.address, deliveryCity: details.city, deliveryState: details.state, deliveryPinCode: details.pin, items: { create: cart.items.map((item) => ({ productId: item.productId, productName: item.product.name, productImage: item.product.image, unitPrice: item.product.price, quantity: 1, lineTotal: item.product.price })) } } });
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } }); return created;
    });
    revalidatePath("/orders"); revalidatePath("/cart"); return { ok: true, data: order.id } satisfies ActionResult<string>;
  } catch (error) { return { ok: false, error: error instanceof Error ? error.message : "Unable to create order." } satisfies ActionResult<string>; }
}
