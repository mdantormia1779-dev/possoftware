import { Employee, AttendanceRecord, PayrollRun } from "@/types";
import { INITIAL_EMPLOYEES, INITIAL_ATTENDANCE, INITIAL_PAYROLL_RUNS } from "@/data/initial-data";
import { STORAGE_KEYS, getItem, setItem } from "./baseStorage";

export class HrStorage {
  public getEmployees(): Employee[] {
    return getItem(STORAGE_KEYS.EMPLOYEES, INITIAL_EMPLOYEES);
  }

  public addEmployee(emp: Employee): void {
    const all = [emp, ...this.getEmployees()];
    setItem(STORAGE_KEYS.EMPLOYEES, all);
  }

  public getAttendance(): AttendanceRecord[] {
    return getItem(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
  }

  public recordAttendance(record: AttendanceRecord): void {
    const all = [record, ...this.getAttendance()];
    setItem(STORAGE_KEYS.ATTENDANCE, all);
  }

  public getPayrollRuns(): PayrollRun[] {
    return getItem(STORAGE_KEYS.PAYROLL, INITIAL_PAYROLL_RUNS);
  }

  public addPayrollRun(run: PayrollRun): void {
    const all = [run, ...this.getPayrollRuns()];
    setItem(STORAGE_KEYS.PAYROLL, all);
  }
}

export const hrStorage = new HrStorage();
