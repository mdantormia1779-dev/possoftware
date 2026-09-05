import React from "react";
import { formatCurrency } from "@/lib/utils";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { MonthlySalesRecord } from "./reportsData";

interface ReportsSalesChartProps {
  data: MonthlySalesRecord[];
}

export function ReportsSalesChart({ data }: ReportsSalesChartProps) {
  return (
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
            data={data}
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
  );
}
