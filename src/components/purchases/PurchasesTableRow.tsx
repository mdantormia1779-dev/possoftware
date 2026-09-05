import React from "react";
import { PurchaseOrder } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface PurchasesTableRowProps {
  purchase: PurchaseOrder;
  onSelectDetails: (po: PurchaseOrder) => void;
}

export function PurchasesTableRow({
  purchase: po,
  onSelectDetails,
}: PurchasesTableRowProps) {
  return (
    <tr className="hover:bg-muted/30 transition-colors h-[52px]">
      <td className="px-4 py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
        {po.poNumber}
      </td>
      <td className="px-4 py-3 font-semibold text-foreground">{po.supplierName}</td>
      <td className="px-4 py-3 text-muted-foreground font-mono text-[11px]">
        {formatDate(po.createdAt)}
      </td>
      <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate font-medium">
        {po.items.map((i) => `${i.productName} (${i.quantity})`).join(", ")}
      </td>
      <td className="px-4 py-3 font-bold font-mono text-foreground">
        {formatCurrency(po.totalAmount)}
      </td>
      <td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
        {formatCurrency(po.paidAmount)}
      </td>
      <td className="px-4 py-3 font-mono">
        {po.dueAmount > 0 ? (
          <span className="text-rose-600 dark:text-rose-400 font-bold">
            {formatCurrency(po.dueAmount)}
          </span>
        ) : (
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Settled</span>
        )}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={po.status} />
      </td>
      <td className="px-4 py-3 text-right">
        <Button
          size="xs"
          variant="outline"
          onClick={() => onSelectDetails(po)}
          className="text-[11px] font-bold"
        >
          Details / GRN
        </Button>
      </td>
    </tr>
  );
}
