"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency } from "@/lib/utils";
import { FileText, ArrowLeft, Printer, Download, CheckCircle2, TrendingUp, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function FinancialReportsPage() {
  const { currentOrg } = useTenant();
  const [activeTab, setActiveTab] = useState<"pnl" | "balance_sheet" | "trial_balance">("pnl");

  const accounts = storageService.getAccounts();

  // P&L Metrics
  const grossSales = accounts.find((a) => a.code === "4010")?.balance || 1845000;
  const discounts = accounts.find((a) => a.code === "4020")?.balance || -38500;
  const netSalesRevenue = grossSales + discounts;
  const cogs = accounts.find((a) => a.code === "5010")?.balance || 980000;
  const grossProfit = netSalesRevenue - cogs;

  const staffSalaryExpense = accounts.find((a) => a.code === "5020")?.balance || 310000;
  const commissionsExpense = accounts.find((a) => a.code === "5030")?.balance || 42500;
  const rentExpense = accounts.find((a) => a.code === "5040")?.balance || 180000;
  const utilitiesExpense = accounts.find((a) => a.code === "5050")?.balance || 35000;
  const marketingExpense = accounts.find((a) => a.code === "5060")?.balance || 12500;
  const totalOperatingExpenses = staffSalaryExpense + commissionsExpense + rentExpense + utilitiesExpense + marketingExpense;

  const netOperatingIncome = grossProfit - totalOperatingExpenses;

  // Balance Sheet Metrics
  const cashAndBanks = 64200 + 142800 + 58500 + 845000;
  const accountsReceivable = 74500;
  const inventoryAsset = 2960000;
  const totalCurrentAssets = cashAndBanks + accountsReceivable + inventoryAsset;

  const accountsPayable = 63500;
  const taxPayable = 24800;
  const accruedSalaries = 165000;
  const totalLiabilities = accountsPayable + taxPayable + accruedSalaries;

  const ownerEquity = 3500000;
  const retainedEarnings = totalCurrentAssets - totalLiabilities - ownerEquity;
  const totalLiabilitiesAndEquity = totalLiabilities + ownerEquity + retainedEarnings;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-3">
          <Link href="/app/accounting" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">Standard Financial Statements</h1>
            <p className="text-xs text-muted-foreground">Certified Profit & Loss and Balance Sheet for {currentOrg.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1.5" /> Print Statement
          </Button>
        </div>
      </div>

      {/* Tabs Selector (No print) */}
      <div className="flex items-center gap-2 border-b border-border pb-3 no-print text-xs">
        <button
          onClick={() => setActiveTab("pnl")}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === "pnl"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-muted hover:bg-muted/80 text-foreground"
          }`}
        >
          Profit & Loss Statement
        </button>
        <button
          onClick={() => setActiveTab("balance_sheet")}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === "balance_sheet"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-muted hover:bg-muted/80 text-foreground"
          }`}
        >
          Balance Sheet
        </button>
        <button
          onClick={() => setActiveTab("trial_balance")}
          className={`px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === "trial_balance"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-muted hover:bg-muted/80 text-foreground"
          }`}
        >
          Trial Balance
        </button>
      </div>

      {/* Printable Report Document Sheet */}
      <div className="p-8 sm:p-12 rounded-3xl border border-border bg-card shadow-sm text-xs space-y-8 font-sans">
        {/* Document Header */}
        <div className="text-center border-b border-border pb-6 space-y-1">
          <h2 className="text-xl font-bold text-foreground uppercase tracking-wide">{currentOrg.name}</h2>
          <p className="text-xs text-muted-foreground">{currentOrg.address} • BIN: {currentOrg.taxNumber}</p>
          <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 pt-2 uppercase">
            {activeTab === "pnl" && "Statement of Profit and Loss (P&L)"}
            {activeTab === "balance_sheet" && "Statement of Financial Position (Balance Sheet)"}
            {activeTab === "trial_balance" && "General Ledger Trial Balance"}
          </div>
          <p className="text-[11px] text-muted-foreground">For the period ended 28 February 2026 • Currency in BDT (৳)</p>
        </div>

        {/* Tab 1: Profit and Loss */}
        {activeTab === "pnl" && (
          <div className="space-y-6">
            {/* Revenue */}
            <div className="space-y-2">
              <h4 className="font-bold text-foreground uppercase tracking-wider text-xs border-b border-border pb-1">
                1. Operating Revenue
              </h4>
              <div className="flex justify-between py-1">
                <span>Gross Merchandise Sales (POS & Online)</span>
                <span className="font-mono">{formatCurrency(grossSales)}</span>
              </div>
              <div className="flex justify-between py-1 text-muted-foreground">
                <span>Less: Promotional Discounts & Coupons</span>
                <span className="font-mono">{formatCurrency(discounts)}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold border-t border-border">
                <span>Net Sales Revenue</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{formatCurrency(netSalesRevenue)}</span>
              </div>
            </div>

            {/* COGS */}
            <div className="space-y-2">
              <h4 className="font-bold text-foreground uppercase tracking-wider text-xs border-b border-border pb-1">
                2. Cost of Goods Sold (COGS)
              </h4>
              <div className="flex justify-between py-1">
                <span>Purchase Cost of Sold Inventory</span>
                <span className="font-mono">({formatCurrency(cogs)})</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold border-t border-border">
                <span>Gross Operating Margin / Profit</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">{formatCurrency(grossProfit)}</span>
              </div>
            </div>

            {/* Operating Expenses */}
            <div className="space-y-2">
              <h4 className="font-bold text-foreground uppercase tracking-wider text-xs border-b border-border pb-1">
                3. Operating & Administrative Expenses
              </h4>
              <div className="flex justify-between py-1">
                <span>Staff Salaries & Allowances</span>
                <span className="font-mono">{formatCurrency(staffSalaryExpense)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Sales Staff POS Commissions</span>
                <span className="font-mono">{formatCurrency(commissionsExpense)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Outlet Showroom & Floor Leases (Banani, Dhanmondi, GEC)</span>
                <span className="font-mono">{formatCurrency(rentExpense)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>DESCO / DPDC Electricity & Generator Utilities</span>
                <span className="font-mono">{formatCurrency(utilitiesExpense)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>SMS Broadcast Campaigns & Marketing</span>
                <span className="font-mono">{formatCurrency(marketingExpense)}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold border-t border-border text-rose-600">
                <span>Total Operating Expenses</span>
                <span className="font-mono">({formatCurrency(totalOperatingExpenses)})</span>
              </div>
            </div>

            {/* Net Profit Summary */}
            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between text-sm font-extrabold text-foreground">
              <span>NET COMPREHENSIVE INCOME / PROFIT:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono text-base">
                {formatCurrency(netOperatingIncome)}
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Balance Sheet */}
        {activeTab === "balance_sheet" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-bold text-foreground uppercase tracking-wider text-xs border-b border-border pb-1">
                ASSETS (Current & Non-Current)
              </h4>
              <div className="flex justify-between py-1">
                <span>Liquid Cash & Corporate Bank Balances</span>
                <span className="font-mono">{formatCurrency(cashAndBanks)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Customer Accounts Receivable (Due)</span>
                <span className="font-mono">{formatCurrency(accountsReceivable)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Merchandise Inventory Valuation (Asset)</span>
                <span className="font-mono">{formatCurrency(inventoryAsset)}</span>
              </div>
              <div className="flex justify-between py-2 font-extrabold border-t-2 border-border text-indigo-600 dark:text-indigo-400">
                <span>TOTAL ASSETS:</span>
                <span className="font-mono text-sm">{formatCurrency(totalCurrentAssets)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-foreground uppercase tracking-wider text-xs border-b border-border pb-1">
                LIABILITIES & OWNER EQUITY
              </h4>
              <div className="flex justify-between py-1">
                <span>Supplier Accounts Payable</span>
                <span className="font-mono">{formatCurrency(accountsPayable)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>NBR VAT / Tax Payable</span>
                <span className="font-mono">{formatCurrency(taxPayable)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Accrued Month-End Salaries</span>
                <span className="font-mono">{formatCurrency(accruedSalaries)}</span>
              </div>
              <div className="flex justify-between py-1.5 font-bold border-t border-border">
                <span>Owner Capital & Equity</span>
                <span className="font-mono">{formatCurrency(ownerEquity)}</span>
              </div>
              <div className="flex justify-between py-1 text-muted-foreground">
                <span>Retained Earnings & Accumulated Surplus</span>
                <span className="font-mono">{formatCurrency(retainedEarnings)}</span>
              </div>
              <div className="flex justify-between py-2 font-extrabold border-t-2 border-border text-indigo-600 dark:text-indigo-400">
                <span>TOTAL LIABILITIES & EQUITY:</span>
                <span className="font-mono text-sm">{formatCurrency(totalLiabilitiesAndEquity)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Trial Balance */}
        {activeTab === "trial_balance" && (
          <div className="space-y-4">
            <table className="w-full text-left">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="p-2">Code</th>
                  <th className="p-2">Account Title</th>
                  <th className="p-2 text-right">Debit Balance (৳)</th>
                  <th className="p-2 text-right">Credit Balance (৳)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono">
                {accounts.map((acc) => {
                  const isDebit = acc.type === "asset" || acc.type === "expense";
                  return (
                    <tr key={acc.id}>
                      <td className="p-2 text-muted-foreground">{acc.code}</td>
                      <td className="p-2 font-sans font-medium text-foreground">{acc.name}</td>
                      <td className="p-2 text-right">{isDebit ? formatCurrency(Math.abs(acc.balance)) : "-"}</td>
                      <td className="p-2 text-right">{!isDebit ? formatCurrency(Math.abs(acc.balance)) : "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Document Certification Footer */}
        <div className="pt-8 border-t border-border flex justify-between items-center text-[10px] text-muted-foreground">
          <div>Prepared by: Kazi Mahfuzur Rahman (Chief Accountant)</div>
          <div>Authorized Signature: _______________________</div>
        </div>
      </div>
    </div>
  );
}
