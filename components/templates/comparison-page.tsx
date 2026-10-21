import { Check, Minus, Trophy } from "lucide-react";
import { WaveSeam } from "@/components/sections/wave-seam";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { LinkList, Section } from "@/components/sections/blocks";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import type { Crumb } from "@/components/seo/breadcrumbs";
import {
  getIndustries,
  getServicesBySlugs,
  type Comparison,
  type ComparisonOption,
} from "@/lib/content";
import { faqSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

function OptionCard({ option, label }: { option: ComparisonOption; label: "A" | "B" }) {
  return (
    <Reveal className="flex flex-col rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7 md:p-9">
      <p className="eyebrow">Option {label}</p>
      <h3 className="mt-3 font-serif text-[clamp(2rem,3vw,2.75rem)] leading-[1.02] text-ink">{option.name}</h3>
      <p className="mt-4 leading-relaxed text-ink-muted">{option.description}</p>
      {option.costRange && (
        <p className="mt-6 inline-flex self-start rounded-full border border-[var(--color-border-strong)] px-4 py-1.5 text-sm text-ink-soft">
          Typical cost: {option.costRange}
        </p>
      )}
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <div>
          <h4 className="eyebrow mb-3">Pros</h4>
          <ul className="space-y-2.5">
            {option.pros.map((p) => (
              <li key={p} className="flex gap-2.5 text-[0.95rem] leading-snug text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-success)]" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-3">Cons</h4>
          <ul className="space-y-2.5">
            {option.cons.map((c) => (
              <li key={c} className="flex gap-2.5 text-[0.95rem] leading-snug text-ink-soft">
                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {option.bestFor.length > 0 && (
        <div className="mt-8 border-t border-[var(--color-border)] pt-6">
          <h4 className="eyebrow mb-3">Best for</h4>
          <ul className="flex flex-wrap gap-2">
            {option.bestFor.map((b) => (
              <li key={b} className="rounded-full bg-[var(--color-surface-muted)] px-3 py-1 text-sm text-ink-soft">
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Reveal>
  );
}

export function ComparisonPage({
  comparison: c,
  crumbs,
  path,
}: {
  comparison: Comparison;
  crumbs: Crumb[];
  path: string;
}) {
  const services = getServicesBySlugs(c.relevantServices ?? []);
  const industries = getIndustries().filter((i) => (c.relevantIndustries ?? []).includes(i.slug));
  const winnerLabel = (w: string) => (w === "A" ? c.optionA.name : w === "B" ? c.optionB.name : "Tie");

  return (
    <>
      {c.faqs.length > 0 && <JsonLd data={faqSchema(c.faqs.map((f) => ({ q: f.question, a: f.answer })))} />}
      <PageHero
        crumbs={crumbs}
        eyebrow="Comparison"
        title={c.heroTitle}
        lead={c.heroSubtitle}
        artSeed={path}
        actions={
          <Button href="/contact" variant="accent" size="lg">
            Get personalised advice
          </Button>
        }
      />

      <Section id="options" eyebrow="The options" title={`${c.optionA.name} vs ${c.optionB.name}.`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <OptionCard option={c.optionA} label="A" />
          <OptionCard option={c.optionB} label="B" />
        </div>
      </Section>

      {c.comparisonFactors.length > 0 && (
        <Section id="factors" eyebrow="Side by side" title="How they compare.">
          {/* Real table for screen readers & crawlers; scrolls horizontally on small screens */}
          <div className="overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)]">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                {c.optionA.name} compared with {c.optionB.name}
              </caption>
              <thead>
                <tr className="bg-[var(--color-surface)]">
                  <th scope="col" className="w-[22%] px-5 py-4 text-sm font-medium text-ink-muted">Factor</th>
                  <th scope="col" className="px-5 py-4 font-serif text-[1.2rem] font-normal text-ink">{c.optionA.name}</th>
                  <th scope="col" className="px-5 py-4 font-serif text-[1.2rem] font-normal text-ink">{c.optionB.name}</th>
                  <th scope="col" className="w-[16%] px-5 py-4 text-sm font-medium text-ink-muted">Edge</th>
                </tr>
              </thead>
              <tbody>
                {c.comparisonFactors.map((f) => (
                  <tr key={f.factor} className="border-t border-[var(--color-border)]">
                    <th scope="row" className="px-5 py-4 align-top text-[0.95rem] font-medium text-ink">{f.factor}</th>
                    <td className={cn("px-5 py-4 align-top text-[0.95rem] leading-relaxed text-ink-soft", f.winner === "A" && "text-ink")}>
                      {f.optionA}
                    </td>
                    <td className={cn("px-5 py-4 align-top text-[0.95rem] leading-relaxed text-ink-soft", f.winner === "B" && "text-ink")}>
                      {f.optionB}
                    </td>
                    <td className="px-5 py-4 align-top text-sm text-ink">
                      <span className="inline-flex items-center gap-1.5">
                        {f.winner !== "tie" && f.winner !== "Tie" && (
                          <Trophy className="h-3.5 w-3.5 text-[var(--color-accent-text)]" aria-hidden />
                        )}
                        {winnerLabel(f.winner)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {c.recommendation && (
        <>
          <WaveSeam from="white" to="tint" className="mt-24 md:mt-32" />
          <section className="tint pb-20 pt-6 md:pb-28 md:pt-10" aria-labelledby="verdict-title">
            <div className="container-wide grid gap-8 lg:grid-cols-12">
              <h2 id="verdict-title" className="eyebrow lg:col-span-3 lg:pt-3">
                Our recommendation
              </h2>
              <p className="font-serif text-[clamp(1.6rem,2.8vw,2.6rem)] leading-[1.18] text-ink lg:col-span-9">
                {c.recommendation}
              </p>
            </div>
          </section>
          <WaveSeam from="tint" to="white" />
        </>
      )}

      {c.faqs.length > 0 && (
        <Section id="faq" eyebrow="FAQ" title="Questions, answered.">
          <FaqList faqs={c.faqs} />
        </Section>
      )}

      {services.length > 0 && (
        <Section id="services" eyebrow="Related services" title="Where we can help.">
          <LinkList columns={2} items={services.map((s) => ({ href: `/${s.slug}`, title: s.title, description: s.description }))} />
        </Section>
      )}

      {industries.length > 0 && (
        <Section id="industries" eyebrow="Industries" title="Most relevant for.">
          <LinkList columns={3} items={industries.map((i) => ({ href: `/industries/${i.slug}`, title: i.name }))} />
        </Section>
      )}

      <CtaBand title="Still weighing it up?" lead="Tell us your goals and budget — we'll give you an honest recommendation, even if it isn't us." />
    </>
  );
}
