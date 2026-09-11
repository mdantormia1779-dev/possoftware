"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { subscriptionService, PaymentMethodConfig } from "@/services/subscription.service";
import { PLAN_CATALOG, PlanDetails } from "./checkoutTypes";

export function useSubscriptionCheckout() {
  const searchParams = useSearchParams();
  const planParam = (searchParams.get("plan") || "ENTERPRISE").toUpperCase();
  const selectedPlan: PlanDetails = PLAN_CATALOG[planParam] || PLAN_CATALOG.ENTERPRISE;

  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "YEARLY">("MONTHLY");
  const [methods, setMethods] = useState<PaymentMethodConfig[]>([]);
  const [selectedMethodId, setSelectedMethodId] = useState<string>("");
  const [transactionId, setTransactionId] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successInvoice, setSuccessInvoice] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    subscriptionService.getPaymentMethods().then((res) => {
      if (res.success && res.data) {
        const active = res.data.filter((m) => m.isActive);
        setMethods(active);
        if (active.length > 0) setSelectedMethodId(active[0].id);
      }
      setLoading(false);
    });
  }, []);

  const selectedMethod = methods.find((m) => m.id === selectedMethodId) || methods[0];
  const payableAmount = billingCycle === "MONTHLY" ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      setErrorMsg("Please enter the Transaction ID (TrxID) from your payment receipt");
      return;
    }
    setErrorMsg(null);
    setSubmitting(true);
    try {
      const res = await subscriptionService.submitCheckout({
        planTier: selectedPlan.tier,
        amount: payableAmount,
        billingCycle,
        paymentMethod: selectedMethod ? selectedMethod.method : "BKASH",
        transactionId: transactionId.trim(),
        senderNumber: senderNumber.trim(),
        notes: notes.trim(),
      });
      if (res.success && res.data) {
        setSuccessInvoice(res.data);
      } else {
        setErrorMsg(res.error || "Failed to submit subscription payment");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong submitting payment");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    selectedPlan,
    billingCycle,
    setBillingCycle,
    methods,
    selectedMethod,
    selectedMethodId,
    setSelectedMethodId,
    transactionId,
    setTransactionId,
    senderNumber,
    setSenderNumber,
    notes,
    setNotes,
    loading,
    submitting,
    successInvoice,
    setSuccessInvoice,
    errorMsg,
    payableAmount,
    handleSubmit,
  };
}
