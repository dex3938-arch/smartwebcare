import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  Camera,
  Check,
  Clock,
  Globe,
  Handshake,
  Heart,
  Layers,
  Lock,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/sections/blocks";
import { CtaBand } from "@/components/sections/cta-band";
import { RichText } from "@/components/content/rich-text";
import { FaqList } from "@/components/ui/faq-list";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/motion/carousel";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { StepTimeline } from "@/components/motion/step-timeline";
import { FounderCard } from "@/components/people/founder-card";
import dynamic from "next/dynamic";
import { NetworkField } from "@/components/art/network-field";
import { Scene3D } from "@/components/three/scene-3d";
import { JsonLd } from "@/components/seo/json-ld";
import { SECTION_META, getCompanyPages, type CompanyBlock, type CompanyPage } from "@/lib/company-pages";
import { getServiceMenu } from "@/lib/content";
import { STATS } from "@/lib/home";
import { PEOPLE } from "@/lib/people";
import { faqSchema } from "@/lib/schema";
import { stripMarkup } from "@/lib/markup";
import { cn } from "@/lib/utils";

/* Renders an About / Testimonials / Contact sub-page from lib/company-pages.ts. */

// The form's client code only ships with the page that shows it (the project-brief guide).
const EnquiryForm = dynamic(() => import("@/components/contact/enquiry-form").then((m) => m.EnquiryForm));

const ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles, trending: TrendingUp, heart: Heart, bot: Bot, message: MessageCircle, clock: Clock,
  check: Check, chart: BarChart3, lock: Lock, users: Users, target: Target, handshake: Handshake,
  shield: ShieldCheck, rocket: Rocket, layers: Layers, refresh: RefreshCw, camera: Camera, search: Search,
  globe: Globe, phone: Phone, mail: Mail, calendar: CalendarDays,
};

