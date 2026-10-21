import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { LinkList, Section } from "@/components/sections/blocks";
import { getComparisons, getIndustryComparisons } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Comparisons — Honest Guides to Marketing Decisions",
  description:
    "Agency vs freelancer, in-house vs agency, organic vs paid, LinkedIn vs Instagram and more — side-by-side comparisons to help you choose the right marketing approach.",
  path: "/compare",
  eyebrow: "Comparisons",
});

export default function CompareIndex() {
  const general = getComparisons();
  const byIndustry = getIndustryComparisons();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Comparisons", href: "/compare" }]}
        eyebrow={`${general.length + byIndustry.length} guides`}
        title="Weighing up your options?"
        lead="Side-by-side comparisons of the decisions every growing brand faces — costs, trade-offs and who each option is really for."
        artSeed="compare-index"
      />
      <Section id="general" eyebrow="General" title="Marketing decisions.">
        <LinkList
          columns={2}
          items={general.map((c) => ({ href: `/compare/${c.slug}`, title: c.title, description: c.heroSubtitle }))}
        />
      </Section>
      <Section id="industry" eyebrow="By industry" title="Decisions in your industry.">
        <LinkList
          columns={2}
          items={byIndustry.map((c) => ({
            href: `/industry-compare/${c.slug}`,
            title: c.title,
            description: c.heroSubtitle,
            meta: c.industryName,
          }))}
        />
      </Section>
      <CtaBand />
    </>
  );
}
