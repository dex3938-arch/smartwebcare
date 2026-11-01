"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { SwcMark } from "@/components/brand/logo";
import { Tilt } from "@/components/motion/tilt";
import { canUse3D } from "@/components/three/capability";
import { cn } from "@/lib/utils";

const NetworkScene = dynamic(() => import("@/components/three/network-scene"), { ssr: false });

const CHIPS = [
  { label: "Personal Branding", className: "left-[2%] top-[14%]" },
  { label: "Social Media", className: "right-[0%] top-[24%]" },
  { label: "AI & Automation", className: "left-[6%] bottom-[18%]" },
  { label: "Performance Marketing", className: "right-[3%] bottom-[10%]" },
];

/**
 * The hero brand stage: the SWC emblem (with its light sweep + node pulses) and the
 * shining "SmartWebCare" wordmark on a glass card, floating in a 3D network of light.
 * First paint is pure CSS/SVG; the WebGL globe fades in behind it on capable desktops.
 */
export function SwcHero({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [want3d, setWant3d] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (!canUse3D()) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const start = () => setWant3d(true);
    const id = w.requestIdleCallback ? w.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 600);
    return () => {
      if (w.cancelIdleCallback && typeof id === "number") w.cancelIdleCallback(id);
      clearTimeout(id as number);
    };
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={cn("relative mx-auto aspect-square w-full max-w-[620px]", className)}>
      {/* light behind the card */}
      <div aria-hidden className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(59,130,246,0.30),rgba(103,232,249,0.14)_45%,transparent_70%)]" />

      {/* CSS orbit rings — always present (also the no-WebGL / mobile visual) */}
      <svg aria-hidden viewBox="0 0 600 600" className="absolute inset-0 h-full w-full">
        <g className="orbit-ring">
          <ellipse cx="300" cy="300" rx="285" ry="108" fill="none" stroke="#93c5fd" strokeOpacity="0.7" strokeWidth="1.2" transform="rotate(-18 300 300)" />
          <circle cx="560" cy="210" r="6" fill="#67e8f9" />
        </g>
        <g className="orbit-ring orbit-ring-reverse">
          <ellipse cx="300" cy="300" rx="240" ry="80" fill="none" stroke="#2563eb" strokeOpacity="0.35" strokeWidth="1" transform="rotate(24 300 300)" />
          <circle cx="78" cy="352" r="4" fill="#2563eb" />
        </g>
      </svg>

      {want3d && (
        <div aria-hidden className={cn("absolute -inset-[8%] transition-opacity duration-[1400ms]", ready ? "opacity-100" : "opacity-0")}>
          <NetworkScene active={inView} onReady={() => setReady(true)} />
        </div>
      )}

      <Tilt max={7} className="absolute inset-0 grid place-items-center" innerClassName="grid place-items-center w-full">
        <div className="glass swc-reveal relative w-[86%] rounded-[30px] px-[7%] pb-[8%] pt-[9%] text-center shadow-[var(--shadow-lift)]">
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(140deg,rgba(255,255,255,0.75),rgba(255,255,255,0.15)_55%,rgba(219,234,254,0.5))]" />
          <SwcMark
            priority
            alt="SmartWebCare SWC emblem"
            sizes="(min-width: 1024px) 460px, 76vw"
            nodeSize="7%"
            className="depth-1 relative mx-auto w-full"
          />
          <p className="depth-1 relative mt-[5%] font-sans text-[clamp(1.9rem,4.4vw,3.35rem)] font-extrabold leading-none tracking-[-0.03em]">
            <span className="shine-text">SmartWebCare</span>
          </p>
          <p className="depth-1 relative mt-3 text-[clamp(0.72rem,1.2vw,0.92rem)] font-bold uppercase tracking-[0.32em] text-ink-muted">
            AI <span aria-hidden>•</span> Software <span aria-hidden>•</span> SaaS
          </p>
        </div>
        {CHIPS.map((c, i) => (
          <span
            key={c.label}
            aria-hidden
            className={cn(
              "glass float-slow depth-2 absolute hidden items-center gap-2 rounded-full px-3.5 py-2 text-[0.78rem] font-bold text-[var(--color-heading)] sm:inline-flex",
              c.className
            )}
            style={{ animationDelay: `${i * -1.4}s` }}
          >
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-cyan)] shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
            {c.label}
          </span>
        ))}
      </Tilt>
    </div>
  );
}
