"use client";

import { useState } from "react";
import { Calculator, CalendarDays, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChipGroup, CopyButton, TextInput, toolCard } from "./ui";
import toolsData from "@/data/tools-data.json";
import { cn } from "@/lib/utils";

/* ================================================================== ROI calculator */
/* Same maths as the original tool:
   revenue = given revenue, else leads × (conversion% / 100) × average deal size
   profit = revenue − investment;  ROI% = profit / investment × 100;  CPL = investment / leads */

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export function MarketingRoiCalculator() {
  const [v, setV] = useState({ investment: "", revenue: "", leads: "", conversionRate: "", avgDealSize: "" });
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<null | { roi: number; profit: number; cpl: number; revenue: number; derived: boolean }>(null);
  const set = (k: keyof typeof v) => (x: string) => setV((s) => ({ ...s, [k]: x.replace(/[^\d.]/g, "") }));

  function calc(e: React.FormEvent) {
    e.preventDefault();
    const inv = parseFloat(v.investment) || 0;
    const rev = parseFloat(v.revenue) || 0;
    const leads = parseFloat(v.leads) || 0;
    const conv = parseFloat(v.conversionRate) || 0;
    const deal = parseFloat(v.avgDealSize) || 0;
    if (inv <= 0) return setError("Enter your marketing investment to calculate ROI.");
    let revenue = rev;
    const derived = !rev && !!(leads && conv && deal);
    if (derived) revenue = leads * (conv / 100) * deal;
    if (!revenue) return setError("Add revenue generated — or leads, conversion rate and average deal size.");
    setError(undefined);
    const profit = revenue - inv;
    setResult({
      roi: Math.round((profit / inv) * 10000) / 100,
      profit,
      cpl: leads > 0 ? inv / leads : 0,
      revenue,
      derived,
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <form onSubmit={calc} noValidate className={cn(toolCard, "grid gap-5 lg:col-span-5")}>
        <TextInput label="Marketing investment (₹)" required inputMode="decimal" value={v.investment} onChange={set("investment")} placeholder="e.g., 100000" error={error && !v.investment ? "Required" : undefined} />
        <TextInput label="Revenue generated (₹)" inputMode="decimal" value={v.revenue} onChange={set("revenue")} placeholder="e.g., 500000" hint="Leave blank to estimate from leads below." />
        <div className="grid gap-5 sm:grid-cols-3">
          <TextInput label="Leads" inputMode="numeric" value={v.leads} onChange={set("leads")} placeholder="e.g., 100" />
          <TextInput label="Conversion (%)" inputMode="decimal" value={v.conversionRate} onChange={set("conversionRate")} placeholder="e.g., 10" />
          <TextInput label="Avg deal (₹)" inputMode="decimal" value={v.avgDealSize} onChange={set("avgDealSize")} placeholder="e.g., 50000" />
        </div>
        {error && <p className="text-sm text-[var(--color-error)]" role="alert">{error}</p>}
        <Button type="submit" variant="accent">
          <Calculator className="h-4 w-4" aria-hidden /> Calculate ROI
        </Button>
      </form>

      <div className="lg:col-span-7" aria-live="polite">
        {result ? (
          <div className={toolCard}>
            <p className="eyebrow">Return on investment</p>
            <p className={cn("mt-3 font-serif text-[clamp(3.5rem,8vw,6rem)] leading-none", result.roi >= 0 ? "text-ink" : "text-[var(--color-error)]")}>
              {result.roi.toLocaleString("en-IN")}%
            </p>
            <dl className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-3">
              {[
                { k: result.derived ? "Projected revenue" : "Revenue", v: inr(result.revenue) },
                { k: result.profit >= 0 ? "Net profit" : "Net loss", v: inr(Math.abs(result.profit)) },
                { k: "Cost per lead", v: result.cpl ? inr(result.cpl) : "—" },
              ].map((x) => (
                <div key={x.k} className="flex flex-col bg-[var(--color-surface)] p-5">
                  <dt className="order-2 mt-1 text-sm text-ink-muted">{x.k}</dt>
                  <dd className="order-1 font-serif text-[1.8rem] leading-tight text-ink">{x.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-ink-muted">
              {result.roi >= 300
                ? "Strong return — this channel deserves more budget and testing."
                : result.roi >= 100
                  ? "Healthy return. Look for the creatives and audiences driving it, and scale those."
                  : result.roi >= 0
                    ? "Positive but thin. Tighten targeting and conversion before scaling spend."
                    : "Currently losing money. Diagnose the funnel before spending more."}
            </p>
          </div>
        ) : (
          <div className="grid h-full min-h-64 place-items-center rounded-[var(--radius-xl)] border border-dashed border-[var(--color-border-strong)] p-10 text-center text-ink-muted">
            Enter your numbers to see ROI, profit and cost per lead.
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================== Social media audit */

type Answer = "yes" | "partial" | "no";
const AUDIT = toolsData.audit as { id: string; question: string; category: string; weight: number; recommendation: string | null }[];

export function SocialMediaAudit() {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [error, setError] = useState<string>();
  const [score, setScore] = useState<number | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError("Please enter your business name.");
    if (Object.keys(answers).length < AUDIT.length) return setError(`Please answer all ${AUDIT.length} questions (${Object.keys(answers).length} done).`);
    setError(undefined);
    setScore(AUDIT.reduce((s, q) => s + (answers[q.id] === "yes" ? q.weight : answers[q.id] === "partial" ? q.weight * 0.5 : 0), 0));
  }

  const verdict =
    score == null ? null : score >= 80 ? "Excellent" : score >= 50 ? "Good — room for improvement" : "Needs work";
  const recs = AUDIT.filter((q) => answers[q.id] !== "yes" && q.recommendation);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <form onSubmit={submit} noValidate className={cn(toolCard, "lg:col-span-7")}>
        <TextInput label="Business/brand name" required value={name} onChange={setName} placeholder="e.g., My Awesome Business" />
        <ol className="mt-8 space-y-6">
          {AUDIT.map((q, i) => (
            <li key={q.id}>
              <fieldset>
                <legend className="text-[1rem] leading-snug text-ink">
                  <span className="tabular mr-2 text-xs text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  {q.question}
                  <span className="ml-2 text-xs text-ink-muted">· {q.category}</span>
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(["yes", "partial", "no"] as Answer[]).map((a) => (
                    <label
                      key={a}
                      className={cn(
                        "inline-flex min-h-10 cursor-pointer items-center rounded-full border px-4 text-sm capitalize transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--color-focus)]",
                        answers[q.id] === a
                          ? "border-ink bg-ink text-[var(--color-background)]"
                          : "border-[var(--color-border-strong)] text-ink-soft hover:border-ink"
                      )}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={a}
                        checked={answers[q.id] === a}
                        onChange={() => setAnswers((s) => ({ ...s, [q.id]: a }))}
                        className="sr-only"
                      />
                      {a === "partial" ? "Sometimes" : a}
                    </label>
                  ))}
                </div>
              </fieldset>
            </li>
          ))}
        </ol>
        {error && <p className="mt-6 text-sm text-[var(--color-error)]" role="alert">{error}</p>}
        <Button type="submit" variant="accent" className="mt-8">
          <ClipboardCheck className="h-4 w-4" aria-hidden /> Get my score
        </Button>
      </form>

      <div className="lg:col-span-5" aria-live="polite">
        <div className="lg:sticky lg:top-28">
          {score != null ? (
            <div className={toolCard}>
              <p className="eyebrow">{name.trim()} · audit score</p>
              <p className="mt-3 font-serif text-[clamp(4rem,9vw,6.5rem)] leading-none text-ink">
                {score}
                <span className="text-[0.4em] text-ink-muted">/100</span>
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--color-surface-muted)]" aria-hidden>
                <div className="h-full rounded-full bg-[var(--color-accent)]" style={{ width: `${score}%` }} />
              </div>
              <p className="mt-4 font-medium text-ink">{verdict}</p>
              {recs.length > 0 && (
                <>
                  <p className="eyebrow mt-8 mb-3">What to fix first</p>
                  <ol className="space-y-3">
                    {[...recs]
                      .map((q) => ({ q, gain: answers[q.id] === "partial" ? q.weight / 2 : q.weight }))
                      .sort((a, b) => b.gain - a.gain || b.q.weight - a.q.weight)
                      .map(({ q }) => (
                      <li key={q.id} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-soft">
                        <span className="tabular shrink-0 pt-0.5 text-xs text-[var(--color-accent-text)]">+{answers[q.id] === "partial" ? q.weight / 2 : q.weight}</span>
                        {q.recommendation}
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          ) : (
            <div className="grid min-h-64 place-items-center rounded-[var(--radius-xl)] border border-dashed border-[var(--color-border-strong)] p-10 text-center text-ink-muted">
              Answer the {AUDIT.length} questions to get your score and a prioritised fix list.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== Content calendar */

const CAL = toolsData as unknown as {
  frequencies: { id: string; name: string; postsPerWeek: number }[];
  platforms: { id: string; name: string }[];
  bestTimes: Record<string, { day: string; time: string }[]>;
  contentTypes: Record<string, string[]>;
  themes: Record<string, string[]>;
  platformHashtags: Record<string, string[]>;
};
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const PLACEHOLDERS = /\[(your expertise|industry|topic|profession|product\/service|business\/journey|journey)\]/g;

type Post = { platform: string; time: string; type: string; topic: string; hashtags: string[] };

export function ContentCalendarGenerator() {
  const [niche, setNiche] = useState("");
  const [platforms, setPlatforms] = useState<string[]>(["linkedin"]);
  const [freq, setFreq] = useState("3x");
  const [themes, setThemes] = useState<string[]>(["Educational/How-to", "Tips & Tricks"]);
  const [error, setError] = useState<string>();
  const [plan, setPlan] = useState<{ day: string; date: string; posts: Post[] }[] | null>(null);
  const toggle = (list: string[], set: (v: string[]) => void) => (v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  function generate(e: React.FormEvent) {
    e.preventDefault();
    if (!niche.trim()) return setError("Please enter your niche or industry.");
    if (!platforms.length) return setError("Select at least one platform.");
    if (!themes.length) return setError("Select at least one content theme.");
    setError(undefined);
    const per = CAL.frequencies.find((f) => f.id === freq)?.postsPerWeek ?? 3;
    const slots = per === 7 ? [0, 1, 2, 3, 4, 5, 6] : per === 5 ? [0, 1, 2, 3, 4] : per === 3 ? [1, 3, 5] : [2];
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() + ((8 - today.getDay()) % 7 || 7)); // next Monday
    const rnd = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
    setPlan(
      DAYS.map((day, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const posts: Post[] = slots.includes(i)
          ? platforms.map((p) => {
              const theme = rnd(themes);
              const topics = CAL.themes[theme] ?? CAL.themes["Tips & Tricks"];
              return {
                platform: CAL.platforms.find((x) => x.id === p)?.name ?? p,
                time: CAL.bestTimes[p]?.find((t) => t.day === day)?.time ?? "10:00 AM",
                type: rnd(CAL.contentTypes[p] ?? ["Post"]),
                topic: rnd(topics).replace(PLACEHOLDERS, niche.trim()),
                hashtags: (CAL.platformHashtags[p] ?? []).slice(0, 4),
              };
            })
          : [];
        return { day, date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), posts };
      })
    );
  }

  const asText = plan
    ?.filter((d) => d.posts.length)
    .map((d) => `${d.day}, ${d.date}\n${d.posts.map((p) => `• ${p.platform} @ ${p.time} — ${p.type}: ${p.topic} ${p.hashtags.join(" ")}`).join("\n")}`)
    .join("\n\n");

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <form onSubmit={generate} noValidate className={cn(toolCard, "grid gap-6 lg:col-span-5")}>
        <TextInput label="Your niche or industry" required value={niche} onChange={setNiche} placeholder="e.g., Personal Branding, Fitness Coaching, Real Estate" />
        <ChipGroup label="Platforms" options={CAL.platforms.map((p) => ({ value: p.id, label: p.name }))} selected={platforms} onToggle={toggle(platforms, setPlatforms)} />
        <ChipGroup label="Posting frequency" options={CAL.frequencies.map((f) => ({ value: f.id, label: f.name }))} selected={[freq]} onToggle={setFreq} />
        <ChipGroup label="Content themes" options={Object.keys(CAL.themes).map((t) => ({ value: t, label: t }))} selected={themes} onToggle={toggle(themes, setThemes)} />
        {error && <p className="text-sm text-[var(--color-error)]" role="alert">{error}</p>}
        <Button type="submit" variant="accent">
          <CalendarDays className="h-4 w-4" aria-hidden /> {plan ? "Regenerate calendar" : "Generate calendar"}
        </Button>
      </form>

      <div className="lg:col-span-7" aria-live="polite">
        {plan ? (
          <div className={toolCard}>
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow">Next week · {niche.trim()}</p>
              {asText && <CopyButton text={asText} label="Copy plan" />}
            </div>
            <ol className="mt-6 divide-y divide-[var(--color-border)]">
              {plan.map((d) => (
                <li key={d.day} className="grid gap-3 py-4 sm:grid-cols-[7rem_1fr]">
                  <p>
                    <span className="block font-medium text-ink">{d.day}</span>
                    <span className="text-sm text-ink-muted">{d.date}</span>
                  </p>
                  {d.posts.length ? (
                    <ul className="space-y-3">
                      {d.posts.map((p, i) => (
                        <li key={i} className="rounded-[var(--radius-md)] bg-[var(--color-surface-muted)] p-4">
                          <p className="text-xs text-ink-muted">
                            {p.platform} · {p.time} · {p.type}
                          </p>
                          <p className="mt-1.5 leading-snug text-ink">{p.topic}</p>
                          <p className="mt-2 text-xs text-[var(--color-accent-text)]">{p.hashtags.join(" ")}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-ink-muted">Rest day — engage with your community.</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="grid h-full min-h-64 place-items-center rounded-[var(--radius-xl)] border border-dashed border-[var(--color-border-strong)] p-10 text-center text-ink-muted">
            Pick your platforms and themes — get a ready-to-post plan for next week.
          </div>
        )}
      </div>
    </div>
  );
}
