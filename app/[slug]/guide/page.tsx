import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceGuideTemplate } from "@/components/templates/service-subpage";
import { getService } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { getSubpageSlugs, getSubpages } from "@/lib/subpages";

/* /{service}/guide — one page per service, prebuilt from data/service-subpages/*.json. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getSubpageSlugs()
    .filter((slug) => getService(slug))
    .map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

function resolve(slug: string) {
  const service = getService(slug);
  const page = getSubpages(slug)?.guide;
  return service && page ? { service, page } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = resolve((await params).slug);
  if (!r) return {};
  return buildMetadata({
    title: r.page.metaTitle,
    description: r.page.metaDescription,
    path: `/${r.service.slug}/guide`,
    eyebrow: `${r.service.title} · Guide`,
    type: "article",
  });
}

export default async function Page({ params }: Props) {
  const r = resolve((await params).slug);
  if (!r) notFound();
  return <ServiceGuideTemplate service={r.service} page={r.page} />;
}
