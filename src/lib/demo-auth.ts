import { prisma } from "./prisma";
import { hashPassword } from "./crypto";
import { seedOrganizationAccounts } from "./auth-seed";

export async function ensureDemoPersonas(targetEmail?: string) {
  const isDemo = targetEmail?.includes("rahmanfashion.com.bd") || targetEmail === "superadmin@xyzpos.com";
  if (!isDemo) return null;

  let org = await prisma.organization.findFirst({
    where: { slug: "rahman-fashion-retail" },
    include: { branches: true, users: true },
  });

  if (!org) {
    org = await prisma.organization.create({
      data: {
        name: "Rahman Fashion & Retail Ltd.",
        slug: "rahman-fashion-retail",
        businessType: "Fashion",
        currency: "BDT",
        currencySymbol: "৳",
        phone: "01711-000000",
        email: "contact@rahmanfashion.com.bd",
        address: "Road 27, Dhanmondi, Dhaka",
        branches: {
          create: {
            name: "Dhanmondi Flagship",
            code: "BR-DHK-01",
            address: "Road 27, Dhanmondi",
            city: "Dhaka",
            isMainBranch: true,
          },
        },
      },
      include: { branches: true, users: true },
    });
    await seedOrganizationAccounts(org.id);
  }

  const branchId = org.branches[0]?.id;
  const hash = hashPassword("password123");

  const personas = [
    { email: "owner@rahmanfashion.com.bd", name: "Tanzim Rahman", role: "COMPANY_OWNER" as const, phone: "01711111111" },
    { email: "manager.dhk@rahmanfashion.com.bd", name: "Rafiqul Islam", role: "BRANCH_MANAGER" as const, phone: "01722222222" },
    { email: "accountant@rahmanfashion.com.bd", name: "Kazi Farhana", role: "ACCOUNTANT" as const, phone: "01733333333" },
    { email: "cashier1@rahmanfashion.com.bd", name: "Anisur Rahman", role: "CASHIER" as const, phone: "01744444444" },
    { email: "superadmin@xyzpos.com", name: "Global Administrator", role: "SUPER_ADMIN" as const, phone: "01700000000" },
  ];

  for (const p of personas) {
    const exists = await prisma.user.findUnique({ where: { email: p.email } });
    if (!exists) {
      await prisma.user.create({
        data: {
          email: p.email,
          name: p.name,
          role: p.role,
          phone: p.phone,
          passwordHash: hash,
          organizationId: org.id,
          branchId,
        },
      });
    }
  }

  return org;
}
