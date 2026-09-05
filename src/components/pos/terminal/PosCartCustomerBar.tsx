import React from "react";
import { User } from "lucide-react";
import { Customer } from "@/types";

interface PosCartCustomerBarProps {
  customer: Customer | null;
  onClearCustomer: () => void;
}

export function PosCartCustomerBar({
  customer,
  onClearCustomer,
}: PosCartCustomerBarProps) {
  return (
    <div className="px-4 py-2.5 border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC]/40 dark:bg-[#0B1120]/20 flex items-center justify-between text-xs">
      <div className="flex items-center gap-2 truncate">
        <User className="h-3.5 w-3.5 text-[#94A3B8] shrink-0" />
        {customer ? (
          <div className="truncate">
            <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              {customer.name}
            </span>
            <span className="text-[11px] text-[#94A3B8] block font-mono">
              {customer.phone}
            </span>
          </div>
        ) : (
          <span className="text-[#475569] dark:text-[#94A3B8] font-medium text-[11px]">
            Walk-in Customer (General)
          </span>
        )}
      </div>
      {customer && (
        <button
          type="button"
          onClick={onClearCustomer}
          className="text-[11px] font-medium text-[#4F46E5] dark:text-[#818CF8] hover:underline cursor-pointer"
        >
          Change
        </button>
      )}
    </div>
  );
}
