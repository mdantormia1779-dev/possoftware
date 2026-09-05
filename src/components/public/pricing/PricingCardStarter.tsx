import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PricingCardStarterProps {
  price: number;
  isYearly: boolean;
}

export function PricingCardStarter({ price, isYearly }: PricingCardStarterProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-8 flex flex-col justify-between shadow-sm">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-foreground">Starter</h3>
            <p className="text-xs text-muted-foreground mt-1">Single outlet store or retail grocery</p>
          </div>
        </div>
        <div className="my-6">
          <span className="text-4xl font-extrabold text-foreground">{formatCurrency(price)}</span>
          <span className="text-xs text-muted-foreground"> / month</span>
          {isYearly && <p className="text-[11px] text-emerald-600 mt-1">Billed annually (৳{price * 12}/yr)</p>}
        </div>
        <ul className="space-y-3 text-xs text-muted-foreground mb-8">
          <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Offline-First POS Terminal</li>
          <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> 1 Branch Included</li>
          <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> 5 Staff Accounts</li>
          <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Up to 5,000 Products</li>
          <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Barcode &amp; Receipt Generation</li>
        </ul>
      </div>
      <Link
        href="/register"
        className="w-full text-center py-3 text-xs font-bold rounded-xl border border-border hover:bg-muted text-foreground transition-colors"
      >
        Start Free Trial
      </Link>
    </div>
  );
}
