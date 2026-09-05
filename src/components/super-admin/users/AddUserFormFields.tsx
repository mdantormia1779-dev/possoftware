"use client";

import React from "react";
import { PlatformUser } from "./userTypes";

interface AddUserFormFieldsProps {
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  role: PlatformUser["role"];
  setRole: (v: PlatformUser["role"]) => void;
  org: string;
  setOrg: (v: string) => void;
}

export function AddUserFormFields({
  name,
  setName,
  email,
  setEmail,
  role,
  setRole,
  org,
  setOrg,
}: AddUserFormFieldsProps) {
  return (
    <>
      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Full Name</label>
        <input
          type="text"
          required
          placeholder="e.g. Tanvir Ahmed"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-9 px-3 rounded-xl border border-border bg-background text-foreground"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Email Address</label>
        <input
          type="email"
          required
          placeholder="tanvir@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-9 px-3 rounded-xl border border-border bg-background text-foreground"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="w-full h-9 px-3 rounded-xl border border-border bg-background text-foreground"
        >
          <option value="owner">Company Owner</option>
          <option value="manager">Branch Manager</option>
          <option value="accountant">Accountant</option>
          <option value="cashier">Cashier / Sales Staff</option>
          <option value="super_admin">Super Admin (Platform Staff)</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Assign Organization</label>
        <select
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          className="w-full h-9 px-3 rounded-xl border border-border bg-background text-foreground"
        >
          <option value="Rahman Fashion Ltd.">Rahman Fashion Ltd.</option>
          <option value="Noor Grocery & Super Shop">Noor Grocery & Super Shop</option>
          <option value="Sylhet Electronics Hub">Sylhet Electronics Hub</option>
          <option value="Green Pharmacy & Surgicals">Green Pharmacy & Surgicals</option>
          <option value="XYZ Business OS Platform">XYZ Business OS Platform</option>
        </select>
      </div>
    </>
  );
}
