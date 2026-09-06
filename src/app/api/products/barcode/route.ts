import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId, branchId } = await getTenantContext(req);
    const { searchParams } = new URL(req.url);
    const barcode = searchParams.get("code") || searchParams.get("barcode");

    if (!barcode) return apiError("Barcode is required", 400);

    const product = await prisma.product.findFirst({
      where: {
        organizationId,
        OR: [{ barcode }, { sku: barcode }],
      },
      include: {
        category: true,
        branchStocks: branchId ? { where: { branchId } } : true,
      },
    });

    if (!product) return apiError("Product not found with this barcode", 404);
    return apiSuccess(product);
  } catch (error: any) {
    return apiError(error.message || "Failed to lookup barcode", 500);
  }
}
