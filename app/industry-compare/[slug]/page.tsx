import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparisonPage } from "@/components/templates/comparison-page";
import { getIndustryComparison, getIndustryComparisons, stripStaleYear } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export const generateStaticParams = () => getIndustryComparisons().map((c) => ({ slug: c.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getIndustryComparison((await params).slug);
  if (!c) return {};
  return buildMetadata({
    title: stripStaleYear(c.metaTitle),
    description: c.metaDescription,
    path: `/industry-compare/${c.slug}`,
    eyebrow: c.industryName,
    type: "article",
    keywords: c.keywords,
  });
}

export default async function IndustryComparePage({ params }: Props) {
  const c = getIndustryComparison((await params).slug);
  if (!c) notFound();
  const path = `/industry-compare/${c.slug}`;
  return (
    <ComparisonPage
      comparison={{ ...c, relevantIndustries: [c.industrySlug] }}
      path={path}
      crumbs={[
        { name: "Industries", href: "/industries" },
        { name: c.industryName, href: `/industries/${c.industrySlug}` },
        { name: c.title, href: path },
      ]}
    />
  );
}
