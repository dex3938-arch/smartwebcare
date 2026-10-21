import { ArrowRight, ArrowUpRight, CalendarDays, Check, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WaveSeam } from "@/components/sections/wave-seam";
import { Reveal } from "@/components/motion/reveal";
import type { Service } from "@/lib/content";
import { SITE } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

/*
  Service-page sections: What's Included (+ Perfect For) → How It Works → consultation
  strip, in the SmartWebCare glass/navy language. Server components.
*/

const pad = (n: number) => String(n).padStart(2, "0");

/** What's Included: centred overview, two-column checklist cards, then Perfect For. */
export function IncludedShowcase({ service }: { service: Service }) {
  return (
    <>
      <WaveSeam from="white" to="tint" className="mt-20 md:mt-28" />
      <section id="included" className="tint pb-20 pt-6 md:pb-28 md:pt-10" aria-labelledby="included-title">
        <div className="container-wide">
          {/* centred like the original from tablet up; a long centred paragraph reads badly on phones */}
          <Reveal className="mx-auto max-w-3xl md:text-center">
            <p className="eyebrow mb-4 md:justify-center">The engagement</p>
            <h2 id="included-title" className="text-[length:var(--text-h2)] text-ink">
              What&rsquo;s <em className="text-gradient italic">included</em>.
            </h2>
            <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
              {service.fullDescription}
            </p>
          </Reveal>

          <ul className="mt-14 grid gap-3 md:grid-cols-2 md:gap-4">
            {service.points.map((p, i) => (
              <Reveal
                as="li"
                key={p}
                delay={(i % 2) * 0.06}
                className="group flex items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-surface px-5 py-4 transition-[translate,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-[var(--color-border-strong)] hover:shadow-[0_18px_40px_-24px_rgba(16,22,29,0.45)] md:px-6 md:py-5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-accent)] text-white shadow-[0_8px_18px_-8px_rgba(37,99,235,0.8)] transition-[scale,rotate] duration-500 ease-[var(--ease-out-expo)] group-hover:-rotate-6 group-hover:scale-110">
                  <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                </span>
                <span className="flex-1 text-[1.02rem] font-medium leading-snug text-ink">{p}</span>
                <span aria-hidden className="font-mono text-xs text-ink-muted">
                  {pad(i + 1)}
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-6 md:mt-8">
            <div
              className="navy relative isolate overflow-hidden rounded-[28px] px-7 py-10 md:px-12 md:py-14"
              style={{ background: "linear-gradient(118deg, #1d4ed8 0%, #0d2550 46%, #081b3a 100%)" }}
            >
              <div
                aria-hidden
                className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full opacity-60"
                style={{ background: "radial-gradient(closest-side, rgb(103 232 249 / 0.4), transparent)" }}
              />
              <div className="grid gap-6 md:grid-cols-[13rem_1fr] md:items-start md:gap-12">
                <div className="flex items-center gap-4 md:flex-col md:items-start">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10">
                    <Target className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="eyebrow">Perfect for</h3>
                </div>
                <p className="font-serif text-[clamp(1.5rem,2.6vw,2.3rem)] leading-[1.22] text-white">
                  {service.targetAudience}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <WaveSeam from="tint" to="white" />
    </>
  );
}

/** How It Works: numbered orbs joined by connectors that draw in on scroll. */
export function ProcessFlow({
  steps,
  eyebrow = "The process",
  title,
  lead = "Our proven process ensures quality results, delivered on time.",
  id = "process",
}: {
  steps: { title: string; description: string }[];
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: string;
  id?: string;
}) {
  return (
    <section id={id} className="container-wide mt-20 scroll-mt-24 md:mt-28" aria-labelledby={`${id}-title`}>
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-4 justify-center">{eyebrow}</p>
        <h2 id={`${id}-title`} className="text-[length:var(--text-h2)]">
          {title ?? (
            <>
              How it <em className="text-gradient italic">works</em>.
            </>
          )}
        </h2>
        {lead && <p className="mt-5 text-[length:var(--text-lead)] leading-relaxed text-ink-muted">{lead}</p>}
      </Reveal>

      <ol className="mt-16 grid lg:grid-cols-4 lg:gap-8">
        {steps.map((s, i) => (
          <Reveal
            as="li"
            key={s.title}
            delay={i * 0.1}
            className="group relative grid grid-cols-[4rem_1fr] gap-x-5 pb-12 last:pb-0 lg:block lg:pb-0"
          >
            {i < steps.length - 1 && <span aria-hidden className="step-connector" />}
            <span className="step-orb relative z-[1] grid h-16 w-16 place-items-center rounded-full font-serif text-[1.75rem] leading-none text-white">
              <span className="sr-only">Step </span>
              {i + 1}
            </span>
            <div className="pt-3 lg:mt-8 lg:pt-0">
              <h3 className="font-serif text-[1.5rem] leading-snug lg:text-[1.6rem]">{s.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-muted">{s.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/** Free-consultation strip that closes the process, like the live site's booking block. */
export function ConsultStrip({ title }: { title: string }) {
  return (
    <section className="container-wide mt-20 md:mt-24" aria-labelledby="consult-title">
      <Reveal>
        <div className="relative isolate flex flex-col gap-8 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-surface px-7 py-9 md:flex-row md:items-center md:justify-between md:px-12 md:py-11">
          <div
            aria-hidden
            className="absolute -left-20 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full opacity-70"
            style={{ background: "radial-gradient(closest-side, rgb(59 130 246 / 0.3), transparent)" }}
          />
          <div className="flex items-start gap-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--color-accent)] text-white">
              <CalendarDays className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="eyebrow mb-3">Free &middot; 30 minutes &middot; valued at ${SITE.consultationValue}</p>
              <h2 id="consult-title" className="font-serif text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.08] text-ink">
                Book a free {title} consultation.
              </h2>
              <p className="mt-2 max-w-xl leading-relaxed text-ink-muted">
                A 30-minute strategy call: we look at where you are and map what would move the needle.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href="/book-consultation" variant="accent" size="lg">
              Book a free consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button href={whatsappHref()} variant="secondary" size="lg">
              WhatsApp us <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
