import type { MetadataRoute } from "next";
import {
  FEATURED_CITY_PATHS,
  getComparisons,
  getCountries,
  getIndustries,
  getIndustryComparisons,
  getStates,
  getTemplatedServices,
  getTools,
} from "@/lib/content";
import { GUIDES } from "@/lib/guides";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

/*
  Generated from the real route inventory: core pages, every guide and service, hubs,
  priority cities, legal pages. Only canonical, indexable 200-status URLs. The long tail
  (≈800 further cities and city×service / city×industry combinations) stays crawlable
  via internal links but is deliberately not pushed here, to avoid signalling thin,
  near-duplicate pages. lastModified is only set where we genuinely know it (guide
  review dates, blog posts) — never faked. (Google ignores priority/changefreq; they're
  kept as hints for other crawlers.)
*/
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const u = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: `${SITE.url}${path}`,
    priority,
    changeFrequency,
  });

  const posts = await getAllPosts();

  return [
    u("/", 1, "weekly"),
    u("/services", 0.9),
    u("/contact", 0.9),
    u("/book-consultation", 0.9),
    u("/about", 0.7),
    u("/clients", 0.7),
    u("/blog", 0.9, "daily"),
    u("/industries", 0.8),
    u("/compare", 0.7),
    u("/tools", 0.8),
    u("/resources", 0.8),
    u("/faq", 0.7),
    // Guides with their own route (AEO's guide lives on the /aeo service page).
    ...GUIDES.filter((g) => !getTemplatedServices().some((s) => s.slug === g.slug)).map((g) => ({ ...u(`/${g.slug}`, g.kind === "service" ? 0.9 : 0.8), lastModified: new Date(g.updated) })),
    ...getTemplatedServices().map((s) => u(`/${s.slug}`, 0.9)),
    ...getCountries().map((c) => u(`/${c.slug}`, 0.8)),
    ...getStates().map((s) => u(`/india/state/${s.slug}`, 0.7)),
    ...FEATURED_CITY_PATHS.map(([country, city]) => u(`/${country}/${city}`, 0.8, "weekly")),
    ...getIndustries().map((i) => u(`/industries/${i.slug}`, 0.8)),
    ...getComparisons().map((c) => u(`/compare/${c.slug}`, 0.7)),
    ...getIndustryComparisons().map((c) => u(`/industry-compare/${c.slug}`, 0.6)),
    ...getTools().map((t) => u(t.href, 0.7)),
    ...posts.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...["privacy-policy", "terms-and-conditions", "refund-policy", "disclaimer"].map((l) => u(`/${l}`, 0.2, "yearly")),
  ];
}
