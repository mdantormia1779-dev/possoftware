export function calculatePlanMix(orgs: Array<{ subscriptionPlan: string }>) {
  const counts: Record<string, number> = { STARTER: 0, BUSINESS: 0, ENTERPRISE: 0 };
  for (const org of orgs) {
    const key = (org.subscriptionPlan || "STARTER").toUpperCase();
    counts[key] = (counts[key] || 0) + 1;
  }

  return [
    { name: "Business (৳6,999/mo)", value: counts.BUSINESS || 0, color: "#6366f1" },
    { name: "Starter (৳2,999/mo)", value: counts.STARTER || 0, color: "#10b981" },
    { name: "Enterprise (৳14,999/mo)", value: counts.ENTERPRISE || 0, color: "#a855f7" },
  ];
}

export function calculateEstimatedMrr(orgs: Array<{ subscriptionPlan: string; subscriptionStatus: string }>) {
  const prices: Record<string, number> = { STARTER: 2999, BUSINESS: 6999, ENTERPRISE: 14999 };
  let mrr = 0;
  for (const org of orgs) {
    if (org.subscriptionStatus !== "CANCELLED" && org.subscriptionStatus !== "EXPIRED") {
      const plan = (org.subscriptionPlan || "STARTER").toUpperCase();
      mrr += prices[plan] || 2999;
    }
  }
  return mrr;
}

export function buildMonthlyRevenue(sales: Array<{ grandTotal: number | any; createdAt: Date }>) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  const result: Array<{ month: string; mrr: number; salesCount: number }> = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const mName = months[d.getMonth()];
    const mSales = sales.filter((s) => {
      const sDate = new Date(s.createdAt);
      return sDate.getFullYear() === d.getFullYear() && sDate.getMonth() === d.getMonth();
    });

    const sum = mSales.reduce((acc, curr) => acc + Number(curr.grandTotal || 0), 0);
    result.push({ month: mName, mrr: sum, salesCount: mSales.length });
  }

  return result;
}
