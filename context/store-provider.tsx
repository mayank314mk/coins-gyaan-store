"use client";

import React from "react";
import { CartProvider } from "./cart-context";
import { WishlistProvider } from "./wishlist-context";
import { ToastProvider } from "../components/toast";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}
