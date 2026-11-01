import Link from "next/link";
import { Clock, Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone, Twitter } from "lucide-react";
import { FOOTER_NAV, SITE, telHref } from "@/lib/site";
import { LocationMaps } from "@/components/layout/location-maps";
import { WHATSAPP_DISPLAY, whatsappHref } from "@/lib/whatsapp";
import { Wordmark } from "@/components/brand/logo";
import { WaveSeam } from "@/components/sections/wave-seam";
import { TrackedLink } from "@/components/ui/tracked-link";

const SOCIAL_ICONS = {
  instagram: { Icon: Instagram, label: "SmartWebCare on Instagram" },
  linkedin: { Icon: Linkedin, label: "SmartWebCare on LinkedIn" },
  facebook: { Icon: Facebook, label: "SmartWebCare on Facebook" },
  x: { Icon: Twitter, label: "SmartWebCare on X (Twitter)" },
} as const;

function Column({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="mb-4 font-sans text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#7dd3fc]">{title}</h2>
      <ul className="space-y-0.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex min-h-9 items-center text-[0.94rem] text-ink-soft transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const socials = (Object.keys(SITE.socials) as (keyof typeof SITE.socials)[]).filter((k) => SITE.socials[k]);
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <WaveSeam from="white" to="navy" />
      <div className="navy relative overflow-hidden">
        <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.35),transparent)]" />

        <div className="container-wide relative pb-28 pt-10 md:pb-16 md:pt-14">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_2.75fr] lg:gap-16">
            <div className="max-w-sm">
              <Link href="/" className="inline-block rounded-lg">
                <Wordmark invert />
              </Link>
              <p className="mt-5 text-[0.97rem] leading-relaxed text-ink-muted">
                Brewed in strategy, packed with purpose, and served fresh — just like SmartWebCare
                should be.
              </p>

              <ul className="mt-7 space-y-2.5 text-[0.94rem]">
                <li>
                  <TrackedLink event="phone_click" location="footer" href={telHref()} className="inline-flex items-center gap-3 text-ink-soft hover:text-white">
                    <Phone className="h-4 w-4 text-[#67e8f9]" aria-hidden /> {SITE.phone}
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink event="email_click" location="footer" href={`mailto:${SITE.email}`} className="inline-flex items-center gap-3 text-ink-soft hover:text-white">
                    <Mail className="h-4 w-4 text-[#67e8f9]" aria-hidden /> {SITE.email}
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink event="whatsapp_click" location="footer" href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-ink-soft hover:text-white">
                    <MessageCircle className="h-4 w-4 text-[#67e8f9]" aria-hidden /> {WHATSAPP_DISPLAY ? `WhatsApp ${WHATSAPP_DISPLAY}` : "Chat on WhatsApp"}
                  </TrackedLink>
                </li>
                <li className="flex items-start gap-3 text-ink-soft">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#67e8f9]" aria-hidden />
                  <span>{SITE.address || `${SITE.city}, ${SITE.country}`}</span>
                </li>
                {SITE.hours && (
                  <li className="flex items-start gap-3 text-ink-soft">
                    <Clock className="mt-1 h-4 w-4 shrink-0 text-[#67e8f9]" aria-hidden /> <span>{SITE.hours}</span>
                  </li>
                )}
              </ul>

              {socials.length > 0 && (
                <ul className="mt-6 flex gap-2.5" aria-label="Social profiles">
                  {socials.map((key) => {
                    const { Icon, label } = SOCIAL_ICONS[key];
                    return (
                      <li key={key}>
                        <a
                          href={SITE.socials[key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border-strong)] text-ink-soft transition-colors hover:border-[#67e8f9] hover:text-white"
                        >
                          <Icon className="h-4 w-4" aria-hidden />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <Column title="Quick Links" links={FOOTER_NAV.quick} />
              <Column title="Top Services" links={FOOTER_NAV.services} />
              <Column title="Insights" links={FOOTER_NAV.insights} />
            </div>
          </div>

          <LocationMaps />

          <div className="mt-14 flex flex-col gap-4 border-t border-[var(--color-border)] pt-7 text-[0.85rem] text-ink-muted md:flex-row md:items-center md:justify-between">
            <p>© {year} {SITE.name}. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_NAV.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-8 items-center hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
