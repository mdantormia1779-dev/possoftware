const COMPANIES = [
  "NorthPeak Retail",
  "Urban Table",
  "FreshCart",
  "MediPlus",
  "Vogue Thread",
  "Volt Electronics",
];

export default function LandingTrustedBySection() {
  return (
    <section className="border-y border-slate-200/70 bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          Trusted by growing businesses
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-4">
          {COMPANIES.map((name) => (
            <li
              key={name}
              className="text-base font-semibold text-slate-400 sm:text-lg"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}