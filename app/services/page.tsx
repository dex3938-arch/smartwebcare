import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { Button } from "@/components/ui/button";
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
      <section className="container-wide mt-20 md:mt-28" aria-label="All services">
        <ServiceShowcase groups={groups} />
      </section>
      <CtaBand title="Not sure where to start?" lead="Tell us the goal — we'll tell you which two or three services actually move it. No packages you don't need." />
    </>
  );
}
