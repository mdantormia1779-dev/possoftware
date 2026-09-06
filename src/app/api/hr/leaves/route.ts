import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const leaves = await prisma.leave.findMany({
      where: { employee: { organizationId } },
      include: { employee: { select: { id: true, name: true, employeeId: true } } },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(leaves);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch leaves", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { employeeId, type, startDate, endDate, reason } = await req.json();

    if (!employeeId || !type || !startDate || !endDate) {
      return apiError("employeeId, type, startDate and endDate are required", 400);
    }

    const leave = await prisma.leave.create({
      data: {
        employeeId,
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        reason,
        isApproved: false,
      },
      include: { employee: true },
    });

    return apiSuccess(leave, "Leave application submitted", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to submit leave", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, isApproved } = await req.json();
    if (!id) return apiError("id is required", 400);

    const updated = await prisma.leave.update({
      where: { id },
      data: { isApproved: Boolean(isApproved) },
    });

    return apiSuccess(updated, `Leave ${isApproved ? "approved" : "rejected"}`);
  } catch (error: any) {
    return apiError(error.message || "Failed to update leave", 500);
  }
}
