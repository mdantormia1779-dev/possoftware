import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline" | "indigo" | "purple";
  size?: "sm" | "md" | "lg";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
    destructive: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800",
    outline: "border border-border text-foreground bg-transparent",
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-medium rounded",
    md: "px-2.5 py-0.5 text-xs font-medium rounded-full",
    lg: "px-3 py-1 text-sm font-medium rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium transition-colors select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLowerCase().replace(/_/g, " ");

  if (["active", "completed", "received", "approved", "paid", "present", "online"].includes(status.toLowerCase())) {
    return <Badge variant="success">{normalized}</Badge>;
  }
  if (["pending", "ordered", "in_transit", "draft", "late", "processing", "trial", "partially_received"].includes(status.toLowerCase())) {
    return <Badge variant="warning">{normalized}</Badge>;
  }
  if (["cancelled", "failed", "absent", "expired", "past_due", "terminated", "offline"].includes(status.toLowerCase())) {
    return <Badge variant="destructive">{normalized}</Badge>;
  }
  if (["held", "on_leave", "half_day"].includes(status.toLowerCase())) {
    return <Badge variant="purple">{normalized}</Badge>;
  }

  return <Badge variant="secondary">{normalized}</Badge>;
}
