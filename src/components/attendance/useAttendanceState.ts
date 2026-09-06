import { useState, useEffect } from "react";
import { storageService } from "@/lib/services/storage";
import { hrService } from "@/services/hr.service";
import { AttendanceRecord } from "@/lib/types";
import { CheckInData } from "./QuickCheckInModal";

export function useAttendanceState() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => storageService.getAttendance());
  const [selectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  const employees = storageService.getEmployees();

  const [checkInData, setCheckInData] = useState<CheckInData>({
    employeeId: employees[0]?.id || "",
    status: "present",
    notes: "",
  });

  useEffect(() => {
    hrService.getAttendance().then((res) => {
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setAttendance(res.data);
      }
    });
  }, []);

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
      status: checkInData.status,
      notes: checkInData.notes,
    };

    storageService.recordAttendance(newRecord);
    setAttendance((prev) => [newRecord, ...prev]);
    hrService.clockAttendance(emp.id, checkInData.status.toUpperCase(), checkInData.notes).catch(() => {});
    setShowCheckInModal(false);
  };

  return {
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
  };
}
