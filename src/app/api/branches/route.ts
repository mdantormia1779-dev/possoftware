import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const branches = await prisma.branch.findMany({
      where: { organizationId },
      orderBy: { createdAt: "asc" },
      include: {
        _count: { select: { users: true, sales: true } },
      },
    });
    return apiSuccess(branches);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch branches", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const body = await req.json();

    if (!body.name || !body.code || !body.address || !body.city) {
      return apiError("Name, code, address and city are required", 400);
    }

    const branch = await prisma.branch.create({
      data: {
        organizationId,
        name: body.name,
        code: body.code,
        address: body.address,
        city: body.city,
        phone: body.phone,
        email: body.email,
        isMainBranch: Boolean(body.isMainBranch),
      },
    });

    return apiSuccess(branch, "Branch created successfully", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create branch", 500);
  }
}
