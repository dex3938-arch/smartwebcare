"use client";

import { Children, useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  Accessible, lightweight carousel.
  - Native horizontal scroll with snap points: swipe on touch, trackpad on desktop, no
    drag library. Every slide is server-rendered HTML, so crawlers read all of it.
  - Prev / next buttons, dots and arrow keys. Optional autoplay that pauses on hover,
    focus, when off-screen or when the tab is hidden, has a visible pause button and
    never runs for people who ask for reduced motion (WAI carousel pattern).
  - Depth effect (slides scale/fade toward the edges) is pure CSS scroll-driven
    animation where supported — zero JS per frame.
*/
export function Carousel({
  label,
  children,
  slideClassName = "basis-[86%] sm:basis-[60%] lg:basis-[38%]",
  autoplayMs,
  tone = "light",
  className,
}: {
  /** Accessible name, e.g. "Key takeaways". */
  label: string;
  children: React.ReactNode;
  /** Slide width per breakpoint (flex-basis utilities). */
  slideClassName?: string;
  autoplayMs?: number;
  tone?: "light" | "navy";
  className?: string;
}) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const id = useId();
  const track = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(count <= 1);
  const [playing, setPlaying] = useState(false);
  const [hold, setHold] = useState(false); // hover / focus / off-screen
  const [visible, setVisible] = useState(false);

  const step = useCallback(() => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    return first.getBoundingClientRect().width + gap;
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const target = Math.max(0, Math.min(count - 1, i));
      el.scrollTo({ left: target * step(), behavior: "smooth" });
    },
    [count, step]
  );

  // Track position → active dot + button states.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const s = step() || 1;
      setIndex(Math.round(el.scrollLeft / s));
      setAtStart(el.scrollLeft < 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [step]);

  // Autoplay only when asked for, allowed and visible.
  useEffect(() => {
    if (!autoplayMs || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPlaying(true);
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [autoplayMs]);

  useEffect(() => {
    if (!playing || hold || !visible || !autoplayMs) return;
    const t = window.setInterval(() => {
      if (document.hidden) return;
      const el = track.current;
      if (!el) return;
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (end) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: step(), behavior: "smooth" });
    }, autoplayMs);
    return () => window.clearInterval(t);
  }, [playing, hold, visible, autoplayMs, step]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  const navy = tone === "navy";
  const btn = cn(
    "grid h-11 w-11 place-items-center rounded-full border transition-[background-color,border-color,opacity,transform] duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-35",
    navy
      ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
      : "border-[var(--color-border-strong)] bg-white text-[var(--color-heading)] shadow-[var(--shadow-soft)] hover:border-[var(--color-accent)]"
  );

  return (
    <section
      ref={root}
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative", className)}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHold(false);
      }}
    >
      <div
        ref={track}
        id={`${id}-track`}
        tabIndex={0}
        onKeyDown={onKey}
        aria-live={playing && !hold ? "off" : "polite"}
        className="carousel-track -mx-[var(--gutter,1rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[var(--gutter,1rem)] pb-4 pt-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] md:gap-6"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className={cn("carousel-slide shrink-0 grow-0 snap-start", slideClassName)}
          >
            {slide}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5" aria-label={`${label}: choose a slide`} role="group">
            {count <= 12 &&
              slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-controls={`${id}-track`}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => goTo(i)}
                  className="group grid h-6 w-6 place-items-center"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-[width,background-color] duration-300",
                      i === index ? "w-5" : "w-1.5",
                      navy
                        ? i === index ? "bg-[#67e8f9]" : "bg-white/35 group-hover:bg-white/60"
                        : i === index ? "bg-[var(--color-accent)]" : "bg-[var(--color-border-strong)] group-hover:bg-[var(--color-accent)]/50"
                    )}
                  />
                </button>
              ))}
          </div>
          <div className="flex items-center gap-2">
            {autoplayMs && (
              <button
                type="button"
                className={btn}
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause carousel" : "Play carousel"}
              >
                {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
              </button>
            )}
            <button type="button" className={btn} onClick={() => goTo(index - 1)} disabled={atStart} aria-controls={`${id}-track`} aria-label="Previous slide">
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button type="button" className={btn} onClick={() => goTo(index + 1)} disabled={atEnd} aria-controls={`${id}-track`} aria-label="Next slide">
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
