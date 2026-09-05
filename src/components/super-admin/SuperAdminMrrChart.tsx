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
import { MRR_GROWTH_DATA } from "./superAdminData";

export function SuperAdminMrrChart() {
  return (
    <div className="lg:col-span-2 rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            MRR Trajectory (Bangladeshi Taka)
          </h3>
          <p className="text-xs text-muted-foreground">
            Monthly subscription revenue from 312 SMBs
          </p>
        </div>
        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1 font-mono">
          <TrendingUp className="h-4 w-4" /> ৳1.42M / Month
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={MRR_GROWTH_DATA}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="mrr"
              stroke="#9333ea"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#mrrGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
