"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import * as React from "react";

/*
  Scroll reveals that never cost LCP or hide content:
  - The server renders every element VISIBLE (no opacity:0 in the HTML), so above-the-
    fold content paints immediately, works without JS, and can't delay LCP.
  - After hydration, only elements that are still below the fold are "armed": hidden
    instantly (they're offscreen, so nothing flickers) and revealed when scrolled to.
*/

const useIsoLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
const EASE = [0.16, 1, 0.3, 1] as const;

function useArmed(ref: React.RefObject<Element | null>, disabled: boolean) {
  const [armed, setArmed] = React.useState(false);
  useIsoLayoutEffect(() => {
    if (disabled || !ref.current) return;
    if (ref.current.getBoundingClientRect().top > window.innerHeight * 0.95) setArmed(true);
  }, [disabled]);
  return armed;
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Travel distance in px. */
  y?: number;
  as?: "div" | "section" | "li" | "span" | "article";
  once?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 20, as = "div", once = true }: RevealProps) {
  const ref = React.useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const armed = useArmed(ref, reduce);
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });
  const MotionTag = m[as] as typeof m.div;
  const hidden = armed && !inView;

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={false}
      animate={hidden ? { opacity: 0, y } : { opacity: 1, y: 0 }}
      transition={hidden ? { duration: 0 } : { duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
