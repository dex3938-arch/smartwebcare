"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Bot,
  Camera,
  ChevronDown,
  Clapperboard,
  Code2,
  Compass,
  Gem,
  Linkedin,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  MessageSquareText,
  Package,
  Palette,
  PenTool,
  Phone,
  PhoneCall,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  UserRound,
  Users,
  Workflow,
  X,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { PRIMARY_NAV, SITE, telHref, type NavItem } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";
import { Wordmark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

/** Icons for the Services menu (in the live site's order). */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  "ai-agents": Bot,
  "ai-automations": Workflow,
  "ai-receptionist": PhoneCall,
  "personal-branding": UserRound,
  "instagram-marketing": Camera,
  "linkedin-marketing": Linkedin,
  "influencer-marketing": Users,
  "email-marketing-automation": Mail,
  "whatsapp-marketing": MessageCircle,
  "linkedin-ads-lead-generation": Target,
  "reputation-management": ShieldCheck,
  "youtube-channel-management": Youtube,
  "performance-marketing": TrendingUp,
  "brand-playbook": Award,
  "video-editing": Clapperboard,
  "graphic-design": Palette,
  "branding-marketing": Megaphone,
  rebranding: RefreshCw,
  "marketplace-listings": Store,
  "strategic-marketing": Compass,
  "brand-development": Gem,
  "go-to-market-strategy": Rocket,
  "web-development": Code2,
  "ui-ux-design": PenTool,
  "product-packaging-design": Package,
  "shoot-services": ShoppingBag,
  seo: Search,
  aeo: MessageSquareText,
};

export type ServiceNavGroup = {
  label: string;
  items: { slug: string; title: string; badge: string | null }[];
};

