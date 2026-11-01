import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe2, MapPin } from "lucide-react";
import { INDIA_MAP, INDIA_PINS, WORLD_MAP, WORLD_PINS } from "@/lib/map-points";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/*
  "Where we work" — the footer's location section.
   - India: a bubble map on India's official outline (Natural Earth, India point of view),
     with labelled pins for the main cities and hover labels for the rest.
   - International: a motion map — flight lines draw out from New Delhi to each city,
     a light travels along them and the markers pulse (HUD-style). Hovering a city
     highlights its line. All motion is CSS/SVG and stops for reduced-motion users.
  Every pin and chip is a normal link to that location's page. The map artwork is a
  cached static SVG file, so it adds almost nothing to each page's HTML.
*/

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

function IndiaCard() {
  const primary = INDIA_PINS.filter((p) => p.primary);
  const more = INDIA_PINS.filter((p) => !p.primary);
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#67e8f9]">
            <MapPin className="h-4 w-4" aria-hidden /> India
          </p>
          <p className="mt-2 font-serif text-[1.5rem] leading-tight text-white">Across the country</p>
        </div>
        <Link href="/india" className="inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-[#c7d5ea] hover:text-white">
          All of India <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="mt-5 grid items-center gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <div className="relative mx-auto w-full max-w-[330px]" style={{ aspectRatio: `${INDIA_MAP.width} / ${INDIA_MAP.height}` }}>
          <Image src="/maps/india.svg" alt="" fill unoptimized loading="lazy" sizes="330px" className="select-none" draggable={false} />
          {INDIA_PINS.map((p) => (
            <Link
              key={p.slug}
              href={p.href}
              className="group absolute z-[1] -translate-x-1/2 -translate-y-1/2 p-2 focus-visible:z-10"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span className="relative block">
                {p.primary && <span aria-hidden className="map-pin-ring absolute inset-0 rounded-full bg-[#67e8f9]/50" />}
                <span
                  aria-hidden
                  className={cn(
                    "relative block rounded-full border border-[#081b3a] shadow-[0_0_10px_rgba(103,232,249,0.9)] transition-transform duration-200 group-hover:scale-150 group-focus-visible:scale-150",
                    p.primary ? "h-3 w-3 bg-[#67e8f9]" : "h-2 w-2 bg-[#93c5fd]"
                  )}
                />
              </span>
              <span
                className={cn(
                  "pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-[#081b3a]/85 px-1.5 py-0.5 text-[0.7rem] font-semibold leading-tight text-white backdrop-blur-sm transition-opacity duration-200",
                  p.side === "left" ? "right-full mr-0.5" : "left-full ml-0.5",
                  p.primary ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                )}
              >
                {p.label}
              </span>
            </Link>
          ))}
        </div>

        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#8ea5c7]">Main cities</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {primary.map((p) => (
              <li key={p.slug}>
                <Link href={p.href} className="inline-flex min-h-10 items-center rounded-full border border-white/15 bg-white/[0.06] px-3.5 text-[0.88rem] font-semibold text-white transition-colors hover:border-[#67e8f9] hover:bg-white/10">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#8ea5c7]">Also serving</p>
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-[0.86rem] text-[#c7d5ea]">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={p.href} className="link-underline hover:text-white">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function arcPath(x: number, y: number) {
  const { x: ox, y: oy } = WORLD_MAP.origin;
  const dist = Math.hypot(x - ox, y - oy);
  const cx = (ox + x) / 2;
  const cy = Math.min(oy, y) - dist * 0.32;
  return `M${ox} ${oy} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x} ${y}`;
}

function WorldCard() {
  const { width: W, height: H, origin } = WORLD_MAP;
  return (
    <div className="world-card relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-7">
      {/* HUD corner brackets */}
      {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((c) => (
        <span key={c} aria-hidden className={cn("absolute h-4 w-4 border-[#67e8f9]/60", c)} />
      ))}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#67e8f9]">
            <Globe2 className="h-4 w-4" aria-hidden /> International
          </p>
          <p className="mt-2 font-serif text-[1.5rem] leading-tight text-white">From {SITE.city} to the world</p>
        </div>
        <p className="hidden font-mono text-[0.7rem] leading-relaxed text-[#8ea5c7] sm:block">
          HQ · 28.61°N 77.21°E
          <br />
          {WORLD_PINS.length} cities · 5 countries
        </p>
      </div>

      <div className="relative mt-5 w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        <Image src="/maps/world-dots.svg" alt="" fill unoptimized loading="lazy" sizes="(min-width: 1024px) 620px, 92vw" className="select-none" draggable={false} />
        <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="arc-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#3b82f6" />
              <stop offset="1" stopColor="#67e8f9" />
            </linearGradient>
            <linearGradient id="scan-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#67e8f9" stopOpacity="0" />
              <stop offset="0.5" stopColor="#67e8f9" stopOpacity="0.12" />
              <stop offset="1" stopColor="#67e8f9" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect className="map-scan" x="0" y="0" width="90" height={H} fill="url(#scan-grad)" />
          {WORLD_PINS.map((p, i) => {
            const d = arcPath(p.x, p.y);
            return (
              <g key={p.href}>
                <path id={`arc-${i}`} d={d} fill="none" stroke="#3b82f6" strokeOpacity="0.28" strokeWidth="1" />
                <path
                  d={d}
                  pathLength={1}
                  fill="none"
                  stroke="url(#arc-grad)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className={`map-arc map-arc-${i}`}
                  style={{ animationDelay: `${i * 0.9}s` }}
                />
                <circle r="3.2" fill="#e0f2fe" className="map-runner">
                  <animateMotion dur="4.5s" begin={`${i * 0.9}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#arc-${i}`} />
                  </animateMotion>
                </circle>
              </g>
            );
          })}
          <circle cx={origin.x} cy={origin.y} r="5" fill="#67e8f9" />
          <circle cx={origin.x} cy={origin.y} r="11" fill="none" stroke="#67e8f9" strokeOpacity="0.5" />
        </svg>

        {/* HQ label */}
        <span
          className="pointer-events-none absolute -translate-x-1/2 translate-y-3 whitespace-nowrap rounded-md bg-[#081b3a]/85 px-1.5 py-0.5 text-[0.7rem] font-semibold text-[#67e8f9]"
          style={{ left: pct(origin.x, W), top: pct(origin.y, H) }}
        >
          {SITE.city} · HQ
        </span>

        {WORLD_PINS.map((p, i) => (
          <Link
            key={p.href}
            href={p.href}
            data-arc={i}
            className="group absolute z-[1] -translate-x-1/2 -translate-y-1/2 p-2"
            style={{ left: pct(p.x, W), top: pct(p.y, H) }}
          >
            <span className="relative block">
              <span aria-hidden className="map-pin-ring absolute inset-0 rounded-full bg-[#67e8f9]/50" style={{ animationDelay: `${i * 0.4}s` }} />
              <span aria-hidden className="relative block h-2.5 w-2.5 rounded-full border border-[#081b3a] bg-[#67e8f9] shadow-[0_0_10px_rgba(103,232,249,0.9)] transition-transform duration-200 group-hover:scale-150" />
            </span>
            <span
              className={cn(
                "pointer-events-none absolute whitespace-nowrap rounded-md bg-[#081b3a]/85 px-1.5 py-0.5 text-[0.7rem] font-semibold text-white",
                p.side === "left" && "right-full top-1/2 mr-0.5 -translate-y-1/2",
                p.side === "right" && "left-full top-1/2 ml-0.5 -translate-y-1/2",
                p.side === "top" && "bottom-full left-1/2 mb-0.5 -translate-x-1/2",
                p.side === "bottom" && "left-1/2 top-full mt-0.5 -translate-x-1/2"
              )}
            >
              {p.label}
            </span>
          </Link>
        ))}
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        {WORLD_PINS.map((p, i) => (
          <li key={p.href}>
            <Link
              href={p.href}
              data-arc={i}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 text-[0.88rem] font-semibold text-white transition-colors hover:border-[#67e8f9] hover:bg-white/10"
            >
              {p.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LocationMaps() {
  return (
    <section aria-labelledby="where-we-work" className="mt-14 border-t border-white/10 pt-12">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-3">Where we work</p>
          <h2 id="where-we-work" className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-tight text-white">
            Rooted in India, working worldwide.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-[#c7d5ea]">Tap a city to see how we help brands there.</p>
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <IndiaCard />
        <WorldCard />
      </div>
    </section>
  );
}
