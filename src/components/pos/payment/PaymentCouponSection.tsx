import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

interface PaymentCouponSectionProps {
  couponCode: string;
  setCouponCode: (code: string) => void;
  couponError: string;
  cartDiscount: number;
  onApplyCoupon: () => void;
}

export function PaymentCouponSection({
  couponCode,
  setCouponCode,
  couponError,
  cartDiscount,
  onApplyCoupon,
}: PaymentCouponSectionProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
        Promo / Coupon Code
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. EID2026"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          className="flex-1 h-9 px-3 rounded-lg border border-border bg-card text-xs uppercase font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-subtle-xs"
        />
        <Button size="xs" variant="outline" onClick={onApplyCoupon}>
          Apply
        </Button>
      </div>
      {couponError && (
        <p className="text-[11px] text-destructive font-medium">{couponError}</p>
      )}
      {cartDiscount > 0 && (
        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
          <Check className="h-3 w-3" /> Promo applied: -{formatCurrency(cartDiscount)} discount!
        </p>
      )}
    </div>
  );
}
