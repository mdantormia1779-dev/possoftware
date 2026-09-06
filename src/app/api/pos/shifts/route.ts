import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId, branchId } = await getTenantContext(req);
    const shifts = await prisma.cashDrawerSession.findMany({
      where: { organizationId, ...(branchId ? { branchId } : {}) },
      include: {
        openedBy: { select: { id: true, name: true } },
        closedBy: { select: { id: true, name: true } },
      },
      orderBy: { openedAt: "desc" },
      take: 30,
    });
    return apiSuccess(shifts);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch shift sessions", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId, branchId: defBranch, userId } = await getTenantContext(req);
    const b = await req.json();
    const branchId = b.branchId || defBranch;
    const openedById = b.openedById || userId;

    if (b.action === "CLOSE") {
      if (!b.shiftId) return apiError("shiftId is required to close shift", 400);
      const updated = await prisma.cashDrawerSession.update({
        where: { id: b.shiftId },
        data: {
          status: "CLOSED",
          closedAt: new Date(),
          closedById: userId,
          closingCash: Number(b.closingCash || 0),
          cashVariance: Number(b.cashVariance || 0),
          notes: b.notes,
        },
      });
      return apiSuccess(updated, "Shift closed successfully");
    }

    if (!branchId || !openedById) {
      return apiError("branchId and openedById are required", 400);
    }

    const shift = await prisma.cashDrawerSession.create({
      data: {
        organizationId,
        branchId,
        openedById,
        openingCash: Number(b.openingCash || 0),
        status: "OPEN",
      },
    });

    return apiSuccess(shift, "Shift opened successfully", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to manage shift", 500);
  }
}
