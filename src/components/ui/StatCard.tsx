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
  iconBgColor = "bg-indigo-50 dark:bg-indigo-950/60",
  iconTextColor = "text-indigo-600 dark:text-indigo-400",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-subtle-sm transition-all duration-200 hover:shadow-subtle-md hover:border-indigo-300/60 dark:hover:border-indigo-800/60",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">
          {title}
        </span>
        <div
          className={cn(
            "p-2 rounded-xl border border-border/40 shrink-0 transition-transform duration-200 group-hover:scale-105",
            iconBgColor,
            iconTextColor
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="text-xl sm:text-2xl font-black tracking-tight text-foreground font-mono">
          {value}
        </span>
      </div>

      {(change || description) && (
        <div className="mt-2.5 flex items-center flex-wrap gap-1.5 text-xs">
          {change && (
            <span
              className={cn(
                "inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full text-[11px]",
                isPositive
                  ? "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60"
                  : "text-rose-700 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60"
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {change}
            </span>
          )}
          {description && (
            <span className="text-muted-foreground text-[11px] truncate">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
