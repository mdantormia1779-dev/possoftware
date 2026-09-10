const { req } = require("./helpers");

function getHrFolder() {
  return {
    name: "8. HR & Payroll (এইচআর ও কর্মকর্তা)",
    item: [
      req("Get Employees", "GET", "/api/hr/employees"),
      req("Create Employee", "POST", "/api/hr/employees", {
        body: {
          employeeId: "EMP-101",
          name: "Sabbir Hossain",
          email: "sabbir@rahmanfashion.com.bd",
          phone: "01766666666",
          department: "Sales",
          designation: "Junior Cashier",
          salary: 18000,
        },
      }),
      req("Get Attendance", "GET", "/api/hr/attendance"),
      req("Mark Attendance", "POST", "/api/hr/attendance", {
        body: { employeeId: "{{employeeId}}", status: "PRESENT" },
      }),
      req("Get Leave Requests", "GET", "/api/hr/leaves"),
      req("Get Payroll", "GET", "/api/hr/payroll"),
    ],
  };
}

module.exports = { getHrFolder };
