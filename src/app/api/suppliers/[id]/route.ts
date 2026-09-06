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
    const supplier = await prisma.supplier.findFirst({
      where: { id, organizationId },
      include: {
        purchaseOrders: { take: 10, orderBy: { createdAt: "desc" } },
      },
    });
    if (!supplier) return apiError("Supplier not found", 404);
    return apiSuccess(supplier);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch supplier", 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;
    const b = await req.json();

    const updated = await prisma.supplier.updateMany({
      where: { id, organizationId },
      data: {
        name: b.name,
        companyName: b.companyName,
        phone: b.phone,
        email: b.email,
        address: b.address,
      },
    });
    return apiSuccess(updated, "Supplier updated");
  } catch (error: any) {
    return apiError(error.message || "Failed to update supplier", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;
    await prisma.supplier.deleteMany({ where: { id, organizationId } });
    return apiSuccess(null, "Supplier deleted");
  } catch (error: any) {
    return apiError(error.message || "Failed to delete supplier", 500);
  }
}
