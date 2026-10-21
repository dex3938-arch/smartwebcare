import type { Guide } from "./types";
import { guide as seoStandards } from "./seo-standards";
import { guide as onPage } from "./on-page-seo";
import { guide as offPage } from "./off-page-seo";
import { guide as technical } from "./technical-seo";
import { guide as aeo } from "./aeo";
import { guide as geo } from "./geo";
import { guide as xmlSitemap } from "./xml-sitemap";
import { guide as robotsTxt } from "./robots-txt";

export type { Guide, GuideBlock, GuideSection } from "./types";

/** Every long-form guide, in menu order. Each has its own static route (/seo-standards …). */
export const GUIDES: Guide[] = [seoStandards, technical, onPage, offPage, aeo, geo, xmlSitemap, robotsTxt];
const BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));

export const getGuide = (slug: string) => BY_SLUG.get(slug);
export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);

/** Rough reading time from all visible prose (≈ 230 wpm). */
export function readingMinutes(g: Guide) {
  const text = [
    g.lead,
    ...g.summary,
    ...g.sections.flatMap((s) =>
      s.blocks.flatMap((b) => {
        switch (b.type) {
          case "p":
            return [b.text];
          case "list":
          case "checklist":
            return b.items;
          case "callout":
            return [b.title, b.text];
          case "steps":
            return b.items.flatMap((i) => [i.title, i.text]);
          case "table":
            return b.rows.flat();
          default:
            return [];
        }
      })
    ),
    ...g.faqs.flatMap((f) => [f.question, f.answer]),
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 230));
}
