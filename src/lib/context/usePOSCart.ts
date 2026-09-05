import { useState } from "react";
import { CartItem, Product, Customer } from "../types";
import { calculateCartTotals } from "@/utils/cartCalculations";

export function usePOSCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCustomer, setCartCustomer] = useState<Customer | null>(null);
  const [cartDiscount, setCartDiscount] = useState<number>(0);
  const [cartTaxRate, setCartTaxRate] = useState<number>(5);

  const addToCart = (product: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => {
          if (item.product.id === product.id) {
            const newQty = item.quantity + qty;
            const sub = newQty * item.unitPrice;
            const tax = (sub * (product.taxRate || 5)) / 100;
            return { ...item, quantity: newQty, taxAmount: tax, totalPrice: sub + tax - item.discountAmount };
          }
          return item;
        });
      }
      const sub = qty * product.sellingPrice;
      const tax = (sub * (product.taxRate || 5)) / 100;
      return [...prev, { product, quantity: qty, unitPrice: product.sellingPrice, discountAmount: 0, taxAmount: tax, totalPrice: sub + tax }];
    });
  };

  const updateCartItemQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const sub = newQty * item.unitPrice;
            const tax = (sub * (item.product.taxRate || 5)) / 100;
            return { ...item, quantity: newQty, taxAmount: tax, totalPrice: sub + tax - item.discountAmount };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCartCustomer(null);
    setCartDiscount(0);
  };

  const totals = calculateCartTotals(cart, cartDiscount, cartTaxRate);

  return {
    cart,
    cartCustomer,
    setCartCustomer,
    cartDiscount,
    setCartDiscount,
    cartTaxRate,
    setCartTaxRate,
    addToCart,
    updateCartItemQty,
    removeFromCart,
    clearCart,
    cartSubtotal: totals.subtotal,
    cartTotalTax: totals.totalTax,
    cartGrandTotal: totals.grandTotal,
  };
}
