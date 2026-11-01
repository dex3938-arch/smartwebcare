import { existsSync } from "node:fs";
import { ExploreCarousel } from "@/components/sections/explore-carousel";
import path from "node:path";
import Image from "next/image";
import { Heart, MessageCircle, Rocket, Sparkles, Target, Users, type LucideIcon } from "lucide-react";
import { WaveSeam } from "@/components/sections/wave-seam";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FounderCard } from "@/components/people/founder-card";
import { ScrollStatement } from "@/components/motion/scroll-statement";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { CountUp } from "@/components/motion/count-up";
import { CtaBand } from "@/components/sections/cta-band";
import { NetworkField } from "@/components/art/network-field";
import { SwcMark } from "@/components/brand/logo";
import { ABOUT, PROMISES, STATS, WHY } from "@/lib/home";
import { PEOPLE } from "@/lib/people";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About — The Founders & Philosophy Behind SmartWebCare",
  description:
    "SmartWebCare is a full-service branding & marketing agency founded by Khyati Arora and Kartik Sahni, on a mission to turn ideas into iconic brands.",
  path: "/about",
  eyebrow: "About",
});

const ICONS: Record<string, LucideIcon> = { rocket: Rocket, message: MessageCircle, sparkles: Sparkles, users: Users, heart: Heart, target: Target };
const OFFICE_IMAGE = existsSync(path.join(process.cwd(), "public/brand/office-wall.jpg"));

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 md:pt-36" aria-labelledby="about-title">
        <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
        <div aria-hidden className="aurora absolute inset-0 -z-10" />
        <div className="container-wide">
          <Breadcrumbs items={[{ name: "About", href: "/about" }]} className="fade-up" />
          <div className="mt-12 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow fade-up mb-6">About SmartWebCare</p>
              <h1 id="about-title" className="text-[length:var(--text-h1)] leading-[1]">
                <span className="reveal-line">
                  <span>Strategy with soul.</span>
                </span>
                <span className="reveal-line">
                  <span style={{ ["--i" as string]: 1 }}>
                    Marketing with <em className="text-gradient italic">bite.</em>
                  </span>
                </span>
              </h1>
              <p className="rise mt-8 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-ink-soft" style={{ ["--i" as string]: 1 }}>
                {ABOUT.mission} {ABOUT.pillars.map((p) => p.v).join(" ")}
              </p>
            </div>
            <div className="lg:col-span-6">
              <Tilt max={5} className="rounded-[28px]">
                <div className="shutter relative aspect-[16/11] overflow-hidden rounded-[28px] border border-white shadow-[var(--shadow-lift)]">
                  {OFFICE_IMAGE ? (
                    <Image
                      src="/brand/office-wall.jpg"
                      alt="The SmartWebCare logo mounted on a bright, modern office wall"
                      fill
                      priority
                      sizes="(min-width: 1024px) 46vw, 92vw"
                      quality={75}
                      className="object-cover"
                    />
                  ) : (
                    <NetworkField seed="about-hero" variant="light" density={1.2} />
                  )}
                </div>
                <div className="glass depth-1 absolute -bottom-6 left-6 hidden w-56 rounded-2xl p-4 sm:block">
                  <SwcMark sizes="220px" className="w-full" />
                </div>
              </Tilt>
            </div>
          </div>
          <dl className="mt-16 grid grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="glass flex flex-col rounded-2xl px-4 py-5 sm:px-6">
                <dt className="order-2 mt-2 text-[0.8rem] text-ink-muted sm:text-sm">{s.label}</dt>
                <dd className="order-1 font-serif text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-none text-[var(--color-heading)]">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <WaveSeam from="white" to="tint" className="mt-20 md:mt-28" />
      <section className="tint pb-20 pt-6 md:pb-28 md:pt-10" aria-label="Our philosophy">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3 lg:pt-4">How we think</p>
          <div className="lg:col-span-9">
            <ScrollStatement text={ABOUT.body[1]} className="font-serif text-[length:var(--text-h2)] font-medium leading-[1.1] text-[var(--color-heading)]" />
            <div className="mt-12 grid gap-6 text-[1.05rem] leading-relaxed text-ink-soft md:grid-cols-2">
              <p>{ABOUT.body[0]}</p>
              <p>{ABOUT.body[2]}</p>
            </div>
            <dl className="mt-10 grid gap-3 sm:grid-cols-3">
              {ABOUT.pillars.map((p, i) => (
                <div key={p.k} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
                  <dt className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--color-accent-text)]">
                    0{i + 1} — {p.k}
                  </dt>
                  <dd className="mt-2 font-semibold text-[var(--color-heading)]">{p.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <WaveSeam from="tint" to="white" />

      <section className="container-wide py-20 md:py-28" aria-labelledby="founders-title">
        <p className="eyebrow mb-5">The founders</p>
        <h2 id="founders-title" className="max-w-3xl text-[length:var(--text-h2)]">
          The founders of this <em className="text-gradient italic">juicy</em> mess.
        </h2>
        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-8">
          {PEOPLE.map((p, i) => (
            <FounderCard key={p.name} person={p} id={`about-founder-${i}`} className={i === 1 ? "md:mt-20" : undefined} />
          ))}
        </div>
      </section>

      <section className="container-wide" aria-labelledby="why-title">
        <div className="border-t border-[var(--color-border)] pt-16">
          <p className="eyebrow mb-5">Why go SmartWebCare</p>
          <h2 id="why-title" className="max-w-3xl text-[length:var(--text-h2)]">
            {WHY.heading}
          </h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.points.map((pt, i) => {
              const Icon = ICONS[pt.icon] ?? Sparkles;
              return (
                <Reveal as="li" key={pt.title} delay={(i % 3) * 0.07} className="glass rounded-2xl p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[#22d3ee] text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-sans text-[1.06rem] font-bold leading-snug">{pt.title}</h3>
                </Reveal>
              );
            })}
          </ul>
          <p className="mt-10 font-serif text-[1.6rem] italic leading-snug text-[var(--color-cyan-text)]">{WHY.closer}</p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map((p) => (
            <div key={p.title}>
              <p className="font-semibold text-[var(--color-heading)]">{p.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <ExploreCarousel section="about" title="More about SmartWebCare" />
      <CtaBand />
    </>
  );
}
