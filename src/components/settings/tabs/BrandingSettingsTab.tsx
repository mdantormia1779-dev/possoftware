import React from "react";
import { Button } from "@/components/ui/Button";

interface BrandingSettingsTabProps {
  formOrg: {
    name: string;
    themePrimaryColor: string;
    receiptFooterMessage: string;
  };
  setFormOrg: (val: any) => void;
}

export function BrandingSettingsTab({
  formOrg,
  setFormOrg,
}: BrandingSettingsTabProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-subtle-xs space-y-6">
      <div className="border-b border-border pb-3">
        <h3 className="text-base font-extrabold text-foreground">Branding &amp; Customer Invoices</h3>
        <p className="text-xs text-muted-foreground">
          Customize your logo, theme color, and thermal printer receipt headers
        </p>
      </div>

      <div className="space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-border">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-2xl shadow-sm">
            {formOrg.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-foreground">Company Logo &amp; Icon</h4>
            <p className="text-muted-foreground text-[11px]">
              Displayed on desktop sidebar, customer bill headers &amp; PDF statements
            </p>
            <div className="flex items-center gap-2 pt-1">
              <Button type="button" variant="outline" size="sm">
                Upload High-Res PNG
              </Button>
              <span className="text-[11px] text-muted-foreground">Max 2MB (Square recommended)</span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">Primary Theme Accent Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={formOrg.themePrimaryColor}
              onChange={(e) => setFormOrg({ ...formOrg, themePrimaryColor: e.target.value })}
              className="h-10 w-16 rounded-lg cursor-pointer border border-border bg-background p-0.5"
            />
            <input
              type="text"
              value={formOrg.themePrimaryColor}
              onChange={(e) => setFormOrg({ ...formOrg, themePrimaryColor: e.target.value })}
              className="h-9 px-3 rounded-xl border border-border bg-background font-mono text-xs w-32"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-foreground">
            Thermal Receipt Footer Message (Bangla / English)
          </label>
          <textarea
            rows={3}
            value={formOrg.receiptFooterMessage}
            onChange={(e) => setFormOrg({ ...formOrg, receiptFooterMessage: e.target.value })}
            className="w-full p-3 rounded-xl border border-border bg-background text-xs"
          />
          <p className="text-[11px] text-muted-foreground">
            Prints at the very bottom of every thermal paper bill after the barcode and QR code.
          </p>
        </div>
      </div>
    </div>
  );
}
