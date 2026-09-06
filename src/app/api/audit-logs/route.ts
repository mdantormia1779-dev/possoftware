import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    const logs = await prisma.auditLog.findMany({
      where: {
        organizationId,
        ...(action ? { action } : {}),
      },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return apiSuccess(logs);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch audit logs", 500);
  }
}
