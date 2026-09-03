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
          <label className="block text-xs font-semibold text-foreground tracking-tight">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {Icon && (
            <Icon className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <input
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full h-10 px-3.5 text-xs sm:text-sm rounded-xl border border-border/80 bg-card text-foreground transition-all duration-150 placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-subtle-xs",
              Icon && "pl-10",
              (RightIcon || rightElement) && "pr-10",
              error &&
                "border-rose-500 focus:ring-rose-500/50 focus:border-rose-500",
              className
            )}
            {...props}
          />
          {RightIcon && (
            <RightIcon className="absolute right-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          {rightElement && !RightIcon && (
            <div className="absolute right-2.5 flex items-center">{rightElement}</div>
          )}
        </div>
        {error && (
          <p className="text-[11px] font-medium text-rose-600 dark:text-rose-400">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-[11px] text-muted-foreground">{hint}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
