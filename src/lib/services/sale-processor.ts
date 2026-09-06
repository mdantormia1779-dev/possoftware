import { prisma } from "@/lib/prisma";

export async function processSaleTransaction(data: {
  organizationId: string;
  branchId: string;
  cashierId: string;
  customerId?: string;
  shiftId?: string;
  invoiceNumber: string;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  changeAmount: number;
  paymentMethod: any;
  items: Array<{ productId: string; quantity: number; unitPrice: number; totalPrice: number }>;
  notes?: string;
}) {
  return await prisma.$transaction(async (tx) => {
    const sale = await tx.sale.create({
      data: {
        organizationId: data.organizationId,
        branchId: data.branchId,
        cashierId: data.cashierId,
        customerId: data.customerId || null,
        shiftId: data.shiftId || null,
        invoiceNumber: data.invoiceNumber,
        subtotal: data.subtotal,
        discountAmount: data.discountAmount,
        taxAmount: data.taxAmount,
        grandTotal: data.grandTotal,
        paidAmount: data.paidAmount,
        dueAmount: data.dueAmount,
        changeAmount: data.changeAmount,
        paymentMethod: data.paymentMethod,
        notes: data.notes || null,
        items: {
          create: data.items.map((it) => ({
            productId: it.productId,
            quantity: it.quantity,
            unitPrice: it.unitPrice,
            totalPrice: it.totalPrice,
          })),
        },
        payments: {
          create: {
            method: data.paymentMethod,
            amount: data.paidAmount,
          },
        },
      },
      include: { items: true, payments: true, customer: true },
    });

    for (const item of data.items) {
      await tx.branchStock.upsert({
        where: {
          branchId_productId: { branchId: data.branchId, productId: item.productId },
        },
        update: { quantity: { decrement: item.quantity } },
        create: { branchId: data.branchId, productId: item.productId, quantity: -item.quantity },
      });
    }

    if (data.customerId) {
      const earnedPoints = Math.floor(data.grandTotal / 100);
      await tx.customer.update({
        where: { id: data.customerId },
        data: {
          dueBalance: { increment: data.dueAmount },
          totalSpent: { increment: data.paidAmount },
          loyaltyPoints: { increment: earnedPoints },
        },
      });

      if (earnedPoints > 0) {
        await tx.loyaltyTransaction.create({
          data: {
            customerId: data.customerId,
            saleId: sale.id,
            points: earnedPoints,
            type: "EARNED",
            notes: `Points from sale ${data.invoiceNumber}`,
          },
        });
      }
    }

    return sale;
  });
}
