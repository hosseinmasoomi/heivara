"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  const STORAGE_KEY = "rashcr_cart";

  // ⬇️ لود اولیه از localStorage
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.error("Error reading cart from localStorage", e);
    } finally {
      setHydrated(true);
    }
  }, []);

  // ⬇️ سینک شدن با localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Error writing cart to localStorage", e);
    }
  }, [items, hydrated]);

  // ✅ اضافه کردن به سبد
  const addToCart = (product, qty = 1) => {
    if (!product?.id || qty <= 0) return;

    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, qty: it.qty + qty } : it
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          img: product.img,
          qty,
        },
      ];
    });
  };

  // ✅ افزایش تعداد
  const increaseQty = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
    );
  };

  // ✅ کاهش تعداد (اگر ۱ بود و - زد، حذف کن)
  const decreaseQty = (id) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === id);
      if (!existing) return prev;

      // اگر فقط ۱ عدد بود → حذف آیتم
      if (existing.qty <= 1) {
        return prev.filter((it) => it.id !== id);
      }

      // در غیر این صورت → یکی کم کن
      return prev.map((it) => (it.id === id ? { ...it, qty: it.qty - 1 } : it));
    });
  };

  // ✅ حذف یک آیتم
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  // ✅ خالی کردن سبد
  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, it) => sum + it.qty, 0);
  const totalPrice = items.reduce((sum, it) => sum + it.qty * it.price, 0);

  const value = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    hydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}
