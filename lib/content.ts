import "server-only";

/*
  Typed, server-only access to the site's content.
  Every dataset in /data is the team's original (SocialGuava) content, kept 1:1 — page
  copy, services, slugs and URL structure. The only change at load time is the brand
  name: "Social Guava" → "SmartWebCare". This module never ships to the browser.
*/

import servicesData from "@/data/services.json";
import locationServicesData from "@/data/location-services.json";
import industriesData from "@/data/industries.json";
import comparisonsData from "@/data/comparisons.json";
import industryComparisonsData from "@/data/industry-comparisons.json";
import statesData from "@/data/states.json";
import citiesData from "@/data/cities.json";
import countriesData from "@/data/countries.json";
import industryServicesData from "@/data/industry-services.json";
import industryCityFaqsData from "@/data/industry-city-faqs.json";
import toolsData from "@/data/tools.json";

// ---------------------------------------------------------------- types

export type FAQ = { question: string; answer: string };
export type Step = { title: string; description: string };

export type ServiceCategory = "ai" | "marketing" | "branding" | "design";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  categoryLabel: string;
  badge: string | null;
  description: string;
  heroSubtitle: string;
  fullDescription: string;
  targetAudience: string;
  points: string[];
  benefits: Step[];
  process: Step[];
  faqs: FAQ[];
  relevantIndustries: string[];
  relevantComparisons: string[];
  metaTitle: string;
};

export type LocationService = {
  slug: string;
  title: string;
  shortTitle: string;
  titleTemplate: string;
  descriptionTemplate: string;
  metaDescriptionTemplate: string;
  keyPoints: string[];
  benefits: Step[];
  process: (Step & { step: number })[];
  faqs: FAQ[];
};

export type Industry = {
  slug: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  challenges: Step[];
  relevantServices: string[];
  results: { metric: string; value: string; description: string }[];
  process: Step[];
  faqs: FAQ[];
  testimonial: { quote: string; name: string; role: string; company: string };
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
};

export type ComparisonOption = {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  costRange: string;
};

export type Comparison = {
  slug: string;
  title: string;
  heroTitle: string;
  heroSubtitle: string;
  optionA: ComparisonOption;
  optionB: ComparisonOption;
  comparisonFactors: {
    factor: string;
    optionA: string;
    optionB: string;
    winner: string;
  }[];
  recommendation: string;
  faqs: FAQ[];
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  relevantServices?: string[];
  relevantIndustries?: string[];
};

export type IndustryComparison = Comparison & {
  industrySlug: string;
  industryName: string;
};

export type State = {
  slug: string;
  stateName: string;
  stateType: string;
  heroTitle: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  population: string;
  keyIndustries: string[];
  topBusinessHubs: string[];
};

export type City = {
  slug: string;
  name: string;
  region: string | null;
  country: string;
  countrySlug: string;
  heroTitle: string;
  heroDescription: string;
  ctaHeading: string;
  ctaDescription: string;
  keywords: string[];
  lat: number | null;
  lng: number | null;
};

export type Country = {
  slug: string;
  name: string;
  description: string;
  cityCount: number;
};

export type IndustryService = {
  name: string;
  slug: string;
  description: string;
  benefits: string[];
};

// ---------------------------------------------------------------- content policy

/*
  The live industry pages carry NAMED testimonials ("Dr. Meera Patel, Wellness First
  Clinic", "Chef Vikram Singh, The Spice Route", …) and "results" figures ("$100K+ ARR",
  "₹50L+ monthly revenue"). Unlike the anonymised homepage testimonials, these could not
  be verified and read like placeholder copy. The brief forbids inventing clients,
  testimonials or metrics, so they stay hidden until the owner confirms they're genuine.
  → Set to true once verified.
*/
export const SHOW_UNVERIFIED_INDUSTRY_PROOF = false;

/** "Marketing Agency vs Freelancer … [2024 Guide]" → drop stale year tags from titles. */
export function stripStaleYear(title: string) {
  return title
    .replace(/\s*[[(]\s*\d{4}[^\])]*[\])]/g, "") // "[2024 Guide]", "(2024)"
    .replace(/\s+(?:in|for)\s+20\d{2}(?=[?!.:]|\s*$)/gi, "") // "Wins in 2024?" → "Wins?"
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Same team, new name: the source copy says "Social Guava" — the site is SmartWebCare. */
export function rebrand(text: string) {
  return text.replace(/\bSocial\s?Guava\b/gi, "SmartWebCare");
}
function rebrandDeep<T>(value: T): T {
  if (typeof value === "string") return rebrand(value) as T;
  if (Array.isArray(value)) return value.map((v) => rebrandDeep(v)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, rebrandDeep(v)])) as T;
  }
  return value;
}

