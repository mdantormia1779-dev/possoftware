import React from "react";
import { Store, MapPin, ChevronDown } from "lucide-react";
import { POPULAR_CITIES } from "./registerData";

interface RegisterBranchCityFieldsProps {
  branchName: string;
  setBranchName: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  error?: string;
  onClearError: () => void;
}

export function RegisterBranchCityFields({
  branchName,
  setBranchName,
  city,
  setCity,
  error,
  onClearError,
}: RegisterBranchCityFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-foreground">Initial Branch Name *</label>
        <div className="relative">
          <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            required
            placeholder="e.g. Banani Branch"
            value={branchName}
            onChange={(e) => {
              setBranchName(e.target.value);
              if (error) onClearError();
            }}
            className={`w-full h-10 pl-10 pr-3 text-xs rounded-xl border bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs ${
              error ? "border-rose-500 ring-1 ring-rose-500/30" : "border-border/80"
            }`}
          />
        </div>
        {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-foreground">City / Location</label>
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-10 pl-10 pr-9 text-xs rounded-xl border border-border/80 bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs appearance-none cursor-pointer"
          >
            {POPULAR_CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
