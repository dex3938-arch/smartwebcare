/*
  Home / brand content — the team's original SocialGuava homepage copy, kept as-is.
  The only change is the brand name (Social Guava → SmartWebCare).
*/

export const HERO = {
  eyebrow: "Branding & marketing agency · Made in India",
  headline: ["Grow Your Brand", "With SmartWebCare"],
  lead:
    "We're a branding & marketing agency that builds brands from scratch, scales them with strategy, and infuses purpose into every pixel. From bold beginnings to viral breakthroughs - we help your brand show up, stand out, and stick.",
};

export const STATS = [
  { value: 100, suffix: "+", label: "Happy Clients" },
  { value: 100, suffix: "M+", label: "Organic Views" },
  { value: 95, suffix: "%", label: "Satisfaction Rate" },
] as const;

/** Trust strip under the hero (live site, verbatim). */
export const TRUST = [
  { icon: "lock", title: "100% Confidential", body: "Your ideas are safe with us" },
  { icon: "clock", title: "24hr Response Time", body: "We're always available" },
  { icon: "award", title: "100+ Brands Served", body: "Trusted by leading companies" },
  { icon: "star", title: "4.9/5 Rating", body: "Highly rated by clients" },
  { icon: "message", title: "WhatsApp-First", body: "Direct communication" },
  { icon: "flag", title: "Made in India", body: "Supporting local & global businesses" },
] as const;

/** Services section intro (live heading "Let's Guava Your Brand" — the brand-name pun becomes "Grow"). */
export const SERVICES_INTRO = {
  heading: "Let's Grow Your Brand",
  lead:
    "From raw ideas to ripe identities - we help brands grow juicy and unforgettable, right from scratch to scale. Our comprehensive marketing and branding services ensure your business stands out in today's competitive landscape.",
  bestSellers: ["personal-branding", "instagram-marketing", "linkedin-marketing"],
};

/** Free consultation block (live copy; the live page's booking counters are omitted). */
export const CONSULT = {
  badge: "🔥 High demand alert",
  title: "Limited Consultation Slots Available",
  worth: "Worth $175 for FREE",
  lead: "Book now before slots fill up for this month",
  facts: [
    { label: "Response Time", value: "Under 5 minutes" },
    { label: "Consultation", value: "30 minutes, free" },
  ],
  cta: "Book Your Free Consultation",
  note: "⚡ Select your preferred time slot on our calendar",
};

/** Contact block (live copy). */
export const CONTACT = {
  eyebrow: "Get In Touch",
  title: "Let's Chat on WhatsApp!",
  lead: "Skip the form-filling and get in touch with us instantly. We're just a message away from turning your ideas into reality.",
  features: ["Fast Response", "Direct Chat", "No Forms"],
  cta: "Message Us on WhatsApp",
  note: "We're usually online and respond within minutes! 🌟",
};

export const MARQUEE = [
  "Personal branding",
  "Social media",
  "AI agents & automation",
  "Performance marketing",
  "Brand strategy",
  "Packaging design",
  "Video & content",
  "Go-to-market",
];

export const PROMISES = [
  { title: "24-hour response", body: "We're always reachable — usually within minutes." },
  { title: "WhatsApp-first", body: "Direct, human communication. No ticket queues." },
  { title: "100% confidential", body: "Your ideas and numbers stay with us." },
  { title: "Made in India", body: "Supporting local and global businesses alike." },
] as const;

/** "Why Go SmartWebCare with Us?" — live points, shown as glass cards (icon + point). */
export const WHY = {
  eyebrow: "Why Go SmartWebCare with Us?",
  heading: "We're not just your agency - we're your brand's favorite co-founder.",
  points: [
    { icon: "rocket", title: "Built 100+ brands from scratch" },
    { icon: "message", title: "WhatsApp-first: Fast, real, and always reachable" },
    { icon: "sparkles", title: "Strategy + Soul - we build with purpose, not just pixels" },
    { icon: "users", title: "Human-first communication, client-first culture" },
    { icon: "heart", title: "We obsess over your brand like it's our own" },
    { icon: "target", title: "Crisp execution, juicy outcomes" },
  ],
  closer: "With SmartWebCare, you're not hiring a team - you're gaining a partner.",
} as const;

export const ABOUT = {
  eyebrow: "About SmartWebCare",
  mission:
    "SmartWebCare is a full-service branding & marketing agency on a mission to turn ideas into iconic brands.",
  pillarsLine: "We build brands from scratch. We scale brands with strategy. And we grow them with purpose.",
  pillars: [
    { k: "Build", v: "We build brands from scratch." },
    { k: "Scale", v: "We scale brands with strategy." },
    { k: "Grow", v: "And we grow them with purpose." },
  ],
  body: [
    "From product packaging to Instagram presence, we combine design thinking, content creativity, and real-time data to craft stories that convert.",
    "We don't do templated work. We don't ghost you after onboarding. We work with you - as partners, not vendors - because we believe brand-building is a responsibility, not just a service.",
    "Whether you're launching your first product or reimagining your digital presence - we're the team that makes it happen.",
  ],
  cta: "Learn More About Us",
};

