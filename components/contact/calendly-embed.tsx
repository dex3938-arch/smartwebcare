"use client";

import { useState } from "react";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

/**
 * Click-to-load Calendly scheduler (the team's real booking flow). Nothing from
 * Calendly loads — no scripts, no cookies — until the visitor asks for it.
 */
export function CalendlyEmbed() {
  const [show, setShow] = useState(false);
  const src = `${SITE.calendly}?embed_type=Inline&hide_gdpr_banner=1&background_color=1d1716&text_color=f4ece4&primary_color=c8104a`;

  if (show) {
    return (
      <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)]">
        <iframe
          src={src}
          title="Book a free consultation with SmartWebCare (Calendly)"
          className="block h-[760px] w-full"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-[var(--color-accent-text)]">
        <CalendarDays className="h-6 w-6" aria-hidden />
      </span>
      <div>
        <p className="font-serif text-[2rem] leading-tight text-ink">Pick a time that works for you.</p>
        <p className="mt-3 max-w-md leading-relaxed text-ink-muted">
          30 minutes with the founders over video. Loads Calendly&rsquo;s scheduler on this page.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" variant="accent" size="lg" onClick={() => setShow(true)}>
          Show available times
        </Button>
        <Button href={SITE.calendly} variant="secondary" size="lg">
          Open in Calendly <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}
