import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarDays,
  Check,
  Clock,
  Flag,
  Heart,
  Lock,
  MessageCircle,
  Phone,
  Rocket,
  Sparkles,
  Star,
  Target,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SwcHero } from "@/components/hero/swc-hero";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { ScrollStatement } from "@/components/motion/scroll-statement";
import { ServiceTabs } from "@/components/sections/service-tabs";
import type { ScrollService } from "@/components/sections/service-scroller";
import { TestimonialMarquee } from "@/components/sections/testimonial-marquee";
import { WaveSeam } from "@/components/sections/wave-seam";
import { NetworkField } from "@/components/art/network-field";
import { FounderCard } from "@/components/people/founder-card";
import { TrackedLink } from "@/components/ui/tracked-link";
import { ABOUT, CONSULT, CONTACT, HERO, SERVICES_INTRO, STATS, TESTIMONIAL_NOTE, TESTIMONIALS, TRUST, WHY } from "@/lib/home";
import { PEOPLE } from "@/lib/people";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  getCountries,
  getIndustries,
  getService,
  getServiceMenu,
  getServicesByCategory,
  type Service,
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { SITE, telHref } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "SmartWebCare - Branding & Marketing Agency",
  absoluteTitle: true,
  description:
    "We're a branding & marketing agency that builds brands from scratch, scales them with strategy, and infuses purpose into every pixel. Personal branding, social media, performance marketing and AI.",
  path: "/",
  eyebrow: "Branding & Marketing Agency",
});

const ICONS: Record<string, LucideIcon> = {
  lock: Lock,
  clock: Clock,
  award: Award,
  star: Star,
  message: MessageCircle,
  flag: Flag,
  rocket: Rocket,
  sparkles: Sparkles,
  users: Users,
  heart: Heart,
  target: Target,
};

/** Icons for the scroll-linked service list (by slug). */
const SERVICE_ICON: Record<string, string> = {
  "ai-agents": "bot",
  "ai-automations": "workflow",
  "ai-receptionist": "phone",
  "personal-branding": "user",
  "instagram-marketing": "camera",
  "linkedin-marketing": "briefcase",
  "whatsapp-marketing": "message",
  "performance-marketing": "trend",
  seo: "search",
  aeo: "message",
  "web-development": "code",
  "ui-ux-design": "pen",
};

const BADGE_EMOJI: Record<string, string> = { "Best Seller": "🏆", New: "✨", Trending: "🔥" };

/** The generated office photograph (with the real logo composited) — optional asset. */
const OFFICE_IMAGE = existsSync(path.join(process.cwd(), "public/brand/office-wall.jpg"));

const toScroll = (s: Service): ScrollService => ({
  slug: s.slug,
  href: `/${s.slug}`,
  title: s.title,
  category: s.badge ? `${BADGE_EMOJI[s.badge] ?? ""} ${s.badge}`.trim() : s.categoryLabel,
  description: s.description,
  points: s.points,
  icon: SERVICE_ICON[s.slug] ?? "search",
});

