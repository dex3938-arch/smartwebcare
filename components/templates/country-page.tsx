import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { CityDirectory, FactRow, LinkList, Section } from "@/components/sections/blocks";
import {
  FEATURED_CITY_PATHS,
  getCitiesByCountry,
  getCitiesForState,
  getStates,
  type City,
  type Country,
} from "@/lib/content";

function groupByRegion(cities: City[]) {
  const groups = new Map<string, City[]>();
  for (const c of cities) {
    const key = c.region ?? "Other";
    groups.set(key, [...(groups.get(key) ?? []), c]);
  }
  return [...groups.entries()]
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([label, list]) => ({
      label,
      cities: list
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((c) => ({ href: `/${c.countrySlug}/${c.slug}`, name: c.name })),
    }));
}

export function CountryPage({ country }: { country: Country }) {
  const cities = getCitiesByCountry(country.slug);
  const featured = FEATURED_CITY_PATHS.filter(([c]) => c === country.slug)
    .map(([, slug]) => cities.find((x) => x.slug === slug))
    .filter((c): c is City => !!c);
  const isIndia = country.slug === "india";
  const states = isIndia ? getStates() : [];
  const regionCount = new Set(cities.map((c) => c.region).filter(Boolean)).size;

  return (
    <>
      <PageHero
        crumbs={[{ name: country.name, href: `/${country.slug}` }]}
        eyebrow="Locations"
        title={`Marketing services across ${country.name}`}
        lead={country.description}
        artSeed={`country-${country.slug}`}
        artVariant="tint"
        actions={
          <Button href="/book-consultation" size="lg">
            Book a free consultation
            <ArrowRight className="h-4 w-4" />
          </Button>
        }
        meta={
          <FactRow
            facts={[
              { label: "Cities covered", value: cities.length },
              ...(regionCount > 1
                ? [{ label: isIndia ? "States & UTs" : "Regions", value: isIndia ? states.length : regionCount }]
                : []),
              { label: "Brands served", value: "100+" },
              { label: "Organic views", value: "100M+" },
            ]}
          />
        }
      />

      {featured.length > 0 && (
        <Section id="featured" eyebrow="Featured cities" title={`Where we work most in ${country.name}.`}>
          <LinkList
            columns={3}
            items={featured.map((c) => ({
              href: `/${c.countrySlug}/${c.slug}`,
              title: c.name,
              meta: c.region ?? undefined,
            }))}
          />
        </Section>
      )}

      {isIndia && (
        <Section id="states" eyebrow="Browse by state" title="Every state and union territory.">
          <LinkList
            columns={3}
            items={states.map((s) => {
              const n = getCitiesForState(s).length;
              return {
                href: `/india/state/${s.slug}`,
                title: s.stateName,
                meta: `${n} ${n === 1 ? "city" : "cities"}`,
              };
            })}
          />
        </Section>
      )}

      <Section
        id="cities"
        eyebrow="All cities"
        title={`Explore our services by city.`}
        lead={`${cities.length} city pages across ${country.name}, each with local context and every service we offer there.`}
      >
        <CityDirectory groups={groupByRegion(cities)} />
      </Section>

      <CtaBand
        title={`Grow your brand in ${country.name}.`}
        lead="Not seeing your city? We work with businesses everywhere — book a call and tell us where you are."
      />
    </>
  );
}
