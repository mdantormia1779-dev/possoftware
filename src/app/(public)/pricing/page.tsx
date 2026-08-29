"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, HelpCircle, Sparkles, ArrowRight, Zap } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const COMPARISON_FEATURES = [
  { name: "Offline-First POS Terminal", starter: true, business: true, enterprise: true },
  { name: "Barcode Label Generator (Code128)", starter: true, business: true, enterprise: true },
  { name: "Thermal Receipt Printing (80mm)", starter: true, business: true, enterprise: true },
  { name: "Included Outlets / Branches", starter: "1 Branch", business: "3 Branches", enterprise: "Unlimited" },
  { name: "Staff / Cashier Accounts", starter: "5 Users", business: "20 Users", enterprise: "Unlimited" },
  { name: "Product Catalog Capacity", starter: "5,000 SKUs", business: "Unlimited", enterprise: "Unlimited" },
  { name: "Multi-Branch Stock Transfers", starter: false, business: true, enterprise: true },
  { name: "Automated Double-Entry Accounting", starter: false, business: true, enterprise: true },
  { name: "Full Financial Reports (P&L, Balance Sheet)", starter: false, business: true, enterprise: true },
  { name: "HR, Daily Attendance & Leave Approvals", starter: false, business: true, enterprise: true },
  { name: "Automated Payroll & Commission Engine", starter: false, business: true, enterprise: true },
  { name: "Customer Loyalty & Coupons", starter: false, business: true, enterprise: true },
  { name: "SMS & WhatsApp Broadcast Campaigns", starter: false, business: true, enterprise: true },
  { name: "Multi-Company Holdings", starter: false, business: false, enterprise: true },
  { name: "REST API & Webhooks", starter: false, business: false, enterprise: true },
  { name: "Dedicated Account Support", starter: "Standard", business: "Priority", enterprise: "24/7 Dedicated" },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const starterPrice = isYearly ? 2499 : 2999;
  const businessPrice = isYearly ? 5999 : 6999;
  const enterprisePrice = isYearly ? 12999 : 14999;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Flexible Plans Tailored For Every Stage of Business
        </h1>
        <p className="text-base text-muted-foreground">
          Transparent pricing in Bangladeshi Taka (৳). No hidden setup fees or surprise surcharges.
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
            Monthly Billing
          </span>
          <button
            type="button"
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isYearly ? "bg-indigo-600" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isYearly ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
            Annual Billing
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* Main Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Starter Plan */}
        <div className="rounded-3xl border border-border bg-card p-8 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-foreground">Starter</h3>
                <p className="text-xs text-muted-foreground mt-1">Single outlet store or retail grocery</p>
              </div>
            </div>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-foreground">{formatCurrency(starterPrice)}</span>
              <span className="text-xs text-muted-foreground"> / month</span>
              {isYearly && <p className="text-[11px] text-emerald-600 mt-1">Billed annually (৳{starterPrice * 12}/yr)</p>}
            </div>
            <ul className="space-y-3 text-xs text-muted-foreground mb-8">
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Offline-First POS Terminal</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> 1 Branch Included</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> 5 Staff Accounts</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Up to 5,000 Products</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Barcode & Receipt Generation</li>
            </ul>
          </div>
          <Link
            href="/register"
            className="w-full text-center py-3 text-xs font-bold rounded-xl border border-border hover:bg-muted text-foreground transition-colors"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Business Plan */}
        <div className="rounded-3xl border-2 border-indigo-600 bg-card p-8 flex flex-col justify-between shadow-2xl relative">
          <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
            Most Popular
          </div>
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-foreground">Business</h3>
                <p className="text-xs text-muted-foreground mt-1">Multi-branch brands & growing chains</p>
              </div>
            </div>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-foreground">{formatCurrency(businessPrice)}</span>
              <span className="text-xs text-muted-foreground"> / month</span>
              {isYearly && <p className="text-[11px] text-emerald-600 mt-1">Billed annually (৳{businessPrice * 12}/yr)</p>}
            </div>
            <ul className="space-y-3 text-xs text-muted-foreground mb-8">
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> All Starter Features</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> 3 Branches Included</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> 20 Staff Accounts</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Stock Transfer Workflows</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Automated Double-Entry Accounting</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> HR, Attendance, Payroll & Commission</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Customer Loyalty & Broadcast CRM</li>
            </ul>
          </div>
          <Link
            href="/register"
            className="w-full text-center py-3 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 transition-transform active:scale-95"
          >
            Start Business Trial
          </Link>
        </div>

        {/* Enterprise Plan */}
        <div className="rounded-3xl border border-border bg-card p-8 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-foreground">Enterprise</h3>
                <p className="text-xs text-muted-foreground mt-1">Large retail chains & holding groups</p>
              </div>
            </div>
            <div className="my-6">
              <span className="text-4xl font-extrabold text-foreground">{formatCurrency(enterprisePrice)}</span>
              <span className="text-xs text-muted-foreground"> / month</span>
              {isYearly && <p className="text-[11px] text-emerald-600 mt-1">Billed annually (৳{enterprisePrice * 12}/yr)</p>}
            </div>
            <ul className="space-y-3 text-xs text-muted-foreground mb-8">
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Unlimited Branches & Outlets</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Unlimited Staff Accounts</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Multi-Company Holding Support</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> Custom Report Builder</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> REST API, Webhooks & ERP Sync</li>
              <li className="flex items-center gap-2.5"><Check className="h-4 w-4 text-emerald-500" /> 24/7 Dedicated Account Manager</li>
            </ul>
          </div>
          <Link
            href="/contact"
            className="w-full text-center py-3 text-xs font-bold rounded-xl border border-border hover:bg-muted text-foreground transition-colors"
          >
            Contact Enterprise Sales
          </Link>
        </div>
      </div>

      {/* Add-ons Section */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-foreground">Modular Add-ons</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Scale individual resources as your business expands</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-foreground">Additional Branch Outlet</div>
              <div className="text-[11px] text-muted-foreground">Extra location with sync</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">৳1,200</div>
              <div className="text-[10px] text-muted-foreground">/ month</div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-foreground">Transactional SMS Bundle</div>
              <div className="text-[11px] text-muted-foreground">Non-masking/Masking</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">৳0.35</div>
              <div className="text-[10px] text-muted-foreground">/ SMS</div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-foreground">Custom Accounting Report</div>
              <div className="text-[11px] text-muted-foreground">Designed by ERP engineer</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">৳5,000</div>
              <div className="text-[10px] text-muted-foreground">one-time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground text-center">
          Compare Plan Features
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-4 font-semibold text-foreground">Feature</th>
                <th className="p-4 text-center font-semibold text-foreground">Starter</th>
                <th className="p-4 text-center font-semibold text-indigo-600 dark:text-indigo-400">Business</th>
                <th className="p-4 text-center font-semibold text-foreground">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COMPARISON_FEATURES.map((feat, idx) => (
                <tr key={idx} className="hover:bg-muted/30">
                  <td className="p-4 font-medium text-foreground">{feat.name}</td>
                  <td className="p-4 text-center text-muted-foreground">
                    {typeof feat.starter === "boolean" ? (
                      feat.starter ? <Check className="h-4 w-4 text-emerald-500 mx-auto" /> : "-"
                    ) : (
                      feat.starter
                    )}
                  </td>
                  <td className="p-4 text-center font-semibold text-indigo-600 dark:text-indigo-400">
                    {typeof feat.business === "boolean" ? (
                      feat.business ? <Check className="h-4 w-4 text-emerald-500 mx-auto" /> : "-"
                    ) : (
                      feat.business
                    )}
                  </td>
                  <td className="p-4 text-center text-muted-foreground font-semibold">
                    {typeof feat.enterprise === "boolean" ? (
                      feat.enterprise ? <Check className="h-4 w-4 text-emerald-500 mx-auto" /> : "-"
                    ) : (
                      feat.enterprise
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
