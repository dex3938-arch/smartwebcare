"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/*
  Vertical timeline whose rail fills as you scroll through it (scroll-linked, transform
  only). The steps themselves are ordinary server-rendered children; with reduced motion
  the rail is simply full.
*/
export function StepTimeline({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className={cn("relative grid gap-10 pl-12 md:gap-14 md:pl-20", className)}>
      <span aria-hidden className="absolute bottom-2 left-[1.05rem] top-2 w-px bg-[var(--color-border-strong)] md:left-[1.8rem]" />
      <m.span
        aria-hidden
        className="timeline-rail absolute bottom-2 left-[1.05rem] top-2 w-[3px] -translate-x-px rounded-full md:left-[1.8rem]"
        style={{ scaleY: reduce ? 1 : progress }}
      />
      {children}
    </ol>
  );
}
