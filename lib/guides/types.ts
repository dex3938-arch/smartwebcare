/*
  Content model for SmartWebCare's long-form SEO / AEO / GEO guide pages.
  Inline text supports a tiny markup: [label](/path) links, **bold** and `code`.
*/

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "checklist"; title?: string; items: string[] }
  | { type: "callout"; tone: "info" | "warn"; title: string; text: string }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "table"; caption: string; columns: string[]; rows: string[][] }
  | { type: "code"; lang: string; code: string; caption?: string };

export type GuideSection = {
  /** URL fragment, kebab-case, unique within the guide (used by the table of contents). */
  id: string;
  /** Rendered as an H2. */
  heading: string;
  blocks: GuideBlock[];
};

export type Guide = {
  /** Route segment, e.g. "on-page-seo" → /on-page-seo */
  slug: string;
  /** "service" = we also deliver this as paid work; "resource" = educational reference. */
  kind: "service" | "resource";
  /** Short label for menus, e.g. "On-Page SEO". */
  navLabel: string;
  /** ≤ 60 characters, ends with "| SmartWebCare". */
  metaTitle: string;
  /** 120–160 characters, plain text. */
  metaDescription: string;
  eyebrow: string;
  /** The page's single H1. */
  title: string;
  /** 1–2 sentence intro under the H1. */
  lead: string;
  /** 3–5 answer-first key takeaways shown near the top. */
  summary: string[];
  /** 6–12 sections, in reading order. */
  sections: GuideSection[];
  /** kind === "service": how an engagement with us works (exactly 4 steps). */
  engagement?: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  /** Slugs of related guides or services (see the allowed list in the brief). */
  related: string[];
  /** ISO date the content was written / last reviewed. */
  updated: string;
};
