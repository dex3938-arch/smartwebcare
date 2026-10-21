import { cn } from "@/lib/utils";

/**
 * Slow editorial marquee (CSS transform only). Duplicated track for a seamless loop;
 * the duplicate is aria-hidden. Pauses on hover/focus; static under reduced motion.
 */
export function Marquee({
  items,
  className,
  duration = 48,
}: {
  items: string[];
  className?: string;
  duration?: number;
}) {
  const track = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-serif text-[clamp(1.5rem,3vw,2.4rem)] italic text-[var(--color-heading)]/85 md:px-10">
            {item}
          </span>
          <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-cyan)] shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("marquee-host mask-fade-x overflow-hidden", className)}>
      <div
        className="marquee"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
