import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, CalendarDays, Check, ClipboardList, Clock, Gauge, PackageCheck, Route, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Section } from "@/components/sections/blocks";
import { RichText } from "@/components/content/rich-text";
import { Toc } from "@/components/content/toc";
import { Reveal } from "@/components/motion/reveal";
import { Carousel } from "@/components/motion/carousel";
import { StepTimeline } from "@/components/motion/step-timeline";
import { ReadingProgress } from "@/components/motion/reading-progress";
import { ServiceSubnav } from "@/components/services/service-subnav";
import { JsonLd } from "@/components/seo/json-ld";
import { getIndustries, type Service } from "@/lib/content";
import { getInsightsForService } from "@/lib/insights";
import { SUBPAGE_KINDS, anchor, readingMinutes, type ContentSection, type Faq, type GuidePage, type ProcessPage, type SubpageKind, type UseCasesPage } from "@/lib/subpages";
import { faqSchema, guideSchema } from "@/lib/schema";
import { stripMarkup } from "@/lib/markup";
import { formatDate } from "@/lib/utils";

/*
  Templates for /{service}/guide, /{service}/process and /{service}/use-cases.
  Content is plain server-rendered HTML; motion (carousel depth, scroll-linked timeline,
  reveals, reading progress) is layered on top and respects reduced motion.
*/

export const SUBPAGES_UPDATED = "2026-11-01";

function crumbs(service: Service, label: string, path: string) {
  return [
    { name: "Services", href: "/services" },
    { name: service.title, href: `/${service.slug}` },
    { name: label, href: path },
  ];
}

function faqItems(faqs: Faq[]) {
  return faqs.map((f) => ({ question: f.q, answer: f.a }));
}

function Paragraphs({ section }: { section: ContentSection }) {
  return (
    <>
      {section.paragraphs.map((p, i) => (
        <p key={i} className="mt-5 text-[1.06rem] leading-[1.8] text-ink-soft">
          <RichText text={p} />
        </p>
      ))}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="mt-5 space-y-2.5 text-[1.03rem] leading-[1.7] text-ink-soft">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-cyan)]" />
              <span>
                <RichText text={b} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

const NEXT_ICONS = { guide: BookOpen, process: Route, useCases: Sparkles } as const;
const NEXT_BLURB: Record<SubpageKind, string> = {
  guide: "The 2026 guide: how it works, what changed and how to measure it.",
  process: "How we deliver it, step by step, and what you get at each stage.",
  useCases: "Who it's for: real-world scenarios, approaches and what to track.",
};

