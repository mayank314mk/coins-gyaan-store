import type { Metadata } from "next";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter, MobileBottomNav } from "../../components/homepage-sections";
import { OrdersView } from "../../components/orders-view";
import { headers } from "next/headers";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export const metadata: Metadata = { title: "My Orders | Coins Gyaan Store" };

export default async function OrdersPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const orders = session?.user ? await prisma.order.findMany({ where: { userId: session.user.id }, orderBy: { createdAt: "desc" }, include: { items: { select: { productName: true, quantity: true } } } }) : [];
  const orderCards = orders.map((order) => ({
    id: order.id,
    status: order.status,
    total: Number(order.total),
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => ({
      productName: item.productName,
      quantity: item.quantity,
    })),
  }));

  return <main className="min-h-[100svh] bg-white pb-20 sm:pb-0"><SiteHeader /><OrdersView authenticated={!!session?.user} orders={orderCards} /><SiteFooter /><MobileBottomNav /></main>;
}
