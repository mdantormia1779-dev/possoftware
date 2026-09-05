import React from "react";

interface RbacPermissionToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function RbacPermissionToggle({
  label,
  description,
  checked,
  onChange,
}: RbacPermissionToggleProps) {
  return (
    <label className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-muted/30 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 rounded border-border text-indigo-600 focus:ring-indigo-500"
      />
      <div>
        <p className="font-bold text-foreground">{label}</p>
        <p className="text-[11px] text-muted-foreground">{description}</p>
      </div>
    </label>
  );
}
