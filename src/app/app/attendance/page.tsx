"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTenant } from "@/lib/context/TenantContext";
import { storageService } from "@/lib/services/storage";
import { AttendanceRecord, AttendanceStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowLeft,
  Search,
  Filter,
  Plus,
  X,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/Badge";

export default function AttendancePage() {
  const { branches } = useTenant();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => storageService.getAttendance());
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  const employees = storageService.getEmployees();

  const [checkInData, setCheckInData] = useState({
    employeeId: employees[0]?.id || "",
    status: "present" as AttendanceStatus,
    notes: "",
  });

  const presentCount = attendance.filter((a) => a.status === "present").length;
  const lateCount = attendance.filter((a) => a.status === "late").length;
  const absentCount = attendance.filter((a) => a.status === "absent").length;
  const onLeaveCount = attendance.filter((a) => a.status === "on_leave").length;

  const handleRecordAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === checkInData.employeeId) || employees[0];
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      employeeId: emp.id,
      employeeName: emp.name,
      employeeCode: emp.employeeId,
      branchId: emp.branchId,
      branchName: emp.branchName,
      date: selectedDate,
      checkIn: nowTime,
      checkOut: undefined,
      status: checkInData.status,
      notes: checkInData.notes,
    };

    storageService.recordAttendance(newRecord);
    setAttendance(storageService.getAttendance());
    setShowCheckInModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/app/hr" className="p-2 rounded-lg border border-border hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <CalendarCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span>Daily Attendance Dashboard</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Track check-in times, late arrivals, absences, and leave approvals across outlets
            </p>
          </div>
        </div>

        <Button variant="primary" size="sm" onClick={() => setShowCheckInModal(true)}>
          <UserCheck className="h-4 w-4 mr-1" /> Quick Check In / Out
        </Button>
      </div>

      {/* 4 Status KPI Counters */}
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

      {/* Attendance Log Table */}
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

      {/* Quick Check In Modal */}
      {showCheckInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h3 className="text-base font-bold text-foreground">Manual Attendance Entry</h3>
              <button onClick={() => setShowCheckInModal(false)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRecordAttendance} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Select Employee</label>
                <select
                  value={checkInData.employeeId}
                  onChange={(e) => setCheckInData({ ...checkInData, employeeId: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                >
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.employeeId}) - {e.branchName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Attendance Status</label>
                <select
                  value={checkInData.status}
                  onChange={(e) => setCheckInData({ ...checkInData, status: e.target.value as AttendanceStatus })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background uppercase font-bold"
                >
                  <option value="present">Present (On Time)</option>
                  <option value="late">Late Arrival</option>
                  <option value="absent">Absent</option>
                  <option value="on_leave">Casual / Sick Leave</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-foreground">Remarks / Note</label>
                <input
                  type="text"
                  placeholder="e.g. Field assignment or traffic delay"
                  value={checkInData.notes}
                  onChange={(e) => setCheckInData({ ...checkInData, notes: e.target.value })}
                  className="w-full h-9 px-3 rounded-lg border border-border bg-background"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setShowCheckInModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Record Attendance
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
