import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface LandingPricingCardsProps {
  billingCycle: "monthly" | "yearly";
}

export function LandingPricingCards({ billingCycle }: LandingPricingCardsProps) {
  const isYearly = billingCycle === "yearly";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Starter */}
      <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card shadow-subtle-xs flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">Starter</h3>
          <p className="text-xs text-muted-foreground mt-1">Single outlet retail & small shops</p>
          <div className="my-6">
            <span className="text-3xl font-black text-foreground font-mono">
              {isYearly ? "৳2,399" : "৳2,999"}
            </span>
            <span className="text-xs text-muted-foreground"> / month</span>
          </div>
          <ul className="space-y-3 text-xs text-muted-foreground mb-6">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Offline POS & Barcode Engine</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> 1 Branch & 5 Staff Logins</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Up to 5,000 Products</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> 80mm Thermal Receipt Print</li>
          </ul>
        </div>
        <Link
          href="/register"
          className="w-full text-center py-3 text-xs font-bold rounded-2xl border border-border/80 hover:bg-muted text-foreground transition-colors"
        >
          Choose Starter
        </Link>
      </div>

      {/* Business (Popular) */}
      <div className="p-6 sm:p-8 rounded-3xl border-2 border-indigo-600 bg-card relative shadow-xl shadow-indigo-500/10 flex flex-col justify-between">
        <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
          Most Popular
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Business</h3>
          <p className="text-xs text-muted-foreground mt-1">Multi-branch outlets & super shops</p>
          <div className="my-6">
            <span className="text-3xl font-black text-foreground font-mono">
              {isYearly ? "৳5,599" : "৳6,999"}
            </span>
            <span className="text-xs text-muted-foreground"> / month</span>
          </div>
          <ul className="space-y-3 text-xs text-muted-foreground mb-6">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> All Starter Features Included</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> 3 Branches & 20 Staff Logins</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Stock Transfer Workflows</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Auto Double-Entry Accounting</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Staff Attendance & Payroll</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Unlimited Products & Invoices</li>
          </ul>
        </div>
        <Link
          href="/register"
          className="w-full text-center py-3 text-xs font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25 transition-colors"
        >
          Start 14-Day Business Trial
        </Link>
      </div>

      {/* Enterprise */}
      <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card shadow-subtle-xs flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">Enterprise</h3>
          <p className="text-xs text-muted-foreground mt-1">Chains & multi-company holding groups</p>
          <div className="my-6">
            <span className="text-3xl font-black text-foreground font-mono">
              {isYearly ? "৳11,999" : "৳14,999"}
            </span>
            <span className="text-xs text-muted-foreground"> / month</span>
          </div>
          <ul className="space-y-3 text-xs text-muted-foreground mb-6">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Everything in Business Plan</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Unlimited Branches & Outlets</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Multi-Company Holding Setup</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Dedicated SLA & Account Manager</li>
          </ul>
        </div>
        <Link
          href="/contact"
          className="w-full text-center py-3 text-xs font-bold rounded-2xl border border-border/80 hover:bg-muted text-foreground transition-colors"
        >
          Contact Enterprise Team
        </Link>
      </div>
    </div>
  );
}
