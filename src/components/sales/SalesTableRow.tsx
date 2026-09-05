import React from "react";
import { Eye, Printer } from "lucide-react";
import { Sale } from "@/types";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface SalesTableRowProps {
  sale: Sale;
  onViewDetails: (sale: Sale) => void;
  onPrintReceipt: (sale: Sale) => void;
}

export function SalesTableRow({
  sale,
  onViewDetails,
  onPrintReceipt,
}: SalesTableRowProps) {
  return (
    <tr className="hover:bg-muted/30 transition-colors h-[52px]">
      <td className="px-4 py-3 font-mono font-bold text-primary">
        {sale.invoiceNumber}
      </td>
      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap font-mono text-[11px]">
        {formatDateTime(sale.createdAt)}
      </td>
      <td className="px-4 py-3">
        <span className="font-medium text-foreground">
          {sale.customerName || "Walk-in Customer"}
        </span>
        {sale.customerPhone && (
          <span className="text-[10px] text-muted-foreground block font-mono">
            {sale.customerPhone}
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-muted-foreground">{sale.branchName}</td>
      <td className="px-4 py-3 text-muted-foreground">{sale.cashierName}</td>
      <td className="px-4 py-3 text-muted-foreground font-mono">
        {sale.items.length} {sale.items.length === 1 ? "item" : "items"}
      </td>
      <td className="px-4 py-3 font-bold text-foreground font-mono">
        {formatCurrency(sale.grandTotal)}
      </td>
      <td className="px-4 py-3 uppercase font-medium text-[11px] text-muted-foreground">
        {sale.paymentMethod}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={sale.status} />
      </td>
      <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
        <Button
          size="xs"
          variant="outline"
          onClick={() => onViewDetails(sale)}
          className="text-[11px]"
          title="View Details"
        >
          <Eye className="h-3 w-3 mr-1" /> View
        </Button>
        <Button
          size="xs"
          variant="primary"
          onClick={() => onPrintReceipt(sale)}
          className="text-[11px]"
          title="Print Thermal Receipt"
        >
          <Printer className="h-3 w-3 mr-1" /> Receipt
        </Button>
      </td>
    </tr>
  );
}
