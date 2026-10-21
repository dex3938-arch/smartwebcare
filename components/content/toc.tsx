"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Sticky "On this page" navigation that highlights the section being read. */
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ink-muted">On this page</p>
      <ol className="relative space-y-0.5 border-l border-[var(--color-border)]">
        {items.map((i, n) => {
          const on = i.id === active;
          return (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "-ml-px flex gap-2.5 border-l-2 py-1.5 pl-4 leading-snug transition-colors",
                  on ? "border-[var(--color-accent)] font-semibold text-[var(--color-accent-deep)]" : "border-transparent text-ink-muted hover:text-[var(--color-heading)]"
                )}
              >
                <span className="tabular text-[0.72rem] opacity-70">{String(n + 1).padStart(2, "0")}</span>
                {i.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
