import { Quote, Star } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  /** Optional photo URL (e.g. "/avatars/amara.jpg"). Falls back to initials. */
  avatar?: string;
  rating?: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We cut our checkout time in half and finally have stock numbers we can trust. The reporting alone paid for the subscription in the first month.",
    name: "Amara Okafor",
    role: "Owner, Vogue Thread Boutique",
  },
  {
    quote:
      "Orders flow straight to the kitchen and split bills take seconds. Our team learned it in an afternoon and never looked back.",
    name: "Daniel Reyes",
    role: "General Manager, Urban Table Restaurant",
  },
  {
    quote:
      "Managing three stores from one dashboard changed everything. I can see every location on my phone before I even leave the house.",
    name: "Priya Nair",
    role: "Founder, FreshCart Grocery",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function LandingTestimonialsSection() {
  return (
    <section className="bg-slate-50 py-20 dark:bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Loved by Business Owners Everywhere
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Real stories from real businesses that run their day on POS Business
            OS.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => {
            const rating = t.rating ?? 5;

            return (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <Quote
                  className="h-7 w-7 fill-blue-200 text-blue-300 dark:fill-blue-900 dark:text-blue-800"
                  aria-hidden="true"
                />

                <div
                  className="mt-3 flex gap-0.5"
                  role="img"
                  aria-label={`${rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating
                          ? "fill-teal-500 text-teal-500"
                          : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700"
                      }`}
                    />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                  {t.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    >
                      {initials(t.name)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {t.name}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {t.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}