export default async function HomePage() {
  const countries = getCountries();
  const industries = getIndustries();
  const menu = getServiceMenu();
  const bestSellers = SERVICES_INTRO.bestSellers.map((slug) => getService(slug)).filter((s): s is Service => !!s);
  // "More Services": the live site's tabs. "All" lists the catalogue in its original order.
  const all = menu.map((m) => getService(m.slug)).filter((s): s is Service => !!s && !SERVICES_INTRO.bestSellers.includes(s.slug));
  const tabs = [
    { id: "all", label: "All Services", items: all.slice(0, 10).map(toScroll) },
    ...CATEGORY_ORDER.map((c) => ({
      id: c,
      label: `${CATEGORY_LABELS[c] === "AI & Automation" ? "AI" : CATEGORY_LABELS[c] === "Design & Production" ? "Design" : CATEGORY_LABELS[c]} Services`,
      items: getServicesByCategory(c)
        .filter((s) => s.slug !== "social-media-marketing")
        .map(toScroll),
    })),
  ];
  const [lead, ...rest] = TESTIMONIALS;

  return (
    <>
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section id="home" className="relative isolate overflow-hidden pb-10 pt-28 md:pt-32" aria-labelledby="hero-title">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
        <div aria-hidden className="aurora absolute inset-0 -z-10" />
        <div className="container-wide grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="eyebrow fade-up" style={{ ["--i" as string]: 0 }}>
              {HERO.eyebrow}
            </p>
            <h1 id="hero-title" className="mt-7 text-[clamp(2.5rem,5.4vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.03em]">
              <span className="reveal-line">
                <span style={{ ["--i" as string]: 0 }}>{HERO.headline[0]}</span>
              </span>
              <span className="reveal-line">
                <span style={{ ["--i" as string]: 1 }}>
                  With <span className="text-gradient">SmartWebCare</span>
                </span>
              </span>
            </h1>
            <p className="rise mt-8 max-w-[36rem] text-[length:var(--text-lead)] leading-relaxed text-ink-soft" style={{ ["--i" as string]: 1 }}>
              {HERO.lead}
            </p>
            <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={{ ["--i" as string]: 2 }}>
              <Button href="#contact" variant="accent" size="lg">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button href="#services" variant="secondary" size="lg">
                Our Services
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <SwcHero />
          </div>
        </div>

        {/* Animated metrics */}
        <div className="container-wide mt-8 lg:mt-14">
          <dl className="grid grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className="glass flex flex-col rounded-2xl px-4 py-5 sm:px-7 md:py-6">
                <dt className="order-2 mt-2 text-[0.82rem] font-medium leading-snug text-ink-muted sm:text-sm">{s.label}</dt>
                <dd className="order-1 font-serif text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-none text-[var(--color-heading)]">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ══════════════════════ Trust strip ══════════════════════ */}
      <section aria-label="Why clients trust us" className="container-wide pb-6 pt-4">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {TRUST.map((t, i) => {
            const Icon = ICONS[t.icon] ?? Sparkles;
            return (
              <Reveal as="li" key={t.title} delay={(i % 6) * 0.05} className="glass flex items-start gap-3 rounded-2xl p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[#22d3ee] text-white">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-[0.9rem] font-bold leading-snug text-[var(--color-heading)]">{t.title}</span>
                  <span className="mt-0.5 block text-[0.78rem] leading-snug text-ink-muted">{t.body}</span>
                </span>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* ══════════════════════ Services ══════════════════════ */}
      <section id="services" className="container-wide scroll-mt-24 pb-20 pt-16 md:pb-28 md:pt-24" aria-labelledby="services-title">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5 justify-center">Our Services</p>
          <h2 id="services-title" className="text-[length:var(--text-h2)]">
            Let&rsquo;s <em className="text-gradient italic">Grow</em> Your Brand
          </h2>
          <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-ink-soft">{SERVICES_INTRO.lead}</p>
        </div>

        {/* Best Selling Services */}
        <h3 className="mt-16 text-center font-sans text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[var(--color-accent-text)]">
          Best Selling Services
        </h3>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {bestSellers.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.08}>
              <Tilt max={6} className="h-full rounded-[24px]">
                <Link href={`/${s.slug}`} className="glass group flex h-full flex-col rounded-[24px] p-7 shadow-[var(--shadow-lift)]">
                  <span className="inline-flex self-start rounded-full bg-[var(--color-light-blue)] px-3 py-1 text-[0.75rem] font-bold text-[var(--color-accent-deep)]">
                    {BADGE_EMOJI[s.badge ?? ""] ?? "🏆"} {s.badge ?? "Best Seller"}
                  </span>
                  <h4 className="mt-5 text-[1.75rem] leading-tight transition-colors group-hover:text-[var(--color-accent-deep)]">{s.title}</h4>
                  <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-muted">{s.description}</p>
                  <ul className="mt-5 space-y-2.5">
                    {s.points.slice(0, 3).map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-[0.93rem] leading-snug text-ink-soft">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-accent)] text-white">
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.92rem] font-semibold text-[var(--color-accent-text)]">
                    Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </ul>

        {/* More Services — category tabs + scroll-linked list */}
        <div className="mt-20 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h3 className="text-[length:var(--text-h3)]">More Services</h3>
          <Button href="/services" variant="secondary" className="shrink-0 self-start md:self-auto">
            View All Services
          </Button>
        </div>
        <div className="mt-8">
          <ServiceTabs tabs={tabs} />
        </div>
      </section>

      <WaveSeam from="white" to="tint" />

      {/* ══════════════════════ Why go SmartWebCare + About ══════════════════════ */}
      <section id="about" className="tint relative scroll-mt-24 overflow-hidden pb-20 pt-6 md:pb-28 md:pt-10" aria-labelledby="why-title">
        <div aria-hidden className="pointer-events-none absolute -right-48 top-10 h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.18),transparent)]" />
        <div className="container-wide relative">
          <p className="eyebrow mb-6">{WHY.eyebrow}</p>
          <h2 id="why-title" className="max-w-4xl text-[length:var(--text-h2)]">
            We&rsquo;re not just your agency - we&rsquo;re your brand&rsquo;s favorite <em className="text-gradient italic">co-founder.</em>
          </h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.points.map((pt, i) => {
              const Icon = ICONS[pt.icon] ?? Sparkles;
              return (
                <Reveal as="li" key={pt.title} delay={(i % 3) * 0.07}>
                  <Tilt max={6} className="h-full rounded-2xl">
                    <div className="glass flex h-full items-start gap-4 rounded-2xl p-6">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[#22d3ee] text-white shadow-[0_10px_24px_-10px_rgba(37,99,235,0.9)]">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <p className="pt-1.5 text-[1.02rem] font-semibold leading-snug text-[var(--color-heading)]">{pt.title}</p>
                    </div>
                  </Tilt>
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-10 max-w-3xl font-serif text-[1.6rem] italic leading-snug text-[var(--color-cyan-text)]">{WHY.closer}</p>

          <div className="mt-20 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <p className="eyebrow mb-6">{ABOUT.eyebrow}</p>
              <h3 className="sr-only">{ABOUT.eyebrow}</h3>
              <ScrollStatement text={ABOUT.mission} className="font-serif text-[clamp(1.9rem,3.4vw,3.1rem)] font-medium leading-[1.12] tracking-[-0.015em] text-[var(--color-heading)]" />
              <dl className="mt-8 grid gap-3 sm:grid-cols-3">
                {ABOUT.pillars.map((p, i) => (
                  <Reveal key={p.k} delay={i * 0.08} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
                    <dt className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-text)]">
                      0{i + 1} — {p.k}
                    </dt>
                    <dd className="mt-2.5 text-[0.98rem] font-semibold leading-snug text-[var(--color-heading)]">{p.v}</dd>
                  </Reveal>
                ))}
              </dl>
              <div className="mt-8 space-y-4 text-[1.03rem] leading-relaxed text-ink-soft">
                {ABOUT.body.map((b) => (
                  <p key={b}>{b}</p>
                ))}
              </div>
              <Button href="/about" variant="primary" className="mt-9">
                {ABOUT.cta} <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
            <div className="lg:col-span-6">
              <Tilt max={5} className="rounded-[28px]">
                <div className="shutter relative aspect-[16/11] overflow-hidden rounded-[28px] border border-white shadow-[var(--shadow-lift)]">
                  {OFFICE_IMAGE ? (
                    <Image
                      src="/brand/office-wall.jpg"
                      alt="The SmartWebCare logo mounted on a bright, modern office wall"
                      fill
                      sizes="(min-width: 1024px) 46vw, 92vw"
                      quality={75}
                      className="object-cover"
                    />
                  ) : (
                    <NetworkField seed="about-office" variant="light" density={1.2} />
                  )}
                </div>
              </Tilt>
            </div>
          </div>
        </div>
      </section>

      <WaveSeam from="tint" to="white" />

      {/* ══════════════════════ Founders ══════════════════════ */}
      <section id="founders" className="container-wide pb-20 pt-10 md:pb-28 md:pt-14" aria-labelledby="founders-title">
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow mb-5">The founders</p>
          <h2 id="founders-title" className="text-[length:var(--text-h2)]">
            The Founders of This <em className="text-gradient italic">Juicy</em> Mess
          </h2>
        </div>
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          {PEOPLE.map((p, i) => (
            <FounderCard key={p.name} person={p} id={`founder-${i}`} className={i === 1 ? "md:mt-20" : undefined} />
          ))}
        </div>
      </section>

      <WaveSeam from="white" to="tint" />

      {/* ══════════════════════ Testimonials ══════════════════════ */}
      <section className="tint scroll-mt-24 pb-20 pt-6 md:pb-28 md:pt-10" aria-labelledby="work-title" id="testimonials">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-5">Testimonials</p>
              <h2 id="work-title" className="text-[length:var(--text-h2)]">
                What Our Clients Are Saying <em className="text-gradient italic">(and Sipping On)</em>
              </h2>
              <p className="mt-6 max-w-sm text-[0.98rem] leading-relaxed text-ink-muted">{TESTIMONIAL_NOTE}</p>
              <Button href="/clients" variant="primary" className="mt-8">
                All client stories
              </Button>
            </div>
            <Reveal className="lg:col-span-8">
              <figure className="glass rounded-[28px] p-7 md:p-10">
                <blockquote className="font-serif text-[clamp(1.5rem,2.7vw,2.4rem)] leading-[1.22] text-[var(--color-heading)]">
                  &ldquo;{lead.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 text-sm">
                  <span className="font-semibold text-[var(--color-heading)]">{lead.role}</span>
                  <span className="text-ink-muted"> — {lead.context}</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
        <div className="mt-14">
          <TestimonialMarquee items={rest} />
        </div>
      </section>

      <WaveSeam from="tint" to="navy" />

      {/* ══════════════════════ Free consultation (navy) ══════════════════════ */}
      <section id="consultation" className="navy relative overflow-hidden pb-24 pt-10 md:pb-32 md:pt-14" aria-labelledby="consult-title">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
        <div aria-hidden className="pointer-events-none absolute -left-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.4),transparent)]" />
        <div className="container-wide relative grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#67e8f9]/30 bg-white/5 px-4 py-1.5 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-[#67e8f9]">
              {CONSULT.badge}
            </p>
            <h2 id="consult-title" className="mt-6 text-[length:var(--text-h2)]">
              {CONSULT.title}
            </h2>
            <p className="mt-5 font-serif text-[clamp(1.6rem,2.6vw,2.3rem)] italic">
              <span className="text-gradient">{CONSULT.worth}</span>
            </p>
            <p className="mt-4 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-ink-soft">{CONSULT.lead}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="glass rounded-[28px] p-7 md:p-9">
              <dl className="grid grid-cols-2 gap-4">
                {CONSULT.facts.map((f) => (
                  <div key={f.label} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4">
                    <dt className="order-2 mt-1 text-[0.8rem] text-ink-muted">{f.label}</dt>
                    <dd className="order-1 font-serif text-[1.35rem] leading-tight text-white">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Button href="/book-consultation" variant="inverse" size="lg" className="mt-6 w-full">
                <CalendarDays className="h-4 w-4" aria-hidden /> {CONSULT.cta}
              </Button>
              <p className="mt-4 flex items-center justify-center gap-2 text-center text-[0.85rem] text-ink-muted">
                <Zap className="h-4 w-4 text-[#67e8f9]" aria-hidden /> {CONSULT.note.replace(/^⚡\s*/, "")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveSeam from="navy" to="white" />

      {/* ══════════════════════ Contact — WhatsApp ══════════════════════ */}
      <section id="contact" className="relative isolate scroll-mt-24 overflow-hidden py-16 md:py-24" aria-labelledby="contact-title">
        <div className="container-wide">
          <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#081b3a_0%,#0d2550_45%,#1d4ed8_120%)] p-6 shadow-[var(--shadow-lift)] sm:p-10 lg:p-14">
            <div aria-hidden className="absolute inset-0 opacity-60">
              <NetworkField seed="start-a-project" variant="navy" density={1.1} />
            </div>
            <div className="navy relative grid gap-10 !bg-transparent lg:grid-cols-12 lg:items-center lg:gap-14">
              <div className="lg:col-span-7">
                <p className="eyebrow mb-5">{CONTACT.eyebrow}</p>
                <h2 id="contact-title" className="text-[length:var(--text-h1)] leading-[1]">
                  Let&rsquo;s Chat on <em className="text-gradient italic">WhatsApp!</em>
                </h2>
                <p className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-ink-soft">{CONTACT.lead}</p>
              </div>
              <div className="lg:col-span-5">
                <div className="glass rounded-[24px] p-6 sm:p-8">
                  <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {CONTACT.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[0.92rem] font-semibold text-white">
                        <Check className="h-4 w-4 text-[#67e8f9]" strokeWidth={3} aria-hidden /> {f}
                      </li>
                    ))}
                  </ul>
                  <TrackedLink
                    event="whatsapp_click"
                    location="home_contact"
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-7 text-base font-semibold text-white shadow-[0_14px_36px_-12px_rgba(14,122,108,0.9)] transition-transform hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden /> {CONTACT.cta}
                  </TrackedLink>
                  <TrackedLink
                    event="phone_click"
                    location="home_contact"
                    href={telHref()}
                    className="mt-3 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 text-base font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phone}
                  </TrackedLink>
                  <p className="mt-4 text-center text-[0.88rem] text-ink-muted">{CONTACT.note}</p>
                  <p className="mt-5 border-t border-white/10 pt-5 text-center text-[0.85rem] text-ink-muted">
                    Or email{" "}
                    <TrackedLink event="email_click" location="home_contact" href={`mailto:${SITE.email}`} className="link-underline break-all font-semibold text-white">
                      {SITE.email}
                    </TrackedLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ Explore (internal links) ══════════════════════ */}
      <section className="container-wide pb-10" aria-label="Explore by industry and location">
        <div className="grid gap-14 border-t border-[var(--color-border)] pt-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Industries we know</p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
              {industries.map((ind) => (
                <li key={ind.slug} className="border-b border-[var(--color-border)]">
                  <Link href={`/industries/${ind.slug}`} className="group flex min-h-12 items-center justify-between gap-4 py-3 text-ink-soft transition-colors hover:text-[var(--color-accent-deep)]">
                    {ind.name}
                    <ArrowUpRight aria-hidden className="h-4 w-4 opacity-40 transition-all group-hover:rotate-45 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Where we work</p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
              {countries.map((c) => (
                <li key={c.slug} className="border-b border-[var(--color-border)]">
                  <Link href={`/${c.slug}`} className="group flex min-h-12 items-center justify-between gap-4 py-3 text-ink-soft transition-colors hover:text-[var(--color-accent-deep)]">
                    <span>{c.name}</span>
                    <span className="tabular text-xs text-ink-muted">
                      {c.cityCount} {c.cityCount === 1 ? "city" : "cities"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
