import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId, branchId } = await getTenantContext(req);
    const { searchParams } = new URL(req.url);
    const targetBranch = searchParams.get("branchId") || branchId;

    const stocks = await prisma.branchStock.findMany({
      where: {
        product: { organizationId },
        ...(targetBranch ? { branchId: targetBranch } : {}),
      },
      include: { product: true, branch: true },
      orderBy: { quantity: "asc" },
    });
    return apiSuccess(stocks);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch stock levels", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { branchId: defaultBranch } = await getTenantContext(req);
    const { productId, branchId, quantity, damagedQty, reason } = await req.json();

    const targetBranch = branchId || defaultBranch;
    if (!productId || !targetBranch || quantity === undefined) {
      return apiError("productId, branchId and quantity are required", 400);
    }

    const stock = await prisma.branchStock.upsert({
      where: {
        branchId_productId: {
          branchId: targetBranch,
          productId,
        },
      },
      update: {
        quantity: { increment: Number(quantity) },
        ...(damagedQty ? { damagedQty: { increment: Number(damagedQty) } } : {}),
      },
      create: {
        branchId: targetBranch,
        productId,
        quantity: Math.max(0, Number(quantity)),
        damagedQty: Number(damagedQty) || 0,
      },
      include: { product: true, branch: true },
    });

    return apiSuccess(stock, "Stock adjusted successfully");
  } catch (error: any) {
    return apiError(error.message || "Failed to adjust stock", 500);
  }
}
