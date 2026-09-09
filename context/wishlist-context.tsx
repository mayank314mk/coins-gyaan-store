"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import { getProductById, type Product } from "../lib/products";
import { useCart } from "./cart-context";

interface WishlistContextValue {
  items: Product[];
  itemCount: number;
  isHydrated: boolean;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  moveToCart: (productId: string) => void;
}

const STORAGE_KEY = "coins_gyaan_wishlist";
const EMPTY_WISHLIST: string[] = [];

let memoryWishlist: string[] = [];
let isWishlistInitialized = false;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function getStoredWishlist(): string[] {
  if (typeof window === "undefined") return EMPTY_WISHLIST;
  if (!isWishlistInitialized) {
    isWishlistInitialized = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const validated: string[] = [];
          for (const id of parsed) {
            if (typeof id === "string" && !validated.includes(id)) {
              const product = getProductById(id);
              if (product) {
                validated.push(id);
              }
            }
          }
          memoryWishlist = validated;
        }
      }
    } catch {
      // Ignore parsing errors
    }
  }
  return memoryWishlist;
}

function saveWishlist(newIds: string[]) {
  memoryWishlist = newIds;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
    } catch {
      // Ignore storage errors
    }
  }
  emitChange();
}

function wishlistSubscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      isWishlistInitialized = false;
      getStoredWishlist();
      onStoreChange();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

const noopSubscribe = () => () => {};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const productIds = useSyncExternalStore(
    wishlistSubscribe,
    getStoredWishlist,
    () => EMPTY_WISHLIST
  );

  const isHydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  const { addToCart } = useCart();

  const isInWishlist = useCallback(
    (productId: string) => {
      return productIds.includes(productId);
    },
    [productIds]
  );

  const toggleWishlist = useCallback((productId: string) => {
    const product = getProductById(productId);
    if (!product) return;

    const current = getStoredWishlist();
    if (current.includes(productId)) {
      saveWishlist(current.filter((id) => id !== productId));
    } else {
      saveWishlist([...current, productId]);
    }
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    const current = getStoredWishlist();
    saveWishlist(current.filter((id) => id !== productId));
  }, []);

  const clearWishlist = useCallback(() => {
    saveWishlist([]);
  }, []);

  const moveToCart = useCallback(
    (productId: string) => {
      addToCart(productId, 1);
      const current = getStoredWishlist();
      saveWishlist(current.filter((id) => id !== productId));
    },
    [addToCart]
  );

  const items = useMemo(() => {
    return productIds
      .map((id) => getProductById(id))
      .filter((p): p is Product => p !== undefined);
  }, [productIds]);

  const itemCount = items.length;

  const value = useMemo(
    () => ({
      items,
      itemCount,
      isHydrated,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
      moveToCart,
    }),
    [
      items,
      itemCount,
      isHydrated,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
      moveToCart,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

