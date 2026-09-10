const { req } = require("./helpers");

function getOrgFolder() {
  return {
    name: "9. Organization & Settings (প্রতিষ্ঠান ও শাখা)",
    item: [
      req("Get Organization Details", "GET", "/api/organization"),
      req("Get Branches List", "GET", "/api/branches"),
      req("Create Branch", "POST", "/api/branches", {
        body: {
          name: "Uttara Branch",
          code: "BR-UTR-02",
          address: "Sector 3, Uttara",
          city: "Dhaka",
          phone: "01788888888",
        },
      }),
      req("Get Coupons", "GET", "/api/marketing/coupons"),
      req("Create Coupon", "POST", "/api/marketing/coupons", {
        body: {
          code: "EID50",
          type: "PERCENTAGE",
          discount: 10,
          minPurchase: 1000,
          validUntil: "2026-12-31T23:59:59.000Z",
        },
      }),
      req("Get Marketing Campaigns", "GET", "/api/marketing/campaigns"),
      req("Get Audit Logs", "GET", "/api/audit-logs"),
      req("Get Notifications", "GET", "/api/notifications"),
    ],
  };
}

module.exports = { getOrgFolder };
