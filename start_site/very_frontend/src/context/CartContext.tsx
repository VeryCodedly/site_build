"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export interface CartItem {
  id: string;
  variant_id: number;
  fancy_name: string;
  size?: string;
  color?: string;
  price: number;
  quantity: number;
  preview_image?: string;
  thumbnail_url?: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  subtotal: number;           // renamed from totalPrice so i dont go crazy
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (variantId: number, delta: number) => void;
  removeItem: (variantId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('verycodedly-cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage + calculate totals
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem('verycodedly-cart', JSON.stringify(items));

  }, [items, isLoaded]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.findIndex(i => i.variant_id === item.variant_id);
      if (existing !== -1) {
        const updated = [...prev];
        updated[existing].quantity += 1;
        return updated;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((variantId: number, delta: number) => {
    setItems(prev =>
      prev
        .map(i => {
          if (i.variant_id === variantId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  }, []);

  const removeItem = useCallback((variantId: number) => {
    setItems(prev => prev.filter(i => i.variant_id !== variantId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = {
    items,
    totalItems,
    subtotal,           //same renaming
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}