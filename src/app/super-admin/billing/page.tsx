"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DollarSign, ArrowLeft, RefreshCw, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { superAdminService } from "@/services/superAdmin.service";
import { INITIAL_SUBSCRIPTION_INVOICES } from "@/data/mocks/platformPayments";
import { BillingInvoiceTable } from "@/components/super-admin/billing/BillingInvoiceTable";

export default function SuperAdminBillingPage() {
  const [invoices, setInvoices] = useState<any[]>(INITIAL_SUBSCRIPTION_INVOICES);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await superAdminService.getBillingInvoices();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setInvoices(res.data);
      }
    } catch {
      setInvoices((prev) => (prev.length > 0 ? prev : INITIAL_SUBSCRIPTION_INVOICES));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleApprove = async (id: string) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, status: "PAID" } : inv)));
    await superAdminService.processSubscriptionInvoice(id, "APPROVE").catch(() => {});
  };

  const handleReject = async (id: string) => {
    setInvoices((prev) => prev.map((inv) => (inv.id === id ? { ...inv, status: "REJECTED" } : inv)));
    await superAdminService.processSubscriptionInvoice(id, "REJECT").catch(() => {});
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/super-admin" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-purple-600" />
              <span>Manual Payments &amp; Billing Ledger</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Verify customer bKash/Nagad/Bank payments and activate subscription tiers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/super-admin/settings">
            <Button variant="outline" size="sm" className="text-xs font-bold">
              <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" /> Payment Gateways
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={fetchInvoices} disabled={loading} className="text-xs font-bold">
            <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
        {loading && invoices.length === 0 ? (
          <div className="p-12 text-center text-xs text-muted-foreground">Loading subscription transactions...</div>
        ) : (
          <BillingInvoiceTable invoices={invoices} onApprove={handleApprove} onReject={handleReject} />
        )}
      </div>
    </div>
  );
}
