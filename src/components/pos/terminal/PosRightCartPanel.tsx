import React, { useState } from "react";
import { PosCartHeader } from "./PosCartHeader";
import { PosOrderTypeTabs, OrderType } from "./PosOrderTypeTabs";
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
  const [orderType, setOrderType] = useState<OrderType>("dine_in");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-80 sm:w-96 xl:w-[410px] bg-white dark:bg-slate-900 border-l border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shrink-0 shadow-sm z-10">
      <div className="flex flex-col flex-1 overflow-hidden">
        <PosCartHeader
          totalItems={totalItems}
          heldCount={heldCount}
          hasItems={cart.length > 0}
          onOpenHeld={onOpenHeld}
          onClearCart={onClearCart}
        />

        <PosOrderTypeTabs
          orderType={orderType}
          onChangeOrderType={setOrderType}
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
      </div>

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
