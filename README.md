# SmartWebCare — AI • Software • SaaS

Website for **SmartWebCare** — the team's SocialGuava website, rebranded: same content, services and pages, with the SmartWebCare name, logo, colours and a new cinematic design. Plus new SEO / AEO / GEO guides, an FAQ and legal pages. Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, `motion`, Lenis and React Three Fiber (one lazy 3D scene on capable desktops).

## 1. Run it locally

```bash
npm ci
cp .env.example .env.local     # then edit values
npm run dev                    # http://localhost:3000
```

Production check: `npm run typecheck && npm run lint && npm run build && npm start`

## 2. Environment variables — change contact details without touching code

Every phone number, email, WhatsApp link, address, booking link and social profile comes from environment variables. Full commented list: **`.env.example`**.

**To change something on the live site:** Vercel → Project → **Settings → Environment Variables** → edit the value → **Deployments → ⋯ → Redeploy**. `NEXT_PUBLIC_*` values are built into the pages, so the change shows only after a redeploy (about 2 minutes).

| Variable | What it changes |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap.xml, robots.txt, share cards. **Leave it empty until your own domain points at Vercel** — the site then uses the Vercel address automatically (e.g. `https://smartwebcare.vercel.app`). |
| `NEXT_PUBLIC_CONTACT_PHONE` | Phone shown everywhere + every **Call** button (header, mobile bar, floating, contact, 404, CTA bands). |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email shown everywhere, incl. FAQ and legal pages. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits with country code (e.g. `919876543210`). Every WhatsApp button opens this chat with a ready message, and the number is shown. |
| `NEXT_PUBLIC_WHATSAPP_URL` | WhatsApp link used when no number is set (default `https://wa.link/0tfoce`). |
| `NEXT_PUBLIC_CONTACT_CITY` / `_COUNTRY` / `_ADDRESS` / `NEXT_PUBLIC_BUSINESS_HOURS` | Location, full address and opening hours (footer, contact page, SEO data). |
| `NEXT_PUBLIC_CALENDLY_URL`, `NEXT_PUBLIC_CONSULTATION_VALUE` | Booking calendar and the "Worth $175" value. |
| `NEXT_PUBLIC_INSTAGRAM_URL` / `_LINKEDIN_URL` / `_FACEBOOK_URL` / `_X_URL` | Footer social icons (set empty to hide one). |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Enquiry form database + Journal (see §3). The service-role key is **secret** — no `NEXT_PUBLIC_` prefix, never share it. |
| `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL`, `ENQUIRY_WEBHOOK_URL` | Optional alerts for each new enquiry (email via Resend, or any webhook — Zapier, Make, Slack, Sheets). |
| `NEXT_PUBLIC_GTM_ID`, `_GA_ID`, `_GADS_ID`, `_DATAFAST_ID`, `_MOUSEFLOW_ID` | **Analytics stay off until set** — nothing is hard-coded. Production deployment only. |

## 3. Enquiry form → Supabase

1. Create a Supabase project (or use the existing one) → **SQL Editor → New query** → paste **`supabase/schema.sql`** → **Run**. This creates the `enquiries` table (and `blog_posts`) with Row Level Security: the public can only *add* an enquiry — nobody can read them except you in the dashboard.
2. Supabase → **Project Settings** → copy the **Project URL** (Data API), the **Publishable key** (`sb_publishable_…`, or legacy *anon*) and the **Secret key** (`sb_secret_…`, or legacy *service_role*) into Vercel as `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` → Redeploy. Both key styles work; Supabase is retiring the legacy ones by the end of 2026, so prefer the new ones.
3. Test: submit the form on `/contact` → the row appears in **Table Editor → enquiries** (status `new`; use `status`/`notes` columns to track follow-ups).

How it works: the form posts to `/api/enquiry`, which validates the data, blocks bots (hidden honeypot field, minimum fill time, 5 submissions per 10 minutes per visitor) and saves the row. If the database isn't configured or is unreachable, the visitor keeps what they typed and gets **Send on WhatsApp / Send by email / Call us** buttons — no dead ends.

## 4. Deploy to Vercel

Easiest (update the existing project): replace the project files with this folder's contents (keep your `.env.local` if you have one), push to the Git repo connected to Vercel — or run:

```bash
npm i -g vercel
vercel login
vercel --prod
```

