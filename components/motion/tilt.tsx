"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/*
  3D tilt: the panel turns toward the cursor with a soft glare, children with
  .depth-1 / .depth-2 float above it (preserve-3d parallax). Mouse only — touch and
  reduced-motion users get a static panel. Writes CSS variables in rAF, no re-renders.
*/
export function Tilt({
  children,
  className,
  innerClassName,
  max = 8,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  /** Maximum rotation in degrees. */
  max?: number;
  glare?: boolean;
}) {
  const inner = React.useRef<HTMLDivElement>(null);
  const frame = React.useRef(0);
  const reduce = React.useRef(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduce.current = mq.matches;
    const onChange = () => (reduce.current = mq.matches);
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduce.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = inner.current;
      if (!el) return;
      el.style.setProperty("--ry", `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - y) * 2 * max * 0.8).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
      el.style.setProperty("--glare", "1");
    });
  };
  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    const el = inner.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--glare", "0");
  };

  return (
    <div className={cn("tilt-stage", className)} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={inner} className={cn("tilt h-full", innerClassName)}>
        {children}
        {glare && <span aria-hidden className="tilt-glare" />}
      </div>
    </div>
  );
}
