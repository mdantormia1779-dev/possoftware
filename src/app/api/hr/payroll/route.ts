import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const payrolls = await prisma.payrollRun.findMany({
      include: {
        items: {
          include: {
            employee: { select: { id: true, name: true, employeeId: true, department: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(payrolls);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch payroll runs", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { monthYear, items } = await req.json();

    if (!monthYear || !items?.length) {
      return apiError("monthYear and items are required", 400);
    }

    const totalAmount = items.reduce(
      (sum: number, it: any) => sum + Number(it.netSalary),
      0
    );

    const payroll = await prisma.payrollRun.create({
      data: {
        monthYear,
        totalAmount,
        status: "APPROVED",
        processedAt: new Date(),
        items: {
          create: items.map((it: any) => ({
            employeeId: it.employeeId,
            baseSalary: Number(it.baseSalary),
            deductions: Number(it.deductions || 0),
            commission: Number(it.commission || 0),
            netSalary: Number(it.netSalary),
            isPaid: Boolean(it.isPaid),
          })),
        },
      },
      include: { items: true },
    });

    return apiSuccess(payroll, "Payroll processed successfully", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to process payroll", 500);
  }
}
