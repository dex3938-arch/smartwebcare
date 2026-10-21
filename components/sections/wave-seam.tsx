import { cn } from "@/lib/utils";

/*
  "Water-flow" seam between two section colours. Three layered waves drift horizontally
  at different speeds and directions over a dissolving gradient, so the colours melt into
  each other instead of cutting hard. Pure SVG + CSS transforms; static under reduced motion.
*/

export const SEAM = { white: "#ffffff", tint: "#f2f7fc", navy: "#081b3a" } as const;
type Tone = keyof typeof SEAM;

/** Smooth periodic wave across a 2880-wide tile (two 1440 periods → seamless -50% loop). */
function wavePath(halfWave: number, amp: number, base: number, height: number) {
  const W = 2880;
  let d = `M0 ${base} Q${halfWave / 2} ${base - amp * 2} ${halfWave} ${base}`;
  for (let x = halfWave * 2; x <= W; x += halfWave) d += ` T${x} ${base}`;
  return `${d} V${height} H0 Z`;
}

const H = 140;
const LAYERS = [
  { d: wavePath(360, 16, 54, H), opacity: 0.3, duration: 26, reverse: false },
  { d: wavePath(240, 13, 74, H), opacity: 0.55, duration: 17, reverse: true },
  { d: wavePath(180, 9, 96, H), opacity: 1, duration: 11, reverse: false },
];

export function WaveSeam({
  from,
  to,
  className,
}: {
  /** Colour of the section above. */
  from: Tone;
  /** Colour of the section below. */
  to: Tone;
  className?: string;
}) {
  const a = SEAM[from];
  const b = SEAM[to];
  // Light-to-light seams are subtle: keep them shorter.
  const tall = from === "navy" || to === "navy";
  return (
    <div
      aria-hidden
      className={cn("relative w-full overflow-x-clip", tall ? "h-20 md:h-32" : "h-14 md:h-20", className)}
      style={{ background: `linear-gradient(to bottom, ${a} 0%, ${a} 30%, color-mix(in oklab, ${a} 70%, ${b}) 100%)` }}
    >
      {LAYERS.map((l, i) => (
        <div
          key={i}
          aria-hidden
          className={cn("wave-flow absolute inset-0", l.reverse && "wave-flow-reverse")}
          style={{ ["--wave-duration" as string]: `${l.duration}s` }}
        >
          <svg viewBox={`0 0 2880 ${H}`} preserveAspectRatio="none" className="absolute inset-y-0 left-0 h-full w-[200%]">
            <path d={l.d} fill={b} fillOpacity={l.opacity} />
          </svg>
        </div>
      ))}
      {/* 1px under-bleed so no hairline of the upper colour shows on any DPR */}
      <div aria-hidden className="absolute inset-x-0 -bottom-px h-0.5" style={{ background: b }} />
    </div>
  );
}
