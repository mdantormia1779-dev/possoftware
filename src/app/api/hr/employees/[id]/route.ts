import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;
    const emp = await prisma.employee.findFirst({
      where: { id, organizationId },
      include: { branch: true, attendances: { take: 7 }, leaves: true },
    });
    if (!emp) return apiError("Employee not found", 404);
    return apiSuccess(emp);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch employee", 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;
    const b = await req.json();

    const updated = await prisma.employee.updateMany({
      where: { id, organizationId },
      data: {
        name: b.name,
        phone: b.phone,
        email: b.email,
        designation: b.designation,
        department: b.department,
        baseSalary: b.baseSalary ? Number(b.baseSalary) : undefined,
        commissionRate: b.commissionRate !== undefined ? Number(b.commissionRate) : undefined,
        status: b.status,
      },
    });
    return apiSuccess(updated, "Employee updated");
  } catch (error: any) {
    return apiError(error.message || "Failed to update employee", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;
    await prisma.employee.deleteMany({ where: { id, organizationId } });
    return apiSuccess(null, "Employee deleted");
  } catch (error: any) {
    return apiError(error.message || "Failed to delete employee", 500);
  }
}
