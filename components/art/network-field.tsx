import { cn } from "@/lib/utils";

/*
  Deterministic generative artwork: a circuit-board network — nodes on a jittered grid,
  joined by right-angled traces, a few glowing hubs and an orbit ring echoing the "C"
  of the SWC emblem. Seeded by a string (usually the page slug) so every page gets a
  unique, on-brand visual. Pure SVG, no JS, no stock imagery; animation is CSS-only.
*/

function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed: number) {
  let s = seed || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}
const r1 = (n: number) => Math.round(n * 10) / 10;

const PALETTES = {
  light: { bg0: "#ffffff", bg1: "#eaf2ff", trace: "#2563eb", traceOp: 0.28, node: "#1d4ed8", glow: "#67e8f9", ring: "#93c5fd" },
  tint: { bg0: "#f2f7fc", bg1: "#dbeafe", trace: "#2563eb", traceOp: 0.3, node: "#1d4ed8", glow: "#22d3ee", ring: "#93c5fd" },
  navy: { bg0: "#0d2550", bg1: "#081b3a", trace: "#7dd3fc", traceOp: 0.32, node: "#bfdbfe", glow: "#67e8f9", ring: "#3b82f6" },
} as const;

export type NetworkVariant = keyof typeof PALETTES;

type Node = { x: number; y: number; hub: boolean; glow: boolean; delay: number };

export function NetworkField({
  seed,
  variant = "light",
  density = 1,
  className,
  animated = true,
}: {
  seed: string;
  variant?: NetworkVariant;
  density?: number;
  className?: string;
  animated?: boolean;
}) {
  const p = PALETTES[variant];
  const rand = rng(hash(seed));
  const W = 400;
  const H = 500;
  const cols = Math.max(4, Math.round(5 * density));
  const rows = Math.max(5, Math.round(6 * density));
  const cw = W / cols;
  const ch = H / rows;

  const nodes: Node[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rand() < 0.22) continue; // leave gaps so it reads as a circuit, not a lattice
      nodes.push({
        x: r1(c * cw + cw * (0.25 + rand() * 0.5)),
        y: r1(r * ch + ch * (0.25 + rand() * 0.5)),
        hub: rand() < 0.12,
        glow: rand() < 0.3,
        delay: r1(rand() * 3),
      });
    }
  }

  // Right-angled traces to the nearest one or two neighbours.
  const traces: { d: string; dashed: boolean }[] = [];
  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
      .filter((o) => o.j > i)
      .sort((a, b) => a.d - b.d)
      .slice(0, rand() < 0.5 ? 1 : 2);
    near.forEach(({ j }) => {
      const m = nodes[j];
      const elbowFirst = rand() < 0.5;
      const d = elbowFirst
        ? `M${n.x} ${n.y} H${m.x} V${m.y}`
        : `M${n.x} ${n.y} V${m.y} H${m.x}`;
      traces.push({ d, dashed: rand() < 0.28 });
    });
  });

  const cx = r1(W * (0.35 + rand() * 0.3));
  const cy = r1(H * (0.35 + rand() * 0.3));
  const gid = `nf-${hash(seed + variant).toString(36)}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("absolute inset-0 h-full w-full", className)}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.bg0} />
          <stop offset="1" stopColor={p.bg1} />
        </linearGradient>
        <radialGradient id={`${gid}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={p.glow} stopOpacity="0.55" />
          <stop offset="1" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${gid}-bg)`} />
      <circle cx={cx} cy={cy} r={W * 0.55} fill={`url(#${gid}-glow)`} opacity="0.55" />

      {/* orbit rings */}
      <g className={animated ? "orbit-ring" : undefined}>
        <ellipse cx={cx} cy={cy} rx={W * 0.48} ry={W * 0.17} fill="none" stroke={p.ring} strokeOpacity="0.55" strokeWidth="1.2" transform={`rotate(-24 ${cx} ${cy})`} />
        <circle cx={r1(cx + W * 0.44)} cy={r1(cy - W * 0.19)} r="4" fill={p.glow} />
      </g>
      <g className={animated ? "orbit-ring orbit-ring-reverse" : undefined}>
        <ellipse cx={cx} cy={cy} rx={W * 0.36} ry={W * 0.12} fill="none" stroke={p.ring} strokeOpacity="0.35" strokeWidth="1" transform={`rotate(32 ${cx} ${cy})`} />
      </g>

      {/* traces */}
      <g fill="none" stroke={p.trace} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {traces.map((t, i) => (
          <path
            key={i}
            d={t.d}
            strokeOpacity={t.dashed ? Math.min(1, p.traceOp + 0.35) : p.traceOp}
            className={t.dashed && animated ? "net-line" : undefined}
          />
        ))}
      </g>

      {/* nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          {(n.hub || n.glow) && (
            <circle
              cx={n.x}
              cy={n.y}
              r={n.hub ? 14 : 8}
              fill={p.glow}
              opacity="0.35"
              className={animated ? "net-dot" : undefined}
              style={animated ? { animationDelay: `${n.delay}s` } : undefined}
            />
          )}
          <circle cx={n.x} cy={n.y} r={n.hub ? 5.5 : 3.2} fill={n.glow || n.hub ? p.glow : p.bg0} stroke={p.node} strokeWidth="1.4" />
        </g>
      ))}
    </svg>
  );
}
