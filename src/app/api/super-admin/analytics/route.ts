import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import {
  calculatePlanMix,
  calculateEstimatedMrr,
  buildMonthlyRevenue,
} from "@/lib/services/analytics-calculator";

export async function GET() {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const [allOrgs, userCount, totalSales, recentSales] = await Promise.all([
      prisma.organization.findMany({
        select: { id: true, name: true, subscriptionPlan: true, subscriptionStatus: true },
      }),
      prisma.user.count(),
      prisma.sale.aggregate({
        _sum: { grandTotal: true },
        _count: { id: true },
      }),
      prisma.sale.findMany({
        where: { createdAt: { gte: sixMonthsAgo } },
        select: { grandTotal: true, createdAt: true },
      }),
    ]);

    const activeSubscriptions = allOrgs.filter(
      (o) => o.subscriptionStatus !== "CANCELLED" && o.subscriptionStatus !== "EXPIRED"
    ).length;

    const mrr = calculateEstimatedMrr(allOrgs);
    const planDistribution = calculatePlanMix(allOrgs);
    const mrrGrowth = buildMonthlyRevenue(recentSales);

    return apiSuccess({
      totalOrganizations: allOrgs.length,
      activeSubscriptions,
      totalUsers: userCount,
      totalSystemRevenue: totalSales._sum.grandTotal || 0,
      totalSystemSalesCount: totalSales._count.id || 0,
      monthlyRecurringRevenue: mrr,
      planDistribution,
      mrrGrowth,
    });
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch platform analytics", 500);
  }
}
