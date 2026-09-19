import { redirect } from "next/navigation";
import { AdminView } from "../../components/admin-view";
import { getAdminData } from "./actions";
import { isAdmin } from "../../lib/admin";

export const metadata = { title: "Admin | Coins Gyaan Store" };

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/account");
  const result = await getAdminData();
  if (!result.ok) redirect("/account");
  return <main className="min-h-[100svh] bg-[#fbfaf7] px-4 py-8 sm:px-6 lg:px-10"><AdminView products={result.data.products.map((product) => ({ ...product, price: Number(product.price), originalPrice: product.originalPrice === null ? null : Number(product.originalPrice), createdAt: product.createdAt.toISOString() }))} orders={result.data.orders.map((order) => ({ ...order, subtotal: Number(order.subtotal), shippingCharge: Number(order.shippingCharge), total: Number(order.total), createdAt: order.createdAt.toISOString(), updatedAt: order.updatedAt.toISOString(), items: order.items.map((item) => ({ ...item, unitPrice: Number(item.unitPrice), lineTotal: Number(item.lineTotal) })) }))} /></main>;
}