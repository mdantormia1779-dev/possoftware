"use client";

import React from "react";
import { useAttendanceState } from "@/components/attendance/useAttendanceState";
import { AttendanceHeader } from "@/components/attendance/AttendanceHeader";
import { AttendanceKpis } from "@/components/attendance/AttendanceKpis";
import { AttendanceTable } from "@/components/attendance/AttendanceTable";
import { QuickCheckInModal } from "@/components/attendance/QuickCheckInModal";

export default function AttendancePage() {
  const {
    attendance,
    employees,
    showCheckInModal,
    setShowCheckInModal,
    checkInData,
    setCheckInData,
    presentCount,
    lateCount,
    absentCount,
    onLeaveCount,
    handleRecordAttendance,
  } = useAttendanceState();

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
