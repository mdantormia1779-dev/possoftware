import React from "react";
import { CompanyLocaleFields } from "./CompanyLocaleFields";

interface CompanySettingsTabProps {
  formOrg: {
    name: string;
    businessType: string;
    phone: string;
    email: string;
    address: string;
  };
  setFormOrg: (val: any) => void;
}

export function CompanySettingsTab({
  formOrg,
  setFormOrg,
}: CompanySettingsTabProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-subtle-xs space-y-6">
      <div className="border-b border-border pb-3">
        <h3 className="text-base font-extrabold text-foreground">Business Legal Identity</h3>
        <p className="text-xs text-muted-foreground">
          This official information appears on government VAT invoices and purchase orders
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Company Name (Trade License)</label>
          <input
            type="text"
            required
            value={formOrg.name}
            onChange={(e) => setFormOrg({ ...formOrg, name: e.target.value })}
            className="w-full h-9 px-3 rounded-xl border border-border bg-background"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Business Category</label>
          <select
            value={formOrg.businessType}
            onChange={(e) => setFormOrg({ ...formOrg, businessType: e.target.value })}
            className="w-full h-9 px-3 rounded-xl border border-border bg-background"
          >
            <option>Fashion &amp; Retail</option>
            <option>Grocery &amp; Supermarket</option>
            <option>Electronics &amp; Gadgets</option>
            <option>Pharmacy &amp; Healthcare</option>
            <option>Restaurant &amp; Cafe</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Official Phone Number</label>
          <input
            type="text"
            value={formOrg.phone}
            onChange={(e) => setFormOrg({ ...formOrg, phone: e.target.value })}
            className="w-full h-9 px-3 rounded-xl border border-border bg-background"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Official Email Address</label>
          <input
            type="email"
            value={formOrg.email}
            onChange={(e) => setFormOrg({ ...formOrg, email: e.target.value })}
            className="w-full h-9 px-3 rounded-xl border border-border bg-background"
          />
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label className="font-semibold text-foreground">Head Office Address</label>
          <input
            type="text"
            value={formOrg.address}
            onChange={(e) => setFormOrg({ ...formOrg, address: e.target.value })}
            className="w-full h-9 px-3 rounded-xl border border-border bg-background"
          />
        </div>

        <CompanyLocaleFields />
      </div>
    </div>
  );
}
