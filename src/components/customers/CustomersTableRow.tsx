import React from "react";
import { Gift } from "lucide-react";
import { Customer } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface CustomersTableRowProps {
  cust: Customer;
  onSelectDetail: (cust: Customer) => void;
}

export function CustomersTableRow({
  cust,
  onSelectDetail,
}: CustomersTableRowProps) {
  return (
    <tr className="hover:bg-muted/30 transition-colors h-[52px]">
      <td className="px-4 py-3">
        <span className="font-semibold text-foreground">{cust.name}</span>
        {cust.email && (
          <span className="text-[10px] text-muted-foreground block font-mono">
            {cust.email}
          </span>
        )}
      </td>
      <td className="px-4 py-3 font-mono text-muted-foreground font-medium">
        {cust.phone}
      </td>
      <td className="px-4 py-3 text-muted-foreground max-w-[160px] truncate">
        {cust.address || "-"}
      </td>
      <td className="px-4 py-3">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold font-mono bg-primary/10 text-primary border border-primary/20">
          <Gift className="h-3 w-3" /> {cust.loyaltyPoints} Pts
        </span>
      </td>
      <td className="px-4 py-3 text-muted-foreground font-mono font-medium">
        {cust.ordersCount} bills
      </td>
      <td className="px-4 py-3 font-bold text-foreground font-mono">
        {formatCurrency(cust.totalSpent)}
      </td>
      <td className="px-4 py-3 font-mono">
        {cust.dueBalance > 0 ? (
          <span className="text-rose-600 dark:text-rose-400 font-bold">
            {formatCurrency(cust.dueBalance)}
          </span>
        ) : (
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            Clear (৳0)
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-right">
        <Button
          size="xs"
          variant="outline"
          onClick={() => onSelectDetail(cust)}
          className="text-[11px]"
        >
          360 Profile
        </Button>
      </td>
    </tr>
  );
}
