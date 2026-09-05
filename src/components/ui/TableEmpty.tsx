import React from "react";

export interface TableEmptyProps {
  colSpan: number;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function TableEmpty({
  colSpan,
  title = "No data found",
  description = "There are no records matching your current filter.",
  action,
}: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-16 text-center text-[#475569] dark:text-[#94A3B8]">
        <div className="max-w-xs mx-auto space-y-2">
          <p className="font-semibold text-sm text-[#0F172A] dark:text-[#F8FAFC]">{title}</p>
          <p className="text-xs text-[#94A3B8] leading-relaxed">{description}</p>
          {action && <div className="pt-2">{action}</div>}
        </div>
      </td>
    </tr>
  );
}
