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

console.log("\nChecking modified hook files...");
const hooks = [
  "src/components/products/useProductsState.ts",
  "src/components/customers/useCustomers.ts",
  "src/components/pos/payment/usePaymentCheckout.ts",
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
