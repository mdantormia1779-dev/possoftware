"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

type Faq = { question: string; answer: string };

// Only the first answer was visible in the design; edit the rest to match your product.
const FAQS: Faq[] = [
  {
    question: "Do I need special hardware to get started?",
    answer:
      "No. POS Business OS runs on the devices you already own, from a tablet to a laptop. If you do want a dedicated terminal, barcode scanner or receipt printer, we support the most popular models out of the box.",
  },
  {
    question: "Can I run more than one store from one account?",
    answer:
      "Yes. The Business plan covers up to 3 branches, and the Enterprise plan has unlimited branches and outlets. You can see every location from one dashboard.",
  },
  {
    question: "Does the system work without internet?",
    answer:
      "Yes. Offline mode keeps you selling when the connection drops, and your sales sync automatically once you're back online.",
  },
  {
    question: "How long does it take to set up?",
    answer:
      "You can add your products, staff and payment methods and start selling on the same day. Our team is happy to help you get set up if you need it.",
  },
  {
    question: "Is my business data secure?",
    answer:
      "Your data is encrypted and backed up, and staff only see what their role allows. Contact our team if you need details for your own compliance needs.",
  },
];

export default function LandingFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="text-center">
        <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
          FAQ
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Pricing Questions, Answered
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Still unsure? Our team is happy to help you pick the right plan.
        </p>
      </div>

      {/* Accordion */}
      <div className="mt-12 space-y-3">
        {FAQS.map((faq, i) => {
          const open = openIndex === i;
          const buttonId = `${baseId}-q-${i}`;
          const panelId = `${baseId}-a-${i}`;

          return (
            <div
              key={faq.question}
              className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <span className="text-[15px] font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                      open
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>
              </h3>

              {/* Height animates from 0fr to 1fr without measuring content */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}