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
    const transfer = await prisma.stockTransfer.findFirst({
      where: { id, organizationId },
      include: {
        sourceBranch: true,
        destinationBranch: true,
        items: { include: { product: true } },
      },
    });
    if (!transfer) return apiError("Transfer not found", 404);
    return apiSuccess(transfer);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch transfer", 500);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { id } = await params;
    const { status, notes } = await req.json();

    const transfer = await prisma.stockTransfer.findFirst({
      where: { id, organizationId },
      include: { items: true },
    });

    if (!transfer) return apiError("Transfer not found", 404);

    if (status === "RECEIVED" && transfer.status !== "RECEIVED") {
      await prisma.$transaction(async (tx) => {
        for (const item of transfer.items) {
          await tx.branchStock.upsert({
            where: {
              branchId_productId: {
                branchId: transfer.sourceBranchId,
                productId: item.productId,
              },
            },
            update: { quantity: { decrement: item.quantity } },
            create: {
              branchId: transfer.sourceBranchId,
              productId: item.productId,
              quantity: -item.quantity,
            },
          });

          await tx.branchStock.upsert({
            where: {
              branchId_productId: {
                branchId: transfer.destinationBranchId,
                productId: item.productId,
              },
            },
            update: { quantity: { increment: item.quantity } },
            create: {
              branchId: transfer.destinationBranchId,
              productId: item.productId,
              quantity: item.quantity,
            },
          });
        }

        await tx.stockTransfer.update({
          where: { id },
          data: { status: "RECEIVED", receivedAt: new Date(), notes },
        });
      });
      return apiSuccess({ id, status: "RECEIVED" }, "Transfer received and stock moved");
    }

    const updated = await prisma.stockTransfer.update({
      where: { id },
      data: { status, notes },
    });

    return apiSuccess(updated, "Transfer status updated");
  } catch (error: any) {
    return apiError(error.message || "Failed to update transfer", 500);
  }
}
