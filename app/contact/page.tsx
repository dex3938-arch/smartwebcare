import Image from "next/image";
import { ExploreCarousel } from "@/components/sections/explore-carousel";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/content";
import { SITE, telHref } from "@/lib/site";
import { TrackedLink } from "@/components/ui/tracked-link";
import { PEOPLE } from "@/lib/people";
import { buildMetadata } from "@/lib/metadata";
import { PROMISES } from "@/lib/home";
import { WHATSAPP_DISPLAY, whatsappHref } from "@/lib/whatsapp";

export const metadata = buildMetadata({
  title: "Start a Project — Contact SmartWebCare",
  description:
    "Tell SmartWebCare about your brand. Quick enquiry, one-touch WhatsApp, or a free 30-minute consultation with the founders.",
  path: "/contact",
  eyebrow: "Start a project",
});

export default function ContactPage() {
  const services = getServices().map((s) => ({ slug: s.slug, title: s.title }));
  return (
    <>
    <section className="relative isolate overflow-hidden pb-24 pt-28 md:pb-32 md:pt-36" aria-labelledby="contact-title">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div aria-hidden className="aurora absolute inset-0 -z-10" />
      <div className="container-wide">
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} className="fade-up" />
      <div className="mt-12 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow fade-up mb-6">Start a project</p>
          <h1 id="contact-title" className="text-[length:var(--text-h1)] leading-[1]">
            <span className="reveal-line">
              <span>
                Let&rsquo;s <em className="text-gradient italic">grow</em>
              </span>
            </span>
            <span className="reveal-line">
              <span style={{ ["--i" as string]: 1 }}>your brand.</span>
            </span>
          </h1>
          <p className="rise mt-7 max-w-md text-[length:var(--text-lead)] leading-relaxed text-ink-soft" style={{ ["--i" as string]: 1 }}>
            Three ways in — pick whichever is fastest for you. You&rsquo;ll be talking to the founders.
          </p>

          <div className="fade-up mt-10 flex items-center gap-4" style={{ ["--i" as string]: 2 }}>
            <div className="flex -space-x-3">
              {PEOPLE.map((p) =>
                p.photo ? (
                  <Image
                    key={p.name}
                    src={p.photo}
                    alt=""
                    width={56}
                    height={56}
                    sizes="56px"
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-[var(--shadow-soft)]"
                    style={{ objectPosition: p.focal }}
                  />
                ) : null
              )}
            </div>
            <p className="text-sm leading-snug text-ink-muted">
              Khyati Arora &amp; Kartik Sahni
              <br />
              Co-founders
            </p>
          </div>

          <ul className="mt-12 space-y-3">
            <li>
              <TrackedLink
                event="whatsapp_click"
                location="contact"
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex items-center justify-between gap-4 rounded-2xl p-5 transition-colors hover:border-[var(--color-accent)]"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-whatsapp)] text-white">
                    <MessageCircle className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-[var(--color-heading)]">WhatsApp us</span>
                    <span className="block text-sm text-ink-muted">Fastest — usually replies within minutes</span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-ink-muted transition-transform group-hover:rotate-45" aria-hidden />
              </TrackedLink>
            </li>
            <li>
              <Link
                href="/book-consultation"
                className="glass group flex items-center justify-between gap-4 rounded-2xl p-5 transition-colors hover:border-[var(--color-accent)]"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-light-blue)] text-[var(--color-accent-deep)]">
                    <CalendarDays className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-[var(--color-heading)]">Book a free consultation</span>
                    <span className="block text-sm text-ink-muted">30 minutes with the founders</span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-ink-muted transition-transform group-hover:rotate-45" aria-hidden />
              </Link>
            </li>
            <li className="grid gap-3 sm:grid-cols-2">
              <TrackedLink event="phone_click" location="contact" href={telHref()} className="glass flex items-center gap-3 rounded-2xl p-4 text-[0.95rem] font-semibold text-[var(--color-heading)] hover:border-[var(--color-accent)]">
                <Phone className="h-4 w-4 text-[var(--color-accent-text)]" aria-hidden /> {SITE.phone}
              </TrackedLink>
              <TrackedLink event="email_click" location="contact" href={`mailto:${SITE.email}`} className="glass flex items-center gap-3 rounded-2xl p-4 text-[0.95rem] font-semibold text-[var(--color-heading)] hover:border-[var(--color-accent)]">
                <Mail className="h-4 w-4 shrink-0 text-[var(--color-accent-text)]" aria-hidden /> <span className="truncate">{SITE.email}</span>
              </TrackedLink>
            </li>
          </ul>

          <div className="mt-8">
            <h2 className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-ink-muted">Contact information</h2>
            <ul className="mt-4 grid gap-3 text-[0.95rem]">
              <li className="flex gap-3">
                <span className="sr-only">Phone: </span>
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-text)]" aria-hidden />
                <span><a href={telHref()} className="link-underline font-medium text-[var(--color-heading)]">{SITE.phone}</a></span>
              </li>
              <li className="flex gap-3">
                <span className="sr-only">WhatsApp: </span>
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-text)]" aria-hidden />
                <span><a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="link-underline font-medium text-[var(--color-heading)]">{WHATSAPP_DISPLAY || "Chat on WhatsApp"}</a></span>
              </li>
              <li className="flex gap-3">
                <span className="sr-only">Email: </span>
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-text)]" aria-hidden />
                <span className="min-w-0 break-all"><a href={`mailto:${SITE.email}`} className="link-underline font-medium text-[var(--color-heading)]">{SITE.email}</a></span>
              </li>
              <li className="flex gap-3">
                <span className="sr-only">Location: </span>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-text)]" aria-hidden />
                <span className="text-ink-soft">{SITE.address || `${SITE.city}, ${SITE.country}`}</span>
              </li>
              {SITE.hours && (
                <li className="flex gap-3">
                  <span className="sr-only">Hours: </span>
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-text)]" aria-hidden />
                  <span className="text-ink-soft">{SITE.hours}</span>
                </li>
              )}
            </ul>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-[var(--color-border)] pt-8">
            {PROMISES.map((p) => (
              <div key={p.title}>
                <dt className="font-semibold text-[var(--color-heading)]">{p.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <div className="glass rounded-[28px] p-6 shadow-[var(--shadow-lift)] md:p-10">
            <h2 className="text-[2rem] leading-tight">Quick enquiry</h2>
            <p className="mb-8 mt-2 text-ink-muted">Fill in a few details and press Submit — our team will get back to you by email or phone.</p>
            <EnquiryForm services={services} source="contact" />
          </div>
          <p className="mt-6 text-center text-sm text-ink-muted">
            Prefer a call?{" "}
            <Button href="/book-consultation" variant="link" className="text-sm">
              Book a time
            </Button>
          </p>
        </div>
      </div>
      </div>
    </section>
    <ExploreCarousel section="contact" title="Before you get in touch" />
    </>
  );
}
