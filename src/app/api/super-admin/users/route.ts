import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        organization: { select: { id: true, name: true } },
        branch: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const mapped = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone || "N/A",
      role: u.role.toLowerCase(),
      organization: u.organization?.name || "Platform Admin",
      organizationId: u.organizationId || "platform",
      status: u.isActive ? "active" : "suspended",
      lastLogin: "Active",
      twoFactorEnabled: false,
    }));

    return apiSuccess(mapped);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch platform users", 500);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, isActive } = await req.json();
    if (!id) return apiError("User id is required", 400);

    const updated = await prisma.user.update({
      where: { id },
      data: { isActive: Boolean(isActive) },
    });
    return apiSuccess(updated, "User status updated");
  } catch (error: any) {
    return apiError(error.message || "Failed to update user", 500);
  }
}
