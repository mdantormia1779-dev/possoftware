import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId, branchId } = await getTenantContext(req);
    const parked = await prisma.parkedSale.findMany({
      where: { organizationId, ...(branchId ? { branchId } : {}) },
      include: { items: { include: { product: true } } },
      orderBy: { parkedAt: "desc" },
    });
    return apiSuccess(parked);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch parked sales", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId, branchId: defBranch, userId } = await getTenantContext(req);
    const b = await req.json();

    const branchId = b.branchId || defBranch;
    const parkedBy = b.parkedBy || userId || "Cashier";

    if (!branchId || !b.items?.length) {
      return apiError("branchId and items are required", 400);
    }

    const parked = await prisma.parkedSale.create({
      data: {
        organizationId,
        branchId,
        parkedBy,
        customerName: b.customerName || null,
        customerPhone: b.customerPhone || null,
        totalAmount: Number(b.totalAmount || 0),
        notes: b.notes || null,
        items: {
          create: b.items.map((it: any) => ({
            productId: it.productId,
            quantity: Number(it.quantity),
            unitPrice: Number(it.unitPrice),
          })),
        },
      },
      include: { items: true },
    });

    return apiSuccess(parked, "Sale held/parked", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to park sale", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return apiError("id parameter is required", 400);

    await prisma.parkedSale.deleteMany({
      where: { id, organizationId },
    });

    return apiSuccess(null, "Parked sale removed");
  } catch (error: any) {
    return apiError(error.message || "Failed to delete parked sale", 500);
  }
}
