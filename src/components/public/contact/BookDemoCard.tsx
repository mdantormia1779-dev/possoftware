import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { DEMO_CARD } from "./contact-data";

export function BookDemoCard() {
  return (
    <div className="rounded-2xl bg-blue-600 p-6 text-white">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/15">
        <CalendarDays className="h-5 w-5" />
      </span>

      <h3 className="mt-5 text-xl font-bold">{DEMO_CARD.title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-blue-100">{DEMO_CARD.text}</p>

      <Link
        href={DEMO_CARD.href}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
      >
        {DEMO_CARD.buttonLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}