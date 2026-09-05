import React from "react";
import { formatCurrency } from "@/lib/utils";

interface CashierTillCollectionsProps {
  cashInTill: number;
  shiftTotalAmount: number;
}

export function CashierTillCollections({
  cashInTill,
  shiftTotalAmount,
}: CashierTillCollectionsProps) {
  const paymentModes = [
    { name: "Cash in Hand", icon: "💵", amount: cashInTill, color: "text-emerald-600", bg: "bg-emerald-500/10" },
    { name: "bKash / Nagad QR", icon: "📱", amount: Math.round(shiftTotalAmount * 0.38), color: "text-primary", bg: "bg-primary/10" },
    { name: "Card (POS Machine)", icon: "💳", amount: Math.round(shiftTotalAmount * 0.14), color: "text-blue-600", bg: "bg-blue-500/10" },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-subtle-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Current Till Collections by Mode
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">Reconciliation for current cashier shift</p>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
          Shift #402
        </span>
      </div>

      <div className="space-y-2.5">
        {paymentModes.map((mode, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-muted/20 border border-border flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">{mode.icon}</span>
              <span className="font-semibold text-foreground text-xs">{mode.name}</span>
            </div>
            <span className="font-mono font-bold text-sm text-foreground">
              {formatCurrency(mode.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
