import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  description?: string;
  iconBgColor?: string;
  iconTextColor?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  description,
  iconBgColor = "bg-indigo-50 dark:bg-indigo-950/50",
  iconTextColor = "text-indigo-600 dark:text-indigo-400",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</span>
        <div className={cn("p-2.5 rounded-lg", iconBgColor, iconTextColor)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{value}</span>
      </div>

      {(change || description) && (
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          {change && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-medium px-1.5 py-0.5 rounded",
                isPositive
                  ? "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-300"
              )}
            >
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {change}
            </span>
          )}
          {description && <span className="text-muted-foreground">{description}</span>}
        </div>
      )}
    </div>
  );
}
