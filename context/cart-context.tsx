"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProductById, type Product } from "../lib/products";
import { authClient } from "../lib/auth-client";
import { addCartItem, clearCartItems, mergeGuestStore, removeCartItem } from "../app/actions/store";
import { useToast } from "../components/toast";

export interface CartItemWithProduct { productId: string; product: Product; quantity: number }
interface CartContextValue { items: CartItemWithProduct[]; itemCount: number; subtotal: number; isHydrated: boolean; isInCart: (id: string) => boolean; addToCart: (id: string) => Promise<boolean>; removeFromCart: (id: string) => void; clearCart: () => void; }
const KEY = "coins_gyaan_cart";
const CartContext = createContext<CartContextValue | null>(null);
function guestIds() { try { return JSON.parse(localStorage.getItem(KEY) || "[]").map((x: unknown) => typeof x === "string" ? x : (x as { productId?: string })?.productId).filter((x: unknown): x is string => typeof x === "string"); } catch { return []; } }
function saveGuest(ids: string[]) { localStorage.setItem(KEY, JSON.stringify([...new Set(ids)])); }

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const { showToast } = useToast();
  const [items, setItems] = useState<CartItemWithProduct[]>([]); const [hydrated, setHydrated] = useState(false);
  // This intentionally initializes browser storage after the auth client resolves.
  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { if (isPending) return; if (!session?.user) { setItems(guestIds().map((id: string) => { const product = getProductById(id); return product ? { productId: id, product, quantity: 1 } : null; }).filter((item: CartItemWithProduct | null): item is CartItemWithProduct => item !== null)); setHydrated(true); return; } (async () => { const state = await mergeGuestStore(guestIds(), []); if (!state.ok) showToast(state.error, "error"); else { saveGuest([]); setItems(state.data.cart); } setHydrated(true); })(); }, [session?.user?.id, isPending, showToast]);
  const addToCart = useCallback(async (id: string) => { if (!getProductById(id)) return false; if (!session?.user) { showToast("Please sign in to add items to your cart.", "info"); window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`; return false; } if (items.some((item) => item.productId === id)) return false; const result = await addCartItem(id); if (!result.ok) { showToast(result.error, "error"); return false; } setItems(result.data.cart); showToast("Added to cart!", "success"); return true; }, [session?.user, items, showToast]);
  const removeFromCart = useCallback((id: string) => { if (!session?.user) { saveGuest(guestIds().filter((item: string) => item !== id)); setItems((items) => items.filter((item: CartItemWithProduct) => item.productId !== id)); return; } void removeCartItem(id).then((result) => { if (!result.ok) showToast(result.error, "error"); else setItems(result.data.cart); }); }, [session?.user, showToast]);
  const clearCart = useCallback(() => { if (!session?.user) { saveGuest([]); setItems([]); return; } void clearCartItems().then((result) => { if (!result.ok) showToast(result.error, "error"); else setItems(result.data.cart); }); }, [session?.user, showToast]);
  const value = useMemo(() => ({ items, itemCount: items.reduce((n, item) => n + item.quantity, 0), subtotal: items.reduce((n, item) => n + item.product.price * item.quantity, 0), isHydrated: hydrated, isInCart: (id: string) => items.some((item) => item.productId === id), addToCart, removeFromCart, clearCart }), [items, hydrated, addToCart, removeFromCart, clearCart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const value = useContext(CartContext); if (!value) throw new Error("useCart must be used within a CartProvider"); return value; }
