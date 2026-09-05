"use client";

import React, { useState } from "react";
import { storageService } from "@/lib/services/storage";
import { AttendanceRecord, AttendanceStatus } from "@/lib/types";
import { AttendanceHeader } from "@/components/attendance/AttendanceHeader";
import { AttendanceKpis } from "@/components/attendance/AttendanceKpis";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { QuickCheckInModal, CheckInData } from "@/components/attendance/QuickCheckInModal";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => storageService.getAttendance());
  const [selectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  const employees = storageService.getEmployees();

  const [checkInData, setCheckInData] = useState<CheckInData>({
    employeeId: employees[0]?.id || "",
    status: "present",
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
      <AttendanceHeader onCheckInClick={() => setShowCheckInModal(true)} />

      <AttendanceKpis
        presentCount={presentCount}
        lateCount={lateCount}
        absentCount={absentCount}
        onLeaveCount={onLeaveCount}
      />

      <AttendanceTable attendance={attendance} />

      <QuickCheckInModal
        show={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
        employees={employees}
        checkInData={checkInData}
        setCheckInData={setCheckInData}
        onSubmit={handleRecordAttendance}
      />
    </div>
  );
}
