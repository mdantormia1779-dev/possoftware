const fs = require("fs");
const path = require("path");

let hasViolation = false;

function checkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      checkDir(full);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      const content = fs.readFileSync(full, "utf8");
      const lines = content.split("\n").length;
      console.log(`${full}: ${lines} lines`);
      if (lines > 100) {
        console.error(`🚨 VIOLATION: ${full} has ${lines} lines (>100)!`);
        hasViolation = true;
      }
    }
  }
}

console.log("Checking API routes in src/app/api...");
checkDir("src/app/api");

console.log("\nChecking API services in src/services...");
checkDir("src/services");

console.log("\nChecking subscription components...");
checkDir("src/components/subscription");

console.log("\nChecking super-admin settings and billing...");
checkDir("src/components/super-admin/settings");
checkDir("src/components/super-admin/billing");

console.log("\nChecking notification components...");
checkDir("src/components/notifications");
checkDir("src/components/ui/notifications");

console.log("\nChecking modified hook files...");
const hooks = [
  "src/components/products/useProductsState.ts",
  "src/components/customers/useCustomers.ts",
  "src/components/pos/payment/usePaymentCheckout.ts",
  "src/app/app/subscription/checkout/page.tsx",
  "src/app/super-admin/settings/page.tsx",
  "src/app/super-admin/billing/page.tsx",
  "src/components/dashboard/DashboardAlertsWidget.tsx",
  "src/components/dashboard/OwnerDashboard.tsx",
  "src/components/dashboard/BranchManagerDashboard.tsx",
  "src/components/dashboard/AccountantDashboard.tsx",
  "src/components/dashboard/CashierDashboard.tsx",
  "src/components/dashboard/StaffDashboard.tsx",
  "src/components/layout/admin/SuperAdminHeader.tsx",
  "src/components/layout/SuperAdminShell.tsx",
  "src/lib/context/useNotificationState.ts",
  "src/lib/context/TenantContext.tsx",
  "src/data/mocks/platformPayments.ts",
  "src/components/super-admin/SuperAdminHeader.tsx",
  "src/components/layout/admin/SuperAdminNav.ts",
];

for (const f of hooks) {
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, "utf8");
    const l = c.split("\n").length;
    console.log(`${f}: ${l} lines`);
    if (l > 100) {
      console.error(`🚨 VIOLATION: ${f} has ${l} lines (>100)!`);
      hasViolation = true;
    }
  }
}

if (hasViolation) {
  process.exit(1);
} else {
  console.log("\n✅ ALL VERIFIED FILES STRICTLY UNDER 100 LINES!");
}
