import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ className, children, hoverable = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[12px] border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] text-foreground shadow-subtle-xs transition-all duration-150",
        hoverable && "hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:shadow-subtle-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-5 sm:p-6 pb-3 sm:pb-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-semibold text-base sm:text-[17px] leading-snug tracking-tight text-[#0F172A] dark:text-[#F8FAFC]", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-xs sm:text-[13px] text-[#475569] dark:text-[#94A3B8] leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5 sm:p-6 pt-1 sm:pt-1", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 sm:p-5 pt-3 border-t border-[#E2E8F0] dark:border-[#1E293B] mt-2 bg-[#F8FAFC]/60 dark:bg-[#0B1120]/40 rounded-b-[12px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
