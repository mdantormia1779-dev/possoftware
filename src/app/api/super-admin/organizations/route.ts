import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  try {
    const orgs = await prisma.organization.findMany({
      include: {
        _count: { select: { branches: true, users: true, sales: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(orgs);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch organizations", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, subscriptionStatus, subscriptionPlan, maxBranches, maxStaff } = await req.json();

    if (!id) return apiError("Organization id is required", 400);

    const updated = await prisma.organization.update({
      where: { id },
      data: {
        ...(subscriptionStatus ? { subscriptionStatus } : {}),
        ...(subscriptionPlan ? { subscriptionPlan } : {}),
        ...(maxBranches ? { maxBranches: Number(maxBranches) } : {}),
        ...(maxStaff ? { maxStaff: Number(maxStaff) } : {}),
      },
    });

    return apiSuccess(updated, "Organization updated by super-admin");
  } catch (error: any) {
    return apiError(error.message || "Failed to update organization", 500);
  }
}
