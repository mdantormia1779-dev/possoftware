import React from "react";
import { Receipt } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

interface PaymentModalFooterProps {
  onClose: () => void;
  isProcessing: boolean;
  onCompleteSale: () => void;
  cartGrandTotal: number;
}

export function PaymentModalFooter({
  onClose,
  isProcessing,
  onCompleteSale,
  cartGrandTotal,
}: PaymentModalFooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-border px-5 py-4 bg-muted/30">
      <Button variant="outline" size="sm" onClick={onClose}>
        Cancel
      </Button>
      <Button
        variant="primary"
        size="md"
        isLoading={isProcessing}
        onClick={onCompleteSale}
        className="px-6 font-bold shadow-subtle-sm"
      >
        <Receipt className="h-4 w-4 mr-2" />
        Complete Sale ({formatCurrency(cartGrandTotal)})
      </Button>
    </div>
  );
}
