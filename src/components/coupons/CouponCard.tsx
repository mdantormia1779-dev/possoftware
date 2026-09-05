import React from "react";
import { Coupon } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono font-extrabold text-base tracking-wider px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {coupon.code}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Active
          </span>
        </div>

        <div className="text-2xl font-extrabold text-foreground">
          {coupon.discountType === "percentage"
            ? `${coupon.discountValue}% OFF`
            : `${formatCurrency(coupon.discountValue)} OFF`}
        </div>

        <div className="space-y-1 text-xs text-muted-foreground">
          <div>Min Purchase: <strong>{formatCurrency(coupon.minPurchase)}</strong></div>
          <div>Times Redeemed: <strong>{coupon.timesUsed} / {coupon.usageLimit}</strong></div>
          <div>Expires: <strong>{formatDate(coupon.expiresAt)}</strong></div>
        </div>
      </div>

      <div className="pt-2 border-t border-border flex justify-between items-center text-xs">
        <span className="text-[10px] text-muted-foreground">POS Ready</span>
        <span className="text-emerald-600 font-bold">Enabled</span>
      </div>
    </div>
  );
}
