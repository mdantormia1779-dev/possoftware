import React from "react";
import { PauseCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

interface PosCartSummaryProps {
  cartLength: number;
  subtotal: number;
  discount: number;
  taxRate: number;
  totalTax: number;
  grandTotal: number;
  onHoldSale: () => void;
  onOpenPayment: () => void;
}

export function PosCartSummary({
  cartLength,
  subtotal,
  discount,
  taxRate,
  totalTax,
  grandTotal,
  onHoldSale,
  onOpenPayment,
}: PosCartSummaryProps) {
  return (
    <div className="p-4 sm:p-5 border-t border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC]/80 dark:bg-[#0B1120]/40 space-y-3.5">
      <div className="space-y-1.5 text-xs font-mono">
        <div className="flex justify-between text-[#475569] dark:text-[#94A3B8]">
          <span className="font-sans">Subtotal:</span>
          <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            {formatCurrency(subtotal)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-[#047857] dark:text-[#34D399]">
            <span className="font-sans">Discount:</span>
            <span className="font-bold">-{formatCurrency(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-[#475569] dark:text-[#94A3B8]">
          <span className="font-sans">Tax (VAT {taxRate}%):</span>
          <span className="font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            {formatCurrency(totalTax)}
          </span>
        </div>
        <div className="flex justify-between items-baseline text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] pt-2 border-t border-[#E2E8F0] dark:border-[#1E293B]">
          <span className="font-sans text-sm font-semibold tracking-tight uppercase text-[#475569] dark:text-[#94A3B8]">
            Total:
          </span>
          <span className="text-[#4F46E5] dark:text-[#818CF8] text-xl font-bold font-mono">
            {formatCurrency(grandTotal)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <Button
          variant="outline"
          size="md"
          disabled={cartLength === 0}
          onClick={onHoldSale}
          className="text-xs font-semibold"
        >
          <PauseCircle className="h-3.5 w-3.5 mr-1.5" /> Hold Order
        </Button>

        <Button
          variant="primary"
          size="md"
          disabled={cartLength === 0}
          onClick={onOpenPayment}
          className="col-span-1 text-xs sm:text-sm font-bold shadow-sm shadow-indigo-500/25"
        >
          <CreditCard className="h-4 w-4 mr-2" /> Pay Now
        </Button>
      </div>
    </div>
  );
}
