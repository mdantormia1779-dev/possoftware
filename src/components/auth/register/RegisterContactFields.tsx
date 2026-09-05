import React from "react";
import { User, Mail } from "lucide-react";

interface RegisterContactFieldsProps {
  ownerName: string;
  setOwnerName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  errors: { [key: string]: string };
  clearError: (field: string) => void;
}

export function RegisterContactFields({
  ownerName,
  setOwnerName,
  email,
  setEmail,
  phone,
  setPhone,
  errors,
  clearError,
}: RegisterContactFieldsProps) {
  return (
    <>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-foreground">Owner Full Name *</label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            required
            placeholder="e.g. Tanzim Ahmed"
            value={ownerName}
            onChange={(e) => {
              setOwnerName(e.target.value);
              if (errors.ownerName) clearError("ownerName");
            }}
            className={`w-full h-10 pl-10 pr-3 text-xs rounded-xl border bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs ${
              errors.ownerName ? "border-rose-500 ring-1 ring-rose-500/30" : "border-border/80"
            }`}
          />
        </div>
        {errors.ownerName && <p className="text-[11px] text-rose-500 font-medium">{errors.ownerName}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">Work Email Address *</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="email"
              required
              placeholder="owner@domain.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) clearError("email");
              }}
              className={`w-full h-10 pl-10 pr-3 text-xs rounded-xl border bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs ${
                errors.email ? "border-rose-500 ring-1 ring-rose-500/30" : "border-border/80"
              }`}
            />
          </div>
          {errors.email && <p className="text-[11px] text-rose-500 font-medium">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">Mobile Phone (Bangladesh) *</label>
          <div className="flex rounded-xl border border-border/80 overflow-hidden bg-card focus-within:ring-2 focus-within:ring-indigo-500/50 shadow-subtle-xs">
            <span className="px-3 bg-muted/40 text-muted-foreground font-bold text-xs flex items-center border-r border-border/80 select-none">
              +880
            </span>
            <input
              type="tel"
              required
              placeholder="01711-xxxxxx"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) clearError("phone");
              }}
              className="flex-1 h-10 px-3 text-xs bg-transparent font-mono text-foreground focus:outline-none"
            />
          </div>
          {errors.phone && <p className="text-[11px] text-rose-500 font-medium">{errors.phone}</p>}
        </div>
      </div>
    </>
  );
}
