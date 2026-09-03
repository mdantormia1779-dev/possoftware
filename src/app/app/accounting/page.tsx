"use client";

import React from "react";
import Link from "next/link";
import { storageService } from "@/lib/services/storage";
import { formatCurrency } from "@/lib/utils";
import {
  BookOpen,
  DollarSign,
  TrendingUp,
  CreditCard,
  Building2,
  FileText,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Receipt,
  Sparkles,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";

export default function AccountingOverviewPage() {
  const accounts = storageService.getAccounts();
  const journals = storageService.getJournalEntries();

  // Aggregate balance by Account Types
  const totalAssets = accounts
    .filter((a) => a.type === "asset")
    .reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = accounts
    .filter((a) => a.type === "liability")
    .reduce((sum, a) => sum + a.balance, 0);
  const totalRevenue = accounts
    .filter((a) => a.type === "revenue")
    .reduce((sum, a) => sum + a.balance, 0);
  const totalExpenses = accounts
    .filter((a) => a.type === "expense")
    .reduce((sum, a) => sum + a.balance, 0);
  const netOperatingProfit = totalRevenue - totalExpenses;

  // Specific cash & bank liquid balances
  const cashInHand = accounts.find((a) => a.code === "1010")?.balance || 0;
  const bkashMerchant = accounts.find((a) => a.code === "1020")?.balance || 0;
  const cityBankCurrent = accounts.find((a) => a.code === "1040")?.balance || 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Accounting &amp; Financial Ledger</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Automated double-entry general ledger, liquid reserves, and real-time P&amp;L in BDT (৳)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/accounting/reports"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-card border border-border/80 text-foreground hover:bg-muted shadow-subtle-xs transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Financial Statements</span>
          </Link>
          <Link
            href="/app/accounting/journal"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/25 transition-transform active:scale-95"
          >
            <Receipt className="h-3.5 w-3.5" />
            <span>Auto Journals ({journals.length})</span>
          </Link>
        </div>
      </div>

      {/* 4 Core Financial KPI StatCards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Total Gross Revenue"
          value={formatCurrency(totalRevenue)}
          change="+16.8%"
          isPositive={true}
          icon={TrendingUp}
          description="Sales & other income"
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          iconTextColor="text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="Operating Expenses"
          value={formatCurrency(totalExpenses)}
          icon={DollarSign}
          description="COGS, Rent, Payroll, Utility"
          iconBgColor="bg-amber-50 dark:bg-amber-950/60"
          iconTextColor="text-amber-600 dark:text-amber-400"
        />

        <StatCard
          title="Net Operating Profit"
          value={formatCurrency(netOperatingProfit)}
          change="32.5% Margin"
          isPositive={true}
          icon={ShieldCheck}
          description="Gross revenue minus costs"
          iconBgColor="bg-indigo-50 dark:bg-indigo-950/60"
          iconTextColor="text-indigo-600 dark:text-indigo-400"
        />

        <StatCard
          title="Total Company Assets"
          value={formatCurrency(totalAssets)}
          icon={Building2}
          description="Cash, Banks, Stock, Receivables"
          iconBgColor="bg-blue-50 dark:bg-blue-950/60"
          iconTextColor="text-blue-600 dark:text-blue-400"
        />
      </div>

      {/* Cash & Liquid Banking Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-5 sm:p-6 rounded-3xl border border-border/80 bg-card shadow-subtle-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Cash in Till (Register)
            </span>
            <span className="text-xs font-mono font-bold text-muted-foreground">
              Code 1010
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-foreground font-mono">
            {formatCurrency(cashInHand)}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Immediate retail drawer physical liquidity
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl border border-pink-200/80 dark:border-pink-900/60 bg-pink-50/20 dark:bg-pink-950/10 shadow-subtle-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-wider">
              bKash Merchant Account
            </span>
            <span className="text-xs font-mono font-bold text-pink-700 dark:text-pink-300">
              Code 1020
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-pink-700 dark:text-pink-300 font-mono">
            {formatCurrency(bkashMerchant)}
          </div>
          <p className="text-[11px] text-pink-700/80 dark:text-pink-300/80">
            Instant settlement from digital customer QR payments
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl border border-border/80 bg-card shadow-subtle-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              City Bank Corporate A/C
            </span>
            <span className="text-xs font-mono font-bold text-muted-foreground">
              Code 1040
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-foreground font-mono">
            {formatCurrency(cityBankCurrent)}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Primary corporate business checking &amp; tax reserve
          </p>
        </div>
      </div>

      {/* Accounting Quick Links Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Link
          href="/app/accounting/chart-of-accounts"
          className="p-5 rounded-3xl border border-border/80 bg-card hover:border-indigo-400 dark:hover:border-indigo-600 transition-all shadow-subtle-xs hover:shadow-subtle-md flex flex-col justify-between group"
        >
          <div>
            <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 w-fit mb-3">
              <Layers className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-foreground">
              Chart of Accounts
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              {accounts.length} structured general ledger accounts
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
            <span>Manage accounts</span>{" "}
            <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>

        <Link
          href="/app/accounting/journal"
          className="p-5 rounded-3xl border border-border/80 bg-card hover:border-indigo-400 dark:hover:border-indigo-600 transition-all shadow-subtle-xs hover:shadow-subtle-md flex flex-col justify-between group"
        >
          <div>
            <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 w-fit mb-3">
              <Receipt className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-foreground">
              Auto-Journal Entries
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              Audit double-entry debit &amp; credit postings
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
            <span>View journals</span>{" "}
            <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>

        <Link
          href="/app/accounting/banks"
          className="p-5 rounded-3xl border border-border/80 bg-card hover:border-indigo-400 dark:hover:border-indigo-600 transition-all shadow-subtle-xs hover:shadow-subtle-md flex flex-col justify-between group"
        >
          <div>
            <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 w-fit mb-3">
              <CreditCard className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-foreground">
              Cash &amp; Bank Accounts
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              Reconciliation with bKash, Nagad &amp; City Bank
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
            <span>Reconcile balances</span>{" "}
            <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>

        <Link
          href="/app/accounting/reports"
          className="p-5 rounded-3xl border border-border/80 bg-card hover:border-indigo-400 dark:hover:border-indigo-600 transition-all shadow-subtle-xs hover:shadow-subtle-md flex flex-col justify-between group"
        >
          <div>
            <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 w-fit mb-3">
              <FileText className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-foreground">
              Financial Reports
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              P&amp;L, Balance Sheet, Cash Flow &amp; Mushak-6.3
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
            <span>Generate statements</span>{" "}
            <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
