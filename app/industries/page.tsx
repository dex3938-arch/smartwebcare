import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { LinkList, Section } from "@/components/sections/blocks";
import { getIndustries } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Industries — Marketing Built for How Your Industry Sells",
  description:
    "Industry-specific marketing from SmartWebCare for coaches & consultants, real estate, healthcare, SaaS, e-commerce & D2C, restaurants, legal & financial, education, beauty & fashion, home services, fitness and B2B manufacturing.",
  path: "/industries",
  eyebrow: "Industries",
});

export default function IndustriesPage() {
  const industries = getIndustries();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", href: "/industries" }]}
        eyebrow={`${industries.length} industries`}
        title="Marketing that speaks your industry."
        lead="Every industry sells differently. These playbooks start from the challenges your market actually has — then pick the channels that solve them."
        artSeed="industries-index"
      />
      <Section id="all" eyebrow="Choose your industry">
        <LinkList
          columns={2}
          items={industries.map((i) => ({
            href: `/industries/${i.slug}`,
            title: i.name,
            description: i.heroSubtitle,
          }))}
        />
      </Section>
      <CtaBand />
    </>
  );
}
