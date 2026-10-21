"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Phone, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EMPTY_ENQUIRY,
  ENQUIRY_LIMITS,
  composeEnquiry,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryFields,
  type EnquiryResponse,
} from "@/lib/enquiry";
import { CAN_PREFILL, DEFAULT_WHATSAPP_MESSAGE, whatsappHref } from "@/lib/whatsapp";
import { SITE, telHref } from "@/lib/site";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

/*
  Enquiry form → POST /api/enquiry → Supabase (`enquiries` table).
  Validates in the browser with the same rules as the server, then submits. If the
  server can't take it (not configured, offline, rate-limited), the visitor keeps what
  they typed and can send it on WhatsApp, by email or call instead — no dead ends.
  Analytics only ever receive event names, never the message or contact details.
*/

type Status = "idle" | "sending" | "success" | "error";
type ErrorKind = Exclude<EnquiryResponse, { ok: true }>["error"] | "network";

const DRAFT_KEY = "swc-enquiry-draft";

const ERROR_COPY: Record<ErrorKind, string> = {
  invalid: "Please check the highlighted fields and try again.",
  too_fast: "That was quick! Please check your details and press Submit again.",
  rate_limited: "You've sent a few enquiries in a short time. Please wait a few minutes — or reach us on WhatsApp or by phone right now.",
  not_configured: "Online submissions aren't switched on yet. Your message is still here — send it on WhatsApp or by email instead, or give us a call.",
  failed: "We couldn't save your enquiry just now. Your message is still here — send it on WhatsApp or by email instead, or give us a call.",
  network: "You seem to be offline. Your message is still here — try again when you're connected, or send it on WhatsApp or by email.",
};

