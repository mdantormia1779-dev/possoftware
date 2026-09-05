import { CartItem } from "@/types";

export interface CartTotals {
  subtotal: number;
  totalTax: number;
  grandTotal: number;
}

export function calculateCartTotals(
  cart: CartItem[],
  discount: number,
  taxRate: number
): CartTotals {
  const subtotal = cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const totalTax = (Math.max(0, subtotal - discount) * taxRate) / 100;
  const grandTotal = Math.max(0, subtotal - discount + totalTax);

  return { subtotal, totalTax, grandTotal };
}
