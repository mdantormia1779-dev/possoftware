"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { formatCurrency } from "@/lib/utils";
import { BarChart3, Download, Printer } from "lucide-react";
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
  const { branches } = useTenant();
  const [selectedReportType, setSelectedReportType] = useState("sales");
  const [selectedBranch, setSelectedBranch] = useState("all");

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Business Intelligence &amp; Reports Center</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Executive financial audits, stock turnover rates, and branch performance metrics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="shadow-subtle-xs"
          >
            <Printer className="h-3.5 w-3.5 mr-1.5" /> Print Report
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="shadow-sm shadow-indigo-500/25"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" /> Export PDF / CSV
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl border border-border/80 bg-card shadow-subtle-xs grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="font-bold text-foreground block mb-1">
            Report Category
          </label>
          <select
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
            className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <option value="sales">Sales &amp; Revenue Trajectory</option>
            <option value="inventory">Inventory Movement &amp; Shrinkage</option>
            <option value="hr">Staff Commissions &amp; Payroll</option>
            <option value="branches">Branch Comparative Growth</option>
          </select>
        </div>

        <div>
          <label className="font-bold text-foreground block mb-1">
            Outlet Scope
          </label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
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
          <label className="font-bold text-foreground block mb-1">
            Time Horizon
          </label>
          <select className="w-full h-9 px-3 rounded-xl border border-border/80 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
            <option>Last 6 Months (Sep 2025 - Feb 2026)</option>
            <option>Current Quarter (Q1 2026)</option>
            <option>Fiscal Year 2025-2026</option>
          </select>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-5 sm:p-6 rounded-3xl border border-border/80 bg-card shadow-subtle-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-foreground tracking-tight">
              Monthly Sales vs Gross Margin Comparison
            </h3>
            <p className="text-xs text-muted-foreground">
              Historical 6-month revenue progression across all retail counters
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold font-mono">
            <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
              <span className="h-3 w-3 rounded-md bg-indigo-600 inline-block" />{" "}
              Gross Sales (৳)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="h-3 w-3 rounded-md bg-emerald-600 inline-block" />{" "}
              Gross Margin (৳)
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={MONTHLY_SALES_REPORT}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#888888" />
              <YAxis
                tick={{ fontSize: 11 }}
                stroke="#888888"
                tickFormatter={(val) => `৳${val / 100000}L`}
              />
              <Tooltip
                formatter={(val: any) => formatCurrency(Number(val))}
                contentStyle={{
                  borderRadius: "12px",
                  fontSize: "12px",
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="sales" fill="#6366f1" radius={[8, 8, 0, 0]} />
              <Bar dataKey="profit" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Data Summary Table */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-subtle-sm">
        <div className="p-4 border-b border-border/80 bg-muted/30">
          <h3 className="text-xs sm:text-sm font-bold text-foreground">
            Monthly Performance Ledger
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/80 bg-muted/40 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                <th className="p-3.5">Month</th>
                <th className="p-3.5">Gross Sales (৳)</th>
                <th className="p-3.5">Gross Profit (৳)</th>
                <th className="p-3.5">Margin %</th>
                <th className="p-3.5">Invoices Processed</th>
                <th className="p-3.5 text-right">Growth YoY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-mono bg-card">
              {MONTHLY_SALES_REPORT.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="p-3.5 font-sans font-bold text-foreground">
                    {row.month} 2025/26
                  </td>
                  <td className="p-3.5 font-bold text-foreground">
                    {formatCurrency(row.sales)}
                  </td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(row.profit)}
                  </td>
                  <td className="p-3.5 text-muted-foreground">
                    {((row.profit / row.sales) * 100).toFixed(1)}%
                  </td>
                  <td className="p-3.5 text-muted-foreground">
                    {Math.floor(row.sales / 3200)} orders
                  </td>
                  <td className="p-3.5 text-right text-emerald-600 dark:text-emerald-400 font-bold">
                    +{14 + idx * 2.3}%
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
