"use client";

import React from "react";
import { Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface UserHeaderProps {
  onAddUser: () => void;
}

export function UserHeader({ onAddUser }: UserHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2.5">
          <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <span>Platform User Directory</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Master database of all tenant owners, branch managers, cashiers, and system administrators
        </p>
      </div>

      <Button
        onClick={onAddUser}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs gap-2 shadow-sm"
      >
        <Plus className="h-4 w-4" /> Add Platform User
      </Button>
    </div>
  );
}
