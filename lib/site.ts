/** Global site configuration — single source of truth for brand, nav, and conversion endpoints. */

/** Read a public env var; empty strings count as "not set". */
const env = (v: string | undefined, fallback = "") => (v && v.trim() ? v.trim() : fallback);

/*
  Every contact detail comes from environment variables (Vercel → Settings → Environment
  Variables, or .env.local), so they can be changed without touching code — redeploy after
  editing. The defaults below are the team's current channels.
*/
export const SITE = {
  name: "SmartWebCare",
  legalName: env(process.env.NEXT_PUBLIC_LEGAL_NAME, "SmartWebCare"),
  tagline: "Branding & Marketing Agency",
  description:
    "SmartWebCare is a branding and marketing agency that builds brands from scratch, scales them with strategy, and grows them with purpose — from raw ideas to ripe identities.",
  /** Resolved in next.config.ts (your env value → Vercel production domain → smartwebcare.com). */
  url: env(process.env.NEXT_PUBLIC_SITE_URL, "https://smartwebcare.com").replace(/\/$/, ""),
  locale: "en",
  city: env(process.env.NEXT_PUBLIC_CONTACT_CITY, "New Delhi"),
  country: env(process.env.NEXT_PUBLIC_CONTACT_COUNTRY, "India"),
  /** Full postal address (optional) — shown in the footer and contact page when set. */
  address: env(process.env.NEXT_PUBLIC_CONTACT_ADDRESS),
  /** Opening hours (optional), e.g. "Mon–Sat, 10am–7pm IST". */
  hours: env(process.env.NEXT_PUBLIC_BUSINESS_HOURS),
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "hello@socialguava.com"),
  /** Phone number as displayed; call links use its digits. */
  phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE, "+91 8065376767"),
  /** WhatsApp chat link, used when NEXT_PUBLIC_WHATSAPP_NUMBER is not set. */
  whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP_URL, "https://wa.link/0tfoce"),
  calendly: env(process.env.NEXT_PUBLIC_CALENDLY_URL, "https://calendly.com/grow-socialguava/30min"),
  consultationValue: Number(env(process.env.NEXT_PUBLIC_CONSULTATION_VALUE, "175")) || 175,
  /** Social profiles (set one to an empty value in Vercel to hide it). */
  socials: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/socialguava",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/company/socialguava/",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://www.facebook.com/socialguava",
    x: process.env.NEXT_PUBLIC_X_URL ?? "https://twitter.com/socialguava",
  },
};

/** tel: link from any phone format ("+91 80653 76767" → "tel:+918065376767"). */
export const telHref = (phone: string = SITE.phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** Replace {{EMAIL}} / {{PHONE}} / {{CITY}} / {{URL}} / {{DOMAIN}} placeholders in copy with the live contact details. */
export function withContacts<T>(value: T): T {
  if (typeof value === "string") {
    return value
      .replaceAll("{{EMAIL}}", SITE.email)
      .replaceAll("{{PHONE}}", SITE.phone)
      .replaceAll("{{CITY}}", SITE.city)
      .replaceAll("{{URL}}", SITE.url)
      .replaceAll("{{DOMAIN}}", SITE.url.replace(/^https?:\/\//, "")) as T;
  }
  if (Array.isArray(value)) return value.map((v) => withContacts(v)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withContacts(v)])) as T;
  }
  return value;
}

export type NavLink = { label: string; href: string; description?: string };

export type NavItem = {
  label: string;
  href: string;
  /** "services" renders the grouped services mega-menu; "list" a compact dropdown. */
  panel?: "services" | "list";
  items?: NavLink[];
};

export const SEO_LINKS: NavLink[] = [
  { label: "SEO Standards", href: "/seo-standards", description: "How search works — the full framework" },
  { label: "Technical SEO", href: "/technical-seo", description: "Crawling, indexing, speed & structure" },
  { label: "On-Page SEO", href: "/on-page-seo", description: "Intent, content, titles & internal links" },
  { label: "Off-Page SEO", href: "/off-page-seo", description: "Earned links, PR & reputation" },
  { label: "SEO Services", href: "/seo", description: "Audit, strategy and implementation" },
  { label: "XML Sitemap", href: "/xml-sitemap", description: "What to include and how to submit" },
  { label: "Robots.txt", href: "/robots-txt", description: "Crawler rules done right" },
];

export const RESOURCE_LINKS: NavLink[] = [
  { label: "Resources hub", href: "/resources", description: "Every guide, tool and checklist" },
  { label: "FAQ", href: "/faq", description: "Straight answers, by topic" },
  { label: "Free tools", href: "/tools", description: "Generators & calculators" },
  { label: "Industries", href: "/industries", description: "What we do, sector by sector" },
  { label: "Journal", href: "/blog", description: "Notes from the studio" },
  { label: "Comparisons", href: "/compare", description: "Weigh up your options" },
];

export const COMPANY_LINKS: NavLink[] = [
  { label: "About", href: "/about", description: "The team & how we work" },
  { label: "Clients", href: "/clients", description: "Work, in clients' words" },
  { label: "Book a call", href: "/book-consultation", description: "Free 30-minute consultation" },
];

/** Same items as the live socialguava.com navbar. */
export const PRIMARY_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", panel: "services" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

/** Footer columns — same as the live socialguava.com footer. */
export const FOOTER_NAV = {
  quick: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Testimonials", href: "/clients" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ],
  services: [
    { label: "AI Agents & Automations", href: "/ai-agents" },
    { label: "Personal Branding", href: "/personal-branding" },
    { label: "Social Media Marketing", href: "/social-media-marketing" },
    { label: "Performance Marketing", href: "/performance-marketing" },
    { label: "Brand Playbook", href: "/brand-playbook" },
    { label: "Video & Graphic Design", href: "/graphic-design" },
  ],
  india: [
    { label: "Gurugram", href: "/india/gurugram" },
    { label: "Mumbai", href: "/india/mumbai" },
    { label: "Delhi NCR", href: "/india/delhi" },
    { label: "Bangalore", href: "/india/bangalore" },
    { label: "Pune", href: "/india/pune" },
  ],
  international: [
    { label: "Dubai", href: "/uae/dubai" },
    { label: "London", href: "/uk/london" },
    { label: "New York", href: "/usa/new-york" },
    { label: "Toronto", href: "/canada/toronto" },
    { label: "Sydney", href: "/australia/sydney" },
  ],
  /** Small bottom row: legal + the SEO/AEO/GEO resources. */
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "SEO Guides", href: "/resources" },
    { label: "FAQ", href: "/faq" },
  ],
} as const;
