import Link from "next/link";
import { ArrowUpRight, BookOpen, Wrench } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { LinkList, Section } from "@/components/sections/blocks";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { NetworkField } from "@/components/art/network-field";
import { GUIDES, readingMinutes } from "@/lib/guides";
import { FAQ_CATEGORIES } from "@/lib/faq";
import { getComparisons, getIndustries, getTools, stripStaleYear } from "@/lib/content";
import { stripMarkup } from "@/lib/markup";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Resources — SEO, AEO & GEO Guides, Tools and FAQs",
  description:
    "Free SmartWebCare resources: in-depth guides to SEO, technical SEO, AEO, GEO, XML sitemaps and robots.txt, plus free tools, FAQs and industry playbooks.",
  path: "/resources",
  eyebrow: "Resources",
});

export default function ResourcesPage() {
  const tools = getTools();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Resources", href: "/resources" }]}
        eyebrow={`${GUIDES.length} guides · ${tools.length} free tools · ${FAQ_CATEGORIES.length} FAQ topics`}
        title={
          <>
            Learn it. Check it. <em className="text-gradient italic">Ship it.</em>
          </>
        }
        lead="Everything we know about getting found — in search engines and in AI answers — written plainly, with checklists you can use today."
        artSeed="resources-hub"
        chips={["Guides", "Free tools", "Checklists"]}
      />

      <Section id="guides" eyebrow="Guides" title="In-depth guides." lead="Practical, current and honest about what nobody can guarantee.">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GUIDES.map((g, i) => (
            <Reveal as="li" key={g.slug} delay={(i % 4) * 0.06}>
              <Tilt max={6} className="h-full rounded-[22px]">
                <Link href={`/${g.slug}`} className="glass group flex h-full flex-col overflow-hidden rounded-[22px]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <NetworkField seed={`guide-${g.slug}`} variant={i % 2 ? "tint" : "light"} />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-[0.72rem] font-bold text-[var(--color-accent-deep)] backdrop-blur">
                      <BookOpen className="h-3.5 w-3.5" aria-hidden /> {readingMinutes(g)} min
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--color-accent-text)]">{g.kind === "service" ? "Guide + service" : "Guide"}</p>
                    <h3 className="mt-2 text-[1.35rem] leading-snug transition-colors group-hover:text-[var(--color-accent-deep)]">{g.navLabel}</h3>
                    <p className="mt-2 line-clamp-3 text-[0.9rem] leading-relaxed text-ink-muted">{stripMarkup(g.lead)}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.88rem] font-semibold text-[var(--color-accent-text)]">
                      Read <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" aria-hidden />
                    </span>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="tools" eyebrow="Free tools" title="Tools you can use right now." aside={<Link href="/tools" className="link-underline font-semibold text-[var(--color-accent-text)]">All tools</Link>}>
        <ul className="grid gap-3 md:grid-cols-2">
          {tools.map((t) => (
            <li key={t.slug}>
              <Link href={t.href} className="glass group flex items-start gap-4 rounded-2xl p-5 transition-colors hover:border-[var(--color-accent)]">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--color-light-blue)] text-[var(--color-accent-deep)]">
                  <Wrench className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold text-[var(--color-heading)] group-hover:text-[var(--color-accent-deep)]">{t.name}</span>
                  <span className="mt-1 block text-[0.9rem] leading-relaxed text-ink-muted">{t.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Quick answers, by topic." aside={<Link href="/faq" className="link-underline font-semibold text-[var(--color-accent-text)]">Open the FAQ</Link>}>
        <ul className="flex flex-wrap gap-2">
          {FAQ_CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link href={`/faq#${c.id}`} className="glass inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-[0.88rem] font-semibold text-[var(--color-heading)] hover:border-[var(--color-accent)]">
                {c.title} <span className="tabular text-ink-muted">{c.items.length}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="industries" eyebrow="By industry" title="Industry playbooks.">
        <LinkList columns={3} items={getIndustries().map((i) => ({ href: `/industries/${i.slug}`, title: i.name, description: i.heroSubtitle }))} />
      </Section>

      <Section id="compare" eyebrow="Comparisons" title="Weigh up your options.">
        <LinkList columns={2} items={getComparisons().map((c) => ({ href: `/compare/${c.slug}`, title: stripStaleYear(c.title), description: c.heroSubtitle }))} />
      </Section>

      <CtaBand title="Rather we just fix it?" lead="Send your URL — we'll come back with what we'd fix first, and why." />
    </>
  );
}
