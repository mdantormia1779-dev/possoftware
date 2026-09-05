"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  rightIcon?: LucideIcon;
  rightElement?: React.ReactNode;
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      icon: Icon,
      rightIcon: RightIcon,
      rightElement,
      label,
      error,
      hint,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="block text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {Icon && (
            <Icon className="absolute left-3.5 h-4 w-4 text-[#94A3B8] pointer-events-none" />
          )}
          <input
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full h-10 px-3.5 text-xs sm:text-sm rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] transition-all duration-150 placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#4F46E5] dark:focus:border-[#6366F1] disabled:opacity-50 disabled:cursor-not-allowed shadow-subtle-xs",
              Icon && "pl-10",
              (RightIcon || rightElement) && "pr-10",
              error &&
                "border-[#EF4444] focus:ring-rose-500/20 focus:border-[#EF4444]",
              className
            )}
            {...props}
          />
          {RightIcon && (
            <RightIcon className="absolute right-3.5 h-4 w-4 text-[#94A3B8] pointer-events-none" />
          )}
          {rightElement && !RightIcon && (
            <div className="absolute right-2.5 flex items-center">{rightElement}</div>
          )}
        </div>
        {error && (
          <p className="text-[11px] font-medium text-[#EF4444] dark:text-[#F87171]">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-[11px] text-[#94A3B8]">{hint}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
