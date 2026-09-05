import React from "react";
import { formatCurrency } from "@/lib/utils";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface BranchSalesItem {
  branch: string;
  sales: number;
  target: number;
}

interface OwnerBranchSalesChartProps {
  data: BranchSalesItem[];
}

export function OwnerBranchSalesChart({ data }: OwnerBranchSalesChartProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4 shadow-subtle-xs">
      <div>
        <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
          Sales by Outlet
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Performance vs target across branches
        </p>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 10, right: 10, top: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="branch"
              tick={{ fontSize: 11 }}
              width={95}
              stroke="#94a3b8"
            />
            <Tooltip
              formatter={(val: any) => formatCurrency(Number(val))}
              contentStyle={{
                borderRadius: "8px",
                fontSize: "12px",
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            />
            <Bar dataKey="sales" fill="#4f46e5" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
