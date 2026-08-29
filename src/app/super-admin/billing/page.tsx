"use client";

import React from "react";
import Link from "next/link";
import { DollarSign, ArrowLeft, Download, CheckCircle2 } from "lucide-react";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const MOCK_PLATFORM_PAYOUTS = [
  { id: "tx-991", tenant: "Rahman Fashion & Lifestyle", plan: "Business", amount: 6999, method: "bKash Merchant", date: "2026-02-28", status: "settled" },
  { id: "tx-992", tenant: "Noor Supermarket & Grocery", plan: "Starter", amount: 2999, method: "City Bank Card", date: "2026-02-28", status: "settled" },
  { id: "tx-993", tenant: "Green Care Pharmacy", plan: "Enterprise", amount: 14999, method: "Nagad Corporate", date: "2026-02-27", status: "settled" },
  { id: "tx-994", tenant: "Sylhet Gadget & Electronics", plan: "Business", amount: 6999, method: "bKash Merchant", date: "2026-02-26", status: "settled" },
];

export default function SuperAdminBillingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/super-admin" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-purple-600" />
              <span>Platform Billing & Payment Gateway Ledger</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Automated bKash, Nagad, and Card subscription settlements
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1.5" /> Export Payouts CSV
        </Button>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3.5 font-semibold text-foreground">Transaction ID</th>
                <th className="p-3.5 font-semibold text-foreground">Tenant Organization</th>
                <th className="p-3.5 font-semibold text-foreground">Plan Tier</th>
                <th className="p-3.5 font-semibold text-foreground">Amount (৳)</th>
                <th className="p-3.5 font-semibold text-foreground">Payment Gateway</th>
                <th className="p-3.5 font-semibold text-foreground">Date</th>
                <th className="p-3.5 text-right font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono">
              {MOCK_PLATFORM_PAYOUTS.map((tx) => (
                <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 text-purple-600 font-bold">{tx.id}</td>
                  <td className="p-3.5 font-sans font-bold text-foreground">{tx.tenant}</td>
                  <td className="p-3.5 font-sans uppercase font-bold text-[10px] text-muted-foreground">{tx.plan}</td>
                  <td className="p-3.5 font-bold text-foreground">{formatCurrency(tx.amount)}</td>
                  <td className="p-3.5 font-sans text-muted-foreground">{tx.method}</td>
                  <td className="p-3.5 font-sans text-muted-foreground">{tx.date}</td>
                  <td className="p-3.5 text-right font-sans">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Settled
                    </span>
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
