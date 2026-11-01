import "server-only";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

/*
  Service sub-pages — /{service}/guide, /{service}/process and /{service}/use-cases.
  Content lives in data/service-subpages/{slug}.json (one file per service, checked by
  scripts/check-content.py). Read once at build time.
*/

export type Faq = { q: string; a: string };

type PageBase = {
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  faqs: Faq[];
};

export type ContentSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type GuidePage = PageBase & { sections: ContentSection[]; takeaways: string[] };

export type ProcessStep = { title: string; summary: string; activities: string[]; output: string };
export type ProcessPage = PageBase & { steps: ProcessStep[]; deliverables: string[]; youProvide: string[] };

export type UseCase = { title: string; businessType: string; challenge: string; approach: string[]; measure: string[] };
export type UseCasesPage = PageBase & { cases: UseCase[] };

export type ServiceSubpages = { slug: string; guide: GuidePage; process: ProcessPage; useCases: UseCasesPage };

export const SUBPAGE_KINDS = [
  { key: "guide", path: "guide", label: "Guide" },
  { key: "process", path: "process", label: "Process" },
  { key: "useCases", path: "use-cases", label: "Use cases" },
] as const;
export type SubpageKind = (typeof SUBPAGE_KINDS)[number]["key"];

const DIR = path.join(process.cwd(), "data", "service-subpages");

let cache: Map<string, ServiceSubpages> | null = null;

function load() {
  if (cache) return cache;
  cache = new Map();
  if (!existsSync(DIR)) return cache;
  for (const file of readdirSync(DIR)) {
    if (!file.endsWith(".json")) continue;
    try {
      const data = JSON.parse(readFileSync(path.join(DIR, file), "utf8")) as ServiceSubpages;
      if (data.slug && data.guide && data.process && data.useCases) cache.set(data.slug, data);
    } catch {
      console.warn(`[subpages] skipped unreadable ${file}`);
    }
  }
  return cache;
}

export const getSubpages = (slug: string) => load().get(slug);
export const getSubpageSlugs = () => [...load().keys()];

/** Plain-text slug for headings ("What changed in 2026" → "what-changed-in-2026"). */
export function anchor(text: string) {
  return text
    .toLowerCase()
    .replace(/\*\*|\[|\]\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/** ~230 words a minute, rounded up. */
export function readingMinutes(texts: string[]) {
  const words = texts.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 230));
}
