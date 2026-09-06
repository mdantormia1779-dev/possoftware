import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const purchases = await prisma.purchaseOrder.findMany({
      where: { organizationId },
      include: {
        supplier: true,
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(purchases);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch purchase orders", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId, branchId } = await getTenantContext(req);
    const body = await req.json();
    const { supplierId, items, paidAmount = 0, notes } = body;

    if (!supplierId || !items?.length) {
      return apiError("supplierId and items are required", 400);
    }

    const totalAmount = items.reduce(
      (sum: number, it: any) => sum + Number(it.unitCost) * Number(it.quantity),
      0
    );
    const dueAmount = Math.max(0, totalAmount - Number(paidAmount));
    const poNumber = `PO-${Date.now().toString().slice(-6)}`;

    const po = await prisma.$transaction(async (tx) => {
      const created = await tx.purchaseOrder.create({
        data: {
          organizationId,
          supplierId,
          poNumber,
          totalAmount,
          paidAmount: Number(paidAmount),
          dueAmount,
          notes,
          status: "ORDERED",
          items: {
            create: items.map((it: any) => ({
              productId: it.productId,
              unitCost: it.unitCost,
              quantity: Number(it.quantity),
              batchNumber: it.batchNumber || null,
            })),
          },
        },
        include: { items: true, supplier: true },
      });

      if (dueAmount > 0) {
        await tx.supplier.update({
          where: { id: supplierId },
          data: { balanceDue: { increment: dueAmount } },
        });
      }

      return created;
    });

    return apiSuccess(po, "Purchase order created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create purchase order", 500);
  }
}
