import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getAuthPayload } from "@/lib/auth-token";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const payload = getAuthPayload(req);
    const targetUserId = payload?.userId;

    if (targetUserId) {
      const user = await prisma.user.findUnique({
        where: { id: targetUserId },
        include: { organization: true, branch: true },
      });
      if (user && user.isActive) {
        return apiSuccess({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role.toLowerCase(),
          organization: user.organization,
          branch: user.branch,
        });
      }
    }

    const { userId, organizationId } = await getTenantContext(req);
    if (!userId) {
      const org = await prisma.organization.findUnique({
        where: { id: organizationId },
        include: { users: true, branches: true },
      });
      return apiSuccess({ user: org?.users[0] || null, organization: org, branch: org?.branches[0] || null });
    }

    const fallbackUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { organization: true, branch: true },
    });

    if (!fallbackUser) {
      return apiError("User not found", 404);
    }

    return apiSuccess({
      id: fallbackUser.id,
      name: fallbackUser.name,
      email: fallbackUser.email,
      phone: fallbackUser.phone,
      role: fallbackUser.role.toLowerCase(),
      organization: fallbackUser.organization,
      branch: fallbackUser.branch,
    });
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch profile", 500);
  }
}
