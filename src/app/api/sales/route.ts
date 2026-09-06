import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";
import { processSaleTransaction } from "@/lib/services/sale-processor";

export async function GET(req: NextRequest) {
  try {
    const { organizationId, branchId } = await getTenantContext(req);
    const { searchParams } = new URL(req.url);
    const targetBranch = searchParams.get("branchId") || branchId;

    const sales = await prisma.sale.findMany({
      where: {
        organizationId,
        ...(targetBranch ? { branchId: targetBranch } : {}),
      },
      include: {
        customer: true,
        cashier: { select: { id: true, name: true } },
        items: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return apiSuccess(sales);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch sales", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId, branchId: defaultBranch, userId } = await getTenantContext(req);
    const b = await req.json();

    const branchId = b.branchId || defaultBranch;
    const cashierId = b.cashierId || userId;

    if (!branchId || !cashierId || !b.items?.length) {
      return apiError("branchId, cashierId and items are required", 400);
    }

    const invoiceNumber = `INV-${Date.now().toString().slice(-8)}`;
    const subtotal = Number(b.subtotal);
    const discountAmount = Number(b.discountAmount || 0);
    const taxAmount = Number(b.taxAmount || 0);
    const grandTotal = Number(b.grandTotal || subtotal - discountAmount + taxAmount);
    const paidAmount = Number(b.paidAmount || 0);
    const dueAmount = Math.max(0, grandTotal - paidAmount);
    const changeAmount = Math.max(0, paidAmount - grandTotal);

    const sale = await processSaleTransaction({
      organizationId,
      branchId,
      cashierId,
      customerId: b.customerId,
      shiftId: b.shiftId,
      invoiceNumber,
      subtotal,
      discountAmount,
      taxAmount,
      grandTotal,
      paidAmount,
      dueAmount,
      changeAmount,
      paymentMethod: b.paymentMethod || "CASH",
      items: b.items,
      notes: b.notes,
    });

    return apiSuccess(sale, "Sale completed successfully", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to complete sale", 500);
  }
}