/*
  Glass header with real dropdowns:
  - "Services" opens a full-width mega-menu with every service, grouped by discipline.
  - SEO / Resources / Company open compact menus under their trigger.
  Triggers are buttons: click/tap pins a menu open, mouse hover opens it with intent delays,
  Escape / outside click / route change close it. Panels stay in the HTML (hidden with
  visibility) so every link is crawlable. CSS transitions only.
*/
export function SiteHeader({ serviceGroups }: { serviceGroups: ServiceNavGroup[] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const hoverTimer = useRef<number | null>(null);
  const openedBy = useRef<"hover" | "click" | null>(null);
  // After navigating from an open menu, the pointer is often still over it: don't let
  // hover re-open it until the pointer has left.
  const hoverLocked = useRef(false);
  const openRef = useRef<string | null>(null);
  useEffect(() => {
    openRef.current = open;
  }, [open]);
  const allServices = serviceGroups.flatMap((g) => g.items);
  const totalServices = allServices.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
    openedBy.current = null;
    hoverLocked.current = openRef.current !== null;
    setMobileOpen(false);
    setMobileSection(null);
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const clearHover = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };
  const close = useCallback(() => {
    clearHover();
    openedBy.current = null;
    setOpen(null);
  }, []);

  const onEnter = (label: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || hoverLocked.current) return;
    clearHover();
    hoverTimer.current = window.setTimeout(() => {
      // Moving between menus keeps a pinned state; a fresh hover opens in hover mode.
      if (!openedBy.current) openedBy.current = "hover";
      setOpen(label);
    }, openRef.current ? 40 : 90);
  };
  const onLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    hoverLocked.current = false;
    clearHover();
    if (openedBy.current !== "hover") return;
    hoverTimer.current = window.setTimeout(() => {
      openedBy.current = null;
      setOpen(null);
    }, 220);
  };
  const onTrigger = (label: string) => {
    clearHover();
    hoverLocked.current = false;
    if (open === label && openedBy.current === "click") {
      close();
    } else {
      openedBy.current = "click";
      setOpen(label);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`);
      close();
      trigger?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
  const itemActive = (item: NavItem) => {
    if (item.panel === "services") {
      return pathname === "/services" || allServices.some((s) => pathname === `/${s.slug}`);
    }
    if (item.items) return item.items.some((l) => isActive(l.href));
    return isActive(item.href);
  };

  const linkClass = (active: boolean) =>
    cn(
      "group/nav relative inline-flex min-h-10 items-center gap-1 rounded-full px-3 py-2 text-[0.9rem] font-medium transition-colors xl:px-3.5",
      active ? "text-[var(--color-heading)]" : "text-ink-soft hover:text-[var(--color-heading)]"
    );
  const underline = (active: boolean) => (
    <span
      aria-hidden
      className={cn(
        "absolute inset-x-3 -bottom-0.5 h-[2px] origin-left rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-cyan)] transition-transform duration-300 ease-[var(--ease-out-expo)] xl:inset-x-3.5",
        active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100 group-focus-visible/nav:scale-x-100"
      )}
    />
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || open
            ? "border-b border-white/70 bg-white/95 shadow-[0_8px_30px_-18px_rgba(8,27,58,0.35)] backdrop-blur-xl backdrop-saturate-150 lg:bg-white/75"
            : "border-b border-transparent"
        )}
      >
        <nav className="container-wide flex h-[76px] items-center justify-between gap-4" aria-label="Primary">
          <Link href="/" className="shrink-0 rounded-lg">
            <Wordmark eager />
          </Link>

          {/* ───────── Desktop ───────── */}
          <ul ref={navRef} className="hidden items-center gap-0.5 lg:flex">
            {PRIMARY_NAV.map((item) => {
              const active = itemActive(item);
              if (!item.panel) {
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass(active)} aria-current={isActive(item.href) ? "page" : undefined}>
                      {item.label}
                      {underline(active)}
                    </Link>
                  </li>
                );
              }
              const isOpen = open === item.label;
              const panelId = `menu-${item.label.toLowerCase()}`;
              return (
                <li
                  key={item.href}
                  className={item.panel === "list" ? "relative" : undefined}
                  onPointerEnter={onEnter(item.label)}
                  onPointerLeave={onLeave}
                  onBlur={(e) => {
                    const next = e.relatedTarget as Node | null;
                    if (next && !e.currentTarget.contains(next) && openRef.current === item.label) close();
                  }}
                >
                  <button
                    type="button"
                    data-menu={item.label}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => onTrigger(item.label)}
                    className={linkClass(active || isOpen)}
                  >
                    {item.label}
                    <ChevronDown aria-hidden className={cn("h-3.5 w-3.5 transition-transform duration-300", isOpen && "rotate-180")} />
                    {underline(active)}
                  </button>

                  {item.panel === "services" ? (
                    <div
                      id={panelId}
                      className={cn(
                        "absolute inset-x-0 top-full border-b border-[var(--color-border)] bg-white shadow-[var(--shadow-lift)] transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-expo)]",
                        isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
                      )}
                    >
                      <div data-lenis-prevent className="container-wide grid max-h-[calc(100vh-76px)] gap-10 overflow-y-auto py-9 xl:grid-cols-[0.62fr_2.38fr]">
                        <div className="hidden flex-col justify-between xl:flex">
                          <div>
                            <p className="eyebrow">Our Services · {totalServices}</p>
                            <p className="mt-4 font-serif text-[2.1rem] leading-[1.05] text-[var(--color-heading)]">
                              Let&rsquo;s <em className="text-gradient italic">Grow</em> Your Brand
                            </p>
                            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
                              From raw ideas to ripe identities - we help brands grow juicy and unforgettable, right from scratch to scale.
                            </p>
                          </div>
                          <div className="mt-8 flex flex-col items-start gap-3">
                            <Link href="/services" className="link-underline inline-flex items-center gap-2 font-semibold text-[var(--color-heading)]">
                              View All Services <ArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                            <Button href="/book-consultation" variant="accent" size="sm" onClick={() => track("contact_cta_click", { location: "mega_menu" })}>
                              Book Consultation
                            </Button>
                          </div>
                        </div>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5 lg:grid-cols-3 xl:grid-cols-4">
                          {allServices.map((s, i) => {
                            const here = pathname === `/${s.slug}`;
                            const Icon = SERVICE_ICONS[s.slug] ?? Sparkles;
                            return (
                              <li
                                key={s.slug}
                                className={cn("transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]", isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0")}
                                style={{ transitionDelay: isOpen ? `${40 + (i % 8) * 25}ms` : "0ms" }}
                              >
                                <Link
                                  href={`/${s.slug}`}
                                  className={cn(
                                    "group/item flex min-h-11 items-center gap-3 rounded-xl px-2.5 py-2 text-[0.9rem] leading-snug transition-colors",
                                    here ? "bg-[var(--color-light-blue)] text-[var(--color-accent-deep)]" : "text-ink-soft hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-heading)]"
                                  )}
                                  aria-current={here ? "page" : undefined}
                                >
                                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--color-light-blue)] text-[var(--color-accent-deep)] transition-colors group-hover/item:bg-[var(--color-accent)] group-hover/item:text-white">
                                    <Icon className="h-4 w-4" aria-hidden />
                                  </span>
                                  <span>{s.title}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div
                      id={panelId}
                      className={cn(
                        "glass absolute left-1/2 top-full mt-2 w-[22rem] -translate-x-1/2 rounded-2xl p-2 shadow-[var(--shadow-lift)] [--color-glass:rgba(255,255,255,0.97)] transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-expo)]",
                        isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1.5 opacity-0"
                      )}
                    >
                      <ul>
                        {item.items?.map((l) => {
                          const here = isActive(l.href);
                          return (
                            <li key={l.href}>
                              <Link
                                href={l.href}
                                aria-current={here ? "page" : undefined}
                                className={cn(
                                  "group/item flex items-start justify-between gap-3 rounded-xl px-3.5 py-2.5 transition-colors",
                                  here ? "bg-[var(--color-light-blue)]" : "hover:bg-white/80"
                                )}
                              >
                                <span>
                                  <span className={cn("block text-[0.92rem] font-semibold", here ? "text-[var(--color-accent-deep)]" : "text-[var(--color-heading)]")}>
                                    {l.label}
                                  </span>
                                  {l.description && <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-muted">{l.description}</span>}
                                </span>
                                <ArrowUpRight aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--color-accent-text)] opacity-0 transition-opacity group-hover/item:opacity-100" />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
            <a
              href={telHref()}
              onClick={() => track("phone_click", { location: "header" })}
              aria-label={`Call ${SITE.name} on ${SITE.phone}`}
              className="glass inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-[var(--color-heading)] transition-colors hover:border-[var(--color-accent)] xl:px-4"
            >
              <Phone className="h-4 w-4 text-[var(--color-accent-text)]" aria-hidden />
              <span className="hidden whitespace-nowrap 2xl:inline">{SITE.phone}</span>
              <span className="hidden xl:inline 2xl:hidden">Call</span>
            </a>
            <Button href="/book-consultation" variant="accent" size="sm" onClick={() => track("contact_cta_click", { location: "header" })}>
              Book Consultation <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Button>
          </div>

          {/* ───────── Mobile: call + menu ───────── */}
          <div className="flex items-center gap-2 lg:hidden">
          <a
            href={telHref()}
            onClick={() => track("phone_click", { location: "header_mobile" })}
            aria-label={`Call ${SITE.name} on ${SITE.phone}`}
            className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-accent)] text-white shadow-[0_8px_20px_-10px_rgba(37,99,235,0.8)]"
          >
            <Phone className="h-[18px] w-[18px]" aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="glass grid h-11 w-11 place-items-center rounded-full"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-5 w-5 text-[var(--color-heading)]" /> : <Menu className="h-5 w-5 text-[var(--color-heading)]" />}
          </button>
          </div>
        </nav>
      </header>

      {/* ───────── Mobile menu ─────────
          Rendered OUTSIDE <header>: the header's backdrop-filter would make it the containing
          block for fixed descendants and collapse this overlay once scrolled. */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        className={cn(
          "fixed inset-0 top-[76px] z-40 overflow-y-auto bg-white transition-[opacity,visibility] duration-200 lg:hidden",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div className="container-wide flex flex-col gap-1 py-6">
          {PRIMARY_NAV.map((item) => {
            if (!item.panel) {
              return (
                <div key={item.href} className="border-b border-[var(--color-border)] py-1">
                  <Link href={item.href} className="flex items-center justify-between py-3 font-serif text-2xl text-[var(--color-heading)]">
                    {item.label}
                  </Link>
                </div>
              );
            }
            const expanded = mobileSection === item.label;
            const id = `mobile-${item.label.toLowerCase()}`;
            return (
              <div key={item.href} className="border-b border-[var(--color-border)] py-1">
                <button
                  type="button"
                  onClick={() => setMobileSection(expanded ? null : item.label)}
                  aria-expanded={expanded}
                  aria-controls={id}
                  className="flex w-full items-center justify-between py-3 text-left font-serif text-2xl text-[var(--color-heading)]"
                >
                  {item.label}
                  <ChevronDown aria-hidden className={cn("h-5 w-5 transition-transform duration-300", expanded && "rotate-180")} />
                </button>
                <div id={id} className={cn("grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-expo)]", expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className={cn("overflow-hidden", !expanded && "invisible")}>
                    {item.panel === "services" ? (
                      <>
                        <Link href="/services" className="flex items-center gap-2 py-2 font-semibold text-[var(--color-accent-text)]">
                          View All Services <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                        <ul className="pb-3 pt-1">
                          {allServices.map((s) => {
                            const Icon = SERVICE_ICONS[s.slug] ?? Sparkles;
                            return (
                              <li key={s.slug}>
                                <Link href={`/${s.slug}`} className="flex min-h-11 items-center gap-3 text-ink-soft">
                                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[var(--color-light-blue)] text-[var(--color-accent-deep)]">
                                    <Icon className="h-3.5 w-3.5" aria-hidden />
                                  </span>
                                  {s.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : (
                      <ul className="pb-3">
                        {item.items?.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className="flex min-h-11 flex-col justify-center py-1.5">
                              <span className="font-semibold text-[var(--color-heading)]">{l.label}</span>
                              {l.description && <span className="text-[0.82rem] text-ink-muted">{l.description}</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <Button href="/book-consultation" variant="accent" size="lg" className="mt-6 w-full" onClick={() => track("contact_cta_click", { location: "mobile_menu" })}>
            Book Consultation
          </Button>
          <Button href="/contact" variant="secondary" size="lg" className="mt-3 w-full">
            Contact
          </Button>
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[var(--color-border)] pt-6">
            <a
              href={telHref()}
              onClick={() => track("phone_click", { location: "mobile_menu" })}
              className="glass flex min-h-12 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-[var(--color-heading)]"
            >
              <Phone className="h-4 w-4 text-[var(--color-accent-text)]" aria-hidden /> Call us
            </a>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { location: "mobile_menu" })}
              className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-whatsapp)] px-4 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
            </a>
          </div>
          <p className="mt-4 text-center text-sm text-ink-muted">
            {SITE.phone} · <a href={`mailto:${SITE.email}`} onClick={() => track("email_click", { location: "mobile_menu" })} className="font-medium text-[var(--color-accent-text)]">{SITE.email}</a>
          </p>
        </div>
      </div>
    </>
  );
}
