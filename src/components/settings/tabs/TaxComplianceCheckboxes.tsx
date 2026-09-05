import React from "react";

interface TaxComplianceCheckboxesProps {
  taxInclusive: boolean;
  onTaxInclusiveChange: (val: boolean) => void;
  mushakEnabled: boolean;
  onMushakEnabledChange: (val: boolean) => void;
}

export function TaxComplianceCheckboxes({
  taxInclusive,
  onTaxInclusiveChange,
  mushakEnabled,
  onMushakEnabledChange,
}: TaxComplianceCheckboxesProps) {
  return (
    <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/50 dark:border-indigo-800/50 space-y-3 text-xs">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={taxInclusive}
          onChange={(e) => onTaxInclusiveChange(e.target.checked)}
          className="rounded border-border text-indigo-600 focus:ring-indigo-500"
        />
        <div>
          <p className="font-bold text-foreground">
            Prices are VAT-inclusive (Recommended for Retail)
          </p>
          <p className="text-[11px] text-muted-foreground">
            Shelf price already includes VAT; invoice separates base and tax breakdown.
          </p>
        </div>
      </label>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={mushakEnabled}
          onChange={(e) => onMushakEnabledChange(e.target.checked)}
          className="rounded border-border text-indigo-600 focus:ring-indigo-500"
        />
        <div>
          <p className="font-bold text-foreground">
            Print Mushak-6.3 Format on Sales Invoices
          </p>
          <p className="text-[11px] text-muted-foreground">
            Automatically complies with VAT act 2012 challan requirements.
          </p>
        </div>
      </label>
    </div>
  );
}
