import React from "react";
import { AttendanceRecord } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/Badge";

interface AttendanceTableProps {
  attendance: AttendanceRecord[];
}

export function AttendanceTable({ attendance }: AttendanceTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="p-3.5 font-semibold text-foreground">Employee</th>
              <th className="p-3.5 font-semibold text-foreground">ID</th>
              <th className="p-3.5 font-semibold text-foreground">Outlet Branch</th>
              <th className="p-3.5 font-semibold text-foreground">Date</th>
              <th className="p-3.5 font-semibold text-foreground">Check In</th>
              <th className="p-3.5 font-semibold text-foreground">Check Out</th>
              <th className="p-3.5 font-semibold text-foreground">Status</th>
              <th className="p-3.5 text-right font-semibold text-foreground">Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {attendance.map((rec) => (
              <tr key={rec.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3.5 font-bold text-foreground">{rec.employeeName}</td>
                <td className="p-3.5 font-mono text-muted-foreground">{rec.employeeCode}</td>
                <td className="p-3.5 text-muted-foreground">{rec.branchName}</td>
                <td className="p-3.5 text-muted-foreground">{formatDate(rec.date)}</td>
                <td className="p-3.5 font-mono font-semibold text-foreground">{rec.checkIn || "-"}</td>
                <td className="p-3.5 font-mono text-muted-foreground">{rec.checkOut || "-"}</td>
                <td className="p-3.5">
                  <StatusBadge status={rec.status} />
                </td>
                <td className="p-3.5 text-right text-muted-foreground">{rec.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
