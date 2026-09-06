import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const entries = await prisma.journalEntry.findMany({
      where: { organizationId },
      include: {
        lines: { include: { account: true } },
        createdBy: { select: { id: true, name: true } },
      },
      orderBy: { date: "desc" },
      take: 50,
    });
    return apiSuccess(entries);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch journal entries", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId, userId } = await getTenantContext(req);
    const { description, lines, referenceType, referenceId } = await req.json();

    if (!description || !lines?.length || !userId) {
      return apiError("description, lines and user context are required", 400);
    }

    const totalDebit = lines.reduce((s: number, l: any) => s + Number(l.debit || 0), 0);
    const totalCredit = lines.reduce((s: number, l: any) => s + Number(l.credit || 0), 0);

    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      return apiError(`Debits (${totalDebit}) and Credits (${totalCredit}) must balance`, 400);
    }

    const entryNumber = `JE-${Date.now().toString().slice(-6)}`;

    const entry = await prisma.journalEntry.create({
      data: {
        organizationId,
        entryNumber,
        description,
        referenceType,
        referenceId,
        createdById: userId,
        lines: {
          create: lines.map((l: any) => ({
            accountId: l.accountId,
            debit: Number(l.debit || 0),
            credit: Number(l.credit || 0),
            notes: l.notes,
          })),
        },
      },
      include: { lines: true },
    });

    return apiSuccess(entry, "Journal entry posted", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to post journal entry", 500);
  }
}
