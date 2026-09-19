"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "../app/actions/store";
import { useCart } from "../context/cart-context";
import { formatPrice } from "../lib/products";
import { Breadcrumb } from "./breadcrumb";

export function CheckoutView() {
  const { itemCount, subtotal, isHydrated } = useCart();
  const router = useRouter();
  const [error, setError] = useState(""); const [submitting, setSubmitting] = useState(false);
  if (!isHydrated) return <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6"><div className="h-96 animate-pulse rounded-2xl bg-gray-100" /></div>;
  const total = subtotal + (itemCount ? 80 : 0);

  return <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
    <div className="mb-4"><Breadcrumb items={[{ label: "Cart", href: "/cart" }, { label: "Delivery Information" }]} /></div>
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
      <form onSubmit={async (event) => { event.preventDefault(); setError(""); setSubmitting(true); const result = await createOrder(new FormData(event.currentTarget)); if (result.ok) { router.push("/orders?created=1"); router.refresh(); } else setError(result.error); setSubmitting(false); }} className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <h1 className="text-2xl font-bold text-brand-strong">Add delivery information</h1>
        <p className="mt-1 text-sm text-text-muted">Tell us where to send your collection.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Full name" name="name" placeholder="Your name" required />
          <Field label="Phone number" name="phone" placeholder="10-digit phone number" type="tel" required />
          <Field label="Address" name="address" placeholder="House no. and street" required wide />
          <Field label="City" name="city" placeholder="City" required />
          <Field label="State" name="state" placeholder="State" required />
          <Field label="PIN code" name="pin" placeholder="PIN code" required />
        </div>
        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={submitting || !itemCount} type="submit" className="mt-6 h-12 w-full rounded-xl bg-brand text-base font-bold text-white hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-50">{submitting ? "Creating order..." : "Checkout"}</button>
        <p className="mt-3 text-center text-xs text-text-muted">Orders are placed for collection processing. Online payment is not available yet.</p>
      </form>
      <aside className="h-fit rounded-2xl border border-gray-200 bg-gray-50/90 p-5 sm:p-6">
        <h2 className="font-bold text-brand-strong">Order summary</h2>
        <div className="mt-4 space-y-3 border-b border-gray-200 pb-4 text-sm"><div className="flex justify-between text-text-muted"><span>Items total ({itemCount})</span><span className="font-medium text-brand-strong">{formatPrice(subtotal)}</span></div><div className="flex justify-between text-text-muted"><span>Shipping & packaging</span><span className="font-medium text-brand-strong">{itemCount ? formatPrice(80) : formatPrice(0)}</span></div></div>
        <div className="mt-4 flex justify-between text-base font-bold text-brand-strong"><span>Total amount</span><span>{formatPrice(total)}</span></div>
      </aside>
    </div>
  </div>;
}

function Field({ label, name, placeholder, type = "text", required = false, wide = false }: { label: string; name: string; placeholder: string; type?: string; required?: boolean; wide?: boolean }) {
  return <label className={`flex flex-col gap-1.5 text-sm font-semibold text-brand-strong ${wide ? "sm:col-span-2" : ""}`}><span>{label}</span><input name={name} type={type} placeholder={placeholder} required={required} className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 font-normal outline-none focus:border-accent focus:ring-2 focus:ring-accent/10" /></label>;
}
