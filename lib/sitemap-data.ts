import "server-only";
import {
  FEATURED_CITY_PATHS,
  getCity,
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
import { COMPANY_PAGES, SECTION_META } from "@/lib/company-pages";
import { INSIGHT_TOPICS, getInsights } from "@/lib/insights";
import { SUBPAGE_KINDS, getSubpages } from "@/lib/subpages";
import { SITE } from "@/lib/site";

/*
  One inventory of indexable URLs, grouped for clarity. It feeds:
   - /sitemap.xml            → a sitemap index pointing at each group
   - /sitemaps/{group}.xml   → one sitemap per group
   - /site-map               → the human-readable sitemap page
  Only canonical, 200-status pages. The long tail of ~15k city × service combinations
  stays crawlable through internal links but isn't pushed here (thin, near-duplicate).
  lastModified is only set where we genuinely know it.
*/

export type SitemapEntry = {
  path: string;
  title: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  lastModified?: string;
  /** Visual grouping on /site-map. */
  group?: string;
};

export type SitemapGroup = { slug: string; title: string; description: string; entries: () => Promise<SitemapEntry[]> };

const SUBPAGES_UPDATED = "2026-11-01";

export const SITEMAP_GROUPS: SitemapGroup[] = [
  {
    slug: "pages",
    title: "Main pages",
    description: "Home, About, Testimonials, Contact and policies.",
    entries: async () => [
      { path: "/", title: "Home", priority: 1, changeFrequency: "weekly" },
      { path: "/services", title: "Services", priority: 0.9, changeFrequency: "monthly" },
      { path: "/about", title: "About SmartWebCare", priority: 0.8, changeFrequency: "monthly", group: "About" },
      ...COMPANY_PAGES.filter((p) => p.section === "about").map((p) => ({ path: `/about/${p.slug}`, title: p.navLabel, priority: 0.7, changeFrequency: "monthly" as const, group: "About", lastModified: SUBPAGES_UPDATED })),
      { path: "/clients", title: "Client testimonials", priority: 0.8, changeFrequency: "monthly", group: "Testimonials" },
      ...COMPANY_PAGES.filter((p) => p.section === "clients").map((p) => ({ path: `${SECTION_META.clients.href}/${p.slug}`, title: p.navLabel, priority: 0.6, changeFrequency: "monthly" as const, group: "Testimonials", lastModified: SUBPAGES_UPDATED })),
      { path: "/contact", title: "Contact us", priority: 0.9, changeFrequency: "monthly", group: "Contact" },
      { path: "/book-consultation", title: "Book a free consultation", priority: 0.9, changeFrequency: "monthly", group: "Contact" },
      ...COMPANY_PAGES.filter((p) => p.section === "contact").map((p) => ({ path: `/contact/${p.slug}`, title: p.navLabel, priority: 0.6, changeFrequency: "monthly" as const, group: "Contact", lastModified: SUBPAGES_UPDATED })),
      { path: "/faq", title: "FAQ", priority: 0.7, changeFrequency: "monthly", group: "Help" },
      { path: "/resources", title: "Resources", priority: 0.7, changeFrequency: "monthly", group: "Help" },
      ...["privacy-policy", "terms-and-conditions", "refund-policy", "disclaimer"].map((l) => ({
        path: `/${l}`,
        title: l.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
        priority: 0.2,
        changeFrequency: "yearly" as const,
        group: "Policies",
      })),
    ],
  },
  {
    slug: "services",
    title: "Services",
    description: "Every service with its guide, process and use-cases pages, plus the SEO guides.",
    entries: async () => [
      ...getTemplatedServices().flatMap((s) => {
        const sub = getSubpages(s.slug);
        return [
          { path: `/${s.slug}`, title: s.title, priority: 0.9, changeFrequency: "monthly" as const, group: s.title },
          ...(sub
            ? SUBPAGE_KINDS.map((k) => ({
                path: `/${s.slug}/${k.path}`,
                title: `${s.title}: ${k.label.toLowerCase()}`,
                priority: 0.7,
                changeFrequency: "monthly" as const,
                lastModified: SUBPAGES_UPDATED,
                group: s.title,
              }))
            : []),
        ];
      }),
      ...GUIDES.filter((g) => !getTemplatedServices().some((s) => s.slug === g.slug)).map((g) => ({
        path: `/${g.slug}`,
        title: g.title,
        priority: 0.8,
        changeFrequency: "monthly" as const,
        lastModified: g.updated,
        group: "SEO guides",
      })),
    ],
  },
  {
    slug: "insights",
    title: "Insights & journal",
    description: "Articles on current topics, grouped by theme, and journal posts.",
    entries: async () => {
      const posts = await getAllPosts();
      return [
        { path: "/insights", title: "All insights", priority: 0.8, changeFrequency: "weekly" as const, group: "Insights" },
        ...INSIGHT_TOPICS.map((t) => ({ path: `/insights/topic/${t.slug}`, title: t.label, priority: 0.7, changeFrequency: "weekly" as const, group: "Insights" })),
        ...getInsights().map((a) => ({
          path: `/insights/${a.slug}`,
          title: a.title,
          priority: 0.7,
          changeFrequency: "monthly" as const,
          lastModified: a.updated ?? a.published,
          group: INSIGHT_TOPICS.find((t) => t.slug === a.category)?.label ?? "Insights",
        })),
        { path: "/blog", title: "Journal", priority: 0.8, changeFrequency: "daily" as const, group: "Journal" },
        ...posts.map((p) => ({ path: `/blog/${p.slug}`, title: p.title, priority: 0.6, changeFrequency: "monthly" as const, lastModified: p.date, group: "Journal" })),
      ];
    },
  },
  {
    slug: "resources",
    title: "Industries, tools & comparisons",
    description: "Industry playbooks, free tools and side-by-side comparisons.",
    entries: async () => [
      { path: "/industries", title: "Industries", priority: 0.8, changeFrequency: "monthly", group: "Industries" },
      ...getIndustries().map((i) => ({ path: `/industries/${i.slug}`, title: i.name, priority: 0.7, changeFrequency: "monthly" as const, group: "Industries" })),
      { path: "/tools", title: "Free tools", priority: 0.7, changeFrequency: "monthly", group: "Tools" },
      ...getTools().map((t) => ({ path: t.href, title: t.name, priority: 0.6, changeFrequency: "monthly" as const, group: "Tools" })),
      { path: "/compare", title: "Comparisons", priority: 0.6, changeFrequency: "monthly", group: "Comparisons" },
      ...getComparisons().map((c) => ({ path: `/compare/${c.slug}`, title: c.title, priority: 0.6, changeFrequency: "monthly" as const, group: "Comparisons" })),
      ...getIndustryComparisons().map((c) => ({ path: `/industry-compare/${c.slug}`, title: c.title, priority: 0.5, changeFrequency: "monthly" as const, group: "Industry comparisons" })),
    ],
  },
  {
    slug: "locations",
    title: "Locations",
    description: "Countries, Indian states and priority cities we serve.",
    entries: async () => [
      ...getCountries().map((c) => ({ path: `/${c.slug}`, title: c.name, priority: 0.8, changeFrequency: "monthly" as const, group: "Countries" })),
      ...getStates().map((s) => ({ path: `/india/state/${s.slug}`, title: s.stateName, priority: 0.6, changeFrequency: "monthly" as const, group: "Indian states" })),
      ...FEATURED_CITY_PATHS.map(([country, city]) => ({
        path: `/${country}/${city}`,
        title: getCity(country, city)?.name ?? city,
        priority: 0.7,
        changeFrequency: "monthly" as const,
        group: "Cities",
      })),
    ],
  },
];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const XML_HEADERS = { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" };

export function sitemapIndexResponse() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SITEMAP_GROUPS.map((g) => `  <sitemap><loc>${esc(`${SITE.url}/sitemaps/${g.slug}.xml`)}</loc></sitemap>`).join("\n")}
</sitemapindex>
`;
  return new Response(body, { headers: XML_HEADERS });
}

export async function sitemapGroupResponse(slug: string) {
  const group = SITEMAP_GROUPS.find((g) => g.slug === slug);
  if (!group) return new Response("Not found", { status: 404 });
  const seen = new Set<string>();
  const urls = (await group.entries())
    .filter((e) => (seen.has(e.path) ? false : (seen.add(e.path), true)))
    .map(
      (e) =>
        `  <url><loc>${esc(`${SITE.url}${e.path}`)}</loc>${e.lastModified ? `<lastmod>${e.lastModified.slice(0, 10)}</lastmod>` : ""}<changefreq>${e.changeFrequency}</changefreq><priority>${e.priority.toFixed(1)}</priority></url>`
    );
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
  return new Response(body, { headers: XML_HEADERS });
}
