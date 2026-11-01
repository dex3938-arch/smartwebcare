import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/sections/blocks";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";
import { InsightCard } from "@/components/insights/insight-card";
import { JsonLd } from "@/components/seo/json-ld";
import { INSIGHT_TOPICS, getInsightsByTopic, getTopic } from "@/lib/insights";
import { getService } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return INSIGHT_TOPICS.map((t) => ({ topic: t.slug }));
}

type Props = { params: Promise<{ topic: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = getTopic((await params).topic);
  if (!t) return {};
  return buildMetadata({
    title: `${t.label} Insights`,
    description: t.description,
    path: `/insights/topic/${t.slug}`,
    eyebrow: "Insights",
  });
}

export default async function TopicPage({ params }: Props) {
  const t = getTopic((await params).topic);
  if (!t) notFound();
  const articles = getInsightsByTopic(t.slug);
  const services = t.services.map((s) => getService(s)).filter((s): s is NonNullable<typeof s> => !!s);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${t.label} — SmartWebCare Insights`,
          url: `${SITE.url}/insights/topic/${t.slug}`,
          hasPart: articles.map((a) => ({ "@type": "Article", headline: a.title, url: `${SITE.url}/insights/${a.slug}` })),
        }}
      />
      <PageHero
        crumbs={[
          { name: "Insights", href: "/insights" },
          { name: t.label, href: `/insights/topic/${t.slug}` },
        ]}
        eyebrow={`Insights · ${t.label}`}
        title={t.title}
        lead={t.description}
        artSeed={`insights-${t.slug}`}
        artVariant="navy"
        chips={[t.label, `${articles.length} articles`]}
      />

      <Section id="articles" eyebrow={`${articles.length} articles`} title="Read the series">
        <ul className="grid gap-6 md:grid-cols-2">
          {articles.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={i * 0.06}>
              <InsightCard article={a} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="services" eyebrow="Put it to work" title="Related services">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/${s.slug}`} className="glass group flex h-full flex-col rounded-2xl p-5 transition-colors hover:border-[var(--color-accent)]">
                <span className="font-semibold text-[var(--color-heading)]">{s.title}</span>
                <span className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">{s.description}</span>
                <ArrowUpRight className="mt-4 h-4 w-4 text-[var(--color-accent-text)] transition-transform group-hover:rotate-45" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="container-wide mt-16">
        <p className="text-sm text-ink-muted">
          Other topics:{" "}
          {INSIGHT_TOPICS.filter((o) => o.slug !== t.slug).map((o, i, arr) => (
            <span key={o.slug}>
              <Link href={`/insights/topic/${o.slug}`} className="link-underline font-medium text-[var(--color-accent-text)]">
                {o.label}
              </Link>
              {i < arr.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </section>
      <CtaBand />
    </>
  );
}
