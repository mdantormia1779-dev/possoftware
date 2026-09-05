import React from "react";
import { PaymentMethod } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface PaymentTenderSectionProps {
  paymentMethod: PaymentMethod;
  tenderAmount: string;
  setTenderAmount: (amt: string) => void;
  trxId: string;
  setTrxId: (id: string) => void;
  cartGrandTotal: number;
  changeAmount: number;
}

export function PaymentTenderSection({
  paymentMethod,
  tenderAmount,
  setTenderAmount,
  trxId,
  setTrxId,
  cartGrandTotal,
  changeAmount,
}: PaymentTenderSectionProps) {
  const tenderPresets = [
    Math.ceil(cartGrandTotal),
    Math.ceil(cartGrandTotal / 100) * 100,
    Math.ceil(cartGrandTotal / 500) * 500 + 500,
    Math.ceil(cartGrandTotal / 1000) * 1000 + 1000,
  ];
  const uniquePresets = Array.from(new Set(tenderPresets)).filter(
    (val) => val >= cartGrandTotal
  );

  return (
    <>
      {paymentMethod === "cash" && (
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
            Amount Received (৳ BDT)
          </label>
          <input
            type="number"
            value={tenderAmount}
            onChange={(e) => setTenderAmount(e.target.value)}
            className="w-full h-11 px-3.5 rounded-lg border border-border bg-card text-lg font-black font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
          />

          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {uniquePresets.slice(0, 4).map((amt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTenderAmount(amt.toString())}
                className="px-2.5 py-1 text-xs font-semibold rounded-md bg-muted/60 hover:bg-muted text-foreground border border-border font-mono transition-colors shadow-2xs"
              >
                {formatCurrency(amt)}
              </button>
            ))}
          </div>

          <div className="p-3.5 rounded-lg bg-muted/30 border border-border mt-2 flex items-center justify-between shadow-subtle-xs">
            <span className="text-xs font-medium text-muted-foreground">
              Change to return:
            </span>
            <span
              className={`text-base font-bold font-mono ${
                changeAmount > 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-foreground"
              }`}
            >
              {formatCurrency(changeAmount)}
            </span>
          </div>
        </div>
      )}

      {["bkash", "nagad", "rocket", "card"].includes(paymentMethod) && (
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
            Transaction ID / Authorization Code
          </label>
          <input
            type="text"
            placeholder="e.g. 9J3K882LA or Card Last 4 Digits"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            className="w-full h-10 px-3.5 rounded-lg border border-border bg-card text-xs sm:text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
          />
        </div>
      )}
    </>
  );
}
