import React from "react";
import { TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { HOURLY_SALES_DATA } from "./dashboardData";

export function OwnerSalesVelocityChart() {
  return (
    <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 space-y-4 shadow-subtle-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Enterprise Sales Velocity
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Hourly gross revenue trajectory across all active branches
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
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
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <YAxis
              tick={{ fontSize: 11 }}
              stroke="#94a3b8"
              tickFormatter={(val) => `৳${val / 1000}k`}
            />
            <Tooltip
              formatter={(value: any) => [formatCurrency(Number(value)), "Sales"]}
              contentStyle={{
                borderRadius: "8px",
                fontSize: "12px",
                background: "var(--card)",
                borderColor: "var(--border)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#salesGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
