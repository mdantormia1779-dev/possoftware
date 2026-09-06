import { NextRequest } from "next/server";
import { prisma } from "./prisma";

export interface TenantContext {
  organizationId: string;
  branchId?: string;
  userId?: string;
}

export async function getTenantContext(req?: NextRequest): Promise<TenantContext> {
  const orgHeader = req?.headers.get("x-organization-id");
  const branchHeader = req?.headers.get("x-branch-id");
  const userHeader = req?.headers.get("x-user-id");

  if (orgHeader) {
    return {
      organizationId: orgHeader,
      branchId: branchHeader || undefined,
      userId: userHeader || undefined,
    };
  }

  let org = await prisma.organization.findFirst({
    include: { branches: true, users: true },
  });

  if (!org) {
    org = await prisma.organization.create({
      data: {
        name: "XYZ Retail OS",
        slug: "xyz-retail-os",
        businessType: "Retail",
        currency: "BDT",
        currencySymbol: "৳",
        branches: {
          create: {
            name: "Dhaka Main Branch",
            code: "BR-DHK-01",
            address: "Gulshan, Dhaka",
            city: "Dhaka",
            isMainBranch: true,
          },
        },
      },
      include: { branches: true, users: true },
    });
  }

  const mainBranch = org.branches.find((b) => b.isMainBranch) || org.branches[0];
  const firstUser = org.users[0];

  return {
    organizationId: org.id,
    branchId: branchHeader || mainBranch?.id,
    userId: userHeader || firstUser?.id,
  };
}
