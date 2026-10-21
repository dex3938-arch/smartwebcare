import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  CityIndustryPage,
  CityServicePage,
  StatePage,
} from "@/components/templates/location-pages";
import {
  fillTemplate,
  getCity,
  getCountry,
  getIndustry,
  getLocationService,
  getService,
  getState,
  getStates,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

/*
  Three-segment routes, resolved in the same order as the original router:
    /india/state/{state}            → state hub
    /india/{city}/{industry}        → city × industry (India only), checked first
    /{country}/{city}/{service}     → city × service
  State hubs are prebuilt; the ~15k city combinations render on demand (ISR).
*/
export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return getStates().map((s) => ({ slug: "india", city: "state", third: s.slug }));
}

type Props = { params: Promise<{ slug: string; city: string; third: string }> };

function resolve(slug: string, citySlug: string, third: string) {
  if (slug === "india" && citySlug === "state") {
    const state = getState(third);
    return state ? ({ kind: "state", state } as const) : null;
  }
  if (!getCountry(slug)) return null;
  const city = getCity(slug, citySlug);
  if (!city) return null;
  if (slug === "india") {
    const industry = getIndustry(third);
    if (industry) return { kind: "industry", city, industry } as const;
  }
  const service = getLocationService(third);
  if (service) return { kind: "service", city, service } as const;
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city, third } = await params;
  const r = resolve(slug, city, third);
  if (!r) return {};
  if (r.kind === "state") {
    return buildMetadata({
      title: r.state.metaTitle,
      description: r.state.metaDescription,
      path: `/india/state/${r.state.slug}`,
      eyebrow: r.state.stateName,
      keywords: r.state.keywords,
    });
  }
  if (r.kind === "industry") {
    const name = r.industry.name;
    return buildMetadata({
      title: `${name} Marketing in ${r.city.name}`,
      description: `Expert ${name.toLowerCase()} marketing services in ${r.city.name}. Specialized strategies for ${name.toLowerCase()} to grow their business with proven digital marketing solutions.`,
      path: `/india/${r.city.slug}/${r.industry.slug}`,
      eyebrow: `${name} · ${r.city.name}`,
    });
  }
  return buildMetadata({
    title: fillTemplate(r.service.titleTemplate, r.city.name, r.city.region),
    description: fillTemplate(r.service.metaDescriptionTemplate, r.city.name, r.city.region),
    path: `/${r.city.countrySlug}/${r.city.slug}/${r.service.slug}`,
    eyebrow: `${r.service.shortTitle} · ${r.city.name}`,
  });
}

export default async function ThirdSegmentRoute({ params }: Props) {
  const { slug, city, third } = await params;
  const r = resolve(slug, city, third);
  if (!r) {
    // A real service with no city version (e.g. /india/pune/performance-marketing) →
    // its main service page rather than a dead end.
    if (getCountry(slug) && city !== "state" && getService(third)) permanentRedirect(`/${third}`);
    notFound();
  }
  if (r.kind === "state") return <StatePage state={r.state} />;
  if (r.kind === "industry") return <CityIndustryPage city={r.city} industry={r.industry} />;
  return <CityServicePage city={r.city} service={r.service} />;
}
