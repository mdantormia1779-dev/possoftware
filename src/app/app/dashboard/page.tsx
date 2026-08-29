"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  CreditCard,
  AlertTriangle,
  Package,
  ArrowUpRight,
  Boxes,
  Building2,
  Receipt,
  Download,
  Calendar,
  Sparkles,
  Layers,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const HOURLY_SALES_DATA = [
  { time: "10 AM", sales: 12500, orders: 4 },
  { time: "12 PM", sales: 28400, orders: 9 },
  { time: "02 PM", sales: 19800, orders: 6 },
  { time: "04 PM", sales: 34200, orders: 11 },
  { time: "06 PM", sales: 48900, orders: 15 },
  { time: "08 PM", sales: 38600, orders: 12 },
  { time: "10 PM", sales: 18200, orders: 5 },
];

const PAYMENT_DISTRIBUTION = [
  { name: "bKash / Mobile", value: 68400, color: "#e11d48" },
  { name: "Cash in Till", value: 45200, color: "#10b981" },
  { name: "Card (POS)", value: 24800, color: "#3b82f6" },
  { name: "Customer Due", value: 14500, color: "#f59e0b" },
];

const BRANCH_SALES_DATA = [
  { branch: "Banani Flagship", sales: 84500, target: 75000 },
  { branch: "Dhanmondi", sales: 46200, target: 40000 },
  { branch: "Chittagong GEC", sales: 32800, target: 35000 },
];