**Domain note:** `smartwebcare.com` currently serves a *different* website (not this Vercel project), so links like `smartwebcare.com/clients` or `smartwebcare.com/sitemap.xml` 404 there. Until you connect the domain (Vercel → Settings → **Domains** → add `smartwebcare.com` + `www`, then update DNS), keep `NEXT_PUBLIC_SITE_URL` **empty** (delete it if it's set) so canonicals and the sitemap use the working Vercel address. After the domain is live: set it to `https://smartwebcare.com`, redeploy, verify in Google Search Console and submit `/sitemap.xml`.

**No 404 dead ends:** uppercase URLs redirect to lowercase (`/Clients` → `/clients`), common aliases redirect (`/sitemap`, `/about-us`, `/contact-us`, `/testimonials`, `/services/<name>`, `/journal`…), and any unknown URL shows a helpful page with quick links, Call/WhatsApp and the enquiry form (it still answers HTTP 404 so Google doesn't index junk URLs). A full crawl of 24,084 pages found **0** broken internal links.

### Updating an older copy of this project

Extracting a new zip over an old folder adds and replaces files but never deletes them. These files were removed in later versions — **delete them if they exist**, or the build fails:

- `app/sitemap.ts` (replaced by `app/sitemap.xml/route.ts` + `app/sitemaps/*`)
- `components/layout/floating-whatsapp.tsx` (replaced by `components/layout/contact-dock.tsx`)

Simplest alternative: extract into a fresh folder, copy your `.env.local` across, then `npm ci`.

## 5. Where to change things

| What | File |
|---|---|
| Contact details | **Environment variables** (see §2) — defaults in `lib/site.ts` |
| Brand, navigation, footer links | `lib/site.ts` |
| Enquiry form / API / database | `components/contact/enquiry-form.tsx`, `app/api/enquiry/route.ts`, `supabase/schema.sql` |
| Call / WhatsApp buttons (mobile bar + floating) | `components/layout/contact-dock.tsx` |
| 404 page | `app/not-found.tsx` |
| Redirects | `next.config.ts` (`redirects`), `middleware.ts` (lowercase) |
| Home page copy, stats, process, testimonials | `lib/home.ts` |
| Founders (photos + bios) | `lib/people.ts` |
| Services (all 29) + categories | `data/services.json` (copy) · `lib/content.ts` (rebrand + categories) |
| SEO / AEO / GEO / sitemap / robots guides | `lib/guides/*.ts` |
| FAQ page | `lib/faq.ts` |
| Legal pages | `lib/legal.ts` (see `LEGAL_TO_CONFIRM`) |
| Industry pages | `data/industries.json`, `data/industry-services.json`, `data/industry-city-faqs.json` |
| Service sub-pages (guide / process / use cases) | `data/service-subpages/{service}.json` |
| Insights articles | `data/insights/{slug}.json` · topics in `lib/insights.ts` |
| About / Testimonials / Contact sub-pages | `lib/company-pages.ts` |
| Navbar dropdowns | `PRIMARY_NAV` in `lib/site.ts` |
| Sitemaps (XML index + `/site-map` page) | `lib/sitemap-data.ts` |
| Carousel, scroll timeline, reading progress | `components/motion/carousel.tsx`, `step-timeline.tsx`, `reading-progress.tsx` |
| 3D scenes (orbit, pipeline, constellation) | `components/three/scenes.tsx` (loaded by `scene-3d.tsx`, desktop only) |
| Round 3D card carousel (auto-turns, stops on hover) | `components/motion/ring-carousel.tsx` |
| Footer location maps (India map + world flight lines) | `components/layout/location-maps.tsx`; cities/pins: `scripts/build-maps.py` → `lib/map-points.ts` |
| Colours, glass, animations | `app/globals.css` |
| Logo files | `public/brand/` (see `docs/ASSET-MANIFEST.md`) |

## 6. Writing new content (keeps SEO clean)

Every guide, process, use-case and insights page is a JSON file checked by a script, so new pages stay unique and on-brand:

1. Read **`docs/CONTENT-STYLE.md`** (voice, honesty rules, banned filler, SEO field lengths).
2. Copy an existing file — e.g. `data/insights/instagram-strategy-2026.json` — give it a new `slug` (= file name), and write.
3. Add the new URL to `scripts/allowed-paths.txt` if other pages should link to it (for an insights article, also add it to the planned list).
4. Run the checker and fix every error:

```bash
python3 scripts/check-content.py --all
```

It checks structure, word counts, meta title/description length, banned phrases, that every internal link exists, and repeated sentences across pages (duplicate content). Then `npm run build` — the page, sitemap entry, breadcrumbs and structured data are generated automatically.

## 7. What's built

- **Pages:** home, services index + all 29 original service pages, 7 long-form guides (`/seo-standards`, `/technical-seo`, `/on-page-seo`, `/off-page-seo`, `/geo`, `/xml-sitemap`, `/robots-txt`) plus the AEO guide on the `/aeo` service page, `/faq` (56 answers), `/resources`, `/industries` (+12), `/compare`, `/tools` (+9), `/blog`, `/clients`, `/about`, `/contact`, `/book-consultation`, legal (`/privacy-policy`, `/terms-and-conditions`, `/refund-policy`, `/disclaimer`), country / state / city pages (priority cities prebuilt, the long tail rendered on demand).
- **New in this version:** 84 service sub-pages (`/{service}/guide`, `/process`, `/use-cases`), the Insights hub with 4 topics and 16 current-topic articles, 5 About pages, 2 Testimonials pages, 2 Contact pages, an HTML sitemap (`/site-map`), navbar dropdowns for every heading, carousels, a scroll-linked process timeline, reading-progress bars and three light 3D scenes (Services, How we work, Insights — desktop only; phones get a static image).
- **SEO:** unique title, description, canonical, OG/Twitter image per page (`buildMetadata`), JSON-LD (Organization, WebSite, BreadcrumbList, Service, Article, FAQPage, CollectionPage — only where the content is visible), `/sitemap.xml` = sitemap index → `/sitemaps/pages.xml`, `services.xml`, `insights.xml`, `resources.xml`, `locations.xml`, `app/robots.ts` (AI/answer-engine crawlers allowed on purpose), dynamic OG images (`/og`).
- **Brand light:** "SmartWebCare" shine sweep every 3 s; SWC emblem light sweep + circuit-node pulses; static under `prefers-reduced-motion`.
- **Enquiries:** form saved to Supabase (with WhatsApp / email / call fallbacks), Call + WhatsApp on every page (header, phone bottom bar, desktop floating buttons, CTA bands, contact and 404 pages). Conversion events (`contact_cta_click`, `contact_form_started/submitted/failed`, `whatsapp_click`, `phone_click`, `email_click`, `service_page_view`) go to GTM's dataLayer once analytics is configured; message contents are never sent.

## 8. Release checklist

| # | Item | Status |
|---|---|---|
| 1 | SocialGuava branding replaced with SmartWebCare | Done — all original content kept; only the name changed (the shared contact email and social profile links still point to the team's existing accounts). |
| 2 | Supplied logo used consistently (nav, footer, hero, about, contact, favicons, OG) | Done |
| 3 | Logo light-sweep / glow respects reduced motion | Done |
| 4 | Counters animate; stats are the team's original figures | Done |
| 5 | Services scroll interaction (mouse, keyboard, touch) | Done — sticky scroll-linked panel on desktop, stacked on mobile |
| 6 | Office image + founder portraits | Office image is an AI illustration with the real logo; founder photos are the team's own portraits |
| 7 | Navbar dropdowns + all pages work | Done — full crawl: 24,084 pages, 0 broken internal links |
| 8 | Unique metadata on every public page | Done |
| 9 | Important URLs preserved | Uppercase → lowercase redirect, common aliases redirected, helpful 404 page with form |
| 10 | sitemap.xml / robots.txt valid | Done |
| 11 | Private routes protected | No private routes; `/internal/` is disallowed and noindexed |
| 12 | Structured data matches visible content | Done — validate after launch in the Rich Results Test |
| 13 | Contact flows | Form → Supabase (**run `supabase/schema.sql` + add the keys**), WhatsApp, email and call everywhere |
| 14 | Analytics events | Wired; **verify in GTM preview after adding IDs** |
| 15 | No horizontal scrolling on mobile | Done (checked 320–1440 px) |
| 16 | Performance & accessibility | Lighthouse: desktop 99/100/100/100; mobile 90–94 perf (simulated), 98 with applied throttling; A11y/BP/SEO 100. Field data (CrUX) will only exist after launch. |
| 17 | Legal pages reviewed | **Owner / lawyer review needed** — see `LEGAL_TO_CONFIRM` in `lib/legal.ts` |
| 18 | Rollback plan | Vercel keeps every deployment — "Promote to Production" on the previous one to roll back instantly |
