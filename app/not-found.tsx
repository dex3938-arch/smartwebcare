import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Briefcase, CalendarDays, Home, Mail, MessageCircle, Phone, Sparkles, Users } from "lucide-react";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/ui/tracked-link";
import { getServiceMenu } from "@/lib/content";
import { SITE, telHref } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

/*
  Shown for any URL that doesn't exist. It still answers with HTTP 404 (so search
  engines don't index junk URLs), but visitors never hit a dead end: quick links, a
  call / WhatsApp shortcut and the full enquiry form are right here.
*/

export const metadata: Metadata = {
  title: "Page not found — but we can still help",
  robots: { index: false, follow: true },
};

const POPULAR = [
  { label: "Home", href: "/", icon: Home },
  { label: "Our Services", href: "/services", icon: Briefcase },
  { label: "About Us", href: "/about", icon: Users },
  { label: "Testimonials", href: "/clients", icon: Sparkles },
  { label: "Journal", href: "/blog", icon: BookOpen },
  { label: "Book Consultation", href: "/book-consultation", icon: CalendarDays },
];

export default function NotFound() {
  const services = getServiceMenu().map((s) => ({ slug: s.slug, title: s.title }));
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36" aria-labelledby="nf-title">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div aria-hidden className="aurora absolute inset-0 -z-10" />
      <div className="container-wide grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow">Page not found</p>
          <h1 id="nf-title" className="mt-6 text-[length:var(--text-h1)] leading-[1] text-ink">
            This one hasn&rsquo;t <em className="text-gradient italic">ripened</em> yet.
          </h1>
          <p className="mt-6 max-w-md text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Tell us what you need and we&rsquo;ll point you the right way — or jump straight to a popular page.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-2.5">
            {POPULAR.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className="glass group flex min-h-12 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-[0.92rem] font-semibold text-[var(--color-heading)] transition-colors hover:border-[var(--color-accent)]">
                  <Icon className="h-4 w-4 shrink-0 text-[var(--color-accent-text)]" aria-hidden />
                  <span className="min-w-0 flex-1">{label}</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href={telHref()} variant="primary" size="lg" className="w-full sm:w-auto">
              <Phone className="h-4 w-4" aria-hidden /> Call {SITE.phone}
            </Button>
            <Button href={whatsappHref()} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg" className="w-full sm:w-auto">
              <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp us
            </Button>
          </div>
          <p className="mt-5 text-sm text-ink-muted">
            Or email{" "}
            <TrackedLink event="email_click" location="404" href={`mailto:${SITE.email}`} className="link-underline inline-flex items-center gap-1 font-medium text-[var(--color-accent-text)]">
              <Mail className="h-3.5 w-3.5" aria-hidden /> {SITE.email}
            </TrackedLink>
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="glass rounded-[28px] p-6 shadow-[var(--shadow-lift)] md:p-10">
            <h2 className="text-[2rem] leading-tight">Tell us what you were looking for</h2>
            <p className="mb-8 mt-2 text-ink-muted">Send a quick enquiry and our team will get back to you.</p>
            <EnquiryForm services={services} source="404" />
          </div>
        </div>
      </div>
    </section>
  );
}