export default function DashboardPage() {
  const { currentOrg, currentBranch, branches, setActiveReceiptSale } = useTenant();
  const sales = storageService.getSales();
  const products = storageService.getProducts();
  const customers = storageService.getCustomers();

  const [dateRange, setDateRange] = useState("Today, " + formatDate(new Date()));

  // Calculate live KPI metrics
  const todaySalesTotal = sales.reduce((sum, s) => sum + s.grandTotal, 0);
  const totalDueOutstanding = customers.reduce((sum, c) => sum + c.dueBalance, 0);
  const totalStockValuation = products.reduce((sum, p) => sum + p.totalStock * p.purchasePrice, 0);
  const lowStockProducts = products.filter((p) => p.totalStock <= p.minStockAlert);
  const grossProfitEstimate = todaySalesTotal * 0.42; // ~42% margin

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>Business Executive Overview</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800">
              {currentBranch.name}
            </span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time multi-branch metrics • All currencies in BDT (৳)
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{dateRange}</span>
          </div>

          <Link
            href="/app/pos"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-transform active:scale-95"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Open POS</span>
          </Link>
        </div>
      </div>

      {/* 8 Instant Executive KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Sales"
          value={formatCurrency(todaySalesTotal)}
          change="+18.4%"
          isPositive={true}
          icon={DollarSign}
          description="vs yesterday"
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/50"
          iconTextColor="text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="Est. Gross Profit"
          value={formatCurrency(grossProfitEstimate)}
          change="+14.2%"
          isPositive={true}
          icon={TrendingUp}
          description="42% margin"
          iconBgColor="bg-indigo-50 dark:bg-indigo-950/50"
          iconTextColor="text-indigo-600 dark:text-indigo-400"
        />

        <StatCard
          title="Total In-Stock Value"
          value={formatCurrency(totalStockValuation)}
          icon={Package}
          description={`${products.length} SKUs across outlets`}
          iconBgColor="bg-blue-50 dark:bg-blue-950/50"
          iconTextColor="text-blue-600 dark:text-blue-400"
        />

        <StatCard
          title="Customer Due Balance"
          value={formatCurrency(totalDueOutstanding)}
          change="3 Overdue"
          isPositive={false}
          icon={CreditCard}
          description="Requires collection"
          iconBgColor="bg-rose-50 dark:bg-rose-950/50"
          iconTextColor="text-rose-600 dark:text-rose-400"
        />
      </div>

      {/* Charts Section: Sales Hourly Trend & Payment Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-foreground">Today&apos;s Sales Hourly Velocity</h3>
              <p className="text-xs text-muted-foreground">Hourly revenue trajectory across all active branches</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> Peak at 06:00 PM
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_SALES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#888888" />
                <YAxis tick={{ fontSize: 11 }} stroke="#888888" tickFormatter={(val) => `৳${val / 1000}k`} />
                <Tooltip
                  formatter={(value: any) => [formatCurrency(Number(value)), "Sales"]}
                  contentStyle={{ borderRadius: "8px", fontSize: "12px", background: "var(--card)", borderColor: "var(--border)" }}
                />
                <Area type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Payment Method */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-foreground">Revenue by Payment Method</h3>
            <p className="text-xs text-muted-foreground">bKash, Cash, Card and Customer Due split</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PAYMENT_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {PAYMENT_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {PAYMENT_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-bold text-foreground">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Multi-Branch Sales & Low Stock Alert Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales by Branch (1 Col) */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs">
          <div>
            <h3 className="font-bold text-base text-foreground">Sales by Branch</h3>
            <p className="text-xs text-muted-foreground">Today&apos;s performance vs target</p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BRANCH_SALES_DATA} layout="vertical" margin={{ left: 10, right: 10, top: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="branch" tick={{ fontSize: 11 }} width={90} stroke="#888888" />
                <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                <Bar dataKey="sales" fill="#6366f1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products & Low Stock Alerts (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-foreground">Inventory Alerts & Top Movers</h3>
              <p className="text-xs text-muted-foreground">Urgent reorders and fastest selling items</p>
            </div>
            <Link href="/app/inventory" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              View All Stock
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Low Stock Alert Box */}
            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>Low Stock Threshold Alert ({lowStockProducts.length} Items)</span>
              </div>
              <div className="space-y-1.5 text-xs">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded-lg bg-card border border-border">
                    <div className="truncate pr-2">
                      <span className="font-medium text-foreground">{p.name}</span>
                      <span className="text-[10px] text-muted-foreground block">SKU: {p.sku}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 shrink-0">
                      {p.totalStock} {p.unit} left
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2 flex flex-col justify-between">
              <div className="text-xs font-bold text-foreground">Quick Management Shortcuts</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/app/pos"
                  className="p-2.5 rounded-lg bg-card border border-border hover:border-indigo-400 font-semibold text-center text-foreground transition-all shadow-2xs"
                >
                  🛒 New POS Sale
                </Link>
                <Link
                  href="/app/inventory/transfers"
                  className="p-2.5 rounded-lg bg-card border border-border hover:border-indigo-400 font-semibold text-center text-foreground transition-all shadow-2xs"
                >
                  🚚 Transfer Stock
                </Link>
                <Link
                  href="/app/accounting/journal"
                  className="p-2.5 rounded-lg bg-card border border-border hover:border-indigo-400 font-semibold text-center text-foreground transition-all shadow-2xs"
                >
                  📖 View Journals
                </Link>
                <Link
                  href="/app/payroll"
                  className="p-2.5 rounded-lg bg-card border border-border hover:border-indigo-400 font-semibold text-center text-foreground transition-all shadow-2xs"
                >
                  💳 Monthly Payroll
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-foreground">Recent POS Transactions</h3>
            <p className="text-xs text-muted-foreground">Latest invoices generated across all terminal counters</p>
          </div>
          <Link href="/app/sales" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            View All Sales
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="p-3 font-semibold text-foreground">Invoice No</th>
                <th className="p-3 font-semibold text-foreground">Customer</th>
                <th className="p-3 font-semibold text-foreground">Branch</th>
                <th className="p-3 font-semibold text-foreground">Cashier</th>
                <th className="p-3 font-semibold text-foreground">Total</th>
                <th className="p-3 font-semibold text-foreground">Method</th>
                <th className="p-3 font-semibold text-foreground">Status</th>
                <th className="p-3 text-right font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sales.slice(0, 5).map((sale) => (
                <tr key={sale.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                    {sale.invoiceNumber}
                  </td>
                  <td className="p-3">
                    <span className="font-medium text-foreground">{sale.customerName || "Walk-in Customer"}</span>
                    {sale.customerPhone && <span className="text-[10px] text-muted-foreground block">{sale.customerPhone}</span>}
                  </td>
                  <td className="p-3 text-muted-foreground">{sale.branchName}</td>
                  <td className="p-3 text-muted-foreground">{sale.cashierName}</td>
                  <td className="p-3 font-bold text-foreground">{formatCurrency(sale.grandTotal)}</td>
                  <td className="p-3 uppercase font-medium text-[10px] text-muted-foreground">{sale.paymentMethod}</td>
                  <td className="p-3">
                    <StatusBadge status={sale.status} />
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setActiveReceiptSale(sale)}
                      className="px-2.5 py-1 rounded bg-muted hover:bg-muted/80 text-[11px] font-semibold text-foreground border border-border"
                    >
                      Receipt
                    </button>
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
