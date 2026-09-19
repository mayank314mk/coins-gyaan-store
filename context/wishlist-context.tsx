"use client";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProductById, type Product } from "../lib/products";
import { authClient } from "../lib/auth-client";
import { clearWishlistItems, mergeGuestStore, toggleWishlistItem } from "../app/actions/store";
import { useCart } from "./cart-context";
import { useToast } from "../components/toast";
interface WishlistContextValue { items: Product[]; itemCount: number; isHydrated: boolean; isInWishlist: (id: string) => boolean; toggleWishlist: (id: string) => Promise<boolean>; removeFromWishlist: (id: string) => void; clearWishlist: () => void; moveToCart: (id: string) => void; }
const KEY = "coins_gyaan_wishlist"; const WishlistContext = createContext<WishlistContextValue | null>(null);
function guestIds() { try { return JSON.parse(localStorage.getItem(KEY) || "[]").filter((id: unknown): id is string => typeof id === "string"); } catch { return []; } } function saveGuest(ids: string[]) { localStorage.setItem(KEY, JSON.stringify([...new Set(ids)])); }
export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession(); const { addToCart } = useCart(); const { showToast } = useToast(); const [items, setItems] = useState<Product[]>([]); const [hydrated, setHydrated] = useState(false);
  // This intentionally initializes browser storage after the auth client resolves.
  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { if (isPending) return; if (!session?.user) { setItems(guestIds().map(getProductById).filter((p: Product | undefined): p is Product => !!p)); setHydrated(true); return; } (async () => { const state = await mergeGuestStore([], guestIds()); if (!state.ok) showToast(state.error, "error"); else { saveGuest([]); setItems(state.data.wishlist); } setHydrated(true); })(); }, [session?.user?.id, isPending, showToast]);
  const toggleWishlist = useCallback(async (id: string) => { if (!getProductById(id)) return false; if (!session?.user) { showToast("Please sign in to use your wishlist.", "info"); window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`; return false; } const result = await toggleWishlistItem(id); if (!result.ok) { showToast(result.error, "error"); return false; } setItems(result.data.wishlist); return true; }, [session?.user, showToast]);
  const clearWishlist = useCallback(() => { if (!session?.user) { saveGuest([]); setItems([]); return; } void clearWishlistItems().then((result) => { if (!result.ok) showToast(result.error, "error"); else setItems(result.data.wishlist); }); }, [session?.user, showToast]);
  const value = useMemo(() => ({ items, itemCount: items.length, isHydrated: hydrated, isInWishlist: (id: string) => items.some((item) => item.id === id), toggleWishlist, removeFromWishlist: toggleWishlist, clearWishlist, moveToCart: (id: string) => { void addToCart(id).then((added) => { if (added) void toggleWishlist(id); }); } }), [items, hydrated, toggleWishlist, clearWishlist, addToCart]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
export function useWishlist() { const value = useContext(WishlistContext); if (!value) throw new Error("useWishlist must be used within a WishlistProvider"); return value; }
