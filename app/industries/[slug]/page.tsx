import type { Metadata } from "next";
import { WaveSeam } from "@/components/sections/wave-seam";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { FeatureGrid, LinkList, ProcessSteps, Section } from "@/components/sections/blocks";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getIndustries,
  getIndustry,
  getIndustryComparisonForIndustry,
  getServicesBySlugs,
  SHOW_UNVERIFIED_INDUSTRY_PROOF,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { faqSchema } from "@/lib/schema";
import { whatsappHref } from "@/lib/whatsapp";

export const dynamicParams = false;
export const generateStaticParams = () => getIndustries().map((i) => ({ slug: i.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = getIndustry((await params).slug);
  if (!industry) return {};
  return buildMetadata({
    title: industry.metaTitle,
    absoluteTitle: /smartwebcare/i.test(industry.metaTitle),
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`,
    eyebrow: industry.name,
    keywords: industry.keywords,
  });
}

export default async function IndustryPage({ params }: Props) {
  const industry = getIndustry((await params).slug);
  if (!industry) notFound();
  const services = getServicesBySlugs(industry.relevantServices);
  const comparison = getIndustryComparisonForIndustry(industry.slug);

  return (
    <>
      {industry.faqs.length > 0 && (
        <JsonLd data={faqSchema(industry.faqs.map((f) => ({ q: f.question, a: f.answer })))} />
      )}
      <PageHero
        crumbs={[
          { name: "Industries", href: "/industries" },
          { name: industry.name, href: `/industries/${industry.slug}` },
        ]}
        eyebrow={industry.name}
        title={industry.heroTitle}
        lead={industry.heroDescription}
        artSeed={`industry-${industry.slug}`}
        actions={
          <>
            <Button href="/contact" variant="accent" size="lg">
              Start a Project
            </Button>
            <Button href={whatsappHref()} variant="secondary" size="lg">
              Chat on WhatsApp
            </Button>
          </>
        }
      />

      <Section id="challenges" eyebrow="The challenge" title={industry.heroSubtitle}>
        <FeatureGrid items={industry.challenges} columns={industry.challenges.length >= 4 ? 4 : 3} />
      </Section>

      {SHOW_UNVERIFIED_INDUSTRY_PROOF && industry.results.length > 0 && (
        <Section
          id="results"
          eyebrow="Results"
          title="What growth looks like."
          lead="Figures as published by SmartWebCare for this industry."
        >
          <dl className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-3">
            {industry.results.map((r, i) => (
              <Reveal key={r.value} delay={i * 0.08} className="flex flex-col bg-[var(--color-background)] p-7 md:p-9">
                <dt className="order-2 mt-4 font-medium text-ink">{r.value}</dt>
                <dd className="order-1 font-serif text-[clamp(3rem,5vw,4.5rem)] leading-none text-[var(--color-accent-text)]">
                  {r.metric}
                </dd>
                <dd className="order-3 mt-2 text-sm leading-relaxed text-ink-muted">{r.description}</dd>
              </Reveal>
            ))}
          </dl>
        </Section>
      )}

      {industry.process.length > 0 && (
        <Section id="process" eyebrow="How we work" title={`Our playbook for ${industry.name.toLowerCase()}.`}>
          <ProcessSteps steps={industry.process} />
        </Section>
      )}

      {services.length > 0 && (
        <Section id="services" eyebrow="Recommended services" title="Where we'd start.">
          <LinkList
            columns={2}
            items={services.map((s) => ({ href: `/${s.slug}`, title: s.title, description: s.description }))}
          />
        </Section>
      )}

      {SHOW_UNVERIFIED_INDUSTRY_PROOF && industry.testimonial?.quote && (
        <>
          <WaveSeam from="white" to="tint" className="mt-24 md:mt-32" />
          <section className="tint pb-20 pt-6 md:pb-28 md:pt-10" aria-label="Client story">
            <figure className="container-wide max-w-5xl">
              <blockquote className="font-serif text-[clamp(1.8rem,3.4vw,3.1rem)] leading-[1.12] text-ink">
                &ldquo;{industry.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 text-sm">
                <span className="font-medium text-ink">{industry.testimonial.name}</span>
                <span className="text-ink-muted">
                  {" "}
                  — {[industry.testimonial.role, industry.testimonial.company].filter(Boolean).join(", ")}
                </span>
              </figcaption>
            </figure>
          </section>
          <WaveSeam from="tint" to="white" />
        </>
      )}

      {comparison && (
        <section className="container-wide mt-20">
          <Link
            href={`/industry-compare/${comparison.slug}`}
            className="group flex flex-col justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7 transition-colors hover:border-ink md:flex-row md:items-center md:p-9"
          >
            <span>
              <span className="eyebrow">Compare your options</span>
              <span className="mt-2 block font-serif text-[1.8rem] leading-tight text-ink">{comparison.title}</span>
              <span className="mt-2 block text-ink-muted">{comparison.heroSubtitle}</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </section>
      )}

      {industry.faqs.length > 0 && (
        <Section id="faq" eyebrow="FAQ" title="Questions, answered.">
          <FaqList faqs={industry.faqs} />
        </Section>
      )}

      <CtaBand title={`Let's grow your ${industry.name.toLowerCase()} brand.`} />
    </>
  );
}
