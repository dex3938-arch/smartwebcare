import { AlertTriangle, ArrowRight, Check, Clock, Info, ListChecks, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { LinkList, Section } from "@/components/sections/blocks";
import { ProcessFlow } from "@/components/services/service-sections";
import { RichText } from "@/components/content/rich-text";
import { Toc } from "@/components/content/toc";
import { CodeBlock } from "@/components/content/code-block";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { getGuide, readingMinutes, type Guide, type GuideBlock } from "@/lib/guides";
import { SEARCH_GUIDE_SERVICES, getService } from "@/lib/content";
import { faqSchema, guideSchema, serviceSchema } from "@/lib/schema";
import { stripMarkup } from "@/lib/markup";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

function Block({ b }: { b: GuideBlock }) {
  switch (b.type) {
    case "p":
      return (
        <p className="mt-5 text-[1.06rem] leading-[1.8] text-ink-soft">
          <RichText text={b.text} />
        </p>
      );
    case "list": {
      const L = b.ordered ? "ol" : "ul";
      return (
        <L className={cn("mt-5 space-y-2.5 text-[1.03rem] leading-[1.7] text-ink-soft", b.ordered ? "list-decimal pl-6 marker:font-semibold marker:text-[var(--color-accent-text)]" : "")}>
          {b.items.map((it, i) => (
            <li key={i} className={b.ordered ? "pl-1.5" : "flex gap-3"}>
              {!b.ordered && <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-cyan)]" />}
              <span>
                <RichText text={it} />
              </span>
            </li>
          ))}
        </L>
      );
    }
    case "checklist":
      return (
        <div className="glass mt-7 rounded-2xl p-6 md:p-7">
          {b.title && (
            <p className="mb-4 flex items-center gap-2 font-sans text-[1rem] font-bold text-[var(--color-heading)]">
              <ListChecks className="h-5 w-5 text-[var(--color-accent-text)]" aria-hidden /> {b.title}
            </p>
          )}
          <ul className="grid gap-3 md:grid-cols-2 md:gap-x-6">
            {b.items.map((it, i) => (
              <li key={i} className="flex items-start gap-3 text-[0.97rem] leading-snug text-ink-soft">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[var(--color-accent)] text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                </span>
                <span>
                  <RichText text={it} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "callout": {
      const warn = b.tone === "warn";
      const Icon = warn ? AlertTriangle : Info;
      return (
        <aside
          className={cn(
            "mt-7 flex gap-4 rounded-2xl border p-5 md:p-6",
            warn ? "border-amber-200 bg-amber-50" : "border-[var(--color-light-blue)] bg-[#f3f8ff]"
          )}
        >
          <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", warn ? "text-[var(--color-warning)]" : "text-[var(--color-accent-text)]")} aria-hidden />
          <div>
            <p className="font-sans font-bold text-[var(--color-heading)]">{b.title}</p>
            <p className="mt-1.5 text-[0.97rem] leading-relaxed text-ink-soft">
              <RichText text={b.text} />
            </p>
          </div>
        </aside>
      );
    }
    case "steps":
      return (
        <ol className="mt-7 grid gap-3">
          {b.items.map((st, i) => (
            <li key={i} className="flex gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
              <span className="step-orb grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold text-white">{i + 1}</span>
              <div>
                <p className="font-sans font-bold text-[var(--color-heading)]">{st.title}</p>
                <p className="mt-1 text-[0.97rem] leading-relaxed text-ink-soft">
                  <RichText text={st.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="mt-7 overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-white" tabIndex={0} role="region" aria-label={b.caption}>
          <table className="w-full min-w-[560px] border-collapse text-left text-[0.94rem]">
            <caption className="border-b border-[var(--color-border)] px-5 py-3 text-left text-[0.8rem] font-semibold text-ink-muted">{b.caption}</caption>
            <thead>
              <tr className="bg-[var(--color-surface-muted)]">
                {b.columns.map((c) => (
                  <th key={c} scope="col" className="px-5 py-3 font-sans font-bold text-[var(--color-heading)]">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-t border-[var(--color-border)] align-top">
                  {r.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row" className="px-5 py-3 font-semibold text-[var(--color-heading)]">
                        <RichText text={cell} />
                      </th>
                    ) : (
                      <td key={j} className="px-5 py-3 leading-relaxed text-ink-soft">
                        <RichText text={cell} />
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "code":
      return <CodeBlock code={b.code} lang={b.lang} caption={b.caption} />;
  }
}

/** Resolve a related slug to a link: another guide, a guide-routed service, or a service page. */
function relatedLink(slug: string) {
  const g = getGuide(slug);
  if (g) return { href: `/${g.slug}`, title: g.navLabel, description: stripMarkup(g.lead).split(/(?<=\.)\s/)[0] };
  const s = getService(slug);
  if (s) return { href: `/${s.slug}`, title: s.title.replace(/\s*\(.*\)\s*$/, ""), description: s.description };
  const sg = SEARCH_GUIDE_SERVICES.find((x) => x.slug === slug);
  return sg ? { href: `/${sg.slug}`, title: sg.title, description: sg.description } : null;
}


/** Key takeaways + the long-form body with its sticky table of contents. */
export function GuideArticle({ guide: g }: { guide: Guide }) {
  const isService = g.kind === "service";
  const toc = g.sections.map((s) => ({ id: s.id, label: s.heading }));
  return (
    <>
      {/* Key takeaways — answer-first summary */}
      <section className="container-wide mt-14 md:mt-20" aria-labelledby="takeaways-title">
        <Reveal className="glass relative overflow-hidden rounded-[28px] p-7 md:p-10">
          <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(103,232,249,0.35),transparent)]" />
          <h2 id="takeaways-title" className="relative font-sans text-[0.78rem] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-text)]">
            Key takeaways
          </h2>
          <ul className="relative mt-5 grid gap-4 md:grid-cols-2 md:gap-x-10">
            {g.summary.map((s, i) => (
              <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed text-[var(--color-heading)]">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-light-blue)] text-[0.72rem] font-bold text-[var(--color-accent-deep)]">{i + 1}</span>
                <span>
                  <RichText text={s} />
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Body with sticky table of contents */}
      <div id="contents" className="container-wide mt-16 scroll-mt-24 md:mt-24">
        <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[17rem_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div data-lenis-prevent className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6">
              <Toc items={toc} />
              <div className="glass mt-8 rounded-2xl p-5">
                <p className="font-sans text-[0.95rem] font-bold text-[var(--color-heading)]">{isService ? "Want this done for you?" : "Need a hand?"}</p>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-muted">
                  {isService ? "We audit, implement and report — in plain language." : "We can check your site and fix it for you."}
                </p>
                <Button href="/contact" variant="accent" size="sm" className="mt-4 w-full">
                  Let&rsquo;s talk
                </Button>
              </div>
            </div>
          </aside>
          <article className="min-w-0 max-w-[46rem]">
            {g.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-[var(--color-border)] pb-12 pt-2 last:border-b-0 [&+section]:pt-12" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`} className="text-[clamp(1.7rem,2.6vw,2.35rem)] leading-[1.12]">
                  {s.heading}
                </h2>
                {s.blocks.map((b, i) => (
                  <Block key={i} b={b} />
                ))}
              </section>
            ))}
          </article>
        </div>
      </div>

    </>
  );
}

export function GuidePage({ guide: g }: { guide: Guide }) {
  const minutes = readingMinutes(g);
  const isService = g.kind === "service";
  const parent = ["xml-sitemap", "robots-txt"].includes(g.slug)
    ? { name: "Resources", href: "/resources" }
    : { name: "SEO", href: "/seo-standards" };
  const crumbs = g.slug === "seo-standards" ? [{ name: "SEO Standards", href: "/seo-standards" }] : [parent, { name: g.navLabel, href: `/${g.slug}` }];
  const related = g.related.map(relatedLink).filter((l): l is NonNullable<typeof l> => !!l && l.href !== `/${g.slug}`);
  return (
    <>
      <JsonLd
        data={[
          guideSchema({ title: g.title, description: g.metaDescription, slug: g.slug, updated: g.updated }),
          ...(isService ? [serviceSchema({ title: g.navLabel, description: g.metaDescription, slug: g.slug })] : []),
          ...(g.faqs.length ? [faqSchema(g.faqs.map((f) => ({ q: f.question, a: f.answer })))] : []),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={g.eyebrow}
        title={g.title}
        lead={stripMarkup(g.lead)}
        artSeed={`guide-${g.slug}`}
        chips={isService ? [g.navLabel, "Audit → Implement", "Measured"] : [g.navLabel, "Guide", `${minutes} min read`]}
        actions={
          isService ? (
            <>
              <Button href="/contact" variant="accent" size="lg">
                Request an audit <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button href="#contents" variant="secondary" size="lg">
                Read the guide
              </Button>
            </>
          ) : (
            <>
              <Button href="#contents" variant="accent" size="lg">
                Start reading <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Ask an expert
              </Button>
            </>
          )
        }
        meta={
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.85rem] text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden /> {minutes} min read
            </span>
            <span className="inline-flex items-center gap-1.5">
              <RefreshCw className="h-4 w-4" aria-hidden /> Reviewed <time dateTime={g.updated}>{formatDate(g.updated)}</time>
            </span>
          </p>
        }
      />

      <GuideArticle guide={g} />

      {isService && g.engagement && g.engagement.length > 0 && (
        <ProcessFlow
          id="engagement"
          eyebrow="Working with us"
          title={
            <>
              How an engagement <em className="text-gradient italic">works</em>.
            </>
          }
          lead="A clear scope up front, visible progress, and results reported in plain language."
          steps={g.engagement.map((e) => ({ title: e.title, description: stripMarkup(e.text) }))}
        />
      )}

      {g.faqs.length > 0 && (
        <Section id="faq" eyebrow="FAQ" title="Questions, answered.">
          <FaqList faqs={g.faqs} />
        </Section>
      )}

      {related.length > 0 && (
        <Section id="related" eyebrow="Keep going" title="Related guides & services.">
          <LinkList columns={2} items={related} />
        </Section>
      )}

      <CtaBand
        title={isService ? `Let's talk ${g.navLabel}.` : "Want us to check your site?"}
        lead="Share your URL and goals — we'll come back with what we'd fix first, and why. No obligation."
      />
    </>
  );
}
