import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { TESTIMONIALS } from "@/lib/home";
import { getService } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Clients — Work, in Our Clients' Words",
  description:
    "What founders, creators and D2C brands say about working with SmartWebCare — from FMCG launches and skincare to personal brands on LinkedIn and Instagram.",
  path: "/clients",
  eyebrow: "Client stories",
});

/*
  Only genuine, published client testimonials — no invented case studies, logos or
  metrics. Outcomes appear only where the client stated them in their own words.
  Add real project imagery here when available (see docs/ASSET-MANIFEST.md).
*/
export default function ClientsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Clients", href: "/clients" }]}
        eyebrow={`${TESTIMONIALS.length} client stories`}
        title="Work, in our clients' words."
        lead="From skincare to coffee, coaches to creators — brands across industries are growing juicy with SmartWebCare. Here's what they say about the work."
        artSeed="clients-index"
      />
      <section className="container-wide mt-20 md:mt-28" aria-label="Client stories">
        <ol className="grid gap-px overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => {
            const service = getService(t.service);
            const feature = i % 5 === 0;
            return (
              <Reveal
                as="li"
                key={i}
                delay={(i % 2) * 0.06}
                className={cn("flex flex-col bg-[var(--color-background)] p-7 md:p-10", feature && "md:col-span-2")}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="tabular text-xs text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  {t.outcome && (
                    <span className="rounded-full border border-[var(--color-accent)] px-3 py-1 text-xs font-medium text-[var(--color-accent-text)]">
                      {t.outcome}
                    </span>
                  )}
                </div>
                <figure className="mt-6 flex flex-1 flex-col">
                  <blockquote
                    className={cn(
                      "flex-1 font-serif leading-[1.18] text-ink",
                      feature ? "text-[clamp(1.7rem,3vw,2.75rem)]" : "text-[clamp(1.3rem,2vw,1.6rem)]"
                    )}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-[var(--color-border)] pt-5">
                    <span>
                      <span className="block font-medium text-ink">{t.role}</span>
                      <span className="block text-sm text-ink-muted">{t.context}</span>
                    </span>
                    {service && (
                      <Link href={`/${service.slug}`} className="group inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
                        {service.title}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" aria-hidden />
                      </Link>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </ol>
        <p className="mt-8 text-sm text-ink-muted">
          Testimonials as shared with SmartWebCare. Outcomes are as stated by the clients themselves.
        </p>
      </section>
      <CtaBand title="Your brand could be next." />
    </>
  );
}
