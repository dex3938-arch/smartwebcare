import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComparisonPage } from "@/components/templates/comparison-page";
import { getComparison, getComparisons, stripStaleYear } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export const generateStaticParams = () => getComparisons().map((c) => ({ slug: c.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getComparison((await params).slug);
  if (!c) return {};
  return buildMetadata({
    title: stripStaleYear(c.metaTitle),
    description: c.metaDescription,
    path: `/compare/${c.slug}`,
    eyebrow: "Comparison",
    type: "article",
    keywords: c.keywords,
  });
}

export default async function ComparePage({ params }: Props) {
  const c = getComparison((await params).slug);
  if (!c) notFound();
  const path = `/compare/${c.slug}`;
  return (
    <ComparisonPage
      comparison={c}
      path={path}
      crumbs={[
        { name: "Comparisons", href: "/compare" },
        { name: c.title, href: path },
      ]}
    />
  );
}
