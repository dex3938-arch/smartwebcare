import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/* Shared editorial content blocks used across the templated pages. Server components. */

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
  aside,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  /** Right-aligned element in the header row (e.g. a "View all" link). */
  aside?: React.ReactNode;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("container-wide mt-24 md:mt-32", className)}
    >
      {(eyebrow || title || aside) && (
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            {title && (
              <h2 id={headingId} className="text-[length:var(--text-h2)] text-ink">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-ink-muted">
                {lead}
              </p>
            )}
          </div>
          {aside && <div className="shrink-0">{aside}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

/** Two-column editorial "what's included" list. */
export function IncludedList({ items }: { items: string[] }) {
  return (
    <ul className="grid border-t border-[var(--color-border)] md:grid-cols-2 md:gap-x-12">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-start gap-4 border-b border-[var(--color-border)] py-5"
        >
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/15 text-[var(--color-accent-text)]">
            <Check className="h-3.5 w-3.5" aria-hidden />
          </span>
          <span className="text-[1.05rem] leading-relaxed text-ink">
            <span className="sr-only">{i + 1}. </span>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Benefit trio / feature cards. */
export function FeatureGrid({
  items,
  columns = 3,
}: {
  items: { title: string; description: string }[];
  columns?: 2 | 3 | 4;
}) {
  return (
    <div
      className={cn(
        "grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-border)]",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-3",
        columns === 4 && "md:grid-cols-2 lg:grid-cols-4"
      )}
    >
      {items.map((b, i) => (
        <Reveal key={b.title} delay={(i % columns) * 0.07} className="bg-background p-7 md:p-9">
          <span className="font-mono text-xs text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-6 font-serif text-[1.5rem] leading-snug text-ink">{b.title}</h3>
          <p className="mt-3 leading-relaxed text-ink-muted">{b.description}</p>
        </Reveal>
      ))}
    </div>
  );
}

/** Numbered process timeline. */
export function ProcessSteps({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.08} className="relative">
          <div className="flex items-center gap-4">
            <span className="font-serif text-[2.6rem] italic leading-none text-accent-text">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span aria-hidden className="hairline flex-1" />
          </div>
          <h3 className="mt-6 font-serif text-[1.45rem] text-ink">{s.title}</h3>
          <p className="mt-2.5 leading-relaxed text-ink-muted">{s.description}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export type LinkItem = { href: string; title: string; description?: string; meta?: string };

/** Editorial list of navigational links (related services, industries, comparisons). */
export function LinkList({
  items,
  columns = 1,
}: {
  items: LinkItem[];
  columns?: 1 | 2 | 3;
}) {
  return (
    <ul
      className={cn(
        "grid border-t border-[var(--color-border)]",
        columns === 2 && "md:grid-cols-2 md:gap-x-10",
        columns === 3 && "md:grid-cols-2 md:gap-x-10 lg:grid-cols-3"
      )}
    >
      {items.map((it) => (
        <li key={it.href} className="border-b border-[var(--color-border)]">
          <Link
            href={it.href}
            className="group flex min-h-16 items-start justify-between gap-6 py-5"
          >
            <span>
              <span className="block font-serif text-[1.3rem] leading-snug text-ink transition-colors group-hover:text-accent-text">
                {it.title}
              </span>
              {it.description && (
                <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-ink-muted">
                  {it.description}
                </span>
              )}
            </span>
            <span className="flex shrink-0 items-center gap-3 pt-1">
              {it.meta && <span className="font-mono text-xs text-ink-muted">{it.meta}</span>}
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 text-ink-muted transition-all duration-300 group-hover:rotate-45 group-hover:text-ink"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Dense directory of city links, optionally grouped. */
export function CityDirectory({
  groups,
}: {
  groups: { label?: string; href?: string; cities: { href: string; name: string }[] }[];
}) {
  return (
    <div className="space-y-12">
      {groups.map((g, gi) => (
        <div key={g.label ?? gi}>
          {g.label && (
            <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-[var(--color-border)] pb-3">
              <h3 className="font-serif text-[1.4rem] text-ink">
                {g.href ? (
                  <Link href={g.href} className="link-underline">
                    {g.label}
                  </Link>
                ) : (
                  g.label
                )}
              </h3>
              <span className="font-mono text-xs text-ink-muted">
                {g.cities.length} {g.cities.length === 1 ? "city" : "cities"}
              </span>
            </div>
          )}
          <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-5">
            {g.cities.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="inline-flex min-h-10 items-center text-[0.95rem] text-ink-soft transition-colors hover:text-accent-text"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Small key/value fact row (used on location pages). */
export function FactRow({ facts }: { facts: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-6 md:flex md:flex-wrap md:gap-x-14">
      {facts.map((f) => (
        <div key={f.label}>
          <dt className="eyebrow">{f.label}</dt>
          <dd className="mt-2 font-serif text-[1.6rem] leading-tight text-ink">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
