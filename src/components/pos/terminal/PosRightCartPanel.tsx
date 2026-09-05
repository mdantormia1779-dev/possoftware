import React from "react";
import { PosCartHeader } from "./PosCartHeader";
import { PosCartCustomerBar } from "./PosCartCustomerBar";
import { PosCartItemsList } from "./PosCartItemsList";
import { PosCartSummary } from "./PosCartSummary";
import { CartItem, Customer } from "@/types";

interface PosRightCartPanelProps {
  cart: CartItem[];
  cartCustomer: Customer | null;
  heldCount: number;
  subtotal: number;
  discount: number;
  taxRate: number;
  totalTax: number;
  grandTotal: number;
  onOpenHeld: () => void;
  onClearCart: () => void;
  onClearCustomer: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onHoldSale: () => void;
  onOpenPayment: () => void;
}

export function PosRightCartPanel({
  cart,
  cartCustomer,
  heldCount,
  subtotal,
  discount,
  taxRate,
  totalTax,
  grandTotal,
  onOpenHeld,
  onClearCart,
  onClearCustomer,
  onUpdateQty,
  onRemoveItem,
  onHoldSale,
  onOpenPayment,
}: PosRightCartPanelProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-96 xl:w-[420px] bg-white dark:bg-[#111827] border-l border-[#E2E8F0] dark:border-[#1E293B] flex flex-col justify-between shrink-0 shadow-subtle-sm">
      <PosCartHeader
        totalItems={totalItems}
        heldCount={heldCount}
        hasItems={cart.length > 0}
        onOpenHeld={onOpenHeld}
        onClearCart={onClearCart}
      />

      <PosCartCustomerBar
        customer={cartCustomer}
        onClearCustomer={onClearCustomer}
      />

      <PosCartItemsList
        cart={cart}
        onUpdateQty={onUpdateQty}
        onRemoveItem={onRemoveItem}
      />

      <PosCartSummary
        cartLength={cart.length}
        subtotal={subtotal}
        discount={discount}
        taxRate={taxRate}
        totalTax={totalTax}
        grandTotal={grandTotal}
        onHoldSale={onHoldSale}
        onOpenPayment={onOpenPayment}
      />
    </div>
  );
}
