import React from "react";
import { formatCurrency } from "@/lib/utils";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { PAYMENT_DISTRIBUTION } from "./dashboardData";

export function OwnerPaymentBreakdown() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-subtle-xs flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
          Payment Method Breakdown
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
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
            <Tooltip
              formatter={(value: any) => formatCurrency(Number(value))}
              contentStyle={{
                borderRadius: "8px",
                fontSize: "12px",
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2 text-xs font-mono">
        {PAYMENT_DISTRIBUTION.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground font-sans text-xs">
                {item.name}
              </span>
            </div>
            <span className="font-semibold text-foreground">
              {formatCurrency(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
