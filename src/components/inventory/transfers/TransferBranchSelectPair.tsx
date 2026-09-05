import React from "react";
import { Branch } from "@/types";

interface TransferBranchSelectPairProps {
  branches: Branch[];
  sourceBranchId: string;
  setSourceBranchId: (id: string) => void;
  destBranchId: string;
  setDestBranchId: (id: string) => void;
}

export function TransferBranchSelectPair({
  branches,
  sourceBranchId,
  setSourceBranchId,
  destBranchId,
  setDestBranchId,
}: TransferBranchSelectPairProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Source Branch</label>
        <select
          value={sourceBranchId}
          onChange={(e) => setSourceBranchId(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {branches.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="font-semibold text-foreground">Destination Branch</label>
        <select
          value={destBranchId}
          onChange={(e) => setDestBranchId(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        >
          {branches.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