function Card({ item }: { item: { title: string; body: string; icon: string } }) {
  const Icon = ICONS[item.icon] ?? Sparkles;
  return (
    <div className="glass flex h-full flex-col rounded-[24px] p-6 md:p-7">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[#22d3ee] text-white shadow-[0_10px_24px_-12px_rgba(37,99,235,0.8)]">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="mt-5 font-serif text-[1.4rem] leading-snug">{item.title}</h3>
      <p className="mt-2.5 leading-relaxed text-ink-soft">
        <RichText text={item.body} />
      </p>
    </div>
  );
}

function Block({ block, index }: { block: CompanyBlock; index: number }) {
  const id = `block-${index}`;
  switch (block.type) {
    case "text":
      return (
        <Section id={id} title={block.heading}>
          <Reveal className="max-w-[70ch]">
            {block.paragraphs.map((p, i) => (
              <p key={i} className={cn("text-[1.06rem] leading-[1.8] text-ink-soft", i > 0 && "mt-5")}>
                <RichText text={p} />
              </p>
            ))}
          </Reveal>
        </Section>
      );
    case "cards":
      return (
        <Section id={id} title={block.heading} lead={block.intro}>
          {block.carousel ? (
            <Carousel label={block.heading} slideClassName="basis-[84%] sm:basis-[48%] lg:basis-[32%]">
              {block.items.map((it) => (
                <Card key={it.title} item={it} />
              ))}
            </Carousel>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {block.items.map((it, i) => (
                <Reveal as="li" key={it.title} delay={(i % 3) * 0.06}>
                  <Card item={it} />
                </Reveal>
              ))}
            </ul>
          )}
        </Section>
      );
    case "steps":
      return (
        <Section id={id} title={block.heading} lead={block.intro}>
          <StepTimeline className="max-w-4xl">
            {block.items.map((s, i) => (
              <Reveal as="li" key={s.title} className="relative">
                <span className="step-orb absolute -left-12 top-0 z-[1] grid h-9 w-9 place-items-center rounded-full font-serif text-[1.05rem] leading-none text-white md:-left-20 md:h-14 md:w-14 md:text-[1.5rem]">
                  <span className="sr-only">Step </span>
                  {i + 1}
                </span>
                <div className="glass rounded-[var(--radius-lg)] p-6 md:p-8">
                  <h3 className="font-serif text-[1.5rem] leading-snug md:text-[1.7rem]">{s.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-ink-soft">
                    <RichText text={s.body} />
                  </p>
                  <ul className="mt-5 grid gap-2.5">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-[0.97rem] leading-snug text-ink-soft">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-text)]" strokeWidth={3} aria-hidden />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </StepTimeline>
        </Section>
      );
    case "split":
      return (
        <Section id={id} title={block.heading}>
          <div className="grid gap-5 md:grid-cols-2">
            {[block.left, block.right].map((side, i) => {
              const dark = i === 0;
              return (
                <Reveal key={side.title} delay={i * 0.08} className="overflow-hidden rounded-[26px]">
                  <div
                    className={cn("h-full p-7 md:p-9", dark ? "navy" : "glass rounded-[26px]")}
                    style={dark ? { background: "linear-gradient(140deg,#081b3a,#0d2550 60%,#1d4ed8 150%)" } : undefined}
                  >
                    <h3 className={cn("font-serif text-[1.6rem] leading-snug", dark && "text-white")}>{side.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {side.items.map((it) => (
                        <li key={it} className={cn("flex items-start gap-3 leading-relaxed", dark ? "text-[#dbe7f7]" : "text-ink-soft")}>
                          <Check className={cn("mt-1 h-4 w-4 shrink-0", dark ? "text-[#67e8f9]" : "text-[var(--color-accent-text)]")} strokeWidth={3} aria-hidden />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Section>
      );
    case "checklist":
      return (
        <Section id={id} title={block.heading} lead={block.intro}>
          <ol className="grid gap-4 md:grid-cols-2">
            {block.items.map((it, i) => (
              <Reveal as="li" key={it.title} delay={(i % 2) * 0.06} className="glass flex gap-4 rounded-2xl p-5 md:p-6">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-light-blue)] font-semibold tabular text-[var(--color-accent-deep)]">{i + 1}</span>
                <div>
                  <h3 className="font-sans text-[1.05rem] font-bold text-[var(--color-heading)]">{it.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">
                    <RichText text={it.body} />
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>
      );
    case "stats":
      return (
        <section aria-label="SmartWebCare in numbers" className="container-wide mt-20 md:mt-28">
          <dl className="grid grid-cols-3 gap-3 sm:gap-5">
            {STATS.map((s) => (
              <div key={s.label} className="glass flex flex-col rounded-[24px] p-5 text-center sm:p-8">
                <dt className="order-2 mt-2 text-[0.8rem] text-ink-muted sm:text-sm">{s.label}</dt>
                <dd className="order-1 font-serif text-[clamp(1.8rem,4.6vw,3.4rem)] leading-none text-[var(--color-heading)]">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      );
    case "founders":
      return (
        <section aria-label="Founders" className="container-wide mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-10">
          {PEOPLE.map((p, i) => (
            <FounderCard key={p.name} person={p} headingLevel={2} id={`founder-${i}`} />
          ))}
        </section>
      );
    case "form": {
      const services = getServiceMenu().map((s) => ({ slug: s.slug, title: s.title }));
      return (
        <section id="brief-form" aria-labelledby={`${id}-title`} className="container-wide mt-24 scroll-mt-28 md:mt-32">
          <div className="glass mx-auto max-w-3xl rounded-[28px] p-6 shadow-[var(--shadow-lift)] md:p-10">
            <h2 id={`${id}-title`} className="text-[2rem] leading-tight">
              {block.heading}
            </h2>
            <p className="mb-8 mt-2 text-ink-muted">{block.intro}</p>
            <EnquiryForm services={services} source="project-brief" submitLabel="Send my brief" />
          </div>
        </section>
      );
    }
    case "scene":
      return (
        <section aria-label={block.caption} className="container-wide mt-14 md:mt-20">
          <Scene3D
            variant={block.variant}
            className="navy aspect-[16/10] rounded-[32px] border border-white/10 shadow-[var(--shadow-lift)] sm:aspect-[16/7] [background:radial-gradient(120%_100%_at_50%_30%,#123268_0%,#081b3a_72%)]"
          >
            <NetworkField seed={`scene-${block.variant}`} variant="navy" density={1.3} />
          </Scene3D>
          <p className="mt-4 text-center text-sm font-semibold tracking-wide text-ink-muted">{block.caption}</p>
        </section>
      );
  }
}

/** Sibling pages in the same section, as pill links. */
function SectionNav({ page }: { page: CompanyPage }) {
  const meta = SECTION_META[page.section];
  const siblings = getCompanyPages(page.section);
  return (
    <nav aria-label={`${meta.label} pages`} className="container-wide mt-12 md:mt-16">
      <ul className="glass flex gap-1 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none] sm:inline-flex">
        <li className="shrink-0">
          <Link href={meta.href} className="flex min-h-11 items-center rounded-full px-4 text-[0.92rem] font-semibold text-ink-soft transition-colors hover:bg-white hover:text-[var(--color-heading)] sm:px-5">
            {meta.label}
          </Link>
        </li>
        {siblings.map((s) => {
          const on = s.slug === page.slug;
          return (
            <li key={s.slug} className="shrink-0">
              <Link
                href={`${meta.href}/${s.slug}`}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center rounded-full px-4 text-[0.92rem] font-semibold transition-colors sm:px-5",
                  on ? "bg-[var(--color-navy)] text-white" : "text-ink-soft hover:bg-white hover:text-[var(--color-heading)]"
                )}
              >
                {s.navLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function CompanyPageView({ page }: { page: CompanyPage }) {
  const meta = SECTION_META[page.section];
  const path = `${meta.href}/${page.slug}`;
  const hasForm = page.blocks.some((b) => b.type === "form");
  return (
    <>
      <JsonLd data={faqSchema(page.faqs)} />
      <PageHero
        crumbs={[
          { name: meta.label, href: meta.href },
          { name: page.navLabel, href: path },
        ]}
        eyebrow={page.eyebrow}
        title={page.title}
        lead={stripMarkup(page.lead)}
        artSeed={path}
        artVariant={page.section === "contact" ? "tint" : "light"}
        chips={[page.navLabel, meta.label]}
        actions={
          hasForm ? (
            <Button href="#brief-form" variant="accent" size="lg">
              Jump to the form <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          ) : (
            <Button href="/book-consultation" variant="accent" size="lg">
              Book a free consultation <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          )
        }
      />
      <SectionNav page={page} />
      {page.blocks.map((b, i) => (
        <Block key={i} block={b} index={i} />
      ))}
      <Section id="faq" eyebrow="Questions" title="Frequently asked">
        <FaqList faqs={page.faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      </Section>
      <CtaBand />
    </>
  );
}