/** "Keep exploring" — the other two sub-pages plus related insights articles. */
function KeepExploring({ service, current }: { service: Service; current: SubpageKind }) {
  const others = SUBPAGE_KINDS.filter((k) => k.key !== current);
  const reading = getInsightsForService(service.slug, 2);
  return (
    <Section id="keep-exploring" eyebrow="Keep exploring" title={`More on ${service.title}`}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {others.map((k, i) => {
          const Icon = NEXT_ICONS[k.key];
          return (
            <Reveal key={k.key} delay={i * 0.06}>
              <Link href={`/${service.slug}/${k.path}`} className="glass group flex h-full flex-col rounded-[var(--radius-lg)] p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]">
                <Icon className="h-6 w-6 text-[var(--color-accent-text)]" aria-hidden />
                <span className="mt-5 font-serif text-[1.4rem] leading-snug text-[var(--color-heading)]">
                  {service.title}: {k.label.toLowerCase()}
                </span>
                <span className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-muted">{NEXT_BLURB[k.key]}</span>
                <ArrowRight className="mt-5 h-4 w-4 text-[var(--color-accent-text)] transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </Reveal>
          );
        })}
        {reading.map((a, i) => (
          <Reveal key={a.slug} delay={(i + 2) * 0.06}>
            <Link href={`/insights/${a.slug}`} className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]">
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--color-accent-text)]">Insights · {a.eyebrow}</span>
              <span className="mt-4 flex-1 font-serif text-[1.25rem] leading-snug text-[var(--color-heading)]">{a.title}</span>
              <ArrowUpRight className="mt-5 h-4 w-4 text-[var(--color-accent-text)] transition-transform group-hover:rotate-45" aria-hidden />
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Actions({ service }: { service: Service }) {
  return (
    <>
      <Button href="/book-consultation" variant="accent" size="lg">
        Book a free consultation
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
      <Button href={`/${service.slug}`} variant="secondary" size="lg">
        {service.title} overview
      </Button>
    </>
  );
}

/* ───────────────────────────── Guide ───────────────────────────── */

export function ServiceGuideTemplate({ service, page }: { service: Service; page: GuidePage }) {
  const path = `/${service.slug}/guide`;
  const toc = page.sections.map((s) => ({ id: anchor(s.heading), label: stripMarkup(s.heading) }));
  const minutes = readingMinutes(page.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]));
  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={[
          guideSchema({ title: page.title, description: page.metaDescription, slug: path.slice(1), updated: SUBPAGES_UPDATED }),
          faqSchema(page.faqs),
        ]}
      />
      <PageHero
        crumbs={crumbs(service, "Guide", path)}
        eyebrow={page.eyebrow}
        title={page.title}
        lead={stripMarkup(page.lead)}
        artSeed={`${service.slug}-guide`}
        chips={[service.title, "2026 guide", `${minutes} min read`]}
        actions={<Actions service={service} />}
        meta={
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden /> {minutes} min read
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden /> Updated <time dateTime={SUBPAGES_UPDATED}>{formatDate(SUBPAGES_UPDATED)}</time>
            </span>
          </p>
        }
      />
      <ServiceSubnav slug={service.slug} title={service.title} active="guide" />

      {/* Key takeaways — a cinematic carousel on a navy band */}
      <section aria-labelledby="takeaways-title" className="container-wide mt-14 md:mt-20">
        <div className="navy relative isolate overflow-hidden rounded-[32px] px-5 py-10 sm:px-10 md:px-14 md:py-14" style={{ background: "linear-gradient(135deg,#081b3a 0%,#0d2550 55%,#1d4ed8 140%)" }}>
          <div aria-hidden className="grid-bg absolute inset-0 -z-10 opacity-40" />
          <p className="eyebrow mb-4">In short</p>
          <h2 id="takeaways-title" className="text-[length:var(--text-h3)] leading-tight text-white">
            Key takeaways
          </h2>
          <Carousel label="Key takeaways" tone="navy" className="mt-8" slideClassName="basis-[84%] sm:basis-[46%] lg:basis-[31%]">
            {page.takeaways.map((t, i) => (
              <div key={i} className="flex h-full min-h-[190px] flex-col rounded-[22px] border border-white/15 bg-white/[0.07] p-6 backdrop-blur">
                <span className="font-serif text-[2.4rem] leading-none text-[#67e8f9]">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-[#dbe7f7]">
                  <RichText text={t} />
                </p>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <div className="container-wide mt-16 grid gap-12 md:mt-24 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
        <article className="min-w-0 max-w-[72ch]">
          {page.sections.map((s, i) => (
            <section key={i} id={anchor(s.heading)} className="scroll-mt-28 [&+section]:mt-14">
              <h2 className="text-[length:var(--text-h3)] leading-tight">
                <RichText text={s.heading} />
              </h2>
              <Paragraphs section={s} />
            </section>
          ))}
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <Toc items={toc} />
            <div className="glass mt-8 rounded-2xl p-5">
              <p className="font-semibold text-[var(--color-heading)]">Need help with {service.title.toLowerCase()}?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">A free 30-minute call with the founders. No obligation.</p>
              <Button href="/book-consultation" variant="accent" size="sm" className="mt-4 w-full">
                Book a call
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <Section id="faq" eyebrow="Questions" title="Frequently asked">
        <FaqList faqs={faqItems(page.faqs)} />
      </Section>
      <KeepExploring service={service} current="guide" />
      <CtaBand title={`Let's plan your ${service.title.toLowerCase()}.`} />
    </>
  );
}

/* ──────────────────────────── Process ──────────────────────────── */

export function ServiceProcessTemplate({ service, page }: { service: Service; page: ProcessPage }) {
  const path = `/${service.slug}/process`;
  return (
    <>
      <JsonLd data={faqSchema(page.faqs)} />
      <PageHero
        crumbs={crumbs(service, "Process", path)}
        eyebrow={page.eyebrow}
        title={page.title}
        lead={stripMarkup(page.lead)}
        artSeed={`${service.slug}-process`}
        artVariant="tint"
        chips={[`${page.steps.length} steps`, `${page.deliverables.length} deliverables`, service.title]}
        actions={<Actions service={service} />}
      />
      <ServiceSubnav slug={service.slug} title={service.title} active="process" />

      <Section id="steps" eyebrow="Step by step" title="How we deliver it" lead="Scroll through each stage — what happens, and what you get at the end of it.">
        <StepTimeline className="max-w-4xl">
          {page.steps.map((s, i) => (
            <Reveal as="li" key={i} className="relative">
              <span className="step-orb absolute -left-12 top-0 z-[1] grid h-9 w-9 place-items-center rounded-full font-serif text-[1.05rem] leading-none text-white md:-left-20 md:h-14 md:w-14 md:text-[1.5rem]">
                <span className="sr-only">Step </span>
                {i + 1}
              </span>
              <div className="glass rounded-[var(--radius-lg)] p-6 md:p-8">
                <h3 className="font-serif text-[1.5rem] leading-snug md:text-[1.75rem]">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  <RichText text={s.summary} />
                </p>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {s.activities.map((a, k) => (
                    <li key={k} className="flex items-start gap-2.5 text-[0.97rem] leading-snug text-ink-soft">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-text)]" strokeWidth={3} aria-hidden />
                      <span>
                        <RichText text={a} />
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 flex items-start gap-2.5 rounded-xl bg-[var(--color-light-blue)] px-4 py-3 text-[0.95rem] leading-snug text-[var(--color-accent-deep)]">
                  <PackageCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>
                    <strong className="font-semibold">You get: </strong>
                    <RichText text={s.output} />
                  </span>
                </p>
              </div>
            </Reveal>
          ))}
        </StepTimeline>
      </Section>

      <section aria-labelledby="deliverables-title" className="container-wide mt-24 grid gap-6 md:mt-32 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="navy relative isolate overflow-hidden rounded-[28px] p-7 md:p-10" >
          <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "linear-gradient(140deg,#081b3a,#0d2550 60%,#1d4ed8 150%)" }} />
          <p className="eyebrow mb-4">Deliverables</p>
          <h2 id="deliverables-title" className="text-[length:var(--text-h3)] leading-tight text-white">
            What you&rsquo;ll have at the end
          </h2>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {page.deliverables.map((d, i) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl border border-white/12 bg-white/[0.06] p-4 text-[0.97rem] leading-snug text-[#dbe7f7]">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#67e8f9] text-[#081b3a]">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                </span>
                <span>
                  <RichText text={d} />
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="glass rounded-[28px] p-7 md:p-10">
          <ClipboardList className="h-7 w-7 text-[var(--color-accent-text)]" aria-hidden />
          <h2 className="mt-5 font-serif text-[1.8rem] leading-tight">What we need from you</h2>
          <ul className="mt-6 space-y-3.5">
            {page.youProvide.map((y, i) => (
              <li key={i} className="flex items-start gap-3 leading-relaxed text-ink-soft">
                <span aria-hidden className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                <span>
                  <RichText text={y} />
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <Section id="faq" eyebrow="Questions" title="About the process">
        <FaqList faqs={faqItems(page.faqs)} />
      </Section>
      <KeepExploring service={service} current="process" />
      <CtaBand title="Ready when you are." />
    </>
  );
}

/* ─────────────────────────── Use cases ─────────────────────────── */

export function ServiceUseCasesTemplate({ service, page }: { service: Service; page: UseCasesPage }) {
  const path = `/${service.slug}/use-cases`;
  const industries = getIndustries().filter((i) => service.relevantIndustries.includes(i.slug));
  return (
    <>
      <JsonLd data={faqSchema(page.faqs)} />
      <PageHero
        crumbs={crumbs(service, "Use cases", path)}
        eyebrow={page.eyebrow}
        title={page.title}
        lead={stripMarkup(page.lead)}
        artSeed={`${service.slug}-use-cases`}
        chips={page.cases.slice(0, 3).map((c) => c.businessType.split(" · ")[0])}
        actions={<Actions service={service} />}
      />
      <ServiceSubnav slug={service.slug} title={service.title} active="useCases" />

      <Section id="scenarios" eyebrow={`${page.cases.length} scenarios`} title="Who it's for, in practice" lead="Illustrative examples of the businesses we build this for: the problem, the approach and what to measure. Swipe or use the arrows.">
        <Carousel label={`${service.title} use cases`} slideClassName="basis-[88%] sm:basis-[62%] lg:basis-[40%]">
          {page.cases.map((c, i) => (
            <article key={i} className="glass flex h-full flex-col rounded-[26px] p-6 md:p-8">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-light-blue)] px-3 py-1 text-[0.78rem] font-semibold text-[var(--color-accent-deep)]">
                <Target className="h-3.5 w-3.5" aria-hidden /> {c.businessType}
              </p>
              <h3 className="mt-5 font-serif text-[1.5rem] leading-snug">{c.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">
                <strong className="font-semibold text-[var(--color-heading)]">The challenge: </strong>
                <RichText text={c.challenge} />
              </p>
              <p className="mt-5 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink-muted">Our approach</p>
              <ul className="mt-2.5 space-y-2">
                {c.approach.map((a, k) => (
                  <li key={k} className="flex items-start gap-2.5 text-[0.95rem] leading-snug text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-text)]" strokeWidth={3} aria-hidden />
                    <span>
                      <RichText text={a} />
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <p className="flex items-center gap-1.5 text-[0.75rem] font-bold uppercase tracking-[0.16em] text-ink-muted">
                  <Gauge className="h-3.5 w-3.5" aria-hidden /> What we measure
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {c.measure.map((m, k) => (
                    <li key={k} className="rounded-full border border-[var(--color-border-strong)] px-3 py-1 text-[0.82rem] text-ink-soft">
                      {stripMarkup(m)}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </Carousel>
        <p className="mt-6 text-sm text-ink-muted">These scenarios are illustrative, not client case studies. Every engagement is scoped to your goals.</p>
      </Section>

      {industries.length > 0 && (
        <Section id="industries" eyebrow="By industry" title="Industry playbooks">
          <ul className="flex flex-wrap gap-3">
            {industries.map((ind) => (
              <li key={ind.slug}>
                <Link href={`/industries/${ind.slug}`} className="glass inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[0.95rem] font-semibold text-[var(--color-heading)] transition-colors hover:border-[var(--color-accent)]">
                  {ind.name} <ArrowUpRight className="h-4 w-4 text-[var(--color-accent-text)]" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section id="faq" eyebrow="Questions" title="Is it right for you?">
        <FaqList faqs={faqItems(page.faqs)} />
      </Section>
      <KeepExploring service={service} current="useCases" />
      <CtaBand title="See yourself in one of these?" />
    </>
  );
}
