import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-[12px] border border-dashed border-[#E2E8F0] dark:border-[#1E293B] bg-white/50 dark:bg-[#111827]/40 my-4 select-none",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF2FF] dark:bg-indigo-950/40 text-[#4F46E5] dark:text-[#818CF8] mb-3.5 border border-indigo-200/50 dark:border-indigo-800/40 shadow-subtle-xs">
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="text-sm sm:text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
        {title}
      </h4>
      <p className="mt-1 max-w-sm text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          size="sm"
          className="mt-4"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
