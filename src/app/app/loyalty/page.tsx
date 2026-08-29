"use client";

import React from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency } from "@/lib/utils";
import { Gift, ArrowLeft, Award, Sparkles, TrendingUp, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoyaltyProgramPage() {
  const customers = storageService.getCustomers();
  const totalPointsIssued = customers.reduce((sum, c) => sum + c.loyaltyPoints, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/app/customers" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Gift className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span>Customer Loyalty & Reward Club</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Automated points accrual (1 point per ৳100 spent) and instant POS checkout redemptions
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card shadow-2xs">
          <span className="text-xs text-muted-foreground font-medium">Total Active Reward Points</span>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
            {totalPointsIssued} Points
          </div>
          <span className="text-[11px] text-muted-foreground mt-1 block">Circulating across all registered customers</span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-2xs">
          <span className="text-xs text-muted-foreground font-medium">Points Equivalent Value</span>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {formatCurrency(totalPointsIssued * 0.5)}
          </div>
          <span className="text-[11px] text-muted-foreground mt-1 block">1 Point = ৳0.50 discount at POS</span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card shadow-2xs">
          <span className="text-xs text-muted-foreground font-medium">Loyalty Members</span>
          <div className="text-2xl font-bold text-foreground mt-1">{customers.length} Members</div>
          <span className="text-[11px] text-muted-foreground mt-1 block">100% active retention rate</span>
        </div>
      </div>

      {/* Loyalty Leaderboard Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-border bg-muted/20">
          <h3 className="text-sm font-bold text-foreground">Top VIP Loyalty Customers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3.5 font-semibold text-foreground">Customer</th>
                <th className="p-3.5 font-semibold text-foreground">Phone</th>
                <th className="p-3.5 font-semibold text-foreground">Orders Count</th>
                <th className="p-3.5 font-semibold text-foreground">Total Spend (৳)</th>
                <th className="p-3.5 text-right font-semibold text-foreground">Reward Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers
                .sort((a, b) => b.loyaltyPoints - a.loyaltyPoints)
                .map((c) => (
                  <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5 font-bold text-foreground">{c.name}</td>
                    <td className="p-3.5 font-mono text-muted-foreground">{c.phone}</td>
                    <td className="p-3.5 text-muted-foreground font-semibold">{c.ordersCount} visits</td>
                    <td className="p-3.5 font-bold text-foreground">{formatCurrency(c.totalSpent)}</td>
                    <td className="p-3.5 text-right">
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {c.loyaltyPoints} Pts
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
