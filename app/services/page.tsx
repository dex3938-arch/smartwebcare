import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import Link from "next/link";
import { ArrowRight, BookOpen, Route, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/motion/carousel";
import { NetworkField } from "@/components/art/network-field";
import { Scene3D } from "@/components/three/scene-3d";
import { getSubpages } from "@/lib/subpages";
import { CATEGORY_LABELS, getServicesByCategory, getServices, type ServiceCategory } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Services — Branding, Marketing, Design & AI Automation",
  description:
    "Every SmartWebCare service in one place: personal branding, social media, performance marketing, SEO & AEO, design, video, web, and AI agents & automations.",
  path: "/services",
  eyebrow: "Services",
});

const ORDER: ServiceCategory[] = ["branding", "marketing", "design", "ai"];

export default function ServicesPage() {
  const total = getServices().length;
  const groups = ORDER.map((cat) => ({
    label: CATEGORY_LABELS[cat],
    services: getServicesByCategory(cat).map((s) => ({
      slug: s.slug,
      title: s.title,
      description: s.description,
      categoryLabel: s.categoryLabel,
      badge: s.badge,
      points: s.points.slice(0, 3),
    })),
  })).filter((g) => g.services.length > 0);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", href: "/services" }]}
        eyebrow={`${total} services · 4 disciplines`}
        title="Everything a brand needs to grow."
        lead="From raw ideas to ripe identities: strategy, content, performance, design and AI — built to work together, or to slot into what you already have."
        artSeed="services-index"
        actions={
          <Button href="/contact" variant="accent" size="lg">
            Start a Project
          </Button>
        }
      />
      {/* 3D band — four disciplines orbiting one team */}
      <section aria-labelledby="orbit-title" className="container-wide mt-16 md:mt-20">
        <div className="navy relative isolate grid overflow-hidden rounded-[32px] lg:grid-cols-[0.9fr_1.1fr]" style={{ background: "linear-gradient(135deg,#081b3a 0%,#0d2550 60%,#173f8f 130%)" }}>
          <div className="relative z-[1] p-7 sm:p-10 md:p-14">
            <p className="eyebrow mb-5">One team · every discipline</p>
            <h2 id="orbit-title" className="text-[length:var(--text-h2)] leading-[1.02] text-white">
              Four disciplines, <em className="italic text-[#67e8f9]">one orbit</em>.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-[#c7d5ea]">
              Branding, marketing, design and AI work best when they share one plan. Pick a single service or let them orbit the same goal.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {groups.map((g) => (
                <li key={g.label} className="rounded-2xl border border-white/12 bg-white/[0.06] p-4">
                  <span className="block font-serif text-[2rem] leading-none text-white">{g.services.length}</span>
                  <span className="mt-1.5 block text-sm text-[#c7d5ea]">{g.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <Scene3D variant="orbit" className="min-h-[300px] lg:min-h-[480px]">
            <NetworkField seed="services-orbit" variant="navy" density={1.2} />
          </Scene3D>
        </div>
      </section>

      <section className="container-wide mt-20 md:mt-28" aria-label="All services">
        <ServiceShowcase groups={groups} />
      </section>

      {/* Go deeper: each service's guide, process and use cases */}
      <section aria-labelledby="deeper-title" className="container-wide mt-24 md:mt-32">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow mb-4">Go deeper</p>
          <h2 id="deeper-title" className="text-[length:var(--text-h2)]">
            Guides, process & use cases for every service
          </h2>
          <p className="mt-4 leading-relaxed text-ink-muted">Learn how each service works in 2026, how we deliver it and who it&rsquo;s for — before you talk to us.</p>
        </div>
        <Carousel label="Service guides" autoplayMs={4000} slideClassName="basis-[84%] sm:basis-[46%] lg:basis-[30%]">
          {getServices()
            .filter((sv) => getSubpages(sv.slug))
            .map((sv) => (
              <div key={sv.slug} className="glass flex h-full flex-col rounded-[24px] p-6">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--color-accent-text)]">{sv.categoryLabel}</p>
                <Link href={`/${sv.slug}`} className="mt-3 font-serif text-[1.45rem] leading-snug text-[var(--color-heading)] hover:text-[var(--color-accent-text)]">
                  {sv.title}
                </Link>
                <ul className="mt-5 grid gap-2">
                  {[
                    { href: `/${sv.slug}/guide`, label: "2026 guide", Icon: BookOpen },
                    { href: `/${sv.slug}/process`, label: "How we deliver it", Icon: Route },
                    { href: `/${sv.slug}/use-cases`, label: "Use cases", Icon: Sparkles },
                  ].map(({ href, label, Icon }) => (
                    <li key={href}>
                      <Link href={href} className="group flex min-h-11 items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-white/70 px-3.5 text-[0.93rem] font-medium text-ink-soft transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-heading)]">
                        <span className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4 text-[var(--color-accent-text)]" aria-hidden /> {label}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </Carousel>
      </section>
      <CtaBand title="Not sure where to start?" lead="Tell us the goal — we'll tell you which two or three services actually move it. No packages you don't need." />
    </>
  );
}
