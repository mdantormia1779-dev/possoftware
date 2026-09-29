"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { FORM_CONFIG } from "./contact-data";
import { FormField, inputClass } from "./FormField";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "loading" | "success" | "error";

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
};

function validate(v: FormState): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (v.phone && !/^[+\d][\d\s()-]{6,}$/.test(v.phone)) e.phone = "Enter a valid phone number.";
  if (!v.subject) e.subject = "Please select a subject.";
  if (v.message.trim().length < 10) e.message = "Tell us a bit more (at least 10 characters).";
  return e;
}

export function ContactForm() {
  const { title, text, maxMessageLength, endpoint, subjects } = FORM_CONFIG;

  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setStatus("success");
      setValues(EMPTY);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        <h3 className="mt-4 text-xl font-bold text-foreground">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Thanks for reaching out. Our team will reply within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Full Name" htmlFor="name" error={errors.name}>
            <input
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Jane Cooper"
              autoComplete="name"
              className={inputClass}
            />
          </FormField>
          <FormField label="Email" htmlFor="email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="jane@company.com"
              autoComplete="email"
              className={inputClass}
            />
          </FormField>
          <FormField label="Phone" htmlFor="phone" error={errors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              autoComplete="tel"
              className={inputClass}
            />
          </FormField>
          <FormField label="Company" htmlFor="company" error={errors.company}>
            <input
              id="company"
              name="company"
              value={values.company}
              onChange={handleChange}
              placeholder="Your business name"
              autoComplete="organization"
              className={inputClass}
            />
          </FormField>
        </div>

        <FormField label="Subject" htmlFor="subject" error={errors.subject}>
          <select
            id="subject"
            name="subject"
            value={values.subject}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a subject</option>
            {subjects.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Message" htmlFor="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={maxMessageLength}
            value={values.message}
            onChange={handleChange}
            placeholder="Tell us a little about your business and what you need..."
            className={`${inputClass} resize-none`}
          />
          <p className="text-xs text-muted-foreground">
            {values.message.length}/{maxMessageLength} characters
          </p>
        </FormField>

        {status === "error" && (
          <p role="alert" className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}