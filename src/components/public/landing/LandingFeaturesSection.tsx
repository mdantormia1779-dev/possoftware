import React from "react";
import {
  BarChart3,
  Box,
  Clock,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Clock,
    title: "Save Time",
    description:
      "Ring up sales in seconds and automate the busywork so your team can focus on customers, not admin.",
  },
  {
    icon: TrendingUp,
    title: "Increase Sales",
    description:
      "Smart upsell prompts, bundle suggestions and loyalty tools that lift average order value every day.",
  },
  {
    icon: Box,
    title: "Manage Inventory",
    description:
      "Live stock counts across every location, with low-stock alerts before you ever run out.",
  },
  {
    icon: Users,
    title: "Track Customers",
    description:
      "Build rich customer profiles, purchase history and loyalty points that keep people coming back.",
  },
  {
    icon: BarChart3,
    title: "Smart Reports",
    description:
      "Understand revenue, margins and best sellers with dashboards that update in real time.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "PCI-compliant checkout with cards, wallets and contactless payments, all fully encrypted.",
  },
];

export function LandingFeaturesSection() {
  return (
    <section
      id="features"
      className="relative bg-white py-16 sm:py-20 lg:py-24 dark:bg-[#070b14]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-blue-600 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            WHY POS BUSINESS OS
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Everything You Need to Run Your Business
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            One platform that replaces the tangle of tools, spreadsheets and
            registers holding your business back.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-6 transition-colors hover:border-blue-200 dark:border-slate-800 dark:bg-[#0d1424] dark:hover:border-blue-900"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-8 text-base font-semibold text-slate-950 dark:text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}