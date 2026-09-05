import React from "react";

export function EmployeeLeaveTab() {
  return (
    <div className="space-y-3 text-xs">
      <h4 className="font-bold text-foreground">Annual Paid Leave Entitlement (2026)</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl border border-border bg-muted/30 space-y-1">
          <span className="text-muted-foreground font-semibold">Casual Leave</span>
          <p className="text-lg font-black text-foreground">10 / 14 Days</p>
          <span className="text-[10px] text-muted-foreground">4 days taken</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-border bg-muted/30 space-y-1">
          <span className="text-muted-foreground font-semibold">Medical / Sick</span>
          <p className="text-lg font-black text-foreground">12 / 14 Days</p>
          <span className="text-[10px] text-muted-foreground">2 days taken</span>
        </div>
        <div className="p-3.5 rounded-2xl border border-border bg-muted/30 space-y-1">
          <span className="text-muted-foreground font-semibold">Earned Annual</span>
          <p className="text-lg font-black text-foreground">15 / 15 Days</p>
          <span className="text-[10px] text-emerald-600 font-medium">Full balance available</span>
        </div>
      </div>
    </div>
  );
}
