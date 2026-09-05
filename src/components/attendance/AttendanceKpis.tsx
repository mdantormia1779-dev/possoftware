import React from "react";

interface AttendanceKpisProps {
  presentCount: number;
  lateCount: number;
  absentCount: number;
  onLeaveCount: number;
}

export function AttendanceKpis({
  presentCount,
  lateCount,
  absentCount,
  onLeaveCount,
}: AttendanceKpisProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 shadow-2xs">
        <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">Present Today</span>
        <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-1">{presentCount} Staff</div>
      </div>

      <div className="p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 shadow-2xs">
        <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">Late Arrival</span>
        <div className="text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1">{lateCount} Staff</div>
      </div>

      <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20 shadow-2xs">
        <span className="text-xs font-semibold text-rose-800 dark:text-rose-300">Absent</span>
        <div className="text-2xl font-bold text-rose-700 dark:text-rose-400 mt-1">{absentCount} Staff</div>
      </div>

      <div className="p-4 rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/30 dark:bg-purple-950/20 shadow-2xs">
        <span className="text-xs font-semibold text-purple-800 dark:text-purple-300">On Approved Leave</span>
        <div className="text-2xl font-bold text-purple-700 dark:text-purple-400 mt-1">{onLeaveCount} Staff</div>
      </div>
    </div>
  );
}
