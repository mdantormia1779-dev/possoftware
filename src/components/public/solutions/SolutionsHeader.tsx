export default function SolutionsHeader() {
  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-transparent">
      {/* Soft color glows, top-left (blue) and right (teal) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-300/40 blur-3xl dark:bg-blue-500/20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-200/50 blur-3xl dark:bg-teal-500/15"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
          Industry Solutions
        </span>

        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          POS Solutions Built for Your Business
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          No matter what you sell, POS Business OS adapts to your workflow, your
          products and the way your customers shop.
        </p>
      </div>
    </section>
  );
}