"use client";

import React from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Store,
  DollarSign,
  Users,
  AlertTriangle,
  Truck,
  TrendingUp,
  ShoppingCart,
  Clock,
  ArrowRight,
  CheckCircle2,
  CalendarCheck,
  Package,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";

export function BranchManagerDashboard() {
  const { currentBranch, setActiveReceiptSale } = useTenant();
  const sales = storageService.getSales();
  const products = storageService.getProducts();
  const employees = storageService.getEmployees();
  const transfers = storageService.getTransfers();

  // Branch-specific sales
  const branchSales = sales.filter((s) => s.branchId === currentBranch.id || s.branchName === currentBranch.name);
  const branchSalesTotal = branchSales.reduce((sum, s) => sum + s.grandTotal, 0);

  // Simulated branch daily target
  const branchDailyTarget = 100000;
  const targetPercent = Math.min(Math.round((branchSalesTotal / branchDailyTarget) * 100), 100);

  // Branch staff & attendance
  const branchEmployees = employees.filter((e) => !e.branchId || e.branchId === currentBranch.id);
  const staffOnDutyCount = Math.max(1, Math.round(branchEmployees.length * 0.8));

  // Low stock products at this branch
  const branchLowStock = products.filter((p) => p.totalStock <= p.minStockAlert);

  // Pending transfers related to this branch
  const branchTransfers = transfers.filter(
    (t) => t.sourceBranchId === currentBranch.id || t.destinationBranchId === currentBranch.id
  );

  return (
    <div className="space-y-6">
      {/* Branch Welcome Header Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/80 dark:border-amber-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300">
              <Store className="h-4 w-4" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-foreground">
              {currentBranch.name} • Operational Hub
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
              Branch Active
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Manager: {currentBranch.managerName || "Store Manager"} • City: {currentBranch.city} • Code: {currentBranch.code}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/app/inventory/transfers"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border/80 hover:border-amber-400 text-xs font-bold text-foreground transition-all shadow-subtle-xs active:scale-95"
          >
            <Truck className="h-3.5 w-3.5 text-amber-600" />
            <span>Request Stock</span>
          </Link>

          <Link
            href="/app/pos"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/25 transition-all active:scale-95"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Open Branch POS</span>
          </Link>
        </div>
      </div>

      {/* 4 Branch KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Today's Branch Sales"
          value={formatCurrency(branchSalesTotal)}
          change={`${targetPercent}% of Goal`}
          isPositive={targetPercent >= 70}
          icon={DollarSign}
          description={`Target: ${formatCurrency(branchDailyTarget)}`}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          iconTextColor="text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="Staff On Duty"
          value={`${staffOnDutyCount} / ${branchEmployees.length || 6}`}
          change="All Check-ins Verified"
          isPositive={true}
          icon={Users}
          description="Branch floor &amp; till roster"
          iconBgColor="bg-blue-50 dark:bg-blue-950/60"
          iconTextColor="text-blue-600 dark:text-blue-400"
        />

        <StatCard
          title="Low Stock Alerts"
          value={branchLowStock.length}
          change="Need Inter-Branch Reorder"
          isPositive={false}
          icon={AlertTriangle}
          description="SKUs below threshold"
          iconBgColor="bg-amber-50 dark:bg-amber-950/60"
          iconTextColor="text-amber-600 dark:text-amber-400"
        />

        <StatCard
          title="Pending Transfers"
          value={branchTransfers.length || 2}
          change="1 Inbound • 1 Outbound"
          icon={Truck}
          description="HQ stock movement"
          iconBgColor="bg-purple-50 dark:bg-purple-950/60"
          iconTextColor="text-purple-600 dark:text-purple-400"
        />
      </div>

      {/* Sales Target Progress & Cashier Shift Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Daily Target Meter (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                Daily Branch Sales Progress
              </h3>
              <p className="text-xs text-muted-foreground">
                Revenue vs target progress for {currentBranch.name}
              </p>
            </div>
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {targetPercent}% Achieved
            </span>
          </div>

          {/* Custom Progress Bar */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted/60 rounded-full overflow-hidden p-0.5 border border-border/60">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${targetPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
              <span>Earned: {formatCurrency(branchSalesTotal)}</span>
              <span>Daily Target: {formatCurrency(branchDailyTarget)}</span>
            </div>
          </div>

          {/* Cashier Till Breakdown */}
          <div className="pt-3 border-t border-border/60">
            <h4 className="text-xs font-bold text-foreground mb-2.5">
              Active Counter Registers Today
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-muted/20 border border-border/70 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-black text-xs">
                    C1
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Counter 1 (Main POS)</div>
                    <div className="text-[10px] text-muted-foreground">Cashier: Tanzim • 28 Invoices</div>
                  </div>
                </div>
                <div className="text-right font-mono font-bold text-xs text-foreground">
                  ৳54,200
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-muted/20 border border-border/70 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center font-black text-xs">
                    C2
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Counter 2 (Express)</div>
                    <div className="text-[10px] text-muted-foreground">Cashier: Farhana • 14 Invoices</div>
                  </div>
                </div>
                <div className="text-right font-mono font-bold text-xs text-foreground">
                  ৳30,300
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Attendance On Duty Snapshot (1 col) */}
        <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-3.5 shadow-subtle-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                Branch Roster
              </h3>
              <p className="text-xs text-muted-foreground">Staff on duty today</p>
            </div>
            <Link
              href="/app/attendance"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Attendance
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { name: "Tanzim Ahmed", role: "Cashier C1", time: "09:30 AM", status: "Present" },
              { name: "Farhana Yasmin", role: "Cashier C2", time: "09:45 AM", status: "Present" },
              { name: "Rifat Hossain", role: "Inventory Lead", time: "10:00 AM", status: "Present" },
              { name: "Sadia Sultana", role: "Floor Executive", time: "10:15 AM", status: "Present" },
            ].map((staff, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-xl bg-muted/20 border border-border/60"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <div className="truncate">
                    <div className="font-bold text-foreground text-xs truncate">{staff.name}</div>
                    <div className="text-[10px] text-muted-foreground">{staff.role}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground shrink-0 font-semibold">
                  In: {staff.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Branch Stock Alerts & Recent Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Branch Urgent Restock Items */}
        <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                Branch Restock Alerts
              </h3>
              <p className="text-xs text-muted-foreground">
                Items near depletion at {currentBranch.name}
              </p>
            </div>
            <Link
              href="/app/inventory/transfers"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Transfer from HQ</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            {branchLowStock.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/60 shadow-subtle-xs"
              >
                <div className="truncate pr-2">
                  <div className="font-bold text-foreground truncate">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground font-mono">
                    SKU: {p.sku} • Price: {formatCurrency(p.sellingPrice)}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-mono">
                    {p.totalStock} {p.unit} left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Branch Sales Invoices */}
        <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                Branch Sales Activity
              </h3>
              <p className="text-xs text-muted-foreground">Latest invoices rung at this branch</p>
            </div>
            <Link
              href="/app/sales"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              All Sales
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            {branchSales.slice(0, 4).map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-muted/20 border border-border/60"
              >
                <div>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {sale.invoiceNumber}
                  </span>
                  <span className="text-foreground ml-2 font-medium">
                    {sale.customerName || "Walk-in"}
                  </span>
                  <span className="text-[10px] text-muted-foreground block">
                    Cashier: {sale.cashierName} • {sale.paymentMethod.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-foreground font-mono text-xs">
                    {formatCurrency(sale.grandTotal)}
                  </span>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => setActiveReceiptSale(sale)}
                    className="text-[10px]"
                  >
                    Receipt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
