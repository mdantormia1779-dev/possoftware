import React from "react";
import { TaxComplianceCheckboxes } from "./TaxComplianceCheckboxes";

interface TaxSettingsTabProps {
  taxNumber: string;
  onTaxNumberChange: (val: string) => void;
  vatRate: string;
  onVatRateChange: (val: string) => void;
  taxInclusive: boolean;
  onTaxInclusiveChange: (val: boolean) => void;
  mushakEnabled: boolean;
  onMushakEnabledChange: (val: boolean) => void;
}

export function TaxSettingsTab({
  taxNumber,
  onTaxNumberChange,
  vatRate,
  onVatRateChange,
  taxInclusive,
  onTaxInclusiveChange,
  mushakEnabled,
  onMushakEnabledChange,
}: TaxSettingsTabProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-subtle-xs space-y-6">
      <div className="border-b border-border pb-3">
        <h3 className="text-base font-extrabold text-foreground">
          National Board of Revenue (NBR) Tax Rules
        </h3>
        <p className="text-xs text-muted-foreground">
          Mushak-6.3 digital tax challan generation and VAT rates
        </p>
      </div>

      <div className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">
              Business Identification Number (BIN)
            </label>
            <input
              type="text"
              value={taxNumber}
              onChange={(e) => onTaxNumberChange(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-border bg-background font-mono text-xs"
            />
            <p className="text-[11px] text-muted-foreground">
              11-digit NBR VAT registration number
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Standard VAT Rate (%)</label>
            <select
              value={vatRate}
              onChange={(e) => onVatRateChange(e.target.value)}
              className="w-full h-9 px-3 rounded-xl border border-border bg-background"
            >
              <option value="0">0% (Exempt / Essential food)</option>
              <option value="5">5% (Retail / Supermarket reduced)</option>
              <option value="7.5">7.5% (Fashion &amp; Garments retail)</option>
              <option value="10">10% (Restaurant AC outlets)</option>
              <option value="15">15% (Standard standard goods rate)</option>
            </select>
          </div>
        </div>

        <TaxComplianceCheckboxes
          taxInclusive={taxInclusive}
          onTaxInclusiveChange={onTaxInclusiveChange}
          mushakEnabled={mushakEnabled}
          onMushakEnabledChange={onMushakEnabledChange}
        />
      </div>
    </div>
  );
}
