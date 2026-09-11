"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Settings, ArrowLeft, Shield, Save, CheckCircle2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PaymentSettingsTab } from "@/components/super-admin/settings/PaymentSettingsTab";

export default function SuperAdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"payment" | "gateways">("payment");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/super-admin" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Settings className="h-6 w-6 text-purple-600" />
              <span>Platform Global Settings</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Configure dynamic payment methods, gateway credentials, and system policies
            </p>
          </div>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="h-4 w-4" />
            <span>Settings saved!</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-b border-border pb-2">
        <button
          onClick={() => setActiveTab("payment")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === "payment" ? "bg-purple-600 text-white shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
        >
          Manual Payment Methods (bKash/Nagad/Bank)
        </button>
        <button
          onClick={() => setActiveTab("gateways")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === "gateways" ? "bg-purple-600 text-white shadow-xs" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
        >
          API Keys & SMS Gateway
        </button>
      </div>

      {activeTab === "payment" ? (
        <PaymentSettingsTab />
      ) : (
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-xs space-y-6 text-xs">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground">Global SMS Gateway Settings (Bangladesh)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Primary Provider</label>
                <select className="w-full h-9 px-3 rounded-lg border border-border bg-background">
                  <option>Onnorokom SMS Gateway</option>
                  <option>Greenweb SMS API</option>
                  <option>BulkSMS BD</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Cost per Message (৳)</label>
                <input type="number" defaultValue={0.35} step="0.01" className="w-full h-9 px-3 rounded-lg border border-border bg-background" />
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-border">
            <Button type="submit" variant="primary" size="md">
              <Save className="h-4 w-4 mr-2" /> Save Configuration
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
