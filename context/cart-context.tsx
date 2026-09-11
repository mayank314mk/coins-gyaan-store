"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import { getProductById, type Product } from "../lib/products";

export interface CartItemWithProduct {
  productId: string;
  product: Product;
}

interface CartContextValue {
  items: CartItemWithProduct[];
  itemCount: number;
  subtotal: number;
  isHydrated: boolean;
  isInCart: (productId: string) => boolean;
  addToCart: (productId: string) => boolean;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const STORAGE_KEY = "coins_gyaan_cart";
const EMPTY_CART: string[] = [];

let memoryCart: string[] = [];
let isInitialized = false;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function getStoredCart(): string[] {
  if (typeof window === "undefined") return EMPTY_CART;
  if (!isInitialized) {
    isInitialized = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const validated: string[] = [];
          for (const item of parsed) {
            // Handle both legacy { productId: "..." } and string ID
            const id = typeof item === "string" ? item : item?.productId;
            if (typeof id === "string" && !validated.includes(id)) {
              const product = getProductById(id);
              if (product) {
                validated.push(id);
              }
            }
          }
          memoryCart = validated;
        }
      }
    } catch {
      // Ignore parsing errors
    }
  }
  return memoryCart;
}

function saveCart(newIds: string[]) {
  memoryCart = newIds;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
    } catch {
      // Ignore storage errors
    }
  }
  emitChange();
}

function cartSubscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      isInitialized = false;
      getStoredCart();
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

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const productIds = useSyncExternalStore(
    cartSubscribe,
    getStoredCart,
    () => EMPTY_CART
  );

  const isHydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  const isInCart = useCallback(
    (productId: string) => {
      return productIds.includes(productId);
    },
    [productIds]
  );

  const addToCart = useCallback((productId: string): boolean => {
    const product = getProductById(productId);
    if (!product) return false;

    const current = getStoredCart();
    if (current.includes(productId)) {
      // Already in cart: do NOT duplicate
      return false;
    }

    saveCart([...current, productId]);
    return true;
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    const current = getStoredCart();
    saveCart(current.filter((id) => id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    saveCart([]);
  }, []);

  const items = useMemo(() => {
    return productIds
      .map((id) => {
        const product = getProductById(id);
        if (!product) return null;
        return {
          productId: id,
          product,
        };
      })
      .filter((item): item is CartItemWithProduct => item !== null);
  }, [productIds]);

  const itemCount = items.length;

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.product.price,
      0
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isHydrated,
      isInCart,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      isHydrated,
      isInCart,
      addToCart,
      removeFromCart,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
