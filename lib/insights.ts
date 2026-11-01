import "server-only";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { ContentSection, Faq } from "@/lib/subpages";

/*
  Insights — articles on current topics, in data/insights/{slug}.json (checked by
  scripts/check-content.py), grouped into four topics. Read once at build time.
*/

export type InsightTopic = {
  slug: "ai-automation" | "search-visibility" | "social-content" | "brand-growth";
  label: string;
  title: string;
  description: string;
  /** Services a reader of this topic usually needs next. */
  services: string[];
};

export const INSIGHT_TOPICS: InsightTopic[] = [
  {
    slug: "ai-automation",
    label: "AI & Automation",
    title: "AI & automation, minus the hype",
    description:
      "What AI agents, receptionists and WhatsApp automation can really do for a growing business, where they fail, and how to adopt them responsibly.",
    services: ["ai-agents", "ai-automations", "ai-receptionist", "whatsapp-marketing"],
  },
  {
    slug: "search-visibility",
    label: "Search, AEO & GEO",
    title: "Being found in search and AI answers",
    description:
      "How Google's AI features, AI assistants and local search decide which businesses to show, and the practical work that earns visibility.",
    services: ["seo", "aeo", "web-development"],
  },
  {
    slug: "social-content",
    label: "Social & Content",
    title: "Social media that builds a brand",
    description:
      "Instagram, LinkedIn, YouTube and creator partnerships: formats that work now, systems for small teams and the rules to follow in India.",
    services: ["instagram-marketing", "linkedin-marketing", "youtube-channel-management", "influencer-marketing"],
  },
  {
    slug: "brand-growth",
    label: "Brand & Growth",
    title: "Brand, budgets and long-term growth",
    description:
      "Personal branding, rebrands, first-party data and budget planning: decisions that compound over years, explained for founders.",
    services: ["personal-branding", "rebranding", "email-marketing-automation", "performance-marketing"],
  },
];

export type Insight = {
  slug: string;
  category: InsightTopic["slug"];
  published: string;
  updated?: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  keyPoints: string[];
  sections: ContentSection[];
  faqs: Faq[];
  sources?: { label: string; url: string }[];
};

const DIR = path.join(process.cwd(), "data", "insights");
let cache: Insight[] | null = null;

function load() {
  if (cache) return cache;
  cache = [];
  if (!existsSync(DIR)) return cache;
  for (const file of readdirSync(DIR)) {
    if (!file.endsWith(".json")) continue;
    try {
      const data = JSON.parse(readFileSync(path.join(DIR, file), "utf8")) as Insight;
      if (data.slug && data.sections?.length) cache.push(data);
    } catch {
      console.warn(`[insights] skipped unreadable ${file}`);
    }
  }
  const order = INSIGHT_TOPICS.map((t) => t.slug);
  cache.sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category) || a.title.localeCompare(b.title));
  return cache;
}

export const getInsights = () => load();
export const getInsight = (slug: string) => load().find((i) => i.slug === slug);
export const getInsightsByTopic = (topic: string) => load().filter((i) => i.category === topic);
export const getTopic = (slug: string) => INSIGHT_TOPICS.find((t) => t.slug === slug);

/** Articles that link to a service (or its sub-pages) — for "Related reading". */
export function getInsightsForService(serviceSlug: string, limit = 3) {
  const re = new RegExp(`\\]\\(/${serviceSlug}(/[a-z-]+)?\\)`);
  const linked = load().filter((i) => re.test(JSON.stringify(i)));
  const topical = load().filter(
    (i) => !linked.includes(i) && INSIGHT_TOPICS.find((t) => t.slug === i.category)?.services.includes(serviceSlug)
  );
  return [...linked, ...topical].slice(0, limit);
}