export function EnquiryForm({
  services,
  source = "contact",
  submitLabel = "Submit enquiry",
  className,
}: {
  services: { slug: string; title: string }[];
  /** Where the form lives (stored with the enquiry), e.g. "contact", "404", "consultation". */
  source?: string;
  submitLabel?: string;
  className?: string;
}) {
  const uid = useId();
  const [fields, setFields] = useState<EnquiryFields>(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<ErrorKind | null>(null);
  const [copied, setCopied] = useState(false);
  const [sentName, setSentName] = useState("");
  const startedAt = useRef(0);
  const hp = useRef<HTMLInputElement>(null);
  const started = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);
  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    website: useRef<HTMLInputElement>(null),
    service: useRef<HTMLSelectElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  // Restore / persist a draft for this tab only (storage may be unavailable).
  useEffect(() => {
    startedAt.current = Date.now();
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) setFields({ ...EMPTY_ENQUIRY, ...JSON.parse(raw) });
    } catch {}
  }, []);
  useEffect(() => {
    if (status === "success") return;
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(fields));
    } catch {}
  }, [fields, status]);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = (k: keyof EnquiryFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (!started.current) {
      started.current = true;
      track("contact_form_started", { location: source });
    }
    setFields((f) => ({ ...f, [k]: value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function focusFirst(errs: EnquiryErrors) {
    const first = (Object.keys(EMPTY_ENQUIRY) as (keyof EnquiryFields)[]).find((k) => errs[k]);
    if (first) refs[first].current?.focus();
    return first;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const errs = validateEnquiry(fields);
    setErrors(errs);
    const first = focusFirst(errs);
    if (first) {
      track("contact_form_failed", { reason: "validation", field: first, location: source });
      return;
    }
    setStatus("sending");
    setErrorKind(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          company_fax: hp.current?.value ?? "",
          startedAt: startedAt.current,
          page: window.location.pathname,
          source,
        }),
      });
      const data = (await res.json().catch(() => null)) as EnquiryResponse | null;
      if (res.ok && data?.ok) {
        track("contact_form_submitted", { channel: "form", location: source });
        setSentName(fields.name.trim().split(/\s+/)[0] ?? "");
        setStatus("success");
        setFields(EMPTY_ENQUIRY);
        try {
          sessionStorage.removeItem(DRAFT_KEY);
        } catch {}
        return;
      }
      const kind: ErrorKind = data && !data.ok ? data.error : "failed";
      if (data && !data.ok && data.fields) {
        setErrors(data.fields);
        focusFirst(data.fields);
      }
      if (kind === "too_fast") startedAt.current = Date.now() - 60_000;
      track("contact_form_failed", { reason: kind, location: source });
      setErrorKind(kind);
      setStatus("error");
    } catch {
      track("contact_form_failed", { reason: "network", location: source });
      setErrorKind("network");
      setStatus("error");
    }
  }

  /** Fallback: the same message on WhatsApp (prefilled with a number, else copied). */
  function sendWhatsApp() {
    const hasContent = Boolean(fields.name.trim() || fields.message.trim());
    const message = hasContent ? composeEnquiry(fields, SITE.name) : DEFAULT_WHATSAPP_MESSAGE;
    if (hasContent && !CAN_PREFILL && navigator.clipboard) {
      navigator.clipboard.writeText(message).then(
        () => setCopied(true),
        () => setCopied(false)
      );
    }
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
    track("whatsapp_click", { location: `form-${source}` });
  }

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(`Project enquiry — ${fields.service || "Website"}`)}&body=${encodeURIComponent(
    composeEnquiry(fields, SITE.name)
  )}`;

  const fieldClass = (k: keyof EnquiryFields) =>
    cn(
      "mt-2 block w-full rounded-xl border bg-white/90 px-4 text-[1rem] text-ink shadow-[inset_0_1px_2px_rgba(8,27,58,0.04)] placeholder:text-ink-muted/70 transition-[border-color,box-shadow]",
      "focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_rgba(37,99,235,0.12)] focus:outline-none",
      errors[k] ? "border-[var(--color-error)]" : "border-[var(--color-border-strong)]"
    );
  const label = "text-sm font-semibold text-[var(--color-heading)]";
  const err = (k: keyof EnquiryFields) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-2 text-sm text-[var(--color-error)]">
        {errors[k]}
      </p>
    ) : null;
  const describe = (k: keyof EnquiryFields) => (errors[k] ? `${uid}-${k}-err` : undefined);
  const input = (k: "name" | "email" | "phone" | "website", text: string, extra: React.InputHTMLAttributes<HTMLInputElement>, optional = false) => (
    <div>
      <label htmlFor={`${uid}-${k}`} className={label}>
        {text} {optional && <span className="font-normal text-ink-muted">(optional)</span>}
      </label>
      <input
        ref={refs[k]}
        id={`${uid}-${k}`}
        name={k}
        value={fields[k]}
        onChange={set(k)}
        maxLength={ENQUIRY_LIMITS[k]}
        aria-invalid={!!errors[k]}
        aria-describedby={describe(k)}
        className={cn(fieldClass(k), "h-12")}
        {...extra}
      />
      {err(k)}
    </div>
  );

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" aria-live="polite" className={cn("glass rounded-[var(--radius-xl)] p-6 outline-none sm:p-8", className)}>
        <CheckCircle2 className="h-10 w-10 text-[var(--color-success)]" aria-hidden />
        <h3 className="mt-4 font-serif text-[1.8rem] leading-tight text-[var(--color-heading)]">
          Thank you{sentName ? `, ${sentName}` : ""}! Your enquiry has been received.
        </h3>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Our team will get back to you soon. Want to talk sooner? Message us on WhatsApp or give us a call.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href={whatsappHref()} target="_blank" rel="noopener noreferrer" variant="accent" onClick={() => track("whatsapp_click", { location: "form-success" })}>
            <MessageCircle className="h-4 w-4" aria-hidden /> Chat on WhatsApp
          </Button>
          <Button href={telHref()} variant="secondary" onClick={() => track("phone_click", { location: "form-success" })}>
            <Phone className="h-4 w-4" aria-hidden /> Call {SITE.phone}
          </Button>
          <Button type="button" variant="ghost" onClick={() => setStatus("idle")}>
            <RotateCcw className="h-4 w-4" aria-hidden /> Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className={cn("relative grid gap-5", className)} aria-describedby={`${uid}-note`}>
      <div className="grid gap-5 sm:grid-cols-2">
        {input("name", "Name", { autoComplete: "name", placeholder: "Your full name" })}
        {input("email", "Email", { type: "email", autoComplete: "email", inputMode: "email", placeholder: "you@company.com" })}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {input("phone", "Phone / WhatsApp", { type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "+91 98765 43210" }, true)}
        {input("website", "Website", { type: "url", inputMode: "url", autoComplete: "url", placeholder: "example.com" }, true)}
      </div>

      <div>
        <label htmlFor={`${uid}-service`} className={label}>
          Service required
        </label>
        <select
          ref={refs.service}
          id={`${uid}-service`}
          name="service"
          value={fields.service}
          onChange={set("service")}
          aria-invalid={!!errors.service}
          aria-describedby={describe("service")}
          className={cn(fieldClass("service"), "h-12 appearance-none bg-no-repeat pr-10")}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5l5 5 5-5' stroke='%235b6b80' stroke-width='1.5'/%3E%3C/svg%3E\")",
            backgroundPosition: "right 1rem center",
          }}
        >
          <option value="" disabled>
            Choose a service…
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet — help me decide</option>
        </select>
        {err("service")}
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={`${uid}-message`} className={label}>
            Message
          </label>
          <span className={cn("tabular text-xs", fields.message.length > ENQUIRY_LIMITS.message ? "text-[var(--color-error)]" : "text-ink-muted")}>
            {fields.message.length}/{ENQUIRY_LIMITS.message}
          </span>
        </div>
        <textarea
          ref={refs.message}
          id={`${uid}-message`}
          name="message"
          rows={4}
          value={fields.message}
          onChange={set("message")}
          placeholder="What are you building, and what would success look like?"
          aria-invalid={!!errors.message}
          aria-describedby={describe("message")}
          className={cn(fieldClass("message"), "min-h-32 resize-y py-3")}
        />
        {err("message")}
      </div>

      {/* Honeypot — invisible to people and screen readers; bots fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-fax`}>Company fax</label>
        <input ref={hp} id={`${uid}-fax`} name="company_fax" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div role="alert" aria-live="assertive">
        {status === "error" && errorKind && (
          <div className="rounded-2xl border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 p-4 sm:p-5">
            <p className="text-[0.95rem] font-medium leading-relaxed text-[var(--color-heading)]">{ERROR_COPY[errorKind]}</p>
            {errorKind !== "invalid" && errorKind !== "too_fast" && (
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <Button type="button" size="sm" variant="accent" onClick={sendWhatsApp}>
                  <MessageCircle className="h-4 w-4" aria-hidden /> Send on WhatsApp
                </Button>
                <Button href={mailto} size="sm" variant="secondary" onClick={() => track("email_click", { location: `form-${source}` })}>
                  <Mail className="h-4 w-4" aria-hidden /> Send by email
                </Button>
                <Button href={telHref()} size="sm" variant="secondary" onClick={() => track("phone_click", { location: `form-${source}` })}>
                  <Phone className="h-4 w-4" aria-hidden /> Call us
                </Button>
              </div>
            )}
            {copied && !CAN_PREFILL && (
              <p className="mt-3 text-sm text-ink-muted">We copied your message — paste it into the WhatsApp chat and tap send.</p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" variant="accent" size="lg" loading={status === "sending"} disabled={status === "sending"} className="w-full sm:w-auto">
          {status === "sending" ? "Sending…" : submitLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Button>
        <div className="flex items-center justify-center gap-2 text-sm text-ink-muted sm:justify-start">
          <span>or</span>
          <button type="button" onClick={sendWhatsApp} className="link-underline font-semibold text-[var(--color-accent-text)]">
            WhatsApp
          </button>
          <span aria-hidden>·</span>
          <a href={telHref()} onClick={() => track("phone_click", { location: `form-${source}` })} className="link-underline font-semibold text-[var(--color-accent-text)]">
            Call
          </a>
        </div>
      </div>
      <p id={`${uid}-note`} className="-mt-1 text-[0.85rem] leading-relaxed text-ink-muted">
        We only use your details to reply to this enquiry. See our{" "}
        <Link href="/privacy-policy" className="link-underline text-[var(--color-accent-text)]">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
