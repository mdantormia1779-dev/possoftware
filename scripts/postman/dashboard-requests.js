const { req } = require("./helpers");

function getDashboardFolder() {
  return {
    name: "2. Dashboard & Reports (ড্যাশবোর্ড ও রিপোর্ট)",
    item: [
      req("Get Dashboard Stats", "GET", "/api/dashboard/stats", {
        description: "Returns today sales, total products, low stock count, recent sales.",
      }),
      req("Get Reports", "GET", "/api/reports", {
        query: [{ key: "type", value: "sales" }],
        description: "Fetch comprehensive business sales and performance reports.",
      }),
      req("Super Admin Analytics", "GET", "/api/super-admin/analytics", {
        description: "Platform wide analytics for super admin.",
      }),
      req("Super Admin Plans", "GET", "/api/super-admin/plans"),
      req("Super Admin Organizations", "GET", "/api/super-admin/organizations"),
      req("Super Admin Users", "GET", "/api/super-admin/users"),
    ],
  };
}

module.exports = { getDashboardFolder };
