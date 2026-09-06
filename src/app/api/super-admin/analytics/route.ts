import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET() {
  try {
    const [orgCount, userCount, totalSales, recentOrgs] = await Promise.all([
      prisma.organization.count(),
      prisma.user.count(),
      prisma.sale.aggregate({
        _sum: { grandTotal: true },
        _count: { id: true },
      }),
      prisma.organization.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          _count: { select: { users: true, sales: true } },
        },
      }),
    ]);

    return apiSuccess({
      totalOrganizations: orgCount,
      totalUsers: userCount,
      totalSystemRevenue: totalSales._sum.grandTotal || 0,
      totalSystemSalesCount: totalSales._count.id || 0,
      recentOrganizations: recentOrgs,
    });
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch platform analytics", 500);
  }
}