// ---------------------------------------------------------------- helpers

const CATEGORY: Record<string, ServiceCategory> = {
  "AI Services": "ai",
  "Marketing Services": "marketing",
  "Branding Services": "branding",
  "Design Services": "design",
};

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  ai: "AI & Automation",
  marketing: "Marketing",
  branding: "Branding",
  design: "Design & Production",
};
export const CATEGORY_ORDER: ServiceCategory[] = ["ai", "marketing", "branding", "design"];

/** "🏆 Best Seller" → "Best Seller" (keeps the signal, drops the emoji). */
function cleanBadge(badge?: string | null) {
  if (!badge) return null;
  return badge.replace(/^[^\p{L}\p{N}]+/u, "").trim() || null;
}

/** Replace {city}/{region} placeholders produced from the original template functions. */
export function fillTemplate(text: string, city: string, region?: string | null) {
  return text
    .replaceAll("{city}", city)
    .replaceAll("{region}", region || city);
}

// ---------------------------------------------------------------- services

type RawService = Omit<Service, "category" | "categoryLabel" | "badge"> & {
  category: string;
  badge?: string;
};

/*
  The live site links to /social-media-marketing from its nav, footer, sitemap and
  ~25 "related service" blocks, but the page itself 404s (it had no main-page record).
  We rebuild it from the team's own social-media-marketing location template.
*/
const SOCIAL_MEDIA_MARKETING: RawService = {
  title: "Social Media Marketing",
  slug: "social-media-marketing",
  category: "Marketing Services",
  badge: "🏆 Best Seller",
  description:
    "Turn scrolls into stops with engaging content and community management.",
  heroSubtitle:
    "Turn scrolls into stops with daily posts, reels, stories and community management that build loyal followers.",
  fullDescription:
    "Consistency is what separates brands people remember from brands people scroll past. We plan, create and publish platform-specific content — posts, reels, stories and carousels — then manage the community around it, so your presence compounds instead of stalling. Every month is measured, reviewed and optimized for reach, engagement and conversions.",
  targetAudience:
    "Brands and businesses that need a consistent, growing presence on Instagram, Facebook, LinkedIn, X and TikTok — without building an in-house social team.",
  points: [
    "Daily content calendars",
    "Reels, posts, stories & engagement",
    "Platform-specific strategies",
    "Community management",
    "Analytics and performance tracking",
  ],
  benefits: [
    {
      title: "Consistent Presence",
      description: "Never miss a posting opportunity with our content calendars",
    },
    {
      title: "Real Engagement",
      description: "Build authentic connections with your audience",
    },
    {
      title: "Growth Focused",
      description: "Strategies designed to increase followers and conversions",
    },
  ],
  process: [
    {
      title: "Audit & Strategy",
      description:
        "Analyze current performance and develop platform-specific strategies",
    },
    {
      title: "Content Creation",
      description: "Design posts, reels, stories, and carousels that resonate",
    },
    {
      title: "Scheduling & Posting",
      description: "Consistent posting at optimal times for maximum reach",
    },
    {
      title: "Engage & Optimize",
      description: "Community management and continuous improvement",
    },
  ],
  faqs: [
    {
      question: "Which platforms do you manage?",
      answer:
        "We manage Instagram, Facebook, LinkedIn, Twitter/X, and TikTok based on where your audience is most active.",
    },
    {
      question: "How often will you post?",
      answer:
        "Posting frequency depends on your package, typically 3-7 posts per week, plus daily stories and engagement.",
    },
    {
      question: "Do you respond to comments and DMs?",
      answer:
        "Yes! Community management is included. We monitor and respond to comments, DMs, and engage with your audience.",
    },
  ],
  relevantIndustries: [
    "restaurants-hospitality",
    "beauty-fashion",
    "real-estate",
    "healthcare-wellness",
    "ecommerce-d2c",
  ],
  relevantComparisons: ["organic-vs-paid", "smm-vs-performance", "content-vs-paid-ads"],
  metaTitle:
    "Social Media Marketing Services | Content, Reels & Community Management | Social Guava",
};

