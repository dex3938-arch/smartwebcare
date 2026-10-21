"use client";

import { LazyMotion } from "motion/react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * Lazy-loads motion's animation features after hydration. Components use the tiny `m`
 * component instead of `motion`; `strict` makes any accidental `motion.*` usage throw
 * in development so the full bundle can't creep back in.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
