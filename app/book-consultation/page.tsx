import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CalendlyEmbed } from "@/components/contact/calendly-embed";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Book a Free Consultation",
  description: `Book a free 30-minute strategy consultation with SmartWebCare's founders (valued at $${SITE.consultationValue}). Pick a time that suits you.`,
  path: "/book-consultation",
  eyebrow: "Free consultation",
});

const EXPECT = [
  "A look at where your brand is today — and what's holding it back",
  "Which two or three channels will actually move your goals",
  "A clear next step, whether or not we work together",
];

export default function BookConsultation() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Book a consultation", href: "/book-consultation" }]}
        eyebrow={`Free · 30 minutes · valued at $${SITE.consultationValue}`}
        title="Book your free consultation."
        lead="Select a time on the calendar below. Bring the messy ideas — we'll leave you with a clear next step."
      />
      <section className="container-wide mt-16 grid gap-12 md:mt-20 lg:grid-cols-12" aria-label="Schedule">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-5">What to expect</p>
          <ul className="space-y-4">
            {EXPECT.map((e) => (
              <li key={e} className="flex gap-3 leading-relaxed text-ink-soft">
                <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent-text)]" aria-hidden />
                {e}
              </li>
            ))}
          </ul>
          <div className="mt-10 border-t border-[var(--color-border)] pt-8">
            <p className="text-ink-muted">Rather just message?</p>
            <Button href={whatsappHref()} variant="secondary" className="mt-4">
              WhatsApp us instead
            </Button>
          </div>
        </div>
        <div className="lg:col-span-8">
          <CalendlyEmbed />
        </div>
      </section>
      <div className="pb-24 md:pb-32" />
    </>
  );
}
