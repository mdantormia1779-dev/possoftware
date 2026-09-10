const { req } = require("./helpers");

function getAccountingFolder() {
  return {
    name: "7. Accounting & Finance (অ্যাকাউন্টিং ও অর্থ)",
    item: [
      req("Get Chart of Accounts", "GET", "/api/accounting/accounts"),
      req("Create Account", "POST", "/api/accounting/accounts", {
        body: { code: "1050", name: "Petty Cash Dhaka", type: "ASSET", balance: 5000 },
      }),
      req("Get Transactions", "GET", "/api/accounting/transactions"),
      req("Create Transaction", "POST", "/api/accounting/transactions", {
        body: {
          accountId: "{{accountId}}",
          type: "EXPENSE",
          amount: 1500,
          description: "Office utility bill payment",
        },
      }),
      req("Get Bank Accounts", "GET", "/api/accounting/banks"),
      req("Get Journal Entries", "GET", "/api/accounting/journals"),
    ],
  };
}

module.exports = { getAccountingFolder };
