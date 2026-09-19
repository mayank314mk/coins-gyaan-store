"use client";

import Link from "next/link";
import { Breadcrumb } from "./breadcrumb";
import { formatPrice } from "../lib/products";

export function OrdersView({ orders, authenticated }: { authenticated: boolean; orders: { id: string; status: string; total: number; createdAt: string; items: { productName: string; quantity: number }[] }[] }) {
  return <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
    <div className="mb-4">
      <Breadcrumb items={[{ label: "My Account", href: "/account" }, { label: "Orders" }]} /></div>
    <h1 className="text-2xl font-bold text-brand-strong">Your orders</h1>{!authenticated ? <div className="mt-5 rounded-2xl border border-gray-200 p-6">
      <p className="text-sm text-text-muted">Please log in to view your orders.</p>
      <Link href="/login" className="mt-4 inline-flex rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white">Log in</Link></div> : orders.length ? <div className="mt-5 space-y-4">{orders.map((order) => <article key={order.id} className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5"><div className="flex justify-between gap-3"><div><h2 className="font-bold text-brand-strong">Order #{order.id.slice(-8).toUpperCase()}</h2><p className="mt-1 text-xs text-text-muted">{new Date(order.createdAt).toLocaleDateString("en-IN")}</p></div><span className="rounded-full flex items-center justify-center bg-accent/10 px-3 py-1 text-xs font-bold text-accent">{order.status}</span></div><p className="mt-3 text-sm text-text-muted">{order.items.map((item) => `${item.productName} × ${item.quantity}`).join(", ")}</p><p className="mt-3 font-bold text-brand-strong">{formatPrice(order.total)}</p></article>)}</div> : <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50/70 p-6"><h2 className="font-bold text-brand-strong">No orders yet</h2><p className="mt-2 text-sm text-text-muted">Completed and active orders will appear here.</p><Link href="/all-coins" className="mt-5 inline-flex rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white">Explore coins</Link></div>}</div>;
}
