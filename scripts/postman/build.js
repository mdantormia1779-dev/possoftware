const fs = require("fs");
const path = require("path");

const { getAuthFolder } = require("./auth-requests");
const { getDashboardFolder } = require("./dashboard-requests");
const { getProductsFolder } = require("./products-requests");
const { getSalesFolder } = require("./sales-requests");
const { getCustomersFolder } = require("./customers-requests");
const { getInventoryFolder } = require("./inventory-requests");
const { getAccountingFolder } = require("./accounting-requests");
const { getHrFolder } = require("./hr-requests");
const { getOrgFolder } = require("./org-requests");

const collection = {
  info: {
    _postman_id: "xyz-pos-collection-2026",
    name: "XYZ Retail OS - Complete API Collection",
    description: "Production-ready Postman collection for XYZ POS / Retail OS with auto-auth handling.",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  variable: [
    { key: "baseUrl", value: "http://localhost:3000", type: "string" },
    { key: "authToken", value: "", type: "string" },
    { key: "organizationId", value: "", type: "string" },
    { key: "branchId", value: "", type: "string" },
    { key: "email", value: "owner@rahmanfashion.com.bd", type: "string" },
    { key: "password", value: "password123", type: "string" },
    { key: "productId", value: "", type: "string" },
    { key: "customerId", value: "", type: "string" },
    { key: "saleId", value: "", type: "string" },
  ],
  item: [
    getAuthFolder(),
    getDashboardFolder(),
    getProductsFolder(),
    getSalesFolder(),
    getCustomersFolder(),
    getInventoryFolder(),
    getAccountingFolder(),
    getHrFolder(),
    getOrgFolder(),
  ],
};

const outputPath = path.join(__dirname, "../../postman/XYZ_POS_API.postman_collection.json");
fs.writeFileSync(outputPath, JSON.stringify(collection, null, 2), "utf8");
console.log("✅ Successfully generated Postman Collection at:", outputPath);
