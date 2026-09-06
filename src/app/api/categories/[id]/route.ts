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
    const cat = await prisma.category.findFirst({
      where: { id, organizationId },
    });
    if (!cat) return apiError("Category not found", 404);
    return apiSuccess(cat);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch category", 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;
    const { name, imageUrl } = await req.json();

    const updated = await prisma.category.updateMany({
      where: { id, organizationId },
      data: { name, imageUrl },
    });
    return apiSuccess(updated, "Category updated");
  } catch (error: any) {
    return apiError(error.message || "Failed to update category", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;
    await prisma.category.deleteMany({ where: { id, organizationId } });
    return apiSuccess(null, "Category deleted");
  } catch (error: any) {
    return apiError(error.message || "Failed to delete category", 500);
  }
}
