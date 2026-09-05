import React from "react";

export function EmployeeAttendanceTab() {
  return (
    <div className="space-y-3 text-xs">
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300">
            Present
          </span>
          <p className="text-xl font-black text-emerald-600 mt-0.5">24 Days</p>
        </div>
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
          <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300">Late</span>
          <p className="text-xl font-black text-amber-600 mt-0.5">2 Days</p>
        </div>
        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
          <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-300">Absent</span>
          <p className="text-xl font-black text-rose-600 mt-0.5">0 Days</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl border border-border bg-card space-y-2">
        <h4 className="font-bold text-foreground">Recent Check-In Logs</h4>
        <div className="divide-y divide-border text-[11px]">
          <div className="py-2 flex justify-between">
            <span>Today (09:05 AM - 06:10 PM)</span>
            <span className="text-emerald-600 font-bold">On Time</span>
          </div>
          <div className="py-2 flex justify-between">
            <span>Yesterday (09:18 AM - 06:05 PM)</span>
            <span className="text-amber-600 font-bold">Late (18m)</span>
          </div>
          <div className="py-2 flex justify-between">
            <span>03 Sep 2026 (08:55 AM - 06:00 PM)</span>
            <span className="text-emerald-600 font-bold">On Time</span>
          </div>
        </div>
      </div>
    </div>
  );
}
