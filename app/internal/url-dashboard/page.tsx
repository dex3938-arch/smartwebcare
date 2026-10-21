import type { Metadata } from "next";
import Link from "next/link";
import {
  FEATURED_CITY_PATHS,
  getCities,
  getComparisons,
  getCountries,
  getIndustries,
  getIndustryComparisons,
  getLocationServices,
  getServices,
  getStates,
  getTools,
} from "@/lib/content";

// Internal tool (preserved from the original site): never indexed, never in the sitemap.
export const metadata: Metadata = {
  title: "URL dashboard (internal)",
  robots: { index: false, follow: false },
};

export default function UrlDashboard() {
  const cities = getCities();
  const india = cities.filter((c) => c.countrySlug === "india");
  const rows: { group: string; count: number; examples: string[]; note?: string }[] = [
    { group: "Core pages", count: 11, examples: ["/", "/services", "/about", "/clients", "/contact", "/book-consultation", "/blog", "/industries", "/compare", "/tools", "/privacy"] },
    { group: "Services", count: getServices().length, examples: getServices().slice(0, 6).map((s) => `/${s.slug}`) },
    { group: "Countries", count: getCountries().length, examples: getCountries().map((c) => `/${c.slug}`) },
    { group: "Cities", count: cities.length, examples: FEATURED_CITY_PATHS.slice(0, 6).map(([a, b]) => `/${a}/${b}`), note: `${FEATURED_CITY_PATHS.length} prebuilt, rest on demand (ISR)` },
    { group: "India states / UTs", count: getStates().length, examples: getStates().slice(0, 6).map((s) => `/india/state/${s.slug}`) },
    { group: "City × service", count: cities.length * getLocationServices().length, examples: [`/india/pune/${getLocationServices()[3].slug}`, `/usa/austin/${getLocationServices()[0].slug}`], note: "On demand (ISR), not in sitemap" },
    { group: "India city × industry", count: india.length * getIndustries().length, examples: [`/india/mumbai/${getIndustries()[0].slug}`], note: "On demand (ISR), not in sitemap" },
    { group: "Industries", count: getIndustries().length, examples: getIndustries().slice(0, 6).map((i) => `/industries/${i.slug}`) },
    { group: "Comparisons", count: getComparisons().length, examples: getComparisons().slice(0, 4).map((c) => `/compare/${c.slug}`) },
    { group: "Industry comparisons", count: getIndustryComparisons().length, examples: getIndustryComparisons().slice(0, 4).map((c) => `/industry-compare/${c.slug}`) },
    { group: "Tools", count: getTools().length, examples: getTools().map((t) => t.href) },
  ];
  const total = rows.reduce((s, r) => s + r.count, 0);

  return (
    <section className="container-wide pb-24 pt-28 md:pt-36">
      <p className="eyebrow">Internal · noindex</p>
      <h1 className="mt-4 text-[length:var(--text-h2)] text-ink">URL dashboard</h1>
      <p className="mt-3 text-ink-muted">
        {total.toLocaleString("en-IN")} addressable URLs (plus blog posts from Supabase).
      </p>
      <div className="mt-10 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[var(--color-surface)]">
            <tr>
              <th className="px-4 py-3 font-medium text-ink">Group</th>
              <th className="px-4 py-3 font-medium text-ink">URLs</th>
              <th className="px-4 py-3 font-medium text-ink">Examples</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.group} className="border-t border-[var(--color-border)] align-top">
                <td className="px-4 py-3 text-ink">
                  {r.group}
                  {r.note && <span className="mt-1 block text-xs text-ink-muted">{r.note}</span>}
                </td>
                <td className="tabular px-4 py-3 text-ink">{r.count.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3">
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {r.examples.map((e) => (
                      <li key={e}>
                        <Link href={e} className="text-ink-soft underline-offset-4 hover:text-ink hover:underline">
                          {e}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
