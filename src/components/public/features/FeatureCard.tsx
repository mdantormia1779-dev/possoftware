import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  number: number;
  icon: LucideIcon;
  title: string;
  desc: string;
}

export function FeatureCard({ number, icon: Icon, title, desc }: FeatureCardProps) {
  return (
    <div className="group p-6 rounded-2xl border border-border bg-card shadow-xs hover:shadow-md transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-700 hover:-translate-y-0.5 flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950 transition-colors">
          <Icon className="h-6 w-6" />
        </div>
        <span className="text-xs font-semibold text-muted-foreground/40">
          {String(number).padStart(2, "0")}
        </span>
      </div>
      <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
      <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}