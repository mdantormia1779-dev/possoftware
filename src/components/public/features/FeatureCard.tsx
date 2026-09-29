import type { Feature } from "./features-content";

export function FeatureCard({ icon: Icon, title, desc }: Feature) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-blue-500/40">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 text-blue-500 dark:bg-blue-500/15 dark:text-blue-300">
        <Icon className="h-4 w-4" />
      </span>
      <h3 className="mt-5 text-sm font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}