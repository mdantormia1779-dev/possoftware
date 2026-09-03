import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "secondary"
    | "success"
    | "warning"
    | "destructive"
    | "outline"
    | "indigo"
    | "blue"
    | "neutral";
  size?: "xs" | "sm" | "md" | "lg";
  withDot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  withDot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
    secondary:
      "bg-[#F1F5F9] dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-[#E2E8F0] dark:border-slate-700",
    neutral:
      "bg-[#F8FAFC] dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-[#E2E8F0] dark:border-slate-700",
    success:
      "bg-[#F0FDF4] text-[#15803D] dark:bg-emerald-950/50 dark:text-[#22C55E] border border-emerald-200/80 dark:border-emerald-800/60",
    warning:
      "bg-[#FFFBEB] text-[#B45309] dark:bg-amber-950/50 dark:text-[#F59E0B] border border-amber-200/80 dark:border-amber-800/60",
    destructive:
      "bg-[#FEF2F2] text-[#B91C1C] dark:bg-red-950/50 dark:text-[#EF4444] border border-red-200/80 dark:border-red-800/60",
    outline:
      "border border-[#E2E8F0] dark:border-slate-700 text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xs",
    indigo:
      "bg-[#EEF2FF] text-[#4F46E5] dark:bg-indigo-950/50 dark:text-[#818CF8] border border-indigo-200/80 dark:border-indigo-800/60",
    blue:
      "bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950/50 dark:text-[#3B82F6] border border-blue-200/80 dark:border-blue-800/60",
  };

  const dotColors = {
    default: "bg-white dark:bg-slate-900",
    secondary: "bg-slate-500",
    neutral: "bg-slate-400",
    success: "bg-[#16A34A] dark:bg-[#22C55E]",
    warning: "bg-[#D97706] dark:bg-[#F59E0B]",
    destructive: "bg-[#DC2626] dark:bg-[#EF4444]",
    outline: "bg-slate-600 dark:bg-slate-400",
    indigo: "bg-[#4F46E5] dark:bg-[#818CF8]",
    blue: "bg-[#2563EB] dark:bg-[#3B82F6]",
  };

  const sizeStyles = {
    xs: "px-1.5 py-0.2 text-[10px] font-semibold rounded-md gap-1",
    sm: "px-2 py-0.5 text-xs font-semibold rounded-lg gap-1.5",
    md: "px-2.5 py-0.5 text-xs font-semibold rounded-full gap-1.5",
    lg: "px-3 py-1 text-sm font-semibold rounded-full gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold transition-colors select-none tracking-tight",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {withDot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0 animate-pulse",
            dotColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
}

export function StatusBadge({
  status,
  withDot = true,
}: {
  status: string;
  withDot?: boolean;
}) {
  const normalized = status.toLowerCase().replace(/_/g, " ");

  if (
    [
      "active",
      "completed",
      "received",
      "approved",
      "paid",
      "present",
      "online",
      "in_stock",
    ].includes(status.toLowerCase())
  ) {
    return (
      <Badge variant="success" withDot={withDot} className="capitalize">
        {normalized}
      </Badge>
    );
  }
  if (
    [
      "pending",
      "ordered",
      "draft",
      "late",
      "processing",
      "trial",
      "partially_received",
      "low_stock",
      "refunded",
      "returned",
    ].includes(status.toLowerCase())
  ) {
    return (
      <Badge variant="warning" withDot={withDot} className="capitalize">
        {normalized}
      </Badge>
    );
  }
  if (
    [
      "failed",
      "absent",
      "expired",
      "past_due",
      "terminated",
      "out_of_stock",
    ].includes(status.toLowerCase())
  ) {
    return (
      <Badge variant="destructive" withDot={withDot} className="capitalize">
        {normalized}
      </Badge>
    );
  }
  if (["in_transit", "reserved", "dispatched"].includes(status.toLowerCase())) {
    return (
      <Badge variant="blue" withDot={withDot} className="capitalize">
        {normalized}
      </Badge>
    );
  }
  if (["held", "on_leave", "half_day"].includes(status.toLowerCase())) {
    return (
      <Badge variant="indigo" withDot={withDot} className="capitalize">
        {normalized}
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" withDot={withDot} className="capitalize">
      {normalized}
    </Badge>
  );
}
