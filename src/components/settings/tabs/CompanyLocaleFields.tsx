import React from "react";

export function CompanyLocaleFields() {
  return (
    <>
      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Base Currency</label>
        <input
          type="text"
          disabled
          value="BDT (৳) - Bangladeshi Taka"
          className="w-full h-9 px-3 rounded-xl border border-border bg-muted/60 text-muted-foreground font-semibold"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Timezone</label>
        <input
          type="text"
          disabled
          value="Asia/Dhaka (GMT+6)"
          className="w-full h-9 px-3 rounded-xl border border-border bg-muted/60 text-muted-foreground font-semibold"
        />
      </div>
    </>
  );
}
