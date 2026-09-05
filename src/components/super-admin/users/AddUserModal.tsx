"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PlatformUser } from "./userTypes";
import { AddUserFormFields } from "./AddUserFormFields";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: { name: string; email: string; role: PlatformUser["role"]; org: string }) => void;
}

export function AddUserModal({ isOpen, onClose, onAddUser }: AddUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<PlatformUser["role"]>("manager");
  const [org, setOrg] = useState("Rahman Fashion Ltd.");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    onAddUser({ name, email, role, org });
    setName("");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h3 className="font-extrabold text-base text-foreground">Add Platform / Staff User</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <AddUserFormFields
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            role={role}
            setRole={setRole}
            org={org}
            setOrg={setOrg}
          />

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold">
              Create User
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
