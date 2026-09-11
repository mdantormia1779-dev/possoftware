"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DollarSign, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { superAdminService } from "@/services/superAdmin.service";
import { BillingInvoiceTable } from "@/components/super-admin/billing/BillingInvoiceTable";

export default function SuperAdminBillingPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await superAdminService.getBillingInvoices();
      if (res.success && res.data) setInvoices(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleApprove = async (id: string) => {
    const res = await superAdminService.processSubscriptionInvoice(id, "APPROVE");
    if (res.success) fetchInvoices();
  };

  const handleReject = async (id: string) => {
    const res = await superAdminService.processSubscriptionInvoice(id, "REJECT");
    if (res.success) fetchInvoices();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/super-admin" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-purple-600" />
              <span>Platform Billing & Subscription Ledger</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Verify customer bKash/Nagad/Bank payments and activate subscription tiers
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={fetchInvoices} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </Button>
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
