const { req } = require("./helpers");

const saveProductTests = [
  "const res = pm.response.json();",
  "if (res && res.data && res.data.id) {",
  "    pm.collectionVariables.set('productId', res.data.id);",
  "    pm.environment.set('productId', res.data.id);",
  "}",
];

function getProductsFolder() {
  return {
    name: "3. Products & Categories (পণ্য ও ক্যাটাগরি)",
    item: [
      req("Get All Products", "GET", "/api/products"),
      req("Search Products (by query)", "GET", "/api/products", {
        query: [{ key: "q", value: "shirt" }],
      }),
      req("Create Product", "POST", "/api/products", {
        body: {
          name: "Cotton Casual Shirt",
          nameBn: "কটন ক্যাজুয়াল শার্ট",
          sku: "SHIRT-001",
          barcode: "89411001",
          purchasePrice: 650,
          sellingPrice: 1200,
          taxRate: 5,
          minStockAlert: 10,
          initialStock: 40,
        },
        tests: saveProductTests,
      }),
      req("Get Product by ID", "GET", "/api/products/{{productId}}"),
      req("Update Product", "PUT", "/api/products/{{productId}}", {
        body: { sellingPrice: 1250, minStockAlert: 12 },
      }),
      req("Scan Barcode", "GET", "/api/products/barcode", {
        query: [{ key: "code", value: "89411001" }],
      }),
      req("Get All Categories", "GET", "/api/categories"),
      req("Create Category", "POST", "/api/categories", {
        body: { name: "Men's Fashion" },
      }),
    ],
  };
}

module.exports = { getProductsFolder };
