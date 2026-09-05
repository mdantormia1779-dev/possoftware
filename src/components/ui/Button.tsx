import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "success"
    | "subtle"
    | "subtle-indigo"
    | "subtle-emerald"
    | "subtle-rose";
  size?: "xs" | "sm" | "md" | "lg" | "icon" | "icon-sm" | "icon-xs";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default:
        "bg-[#0F172A] text-white hover:bg-[#1E293B] active:bg-[#0B1120] dark:bg-[#F8FAFC] dark:text-[#0F172A] dark:hover:bg-[#E2E8F0] shadow-subtle-xs active:scale-[0.98]",
      primary:
        "bg-[#4F46E5] text-white hover:bg-[#4338CA] active:bg-[#3730A3] dark:bg-[#6366F1] dark:hover:bg-[#4F46E5] dark:active:bg-[#4338CA] shadow-subtle-xs active:scale-[0.98]",
      secondary:
        "bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#1E293B] shadow-subtle-xs active:scale-[0.98]",
      outline:
        "border border-[#E2E8F0] dark:border-[#1E293B] bg-transparent hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] shadow-subtle-xs active:scale-[0.98]",
      ghost:
        "bg-transparent hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] text-[#475569] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] active:scale-[0.98]",
      destructive:
        "bg-[#EF4444] text-white hover:bg-[#DC2626] active:bg-[#B91C1C] shadow-subtle-xs active:scale-[0.98]",
      success:
        "bg-[#10B981] text-white hover:bg-[#059669] active:bg-[#047857] shadow-subtle-xs active:scale-[0.98]",
      subtle:
        "bg-[#F1F5F9] dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#E2E8F0] dark:hover:bg-[#334155] active:scale-[0.98]",
      "subtle-indigo":
        "bg-[#EEF2FF] dark:bg-indigo-950/40 text-[#4F46E5] dark:text-[#818CF8] hover:bg-[#E0E7FF] dark:hover:bg-indigo-900/50 border border-indigo-200/60 dark:border-indigo-800/60 active:scale-[0.98]",
      "subtle-emerald":
        "bg-[#ECFDF5] dark:bg-emerald-950/40 text-[#10B981] dark:text-[#34D399] hover:bg-[#D1FAE5] dark:hover:bg-emerald-900/50 border border-emerald-200/60 dark:border-emerald-800/60 active:scale-[0.98]",
      "subtle-rose":
        "bg-[#FEF2F2] dark:bg-rose-950/40 text-[#EF4444] dark:text-[#F87171] hover:bg-[#FEE2E2] dark:hover:bg-rose-900/50 border border-rose-200/60 dark:border-rose-800/60 active:scale-[0.98]",
    };

    const sizeStyles = {
      xs: "h-7 px-2.5 text-xs rounded-lg gap-1.5 font-medium",
      sm: "h-8.5 px-3 text-xs rounded-lg gap-1.5 font-medium",
      md: "h-10 px-4 text-xs sm:text-sm rounded-lg gap-2 font-medium",
      lg: "h-11 px-5 text-sm sm:text-base rounded-xl gap-2.5 font-semibold",
      icon: "h-9 w-9 p-0 rounded-lg flex items-center justify-center",
      "icon-sm": "h-7.5 w-7.5 p-0 rounded-lg flex items-center justify-center",
      "icon-xs": "h-6 w-6 p-0 rounded-md flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
