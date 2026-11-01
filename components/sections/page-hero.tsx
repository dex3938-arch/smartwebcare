import { Breadcrumbs, type Crumb } from "@/components/seo/breadcrumbs";
import { NetworkField, type NetworkVariant } from "@/components/art/network-field";
import { SwcMark } from "@/components/brand/logo";
import { Tilt } from "@/components/motion/tilt";
import { cn } from "@/lib/utils";

/**
 * Inner-page hero: breadcrumb, eyebrow, H1, lead, actions — plus a 3D "glass stack"
 * visual (seeded circuit-network art, a floating SWC card and chips) that tilts with the
 * cursor. Text is plain server-rendered HTML with a CSS-only entrance (LCP-safe).
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  actions,
  meta,
  artSeed,
  artVariant,
  chips,
  className,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  actions?: React.ReactNode;
  meta?: React.ReactNode;
  artSeed?: string;
  artVariant?: NetworkVariant;
  /** Up to three short labels floating over the art. */
  chips?: string[];
  className?: string;
}) {
  const labels = (chips ?? (eyebrow ? eyebrow.split(" · ") : [])).slice(0, 3);
  return (
    <section className={cn("relative isolate overflow-hidden pt-28 md:pt-36", className)}>
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div aria-hidden className="aurora absolute inset-0 -z-10" />
      <div className="container-wide">
        <Breadcrumbs items={crumbs} className="fade-up" />
        <div className={cn("mt-10 grid items-center gap-12 md:mt-12", artSeed && "lg:grid-cols-[1.2fr_0.8fr] lg:gap-16")}>
          <div>
            {eyebrow && (
              <p className="eyebrow fade-up mb-6" style={{ ["--i" as string]: 0 }}>
                {eyebrow}
              </p>
            )}
            <h1 className={cn(typeof title === "string" && title.length > 48 ? "text-[clamp(2.1rem,4.2vw,3.7rem)] leading-[1.04]" : "text-[length:var(--text-h1)]")}>
              <span className="reveal-line">
                <span>{title}</span>
              </span>
            </h1>
            {lead && (
              <p className="rise mt-7 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-ink-soft" style={{ ["--i" as string]: 1 }}>
                {lead}
              </p>
            )}
            {actions && (
              <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={{ ["--i" as string]: 2 }}>
                {actions}
              </div>
            )}
            {meta && (
              <div className="fade-up mt-10" style={{ ["--i" as string]: 3 }}>
                {meta}
              </div>
            )}
          </div>

          {artSeed && (
            <Tilt max={7} className="mx-auto w-full max-w-[460px] rounded-[28px] lg:max-w-none">
              <div className="shutter relative aspect-[16/11] overflow-hidden rounded-[28px] border border-white shadow-[var(--shadow-lift)] lg:aspect-[4/5]">
                <NetworkField seed={artSeed} variant={artVariant ?? "light"} density={1.25} />
              </div>
              <div className="glass depth-1 absolute bottom-[8%] left-[-4%] w-[58%] rounded-2xl p-4 shadow-[var(--shadow-lift)]">
                <SwcMark eager sizes="200px" nodeSize="9%" className="w-full" />
              </div>
              {labels.map((l, i) => (
                <span
                  key={l}
                  aria-hidden
                  className={cn(
                    "glass float-slow depth-2 absolute inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.75rem] font-bold text-[var(--color-heading)]",
                    i === 0 && "right-[-3%] top-[10%]",
                    i === 1 && "right-[6%] top-[42%] hidden sm:inline-flex",
                    i === 2 && "left-[8%] top-[18%] hidden sm:inline-flex"
                  )}
                  style={{ animationDelay: `${i * -1.6}s` }}
                >
                  <span className="h-2 w-2 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-cyan)] shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
                  {l}
                </span>
              ))}
            </Tilt>
          )}
        </div>
      </div>
      <div className="container-wide">
        <div className="hairline mt-16 md:mt-24" />
      </div>
    </section>
  );
}