/** Home "services" scroll list — the flagship services, in the order the original site shows them. */
export const SERVICE_SCROLL: { slug: string; icon: string; points?: string[] }[] = [
  { slug: "personal-branding", icon: "user" },
  { slug: "instagram-marketing", icon: "camera" },
  { slug: "linkedin-marketing", icon: "briefcase" },
  { slug: "ai-agents", icon: "bot" },
  { slug: "ai-automations", icon: "workflow" },
  { slug: "ai-receptionist", icon: "phone" },
  { slug: "social-media-marketing", icon: "share" },
  { slug: "performance-marketing", icon: "trend" },
  { slug: "whatsapp-marketing", icon: "message" },
];

export type Testimonial = {
  quote: string;
  role: string;
  context: string;
  /** Which service the engagement maps to, for "Work" filtering. */
  service: string;
  /** A hard outcome stated by the client in their own words, when they gave one. */
  outcome?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They didn't just help us launch. They helped us lead. We came to them with a drink — they gave us a brand. From GTM strategy to content systems, SmartWebCare was the real MVP.",
    role: "Founder",
    context: "Beverage brand (FMCG)",
    service: "go-to-market-strategy",
  },
  {
    quote:
      "Instagram went from chaotic to consistent — and it shows. SmartWebCare gave us a brand voice, visuals, and vibe we never had before. They made skincare scroll-worthy.",
    role: "Head of Marketing",
    context: "Skincare startup",
    service: "instagram-marketing",
  },
  {
    quote:
      "They don't just design — they decode your vision. From logo to packaging, every asset felt like it was made for us. The coffee brand looks stunning — online and on shelf.",
    role: "Co-Founder",
    context: "Coffee brand",
    service: "product-packaging-design",
  },
  {
    quote:
      "I'm a creator, not a marketer — and that's why I needed them. They helped me shape my passion for cricket into a real Instagram presence — content, vibe, and audience.",
    role: "Content Creator",
    context: "Sports niche",
    service: "instagram-marketing",
  },
  {
    quote:
      "They built me a travel page I actually want to post on. From themes to captions to reels — they turned my travel stories into shareable content.",
    role: "Explorer",
    context: "Travel content page",
    service: "social-media-marketing",
  },
  {
    quote:
      "It's like having an in-house team without the headache. From community building to reels to captions, they've made my coaching brand consistent and magnetic.",
    role: "Business Coach",
    context: "Personal brand",
    service: "personal-branding",
  },
  {
    quote:
      "My LinkedIn was invisible before SmartWebCare. Now I am posting consistently, getting engagement, and clients are reaching out to me. They turned my profile into a lead magnet.",
    role: "Senior Consultant",
    context: "Management consulting",
    service: "linkedin-marketing",
  },
  {
    quote:
      "I know what I want to say but writing is not my strength. Their ghostwriting team captures my voice perfectly. LinkedIn posts, blogs, newsletters… all done for me while I focus on my business.",
    role: "Founder & CEO",
    context: "SaaS startup",
    service: "personal-branding",
  },
  {
    quote:
      "From 200 followers to 15K in 6 months. SmartWebCare built my Instagram presence from scratch with reels, carousels, stories, and a content strategy that actually converts followers into clients.",
    role: "Life Coach",
    context: "Wellness & mindset",
    service: "instagram-marketing",
    outcome: "200 → 15K followers in 6 months",
  },
  {
    quote:
      "Running a D2C brand is tough. SmartWebCare handles all our social media, from strategy to content to ads. Our engagement is up 300% and we are seeing real ROI from Instagram and Facebook.",
    role: "Co-Founder",
    context: "Organic food brand",
    service: "social-media-marketing",
    outcome: "+300% engagement",
  },
  {
    quote:
      "As a CTO, I did not have time to build my LinkedIn presence. SmartWebCare ghostwrites my posts, manages my profile, and positions me as a tech leader. The DMs keep coming.",
    role: "Chief Technology Officer",
    context: "Fintech company",
    service: "linkedin-marketing",
  },
  {
    quote:
      "We needed more than just pretty posts. SmartWebCare gave us a full digital strategy across Instagram, Facebook, and WhatsApp. Sales have doubled and our brand finally feels premium online.",
    role: "Marketing Head",
    context: "Fashion D2C brand",
    service: "whatsapp-marketing",
    outcome: "Sales doubled",
  },
];


/** Line under "What our clients are saying". */
export const TESTIMONIAL_NOTE = "From skincare to coffee, coaches to creators - brands across industries are growing juicy with SmartWebCare.";

/** Generalised from the Discovery → Strategy → Content → Execution steps used across the service pages. */
export const PROCESS = [
  { n: "01", title: "Discovery", body: "Understand your business, goals, and the audience you need to reach." },
  { n: "02", title: "Strategy", body: "Platform-specific strategy and positioning built around those goals." },
  { n: "03", title: "Content", body: "Content calendars, design and production tailored to each channel." },
  { n: "04", title: "Execution & growth", body: "Launch, track performance, and optimise for results — every month." },
] as const;

/** Kept for the About page, which uses the original naming. */
export const WHY_GUAVA = {
  heading: WHY.heading,
  points: WHY.points.map((p) => p.title),
  closer: WHY.closer,
};
