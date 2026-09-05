import { AttendanceRecord, PayrollRun } from "@/types";

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { id: "att-1", employeeId: "emp-1", employeeName: "Tanvir Hossain", employeeCode: "EMP-001", branchId: "br-1", branchName: "Banani Flagship Outlet", date: "2026-02-28", checkIn: "09:45 AM", checkOut: "08:15 PM", status: "present" },
  { id: "att-2", employeeId: "emp-2", employeeName: "Md. Sajid Hasan", employeeCode: "EMP-002", branchId: "br-1", branchName: "Banani Flagship Outlet", date: "2026-02-28", checkIn: "09:55 AM", checkOut: "08:30 PM", status: "present" },
  { id: "att-3", employeeId: "emp-3", employeeName: "Kazi Mahfuzur Rahman", employeeCode: "EMP-003", branchId: "br-1", branchName: "Banani Flagship Outlet", date: "2026-02-28", checkIn: "10:18 AM", checkOut: "06:30 PM", status: "late", notes: "Traffic on Airport Road" },
  { id: "att-4", employeeId: "emp-4", employeeName: "Sharmin Sultana", employeeCode: "EMP-004", branchId: "br-2", branchName: "Dhanmondi Branch", date: "2026-02-28", checkIn: "10:00 AM", checkOut: "08:00 PM", status: "present" },
];


export const INITIAL_PAYROLL_RUNS: PayrollRun[] = [
  {
    id: "pr-1",
    organizationId: "org-1",
    monthYear: "February 2026",
    totalAmount: 146000,
    status: "approved",
    createdAt: "2026-02-28",
    items: [
      { id: "pi-1", employeeId: "emp-1", employeeName: "Tanvir Hossain", designation: "Branch Operations Manager", branchName: "Banani", baseSalary: 45000, deductions: 0, commission: 4500, netSalary: 49500, isPaid: true },
      { id: "pi-2", employeeId: "emp-2", employeeName: "Md. Sajid Hasan", designation: "Senior POS Cashier", branchName: "Banani", baseSalary: 22000, deductions: 500, commission: 2800, netSalary: 24300, isPaid: true },
      { id: "pi-3", employeeId: "emp-3", employeeName: "Kazi Mahfuzur Rahman", designation: "Chief Accountant", branchName: "Banani", baseSalary: 55000, deductions: 0, commission: 0, netSalary: 55000, isPaid: true },
      { id: "pi-4", employeeId: "emp-4", employeeName: "Sharmin Sultana", designation: "Customer Sales Lead", branchName: "Dhanmondi", baseSalary: 24000, deductions: 0, commission: 3200, netSalary: 27200, isPaid: true },
    ],
  },
];

