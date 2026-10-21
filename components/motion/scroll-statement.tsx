"use client";

import { useRef } from "react";
import { m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Dim floor of 0.5 keeps unlit words ≥3:1 (large-text AA) on both dark and paper.
  const opacity = useTransform(progress, range, [0.5, 1]);
  return (
    <m.span style={{ opacity }} className="inline-block">
      {children}
      {" "}
    </m.span>
  );
}

/**
 * A large editorial statement whose words brighten in sequence as it scrolls
 * through the viewport. Native scrolling — no pinning, no scroll-jacking.
 * Screen readers get the plain sentence; reduced-motion users see it fully lit.
 */
export function ScrollStatement({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });
  const words = text.split(" ");

  if (reduce) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={cn(className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {w}
            </Word>
          );
        })}
      </span>
    </p>
  );
}
