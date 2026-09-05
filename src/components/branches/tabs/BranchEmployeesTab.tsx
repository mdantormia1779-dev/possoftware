import React from "react";

export function BranchEmployeesTab() {
  const staff = [
    { name: "Kazi Farhan", role: "Floor Supervisor • Day Shift", status: "Present (09:12 AM)", isPresent: true },
    { name: "Nasrin Sultana", role: "Cashier 1 • Morning Shift", status: "Present (08:58 AM)", isPresent: true },
    { name: "Md. Rubel Hossain", role: "Inventory Clerk", status: "Present (09:05 AM)", isPresent: true },
    { name: "Sharmin Akter", role: "Sales Executive", status: "On Leave", isPresent: false },
  ];

  return (
    <div className="space-y-3 text-xs">
      <h4 className="font-bold text-foreground">Branch Staff Roster & Daily Attendance</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {staff.map((s, idx) => (
          <div key={idx} className="p-3 rounded-2xl border border-border bg-card flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground">{s.name}</p>
              <p className="text-[11px] text-muted-foreground">{s.role}</p>
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                s.isPresent
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-amber-500/10 text-amber-600"
              }`}
            >
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
