import React from "react";
import { User, Calendar } from "lucide-react";
import { Customer } from "@/types";

interface PosCartCustomerBarProps {
  customer: Customer | null;
  onClearCustomer: () => void;
}

export function PosCartCustomerBar({ customer, onClearCustomer }: PosCartCustomerBarProps) {
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="px-4 py-2.5 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 flex items-center justify-between text-xs">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold shrink-0 text-xs">
          {customer ? customer.name.charAt(0).toUpperCase() : <User className="h-4 w-4 text-slate-400" />}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-800 dark:text-slate-100 truncate">
              {customer ? customer.name : "Walk-in Guest"}
            </span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
              {customer ? "Member" : "General"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
            <Calendar className="h-2.5 w-2.5" />
            <span className="truncate">{todayFormatted}</span>
          </div>
        </div>
      </div>

      {customer ? (
        <button
          type="button"
          onClick={onClearCustomer}
          className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 px-2 py-1 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
        >
          Change
        </button>
      ) : (
        <span className="text-[10px] text-slate-400 font-mono">Counter Sale</span>
      )}
    </div>
  );
}
