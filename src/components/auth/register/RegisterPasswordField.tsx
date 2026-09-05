import React from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { STRENGTH_LABELS, STRENGTH_COLORS } from "./registerData";

interface RegisterPasswordFieldProps {
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  passwordStrength: number;
  error?: string;
  onClearError: () => void;
}

export function RegisterPasswordField({
  password,
  setPassword,
  showPassword,
  setShowPassword,
  passwordStrength,
  error,
  onClearError,
}: RegisterPasswordFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-foreground">Password *</label>
        {password && (
          <span className="text-[11px] font-semibold text-muted-foreground">
            Strength:{" "}
            <span className={passwordStrength >= 3 ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-amber-600 font-bold"}>
              {STRENGTH_LABELS[passwordStrength - 1] || "Very Weak"}
            </span>
          </span>
        )}
      </div>
      <div className="relative">
        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type={showPassword ? "text" : "password"}
          required
          placeholder="At least 6 characters (recommended 8+)"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) onClearError();
          }}
          className={`w-full h-10 pl-10 pr-10 text-xs rounded-xl border bg-card text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-subtle-xs ${
            error ? "border-rose-500 ring-1 ring-rose-500/30" : "border-border/80"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {password && (
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                passwordStrength >= level
                  ? STRENGTH_COLORS[passwordStrength - 1]
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
      )}

      {error && <p className="text-[11px] text-rose-500 font-medium">{error}</p>}
    </div>
  );
}
