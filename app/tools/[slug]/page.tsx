import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaBand } from "@/components/sections/cta-band";
import { LinkList, Section } from "@/components/sections/blocks";
import { getTool, getTools } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

// Each tool is its own client chunk — a page only ships the JS for its tool.
const TOOLS: Record<string, React.ComponentType> = {
  "linkedin-headline-generator": dynamic(() => import("@/components/tools/text-generators").then((m) => m.LinkedInHeadlineGenerator)),
  "instagram-bio-generator": dynamic(() => import("@/components/tools/text-generators").then((m) => m.InstagramBioGenerator)),
  "hashtag-generator": dynamic(() => import("@/components/tools/text-generators").then((m) => m.HashtagGenerator)),
  "brand-name-generator": dynamic(() => import("@/components/tools/text-generators").then((m) => m.BrandNameGenerator)),
  "email-subject-line-generator": dynamic(() => import("@/components/tools/text-generators").then((m) => m.EmailSubjectGenerator)),
  "meta-description-generator": dynamic(() => import("@/components/tools/text-generators").then((m) => m.MetaDescriptionGenerator)),
  "marketing-roi-calculator": dynamic(() => import("@/components/tools/structured-tools").then((m) => m.MarketingRoiCalculator)),
  "social-media-audit": dynamic(() => import("@/components/tools/structured-tools").then((m) => m.SocialMediaAudit)),
  "content-calendar-generator": dynamic(() => import("@/components/tools/structured-tools").then((m) => m.ContentCalendarGenerator)),
};

export const dynamicParams = false;
export const generateStaticParams = () => getTools().map((t) => ({ slug: t.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getTool((await params).slug);
  if (!tool) return {};
  return buildMetadata({
    title: `Free ${tool.name}`,
    description: tool.description,
    path: tool.href,
    eyebrow: "Free tool",
  });
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getTool(slug);
  const Tool = TOOLS[slug];
  if (!tool || !Tool) notFound();
  const others = getTools().filter((t) => t.slug !== slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: tool.name,
          description: tool.description,
          url: `${SITE.url}${tool.href}`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          isAccessibleForFree: true,
          provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
        }}
      />
      <section className="container-wide pt-28 md:pt-36" aria-labelledby="tool-title">
        <Breadcrumbs
          items={[
            { name: "Free tools", href: "/tools" },
            { name: tool.name, href: tool.href },
          ]}
          className="fade-up"
        />
        <div className="mt-10 max-w-3xl">
          <p className="eyebrow fade-up mb-5">Free tool · no sign-up</p>
          <h1 id="tool-title" className="text-[length:var(--text-h1)] leading-[0.98] text-ink">
            <span className="reveal-line">
              <span>{tool.name}</span>
            </span>
          </h1>
          <p className="rise mt-6 text-[length:var(--text-lead)] leading-relaxed text-ink-soft" style={{ ["--i" as string]: 1 }}>
            {tool.description}
          </p>
        </div>
        <div className="mt-12 md:mt-16">
          <Tool />
        </div>
      </section>

      <Section id="more-tools" eyebrow="More free tools" title="Keep going.">
        <LinkList columns={2} items={others.map((t) => ({ href: t.href, title: t.name, description: t.description }))} />
      </Section>

      <CtaBand title="Want it done for you?" lead="The tools get you started. Our team takes it the rest of the way — strategy, content and growth." />
    </>
  );
}
