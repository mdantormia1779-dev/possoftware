const { req } = require("./helpers");

function getInventoryFolder() {
  return {
    name: "6. Inventory & Purchases (ইনভেন্টরি ও ক্রয়)",
    item: [
      req("Get Stock Levels", "GET", "/api/inventory/stock"),
      req("Get Stock Transfers", "GET", "/api/inventory/transfers"),
      req("Create Stock Transfer", "POST", "/api/inventory/transfers", {
        body: {
          fromBranchId: "{{branchId}}",
          toBranchId: "{{targetBranchId}}",
          notes: "Transfer between branches",
          items: [{ productId: "{{productId}}", quantity: 5 }],
        },
      }),
      req("Get Suppliers List", "GET", "/api/suppliers"),
      req("Create Supplier", "POST", "/api/suppliers", {
        body: {
          name: "Apex Textile Mills",
          contactPerson: "Rafiq Chowdhury",
          phone: "01755555555",
          email: "supplier@apextextiles.com",
          address: "Tejgaon Industrial Area, Dhaka",
        },
      }),
      req("Get Purchases List", "GET", "/api/purchases"),
      req("Create Purchase Order", "POST", "/api/purchases", {
        body: {
          supplierId: "{{supplierId}}",
          paidAmount: 5000,
          notes: "Seasonal restock",
          items: [{ productId: "{{productId}}", quantity: 20, unitCost: 650 }],
        },
      }),
    ],
  };
}

module.exports = { getInventoryFolder };