/*
  Most original service records omit relevantIndustries / relevantComparisons (23–24 of 28),
  which would leave those pages with no related links. Derive them from the inverse
  relationship already present in the data: industries and comparisons list their
  relevant services.
*/
function relatedFromData(slug: string) {
  const industries = (industriesData as { slug: string; relevantServices?: string[] }[])
    .filter((i) => i.relevantServices?.includes(slug))
    .map((i) => i.slug);
  const comparisons = (comparisonsData as { slug: string; relevantServices?: string[] }[])
    .filter((c) => c.relevantServices?.includes(slug))
    .map((c) => c.slug);
  return { industries, comparisons };
}

function normalizeService(input: RawService): Service {
  const raw = rebrandDeep(input);
  const category = CATEGORY[raw.category] ?? "marketing";
  const derived = relatedFromData(raw.slug);
  return {
    ...raw,
    category,
    categoryLabel: CATEGORY_LABELS[category],
    badge: cleanBadge(raw.badge),
    points: raw.points ?? [],
    faqs: raw.faqs ?? [],
    benefits: (raw.benefits ?? []).map(({ title, description }) => ({ title, description })),
    process: (raw.process ?? []).map(({ title, description }) => ({ title, description })),
    relevantIndustries: raw.relevantIndustries ?? derived.industries,
    relevantComparisons: raw.relevantComparisons ?? derived.comparisons,
  };
}

const SERVICES: Service[] = [
  ...(servicesData as RawService[]),
  SOCIAL_MEDIA_MARKETING,
].map(normalizeService);

const SERVICE_BY_SLUG = new Map(SERVICES.map((s) => [s.slug, s]));

export const getServices = () => SERVICES;
/** Every service renders through the /[slug] service template. */
export const getTemplatedServices = () => SERVICES;
export const getService = (slug: string) => SERVICE_BY_SLUG.get(slug);
export const getServicesByCategory = (category: ServiceCategory) =>
  SERVICES.filter((s) => s.category === category);
/** Resolve a list of slugs to services, silently skipping unknown slugs. */
export const getServicesBySlugs = (slugs: string[]) =>
  slugs.map((s) => SERVICE_BY_SLUG.get(s)).filter((s): s is Service => !!s);

/** The flagship services surfaced on the home page, in the order the live site shows them. */
export const FEATURED_SERVICE_SLUGS = [
  "personal-branding",
  "instagram-marketing",
  "linkedin-marketing",
  "ai-agents",
  "ai-automations",
  "ai-receptionist",
  "social-media-marketing",
  "performance-marketing",
  "whatsapp-marketing",
];

/** Header Services menu: the live site's list — every service in data order (28 items). */
export function getServiceMenu() {
  return SERVICES.filter((s) => s.slug !== "social-media-marketing").map((s) => ({ slug: s.slug, title: s.title, badge: s.badge }));
}

/** Services grouped by discipline (original grouping). */
export function getServiceNavGroups() {
  return CATEGORY_ORDER.map((c) => ({
    label: CATEGORY_LABELS[c],
    items: getServicesByCategory(c).map((s) => ({ slug: s.slug, title: s.title, badge: s.badge })),
  }));
}

/** The long-form SEO guides that also describe services (used for related links). */
export const SEARCH_GUIDE_SERVICES: { slug: string; title: string; description: string; points: string[] }[] = [
  { slug: "technical-seo", title: "Technical SEO", description: "Crawlability, indexing, speed and site structure — fixed at the source.", points: ["Crawl, index & render audits", "Core Web Vitals & site speed", "Redirects, canonicals & sitemaps"] },
  { slug: "on-page-seo", title: "On-Page SEO", description: "Search intent, content, titles and internal links that earn the click.", points: ["Keyword & intent mapping", "Titles, headings & meta descriptions", "Internal links & structured data"] },
  { slug: "off-page-seo", title: "Off-Page SEO", description: "Ethical link earning, digital PR and reputation that build authority.", points: ["Editorially earned links", "Digital PR & useful resources", "Listings, reviews & reputation"] },
  { slug: "geo", title: "GEO — Generative Engine Optimization", description: "Make your expertise easy for generative search to understand and cite.", points: ["Original, citable insight", "Clear entities & authorship", "Crawlable for AI search"] },
];

