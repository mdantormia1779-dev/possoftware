import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export function FeatureCard({ icon: Icon, title, desc }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-card shadow-xs hover:shadow-md transition-all hover:border-indigo-300 dark:hover:border-indigo-700 flex flex-col justify-between">
      <div>
        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 w-fit mb-4">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
