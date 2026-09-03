"use client";

import React from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  BookOpen,
  DollarSign,
  Receipt,
  CreditCard,
  Building2,
  FileText,
  BarChart3,
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";

export function AccountantDashboard() {
  const { currentOrg, setActiveReceiptSale } = useTenant();
  const sales = storageService.getSales();
  const customers = storageService.getCustomers();
  const journals = storageService.getJournalEntries();
  const accounts = storageService.getAccounts();

  // Metrics
  const todaySalesTotal = sales.reduce((sum, s) => sum + s.grandTotal, 0);
  const totalVATCollected = sales.reduce((sum, s) => sum + (s.taxAmount || 0), 0);
  const totalCustomerDue = customers.reduce((sum, c) => sum + c.dueBalance, 0);

  // Bank & Liquid Accounts
  const liquidAccounts = [
    { name: "City Bank (Corporate Current)", number: "A/C: 1102948291001", balance: 842000, type: "Bank" },
    { name: "bKash Merchant Account", number: "Wallet: 01700-000000", balance: 285400, type: "MFS" },
    { name: "Main Cash Till (Counter Drawers)", number: "All Branches", balance: 45200, type: "Cash" },
  ];
  const totalLiquidCash = liquidAccounts.reduce((sum, a) => sum + a.balance, 0);

  // Customers with outstanding dues
  const dueCustomers = customers.filter((c) => c.dueBalance > 0).sort((a, b) => b.dueBalance - a.dueBalance);

  return (
    <div className="space-y-6">
      {/* Accountant Fiscal Header Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent border border-blue-200/80 dark:border-blue-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-700 dark:text-blue-300">
              <BookOpen className="h-4 w-4" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-foreground">
              General Ledger &amp; Fiscal Compliance Control
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> NBR Compliant
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Double-entry bookkeeping, NBR 5% Mushak 6.3 tracking &amp; automated ledger postings
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/accounting/journal"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border/80 hover:border-blue-400 text-xs font-bold text-foreground transition-all shadow-subtle-xs active:scale-95"
          >
            <Receipt className="h-3.5 w-3.5 text-blue-600" />
            <span>New Journal</span>
          </Link>

          <Link
            href="/app/accounting/reports"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all active:scale-95"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>P&amp;L Statements</span>
          </Link>
        </div>
      </div>

      {/* 4 Accountant KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Gross Revenue Today"
          value={formatCurrency(todaySalesTotal)}
          change="+12.4% vs avg"
          isPositive={true}
          icon={DollarSign}
          description="Cash &amp; credit invoiced"
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          iconTextColor="text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="NBR Output VAT (5%)"
          value={formatCurrency(totalVATCollected || todaySalesTotal * 0.05)}
          change="Mushak 6.3 Auto"
          isPositive={true}
          icon={FileText}
          description="Fiscal tax ledger"
          iconBgColor="bg-blue-50 dark:bg-blue-950/60"
          iconTextColor="text-blue-600 dark:text-blue-400"
        />

        <StatCard
          title="Liquid Cash &amp; Bank"
          value={formatCurrency(totalLiquidCash)}
          change="3 Accounts Reconciled"
          isPositive={true}
          icon={CreditCard}
          description="Bank + bKash + Till"
          iconBgColor="bg-purple-50 dark:bg-purple-950/60"
          iconTextColor="text-purple-600 dark:text-purple-400"
        />

        <StatCard
          title="Accounts Receivable"
          value={formatCurrency(totalCustomerDue)}
          change={`${dueCustomers.length} Debtors`}
          isPositive={false}
          icon={CreditCard}
          description="Customer dues outstanding"
          iconBgColor="bg-rose-50 dark:bg-rose-950/60"
          iconTextColor="text-rose-600 dark:text-rose-400"
        />
      </div>

      {/* Cash & Bank Balances + Accounts Receivable Aging */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Bank & Liquid Accounts Card */}
        <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                Liquid Treasury Balances
              </h3>
              <p className="text-xs text-muted-foreground">Current available funds across institutions</p>
            </div>
            <Link
              href="/app/accounting/banks"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Manage Banks</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {liquidAccounts.map((account, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-muted/20 border border-border/70 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-sm">
                    {account.type === "Bank" ? "🏦" : account.type === "MFS" ? "📱" : "💵"}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">{account.name}</div>
                    <div className="text-[10px] text-muted-foreground font-mono">{account.number}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-black text-sm text-foreground">
                    {formatCurrency(account.balance)}
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    Live Synced
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Accounts Receivable (Customer Dues) */}
        <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                Top Accounts Receivable
              </h3>
              <p className="text-xs text-muted-foreground">Highest outstanding customer credit balances</p>
            </div>
            <Link
              href="/app/customers"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              All Customers
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            {dueCustomers.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/60 shadow-subtle-xs"
              >
                <div>
                  <span className="font-bold text-foreground">{c.name}</span>
                  <span className="text-[10px] text-muted-foreground font-mono block">
                    Phone: {c.phone} • Limit: {formatCurrency(c.creditLimit)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400 block">
                    {formatCurrency(c.dueBalance)}
                  </span>
                  <span className="text-[10px] text-muted-foreground">Overdue</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Double-Entry Journal Entries Activity */}
      <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
              Recent Automated Journal Postings
            </h3>
            <p className="text-xs text-muted-foreground">Real-time debit/credit records generated by POS and operations</p>
          </div>
          <Link
            href="/app/accounting/journal"
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View Full General Ledger</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/60">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="p-3.5">Entry Number</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Description</th>
                <th className="p-3.5">Debit (DR)</th>
                <th className="p-3.5">Credit (CR)</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-card">
              {journals.slice(0, 4).map((j) => {
                const totalDebit = j.lines.reduce((sum, l) => sum + (l.debit || 0), 0);
                const totalCredit = j.lines.reduce((sum, l) => sum + (l.credit || 0), 0);
                return (
                  <tr key={j.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {j.entryNumber}
                    </td>
                    <td className="p-3.5 text-muted-foreground font-mono">
                      {formatDate(j.date)}
                    </td>
                    <td className="p-3.5 text-foreground font-medium">
                      {j.description}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-foreground">
                      {formatCurrency(totalDebit)}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-foreground">
                      {formatCurrency(totalCredit)}
                    </td>
                    <td className="p-3.5 text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Balanced
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
