"use client";

import { useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResultList, SelectInput, TextInput, toolCard, CopyButton } from "./ui";

/* ------------------------------------------------------------------ helpers */

const clean = (s: string) => s.trim().replace(/\s+/g, " ");
const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const lower = (s: string) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);
/** Rotate + de-duplicate so "Generate again" gives a fresh order without randomness bugs. */
function pick<T>(items: T[], seed: number, n: number) {
  const out: T[] = [];
  for (let i = 0; i < items.length && out.length < n; i++) {
    const v = items[(i * 7 + seed * 3) % items.length];
    if (!out.includes(v)) out.push(v);
  }
  return out;
}

function useGenerator<T extends Record<string, string>>(initial: T, required: (keyof T)[]) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [seed, setSeed] = useState(0);
  const [ran, setRan] = useState(false);
  const set = (k: keyof T) => (v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const run = (again = false) => {
    const e: Partial<Record<keyof T, string>> = {};
    for (const k of required) if (!clean(values[k] ?? "")) e[k] = "Required";
    setErrors(e);
    if (Object.keys(e).length) return false;
    setSeed((s) => (again ? s + 1 : s));
    setRan(true);
    return true;
  };
  return { values, errors, set, run, seed, ran };
}

function Actions({ ran, onRun, label }: { ran: boolean; onRun: (again: boolean) => void; label: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button type="submit" variant="accent">
        <Sparkles className="h-4 w-4" aria-hidden /> {label}
      </Button>
      {ran && (
        <Button type="button" variant="secondary" onClick={() => onRun(true)}>
          <RefreshCw className="h-4 w-4" aria-hidden /> Generate again
        </Button>
      )}
    </div>
  );
}

