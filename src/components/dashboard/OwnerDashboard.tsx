"use client";

import React from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  CreditCard,
  AlertTriangle,
  Package,
  ChevronRight,
  TrendingDown,
  Building2,
  Receipt,
  Truck,
  BookOpen,
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
  { name: "bKash / Mobile", value: 68400, color: "#4F46E5" },
  { name: "Cash in Till", value: 45200, color: "#16A34A" },
  { name: "Card (POS)", value: 24800, color: "#2563EB" },
  { name: "Customer Due", value: 14500, color: "#D97706" },
];

const BRANCH_SALES_DATA = [
  { branch: "Banani Flagship", sales: 84500, target: 75000 },
  { branch: "Dhanmondi", sales: 46200, target: 40000 },
  { branch: "Chittagong GEC", sales: 32800, target: 35000 },
];

export function OwnerDashboard() {
  const { currentOrg, currentBranch, setActiveReceiptSale } = useTenant();
  const sales = storageService.getSales();
  const products = storageService.getProducts();
  const customers = storageService.getCustomers();

  // Calculate live executive metrics
  const todaySalesTotal = sales.reduce((sum, s) => sum + s.grandTotal, 0);
  const totalDueOutstanding = customers.reduce((sum, c) => sum + c.dueBalance, 0);
  const totalStockValuation = products.reduce((sum, p) => sum + p.totalStock * p.purchasePrice, 0);
  const lowStockProducts = products.filter((p) => p.totalStock <= p.minStockAlert);
  const grossProfitEstimate = todaySalesTotal * 0.42; // ~42% margin

  // Dynamic branch sales
  const branches = storageService.getBranches().filter((b) => !b.organizationId || b.organizationId === currentOrg.id);
  const branchSalesData =
    branches.length > 0
      ? branches.map((b) => {
          const bSales = sales.filter((s) => s.branchId === b.id || s.branchName === b.name);
          const total = bSales.reduce((sum, s) => sum + s.grandTotal, 0);
          return {
            branch: b.name.replace(" Flagship", ""),
            sales: total || (b.isMainBranch ? 84500 : 42000),
            target: 75000,
          };
        })
      : BRANCH_SALES_DATA;

  return (
    <div className="space-y-6">
      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Today's Total Sales"
          value={formatCurrency(todaySalesTotal)}
          change="+18.4%"
          isPositive={true}
          icon={DollarSign}
          description="vs yesterday"
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          iconTextColor="text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="Est. Gross Profit"
          value={formatCurrency(grossProfitEstimate)}
          change="+14.2%"
          isPositive={true}
          icon={TrendingUp}
          description="42% blended margin"
          iconBgColor="bg-indigo-50 dark:bg-indigo-950/60"
          iconTextColor="text-indigo-600 dark:text-indigo-400"
        />

        <StatCard
          title="Inventory Valuation"
          value={formatCurrency(totalStockValuation)}
          icon={Package}
          description={`${products.length} SKUs across branches`}
          iconBgColor="bg-blue-50 dark:bg-blue-950/60"
          iconTextColor="text-blue-600 dark:text-blue-400"
        />

        <StatCard
          title="Customer Due Balance"
          value={formatCurrency(totalDueOutstanding)}
          change="3 Overdue"
          isPositive={false}
          icon={CreditCard}
          description="Pending recovery"
          iconBgColor="bg-rose-50 dark:bg-rose-950/60"
          iconTextColor="text-rose-600 dark:text-rose-400"
        />
      </div>

      {/* Charts Section: Sales Hourly Trend & Payment Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Sales Trend (2 Cols) */}
        <div className="lg:col-span-2 rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                Enterprise Sales Velocity
              </h3>
              <p className="text-xs text-muted-foreground">
                Hourly gross revenue trajectory across all active branches
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> Peak at 06:00 PM
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={HOURLY_SALES_DATA}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#888888" />
                <YAxis
                  tick={{ fontSize: 11 }}
                  stroke="#888888"
                  tickFormatter={(val) => `৳${val / 1000}k`}
                />
                <Tooltip
                  formatter={(value: any) => [formatCurrency(Number(value)), "Sales"]}
                  contentStyle={{
                    borderRadius: "12px",
                    fontSize: "12px",
                    background: "var(--card)",
                    borderColor: "var(--border)",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#salesGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Payment Method */}
        <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
              Payment Method Breakdown
            </h3>
            <p className="text-xs text-muted-foreground">
              bKash, Cash, Card, and Due distribution
            </p>
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

          <div className="space-y-2 text-xs font-mono">
            {PAYMENT_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground font-sans text-xs">
                    {item.name}
                  </span>
                </div>
                <span className="font-bold text-foreground">
                  {formatCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Multi-Branch Sales & Low Stock Alert Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Sales by Branch (1 Col) */}
        <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
              Sales by Outlet
            </h3>
            <p className="text-xs text-muted-foreground">
              Performance vs target across branches
            </p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={branchSalesData}
                layout="vertical"
                margin={{ left: 10, right: 10, top: 0, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="branch"
                  tick={{ fontSize: 11 }}
                  width={95}
                  stroke="#888888"
                />
                <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                <Bar dataKey="sales" fill="#6366f1" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts & Quick Actions (2 Cols) */}
        <div className="lg:col-span-2 rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                Critical Inventory &amp; Shortcuts
              </h3>
              <p className="text-xs text-muted-foreground">
                Urgent restock requirements &amp; executive shortcuts
              </p>
            </div>
            <Link
              href="/app/inventory"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
            >
              View Stock <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Low Stock Alert Box */}
            <div className="p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-2.5 shadow-subtle-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>Low Stock Threshold Alert ({lowStockProducts.length} SKUs)</span>
              </div>
              <div className="space-y-1.5 text-xs">
                {lowStockProducts.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-card border border-border/60 shadow-subtle-xs"
                  >
                    <div className="truncate pr-2">
                      <span className="font-bold text-foreground text-xs">{p.name}</span>
                      <span className="text-[10px] text-muted-foreground font-mono block">
                        SKU: {p.sku}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 shrink-0 font-mono">
                      {p.totalStock} {p.unit} left
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="p-4 rounded-2xl border border-border/80 bg-muted/20 space-y-2.5 flex flex-col justify-between shadow-subtle-xs">
              <div className="text-xs font-bold text-foreground">
                Executive Action Shortcuts
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/app/pos"
                  className="p-3 rounded-xl bg-card border border-border/80 hover:border-indigo-400 font-bold text-center text-foreground transition-all shadow-subtle-xs hover:shadow-subtle-md flex flex-col items-center gap-1"
                >
                  <span className="text-base">🛒</span>
                  <span>New POS Sale</span>
                </Link>
                <Link
                  href="/app/inventory/transfers"
                  className="p-3 rounded-xl bg-card border border-border/80 hover:border-indigo-400 font-bold text-center text-foreground transition-all shadow-subtle-xs hover:shadow-subtle-md flex flex-col items-center gap-1"
                >
                  <span className="text-base">🚚</span>
                  <span>Stock Transfer</span>
                </Link>
                <Link
                  href="/app/accounting/journal"
                  className="p-3 rounded-xl bg-card border border-border/80 hover:border-indigo-400 font-bold text-center text-foreground transition-all shadow-subtle-xs hover:shadow-subtle-md flex flex-col items-center gap-1"
                >
                  <span className="text-base">📖</span>
                  <span>Journals</span>
                </Link>
                <Link
                  href="/app/payroll"
                  className="p-3 rounded-xl bg-card border border-border/80 hover:border-indigo-400 font-bold text-center text-foreground transition-all shadow-subtle-xs hover:shadow-subtle-md flex flex-col items-center gap-1"
                >
                  <span className="text-base">💳</span>
                  <span>Run Payroll</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
              Recent Transactions Across Network
            </h3>
            <p className="text-xs text-muted-foreground">
              Latest invoices generated across all terminal counters
            </p>
          </div>
          <Link
            href="/app/sales"
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
          >
            View All Sales <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border/60">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="p-3.5">Invoice No</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Branch</th>
                <th className="p-3.5">Cashier</th>
                <th className="p-3.5">Total</th>
                <th className="p-3.5">Method</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 bg-card">
              {sales.slice(0, 5).map((sale) => (
                <tr key={sale.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {sale.invoiceNumber}
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-foreground">
                      {sale.customerName || "Walk-in Customer"}
                    </span>
                    {sale.customerPhone && (
                      <span className="text-[10px] text-muted-foreground block font-mono">
                        {sale.customerPhone}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-muted-foreground">{sale.branchName}</td>
                  <td className="p-3.5 text-muted-foreground">{sale.cashierName}</td>
                  <td className="p-3.5 font-black text-foreground font-mono">
                    {formatCurrency(sale.grandTotal)}
                  </td>
                  <td className="p-3.5 uppercase font-bold text-[10px] text-muted-foreground">
                    {sale.paymentMethod}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={sale.status} />
                  </td>
                  <td className="p-3.5 text-right">
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => setActiveReceiptSale(sale)}
                      className="text-[11px]"
                    >
                      Receipt
                    </Button>
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
