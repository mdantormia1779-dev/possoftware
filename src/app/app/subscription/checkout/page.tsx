"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { useSubscriptionCheckout } from "@/components/subscription/checkout/useSubscriptionCheckout";
import { CheckoutPlanSummary } from "@/components/subscription/checkout/CheckoutPlanSummary";
import { CheckoutPaymentMethods } from "@/components/subscription/checkout/CheckoutPaymentMethods";
import { CheckoutMethodDetails } from "@/components/subscription/checkout/CheckoutMethodDetails";
import { CheckoutForm } from "@/components/subscription/checkout/CheckoutForm";
import { CheckoutSuccessModal } from "@/components/subscription/checkout/CheckoutSuccessModal";

function CheckoutContent() {
  const checkout = useSubscriptionCheckout();

  if (checkout.loading) {
    return <div className="p-12 text-center text-xs text-muted-foreground">Loading checkout configuration...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/app/subscription" className="p-2 rounded-xl border border-border hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-indigo-600" />
            <span>Subscription Upgrade Checkout</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Upgrade your business operating system tier with verified payment channels
          </p>
        </div>
      </div>

      <CheckoutPlanSummary
        plan={checkout.selectedPlan}
        billingCycle={checkout.billingCycle}
        onCycleChange={checkout.setBillingCycle}
        payableAmount={checkout.payableAmount}
      />

      <CheckoutPaymentMethods
        methods={checkout.methods}
        selectedMethodId={checkout.selectedMethodId}
        onSelect={checkout.setSelectedMethodId}
      />

      <CheckoutMethodDetails method={checkout.selectedMethod} />

      <CheckoutForm
        senderNumber={checkout.senderNumber}
        onSenderNumberChange={checkout.setSenderNumber}
        transactionId={checkout.transactionId}
        onTransactionIdChange={checkout.setTransactionId}
        notes={checkout.notes}
        onNotesChange={checkout.setNotes}
        submitting={checkout.submitting}
        errorMsg={checkout.errorMsg}
        onSubmit={checkout.handleSubmit}
      />

      <CheckoutSuccessModal
        invoice={checkout.successInvoice}
        onClose={() => checkout.setSuccessInvoice(null)}
      />
    </div>
  );
}

export default function SubscriptionCheckoutPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-muted-foreground">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
