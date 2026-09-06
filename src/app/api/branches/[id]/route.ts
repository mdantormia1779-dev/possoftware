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
    const branch = await prisma.branch.findFirst({
      where: { id, organizationId },
    });
    if (!branch) return apiError("Branch not found", 404);
    return apiSuccess(branch);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch branch", 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;
    const body = await req.json();

    const branch = await prisma.branch.updateMany({
      where: { id, organizationId },
      data: {
        name: body.name,
        address: body.address,
        city: body.city,
        phone: body.phone,
        email: body.email,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });

    return apiSuccess(branch, "Branch updated");
  } catch (error: any) {
    return apiError(error.message || "Failed to update branch", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;

    await prisma.branch.deleteMany({
      where: { id, organizationId, isMainBranch: false },
    });

    return apiSuccess(null, "Branch deleted");
  } catch (error: any) {
    return apiError(error.message || "Failed to delete branch", 500);
  }
}
