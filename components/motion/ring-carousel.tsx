"use client";

import { Children, useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  Round (3D ring) carousel for link cards.
  - Cards sit on a ring that turns on its own; hovering, focusing or dragging stops it,
    and clicking a card opens its page (cards are ordinary links, rendered on the server).
  - Prev / next / pause controls (WAI carousel pattern); keyboard focus brings a card to
    the front; swipe/drag works on touch. Stops off-screen and when the tab is hidden.
  - Reduced motion: no automatic turning, and moves jump instead of animating.
  One transform per frame on the ring plus an opacity per card — no layout work.
*/

const GAP = 18;
const radiusFor = (cardWidth: number, n: number) => Math.max(cardWidth * 0.8, (cardWidth / 2 + GAP) / Math.tan(Math.PI / Math.max(n, 3)));
const wrap = (deg: number) => ((((deg + 180) % 360) + 360) % 360) - 180;

export function RingCarousel({
  label,
  children,
  height = 330,
  speed = 7,
  cardClassName = "w-[min(76vw,290px)]",
  tone = "light",
  className,
}: {
  label: string;
  children: React.ReactNode;
  /** Stage height in px (cards fill it). */
  height?: number;
  /** Auto-turn speed in degrees per second. */
  speed?: number;
  cardClassName?: string;
  tone?: "light" | "navy";
  className?: string;
}) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const step = 360 / n;
  const id = useId();
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const s = useRef({
    angle: 0,
    target: null as number | null,
    hover: false,
    focus: false,
    visible: false,
    reduce: false,
    playing: true,
    radius: radiusFor(290, n),
    drag: null as null | { x: number; angle: number; moved: boolean },
    justDragged: false,
  });
  const [radius, setRadius] = useState(() => radiusFor(290, n));
  const [playing, setPlaying] = useState(true);
  const [front, setFront] = useState(0);

  const apply = useCallback(() => {
    const st = s.current;
    if (ring.current) ring.current.style.transform = `translateZ(${-st.radius}px) rotateY(${st.angle}deg)`;
    let best = 0;
    let bestCos = -2;
    for (let i = 0; i < n; i++) {
      const el = cards.current[i];
      if (!el) continue;
      const c = Math.cos((wrap(i * step + st.angle) * Math.PI) / 180);
      // Fully opaque while facing the viewer (keeps text contrast), hidden when facing away.
      el.style.opacity = c > 0.05 ? "1" : "0";
      el.style.pointerEvents = c > 0.4 ? "auto" : "none";
      if (c > bestCos) {
        bestCos = c;
        best = i;
      }
    }
    setFront((f) => (f === best ? f : best));
  }, [n, step]);

  // Card width → ring radius.
  useEffect(() => {
    const measure = () => {
      const w = cards.current[0]?.offsetWidth ?? 290;
      s.current.radius = radiusFor(w, n);
      setRadius(s.current.radius);
      apply();
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [n, apply]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      s.current.reduce = true;
      s.current.playing = false;
      setPlaying(false);
    }
  }, []);

  // Animation loop — only while the carousel is on screen.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      const st = s.current;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      if (st.target !== null) {
        const d = st.target - st.angle;
        st.angle = st.reduce ? st.target : st.angle + d * Math.min(1, dt * 8);
        if (Math.abs(st.target - st.angle) < 0.05) {
          st.angle = st.target;
          st.target = null;
        }
        apply();
      } else if (!st.drag && st.playing && !st.hover && !st.focus && !document.hidden) {
        st.angle -= speed * dt;
        apply();
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      s.current.visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      last = 0;
      if (e.isIntersecting) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [apply, speed]);

  const nearest = (i: number) => {
    const cur = s.current.angle;
    const base = -i * step;
    return base + 360 * Math.round((cur - base) / 360);
  };
  const goTo = (i: number) => {
    s.current.target = nearest(((i % n) + n) % n);
    if (s.current.reduce) {
      s.current.angle = s.current.target;
      s.current.target = null;
      apply();
    }
  };

  // Drag / swipe to turn the ring (horizontal only; vertical page scroll still works).
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const d = s.current.drag;
      if (!d) return;
      const dx = e.clientX - d.x;
      if (Math.abs(dx) > 6) d.moved = true;
      s.current.angle = d.angle + (dx / (2 * Math.PI * s.current.radius)) * 360;
      apply();
    };
    const up = () => {
      const d = s.current.drag;
      if (!d) return;
      s.current.drag = null;
      if (d.moved) {
        s.current.justDragged = true;
        setTimeout(() => (s.current.justDragged = false), 0);
        s.current.target = Math.round(s.current.angle / step) * step;
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [apply, step]);

  const navy = tone === "navy";
  const btn = cn(
    "grid h-11 w-11 place-items-center rounded-full border transition-[background-color,border-color,transform] duration-200 active:scale-95",
    navy
      ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
      : "border-[var(--color-border-strong)] bg-white text-[var(--color-heading)] shadow-[var(--shadow-soft)] hover:border-[var(--color-accent)]"
  );

  return (
    <section aria-roledescription="carousel" aria-label={label} className={cn("relative", className)}>
      <div
        ref={stage}
        className="ring-stage relative overflow-hidden"
        style={{ height: height + 40 }}
        onMouseEnter={() => (s.current.hover = true)}
        onMouseLeave={() => (s.current.hover = false)}
        onFocus={(e) => {
          s.current.focus = true;
          const i = Number((e.target as HTMLElement).closest<HTMLElement>("[data-ring-index]")?.dataset.ringIndex);
          if (Number.isFinite(i)) goTo(i);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) s.current.focus = false;
        }}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          s.current.target = null;
          s.current.drag = { x: e.clientX, angle: s.current.angle, moved: false };
        }}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => {
          if (s.current.justDragged) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div
          ref={ring}
          id={`${id}-ring`}
          className="ring-track absolute inset-x-0 top-5"
          style={{ height, transform: `translateZ(${-radius}px) rotateY(0deg)` }}
        >
          {slides.map((slide, i) => {
            const c = Math.cos((wrap(i * step) * Math.PI) / 180);
            return (
              <div
                key={i}
                ref={(el) => void (cards.current[i] = el)}
                data-ring-index={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}`}
                className={cn("ring-card absolute left-1/2 top-0 h-full", cardClassName)}
                style={{
                  transform: `translateX(-50%) rotateY(${i * step}deg) translateZ(${radius}px)`,
                  opacity: c > 0.05 ? 1 : 0,
                  pointerEvents: c > 0.4 ? "auto" : "none",
                }}
              >
                {slide}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-4">
        <p className={cn("tabular text-sm", navy ? "text-[#c7d5ea]" : "text-ink-muted")} aria-live="polite">
          {front + 1} / {n}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={btn}
            onClick={() => {
              s.current.playing = !s.current.playing;
              setPlaying(s.current.playing);
            }}
            aria-label={playing ? "Pause carousel" : "Play carousel"}
          >
            {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
          </button>
          <button type="button" className={btn} onClick={() => goTo(front - 1)} aria-controls={`${id}-ring`} aria-label="Previous slide">
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button type="button" className={btn} onClick={() => goTo(front + 1)} aria-controls={`${id}-ring`} aria-label="Next slide">
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
