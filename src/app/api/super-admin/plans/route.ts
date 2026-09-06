import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiSuccess, apiError } from "@/lib/api-response";

export async function GET() {
  try {
    const plans = await prisma.platformPlan.findMany({
      orderBy: { monthlyPrice: "asc" },
    });
    return apiSuccess(plans);
  } catch (error: any) {
    return apiError(error.message || "Failed to fetch plans", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();

    if (!b.name || !b.tier || b.monthlyPrice === undefined) {
      return apiError("name, tier and monthlyPrice are required", 400);
    }

    const plan = await prisma.platformPlan.create({
      data: {
        name: b.name,
        tier: b.tier,
        monthlyPrice: Number(b.monthlyPrice),
        yearlyPrice: Number(b.yearlyPrice || b.monthlyPrice * 10),
        maxBranches: Number(b.maxBranches || 1),
        maxStaff: Number(b.maxStaff || 5),
        maxProducts: Number(b.maxProducts || 5000),
        features: typeof b.features === "string" ? b.features : JSON.stringify(b.features || []),
      },
    });

    return apiSuccess(plan, "Platform plan created", 201);
  } catch (error: any) {
    return apiError(error.message || "Failed to create plan", 500);
  }
}
