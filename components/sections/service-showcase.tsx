"use client";

import Link from "next/link";
import { useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { NetworkField } from "@/components/art/network-field";
import { cn } from "@/lib/utils";

export type ShowcaseService = {
  slug: string;
  title: string;
  description: string;
  categoryLabel: string;
  badge: string | null;
  points: string[];
};

/**
 * Editorial services index with a live preview. Desktop: hover/focus a row and the
 * sticky panel shows that service. Touch & small screens: descriptions are inline,
 * so nothing essential depends on hover. Every row is a real link.
 */
export function ServiceShowcase({
  groups,
}: {
  groups: { label?: string; services: ShowcaseService[] }[];
}) {
  const all = groups.flatMap((g) => g.services);
  const [active, setActive] = useState(all[0]?.slug);
  const reduce = useReducedMotion();
  const current = all.find((s) => s.slug === active) ?? all[0];
  let n = 0;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
      <div className="space-y-14">
        {groups.map((g, gi) => (
          <div key={g.label ?? gi}>
            {g.label && (
              <div className="mb-2 flex items-baseline justify-between border-b border-[var(--color-border)] pb-3">
                <h3 className="eyebrow">{g.label}</h3>
                <span className="eyebrow tabular">{String(g.services.length).padStart(2, "0")}</span>
              </div>
            )}
            <ul className={cn(!g.label && "border-t border-[var(--color-border)]")}>
              {g.services.map((s) => {
                n += 1;
                const isActive = s.slug === current?.slug;
                return (
                  <li key={s.slug} className="border-b border-[var(--color-border)]">
                    <Link
                      href={`/${s.slug}`}
                      onMouseEnter={() => setActive(s.slug)}
                      onFocus={() => setActive(s.slug)}
                      className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 py-5 md:grid-cols-[3rem_1fr_auto] md:py-6"
                    >
                      <span className="tabular text-xs text-ink-muted">{String(n).padStart(2, "0")}</span>
                      <span>
                        <span
                          className={cn(
                            "block font-serif text-[clamp(1.65rem,3vw,2.6rem)] leading-[1.05] transition-colors duration-300",
                            isActive ? "lg:text-[var(--color-accent-deep)]" : "text-[var(--color-heading)]",
                            "group-hover:text-[var(--color-accent-deep)]"
                          )}
                        >
                          {s.title}
                          {s.badge && (
                            <span className="ml-3 inline-block translate-y-[-0.45em] rounded-full border border-[var(--color-border-strong)] px-2.5 py-0.5 align-middle font-sans text-[0.62rem] font-medium uppercase tracking-[0.16em] text-ink-muted">
                              {s.badge}
                            </span>
                          )}
                        </span>
                        <span className="mt-2 block max-w-xl text-[0.95rem] leading-relaxed text-ink-muted lg:line-clamp-1">
                          {s.description}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="h-5 w-5 text-ink-muted transition-all duration-300 group-hover:rotate-45 group-hover:text-[var(--color-accent-deep)]"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Live preview (desktop only — the same info is inline on touch screens) */}
      <aside aria-hidden className="relative hidden lg:block">
        <div className="glass sticky top-28 overflow-hidden rounded-[28px] shadow-[var(--shadow-lift)]">
          <div className="relative aspect-[16/10] overflow-hidden">
            {/* Enter-only transitions: the panel swaps instantly on hover (no exit wait → snappy, INP-friendly). */}
            <m.div
              key={current?.slug}
              initial={reduce ? false : { opacity: 0.4, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <NetworkField seed={current?.slug ?? "services"} variant="navy" density={1.2} />
            </m.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>
          <m.div
              key={current?.slug}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="-mt-10 p-8 pt-0"
            >
              <p className="eyebrow relative">{current?.categoryLabel}</p>
              <p className="relative mt-3 font-serif text-[2.2rem] leading-[1.05] text-[var(--color-heading)]">{current?.title}</p>
              <p className="mt-4 leading-relaxed text-ink-muted">{current?.description}</p>
              <ul className="mt-6 space-y-2.5">
                {current?.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[0.95rem] text-ink-soft">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--color-accent-text)]" />
                    {pt}
                  </li>
                ))}
              </ul>
            </m.div>
        </div>
      </aside>
    </div>
  );
}
