import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const accounts = await prisma.chartOfAccount.findMany({
      where: { organizationId },
      orderBy: { code: "asc" },
    });
    return apiSuccess(accounts);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch accounts", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { organizationId } = await getTenantContext(req);
    const { code, name, type, balance = 0 } = await req.json();

    if (!code || !name || !type) {
      return apiError("code, name and type are required", 400);
    }

    const account = await prisma.chartOfAccount.create({
      data: {
        organizationId,
        code,
        name,
        type,
        balance: Number(balance),
      },
    });

    return apiSuccess(account, "Account created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create account", 500);
  }
}
