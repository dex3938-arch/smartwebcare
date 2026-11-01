import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { NetworkField } from "@/components/art/network-field";
import { SwcMark } from "@/components/brand/logo";
import { whatsappHref } from "@/lib/whatsapp";
import { SITE, telHref } from "@/lib/site";

/** Site-wide conversion band: Let's Talk (enquiry) + one-touch WhatsApp, on a navy light-field. */
export function CtaBand({
  title = "Let's grow your brand.",
  lead = "Tell us what you're building. We're WhatsApp-first — usually replying within minutes, always within 24 hours.",
  eyebrow = "Start a project",
}: {
  title?: string;
  lead?: string;
  eyebrow?: string;
}) {
  return (
    <section className="container-wide mt-24 pb-24 md:mt-32 md:pb-28" aria-labelledby="cta-title">
      <div className="navy relative isolate overflow-hidden rounded-[32px] px-6 py-14 shadow-[var(--shadow-lift)] sm:px-10 md:px-16 md:py-20" style={{ background: "linear-gradient(135deg,#081b3a 0%,#0d2550 50%,#1d4ed8 130%)" }}>
        <div aria-hidden className="absolute inset-y-0 right-0 -z-10 hidden w-[55%] opacity-80 md:block">
          <NetworkField seed={`cta-${title}`} variant="navy" density={1.1} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b2148] via-[#0b2148]/40 to-transparent" />
        </div>
        <SwcMark light nodes={false} sizes="220px" className="absolute bottom-10 right-10 hidden w-52 opacity-90 lg:block" />
        <Reveal className="relative max-w-2xl">
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h2 id="cta-title" className="text-[length:var(--text-h1)] leading-[1]">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-[length:var(--text-lead)] leading-relaxed text-ink-soft">{lead}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/contact" variant="inverse" size="lg">
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button href={whatsappHref()} variant="secondary" size="lg">
              WhatsApp us <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href={telHref()} variant="secondary" size="lg" aria-label={`Call us on ${SITE.phone}`}>
              <Phone className="h-4 w-4" aria-hidden /> Call us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
