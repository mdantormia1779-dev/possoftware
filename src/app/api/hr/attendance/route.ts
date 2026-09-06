import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { searchParams } = new URL(req.url);
    const employeeId = searchParams.get("employeeId");

    const attendances = await prisma.attendance.findMany({
      where: {
        employee: { organizationId },
        ...(employeeId ? { employeeId } : {}),
      },
      include: { employee: { select: { id: true, name: true, employeeId: true } } },
      orderBy: { date: "desc" },
      take: 100,
    });
    return apiSuccess(attendances);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch attendance records", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { employeeId, status = "PRESENT", notes } = await req.json();

    if (!employeeId) return apiError("employeeId is required", 400);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const attendance = await prisma.attendance.create({
      data: {
        employeeId,
        date: today,
        checkIn: now,
        status,
        notes,
      },
      include: { employee: true },
    });

    return apiSuccess(attendance, "Attendance clocked successfully", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to log attendance", 500);
  }
}
