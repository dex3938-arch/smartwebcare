import Image from "next/image";
import { ArrowUpRight, Camera } from "lucide-react";
import { SwcMark } from "@/components/brand/logo";
import { Tilt } from "@/components/motion/tilt";
import type { Person } from "@/lib/people";
import { cn } from "@/lib/utils";

/**
 * Founder profile card. Until a real portrait is supplied it shows a clearly-labelled,
 * on-brand placeholder frame (navy glass, initials, the SWC emblem) — never a stock or
 * AI-generated face.
 */
export function FounderCard({
  person,
  aspect = "4 / 5",
  headingLevel = 3,
  className,
  id,
}: {
  person: Person;
  aspect?: string;
  headingLevel?: 2 | 3;
  className?: string;
  id?: string;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className={cn("group", className)} aria-labelledby={id}>
      <Tilt max={6} className="rounded-[var(--radius-xl)]">
        <div
          className="navy relative isolate overflow-hidden rounded-[var(--radius-xl)] border border-white/10 shadow-[var(--shadow-lift)]"
          style={{ aspectRatio: aspect }}
        >
          {person.photo ? (
            <>
              <Image
                src={person.photo}
                alt={person.alt ?? person.name}
                fill
                placeholder="blur"
                quality={75}
                sizes="(min-width: 1360px) 620px, (min-width: 768px) 46vw, 92vw"
                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                style={{ objectPosition: person.focal }}
              />
              <SwcMark light nodes={false} sizes="140px" className="absolute right-5 top-5 w-24 opacity-90 drop-shadow-[0_2px_10px_rgba(8,27,58,0.6)]" />
            </>
          ) : (
            <>
              <div aria-hidden className="grid-bg absolute inset-0 opacity-70" />
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_38%,rgba(59,130,246,0.45),transparent_70%)]" />
              <div aria-hidden className="absolute inset-0 grid place-items-center">
                <span className="relative grid h-[42%] aspect-square place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                  <span className="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-none text-white/90">{person.initials}</span>
                </span>
              </div>
              <SwcMark light nodes={false} sizes="140px" className="absolute right-5 top-5 w-28 opacity-80" />
              <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.72rem] font-semibold text-[#c7d5ea] backdrop-blur">
                <Camera className="h-3.5 w-3.5" aria-hidden /> Portrait coming soon
              </span>
            </>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#081b3a] via-[#081b3a]/70 to-transparent p-6 pt-16 md:p-8 md:pt-20">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#7dd3fc]">
              {person.motto}
            </p>
            <H id={id} className="mt-2 font-serif text-[clamp(2rem,3.6vw,3.2rem)] leading-[1] text-white">
              {person.name}
            </H>
          </div>
        </div>
      </Tilt>
      <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-ink-soft">{person.bio}</p>
      <a
        href={person.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent-text)]"
      >
        {person.name.split(" ")[0]} on LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </a>
    </article>
  );
}
