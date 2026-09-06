import { apiRequest } from "./apiClient";

export const hrService = {
  async getEmployees(orgId?: string) {
    return apiRequest("/api/hr/employees", { orgId });
  },

  async createEmployee(data: any, orgId?: string, branchId?: string) {
    return apiRequest("/api/hr/employees", {
      method: "POST",
      body: JSON.stringify(data),
      orgId,
      branchId,
    });
  },

  async getAttendance(employeeId?: string, orgId?: string) {
    const qs = employeeId ? `?employeeId=${employeeId}` : "";
    return apiRequest(`/api/hr/attendance${qs}`, { orgId });
  },

  async clockAttendance(employeeId: string, status?: string, notes?: string) {
    return apiRequest("/api/hr/attendance", {
      method: "POST",
      body: JSON.stringify({ employeeId, status, notes }),
    });
  },

  async getLeaves(orgId?: string) {
    return apiRequest("/api/hr/leaves", { orgId });
  },

  async applyLeave(data: any) {
    return apiRequest("/api/hr/leaves", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateLeaveStatus(id: string, isApproved: boolean) {
    return apiRequest("/api/hr/leaves", {
      method: "PUT",
      body: JSON.stringify({ id, isApproved }),
    });
  },

  async getPayrollRuns(orgId?: string) {
    return apiRequest("/api/hr/payroll", { orgId });
  },

  async runPayroll(monthYear: string, items: any[], orgId?: string) {
    return apiRequest("/api/hr/payroll", {
      method: "POST",
      body: JSON.stringify({ monthYear, items }),
      orgId,
    });
  },
};
