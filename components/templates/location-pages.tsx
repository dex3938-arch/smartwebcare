import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import {
  CityDirectory,
  FactRow,
  FeatureGrid,
  IncludedList,
  LinkList,
  ProcessSteps,
  Section,
} from "@/components/sections/blocks";
import { JsonLd } from "@/components/seo/json-ld";
import {
  fillTemplate,
  getCitiesForState,
  getCountry,
  getIndustries,
  getIndustryCityFaqs,
  getIndustryServices,
  getLocationService,
  getLocationServices,
  getNearbyCities,
  getService,
  getStateForRegion,
  type City,
  type Industry,
  type LocationService,
  type State,
} from "@/lib/content";
import { TESTIMONIALS } from "@/lib/home";
import { faqSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

/* ------------------------------------------------------------ helpers */

function firstSentence(text: string) {
  const m = /^(.+?[.!?])(\s|$)/.exec(text);
  return m ? m[1] : text;
}

/** Deterministic selection of real client quotes, varied per page. */
function quotesFor(seed: string, n = 3) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const start = h % TESTIMONIALS.length;
  return Array.from({ length: n }, (_, i) => TESTIMONIALS[(start + i * 5) % TESTIMONIALS.length]);
}

function localBusinessSchema(city: City, name: string, path: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE.name} — ${name}`,
    description,
    url: `${SITE.url}${path}`,
    image: `${SITE.url}/brand/logo.png`,
    areaServed: {
      "@type": "City",
      name: city.name,
      ...(city.region
        ? { containedInPlace: { "@type": "AdministrativeArea", name: city.region } }
        : {}),
    },
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}

function QuoteTrio({ seed, city }: { seed: string; city: string }) {
  return (
    <Section
      id="clients"
      eyebrow="Client stories"
      title="What our clients are saying (and sipping on)."
      lead={`Brands across industries trust SmartWebCare — the same team now working with businesses in ${city}.`}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {quotesFor(seed).map((t, i) => (
          <figure
            key={i}
            className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-surface p-7"
          >
            <span aria-hidden className="font-serif text-5xl leading-none text-[var(--color-accent-text)]">
              &ldquo;
            </span>
            <blockquote className="mt-1 flex-1 font-serif text-[1.12rem] leading-[1.5] text-ink">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-[var(--color-border)] pt-4 text-sm">
              <span className="block font-medium text-ink">{t.role}</span>
              <span className="text-ink-muted">{t.context}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function NearbyCities({ city, serviceSlug }: { city: City; serviceSlug?: string }) {
  const nearby = getNearbyCities(city, 10);
  const state = city.countrySlug === "india" ? getStateForRegion(city.region) : undefined;
  if (nearby.length === 0) return null;
  return (
    <Section
      id="nearby"
      eyebrow="Nearby"
      title={`Also serving businesses near ${city.name}.`}
      aside={
        state ? (
          <Button href={`/india/state/${state.slug}`} variant="secondary">
            All of {state.stateName}
          </Button>
        ) : (
          <Button href={`/${city.countrySlug}`} variant="secondary">
            All of {city.country}
          </Button>
        )
      }
    >
      <CityDirectory
        groups={[
          {
            cities: nearby.map((c) => ({
              href: `/${c.countrySlug}/${c.slug}${serviceSlug ? `/${serviceSlug}` : ""}`,
              name: c.name,
            })),
          },
        ]}
      />
    </Section>
  );
}

function cityCrumbs(city: City) {
  const country = getCountry(city.countrySlug);
  return [
    { name: country?.name ?? city.country, href: `/${city.countrySlug}` },
    { name: city.name, href: `/${city.countrySlug}/${city.slug}` },
  ];
}

const ACTIONS = (
  <>
    <Button href="/book-consultation" size="lg">
      Book a free consultation
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Button>
    <Button href={SITE.whatsapp} variant="secondary" size="lg">
      Chat on WhatsApp
    </Button>
  </>
);

/* ------------------------------------------------------------ city hub */

export function CityPage({ city }: { city: City }) {
  const services = getLocationServices();
  const isIndia = city.countrySlug === "india";
  const industries = isIndia ? getIndustries() : [];
  const path = `/${city.countrySlug}/${city.slug}`;

  return (
    <>
      <JsonLd data={localBusinessSchema(city, `Marketing Agency in ${city.name}`, path, city.heroDescription)} />
      <PageHero
        crumbs={cityCrumbs(city)}
        eyebrow={[city.name, city.region, city.country].filter(Boolean).join(" · ")}
        title={city.heroTitle}
        lead={city.heroDescription}
        artSeed={`${city.countrySlug}-${city.slug}`}
        actions={ACTIONS}
        meta={
          <FactRow
            facts={[
              { label: "Brands served", value: "100+" },
              { label: "Organic views", value: "100M+" },
              { label: "Satisfaction", value: "95%" },
            ]}
          />
        }
      />

      <Section
        id="services"
        eyebrow={`Services in ${city.name}`}
        title={`Comprehensive marketing for ${city.name} businesses.`}
        aside={<Button href="/services" variant="secondary">All services</Button>}
      >
        <LinkList
          columns={2}
          items={services.map((s) => ({
            href: `${path}/${s.slug}`,
            title: s.title,
            description: firstSentence(fillTemplate(s.descriptionTemplate, city.name, city.region)),
          }))}
        />
      </Section>

      {industries.length > 0 && (
        <Section
          id="industries"
          eyebrow="By industry"
          title={`Industry marketing in ${city.name}.`}
          lead="Strategies built for how your industry actually sells."
        >
          <LinkList
            columns={3}
            items={industries.map((i) => ({ href: `${path}/${i.slug}`, title: i.name }))}
          />
        </Section>
      )}

      <QuoteTrio seed={path} city={city.name} />
      <NearbyCities city={city} />
      <CtaBand eyebrow={city.name} title={city.ctaHeading} lead={city.ctaDescription} />
    </>
  );
}

/* ------------------------------------------------------------ city × service */

export function CityServicePage({ city, service }: { city: City; service: LocationService }) {
  const title = fillTemplate(service.titleTemplate, city.name, city.region);
  const lead = fillTemplate(service.descriptionTemplate, city.name, city.region);
  const path = `/${city.countrySlug}/${city.slug}/${service.slug}`;
  const faqs = service.faqs.map((f) => ({
    question: fillTemplate(f.question, city.name, city.region),
    answer: fillTemplate(f.answer, city.name, city.region),
  }));
  const main = getService(service.slug);
  const others = getLocationServices().filter((s) => s.slug !== service.slug).slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(city, title, path, lead),
          ...(faqs.length ? [faqSchema(faqs.map((f) => ({ q: f.question, a: f.answer })))] : []),
        ]}
      />
      <PageHero
        crumbs={[...cityCrumbs(city), { name: service.title, href: path }]}
        eyebrow={`${service.title} · ${city.name}`}
        title={title}
        lead={lead}
        artSeed={path}
        actions={ACTIONS}
      />

      <Section id="included" eyebrow="What's included" title={`${service.shortTitle} for ${city.name}, done properly.`}>
        <IncludedList items={service.keyPoints} />
      </Section>

      {service.benefits.length > 0 && (
        <Section id="benefits" eyebrow="Why it works" title="What you get out of it.">
          <FeatureGrid items={service.benefits} />
        </Section>
      )}

      {service.process.length > 0 && (
        <Section id="process" eyebrow="How it works" title="Our process.">
          <ProcessSteps steps={service.process} />
        </Section>
      )}

      {faqs.length > 0 && (
        <Section id="faq" eyebrow="FAQ" title={`${service.shortTitle} in ${city.name}: questions, answered.`}>
          <FaqList faqs={faqs} />
        </Section>
      )}

      {main && (
        <section className="container-wide mt-20">
          <Link
            href={`/${main.slug}`}
            className="group flex flex-col justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-surface p-7 transition-colors hover:border-ink md:flex-row md:items-center md:p-9"
          >
            <span>
              <span className="eyebrow">The full service</span>
              <span className="mt-2 block font-serif text-[1.6rem] text-ink">
                Everything about our {main.title} service
              </span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </section>
      )}

      <Section id="more" eyebrow={`More in ${city.name}`} title="Other services here.">
        <LinkList
          columns={2}
          items={others.map((s) => ({
            href: `/${city.countrySlug}/${city.slug}/${s.slug}`,
            title: s.title,
          }))}
        />
      </Section>

      <NearbyCities city={city} serviceSlug={service.slug} />
      <CtaBand eyebrow={city.name} title={city.ctaHeading} lead={city.ctaDescription} />
    </>
  );
}

/* ------------------------------------------------------------ city × industry (India) */

export function CityIndustryPage({ city, industry }: { city: City; industry: Industry }) {
  const path = `/india/${city.slug}/${industry.slug}`;
  const title = `${industry.name} Marketing in ${city.name}`;
  const lead = `Expert ${industry.name.toLowerCase()} marketing services in ${city.name}. Specialized strategies for ${industry.name.toLowerCase()} to grow their business with proven digital marketing solutions.`;
  const recommended = getIndustryServices(industry.slug);
  const faqs = getIndustryCityFaqs(industry.slug, city.name);

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(city, title, path, lead),
          ...(faqs.length ? [faqSchema(faqs.map((f) => ({ q: f.question, a: f.answer })))] : []),
        ]}
      />
      <PageHero
        crumbs={[...cityCrumbs(city), { name: industry.name, href: path }]}
        eyebrow={`${industry.name} · ${city.name}`}
        title={title}
        lead={lead}
        artSeed={path}
        actions={ACTIONS}
      />

      <Section id="challenges" eyebrow="The challenge" title={industry.heroSubtitle}>
        <FeatureGrid items={industry.challenges} columns={industry.challenges.length >= 4 ? 4 : 3} />
      </Section>

      {recommended.length > 0 && (
        <Section
          id="recommended"
          eyebrow="Recommended"
          title={`What works for ${industry.name.toLowerCase()} in ${city.name}.`}
        >
          <div className="grid gap-6 md:grid-cols-3">
            {recommended.map((r) => (
              <Link
                key={r.slug}
                // City page when that service has one, otherwise the national service page (never a 404).
                href={getLocationService(r.slug) ? `/india/${city.slug}/${r.slug}` : `/${r.slug}`}
                className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-surface p-7 transition-colors hover:border-ink"
              >
                <h3 className="font-serif text-[1.45rem] text-ink group-hover:text-[var(--color-accent-deep)]">{r.name}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{r.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {r.benefits.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-ink-soft"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {faqs.length > 0 && (
        <Section id="faq" eyebrow="FAQ" title={`${industry.name} marketing in ${city.name}: FAQs.`}>
          <FaqList faqs={faqs} />
        </Section>
      )}

      <section className="container-wide mt-20">
        <Link
          href={`/industries/${industry.slug}`}
          className="group flex flex-col justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-surface p-7 transition-colors hover:border-ink md:flex-row md:items-center md:p-9"
        >
          <span>
            <span className="eyebrow">Industry playbook</span>
            <span className="mt-2 block font-serif text-[1.6rem] text-ink">
              How we grow {industry.name.toLowerCase()} brands
            </span>
          </span>
          <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </section>

      <CtaBand eyebrow={city.name} title={city.ctaHeading} lead={city.ctaDescription} />
    </>
  );
}

/* ------------------------------------------------------------ state (India) */

const STATE_SERVICES = [
  { slug: "ai-agents", title: "AI Agents & Automations", d: (s: string) => `Automate business processes for ${s} companies with intelligent AI solutions` },
  { slug: "personal-branding", title: "Personal Branding", d: (s: string) => `Build powerful personal brands for professionals and executives across ${s}` },
  { slug: "instagram-marketing", title: "Instagram Marketing", d: (s: string) => `Grow your Instagram presence and engage audiences throughout ${s}` },
  { slug: "linkedin-marketing", title: "LinkedIn Marketing", d: (s: string) => `Connect with B2B decision-makers and professionals in ${s}` },
  { slug: "performance-marketing", title: "Performance Marketing", d: (s: string) => `Drive measurable ROI with data-driven campaigns targeting ${s} markets` },
  { slug: "brand-development", title: "Brand Development", d: (s: string) => `Create distinctive brands that resonate with ${s} audiences` },
];

export function StatePage({ state }: { state: State }) {
  const cities = getCitiesForState(state).sort((a, b) => a.name.localeCompare(b.name));
  const path = `/india/state/${state.slug}`;
  const hubs = state.topBusinessHubs.map((name) => ({
    name,
    city: cities.find((c) => c.name.toLowerCase() === name.toLowerCase()),
  }));

  return (
    <>
      <PageHero
        crumbs={[
          { name: "India", href: "/india" },
          { name: state.stateName, href: path },
        ]}
        eyebrow={state.stateType === "union-territory" ? "Union territory · India" : "State · India"}
        title={state.heroTitle}
        lead={state.heroDescription}
        artSeed={path}
        artVariant="tint"
        actions={ACTIONS}
        meta={
          <FactRow
            facts={[
              ...(state.population ? [{ label: "Population", value: state.population }] : []),
              { label: "Cities covered", value: cities.length },
              { label: "Key industries", value: state.keyIndustries.length },
            ]}
          />
        }
      />

      <section className="container-wide mt-20 md:mt-28" aria-label={`${state.stateName} at a glance`}>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-5">Key industries</p>
            <ul className="flex flex-wrap gap-2.5">
              {state.keyIndustries.map((k) => (
                <li
                  key={k}
                  className="rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-[0.95rem] text-ink-soft"
                >
                  {k}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5">Top business hubs</p>
            <ul className="flex flex-wrap gap-2.5">
              {hubs.map(({ name, city }) => (
                <li key={name}>
                  {city ? (
                    <Link
                      href={`/india/${city.slug}`}
                      className="inline-flex rounded-full bg-[var(--color-navy)] px-4 py-2 text-[0.95rem] text-white transition-colors hover:bg-[var(--color-accent)]"
                    >
                      {name}
                    </Link>
                  ) : (
                    <span className="inline-flex rounded-full border border-[var(--color-border-strong)] px-4 py-2 text-[0.95rem] text-ink-soft">
                      {name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Section
        id="services"
        eyebrow="Services"
        title={`Marketing services for ${state.stateName}.`}
        lead={`Comprehensive marketing solutions tailored for businesses in ${state.stateName}'s unique market landscape.`}
      >
        <LinkList
          columns={2}
          items={STATE_SERVICES.map((s) => ({ href: `/${s.slug}`, title: s.title, description: s.d(state.stateName) }))}
        />
      </Section>

      {cities.length > 0 && (
        <Section
          id="cities"
          eyebrow="Cities"
          title={`Cities we serve in ${state.stateName}.`}
          lead={`Not seeing your city? We serve businesses across all of ${state.stateName}.`}
        >
          <CityDirectory
            groups={[{ cities: cities.map((c) => ({ href: `/india/${c.slug}`, name: c.name })) }]}
          />
        </Section>
      )}

      <CtaBand title={`Grow your brand across ${state.stateName}.`} />
    </>
  );
}
