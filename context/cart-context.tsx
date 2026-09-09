"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";
import { getProductById, type Product } from "../lib/products";

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartItemWithProduct {
  productId: string;
  quantity: number;
  product: Product;
}

interface CartContextValue {
  items: CartItemWithProduct[];
  itemCount: number;
  subtotal: number;
  isHydrated: boolean;
  addToCart: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const STORAGE_KEY = "coins_gyaan_cart";
const EMPTY_CART: CartItem[] = [];

let memoryCart: CartItem[] = [];
let isInitialized = false;
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  if (!isInitialized) {
    isInitialized = true;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const validated: CartItem[] = [];
          for (const item of parsed) {
            if (
              item &&
              typeof item.productId === "string" &&
              typeof item.quantity === "number" &&
              item.quantity >= 1
            ) {
              const product = getProductById(item.productId);
              if (product) {
                validated.push({
                  productId: item.productId,
                  quantity: Math.floor(item.quantity),
                });
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

function saveCart(newItems: CartItem[]) {
  memoryCart = newItems;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
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
  const rawItems = useSyncExternalStore(
    cartSubscribe,
    getStoredCart,
    () => EMPTY_CART
  );

  const isHydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  const addToCart = useCallback((productId: string, quantity = 1) => {
    if (quantity < 1) return;
    const product = getProductById(productId);
    if (!product) return;

    const current = getStoredCart();
    const existingIndex = current.findIndex((item) => item.productId === productId);
    if (existingIndex > -1) {
      const updated = [...current];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + quantity,
      };
      saveCart(updated);
    } else {
      saveCart([...current, { productId, quantity }]);
    }
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    const current = getStoredCart();
    const updated = current.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.floor(quantity) }
        : item
    );
    saveCart(updated);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    const current = getStoredCart();
    saveCart(current.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    saveCart([]);
  }, []);

  const items = useMemo(() => {
    return rawItems
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        return {
          productId: item.productId,
          quantity: item.quantity,
          product,
        };
      })
      .filter((item): item is CartItemWithProduct => item !== null);
  }, [rawItems]);

  const itemCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isHydrated,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      isHydrated,
      addToCart,
      updateQuantity,
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

