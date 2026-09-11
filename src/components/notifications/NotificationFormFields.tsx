"use client";

import React from "react";

interface NotificationFormFieldsProps {
  title: string;
  setTitle: (val: string) => void;
  type: string;
  setType: (val: string) => void;
  targetRole: string;
  setTargetRole: (val: string) => void;
  message: string;
  setMessage: (val: string) => void;
  link: string;
  setLink: (val: string) => void;
}

export function NotificationFormFields({
  title, setTitle, type, setType, targetRole, setTargetRole, message, setMessage, link, setLink,
}: NotificationFormFieldsProps) {
  return (
    <div className="space-y-3 text-xs">
      <div>
        <label className="font-bold text-foreground block mb-1">Title *</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Flash Sale Live / Restock Required"
          className="w-full h-9 px-3 rounded-xl border border-border bg-background font-medium"
        />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="font-bold text-foreground block mb-1">Category</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full h-9 px-2.5 rounded-xl border border-border bg-background font-medium"
          >
            <option value="info">General Info</option>
            <option value="warning">Warning / Alert</option>
            <option value="success">Success</option>
            <option value="low_stock">Low Stock</option>
            <option value="sale_completed">Sale / Order</option>
            <option value="payroll">Payroll / Salary</option>
            <option value="sync_alert">Sync / System</option>
          </select>
        </div>
        <div>
          <label className="font-bold text-foreground block mb-1">Target Role</label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full h-9 px-2.5 rounded-xl border border-border bg-background font-medium"
          >
            <option value="all">All Roles (Broadcast)</option>
            <option value="company_owner">Company Owner</option>
            <option value="branch_manager">Branch Manager</option>
            <option value="accountant">Accountant</option>
            <option value="cashier">Cashier</option>
            <option value="staff">Staff / Floor</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
      </div>
      <div>
        <label className="font-bold text-foreground block mb-1">Message *</label>
        <textarea
          rows={3}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Detailed alert message for users..."
          className="w-full p-2.5 rounded-xl border border-border bg-background leading-relaxed"
        />
      </div>
      <div>
        <label className="font-bold text-foreground block mb-1">Action Link (Optional)</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="e.g. /app/inventory"
          className="w-full h-9 px-3 rounded-xl border border-border bg-background font-mono text-[11px]"
        />
      </div>
    </div>
  );
}
