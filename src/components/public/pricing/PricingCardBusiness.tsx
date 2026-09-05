import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface PricingCardBusinessProps {
  price: number;
  isYearly: boolean;
}

export function PricingCardBusiness({ price, isYearly }: PricingCardBusinessProps) {
  return (
    <div className="rounded-3xl border-2 border-indigo-600 bg-card p-8 flex flex-col justify-between shadow-2xl relative">
      <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
        Most Popular
      </div>
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-foreground">Business</h3>
            <p className="text-xs text-muted-foreground mt-1">Multi-branch brands &amp; growing chains</p>
          </div>
        </div>
        <div className="my-6">
          <span className="text-4xl font-extrabold text-foreground">{formatCurrency(price)}</span>
          <span className="text-xs text-muted-foreground"> / month</span>
          {isYearly && <p className="text-[11px] text-emerald-600 mt-1">Billed annually (৳{price * 12}/yr)</p>}
        </div>
        <ul className="space-y-3 text-xs text-muted-foreground mb-8">
          <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> All Starter Features</li>
          <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> 3 Branches Included</li>
          <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> 20 Staff Accounts</li>
          <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Stock Transfer Workflows</li>
          <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Automated Double-Entry Accounting</li>
          <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> HR, Attendance, Payroll &amp; Commission</li>
          <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Customer Loyalty &amp; Broadcast CRM</li>
        </ul>
      </div>
      <Link
        href="/register"
        className="w-full text-center py-3 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 transition-transform active:scale-95"
      >
        Start Business Trial
      </Link>
    </div>
  );
}
