"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, AnimatePresence, useReducedMotion } from "motion/react";
import { Phone, Send } from "lucide-react";
import { SITE, telHref } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";
import { track } from "@/lib/track";

/*
  Always-on contact shortcuts, on every page:
   - phones: a bottom bar with Call · WhatsApp · Enquire (thumb-reachable, safe-area aware);
   - desktop: floating Call + WhatsApp buttons, bottom-right.
  It also reports every tel: / mailto: / WhatsApp link click anywhere on the site
  (in-page links, rich text, footer), so calls are measured everywhere.
*/

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.41a8.2 8.2 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.25 8.24-1.52 0-3.01-.41-4.3-1.19l-.31-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.25-8.24Zm-4.54 4.6c-.21 0-.56.08-.85.39-.29.31-1.11 1.09-1.11 2.66 0 1.57 1.14 3.08 1.3 3.29.16.21 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.46.21 2.01.13.61-.09 1.88-.77 2.15-1.51.27-.74.27-1.37.19-1.51-.08-.13-.29-.21-.61-.37-.31-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.72.16-.21.31-.82 1.03-1.01 1.24-.19.21-.37.24-.68.08-.31-.16-1.34-.49-2.56-1.57-.95-.84-1.59-1.89-1.77-2.2-.19-.31-.02-.48.14-.64.14-.14.31-.37.46-.55.16-.19.21-.31.31-.52.11-.21.05-.39-.03-.55-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61Z" />
    </svg>
  );
}

export function ContactDock() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  // Site-wide click measurement for contact links (deduped against explicit tracking).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const location = `page:${window.location.pathname}`;
      if (href.startsWith("tel:")) track("phone_click", { location });
      else if (href.startsWith("mailto:")) track("email_click", { location });
      else if (/^https:\/\/(wa\.me|wa\.link|api\.whatsapp\.com)\//.test(href)) track("whatsapp_click", { location });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const onContactPage = pathname === "/contact";

  return (
    <>
      {/* ───────── Phones: bottom action bar ───────── */}
      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-white/95 px-3 pt-2 shadow-[0_-10px_30px_-20px_rgba(8,27,58,0.45)] backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <a
            href={telHref()}
            onClick={() => track("phone_click", { location: "mobile_bar" })}
            aria-label={`Call ${SITE.name} on ${SITE.phone}`}
            className="flex h-12 items-center justify-center gap-1.5 rounded-full bg-[var(--color-accent)] text-[0.9rem] font-semibold text-white active:scale-[0.98]"
          >
            <Phone className="h-4 w-4" aria-hidden /> Call
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "mobile_bar" })}
            aria-label={`Chat with ${SITE.name} on WhatsApp`}
            className="flex h-12 items-center justify-center gap-1.5 rounded-full bg-[var(--color-whatsapp)] text-[0.9rem] font-semibold text-white active:scale-[0.98]"
          >
            <WhatsAppGlyph className="h-[18px] w-[18px] fill-white" /> WhatsApp
          </a>
          <Link
            href={onContactPage ? "#main" : "/contact"}
            onClick={() => track("contact_cta_click", { location: "mobile_bar" })}
            className="flex h-12 items-center justify-center gap-1.5 rounded-full border border-[var(--color-border-strong)] bg-white text-[0.9rem] font-semibold text-[var(--color-heading)] active:scale-[0.98]"
          >
            <Send className="h-4 w-4 text-[var(--color-accent-text)]" aria-hidden /> Enquire
          </Link>
        </div>
      </nav>

      {/* ───────── Desktop: floating Call + WhatsApp ───────── */}
      <AnimatePresence>
        {visible && (
          <m.div
            initial={reduce ? false : { opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="safe-bottom fixed right-7 z-40 hidden flex-col items-end gap-3 md:flex"
          >
            <a
              href={telHref()}
              onClick={() => track("phone_click", { location: "floating" })}
              aria-label={`Call ${SITE.name} on ${SITE.phone}`}
              className="group flex h-12 items-center overflow-hidden rounded-full bg-[var(--color-navy)] px-3.5 text-white shadow-[0_10px_30px_-8px_rgba(8,27,58,0.45)] ring-2 ring-white/40 focus-visible:outline-offset-4"
            >
              <Phone className="h-5 w-5 shrink-0" aria-hidden />
              <span className="max-w-0 whitespace-nowrap text-[0.92rem] font-medium opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[200px] group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-[200px] group-focus-visible:opacity-100">
                {SITE.phone}
              </span>
            </a>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat with ${SITE.name} on WhatsApp`}
              onClick={() => track("whatsapp_click", { location: "floating" })}
              className="group flex h-14 items-center overflow-hidden rounded-full bg-[var(--color-whatsapp)] px-3.5 shadow-[0_10px_30px_-8px_rgba(8,27,58,0.45)] focus-visible:outline-offset-4"
            >
              <WhatsAppGlyph className="h-7 w-7 shrink-0 fill-white" />
              <span className="max-w-0 whitespace-nowrap text-[0.95rem] font-medium text-white opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[160px] group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-[160px] group-focus-visible:opacity-100">
                Chat with us
              </span>
            </a>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
