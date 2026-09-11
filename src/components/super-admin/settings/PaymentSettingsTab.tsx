"use client";

import React, { useState, useEffect } from "react";
import { superAdminService } from "@/services/superAdmin.service";
import { PaymentMethodCard } from "./PaymentMethodCard";
import { EditPaymentMethodModal } from "./EditPaymentMethodModal";

export function PaymentSettingsTab() {
  const [methods, setMethods] = useState<any[]>([]);
  const [editingMethod, setEditingMethod] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMethods = async () => {
    try {
      const res = await superAdminService.getPaymentSettings();
      if (res.success && res.data) setMethods(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const handleSave = async (updated: any) => {
    const res = await superAdminService.updatePaymentSetting(updated);
    if (res.success && res.data) {
      setMethods((prev) => prev.map((m) => (m.id === updated.id ? res.data : m)));
    } else {
      await fetchMethods();
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs text-muted-foreground">Loading payment gateways...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <h3 className="text-sm font-extrabold text-foreground">Dynamic Customer Payment Channels</h3>
          <p className="text-xs text-muted-foreground">
            Configure bKash, Nagad, Rocket, and Bank accounts displayed to tenants on the checkout page
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {methods.map((method) => (
          <PaymentMethodCard key={method.id} method={method} onEdit={setEditingMethod} />
        ))}
      </div>

      <EditPaymentMethodModal
        isOpen={!!editingMethod}
        method={editingMethod}
        onClose={() => setEditingMethod(null)}
        onSave={handleSave}
      />
    </div>
  );
}
