import { prisma } from "./prisma";

export async function seedOrganizationAccounts(orgId: string): Promise<void> {
  const defaultAccounts = [
    { code: "1001", name: "Cash in Hand", type: "ASSET" as const },
    { code: "1002", name: "Petty Cash (Till)", type: "ASSET" as const },
    { code: "1010", name: "Bank Operating Account", type: "ASSET" as const },
    { code: "1020", name: "bKash Merchant Balance", type: "ASSET" as const },
    { code: "1050", name: "Accounts Receivable", type: "ASSET" as const },
    { code: "1100", name: "Merchandise Inventory", type: "ASSET" as const },
    { code: "2001", name: "Accounts Payable", type: "LIABILITY" as const },
    { code: "2050", name: "VAT Payable (Mushak-6.3)", type: "LIABILITY" as const },
    { code: "3001", name: "Owner Capital", type: "EQUITY" as const },
    { code: "4001", name: "Retail POS Sales Revenue", type: "REVENUE" as const },
    { code: "5001", name: "Cost of Goods Sold (COGS)", type: "EXPENSE" as const },
    { code: "5100", name: "Salaries & Wages Expense", type: "EXPENSE" as const },
  ];

  await prisma.chartOfAccount.createMany({
    data: defaultAccounts.map((acc) => ({
      ...acc,
      organizationId: orgId,
      isSystem: true,
      balance: 0,
    })),
    skipDuplicates: true,
  });
}
