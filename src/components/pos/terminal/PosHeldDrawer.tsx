import React from "react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

export interface HeldSaleItem {
  id: string;
  time: string;
  itemsCount: number;
  total: number;
  cartData: any;
}

interface PosHeldDrawerProps {
  isOpen: boolean;
  heldSales: HeldSaleItem[];
  onClose: () => void;
  onRestoreHold: (hold: HeldSaleItem) => void;
}

export function PosHeldDrawer({
  isOpen,
  heldSales,
  onClose,
  onRestoreHold,
}: PosHeldDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-80 bg-card border-l border-border/80 p-4.5 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
        <div>
          <div className="flex justify-between items-center pb-3 border-b border-border/80 mb-3">
            <h4 className="font-bold text-xs sm:text-sm text-foreground">
              Held Sales Invoices
            </h4>
            <button
              onClick={onClose}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>
          <div className="space-y-2">
            {heldSales.map((h) => (
              <div
                key={h.id}
                className="p-3 rounded-2xl border border-border/80 bg-muted/20 space-y-2 text-xs shadow-subtle-xs"
              >
                <div className="flex justify-between font-bold">
                  <span>Held at {h.time}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                    {formatCurrency(h.total)}
                  </span>
                </div>
                <div className="text-muted-foreground text-[11px]">
                  {h.itemsCount} items in cart
                </div>
                <Button
                  size="xs"
                  variant="primary"
                  onClick={() => onRestoreHold(h)}
                  className="w-full text-xs"
                >
                  Restore to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
