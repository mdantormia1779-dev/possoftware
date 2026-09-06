import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const employees = await prisma.employee.findMany({
      where: { organizationId },
      include: { branch: true },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(employees);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch employees", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId, branchId: defBranch } = await getTenantContext(req);
    const b = await req.json();

    const branchId = b.branchId || defBranch;
    if (!branchId || !b.name || !b.phone || !b.designation || !b.department) {
      return apiError("branchId, name, phone, designation and department are required", 400);
    }

    const employeeId = b.employeeId || `EMP-${Date.now().toString().slice(-4)}`;

    const employee = await prisma.employee.create({
      data: {
        organizationId,
        branchId,
        employeeId,
        name: b.name,
        email: b.email || null,
        phone: b.phone,
        designation: b.designation,
        department: b.department,
        joiningDate: b.joiningDate ? new Date(b.joiningDate) : new Date(),
        baseSalary: Number(b.baseSalary || 0),
        commissionRate: Number(b.commissionRate || 0),
        bankAccountNo: b.bankAccountNo || null,
      },
      include: { branch: true },
    });

    return apiSuccess(employee, "Employee created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create employee", 500);
  }
}
