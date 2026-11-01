import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { FeatureGrid, LinkList, Section, CityDirectory } from "@/components/sections/blocks";
import { ConsultStrip, IncludedShowcase, ProcessFlow } from "@/components/services/service-sections";
import { ServiceViewTracker } from "@/components/analytics/service-view";
import { ServiceSubnav } from "@/components/services/service-subnav";
import { GuideArticle } from "@/components/templates/guide-page";
import { getGuide } from "@/lib/guides";
import { stripMarkup } from "@/lib/markup";
import { SITE } from "@/lib/site";
import { JsonLd } from "@/components/seo/json-ld";
import {
  FEATURED_CITY_PATHS,
  getCity,
  getComparisonsBySlugs,
  getIndustries,
  getLocationService,
  getServicesByCategory,
  type Service,
} from "@/lib/content";
import { faqSchema, serviceSchema } from "@/lib/schema";

/*
  Service landing page:
  hero → What's Included (+ Perfect For) → Why choose us → How It Works →
  consultation → industries → comparisons → FAQ → locations → related → CTA.
*/
export function ServicePage({ service }: { service: Service }) {
  const related = getServicesByCategory(service.category)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 6);
  const industries = getIndustries().filter((i) => service.relevantIndustries.includes(i.slug));
  const comparisons = getComparisonsBySlugs(service.relevantComparisons);
  const local = getLocationService(service.slug);
  const localCities = local
    ? FEATURED_CITY_PATHS.map(([country, city]) => getCity(country, city)).filter(
        (c): c is NonNullable<typeof c> => !!c
      )
    : [];
  const crumbs = [
    { name: "Services", href: "/services" },
    { name: service.title, href: `/${service.slug}` },
  ];
  const title = service.title;
  // AEO also has a long-form guide: it's shown on the service page, after the service content.
  const guide = getGuide(service.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            title: service.title,
            description: service.fullDescription,
            slug: service.slug,
          }),
          ...(service.faqs.length
            ? [faqSchema(service.faqs.map((f) => ({ q: f.question, a: f.answer })))]
            : []),
        ]}
      />

      <ServiceViewTracker slug={service.slug} />
      <PageHero
        crumbs={crumbs}
        eyebrow={[service.categoryLabel, service.badge].filter(Boolean).join(" · ")}
        title={service.title}
        lead={service.heroSubtitle}
        artSeed={service.slug}
        chips={[title, ...service.points.slice(0, 2).map((p) => p.split(/[,(]/)[0].trim())]}
        actions={
          <>
            <Button href="/book-consultation" variant="accent" size="lg">
              Book a free consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button href={SITE.whatsapp} variant="secondary" size="lg">
              Ask us on WhatsApp
            </Button>
          </>
        }
      />
      <ServiceSubnav slug={service.slug} title={service.title} active="overview" />

      <IncludedShowcase service={service} />

      {service.benefits.length > 0 && (
        <Section
          id="benefits"
          className="mt-16 md:mt-20"
          eyebrow="Why SmartWebCare"
          title={
            <>
              Why choose <em className="text-gradient italic">us</em>.
            </>
          }
          lead="When you partner with SmartWebCare, you get more than just a service — you get results."
        >
          <FeatureGrid items={service.benefits} columns={service.benefits.length === 4 ? 4 : 3} />
        </Section>
      )}

      {service.process.length > 0 && <ProcessFlow steps={service.process} />}

      <ConsultStrip title={title} />

      {guide && (
        <>
          <section className="container-wide mt-24 md:mt-32" aria-labelledby="guide-title">
            <p className="eyebrow mb-4">The complete guide</p>
            <h2 id="guide-title" className="max-w-3xl text-[length:var(--text-h2)]">
              {guide.title}
            </h2>
            <p className="mt-5 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-ink-muted">{stripMarkup(guide.lead)}</p>
          </section>
          <GuideArticle guide={guide} />
        </>
      )}

      {industries.length > 0 && (
        <Section id="industries" eyebrow="Industries" title={`${title} for your industry.`}>
          <LinkList
            columns={2}
            items={industries.map((i) => ({
              href: `/industries/${i.slug}`,
              title: i.name,
              description: i.heroSubtitle,
            }))}
          />
        </Section>
      )}

      {comparisons.length > 0 && (
        <Section id="compare" eyebrow="Compare your options" title="Weighing it up?">
          <LinkList
            columns={2}
            items={comparisons.map((c) => ({
              href: `/compare/${c.slug}`,
              title: c.title,
              description: c.heroSubtitle,
            }))}
          />
        </Section>
      )}

      {service.faqs.length > 0 && (
        <Section id="faq" eyebrow="FAQ" title="Questions, answered.">
          <FaqList faqs={service.faqs} />
        </Section>
      )}

      {local && localCities.length > 0 && (
        <Section
          id="locations"
          eyebrow="Locations"
          title={`${title} in your city.`}
          lead="Local strategy, the same senior team. Pick your city for market-specific detail."
        >
          <CityDirectory
            groups={[
              {
                cities: localCities.map((c) => ({
                  href: `/${c.countrySlug}/${c.slug}/${service.slug}`,
                  name: c.name,
                })),
              },
            ]}
          />
        </Section>
      )}

      {related.length > 0 && (
        <Section id="related" eyebrow={`More in ${service.categoryLabel}`} title="Related services.">
          <LinkList
            columns={2}
            items={related.map((s) => ({ href: `/${s.slug}`, title: s.title, description: s.description }))}
          />
        </Section>
      )}

      <CtaBand title={`Let's talk ${title}.`} />
    </>
  );
}
