export type EmployeeStatus = "active" | "on_leave" | "terminated";

export interface Employee {
  id: string;
  organizationId: string;
  branchId: string;
  branchName: string;
  employeeId: string;
  name: string;
  email?: string;
  phone: string;
  designation: string;
  department: string;
  joiningDate: string;
  baseSalary: number;
  commissionRate: number; // percentage
  status: EmployeeStatus;
  photoUrl?: string;
  bankAccountNo?: string;
}

export type AttendanceStatus = "present" | "late" | "absent" | "half_day" | "on_leave";

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  branchId: string;
  branchName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  notes?: string;
}

export type PayrollStatus = "draft" | "processing" | "approved" | "paid";

export interface PayrollItem {
  id: string;
  employeeId: string;
  employeeName: string;
  designation: string;
  branchName: string;
  baseSalary: number;
  deductions: number;
  commission: number;
  netSalary: number;
  isPaid: boolean;
}

export interface PayrollRun {
  id: string;
  organizationId: string;
  monthYear: string;
  totalAmount: number;
  status: PayrollStatus;
  items: PayrollItem[];
  processedAt?: string;
  createdAt: string;
}
