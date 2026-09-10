const { req } = require("./helpers");

const saveSaleTests = [
  "const res = pm.response.json();",
  "if (res && res.data && res.data.id) {",
  "    pm.collectionVariables.set('saleId', res.data.id);",
  "    pm.environment.set('saleId', res.data.id);",
  "}",
];

function getSalesFolder() {
  return {
    name: "4. Sales & POS (বিক্রয় ও পিওএস)",
    item: [
      req("Get Sales List", "GET", "/api/sales"),
      req("Create POS Sale (Checkout)", "POST", "/api/sales", {
        body: {
          paymentMethod: "CASH",
          subtotal: 1200,
          discountAmount: 0,
          taxAmount: 60,
          grandTotal: 1260,
          paidAmount: 1300,
          notes: "Counter sale test",
          items: [
            {
              productId: "{{productId}}",
              quantity: 1,
              unitPrice: 1200,
              subtotal: 1200,
              discountAmount: 0,
              taxAmount: 60,
              totalAmount: 1260,
            },
          ],
        },
        tests: saveSaleTests,
      }),
      req("Get Sale By ID", "GET", "/api/sales/{{saleId}}"),
      req("Create Sale Return", "POST", "/api/sales/returns", {
        body: {
          saleId: "{{saleId}}",
          reason: "Customer size exchange",
          refundAmount: 1260,
          items: [{ productId: "{{productId}}", quantity: 1, refundAmount: 1260 }],
        },
      }),
      req("Get POS Shifts", "GET", "/api/pos/shifts"),
      req("Open POS Shift", "POST", "/api/pos/shifts", {
        body: { openingCash: 5000, notes: "Morning register opening" },
      }),
      req("Get Parked Orders", "GET", "/api/pos/parked"),
    ],
  };
}

module.exports = { getSalesFolder };
