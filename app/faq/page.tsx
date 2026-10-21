import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/ui/faq-list";
import { Button } from "@/components/ui/button";
import { RichText } from "@/components/content/rich-text";
import { JsonLd } from "@/components/seo/json-ld";
import { FAQ_CATEGORIES } from "@/lib/faq";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "FAQ — SEO, AEO, GEO, AI Automation & Working With Us",
  description:
    "Straight answers about SEO, AEO and GEO, XML sitemaps and robots.txt, website performance, AI agents and automation, and how working with SmartWebCare works.",
  path: "/faq",
  eyebrow: "FAQ",
});

export default function FaqPage() {
  const total = FAQ_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
  return (
    <>
      {/* Every answer below is visible on the page, so the markup matches the content. */}
      <JsonLd data={faqSchema(FAQ_CATEGORIES.flatMap((c) => c.items.map((f) => ({ q: f.question, a: f.answer }))))} />
      <PageHero
        crumbs={[{ name: "FAQ", href: "/faq" }]}
        eyebrow={`${total} answers · ${FAQ_CATEGORIES.length} topics`}
        title={
          <>
            Questions, <em className="text-gradient italic">answered.</em>
          </>
        }
        lead="Plain-language answers about search, AI and how we work — with links to the full guides when you want the detail."
        artSeed="faq-hub"
        chips={["SEO · AEO · GEO", "AI & automation", "Working with us"]}
        actions={
          <Button href="/contact" variant="accent" size="lg">
            Ask us anything <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />

      <div className="container-wide mt-12">
        <nav aria-label="FAQ topics">
          <ul className="flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="glass inline-flex min-h-10 items-center rounded-full px-4 text-[0.88rem] font-semibold text-[var(--color-heading)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent-deep)]">
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container-wide mt-14 space-y-20 md:mt-20">
        {FAQ_CATEGORIES.map((c, i) => (
          <section key={c.id} id={c.id} className="scroll-mt-28 grid gap-8 lg:grid-cols-[0.75fr_1.6fr] lg:gap-16" aria-labelledby={`${c.id}-title`}>
            <div>
              <p className="tabular text-sm font-bold text-[var(--color-accent-text)]">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={`${c.id}-title`} className="mt-2 text-[clamp(1.8rem,2.8vw,2.5rem)] leading-[1.08]">
                {c.title}
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-ink-muted">
                <RichText text={c.intro} />
              </p>
            </div>
            <FaqList faqs={c.items} />
          </section>
        ))}
      </div>

      <CtaBand title="Didn't find your question?" lead="Send it over — we'll answer in plain language, usually the same day." />
    </>
  );
}
