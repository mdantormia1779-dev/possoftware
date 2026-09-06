import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const transfers = await prisma.stockTransfer.findMany({
      where: { organizationId },
      include: {
        sourceBranch: true,
        destinationBranch: true,
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return apiSuccess(transfers);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch transfers", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { sourceBranchId, destinationBranchId, notes, items } = await req.json();

    if (!sourceBranchId || !destinationBranchId || !items?.length) {
      return apiError("sourceBranchId, destinationBranchId and items are required", 400);
    }

    const transferNumber = `TR-${Date.now().toString().slice(-6)}`;

    const transfer = await prisma.stockTransfer.create({
      data: {
        organizationId,
        transferNumber,
        sourceBranchId,
        destinationBranchId,
        notes,
        status: "PENDING",
        items: {
          create: items.map((it: any) => ({
            productId: it.productId,
            quantity: Number(it.quantity),
          })),
        },
      },
      include: { items: true, sourceBranch: true, destinationBranch: true },
    });

    return apiSuccess(transfer, "Stock transfer initiated", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create transfer", 500);
  }
}
