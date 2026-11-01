import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Carousel } from "@/components/motion/carousel";
import { RingCarousel } from "@/components/motion/ring-carousel";
import { getCompanyPages, SECTION_META, type CompanyPage } from "@/lib/company-pages";

/** "Explore this section" carousel linking a hub page to its sub-pages. */
export function ExploreCarousel({ section, title }: { section: CompanyPage["section"]; title: string }) {
  const pages = getCompanyPages(section);
  const base = SECTION_META[section].href;
  // Five or more pages turn on a 3D ring; fewer sit in a flat carousel.
  const Wrapper = pages.length >= 5 ? RingCarousel : Carousel;
  return (
    <section aria-labelledby={`explore-${section}`} className="container-wide mt-24 md:mt-32">
      <p className="eyebrow mb-4">Explore</p>
      <h2 id={`explore-${section}`} className="mb-10 text-[length:var(--text-h2)]">
        {title}
      </h2>
      <Wrapper label={title} slideClassName="basis-[84%] sm:basis-[46%] lg:basis-[30%]">
        {pages.map((p, i) => (
          <Link
            key={p.slug}
            href={`${base}/${p.slug}`}
            className="glass group flex h-full min-h-[210px] flex-col rounded-[24px] p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] md:p-7"
          >
            <span className="font-serif text-[2.2rem] leading-none text-[var(--color-accent)]">{String(i + 1).padStart(2, "0")}</span>
            <span className="mt-5 font-serif text-[1.45rem] leading-snug text-[var(--color-heading)]">{p.navLabel}</span>
            <span className="mt-2 flex-1 text-[0.96rem] leading-relaxed text-ink-muted">{p.blurb}</span>
            <ArrowUpRight className="mt-5 h-5 w-5 text-[var(--color-accent-text)] transition-transform duration-300 group-hover:rotate-45" aria-hidden />
          </Link>
        ))}
      </Wrapper>
    </section>
  );
}
