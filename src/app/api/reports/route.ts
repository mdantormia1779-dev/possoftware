import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId, branchId } = await getTenantContext(req);
    const { searchParams } = new URL(req.url);
    const days = Number(searchParams.get("days") || 30);

    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);

    const sales = await prisma.sale.findMany({
      where: {
        organizationId,
        ...(branchId ? { branchId } : {}),
        createdAt: { gte: sinceDate },
      },
      include: {
        items: { select: { unitPrice: true, costPrice: true, quantity: true, totalPrice: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    let totalRevenue = 0;
    let totalCost = 0;
    const dailyMap: Record<string, { date: string; revenue: number; orders: number }> = {};

    for (const s of sales) {
      const rev = Number(s.grandTotal);
      totalRevenue += rev;
      const dayKey = s.createdAt.toISOString().slice(0, 10);

      if (!dailyMap[dayKey]) {
        dailyMap[dayKey] = { date: dayKey, revenue: 0, orders: 0 };
      }
      dailyMap[dayKey].revenue += rev;
      dailyMap[dayKey].orders += 1;

      for (const it of s.items) {
        totalCost += Number(it.costPrice || 0) * it.quantity;
      }
    }

    const grossProfit = totalRevenue - totalCost;

    return apiSuccess({
      periodDays: days,
      totalSalesCount: sales.length,
      totalRevenue,
      totalCost,
      grossProfit,
      dailyTrends: Object.values(dailyMap),
    });
  } catch (error: any) {
    return apiError(error.message || "Failed to generate report", 500);
  }
}
