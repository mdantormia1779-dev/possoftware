import React from "react";
import { Sparkles } from "lucide-react";
import { UserRole } from "@/lib/types";
import { DEMO_PERSONAS } from "./loginData";

interface LoginDemoPersonasProps {
  isLoading: boolean;
  activeRoleLoading: string | null;
  onSelectPersona: (role: UserRole, email: string, targetRoute: string) => void;
}

export function LoginDemoPersonas({
  isLoading,
  activeRoleLoading,
  onSelectPersona,
}: LoginDemoPersonasProps) {
  return (
    <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2.5 shadow-subtle-xs backdrop-blur-sm">
      <div className="text-[11px] font-bold text-primary flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
          <span>Interactive Demo: 1-Click Role Login</span>
        </div>
        <span className="text-[10px] text-muted-foreground font-medium">Click to jump</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {DEMO_PERSONAS.map((persona) => {
          const Icon = persona.icon;
          const isSelected = activeRoleLoading === persona.role;

          return (
            <button
              key={persona.role}
              type="button"
              disabled={isLoading || activeRoleLoading !== null}
              onClick={() =>
                onSelectPersona(persona.role, persona.email, persona.targetRoute)
              }
              className="p-2.5 rounded-lg bg-card border border-border font-medium text-foreground text-left shadow-subtle-xs hover:border-primary/40 hover:shadow-subtle-sm transition-all flex items-center justify-between gap-1.5 active:scale-95 disabled:opacity-70"
            >
              <div className="flex items-center gap-2 truncate">
                <Icon className={`h-4 w-4 ${persona.colorClass} shrink-0`} />
                <span className="truncate text-xs font-semibold">{persona.title}</span>
              </div>
              {isSelected && (
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
