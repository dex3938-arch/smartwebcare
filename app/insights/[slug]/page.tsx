import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, ExternalLink, Lightbulb } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/sections/blocks";
import { CtaBand } from "@/components/sections/cta-band";
import { RichText } from "@/components/content/rich-text";
import { Toc } from "@/components/content/toc";
import { FaqList } from "@/components/ui/faq-list";
import { Button } from "@/components/ui/button";
import { RingCarousel } from "@/components/motion/ring-carousel";
import { Reveal } from "@/components/motion/reveal";
import { ReadingProgress } from "@/components/motion/reading-progress";
import { InsightCard, insightMinutes } from "@/components/insights/insight-card";
import { JsonLd } from "@/components/seo/json-ld";
import { getInsight, getInsights, getTopic } from "@/lib/insights";
import { anchor } from "@/lib/subpages";
import { faqSchema, guideSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";
import { stripMarkup } from "@/lib/markup";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getInsights().map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getInsight((await params).slug);
  if (!a) return {};
  return buildMetadata({
    title: a.metaTitle,
    description: a.metaDescription,
    path: `/insights/${a.slug}`,
    eyebrow: getTopic(a.category)?.label ?? "Insights",
    type: "article",
    publishedTime: a.published,
  });
}

export default async function InsightArticle({ params }: Props) {
  const a = getInsight((await params).slug);
  if (!a) notFound();
  const topic = getTopic(a.category);
  const minutes = insightMinutes(a);
  const updated = a.updated ?? a.published;
  const toc = a.sections.map((s) => ({ id: anchor(s.heading), label: stripMarkup(s.heading) }));
  const related = getInsights().filter((o) => o.slug !== a.slug).sort((x, y) => Number(y.category === a.category) - Number(x.category === a.category)).slice(0, 6);

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={[
          { ...guideSchema({ title: a.title, description: a.metaDescription, slug: `insights/${a.slug}`, updated }), datePublished: a.published },
          faqSchema(a.faqs),
        ]}
      />
      <PageHero
        crumbs={[
          { name: "Insights", href: "/insights" },
          ...(topic ? [{ name: topic.label, href: `/insights/topic/${topic.slug}` }] : []),
          { name: a.title, href: `/insights/${a.slug}` },
        ]}
        eyebrow={a.eyebrow}
        title={a.title}
        lead={stripMarkup(a.lead)}
        meta={
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden /> {minutes} min read
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden /> <time dateTime={updated}>{formatDate(updated)}</time>
            </span>
            <span>By the SmartWebCare team</span>
          </p>
        }
      />

      {/* Key points — staggered reveal */}
      <section aria-labelledby="key-points" className="container-wide mt-12 md:mt-16">
        <div className="glass rounded-[28px] p-6 md:p-10">
          <h2 id="key-points" className="flex items-center gap-2.5 font-sans text-[1rem] font-bold uppercase tracking-[0.16em] text-[var(--color-accent-text)]">
            <Lightbulb className="h-5 w-5" aria-hidden /> Key points
          </h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {a.keyPoints.map((k, i) => (
              <Reveal as="li" key={i} delay={i * 0.07} className="flex gap-4">
                <span className="font-serif text-[2rem] leading-none text-[var(--color-accent)]">{i + 1}</span>
                <p className="pt-1 leading-relaxed text-ink-soft">
                  <RichText text={k} />
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <div className="container-wide mt-16 grid gap-12 md:mt-20 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
        <article className="min-w-0 max-w-[72ch]">
          {a.sections.map((s, i) => (
            <section key={i} id={anchor(s.heading)} className="scroll-mt-28 [&+section]:mt-14">
              <h2 className="text-[length:var(--text-h3)] leading-tight">
                <RichText text={s.heading} />
              </h2>
              {s.paragraphs.map((p, k) => (
                <p key={k} className="mt-5 text-[1.06rem] leading-[1.8] text-ink-soft">
                  <RichText text={p} />
                </p>
              ))}
              {s.bullets && s.bullets.length > 0 && (
                <ul className="mt-5 space-y-2.5 text-[1.03rem] leading-[1.7] text-ink-soft">
                  {s.bullets.map((b, k) => (
                    <li key={k} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-cyan)]" />
                      <span>
                        <RichText text={b} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {a.sources && a.sources.length > 0 && (
            <section aria-labelledby="sources" className="mt-16 rounded-2xl border border-[var(--color-border)] p-6">
              <h2 id="sources" className="font-sans text-[0.8rem] font-bold uppercase tracking-[0.16em] text-ink-muted">
                Sources
              </h2>
              <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                {a.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-start gap-1.5 text-[var(--color-accent-text)]">
                      {s.label} <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink-muted">Checked on {formatDate(updated)}. Platforms and rules change — confirm on the official pages before acting.</p>
            </section>
          )}
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <Toc items={toc} />
            <div className="glass mt-8 rounded-2xl p-5">
              <p className="font-semibold text-[var(--color-heading)]">Talk it through</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">A free 30-minute call with the founders about your situation.</p>
              <Button href="/book-consultation" variant="accent" size="sm" className="mt-4 w-full">
                Book a call
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <Section id="faq" eyebrow="Questions" title="Frequently asked">
        <FaqList faqs={a.faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      </Section>

      {related.length > 0 && (
        <Section
          id="related"
          eyebrow="Keep reading"
          title="Related insights"
          aside={
            <Link href="/insights" className="link-underline font-semibold text-[var(--color-accent-text)]">
              All insights
            </Link>
          }
        >
          <RingCarousel label="Related insights">
            {related.map((r) => (
              <InsightCard key={r.slug} article={r} />
            ))}
          </RingCarousel>
        </Section>
      )}
      <CtaBand />
    </>
  );
}
