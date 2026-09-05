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
  iconBgColor = "bg-[#EEF2FF] dark:bg-indigo-950/40",
  iconTextColor = "text-[#4F46E5] dark:text-[#818CF8]",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[12px] border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-5 sm:p-6 shadow-subtle-xs transition-all duration-150 hover:border-[#CBD5E1] dark:hover:border-[#334155] hover:shadow-subtle-sm",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#475569] dark:text-[#94A3B8] truncate">
          {title}
        </span>
        <div
          className={cn(
            "p-2 rounded-lg border border-transparent shrink-0 transition-colors",
            iconBgColor,
            iconTextColor
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] font-mono leading-none">
          {value}
        </span>
      </div>

      {(change || description) && (
        <div className="mt-3 flex items-center flex-wrap gap-2 text-xs">
          {change && (
            <span
              className={cn(
                "inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md text-[11px]",
                isPositive
                  ? "text-[#047857] bg-[#ECFDF5] dark:bg-emerald-950/40 dark:text-[#34D399] border border-emerald-200/80 dark:border-emerald-800/60"
                  : "text-[#B91C1C] bg-[#FEF2F2] dark:bg-rose-950/40 dark:text-[#F87171] border border-rose-200/80 dark:border-rose-800/60"
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
            <span className="text-[#475569] dark:text-[#94A3B8] text-[12px] truncate">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
