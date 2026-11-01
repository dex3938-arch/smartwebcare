"use client";

import { m, useScroll, useSpring } from "motion/react";

/** Thin page-progress bar under the header for long reads (transform only). */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 32, restDelta: 0.001 });
  return (
    <m.div
      aria-hidden
      className="fixed inset-x-0 top-[76px] z-40 h-[3px] origin-left bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-cyan)]"
      style={{ scaleX }}
    />
  );
}
