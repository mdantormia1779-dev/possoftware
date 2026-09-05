"use client";

import React from "react";
import { cn } from "@/lib/utils";
export { TableEmpty } from "./TableEmpty";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
}

export function Table({ className, containerClassName, children, ...props }: TableProps) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-[12px] border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111827] shadow-subtle-xs",
        containerClassName
      )}
    >
      <table className={cn("w-full caption-bottom text-xs sm:text-sm text-left border-collapse", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn(
        "bg-[#F8FAFC] dark:bg-[#0B1120]/70 border-b border-[#E2E8F0] dark:border-[#1E293B] text-[11px] font-semibold text-[#475569] dark:text-[#94A3B8] uppercase tracking-wider",
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableBody({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("divide-y divide-[#E2E8F0] dark:divide-[#1E293B] bg-white dark:bg-[#111827]", className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "h-[52px] transition-colors duration-150 hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]/40 data-[state=selected]:bg-[#EEF2FF]/60 dark:data-[state=selected]:bg-indigo-950/40",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({ className, children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "h-11 px-4 text-left align-middle font-semibold text-[#475569] dark:text-[#94A3B8] select-none text-[11px] tracking-wider uppercase",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ className, children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("px-4 py-3 align-middle text-[#0F172A] dark:text-[#F8FAFC] font-normal text-xs sm:text-sm", className)} {...props}>
      {children}
    </td>
  );
}
