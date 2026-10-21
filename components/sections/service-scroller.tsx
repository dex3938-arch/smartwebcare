"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Briefcase,
  Camera,
  Share2,
  UserRound,
  Check,
  ChevronDown,
  Code2,
  MessageSquareText,
  PenTool,
  PhoneCall,
  Search,
  TrendingUp,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { NetworkField } from "@/components/art/network-field";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  bot: Bot,
  workflow: Workflow,
  phone: PhoneCall,
  code: Code2,
  pen: PenTool,
  search: Search,
  wrench: Wrench,
  message: MessageSquareText,
  brain: BrainCircuit,
  trend: TrendingUp,
  user: UserRound,
  camera: Camera,
  briefcase: Briefcase,
  share: Share2,
};

export type ScrollService = {
  slug: string;
  href: string;
  title: string;
  category: string;
  description: string;
  points: string[];
  icon: string;
};

/*
  Services with scroll interaction (desktop): the list scrolls normally while the visual
  panel on the right stays sticky and follows whichever service crosses the middle of the
  viewport. Clicking, hovering or focusing a row selects it too. No scroll hijacking — the
  page scrolls exactly as usual. On smaller screens it's a plain, fully expanded stack.
  All copy and links live in the list itself; the visual panel is a decorative mirror.
*/
export function ServiceScroller({ items }: { items: ScrollService[] }) {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const userPicked = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() - userPicked.current < 900) return; // a click just chose a row
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(Number((hit.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-46% 0px -46% 0px" }
    );
    rows.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const pick = (i: number) => {
    userPicked.current = Date.now();
    setActive(i);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
      <ol className="relative">
        {/* progress rail */}
        <span aria-hidden className="absolute bottom-0 left-[19px] top-0 hidden w-px bg-[var(--color-border)] lg:block" />
        <span
          aria-hidden
          className="absolute left-[19px] top-0 hidden w-px bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-cyan)] transition-[height] duration-700 ease-[var(--ease-out-expo)] lg:block"
          style={{ height: `${((active + 1) / items.length) * 100}%` }}
        />
        {items.map((s, i) => {
          const Icon = ICONS[s.icon] ?? Search;
          const on = i === active;
          return (
            <li
              key={s.slug}
              ref={(el) => {
                rows.current[i] = el;
              }}
              data-index={i}
              className="relative lg:py-1.5"
              onPointerEnter={(e) => e.pointerType === "mouse" && pick(i)}
            >
              <div
                className={cn(
                  "rounded-2xl border p-4 transition-[background-color,border-color,box-shadow] duration-500 lg:ml-12 lg:p-5",
                  on
                    ? "border-[var(--color-light-blue)] bg-white shadow-[var(--shadow-soft)]"
                    : "border-[var(--color-border)] bg-white/60 lg:border-transparent lg:bg-transparent"
                )}
              >
                <button
                  type="button"
                  onClick={() => pick(i)}
                  onFocus={() => pick(i)}
                  aria-expanded={on}
                  aria-controls={`svc-${s.slug}`}
                  className="flex w-full items-start gap-4 text-left"
                >
                  <span
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-500 lg:absolute lg:left-0 lg:top-[1.35rem]",
                      on ? "bg-[var(--color-accent)] text-white shadow-[0_8px_22px_-8px_rgba(37,99,235,0.8)]" : "bg-[var(--color-light-blue)] text-[var(--color-accent-deep)]"
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className={cn("font-sans text-[1.06rem] font-bold leading-snug transition-colors", on ? "text-[var(--color-accent-deep)]" : "text-[var(--color-heading)]")}>
                        {s.title}
                      </span>
                      <ChevronDown aria-hidden className={cn("hidden h-4 w-4 shrink-0 text-ink-muted transition-transform duration-500 lg:block", on && "rotate-180 text-[var(--color-accent-text)]")} />
                    </span>
                    <span className="mt-0.5 block text-[0.86rem] text-ink-muted">{s.category}</span>
                  </span>
                </button>
                <div
                  id={`svc-${s.slug}`}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)]",
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pt-3 text-[0.95rem] leading-relaxed text-ink-soft lg:pl-0">{s.description}</p>
                    <Link
                      href={s.href}
                      className="group mt-3 inline-flex min-h-10 items-center gap-1.5 text-[0.92rem] font-semibold text-[var(--color-accent-text)]"
                      tabIndex={on ? 0 : undefined}
                    >
                      Explore {s.title}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Sticky visual panel (desktop) — mirrors the active row */}
      <div aria-hidden className="hidden lg:block">
        {/* One shared artwork layer behind every panel (was one SVG per service — far lighter HTML). */}
        <div className="sticky top-28 isolate overflow-hidden rounded-[28px] border border-white shadow-[var(--shadow-lift)]">
          <NetworkField seed="svc-scroller" variant="navy" density={1.3} className="absolute inset-0 -z-10" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#081b3a] via-[#081b3a]/40 to-transparent" />
          <div className="swap grid">
            {items.map((s, i) => {
              const Icon = ICONS[s.icon] ?? Search;
              return (
                <div
                  key={s.slug}
                  data-on={i === active ? "" : undefined}
                  className="relative h-[min(620px,calc(100vh-9rem))]"
                >
                  <div className="absolute left-7 top-7 grid h-16 w-16 place-items-center rounded-2xl border border-white/20 bg-white/10 text-[#67e8f9] backdrop-blur-md">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="absolute right-7 top-8 font-mono text-sm text-white/60">
                    {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                  <div className="glass absolute inset-x-5 bottom-5 rounded-2xl p-6" style={{ ["--color-glass" as string]: "rgba(255,255,255,0.95)" }}>
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-text)]">{s.category}</p>
                    <p className="mt-2 font-serif text-[2rem] leading-[1.05] text-[var(--color-heading)]">{s.title}</p>
                    <ul className="mt-4 grid gap-2">
                      {s.points.slice(0, 3).map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-[0.92rem] leading-snug text-ink-soft">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-text)]" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <Link href={s.href} tabIndex={-1} className="mt-5 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-[var(--color-accent-text)]">
                      Explore service <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
