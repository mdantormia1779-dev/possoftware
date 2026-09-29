import { HERO } from "./contact-data";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-slate-900 dark:bg-[#131a25]">
      {/* soft glow blobs */}
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          {HERO.badge}
        </span>

        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {HERO.title}
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">
          {HERO.subtitle}
        </p>
      </div>
    </section>
  );
}