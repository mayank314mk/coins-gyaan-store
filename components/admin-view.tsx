"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteProduct, saveProduct, updateOrderStatus } from "../app/admin/actions";
import { CATEGORIES } from "../lib/categories";

type Product = { id: string; name: string; price: number; originalPrice: number | null; image: string; backImage: string | null; category: string; description: string | null; isTrending: boolean; stock: number; createdAt: string };
type Order = { id: string; status: string; total: number; createdAt: string; deliveryName: string; deliveryPhone: string; deliveryAddress: string; deliveryCity: string; deliveryState: string; deliveryPinCode: string; user: { name: string; email: string }; items: { productName: string; quantity: number; unitPrice: unknown }[] };
const emptyProduct = { name: "", price: "", originalPrice: "", image: "/images/coins/", backImage: "/images/coins/", category: "", description: "", isTrending: false, stock: 1 };
const statuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

export function AdminView({ products, orders }: { products: Product[]; orders: Order[] }) {
  const router = useRouter(); const [editing, setEditing] = useState<Product | null>(null); const [form, setForm] = useState(emptyProduct); const [message, setMessage] = useState(""); const [error, setError] = useState("");
  function edit(product: Product) { setEditing(product); setForm({ name: product.name, price: String(product.price), originalPrice: product.originalPrice === null ? "" : String(product.originalPrice), image: product.image, backImage: product.backImage ?? "", category: product.category, description: product.description ?? "", isTrending: product.isTrending, stock: product.stock }); }
  async function submit(event: React.FormEvent) { event.preventDefault(); setError(""); setMessage(""); const result = await saveProduct({ ...form, id: editing?.id }); if (!result.ok) setError(result.error); else { setMessage(editing ? "Product updated." : "Product added."); setEditing(null); setForm(emptyProduct); router.refresh(); } }
  async function remove(id: string) { const result = await deleteProduct(id); if (!result.ok) setError(result.error); else router.refresh(); }
  async function changeStatus(id: string, status: string) { const result = await updateOrderStatus(id, status); if (!result.ok) setError(result.error); else router.refresh(); }
  return <div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Protected workspace</p><h1 className="mt-2 text-3xl font-bold text-brand-strong">Store administration</h1></div><Link href="/" className="text-sm font-semibold text-brand hover:text-accent">Back to store</Link></div>{(error || message) && <p className={`mt-5 rounded-xl px-4 py-3 text-sm ${error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>{error || message}</p>}
    <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]">
      <form onSubmit={submit} className="h-fit rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-bold text-brand-strong">{editing ? "Edit product" : "Add product"}</h2>
        <div className="mt-4 grid gap-3">
          {(["name", "price", "image", "backImage"] as const).map((field) => (
            <label key={field} className="grid gap-1 text-xs font-semibold text-brand-strong">
              <span>{field === "image" ? "Front Image" : field === "backImage" ? "Back Image" : field[0].toUpperCase() + field.slice(1)}</span>
              <input value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 font-normal" required={field !== "backImage"} />
            </label>
          ))}
          <label className="grid gap-1 text-xs font-semibold text-brand-strong">
            <span>Original price</span>
            <input value={form.originalPrice} onChange={(event) => setForm({ ...form, originalPrice: event.target.value })} className="h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 font-normal" />
            <span className="text-[11px] font-normal text-text-muted">Keep this at 0 if there is no discount / original price is the same as the selling price.</span>
          </label>
          <label className="grid gap-1 text-xs font-semibold text-brand-strong">
            <span>Category</span>
            <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 font-normal" required>
              <option value="">Select a category</option>
              {CATEGORIES.map((category) => <option key={category.name} value={category.name}>{category.name}</option>)}
            </select>
          </label>
          <label className="grid gap-1 text-xs font-semibold text-brand-strong">Description<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="min-h-20 rounded-lg border border-gray-200 bg-gray-50 p-3 font-normal" /></label>
          <label className="flex items-center justify-between text-xs font-semibold text-brand-strong">Stock (0 or 1)<input type="number" min="0" max="1" value={form.stock} onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })} className="h-10 w-24 rounded-lg border border-gray-200 bg-gray-50 px-3 font-normal" /></label>
          <label className="flex items-center gap-2 text-xs font-semibold text-brand-strong"><input type="checkbox" checked={form.isTrending} onChange={(event) => setForm({ ...form, isTrending: event.target.checked })} /> Is Trending</label>
        </div>
        <button className="mt-5 h-10 w-full rounded-lg bg-brand text-sm font-semibold text-white">{editing ? "Save changes" : "Add product"}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm(emptyProduct); }} className="mt-2 h-10 w-full rounded-lg border border-gray-200 text-sm font-semibold text-brand-strong">Cancel edit</button>}
      </form>
      <div className="rounded-2xl border border-gray-200 bg-white p-5"><h2 className="text-lg font-bold text-brand-strong">Products ({products.length})</h2><div className="mt-4 divide-y divide-gray-100">{products.map((product) => <div key={product.id} className="flex flex-wrap items-center justify-between gap-3 py-3"><div className="min-w-0"><p className="truncate text-sm font-semibold text-brand-strong">{product.name}</p><p className="text-xs text-text-muted">{product.id} · ₹{product.price} · stock {product.stock} · {product.isTrending ? "Trending" : "Not trending"}</p></div><div className="flex gap-2"><button onClick={() => edit(product)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50">Edit</button><button onClick={() => void remove(product.id)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50">Delete</button></div></div>)}</div></div></section>
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5"><h2 className="text-lg font-bold text-brand-strong">Orders ({orders.length})</h2><div className="mt-4 space-y-4">{orders.map((order) => <article key={order.id} className="rounded-xl border border-gray-100 bg-gray-50/70 p-4"><div className="flex flex-wrap justify-between gap-3"><div><p className="text-sm font-bold text-brand-strong">#{order.id.slice(-8).toUpperCase()} · {order.user.name} ({order.user.email})</p><p className="mt-1 text-xs text-text-muted">{new Date(order.createdAt).toLocaleString("en-IN")} · ₹{order.total}</p></div><select value={order.status} onChange={(event) => void changeStatus(order.id, event.target.value)} className="h-9 rounded-lg border border-gray-200 bg-white px-2 text-xs font-semibold">{statuses.map((status) => <option key={status}>{status}</option>)}</select></div><p className="mt-3 text-xs text-text-muted">Deliver to: {order.deliveryName}, {order.deliveryPhone}, {order.deliveryAddress}, {order.deliveryCity}, {order.deliveryState} - {order.deliveryPinCode}</p><p className="mt-2 text-xs text-brand-strong">{order.items.map((item) => `${item.productName} × ${item.quantity}`).join(", ")}</p></article>)}</div></section>
  </div>;
}