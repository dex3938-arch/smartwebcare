import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { LinkList, Section } from "@/components/sections/blocks";
import { getTools } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Free Marketing Tools — Bio, Headline, Hashtag & ROI Generators",
  description:
    "Free tools from SmartWebCare: LinkedIn headline & Instagram bio generators, hashtag generator, marketing ROI calculator, brand name generator, social media audit, content calendar, email subject lines and meta descriptions.",
  path: "/tools",
  eyebrow: "Free tools",
});

export default function ToolsIndex() {
  const tools = getTools();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Free tools", href: "/tools" }]}
        eyebrow={`${tools.length} free tools · no sign-up`}
        title="Free tools for sharper marketing."
        lead="Write better bios and headlines, plan a week of content, audit your socials and check your ROI — free, instant, and nothing to sign up for."
        artSeed="tools-index"
      />
      <Section id="tools">
        <LinkList
          columns={2}
          items={tools.map((t, i) => ({
            href: t.href,
            title: t.name,
            description: t.description,
            meta: String(i + 1).padStart(2, "0"),
          }))}
        />
      </Section>
      <CtaBand title="Want it done for you?" lead="The tools get you started. Our team takes it the rest of the way — strategy, content and growth." />
    </>
  );
}
