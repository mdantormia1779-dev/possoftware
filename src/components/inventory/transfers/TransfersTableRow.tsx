import React from "react";
import { ArrowRight } from "lucide-react";
import { StockTransfer } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface TransfersTableRowProps {
  transfer: StockTransfer;
  onUpdateStatus: (id: string, status: StockTransfer["status"]) => void;
}

export function TransfersTableRow({ transfer: tr, onUpdateStatus }: TransfersTableRowProps) {
  return (
    <tr className="h-[52px] hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3 font-mono font-bold text-primary">
        {tr.transferNumber}
      </td>
      <td className="px-4 py-3 font-medium text-foreground">
        {tr.sourceBranchName}
      </td>
      <td className="px-4 py-3 font-medium text-foreground">
        <span className="flex items-center gap-1.5 text-primary font-semibold">
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
          {tr.destinationBranchName}
        </span>
      </td>
      <td className="px-4 py-3">
        {tr.items.map((item, idx) => (
          <span key={idx} className="block text-foreground font-medium">
            {item.productName} ({item.quantity} pcs)
          </span>
        ))}
      </td>
      <td className="px-4 py-3 text-muted-foreground font-mono text-[11px]">
        {formatDateTime(tr.createdAt)}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={tr.status} />
      </td>
      <td className="px-4 py-3 text-right space-x-1.5">
        {tr.status === "in_transit" && (
          <Button
            size="xs"
            variant="success"
            onClick={() => onUpdateStatus(tr.id, "received")}
          >
            Mark Received
          </Button>
        )}
        {tr.status === "pending" && (
          <Button
            size="xs"
            variant="primary"
            onClick={() => onUpdateStatus(tr.id, "in_transit")}
          >
            Dispatch
          </Button>
        )}
      </td>
    </tr>
  );
}
