import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";
import { getTenantContext } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  try {
    const { organizationId, branchId } = await getTenantContext(req);
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalProducts,
      totalCustomers,
      todaySales,
      monthSales,
      recentSales,
      lowStockProducts,
    ] = await Promise.all([
      prisma.product.count({ where: { organizationId } }),
      prisma.customer.count({ where: { organizationId } }),
      prisma.sale.aggregate({
        where: {
          organizationId,
          ...(branchId ? { branchId } : {}),
          createdAt: { gte: startOfToday },
        },
        _sum: { grandTotal: true, paidAmount: true },
        _count: { id: true },
      }),
      prisma.sale.aggregate({
        where: {
          organizationId,
          ...(branchId ? { branchId } : {}),
          createdAt: { gte: startOfMonth },
        },
        _sum: { grandTotal: true },
        _count: { id: true },
      }),
      prisma.sale.findMany({
        where: { organizationId, ...(branchId ? { branchId } : {}) },
        include: { customer: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.product.findMany({
        where: {
          organizationId,
          branchStocks: {
            some: {
              ...(branchId ? { branchId } : {}),
              quantity: { lte: 5 },
            },
          },
        },
        include: { branchStocks: true },
        take: 5,
      }),
    ]);

    return apiSuccess({
      todaySalesAmount: todaySales._sum.grandTotal || 0,
      todayOrdersCount: todaySales._count.id || 0,
      monthSalesAmount: monthSales._sum.grandTotal || 0,
      totalProducts,
      totalCustomers,
      recentSales,
      lowStockProducts,
    });
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch dashboard stats", 500);
  }
}
