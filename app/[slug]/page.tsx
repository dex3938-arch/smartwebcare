import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/templates/service-page";
import { CountryPage } from "@/components/templates/country-page";
import {
  getCitiesByCountry,
  getCountries,
  getCountry,
  getService,
  getServices,
  type Service,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

/*
  Single dynamic segment shared by service pages (/personal-branding) and country
  hubs (/india) — exactly like the original router. Every valid slug is prebuilt;
  anything else is a real 404.
*/
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...getServices().map((s) => ({ slug: s.slug })),
    ...getCountries().map((c) => ({ slug: c.slug })),
  ];
}

type Props = { params: Promise<{ slug: string }> };

/**
 * Search snippets cut off around 160 characters, and every fullDescription is longer.
 * Use the hero line plus the description's opening sentence when that fits, else the hero line.
 */
function serviceDescription(s: Service) {
  const first = s.fullDescription.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? "";
  const combined = `${s.heroSubtitle} ${first}`.trim();
  return combined.length <= 160 ? combined : s.heroSubtitle;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (service) {
    return buildMetadata({
      title: service.metaTitle,
      absoluteTitle: true,
      description: serviceDescription(service),
      path: `/${service.slug}`,
      eyebrow: service.categoryLabel,
    });
  }
  const country = getCountry(slug);
  if (country) {
    const n = getCitiesByCountry(country.slug).length;
    return buildMetadata({
      title: `Best Marketing Agency in ${country.name} | All Cities`,
      description: `Discover SmartWebCare's marketing services across ${country.name}. Expert personal branding, social media marketing, and growth strategies in ${n} cities.`,
      path: `/${country.slug}`,
      eyebrow: country.name,
    });
  }
  return {};
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (service) return <ServicePage service={service} />;
  const country = getCountry(slug);
  if (country) return <CountryPage country={country} />;
  notFound();
}
