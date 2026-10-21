"use client";

import { useState } from "react";
import { ServiceScroller, type ScrollService } from "@/components/sections/service-scroller";
import { cn } from "@/lib/utils";

/**
 * "More Services" with the live site's category tabs (All / AI / Marketing / Branding /
 * Design). Each tab feeds the scroll-linked service list.
 */
export function ServiceTabs({ tabs }: { tabs: { id: string; label: string; items: ScrollService[] }[] }) {
  const [tab, setTab] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === tab) ?? tabs[0];

  return (
    <div>
      <div role="tablist" aria-label="Service categories" className="mb-10 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const on = t.id === current.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`svc-tab-${t.id}`}
              aria-selected={on}
              aria-controls="svc-tabpanel"
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[0.9rem] font-semibold transition-[background-color,color,box-shadow] duration-300",
                on
                  ? "bg-[var(--color-accent)] text-white shadow-[0_10px_26px_-12px_rgba(37,99,235,0.8)]"
                  : "glass text-[var(--color-heading)] hover:border-[var(--color-accent)]"
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id="svc-tabpanel" aria-labelledby={`svc-tab-${current.id}`}>
        <ServiceScroller key={current.id} items={current.items} />
      </div>
    </div>
  );
}
