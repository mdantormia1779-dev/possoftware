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
    const product = await prisma.product.findFirst({
      where: { id, organizationId },
      include: { category: true, branchStocks: true },
    });
    if (!product) return apiError("Product not found", 404);
    return apiSuccess(product);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch product", 500);
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

    const updated = await prisma.product.updateMany({
      where: { id, organizationId },
      data: {
        categoryId: b.categoryId,
        name: b.name,
        nameBn: b.nameBn,
        sku: b.sku,
        barcode: b.barcode,
        description: b.description,
        purchasePrice: b.purchasePrice,
        sellingPrice: b.sellingPrice,
        taxRate: b.taxRate,
        minStockAlert: b.minStockAlert,
        unit: b.unit,
        imageUrl: b.imageUrl,
        isActive: b.isActive !== undefined ? b.isActive : true,
      },
    });

    return apiSuccess(updated, "Product updated");
  } catch (error: any) {
    return apiError(error.message || "Failed to update product", 500);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;
    await prisma.product.deleteMany({ where: { id, organizationId } });
    return apiSuccess(null, "Product deleted");
  } catch (error: any) {
    return apiError(error.message || "Failed to delete product", 500);
  }
}
