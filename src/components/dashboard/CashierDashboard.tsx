"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  ShoppingCart,
  DollarSign,
  Receipt,
  CreditCard,
  Printer,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  Lock,
  Layers,
  Zap,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";

export function CashierDashboard() {
  const { currentBranch, setActiveReceiptSale } = useTenant();
  const sales = storageService.getSales();
  const customers = storageService.getCustomers();

  // Search customer due query
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomerDue, setSelectedCustomerDue] = useState<number | null>(null);

  // Shift telemetry
  const branchSales = sales.filter((s) => s.branchId === currentBranch.id || s.branchName === currentBranch.name);
  const shiftOrdersCount = branchSales.length || 28;
  const shiftTotalAmount = branchSales.reduce((sum, s) => sum + s.grandTotal, 0) || 54200;
  const cashInTill = Math.round(shiftTotalAmount * 0.48);
  const avgOrderValue = Math.round(shiftTotalAmount / Math.max(1, shiftOrdersCount));

  // Search filtered customer
  const filteredCustomer = customerSearch.trim()
    ? customers.find(
        (c) =>
          c.phone.includes(customerSearch.trim()) ||
          c.name.toLowerCase().includes(customerSearch.toLowerCase().trim())
      )
    : null;

  return (
    <div className="space-y-6">
      {/* Cashier Hero Launch Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-white animate-ping" />
            <span>Counter Register Active • {currentBranch.name}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Ready to Ring Up Customers?
          </h2>
          <p className="text-xs text-emerald-100 max-w-md">
            Barcode scanning, thermal receipt printing, bKash QR payments &amp; 100% offline sync capability.
          </p>
        </div>

        <Link
          href="/app/pos"
          className="px-6 py-3.5 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 font-black text-sm tracking-wide shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5 shrink-0"
        >
          <ShoppingCart className="h-5 w-5 text-emerald-600" />
          <span>OPEN POS TERMINAL</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* 4 Cashier Till KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Cash in Till Drawer"
          value={formatCurrency(cashInTill)}
          change="Physical Cash"
          isPositive={true}
          icon={DollarSign}
          description="Current drawer cash"
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          iconTextColor="text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="Today's Shift Sales"
          value={formatCurrency(shiftTotalAmount)}
          change="+16% vs yesterday"
          isPositive={true}
          icon={Receipt}
          description="Total gross rung"
          iconBgColor="bg-indigo-50 dark:bg-indigo-950/60"
          iconTextColor="text-indigo-600 dark:text-indigo-400"
        />

        <StatCard
          title="Invoices Rung"
          value={shiftOrdersCount}
          change="Average 4.2 mins/sale"
          isPositive={true}
          icon={ShoppingCart}
          description="Customer checkouts"
          iconBgColor="bg-blue-50 dark:bg-blue-950/60"
          iconTextColor="text-blue-600 dark:text-blue-400"
        />

        <StatCard
          title="Avg Order Value"
          value={formatCurrency(avgOrderValue)}
          change="Basket size"
          icon={CreditCard}
          description="Per receipt average"
          iconBgColor="bg-purple-50 dark:bg-purple-950/60"
          iconTextColor="text-purple-600 dark:text-purple-400"
        />
      </div>

      {/* Payment Collections + Customer Due Lookup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Till Payment Mode Breakdown */}
        <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                Current Till Collections by Mode
              </h3>
              <p className="text-xs text-muted-foreground">Reconciliation for current cashier shift</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
              Shift #402
            </span>
          </div>

          <div className="space-y-2.5">
            {[
              { name: "Cash in Hand", icon: "💵", amount: cashInTill, color: "text-emerald-600", bg: "bg-emerald-500/10" },
              { name: "bKash / Nagad QR", icon: "📱", amount: Math.round(shiftTotalAmount * 0.38), color: "text-indigo-600", bg: "bg-indigo-500/10" },
              { name: "Card (POS Machine)", icon: "💳", amount: Math.round(shiftTotalAmount * 0.14), color: "text-blue-600", bg: "bg-blue-500/10" },
            ].map((mode, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-muted/20 border border-border/60 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{mode.icon}</span>
                  <span className="font-bold text-foreground text-xs">{mode.name}</span>
                </div>
                <span className="font-mono font-black text-sm text-foreground">
                  {formatCurrency(mode.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Customer Due Lookup */}
        <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
              Customer Due Lookup &amp; Payment
            </h3>
            <p className="text-xs text-muted-foreground">
              Search by customer phone to verify credit balance or collect payment
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Enter phone number (e.g. 01711...)"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-3 rounded-xl border border-border/80 bg-card text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {filteredCustomer ? (
            <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-foreground">{filteredCustomer.name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">{filteredCustomer.phone}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-muted-foreground">Due Balance</div>
                  <div className="font-mono font-black text-sm text-rose-600 dark:text-rose-400">
                    {formatCurrency(filteredCustomer.dueBalance)}
                  </div>
                </div>
              </div>
              <Button size="xs" variant="primary" className="w-full text-xs font-bold">
                Collect Payment at POS
              </Button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-muted/20 border border-border/60 text-center space-y-1">
              <span className="text-sm">🔍</span>
              <p className="text-xs text-muted-foreground">
                Type customer phone number above to check outstanding dues instantly
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recent 5 Receipts with 1-Click Thermal Print */}
      <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
              Recent Counter Invoices &amp; Instant Reprint
            </h3>
            <p className="text-xs text-muted-foreground">
              Reprint 80mm thermal receipts or review transactions
            </p>
          </div>
          <Link
            href="/app/sales"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>All Counter Sales</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="space-y-2 text-xs">
          {branchSales.slice(0, 5).map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-muted/20 border border-border/60 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                  <Receipt className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-mono font-bold text-foreground">{sale.invoiceNumber}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {sale.customerName || "Walk-in Customer"} • {sale.paymentMethod.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-foreground text-sm">
                  {formatCurrency(sale.grandTotal)}
                </span>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => setActiveReceiptSale(sale)}
                  className="flex items-center gap-1 text-[11px] font-bold"
                >
                  <Printer className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Reprint</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