function Shell({
  form,
  results,
  ran,
  empty = "Fill in the details and hit generate — your options appear here.",
}: {
  form: React.ReactNode;
  results: React.ReactNode;
  ran: boolean;
  empty?: string;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className={`${toolCard} lg:col-span-5`}>{form}</div>
      <div className="lg:col-span-7" aria-live="polite">
        {ran ? (
          results
        ) : (
          <div className="grid h-full min-h-64 place-items-center rounded-[var(--radius-xl)] border border-dashed border-[var(--color-border-strong)] p-10 text-center text-ink-muted">
            {empty}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ LinkedIn headline */

export function LinkedInHeadlineGenerator() {
  const g = useGenerator({ role: "", specialty: "", target: "", outcome: "" }, ["role", "target", "outcome"]);
  const { role, specialty, target, outcome } = Object.fromEntries(
    Object.entries(g.values).map(([k, v]) => [k, clean(v)])
  ) as typeof g.values;
  const spec = specialty || "strategy";
  const templates = [
    `${role} | Helping ${target} ${lower(outcome)}`,
    `I help ${target} ${lower(outcome)} | ${role}${specialty ? ` · ${specialty}` : ""}`,
    `${role} specialising in ${spec} — helping ${target} ${lower(outcome)}`,
    `${cap(spec)} for ${target} → ${cap(outcome)} | ${role}`,
    `Helping ${target} ${lower(outcome)} through ${spec} | ${role}`,
    `${role} · ${cap(spec)} · On a mission to help ${target} ${lower(outcome)}`,
    `${cap(outcome)} for ${target} | ${role} | ${cap(spec)}`,
    `${role} who helps ${target} ${lower(outcome)} — without the guesswork`,
  ];
  return (
    <Shell
      ran={g.ran}
      form={
        <form onSubmit={(e) => (e.preventDefault(), g.run())} className="grid gap-5" noValidate>
          <TextInput label="Your role/title" required value={g.values.role} onChange={g.set("role")} error={g.errors.role} placeholder="e.g., Marketing Consultant, Business Coach" />
          <TextInput label="Your specialty" value={g.values.specialty} onChange={g.set("specialty")} placeholder="e.g., B2B Marketing, Leadership" />
          <TextInput label="Target audience" required value={g.values.target} onChange={g.set("target")} error={g.errors.target} placeholder="e.g., SaaS founders, small business owners" />
          <TextInput label="Outcome you deliver" required value={g.values.outcome} onChange={g.set("outcome")} error={g.errors.outcome} placeholder="e.g., 10x their revenue, build personal brands" />
          <Actions ran={g.ran} onRun={g.run} label="Generate headlines" />
        </form>
      }
      results={<ResultList items={pick(templates, g.seed, 6)} limit={220} />}
    />
  );
}

/* ------------------------------------------------------------------ Instagram bio */

export function InstagramBioGenerator() {
  const g = useGenerator({ role: "", what: "", target: "", location: "", cta: "" }, ["role", "what"]);
  const v = Object.fromEntries(Object.entries(g.values).map(([k, x]) => [k, clean(x)])) as typeof g.values;
  const forWho = v.target ? ` for ${v.target}` : "";
  const loc = v.location ? `📍 ${v.location}` : "";
  const cta = v.cta || "DM me to start";
  const lines = (...l: string[]) => l.filter(Boolean).join("\n");
  const templates = [
    lines(`${v.role} ✨`, `${cap(v.what)}${forWho}`, loc, `👇 ${cta}`),
    lines(`🌸 ${v.role}`, `Helping${v.target ? ` ${v.target}` : " you"} with ${lower(v.what)}`, loc, `⤵️ ${cta}`),
    lines(`${cap(v.what)} 🎯`, `${v.role}${forWho}`, loc, `💌 ${cta}`),
    lines(`${v.role} | ${cap(v.what)}`, v.target ? `For ${v.target} 💫` : "", loc, `🔗 ${cta}`),
    lines(`✦ ${v.role}`, `✦ ${cap(v.what)}`, v.target ? `✦ Made for ${v.target}` : "", `↓ ${cta}`),
    lines(`Your go-to ${lower(v.role)} ☕️`, `${cap(v.what)}${forWho}`, loc, `👉 ${cta}`),
  ];
  return (
    <Shell
      ran={g.ran}
      form={
        <form onSubmit={(e) => (e.preventDefault(), g.run())} className="grid gap-5" noValidate>
          <TextInput label="Your role/title" required value={g.values.role} onChange={g.set("role")} error={g.errors.role} placeholder="e.g., Content Creator, Coach" />
          <TextInput label="What you do" required value={g.values.what} onChange={g.set("what")} error={g.errors.what} placeholder="e.g., Teaching photography, Fitness tips" />
          <TextInput label="Target audience" value={g.values.target} onChange={g.set("target")} placeholder="e.g., busy entrepreneurs, new moms" />
          <TextInput label="Location" value={g.values.location} onChange={g.set("location")} placeholder="e.g., Mumbai, India" />
          <TextInput label="Call-to-action" value={g.values.cta} onChange={g.set("cta")} placeholder="e.g., Free guide below, Book a call" />
          <Actions ran={g.ran} onRun={g.run} label="Generate bios" />
        </form>
      }
      results={<ResultList items={pick(templates, g.seed, 5)} limit={150} multiline />}
    />
  );
}

/* ------------------------------------------------------------------ Hashtags */

const PLATFORMS = [
  { value: "instagram", label: "Instagram (up to 30)", max: 30 },
  { value: "linkedin", label: "LinkedIn (up to 15)", max: 15 },
  { value: "twitter", label: "Twitter/X (up to 10)", max: 10 },
  { value: "tiktok", label: "TikTok (up to 15)", max: 15 },
];
const NICHES: Record<string, { label: string; tags: string[] }> = {
  business: { label: "Business & Entrepreneurship", tags: ["entrepreneur", "smallbusiness", "startup", "businessowner", "entrepreneurship", "founder", "businesstips", "growthmindset", "hustle", "success", "leadership", "businessgrowth", "startuplife", "sidehustle", "womeninbusiness"] },
  marketing: { label: "Marketing & Branding", tags: ["marketing", "digitalmarketing", "branding", "personalbranding", "socialmediamarketing", "contentmarketing", "brandstrategy", "marketingtips", "contentcreator", "brandidentity", "growthmarketing", "marketingstrategy", "socialmediatips", "instagrammarketing", "linkedinmarketing"] },
  tech: { label: "Technology & SaaS", tags: ["tech", "saas", "startup", "ai", "artificialintelligence", "productivity", "software", "innovation", "automation", "techstartup", "buildinpublic", "nocode", "futureofwork", "productmanagement", "devlife"] },
  coaching: { label: "Coaching & Consulting", tags: ["coach", "businesscoach", "lifecoach", "coaching", "consultant", "mindset", "personaldevelopment", "selfimprovement", "motivation", "careercoach", "leadershipcoach", "growth", "success", "mentorship", "goals"] },
  fitness: { label: "Fitness & Health", tags: ["fitness", "health", "workout", "fitnessmotivation", "gym", "healthylifestyle", "wellness", "nutrition", "training", "fitfam", "personaltrainer", "homeworkout", "strength", "mindbody", "selfcare"] },
  food: { label: "Food & Recipes", tags: ["food", "foodie", "recipes", "homecooking", "foodphotography", "instafood", "healthyfood", "foodblogger", "easyrecipes", "delicious", "foodstagram", "cooking", "vegetarian", "streetfood", "dessert"] },
  travel: { label: "Travel & Adventure", tags: ["travel", "wanderlust", "travelgram", "adventure", "explore", "travelphotography", "traveltips", "instatravel", "travelblogger", "roadtrip", "backpacking", "solotravel", "naturelovers", "beautifuldestinations", "weekendgetaway"] },
  fashion: { label: "Fashion & Style", tags: ["fashion", "style", "ootd", "fashionblogger", "streetstyle", "outfitinspo", "fashionista", "styleinspo", "sustainablefashion", "lookbook", "fashionstyle", "whatiwore", "accessories", "fashiontrends", "minimalstyle"] },
};

function topicTags(topic: string) {
  const words = topic.toLowerCase().replace(/[^a-z0-9\s,]/g, "").split(/[\s,]+/).filter((w) => w.length > 2);
  const phrases = topic.toLowerCase().split(",").map((p) => p.replace(/[^a-z0-9]/g, "")).filter((p) => p.length > 3);
  const out = new Set<string>([...phrases, ...words]);
  for (const w of words.slice(0, 4)) {
    out.add(`${w}tips`);
    out.add(`${w}strategy`);
  }
  return [...out];
}

export function HashtagGenerator() {
  const [platform, setPlatform] = useState("instagram");
  const [niche, setNiche] = useState("marketing");
  const [topic, setTopic] = useState("");
  const [seed, setSeed] = useState(0);
  const [ran, setRan] = useState(false);
  const max = PLATFORMS.find((p) => p.value === platform)!.max;
  const base = pick(NICHES[niche].tags, seed, NICHES[niche].tags.length);
  const tags = [...new Set([...topicTags(topic), ...base])].slice(0, max).map((t) => `#${t}`);
  const text = tags.join(" ");

  return (
    <Shell
      ran={ran}
      form={
        <form onSubmit={(e) => (e.preventDefault(), setRan(true))} className="grid gap-5" noValidate>
          <SelectInput label="Platform" value={platform} onChange={setPlatform} options={PLATFORMS} />
          <SelectInput
            label="Your niche"
            value={niche}
            onChange={setNiche}
            options={Object.entries(NICHES).map(([value, n]) => ({ value, label: n.label }))}
          />
          <TextInput label="Topic or keywords" value={topic} onChange={setTopic} placeholder="e.g., personal branding tips, startup marketing" hint="Optional — adds hashtags specific to your post." />
          <Actions ran={ran} onRun={(again) => (again ? setSeed((s) => s + 1) : setRan(true))} label="Generate hashtags" />
        </form>
      }
      results={
        <div className={toolCard}>
          <div className="flex items-start justify-between gap-4">
            <p className="eyebrow">
              {tags.length} hashtags · {PLATFORMS.find((p) => p.value === platform)!.label}
            </p>
            <CopyButton text={text} label="Copy all" />
          </div>
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map((t) => (
              <li key={t} className="rounded-full border border-[var(--color-border-strong)] px-3 py-1.5 text-sm text-ink-soft">
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-ink-muted">
            Tip: mix broad tags with specific ones, and rotate sets between posts rather than reusing the same block every time.
          </p>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ Brand names */

const SUFFIXES = ["ly", "ify", "hub", "lab", "co", "nest", "forge", "wave", "bloom", "loop", "works", "studio", "base", "kind", "verse", "craft"];
const PREFIXES = ["Go", "Get", "Try", "Hey", "My", "The", "Bright", "True", "Neo", "Pure"];

export function BrandNameGenerator() {
  const g = useGenerator({ keywords: "", industry: "" }, ["keywords"]);
  const words = clean(g.values.keywords)
    .split(",")
    .map((w) => w.trim().toLowerCase().replace(/[^a-z]/g, ""))
    .filter(Boolean);
  const names = new Set<string>();
  words.forEach((w, i) => {
    const root = w.length > 6 ? w.slice(0, 6).replace(/[aeiou]$/, "") : w;
    names.add(cap(root) + SUFFIXES[(i + g.seed) % SUFFIXES.length]);
    names.add(PREFIXES[(i * 3 + g.seed) % PREFIXES.length] + cap(w));
    names.add(cap(w) + cap(SUFFIXES[(i * 5 + g.seed + 3) % SUFFIXES.length]));
    const other = words[(i + 1) % words.length];
    if (other && other !== w) names.add(cap(w.slice(0, Math.ceil(w.length / 2))) + other.slice(Math.floor(other.length / 2)));
  });
  if (g.values.industry && words[0]) names.add(`${cap(words[0])} ${cap(clean(g.values.industry))} Co.`);
  return (
    <Shell
      ran={g.ran}
      form={
        <form onSubmit={(e) => (e.preventDefault(), g.run())} className="grid gap-5" noValidate>
          <TextInput label="Keywords (comma-separated)" required value={g.values.keywords} onChange={g.set("keywords")} error={g.errors.keywords} placeholder="e.g., tech, growth, digital, creative" />
          <TextInput label="Industry" value={g.values.industry} onChange={g.set("industry")} placeholder="e.g., Marketing, Technology, Fashion" hint="Optional" />
          <Actions ran={g.ran} onRun={g.run} label="Generate names" />
        </form>
      }
      results={
        <div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[...names].slice(0, 12).map((n) => (
              <li key={n} className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <span className="font-serif text-[1.5rem] leading-none text-ink">{n}</span>
                <CopyButton text={n} />
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-ink-muted">
            Check domain availability and trademarks before you commit to a name.
          </p>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ Email subject lines */

const EMAIL_TYPES = [
  { value: "promotional", label: "Promotional/Sales" },
  { value: "newsletter", label: "Newsletter" },
  { value: "welcome", label: "Welcome Email" },
  { value: "followup", label: "Follow-up" },
  { value: "coldoutreach", label: "Cold Outreach" },
];
const TONES = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual & Friendly" },
  { value: "urgent", label: "Urgent & Time-Sensitive" },
  { value: "curious", label: "Curiosity-Driven" },
];
const SUBJECTS: Record<string, Record<string, ((t: string) => string)[]>> = {
  promotional: {
    professional: [(t) => `Introducing ${t}`, (t) => `${cap(t)}: built for teams like yours`, (t) => `An exclusive offer on ${t}`],
    casual: [(t) => `You're going to love ${t} 😍`, (t) => `Psst… ${t} is here`, (t) => `Treat yourself: ${t}`],
    urgent: [(t) => `Last chance: ${t} ends tonight`, (t) => `48 hours left on ${t}`, (t) => `Final call — ${t}`],
    curious: [(t) => `The ${t} secret nobody talks about`, (t) => `What if ${t} could do this?`, (t) => `We weren't going to share this ${t} news…`],
  },
  newsletter: {
    professional: [(t) => `This month: ${t}`, (t) => `${cap(t)} — what changed and why it matters`, (t) => `Your ${t} briefing`],
    casual: [(t) => `Grab a coffee — ${t} edition ☕️`, (t) => `The good stuff on ${t}`, (t) => `${cap(t)}, but make it simple`],
    urgent: [(t) => `Don't miss this week's ${t} update`, (t) => `${cap(t)}: read before Friday`, (t) => `Important ${t} changes inside`],
    curious: [(t) => `The ${t} trend everyone's missing`, (t) => `3 things we learned about ${t}`, (t) => `Is ${t} overrated? We dug in`],
  },
  welcome: {
    professional: [(t) => `Welcome — here's how to get started with ${t}`, (t) => `You're in. Your ${t} essentials`, (t) => `Welcome aboard: ${t} in 5 minutes`],
    casual: [(t) => `Hey, welcome! 👋 Let's talk ${t}`, (t) => `So glad you're here (${t} inside)`, (t) => `Welcome to the ${t} crew`],
    urgent: [(t) => `Start here: your ${t} welcome gift expires soon`, (t) => `Activate your ${t} perks today`, (t) => `Your first ${t} step — do it now`],
    curious: [(t) => `The one ${t} tip we give every new member`, (t) => `Before you dive into ${t}…`, (t) => `You've unlocked something (${t})`],
  },
  followup: {
    professional: [(t) => `Following up on ${t}`, (t) => `Next steps for ${t}`, (t) => `Quick recap: ${t}`],
    casual: [(t) => `Circling back on ${t} 🙂`, (t) => `Did you get a chance to look at ${t}?`, (t) => `Still thinking about ${t}?`],
    urgent: [(t) => `Time-sensitive: ${t}`, (t) => `Closing the loop on ${t} today`, (t) => `Can we lock in ${t} this week?`],
    curious: [(t) => `One more idea about ${t}`, (t) => `I forgot to mention this about ${t}`, (t) => `A different angle on ${t}`],
  },
  coldoutreach: {
    professional: [(t) => `Idea for your ${t}`, (t) => `Quick question about ${t}`, (t) => `${cap(t)} — worth a 15-minute chat?`],
    casual: [(t) => `Loved what you're doing — ${t} idea`, (t) => `Hey! Thought of you re: ${t}`, (t) => `A small ${t} win for you`],
    urgent: [(t) => `Before your next launch: ${t}`, (t) => `${cap(t)} — this quarter?`, (t) => `Quick fix for ${t} (this week)`],
    curious: [(t) => `Noticed something about your ${t}`, (t) => `Is ${t} on your radar?`, (t) => `The ${t} gap your competitors haven't spotted`],
  },
};

export function EmailSubjectGenerator() {
  const g = useGenerator({ topic: "", type: "promotional", tone: "professional" }, ["topic"]);
  const t = clean(g.values.topic);
  const pool = [
    ...SUBJECTS[g.values.type][g.values.tone],
    ...Object.values(SUBJECTS[g.values.type]).flat(),
  ].map((f) => f(t));
  return (
    <Shell
      ran={g.ran}
      form={
        <form onSubmit={(e) => (e.preventDefault(), g.run())} className="grid gap-5" noValidate>
          <TextInput label="Email topic or product/service" required value={g.values.topic} onChange={g.set("topic")} error={g.errors.topic} placeholder="e.g., Black Friday sale, new product launch" />
          <SelectInput label="Email type" value={g.values.type} onChange={g.set("type")} options={EMAIL_TYPES} />
          <SelectInput label="Tone" value={g.values.tone} onChange={g.set("tone")} options={TONES} />
          <Actions ran={g.ran} onRun={g.run} label="Generate subject lines" />
        </form>
      }
      results={
        <div>
          <ResultList items={[...new Set(pick(pool, g.seed, 8))]} limit={60} />
          <p className="mt-4 text-sm text-ink-muted">Subject lines around 30–50 characters tend to display in full on mobile.</p>
        </div>
      }
    />
  );
}

/* ------------------------------------------------------------------ Meta descriptions */

const PAGE_TYPES = [
  { value: "homepage", label: "Homepage" },
  { value: "service", label: "Service Page" },
  { value: "product", label: "Product Page" },
  { value: "blog", label: "Blog/Article" },
  { value: "landing", label: "Landing Page" },
];
const METAS: Record<string, ((title: string, kw: string) => string)[]> = {
  homepage: [
    (t, k) => `${t}: ${cap(k)} that helps you grow. Explore our services, see real results, and get in touch to start today.`,
    (t, k) => `Looking for ${k}? ${t} brings strategy, creativity and measurable results together. Discover how we can help.`,
    (t, k) => `${t} — trusted ${k} for ambitious brands. Learn what we do, how we work, and book a free consultation.`,
  ],
  service: [
    (t, k) => `Expert ${k} from ${t}. Strategy, execution and reporting in one place — see what's included and get a free quote.`,
    (t, k) => `${t}: ${k} built around your goals. Clear process, transparent pricing, real results. Book your consultation.`,
    (t, k) => `Need ${k}? ${t} plans, delivers and optimises it for you. Explore the service and start this week.`,
  ],
  product: [
    (t, k) => `Shop ${t} — the ${k} designed to make life easier. Features, specs and reviews. Fast delivery, easy returns.`,
    (t, k) => `${t}: premium ${k} at a fair price. Compare options, read the details and order online today.`,
    (t, k) => `Discover ${t}, our best-loved ${k}. See what's inside, who it's for, and why customers keep coming back.`,
  ],
  blog: [
    (t, k) => `${t}. A practical guide to ${k} — what works, what doesn't, and the steps to apply it today.`,
    (t, k) => `Everything you need to know about ${k}: ${lower(t)}. Examples, tips and mistakes to avoid.`,
    (t, k) => `${t} — our take on ${k}, with clear takeaways you can use this week. Read the full article.`,
  ],
  landing: [
    (t, k) => `${t}. Get started with ${k} in minutes — no fluff, just results. Claim your free consultation now.`,
    (t, k) => `${cap(k)} made simple: ${lower(t)}. See how it works and sign up today — limited spots available.`,
    (t, k) => `${t} — the fastest way to ${k}. Join today and see the difference in your first month.`,
  ],
};

export function MetaDescriptionGenerator() {
  const g = useGenerator({ title: "", keyword: "", type: "service" }, ["title", "keyword"]);
  const title = clean(g.values.title);
  const kw = clean(g.values.keyword).toLowerCase();
  const items = pick(METAS[g.values.type], g.seed, 3).map((f) => f(title, kw));
  return (
    <Shell
      ran={g.ran}
      form={
        <form onSubmit={(e) => (e.preventDefault(), g.run())} className="grid gap-5" noValidate>
          <TextInput label="Page title" required value={g.values.title} onChange={g.set("title")} error={g.errors.title} placeholder="e.g., Best Digital Marketing Agency in New York" />
          <TextInput label="Primary keyword" required value={g.values.keyword} onChange={g.set("keyword")} error={g.errors.keyword} placeholder="e.g., digital marketing agency" />
          <SelectInput label="Page type" value={g.values.type} onChange={g.set("type")} options={PAGE_TYPES} />
          <Actions ran={g.ran} onRun={g.run} label="Generate descriptions" />
        </form>
      }
      results={
        <div className="space-y-6">
          <ResultList items={items} limit={160} />
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="eyebrow mb-3">Search preview</p>
            <p className="text-xs text-ink-muted">yourwebsite.com</p>
            <p className="mt-1 text-[1.15rem] text-[#8ab4f8]">{title.length > 60 ? `${title.slice(0, 57)}…` : title}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{items[0].length > 160 ? `${items[0].slice(0, 157)}…` : items[0]}</p>
          </div>
        </div>
      }
    />
  );
}
