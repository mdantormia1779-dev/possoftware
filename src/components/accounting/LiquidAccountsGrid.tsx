import React from "react";
import { formatCurrency } from "@/lib/utils";

interface LiquidAccountsGridProps {
  cashInHand: number;
  bkashMerchant: number;
  cityBankCurrent: number;
}

export function LiquidAccountsGrid({
  cashInHand,
  bkashMerchant,
  cityBankCurrent,
}: LiquidAccountsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      <div className="p-5 sm:p-6 rounded-xl border border-border bg-card shadow-subtle-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Cash in Till (Register)
          </span>
          <span className="text-xs font-mono font-semibold text-muted-foreground">
            Code 1010
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
          {formatCurrency(cashInHand)}
        </div>
        <p className="text-[11px] text-muted-foreground">
          Immediate retail drawer physical liquidity
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-xl border border-pink-200 dark:border-pink-900/60 bg-pink-50/20 dark:bg-pink-950/10 shadow-subtle-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">
            bKash Merchant Account
          </span>
          <span className="text-xs font-mono font-semibold text-pink-700 dark:text-pink-300">
            Code 1020
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-pink-700 dark:text-pink-300 font-mono">
          {formatCurrency(bkashMerchant)}
        </div>
        <p className="text-[11px] text-pink-700/80 dark:text-pink-300/80">
          Instant settlement from digital customer QR payments
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-xl border border-border bg-card shadow-subtle-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            City Bank Corporate A/C
          </span>
          <span className="text-xs font-mono font-semibold text-muted-foreground">
            Code 1040
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
          {formatCurrency(cityBankCurrent)}
        </div>
        <p className="text-[11px] text-muted-foreground">
          Primary corporate business checking &amp; tax reserve
        </p>
      </div>
    </div>
  );
}
