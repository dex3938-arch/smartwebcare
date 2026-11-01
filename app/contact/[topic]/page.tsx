import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyPageView } from "@/components/templates/company-page";
import { getCompanyPage, getCompanyPages } from "@/lib/company-pages";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCompanyPages("contact").map((p) => ({ topic: p.slug }));
}

type Props = { params: Promise<{ topic: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getCompanyPage("contact", (await params).topic);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/contact/${page.slug}`,
    eyebrow: page.navLabel,
  });
}

export default async function Page({ params }: Props) {
  const page = getCompanyPage("contact", (await params).topic);
  if (!page) notFound();
  return <CompanyPageView page={page} />;
}
