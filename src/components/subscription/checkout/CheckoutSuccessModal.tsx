"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

interface CheckoutSuccessModalProps {
  invoice: any | null;
  onClose: () => void;
}

export function CheckoutSuccessModal({ invoice, onClose }: CheckoutSuccessModalProps) {
  const router = useRouter();

  if (!invoice) return null;

  const handleDone = () => {
    onClose();
    router.push("/app/subscription");
  };

  return (
    <Modal isOpen={!!invoice} onClose={handleDone} title="Payment Submitted Successfully">
      <div className="space-y-4 text-center py-2">
        <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="h-7 w-7" />
        </div>

        <div>
          <h3 className="text-base font-extrabold text-foreground">Verification in Progress</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your payment for <strong>{invoice.planTier || "ENTERPRISE"} Plan</strong> has been submitted.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/80 text-left space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Invoice Number:</span>
            <span className="font-mono font-bold text-foreground">{invoice.invoiceNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Amount:</span>
            <span className="font-mono font-black text-indigo-600 dark:text-indigo-400">{formatCurrency(invoice.amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method:</span>
            <span className="font-bold text-foreground">{invoice.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Transaction ID:</span>
            <span className="font-mono font-bold text-foreground">{invoice.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span className="px-2 py-0.2 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold text-[10px]">
              Pending Approval
            </span>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground">
          The Super Administrator will verify your TrxID and your plan quotas will be instantly updated.
        </p>

        <div className="pt-2">
          <Button type="button" variant="primary" size="md" onClick={handleDone} className="w-full font-bold bg-indigo-600 hover:bg-indigo-700">
            <span>Back to Subscription Dashboard</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
