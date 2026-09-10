const { req } = require("./helpers");

const loginTests = [
  "pm.test('Status is 200', function () {",
  "    pm.response.to.have.status(200);",
  "});",
  "const res = pm.response.json();",
  "if (res && res.data && res.data.token) {",
  "    pm.collectionVariables.set('authToken', res.data.token);",
  "    pm.environment.set('authToken', res.data.token);",
  "}",
  "if (res && res.data && res.data.organization) {",
  "    pm.collectionVariables.set('organizationId', res.data.organization.id);",
  "    pm.environment.set('organizationId', res.data.organization.id);",
  "}",
  "if (res && res.data && res.data.branch) {",
  "    pm.collectionVariables.set('branchId', res.data.branch.id);",
  "    pm.environment.set('branchId', res.data.branch.id);",
  "}",
];

function getAuthFolder() {
  return {
    name: "1. Authentication (লগইন ও ইউজার)",
    item: [
      req("Login (Auto-saves Token & Org)", "POST", "/api/auth/login", {
        noAuth: true,
        body: { emailOrPhone: "{{email}}", password: "{{password}}" },
        tests: loginTests,
        description: "Logs in user, automatically sets {{authToken}}, {{organizationId}}, and {{branchId}}.",
      }),
      req("Current User (Me)", "GET", "/api/auth/me", {
        description: "Returns currently authenticated user profile and tenant details.",
      }),
      req("Register User", "POST", "/api/auth/register", {
        noAuth: true,
        body: {
          name: "Test Manager",
          email: "testmanager@example.com",
          password: "password123",
          phone: "01799999999",
          businessName: "Test Superstore",
        },
      }),
      req("Logout", "POST", "/api/auth/logout"),
    ],
  };
}

module.exports = { getAuthFolder };
