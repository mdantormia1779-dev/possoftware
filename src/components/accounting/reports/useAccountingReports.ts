import { storageService } from "@/lib/services/storage";

export function useAccountingReports() {
  const accounts = storageService.getAccounts();

  // P&L Metrics
  const grossSales = accounts.find((a) => a.code === "4010")?.balance || 1845000;
  const discounts = accounts.find((a) => a.code === "4020")?.balance || -38500;
  const netSalesRevenue = grossSales + discounts;
  const cogs = accounts.find((a) => a.code === "5010")?.balance || 980000;
  const grossProfit = netSalesRevenue - cogs;

  const staffSalaryExpense = accounts.find((a) => a.code === "5020")?.balance || 310000;
  const commissionsExpense = accounts.find((a) => a.code === "5030")?.balance || 42500;
  const rentExpense = accounts.find((a) => a.code === "5040")?.balance || 180000;
  const utilitiesExpense = accounts.find((a) => a.code === "5050")?.balance || 35000;
  const marketingExpense = accounts.find((a) => a.code === "5060")?.balance || 12500;
  const totalOperatingExpenses =
    staffSalaryExpense + commissionsExpense + rentExpense + utilitiesExpense + marketingExpense;
  const netOperatingIncome = grossProfit - totalOperatingExpenses;

  // Balance Sheet Metrics
  const cashAndBanks = 64200 + 142800 + 58500 + 845000;
  const accountsReceivable = 74500;
  const inventoryAsset = 2960000;
  const totalCurrentAssets = cashAndBanks + accountsReceivable + inventoryAsset;

  const accountsPayable = 63500;
  const taxPayable = 24800;
  const accruedSalaries = 165000;
  const totalLiabilities = accountsPayable + taxPayable + accruedSalaries;

  const ownerEquity = 3500000;
  const retainedEarnings = totalCurrentAssets - totalLiabilities - ownerEquity;
  const totalLiabilitiesAndEquity = totalLiabilities + ownerEquity + retainedEarnings;

  return {
    accounts,
    pnl: {
      grossSales,
      discounts,
      netSalesRevenue,
      cogs,
      grossProfit,
      staffSalaryExpense,
      commissionsExpense,
      rentExpense,
      utilitiesExpense,
      marketingExpense,
      totalOperatingExpenses,
      netOperatingIncome,
    },
    balanceSheet: {
      cashAndBanks,
      accountsReceivable,
      inventoryAsset,
      totalCurrentAssets,
      accountsPayable,
      taxPayable,
      accruedSalaries,
      ownerEquity,
      retainedEarnings,
      totalLiabilitiesAndEquity,
    },
  };
}
