import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityPage } from "@/components/templates/location-pages";
import { FEATURED_CITY_PATHS, getCity, getCountry } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

/*
  /{country}/{city} — 887 city pages. The 69 cities the live sitemap prioritises are
  prebuilt; every other valid city renders on first request and is then cached (ISR).
  Unknown combinations are real 404s.
*/
export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return FEATURED_CITY_PATHS.map(([slug, city]) => ({ slug, city }));
}

type Props = { params: Promise<{ slug: string; city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city: citySlug } = await params;
  const city = getCountry(slug) ? getCity(slug, citySlug) : undefined;
  if (!city) return {};
  return buildMetadata({
    // "…in New York, New York" → skip the region when it repeats the city name.
    title: `${city.heroTitle}${city.region && city.region !== city.name ? `, ${city.region}` : ""}`,
    description: city.heroDescription,
    path: `/${city.countrySlug}/${city.slug}`,
    eyebrow: city.name,
    keywords: city.keywords,
  });
}

export default async function CityRoute({ params }: Props) {
  const { slug, city: citySlug } = await params;
  if (!getCountry(slug)) notFound();
  const city = getCity(slug, citySlug);
  if (!city) notFound();
  return <CityPage city={city} />;
}
