const { req } = require("./helpers");

const saveCustomerTests = [
  "const res = pm.response.json();",
  "if (res && res.data && res.data.id) {",
  "    pm.collectionVariables.set('customerId', res.data.id);",
  "    pm.environment.set('customerId', res.data.id);",
  "}",
];

function getCustomersFolder() {
  return {
    name: "5. Customers & Loyalty (গ্রাহক ও লয়্যালটি)",
    item: [
      req("Get Customers List", "GET", "/api/customers"),
      req("Search Customer (phone/name)", "GET", "/api/customers", {
        query: [{ key: "q", value: "017" }],
      }),
      req("Create Customer", "POST", "/api/customers", {
        body: {
          name: "Mohammad Tanvir",
          phone: "01711223344",
          email: "tanvir@example.com",
          address: "Dhanmondi, Dhaka",
          creditLimit: 50000,
        },
        tests: saveCustomerTests,
      }),
      req("Get Customer By ID", "GET", "/api/customers/{{customerId}}"),
      req("Get Loyalty Program", "GET", "/api/loyalty"),
      req("Configure Loyalty Program", "POST", "/api/loyalty", {
        body: { pointsPerHundred: 1, minRedeemPoints: 100, pointValue: 1 },
      }),
    ],
  };
}

module.exports = { getCustomersFolder };
