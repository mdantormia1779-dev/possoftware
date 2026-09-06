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
    const po = await prisma.purchaseOrder.findFirst({
      where: { id, organizationId },
      include: {
        supplier: true,
        items: { include: { product: true } },
      },
    });
    if (!po) return apiError("Purchase order not found", 404);
    return apiSuccess(po);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch purchase order", 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId, branchId } = await getTenantContext(req);
    const { id } = await params;
    const { status, paidAmount, notes } = await req.json();

    const po = await prisma.purchaseOrder.findFirst({
      where: { id, organizationId },
      include: { items: true },
    });

    if (!po) return apiError("Purchase order not found", 404);

    if (status === "RECEIVED" && po.status !== "RECEIVED" && branchId) {
      await prisma.$transaction(async (tx) => {
        for (const it of po.items) {
          await tx.branchStock.upsert({
            where: {
              branchId_productId: {
                branchId,
                productId: it.productId,
              },
            },
            update: { quantity: { increment: it.quantity } },
            create: {
              branchId,
              productId: it.productId,
              quantity: it.quantity,
            },
          });
        }
        await tx.purchaseOrder.update({
          where: { id },
          data: { status: "RECEIVED", receivedDate: new Date() },
        });
      });
      return apiSuccess({ id, status: "RECEIVED" }, "PO marked as received and stock updated");
    }

    const updated = await prisma.purchaseOrder.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(paidAmount !== undefined ? { paidAmount: Number(paidAmount) } : {}),
        ...(notes ? { notes } : {}),
      },
    });

    return apiSuccess(updated, "Purchase order updated");
  } catch (error: any) {
    return apiError(error.message || "Failed to update purchase order", 500);
  }
}
