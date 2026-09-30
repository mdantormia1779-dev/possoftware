import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Cpu,
  Pill,
  Shirt,
  ShoppingBasket,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { SolutionItem } from "./solutionsData";

interface SolutionCardProps {
  solution: SolutionItem;
}

// Line icons like the design. Matched by keyword against the slug/title,
// so "retail", "retail-store" and "Retail Store" all work.
const ICONS: Record<string, LucideIcon> = {
  retail: Store,
  restaurant: UtensilsCrossed,
  grocery: ShoppingBasket,
  pharmacy: Pill,
  fashion: Shirt,
  electronics: Cpu,
};

function pickIcon(solution: SolutionItem): LucideIcon | null {
  const key = `${solution.slug} ${solution.title}`.toLowerCase();
  const match = Object.keys(ICONS).find((k) => key.includes(k));
  return match ? ICONS[match] : null;
}

export function SolutionCard({ solution }: SolutionCardProps) {
  const Icon = pickIcon(solution);

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-blue-300 dark:hover:border-blue-700/70">
      {/* Icon tile */}
      <div
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300"
      >
        {Icon ? (
          <Icon className="h-5 w-5" />
        ) : (
          // Falls back to the emoji from your data if no line icon matches
          <span className="text-2xl leading-none">{solution.icon}</span>
        )}
      </div>

      <h3 className="mt-5 text-base font-semibold text-foreground">
        {solution.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {solution.tagline}
      </p>

      <ul className="mt-5 flex-1 space-y-2 text-sm text-muted-foreground">
        {solution.benefits.map((benefit, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <Check
              className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400"
              strokeWidth={2}
              aria-hidden="true"
            />
            {benefit}
          </li>
        ))}
      </ul>

      <Link
        href={`/solutions/${solution.slug}`}
        className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-400 dark:hover:text-blue-300"
      >
        Explore Solution
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}