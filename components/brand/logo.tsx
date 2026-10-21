import Image from "next/image";
import emblem from "@/public/brand/swc-emblem.png";
import emblemLight from "@/public/brand/swc-emblem-light.png";
import { cn } from "@/lib/utils";

/*
  The official SmartWebCare emblem (the supplied SWC logo, background removed).
  Brand light: a cyan-white sweep masked to the emblem's own pixels crosses it every 3 s,
  and circuit nodes flash as the light passes them. Pure CSS, static under reduced motion.
*/

/** Circuit-node positions on the emblem, in % of its box (hand-placed on the artwork). */
const NODES: [x: number, y: number][] = [
  [5.8, 32.8], [12.2, 89], [25, 8.7], [31, 20.5], [31.9, 67], [39.5, 22.7], [45.5, 15.3],
  [51.4, 8.3], [51.4, 46.7], [57.3, 15.3], [63.2, 22.7], [69, 9.6], [72.2, 26.6],
  [85.1, 61.1], [91.4, 74.2], [95.2, 79.7],
];
/** The sweep crosses the emblem in ≈1.1 s of each 3 s cycle — light nodes as it passes. */
const SWEEP_S = 1.05;

export function SwcMark({
  className,
  light = false,
  nodes = true,
  priority = false,
  sizes = "120px",
  alt = "",
  nodeSize,
  eager = false,
}: {
  className?: string;
  /** Light-stroke variant for navy backgrounds. */
  light?: boolean;
  nodes?: boolean;
  priority?: boolean;
  sizes?: string;
  alt?: string;
  nodeSize?: string;
  /** Load immediately (above-the-fold marks) without preloading like `priority`. */
  eager?: boolean;
}) {
  return (
    <span
      className={cn("swc-mark block", className)}
      style={{ ["--swc-mask" as string]: "url(/brand/swc-emblem-mask.png)", ["--node-size" as string]: nodeSize }}
    >
      <Image
        src={light ? emblemLight : emblem}
        alt={alt}
        priority={priority}
        loading={priority ? undefined : eager ? "eager" : undefined}
        sizes={sizes}
        className="h-auto w-full select-none"
        draggable={false}
      />
      <span aria-hidden className="swc-sweep" />
      {nodes &&
        NODES.map(([x, y]) => (
          <span
            key={`${x}-${y}`}
            aria-hidden
            className="swc-node"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${((x / 100) * SWEEP_S).toFixed(2)}s` }}
          />
        ))}
    </span>
  );
}

/** Navbar / footer lockup: emblem + live-text wordmark with the 3-second shine. */
export function Wordmark({
  className,
  invert = false,
  tagline = true,
  eager = false,
}: {
  className?: string;
  /** Light-on-navy version (footer). */
  invert?: boolean;
  tagline?: boolean;
  eager?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <SwcMark light={invert} nodes={false} eager={eager} sizes="64px" className="w-[58px] shrink-0 sm:w-[64px]" />
      <span className="flex flex-col leading-none">
        <span
          className="shine-text font-sans text-[1.12rem] font-extrabold tracking-[-0.025em] sm:text-[1.2rem]"
          style={invert ? { ["--shine-base" as string]: "#ffffff" } : undefined}
        >
          SmartWebCare
        </span>
        {tagline && (
          <span
            className={cn(
              "mt-1 text-[0.56rem] font-bold uppercase tracking-[0.24em]",
              invert ? "text-[#a9b8cf]" : "text-ink-muted"
            )}
          >
            AI <span aria-hidden>•</span> Software <span aria-hidden>•</span> SaaS
          </span>
        )}
      </span>
    </span>
  );
}
