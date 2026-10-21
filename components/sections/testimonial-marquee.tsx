import type { Testimonial } from "@/lib/home";
import { cn } from "@/lib/utils";

/*
  "Infinite marquee" (auto-scrolling testimonial ticker) with pause-on-hover.
  - Two rows drifting in opposite directions, moving automatically.
  - Hovering any card, or keyboard focus inside, pauses both rows (CSS :hover/:focus-within).
  - prefers-reduced-motion: rows don't move and become manually scrollable.
  Pure CSS — no client JavaScript.
*/

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="mx-3 flex w-[300px] shrink-0 flex-col glass rounded-[var(--radius-xl)] p-6 transition-[translate,border-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-lift)] sm:w-[380px] md:p-8">
      <span aria-hidden className="font-serif text-5xl leading-none text-[var(--color-accent-text)]">
        &ldquo;
      </span>
      <blockquote className="mt-1 flex-1 font-serif text-[1.12rem] leading-[1.5] text-[var(--color-heading)] md:text-[1.2rem]">
        {t.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-end justify-between gap-3 border-t border-[var(--color-border)] pt-4">
        <span>
          <span className="block text-[0.95rem] font-semibold text-[var(--color-heading)]">{t.role}</span>
          <span className="block text-sm text-ink-muted">{t.context}</span>
        </span>
        {t.outcome && (
          <span className="shrink-0 rounded-full border border-[var(--color-accent)] px-3 py-1 text-xs font-medium text-[var(--color-accent-text)]">
            {t.outcome}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse, duration }: { items: Testimonial[]; reverse?: boolean; duration: number }) {
  return (
    <div className="mask-fade-x overflow-hidden py-3 motion-reduce:overflow-x-auto">
      <div
        className={cn("marquee", reverse && "marquee-reverse")}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <ul className="flex shrink-0 items-stretch">
          {items.map((t, i) => (
            <li key={i} className="flex">
              <Card t={t} />
            </li>
          ))}
        </ul>
        {/* Seamless-loop duplicate: hidden from assistive tech and under reduced motion */}
        <ul className="flex shrink-0 items-stretch motion-reduce:hidden" aria-hidden>
          {items.map((t, i) => (
            <li key={i} className="flex">
              <Card t={t} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TestimonialMarquee({ items }: { items: Testimonial[] }) {
  const rowA = items.filter((_, i) => i % 2 === 0);
  const rowB = items.filter((_, i) => i % 2 === 1);
  return (
    <div className="marquee-host" role="region" aria-label="Client testimonials">
      <Row items={rowA} duration={70} />
      <Row items={rowB} reverse duration={82} />
    </div>
  );
}
