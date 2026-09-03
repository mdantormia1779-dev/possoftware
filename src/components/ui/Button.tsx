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
        "bg-foreground text-background hover:bg-foreground/90 shadow-subtle-xs active:scale-[0.98]",
      primary:
        "bg-[#4F46E5] text-white hover:bg-[#4338CA] dark:bg-[#6366F1] dark:hover:bg-[#818CF8] shadow-sm shadow-indigo-500/20 active:scale-[0.98]",
      secondary:
        "bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-200 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 border border-[#E2E8F0] dark:border-[#334155] shadow-2xs active:scale-[0.98]",
      outline:
        "border border-border bg-card hover:bg-muted/60 text-foreground shadow-subtle-xs active:scale-[0.98]",
      ghost:
        "hover:bg-muted text-muted-foreground hover:text-foreground active:scale-[0.98]",
      destructive:
        "bg-[#DC2626] text-white hover:bg-[#B91C1C] dark:bg-[#EF4444] dark:hover:bg-[#DC2626] shadow-sm shadow-red-500/20 active:scale-[0.98]",
      success:
        "bg-[#16A34A] text-white hover:bg-[#15803D] dark:bg-[#22C55E] dark:hover:bg-[#16A34A] shadow-sm shadow-emerald-500/20 active:scale-[0.98]",
      subtle:
        "bg-muted text-foreground hover:bg-muted/80 active:scale-[0.98]",
      "subtle-indigo":
        "bg-[#EEF2FF] dark:bg-indigo-950/50 text-[#4F46E5] dark:text-[#818CF8] hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200/60 dark:border-indigo-800/60 active:scale-[0.98]",
      "subtle-emerald":
        "bg-[#F0FDF4] dark:bg-emerald-950/50 text-[#15803D] dark:text-[#22C55E] hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200/60 dark:border-emerald-800/60 active:scale-[0.98]",
      "subtle-rose":
        "bg-[#FEF2F2] dark:bg-rose-950/50 text-[#B91C1C] dark:text-[#EF4444] hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200/60 dark:border-rose-800/60 active:scale-[0.98]",
    };

    const sizeStyles = {
      xs: "h-7 px-2.5 text-xs rounded-lg gap-1.5 font-medium",
      sm: "h-8 px-3 text-xs rounded-xl gap-1.5 font-medium",
      md: "h-9.5 px-4 text-xs sm:text-sm rounded-xl gap-2 font-medium",
      lg: "h-11 px-5 text-sm sm:text-base rounded-2xl gap-2.5 font-semibold",
      icon: "h-9 w-9 p-0 rounded-xl flex items-center justify-center",
      "icon-sm": "h-7.5 w-7.5 p-0 rounded-lg flex items-center justify-center",
      "icon-xs": "h-6 w-6 p-0 rounded-md flex items-center justify-center",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer",
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
