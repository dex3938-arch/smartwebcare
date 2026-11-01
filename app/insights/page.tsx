import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { NetworkField } from "@/components/art/network-field";
import { Scene3D } from "@/components/three/scene-3d";
import { Carousel } from "@/components/motion/carousel";
import { RingCarousel } from "@/components/motion/ring-carousel";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { InsightCard } from "@/components/insights/insight-card";
import { INSIGHT_TOPICS, getInsights, getInsightsByTopic } from "@/lib/insights";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Insights — AI, Search, Social & Brand in 2026",
  description:
    "Practical, up-to-date articles from SmartWebCare on AI automation, search and AI answers, social media and brand growth — written for founders and marketers.",
  path: "/insights",
  eyebrow: "Insights",
});

export default function InsightsPage() {
  const all = getInsights();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "SmartWebCare Insights",
          url: `${SITE.url}/insights`,
          hasPart: all.map((a) => ({ "@type": "Article", headline: a.title, url: `${SITE.url}/insights/${a.slug}` })),
        }}
      />

      {/* 3D hero: a constellation of topics */}
      <section className="relative isolate overflow-hidden pt-28 md:pt-36" aria-labelledby="insights-title">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
        <div aria-hidden className="aurora absolute inset-0 -z-10" />
        <div className="container-wide">
          <Breadcrumbs items={[{ name: "Insights", href: "/insights" }]} className="fade-up" />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="eyebrow fade-up mb-6">Insights · {all.length} articles</p>
              <h1 id="insights-title" className="text-[length:var(--text-h1)]">
                <span className="reveal-line">
                  <span>
                    What&rsquo;s working <em className="text-gradient italic">now</em>.
                  </span>
                </span>
              </h1>
              <p className="rise mt-7 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
                Clear, current guidance on AI, search, social and brand — checked against official sources and written for people who run businesses.
              </p>
              <ul className="fade-up mt-9 flex flex-wrap gap-2.5" style={{ ["--i" as string]: 2 }}>
                {INSIGHT_TOPICS.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/insights/topic/${t.slug}`} className="glass inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.92rem] font-semibold text-[var(--color-heading)] transition-colors hover:border-[var(--color-accent)]">
                      {t.label}
                      <span className="tabular rounded-full bg-[var(--color-light-blue)] px-2 py-0.5 text-[0.75rem] text-[var(--color-accent-deep)]">{getInsightsByTopic(t.slug).length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Scene3D variant="constellation" className="shutter navy aspect-[4/3] rounded-[28px] border border-white/10 shadow-[var(--shadow-lift)] [background:radial-gradient(120%_90%_at_50%_40%,#123268_0%,#081b3a_70%)]">
              <NetworkField seed="insights" variant="navy" density={1.2} />
            </Scene3D>
          </div>
        </div>
      </section>

      {all.length > 0 && (
        <section aria-labelledby="all-articles" className="container-wide mt-20 md:mt-28">
          <div className="mb-4 max-w-2xl">
            <p className="eyebrow mb-4">All {all.length} articles</p>
            <h2 id="all-articles" className="text-[length:var(--text-h2)]">
              Spin through the library
            </h2>
            <p className="mt-4 leading-relaxed text-ink-muted">The ring turns on its own — hover to stop it, drag to spin, click any card to read.</p>
          </div>
          <RingCarousel label="All insights articles" speed={6}>
            {all.map((a) => (
              <InsightCard key={a.slug} article={a} />
            ))}
          </RingCarousel>
        </section>
      )}

      {INSIGHT_TOPICS.map((t, i) => {
        const articles = getInsightsByTopic(t.slug);
        if (!articles.length) return null;
        return (
          <section key={t.slug} aria-labelledby={`topic-${t.slug}`} className="container-wide mt-24 md:mt-32">
            <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="eyebrow mb-4">{String(i + 1).padStart(2, "0")} · {t.label}</p>
                <h2 id={`topic-${t.slug}`} className="text-[length:var(--text-h2)]">
                  {t.title}
                </h2>
                <p className="mt-4 leading-relaxed text-ink-muted">{t.description}</p>
              </div>
              <Link href={`/insights/topic/${t.slug}`} className="link-underline inline-flex shrink-0 items-center gap-1.5 font-semibold text-[var(--color-accent-text)]">
                All {t.label} articles <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Reveal>
            <Carousel label={`${t.label} articles`} autoplayMs={5000} slideClassName="basis-[86%] sm:basis-[48%] lg:basis-[32%]">
              {articles.map((a) => (
                <InsightCard key={a.slug} article={a} />
              ))}
            </Carousel>
          </section>
        );
      })}

      {all.length === 0 && (
        <p className="container-wide mt-20 flex items-center gap-2 text-ink-muted">
          <BookOpen className="h-5 w-5" aria-hidden /> New articles are on their way.
        </p>
      )}

      <CtaBand title="Want this applied to your business?" lead="Bring us your question — we'll tell you what we'd do first, in a free 30-minute call." />
    </>
  );
}
