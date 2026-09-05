import React from "react";
import Link from "next/link";

const DEFAULT_BRANCH_ROSTER = [
  { name: "Tanzim Ahmed", role: "Cashier C1", time: "09:30 AM", status: "Present" },
  { name: "Farhana Yasmin", role: "Cashier C2", time: "09:45 AM", status: "Present" },
  { name: "Rifat Hossain", role: "Inventory Lead", time: "10:00 AM", status: "Present" },
  { name: "Sadia Sultana", role: "Floor Executive", time: "10:15 AM", status: "Present" },
];

export function BranchRosterSnapshot() {
  return (
    <div className="rounded-3xl border border-border/80 bg-card p-5 space-y-3.5 shadow-subtle-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
            Branch Roster
          </h3>
          <p className="text-xs text-muted-foreground">Staff on duty today</p>
        </div>
        <Link
          href="/app/attendance"
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Attendance
        </Link>
      </div>

      <div className="space-y-2 text-xs">
        {DEFAULT_BRANCH_ROSTER.map((staff, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2.5 rounded-xl bg-muted/20 border border-border/60"
          >
            <div className="flex items-center gap-2 truncate">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
              <div className="truncate">
                <div className="font-bold text-foreground text-xs truncate">{staff.name}</div>
                <div className="text-[10px] text-muted-foreground">{staff.role}</div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground shrink-0 font-semibold">
              In: {staff.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