// ---------------------------------------------------------------- location services

const LOCATION_SERVICES = (rebrandDeep(locationServicesData) as LocationService[]).map((s) => ({
  ...s,
  benefits: s.benefits.map(({ title, description }) => ({ title, description })),
}));
const LOCATION_SERVICE_BY_SLUG = new Map(LOCATION_SERVICES.map((s) => [s.slug, s]));
export const getLocationServices = () => LOCATION_SERVICES;
export const getLocationService = (slug: string) => LOCATION_SERVICE_BY_SLUG.get(slug);

// ---------------------------------------------------------------- industries & comparisons

const INDUSTRIES = rebrandDeep(industriesData) as Industry[];
const INDUSTRY_BY_SLUG = new Map(INDUSTRIES.map((i) => [i.slug, i]));
export const getIndustries = () => INDUSTRIES;
export const getIndustry = (slug: string) => INDUSTRY_BY_SLUG.get(slug);

const COMPARISONS = rebrandDeep(comparisonsData) as Comparison[];
const COMPARISON_BY_SLUG = new Map(COMPARISONS.map((c) => [c.slug, c]));
export const getComparisons = () => COMPARISONS;
export const getComparison = (slug: string) => COMPARISON_BY_SLUG.get(slug);
export const getComparisonsBySlugs = (slugs: string[]) =>
  slugs.map((s) => COMPARISON_BY_SLUG.get(s)).filter((c): c is Comparison => !!c);

const INDUSTRY_COMPARISONS = rebrandDeep(industryComparisonsData) as IndustryComparison[];
const INDUSTRY_COMPARISON_BY_SLUG = new Map(INDUSTRY_COMPARISONS.map((c) => [c.slug, c]));
export const getIndustryComparisons = () => INDUSTRY_COMPARISONS;
export const getIndustryComparison = (slug: string) =>
  INDUSTRY_COMPARISON_BY_SLUG.get(slug);
export const getIndustryComparisonForIndustry = (industrySlug: string) =>
  INDUSTRY_COMPARISONS.find((c) => c.industrySlug === industrySlug);

const INDUSTRY_SERVICES = rebrandDeep(industryServicesData) as Record<string, IndustryService[]>;
export const getIndustryServices = (industrySlug: string) =>
  INDUSTRY_SERVICES[industrySlug] ?? [];

/** City-specific FAQs for /india/{city}/{industry} pages (templated with the city name). */
const INDUSTRY_CITY_FAQS = rebrandDeep(industryCityFaqsData) as Record<string, FAQ[]>;
export const getIndustryCityFaqs = (industrySlug: string, cityName: string): FAQ[] =>
  (INDUSTRY_CITY_FAQS[industrySlug] ?? []).map((f) => ({
    question: fillTemplate(f.question, cityName),
    answer: fillTemplate(f.answer, cityName),
  }));

// ---------------------------------------------------------------- tools

export type ToolMeta = { name: string; description: string; href: string; slug: string };
const TOOLS: ToolMeta[] = (rebrandDeep(toolsData) as Omit<ToolMeta, "slug">[]).map((t) => ({
  ...t,
  slug: t.href.replace(/^\/tools\//, ""),
}));
export const getTools = () => TOOLS;
export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug);

// ---------------------------------------------------------------- geography

/*
  Cities are stored in the same order the original router searched them
  (India first, then international). Duplicate slugs were resolved first-match-wins,
  exactly as the original `cities.find(country && slug)` did.
*/
const CITIES = rebrandDeep(citiesData) as City[];
const CITY_KEY = (country: string, slug: string) => `${country}/${slug}`;
const CITY_BY_KEY = new Map(CITIES.map((c) => [CITY_KEY(c.countrySlug, c.slug), c]));

export const getCities = () => CITIES;
export const getCity = (countrySlug: string, citySlug: string) =>
  CITY_BY_KEY.get(CITY_KEY(countrySlug, citySlug));
export const getCitiesByCountry = (countrySlug: string) =>
  CITIES.filter((c) => c.countrySlug === countrySlug);
export const getCitiesByRegion = (countrySlug: string, region: string) =>
  CITIES.filter((c) => c.countrySlug === countrySlug && c.region === region);

