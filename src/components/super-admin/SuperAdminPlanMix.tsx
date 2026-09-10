import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { PLAN_DISTRIBUTION } from "./superAdminData";

interface SuperAdminPlanMixProps {
  planData?: Array<{ name: string; value: number; color: string }>;
  totalTenants?: number;
}

export function SuperAdminPlanMix({ planData, totalTenants }: SuperAdminPlanMixProps) {
  const data = planData && planData.length > 0 ? planData : PLAN_DISTRIBUTION;
  const count = totalTenants ?? data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-4 shadow-subtle-sm flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
          Subscription Tier Mix
        </h3>
        <p className="text-xs text-muted-foreground">
          Distribution across {count} tenant companies
        </p>
      </div>

      <div className="h-44 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={65}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2 text-xs font-mono">
        {data.map((item, idx) => (
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
              {item.value} Orgs
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
