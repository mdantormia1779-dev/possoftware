"use client";

import React, { useState } from "react";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import {
  Settings,
  Building,
  Palette,
  Receipt,
  Shield,
  Bell,
  CheckCircle2,
  Save,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const { currentOrg, setCurrentOrg } = useTenant();
  const [savedToast, setSavedToast] = useState(false);

  const [formOrg, setFormOrg] = useState({
    name: currentOrg.name,
    businessType: currentOrg.businessType,
    phone: currentOrg.phone,
    email: currentOrg.email,
    address: currentOrg.address,
    taxNumber: currentOrg.taxNumber || "",
    receiptFooterMessage: currentOrg.receiptFooterMessage || "",
    themePrimaryColor: currentOrg.themePrimaryColor || "#4f46e5",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...currentOrg,
      ...formOrg,
    };
    storageService.updateOrganization(updated);
    setCurrentOrg(updated);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span>Company & System Settings</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure business identity, NBR VAT registration number, thermal receipt headers & branding
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="h-4 w-4" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Company Profile Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Building className="h-5 w-5 text-indigo-600" />
            <h3 className="text-base font-bold text-foreground">Business Profile & Legal Info</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Company Name (Trade Name)</label>
              <input
                type="text"
                required
                value={formOrg.name}
                onChange={(e) => setFormOrg({ ...formOrg, name: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-border bg-background"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Business Category</label>
              <select
                value={formOrg.businessType}
                onChange={(e) => setFormOrg({ ...formOrg, businessType: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-border bg-background"
              >
                <option>Fashion & Retail</option>
                <option>Grocery & Supermarket</option>
                <option>Electronics & Gadgets</option>
                <option>Pharmacy & Healthcare</option>
                <option>Restaurant & Cafe</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Official Phone Number</label>
              <input
                type="text"
                value={formOrg.phone}
                onChange={(e) => setFormOrg({ ...formOrg, phone: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-border bg-background"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Billing / Support Email</label>
              <input
                type="email"
                value={formOrg.email}
                onChange={(e) => setFormOrg({ ...formOrg, email: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-border bg-background"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="font-semibold text-foreground">Registered Head Office Address</label>
              <input
                type="text"
                value={formOrg.address}
                onChange={(e) => setFormOrg({ ...formOrg, address: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-border bg-background"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">BIN / VAT Registration Number (NBR)</label>
              <input
                type="text"
                placeholder="BIN-002938475-0101"
                value={formOrg.taxNumber}
                onChange={(e) => setFormOrg({ ...formOrg, taxNumber: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-border bg-background font-mono"
              />
            </div>
          </div>
        </div>

        {/* POS Thermal Receipt Customization */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Receipt className="h-5 w-5 text-indigo-600" />
            <h3 className="text-base font-bold text-foreground">Thermal Receipt Layout (80mm)</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-foreground">Receipt Footer Message (Bangla / English)</label>
              <input
                type="text"
                value={formOrg.receiptFooterMessage}
                onChange={(e) => setFormOrg({ ...formOrg, receiptFooterMessage: e.target.value })}
                className="w-full h-9 px-3 rounded-lg border border-border bg-background"
              />
            </div>

            <p className="text-muted-foreground text-[11px]">
              This message appears at the bottom of every customer invoice printed via thermal POS machines.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="lg" className="px-8 font-bold">
            <Save className="h-4 w-4 mr-2" /> Save Company Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
