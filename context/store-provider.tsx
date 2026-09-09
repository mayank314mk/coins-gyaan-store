"use client";

import React from "react";
import { CartProvider } from "./cart-context";
import { WishlistProvider } from "./wishlist-context";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </CartProvider>
  );
}

