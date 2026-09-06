import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const banks = await prisma.bankAccount.findMany({
      where: { organizationId },
      include: { _count: { select: { transactions: true } } },
      orderBy: { createdAt: "asc" },
    });
    return apiSuccess(banks);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch bank accounts", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const b = await req.json();

    if (!b.bankName || !b.accountName || !b.accountNumber) {
      return apiError("bankName, accountName and accountNumber are required", 400);
    }

    const bank = await prisma.bankAccount.create({
      data: {
        organizationId,
        bankName: b.bankName,
        accountName: b.accountName,
        accountNumber: b.accountNumber,
        branchName: b.branchName || null,
        routingNumber: b.routingNumber || null,
        balance: Number(b.balance || 0),
      },
    });

    return apiSuccess(bank, "Bank account created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create bank account", 500);
  }
}
