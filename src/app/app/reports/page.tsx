"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  BarChart3,
  Download,
  Printer,
  Calendar,
  Building2,
  TrendingUp,
  Boxes,
  Users,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const MONTHLY_SALES_REPORT = [
  { month: "Sep", sales: 1240000, profit: 520000 },
  { month: "Oct", sales: 1450000, profit: 610000 },
  { month: "Nov", sales: 1620000, profit: 680000 },
  { month: "Dec", sales: 1980000, profit: 830000 },
  { month: "Jan", sales: 1540000, profit: 645000 },
  { month: "Feb", sales: 1845000, profit: 775000 },
];

export default function ReportsCenterPage() {
  const { currentOrg, branches } = useTenant();
  const [selectedReportType, setSelectedReportType] = useState("sales");
  const [selectedBranch, setSelectedBranch] = useState("all");

  const sales = storageService.getSales();
  const products = storageService.getProducts();
  const employees = storageService.getEmployees();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Executive Business Reports Center</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Exportable analytics for Sales, Gross Margin, Inventory Turnover, and Staff Productivity
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-1.5" /> Print Report
          </Button>
          <Button variant="primary" size="sm">
            <Download className="h-4 w-4 mr-1.5" /> Export PDF / CSV
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="font-semibold text-foreground block mb-1">Report Category</label>
          <select
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background"
          >
            <option value="sales">Sales & Revenue Velocity</option>
            <option value="inventory">Inventory & Stock Movement</option>
            <option value="hr">Staff Performance & Payroll</option>
            <option value="branches">Branch Comparative Growth</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-foreground block mb-1">Outlet Filter</label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full h-9 px-3 rounded-lg border border-border bg-background"
          >
            <option value="all">All Outlets Consolidated</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold text-foreground block mb-1">Time Horizon</label>
          <select className="w-full h-9 px-3 rounded-lg border border-border bg-background">
            <option>Last 6 Months (Sep 2025 - Feb 2026)</option>
            <option>Current Quarter (Q1 2026)</option>
            <option>Fiscal Year 2025-2026</option>
          </select>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-6 rounded-3xl border border-border bg-card shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground">Monthly Sales & Gross Profit Trend</h3>
            <p className="text-xs text-muted-foreground">Historical 6-month revenue progression across all retail counters</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1 text-indigo-600">
              <span className="h-3 w-3 rounded-sm bg-indigo-600 inline-block" /> Sales (৳)
            </span>
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="h-3 w-3 rounded-sm bg-emerald-600 inline-block" /> Gross Margin (৳)
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_SALES_REPORT} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#888888" />
              <YAxis tick={{ fontSize: 11 }} stroke="#888888" tickFormatter={(val) => `৳${val / 100000}L`} />
              <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
              <Bar dataKey="sales" fill="#6366f1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="profit" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Data Summary Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-border bg-muted/20">
          <h3 className="text-sm font-bold text-foreground">Monthly Performance Ledger</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="p-3.5 font-semibold text-foreground">Month</th>
                <th className="p-3.5 font-semibold text-foreground">Gross Sales (৳)</th>
                <th className="p-3.5 font-semibold text-foreground">Gross Profit (৳)</th>
                <th className="p-3.5 font-semibold text-foreground">Margin %</th>
                <th className="p-3.5 font-semibold text-foreground">Invoices Processed</th>
                <th className="p-3.5 text-right font-semibold text-foreground">Growth YoY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-mono">
              {MONTHLY_SALES_REPORT.map((row, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3.5 font-sans font-bold text-foreground">{row.month} 2025/26</td>
                  <td className="p-3.5 font-bold text-foreground">{formatCurrency(row.sales)}</td>
                  <td className="p-3.5 text-emerald-600 font-semibold">{formatCurrency(row.profit)}</td>
                  <td className="p-3.5 font-sans font-semibold text-muted-foreground">
                    {((row.profit / row.sales) * 100).toFixed(1)}%
                  </td>
                  <td className="p-3.5 font-sans text-muted-foreground">{Math.round(row.sales / 3200)} bills</td>
                  <td className="p-3.5 text-right font-sans text-emerald-600 font-bold">+18.2%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
