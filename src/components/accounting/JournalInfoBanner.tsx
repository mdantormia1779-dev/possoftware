import React from "react";
import { Sparkles } from "lucide-react";

export function JournalInfoBanner() {
  return (
    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs space-y-1">
      <div className="flex items-center gap-1.5 font-bold text-foreground">
        <Sparkles className="h-4 w-4 text-primary" />
        <span>Automated Accounting Engine Active</span>
      </div>
      <p className="text-muted-foreground">
        When cashiers ring sales, inventory is received, or salaries are paid, XYZ Business OS automatically writes compliant double-entry transactions with corresponding references.
      </p>
    </div>
  );
}
