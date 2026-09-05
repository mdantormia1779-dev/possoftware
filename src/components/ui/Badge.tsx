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
    | "info"
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
    default:
      "bg-[#0F172A] text-white dark:bg-[#F8FAFC] dark:text-[#0F172A]",
    secondary:
      "bg-[#F1F5F9] dark:bg-[#1E293B] text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#334155]",
    neutral:
      "bg-[#F8FAFC] dark:bg-[#1E293B]/70 text-[#475569] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#334155]",
    success:
      "bg-[#ECFDF5] text-[#047857] dark:bg-emerald-950/40 dark:text-[#34D399] border border-emerald-200/80 dark:border-emerald-800/60",
    warning:
      "bg-[#FFFBEB] text-[#B45309] dark:bg-amber-950/40 dark:text-[#FBBF24] border border-amber-200/80 dark:border-amber-800/60",
    destructive:
      "bg-[#FEF2F2] text-[#B91C1C] dark:bg-rose-950/40 dark:text-[#F87171] border border-rose-200/80 dark:border-rose-800/60",
    outline:
      "border border-[#E2E8F0] dark:border-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] bg-white/70 dark:bg-[#111827]/70 backdrop-blur-xs",
    indigo:
      "bg-[#EEF2FF] text-[#4F46E5] dark:bg-indigo-950/40 dark:text-[#818CF8] border border-indigo-200/80 dark:border-indigo-800/60",
    blue:
      "bg-[#EFF6FF] text-[#1D4ED8] dark:bg-blue-950/40 dark:text-[#60A5FA] border border-blue-200/80 dark:border-blue-800/60",
    info:
      "bg-[#F0F9FF] text-[#0369A1] dark:bg-sky-950/40 dark:text-[#38BDF8] border border-sky-200/80 dark:border-sky-800/60",
  };

  const dotColors = {
    default: "bg-white dark:bg-[#0F172A]",
    secondary: "bg-[#64748B]",
    neutral: "bg-[#94A3B8]",
    success: "bg-[#10B981]",
    warning: "bg-[#F59E0B]",
    destructive: "bg-[#EF4444]",
    outline: "bg-[#64748B]",
    indigo: "bg-[#4F46E5] dark:bg-[#818CF8]",
    blue: "bg-[#2563EB]",
    info: "bg-[#0EA5E9]",
  };

  const sizeStyles = {
    xs: "px-1.5 py-0.2 text-[10px] font-semibold rounded-md gap-1",
    sm: "px-2 py-0.5 text-xs font-semibold rounded-md gap-1.5",
    md: "px-2.5 py-0.5 text-xs font-semibold rounded-md gap-1.5",
    lg: "px-3 py-1 text-sm font-semibold rounded-md gap-2",
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
            "h-1.5 w-1.5 rounded-full shrink-0",
            dotColors[variant]
          )}
        />
      )}
      {children}
    </span>
  );
}

export { StatusBadge } from "./StatusBadge";
