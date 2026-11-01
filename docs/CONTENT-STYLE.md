# SmartWebCare — content style guide

Rules for every page of written content (service guides, process and use-case pages, insights articles).
The checker `python3 scripts/check-content.py <file.json>` enforces the measurable ones.

## Voice
- Practical, warm and confident. Talk to the reader as "you"; the agency is "we" / "SmartWebCare".
- Plain English: short sentences, concrete nouns, one idea per paragraph (2–4 sentences).
- **US spelling** (optimize, color, organization) — matches the rest of the site.
- India-first, internationally readable: Indian business examples (a Pune clinic, a Jaipur D2C brand,
  a Gurugram SaaS startup), ₹ where money is mentioned, but nothing that excludes a reader in Dubai or London.

## Honesty (non-negotiable)
- **No invented numbers.** No made-up statistics, percentages, conversion rates, case-study results,
  client names, awards or "X% of businesses…" claims. Describe ranges qualitatively ("a few weeks",
  "usually the first month") unless a figure is a well-established public fact you can cite.
- **No prices or guarantees.** Never promise rankings, viral reach, revenue, "#1" positions or timelines
  the agency can't control. Pricing is always "scoped after a free consultation".
- **Current facts must be true.** Anything dated or platform-specific (a Google update, a WhatsApp pricing
  change, an Instagram feature, a law such as India's DPDP Act or ASCI influencer rules) must be checked
  with a web search before you write it. If you can't verify it, phrase it generally or leave it out.
  Insights articles list the official pages they relied on in `sources`.
- Don't name or disparage competitors. Don't copy text from other websites.

## Uniqueness (SEO)
- Every page answers a different question. A service's **guide** teaches the topic, its **process** page
  explains how SmartWebCare delivers it, its **use-cases** page shows who it's for and what changes.
- Never reuse a sentence across pages. Avoid template phrasing ("In this guide we will…",
  "Whether you're a startup or an enterprise…"). Start sections with substance.
- Don't repeat the copy already on the main service page (`data/services.json`) — build on it.

## Banned filler
"in today's fast-paced", "digital landscape", "ever-evolving", "game-changer", "unlock", "unleash",
"leverage" (use "use"), "delve", "elevate", "revolutionize", "cutting-edge", "seamless(ly)",
"supercharge", "skyrocket", "in conclusion", "look no further", "one-stop", "world-class",
"guarantee(d)", "#1", "best-in-class", "100%".

## Inline markup
Paragraphs, bullets and FAQ answers support `[label](/path)` internal links, `**bold**` and `` `code` ``.
- Internal links must point to a path in `scripts/allowed-paths.txt` (the checker verifies this).
- 2–5 internal links per page, placed where they genuinely help (related service, its sub-pages,
  a relevant insights article, `/contact`, `/book-consultation`).
- No external links in the body. Insights articles put external references in `sources`.

## SEO fields
- `metaTitle`: 30–52 characters (the site appends " | SmartWebCare"). Unique across the site.
- `metaDescription`: 120–158 characters, written for humans, no keyword stuffing.
- `title` (the H1) can be longer and more natural than `metaTitle`.