/** Same-region neighbours for internal linking (deterministic, excludes the city itself). */
export function getNearbyCities(city: City, limit = 8) {
  const sameRegion = city.region
    ? getCitiesByRegion(city.countrySlug, city.region).filter((c) => c.slug !== city.slug)
    : [];
  if (sameRegion.length >= limit || city.lat == null || city.lng == null) {
    return sameRegion.slice(0, limit);
  }
  const { lat, lng } = city as { lat: number; lng: number };
  const rest = getCitiesByCountry(city.countrySlug)
    .filter((c) => c.slug !== city.slug && !sameRegion.includes(c) && c.lat != null && c.lng != null)
    .sort(
      (a, b) =>
        Math.hypot(a.lat! - lat, a.lng! - lng) - Math.hypot(b.lat! - lat, b.lng! - lng)
    );
  return [...sameRegion, ...rest].slice(0, limit);
}

const COUNTRIES = Object.values(rebrandDeep(countriesData) as Record<string, Country>).map((c) => ({
  ...c,
  // The live copy says "936+ cities" (raw list length incl. unreachable duplicate slugs).
  // Use the real number of reachable city pages.
  description: c.description.replace(/\b936\+?/g, `${getCitiesByCountry(c.slug).length}+`),
  cityCount: getCitiesByCountry(c.slug).length,
}));
const COUNTRY_BY_SLUG = new Map(COUNTRIES.map((c) => [c.slug, c]));
export const getCountries = () => COUNTRIES;
export const getCountry = (slug: string) => COUNTRY_BY_SLUG.get(slug);

// The raw state records carry an incomplete `cities` list; cities are derived from city data instead.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const STATES = (rebrandDeep(statesData) as (State & { cities?: string[] })[]).map(({ cities: _unused, ...s }) => s);
const STATE_BY_SLUG = new Map(STATES.map((s) => [s.slug, s]));
export const getStates = () => STATES;
export const getState = (slug: string) => STATE_BY_SLUG.get(slug);

/*
  City records and state records name some regions differently, so in the original
  these state pages could never list their cities (e.g. /india/state/delhi showed none).
*/
const REGION_ALIASES: Record<string, string[]> = {
  Delhi: ["Delhi NCR"],
  "Andaman & Nicobar Islands": ["Andaman & Nicobar"],
  "Dadra & Nagar Haveli and Daman & Diu": ["Dadra & Nagar Haveli", "Daman & Diu"],
};
const regionMatchesState = (region: string, state: State) =>
  region === state.stateName || (REGION_ALIASES[state.stateName] ?? []).includes(region);

export const getStateForRegion = (region: string | null) =>
  region ? STATES.find((s) => regionMatchesState(region, s)) : undefined;
export const getCitiesForState = (state: State) =>
  CITIES.filter((c) => c.countrySlug === "india" && !!c.region && regionMatchesState(c.region, state));

/**
 * The 69 city pages the live sitemap prioritises. These are prebuilt at deploy time;
 * every other city/service/industry combination renders on demand and is cached (ISR).
 */
export const FEATURED_CITY_PATHS: [string, string][] = [
  ...["gurugram", "delhi", "mumbai", "bangalore", "pune", "chennai", "hyderabad", "kolkata", "ahmedabad", "jaipur", "chandigarh", "lucknow", "surat", "nagpur", "indore", "bhopal", "visakhapatnam", "patna", "vadodara", "ludhiana", "agra", "nashik", "faridabad", "rajkot", "meerut", "varanasi", "amritsar", "prayagraj", "guwahati", "kochi"].map(
    (c) => ["india", c] as [string, string]
  ),
  ...["new-york", "los-angeles", "chicago", "houston", "phoenix", "philadelphia", "san-antonio", "san-diego", "dallas", "san-jose", "austin", "jacksonville", "fort-worth", "columbus-oh", "charlotte", "indianapolis", "san-francisco", "seattle", "denver", "washington-dc", "boston", "nashville", "detroit", "portland", "las-vegas", "milwaukee", "albuquerque", "tucson", "fresno", "sacramento", "kansas-city", "mesa", "atlanta", "miami", "raleigh"].map(
    (c) => ["usa", c] as [string, string]
  ),
  ["uk", "london"],
  ["canada", "toronto"],
  ["australia", "sydney"],
  ["uae", "dubai"],
];

