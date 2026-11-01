import Link from "next/link";
import { FileCode2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/motion/reveal";
import { SITEMAP_GROUPS, type SitemapEntry } from "@/lib/sitemap-data";
import { buildMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Sitemap — Every Page on SmartWebCare",
  description:
    "A complete, organized list of SmartWebCare pages: services with their guides, process and use cases, insights, industries, tools, locations and company pages.",
  path: "/site-map",
  eyebrow: "Sitemap",
});

function bySubgroup(entries: SitemapEntry[]) {
  const map = new Map<string, SitemapEntry[]>();
  for (const e of entries) {
    const k = e.group ?? "General";
    map.set(k, [...(map.get(k) ?? []), e]);
  }
  return [...map.entries()];
}

export default async function SiteMapPage() {
  const groups = await Promise.all(SITEMAP_GROUPS.map(async (g) => ({ ...g, list: await g.entries() })));
  const total = groups.reduce((n, g) => n + g.list.length, 0);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Sitemap", href: "/site-map" }]}
        eyebrow={`${total} pages · ${groups.length} sections`}
        title="Every page, in one place."
        lead="Browse the whole site by section. Search engines get the same structure from our XML sitemap."
        actions={
          <Link href="/sitemap.xml" className="glass inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-semibold text-[var(--color-heading)] transition-colors hover:border-[var(--color-accent)]">
            <FileCode2 className="h-4 w-4 text-[var(--color-accent-text)]" aria-hidden /> XML sitemap index
          </Link>
        }
      />

      <nav aria-label="Sitemap sections" className="container-wide mt-12">
        <ul className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <li key={g.slug}>
              <a href={`#${g.slug}`} className="glass inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.92rem] font-semibold text-[var(--color-heading)] hover:border-[var(--color-accent)]">
                {g.title}
                <span className="tabular rounded-full bg-[var(--color-light-blue)] px-2 py-0.5 text-[0.75rem] text-[var(--color-accent-deep)]">{g.list.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {groups.map((g) => (
        <section key={g.slug} id={g.slug} aria-labelledby={`${g.slug}-title`} className="container-wide mt-20 scroll-mt-28 md:mt-24">
          <div className="mb-8 flex flex-col justify-between gap-3 border-b border-[var(--color-border)] pb-5 md:flex-row md:items-end">
            <div>
              <h2 id={`${g.slug}-title`} className="text-[length:var(--text-h3)]">
                {g.title}
              </h2>
              <p className="mt-2 text-ink-muted">{g.description}</p>
            </div>
            <a href={`/sitemaps/${g.slug}.xml`} className="link-underline text-sm font-medium text-[var(--color-accent-text)]">
              /sitemaps/{g.slug}.xml
            </a>
          </div>
          <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 xl:columns-4">
            {bySubgroup(g.list).map(([name, items], i) => (
              <Reveal key={name} delay={(i % 4) * 0.04} className="mb-8 break-inside-avoid">
                <h3 className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.16em] text-ink-muted">{name}</h3>
                <ul className="mt-3 space-y-1.5">
                  {items.map((e) => (
                    <li key={e.path}>
                      <Link href={e.path} className="link-underline text-[0.95rem] leading-snug text-[var(--color-heading)] hover:text-[var(--color-accent-text)]">
                        {e.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>
      ))}
      <div className="h-24" />
    </>
  );
}
