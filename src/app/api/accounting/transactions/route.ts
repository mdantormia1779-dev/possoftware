import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { searchParams } = new URL(req.url);
    const bankAccountId = searchParams.get("bankAccountId");

    const txns = await prisma.bankTransaction.findMany({
      where: {
        bankAccount: { organizationId },
        ...(bankAccountId ? { bankAccountId } : {}),
      },
      include: { bankAccount: true },
      orderBy: { date: "desc" },
      take: 100,
    });
    return apiSuccess(txns);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch bank transactions", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { bankAccountId, type, amount, reference, description } = await req.json();

    if (!bankAccountId || !type || !amount) {
      return apiError("bankAccountId, type and amount are required", 400);
    }

    const numAmount = Number(amount);
    const isDeposit = type === "DEPOSIT" || type === "TRANSFER_IN";
    const delta = isDeposit ? numAmount : -numAmount;

    const [txn, bank] = await prisma.$transaction([
      prisma.bankTransaction.create({
        data: {
          bankAccountId,
          type,
          amount: numAmount,
          reference,
          description,
        },
      }),
      prisma.bankAccount.update({
        where: { id: bankAccountId },
        data: { balance: { increment: delta } },
      }),
    ]);

    return apiSuccess({ txn, currentBalance: bank.balance }, "Transaction recorded", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to record transaction", 500);
  }
}
