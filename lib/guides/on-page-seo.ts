import type { Guide } from "./types";

export const guide: Guide = {
  slug: "on-page-seo",
  kind: "service",
  navLabel: "On-Page SEO",
  metaTitle: "On-Page SEO Services and Checklist | SmartWebCare",
  metaDescription:
    "On-page SEO that maps each page to search intent, then improves titles, headings, content, internal links, images and markup. Includes a practical checklist.",
  eyebrow: "SEO service",
  title: "On-page SEO: pages that search engines understand and people act on",
  lead:
    "On-page SEO is the work done on each page to make its purpose obvious to search engines and its answer useful to the reader. We audit, rewrite and implement it, so improvements reach the live site instead of staying in a spreadsheet.",
  summary: [
    "Every important page should serve one clear search intent, with its title, headings and content all supporting that purpose.",
    "Title tags and meta descriptions shape how a result looks, but Google may rewrite them, so they must describe the page honestly.",
    "Helpful, original and accurate content does more than any keyword target, while keyword stuffing and hidden text can work against a page.",
    "Descriptive internal links, well-prepared images, clean URLs and consistent canonicals help search engines connect and trust your pages.",
  ],
  sections: [
    {
      id: "what-is-on-page-seo",
      heading: "What is on-page SEO?",
      blocks: [
        {
          type: "p",
          text: "On-page SEO is the optimization of everything on a page that you control directly: the words, headings, title tag, meta description, images, links, URL and markup. Its goal is simple to state and harder to execute: make it obvious what the page is about, show that it answers the search better than the alternatives, and make the next step easy.",
        },
        {
          type: "p",
          text: "It differs from [technical SEO](/technical-seo), which makes sure the site can be crawled and indexed at all, and from [off-page SEO](/off-page-seo), which builds reputation elsewhere on the web. In reality the layers overlap: a brilliant page with a broken canonical tag will struggle, and so will a technically perfect page with vague copy. Our [SEO standards](/seo-standards) guide explains how they fit together.",
        },
        {
          type: "p",
          text: "We treat on-page SEO as an editorial and design discipline as much as a technical one. Our team writes, designs and ships the changes, which matters on custom sites where every fix would otherwise wait for a developer. When a page needs structural work, our [web development](/web-development) and [UI/UX design](/ui-ux-design) teams handle it directly.",
        },
      ],
    },
    {
      id: "keyword-and-intent-mapping",
      heading: "How do you map keywords to search intent?",
      blocks: [
        {
          type: "p",
          text: "We map keywords by grouping searches that share the same intent and assigning each group to one page, so every page has a clear job and no two pages compete for it. A keyword list on its own is not a plan; the mapping is what tells you which pages to create, merge or rewrite.",
        },
        {
          type: "table",
          caption: "Example keyword-to-page map for a dental clinic",
          columns: ["Search group", "Intent", "Best page"],
          rows: [
            ["teeth whitening cost, whitening price", "Commercial", "Whitening service page with pricing guidance"],
            ["is teeth whitening safe", "Informational", "Guide that answers the safety question directly"],
            ["dentist open on saturday near me", "Local and transactional", "Clinic location page with hours and booking"],
          ],
        },
        {
          type: "p",
          text: "To judge intent, we look at what already ranks. If the top results for a search are all guides, a sales page is unlikely to compete, and the reverse is also true. We then check for cannibalization, where several of your pages target the same group and split the signals between them. The usual fix is to merge them into one stronger page and redirect the others.",
        },
        {
          type: "p",
          text: "The finished map becomes the brief for everything that follows: the title, the H1, the sections and the internal links.",
        },
      ],
    },
    {
      id: "title-tags-and-meta-descriptions",
      heading: "How should title tags and meta descriptions be written?",
      blocks: [
        {
          type: "p",
          text: "Write a title tag that names the page's main topic in plain words and a meta description that summarizes what the reader will get, both unique to that page. Put the important words first, include the brand where it helps recognition, and skip lists of keyword variations.",
        },
        {
          type: "code",
          lang: "html",
          caption: "A clean, honest page head",
          code: `<head>
  <title>Teeth Whitening Options and Costs | Example Dental</title>
  <meta
    name="description"
    content="Compare in-clinic and take-home teeth whitening, typical costs, how long results last and who should avoid treatment. Book a consultation with our dentists."
  />
  <link rel="canonical" href="https://www.example.com/teeth-whitening" />
</head>`,
        },
        {
          type: "p",
          text: "Length guidance exists because results are truncated by pixel width, not by character count. Around 50 to 60 characters for titles and 150 to 160 for descriptions keeps most of the text visible, but these are guidelines, not rules. A slightly longer title that reads naturally beats a clipped one that makes no sense.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Google may rewrite both",
          text: "Google generates title links and snippets automatically and may use your headings, anchor text or body copy instead of your tags, especially when the tags are vague, duplicated or misleading. Meta descriptions do not directly affect rankings, but a clear one can earn more clicks. Our [meta description generator](/tools/meta-description-generator) helps you draft options to refine by hand.",
        },
      ],
    },
    {
      id: "headings-and-semantic-html",
      heading: "How should headings and semantic HTML be structured?",
      blocks: [
        {
          type: "p",
          text: "Use one H1 that states the page's topic, H2s for the main sections and H3s for subsections within them, so the outline makes sense even to someone who reads only the headings. Headings describe structure, not style; if text simply needs to look bigger, that is a job for CSS.",
        },
        {
          type: "p",
          text: "Semantic HTML means using elements for what they mean: `<main>` for the primary content, `<nav>` for navigation, `<article>` for self-contained content, real `<button>` and `<a>` elements for actions and links, and proper lists for lists. It helps assistive technologies and gives crawlers clearer cues about which part of the page is the content.",
        },
        {
          type: "code",
          lang: "html",
          caption: "A logical heading outline inside semantic elements",
          code: `<main>
  <article>
    <h1>Teeth whitening options and costs</h1>
    <h2>In-clinic whitening</h2>
    <h3>How long a session takes</h3>
    <h2>Take-home whitening kits</h2>
    <h2>Who should avoid whitening</h2>
  </article>
</main>`,
        },
        {
          type: "p",
          text: "Avoid headings that repeat the same phrase with small variations, such as five H2s that each start with the city and service name. They read as if written for a machine, and they make the outline useless to people scanning for an answer.",
        },
      ],
    },
    {
      id: "helpful-original-content",
      heading: "What makes on-page content helpful and original?",
      blocks: [
        {
          type: "p",
          text: "Helpful content answers the searcher's real question early, adds something the existing results lack, and holds up when someone checks it. Originality comes from what only you can offer: first-hand experience, your own data, real examples, clear opinions and specifics about how your service actually works. The same answer-first structure also helps with [answer engine optimization](/aeo).",
        },
        {
          type: "list",
          items: [
            "Answer first, then explain, with the direct answer near the top of the page or section.",
            "Show who is behind the content and why they can be trusted, with author or business details where relevant.",
            "Support factual claims with sources, and remove anything you cannot back up.",
            "Review important pages on a schedule, updating prices, dates, screenshots and advice as they change.",
            "Change the visible updated date only after substantive edits, never for cosmetic tweaks.",
          ],
        },
        {
          type: "callout",
          tone: "warn",
          title: "What we will not do",
          text: "We do not use keyword stuffing, repetitive headings or hidden text on any page. Stuffing makes copy harder to read and is named in Google's [spam policies](https://developers.google.com/search/docs/essentials/spam-policies), as is text shown to crawlers but hidden from visitors, such as white text on a white background or copy positioned off-screen with CSS.",
        },
      ],
    },
    {
      id: "internal-linking",
      heading: "How should internal links be used?",
      blocks: [
        {
          type: "p",
          text: "Internal links should connect related pages with descriptive anchor text, so readers and crawlers can follow a topic from a broad overview to the specific detail they need. They are one of the few signals entirely under your control, and they help search engines discover new pages and understand which pages you consider most important.",
        },
        {
          type: "list",
          items: [
            "Link from well-visited, well-linked pages to the pages you most want found.",
            "Use anchor text that describes the destination, such as \"teeth whitening costs\" rather than \"click here\".",
            "Link from relevant guides to commercial pages where a reader would naturally want the next step.",
            "Use standard `<a href>` links; navigation that only works through JavaScript click handlers may not be followed.",
            "Find orphan pages, which no internal link points to, and either link them properly or retire them.",
          ],
        },
        {
          type: "p",
          text: "Menus and footers help, but links inside body copy carry clearer meaning because the surrounding text explains the relationship. We also avoid linking every mention of a phrase, which dilutes the signal and distracts readers from the link that matters.",
        },
      ],
    },
    {
      id: "images-and-alt-text",
      heading: "How should images be optimized for search?",
      blocks: [
        {
          type: "p",
          text: "Optimize images by making them fast to load, sized for the space they fill and described accurately in alt text, so they help both page speed and understanding. Images are often the heaviest part of a page and a frequent cause of slow loading and layout shift.",
        },
        {
          type: "code",
          lang: "html",
          caption: "An image with alt text, dimensions and lazy loading",
          code: `<img
  src="/images/whitening-consultation.webp"
  alt="Dentist matching tooth shade with a shade guide before whitening"
  width="1200"
  height="800"
  loading="lazy"
/>`,
        },
        {
          type: "list",
          items: [
            "Write alt text that describes the image's content and purpose, and use an empty `alt=\"\"` for purely decorative images.",
            "Set `width` and `height` so the browser reserves space and the layout does not jump.",
            "Lazy-load images below the fold, but never the main hero image, which should load as early as possible.",
            "Use modern formats such as WebP or AVIF, compress sensibly and serve responsive sizes with `srcset`.",
            "Use descriptive file names and put important images in `<img>` elements, because Google does not index CSS background images.",
          ],
        },
      ],
    },
    {
      id: "urls-and-canonicals",
      heading: "What makes a good URL and canonical setup?",
      blocks: [
        {
          type: "p",
          text: "A good URL is short, readable and stable, and a good canonical setup makes every piece of content resolve to one preferred address. Visitors should be able to guess what a page covers from its URL, and that URL should never change without a redirect.",
        },
        {
          type: "list",
          items: [
            "Use lowercase words separated by hyphens, such as `/teeth-whitening-cost`.",
            "Keep dates, session IDs and unnecessary parameters out of permanent pages.",
            "Keep folders shallow and meaningful, such as `/services/teeth-whitening`.",
            "Pick one version for protocol, `www` and trailing slashes, and redirect the others to it.",
          ],
        },
        {
          type: "p",
          text: "The canonical tag, `<link rel=\"canonical\">`, tells search engines which URL you prefer when similar content exists at several addresses, such as filtered or tracked versions of a page. It is a strong hint rather than a directive, so Google may choose a different canonical if your links, redirects and sitemap point somewhere else. Most indexable pages should declare a self-referencing canonical, and every other signal should agree with it.",
        },
      ],
    },
    {
      id: "conversion-focused-structure",
      heading: "How should a page be structured to convert visitors?",
      blocks: [
        {
          type: "p",
          text: "Structure a page so visitors see what you offer, who it is for and what to do next within the first screen, then find proof and detail as they scroll. Search brings the visit; the structure of the page decides whether it becomes an inquiry.",
        },
        {
          type: "list",
          items: [
            "**Clear opening:** a headline that matches the search, a one-line value statement and a primary call to action.",
            "**Evidence:** real examples, process details, credentials or reviews, used honestly and in context.",
            "**Objection handling:** pricing guidance, timelines and answers to the questions buyers actually ask.",
            "**Specific calls to action:** repeated after key sections, with wording that says exactly what happens next.",
            "**Short forms:** only the fields you genuinely need, plus a clear expectation of when you will reply.",
          ],
        },
        {
          type: "p",
          text: "These elements help search performance indirectly too. A page that answers questions completely tends to satisfy the search, which is the outcome ranking systems are built to reward. We review layouts on real phones, because that is where many visitors first meet a business.",
        },
      ],
    },
    {
      id: "structured-data-on-the-page",
      heading: "When should structured data be added to a page?",
      blocks: [
        {
          type: "p",
          text: "Add structured data when it accurately describes content that is visible on the page and matches a type search engines use, such as Organization, LocalBusiness, Product, Article or BreadcrumbList. It helps machines interpret the page and can make it eligible for rich results, but it never guarantees them and never replaces clear content.",
        },
        {
          type: "code",
          lang: "html",
          caption: "BreadcrumbList markup for a service page",
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Services",
      "item": "https://www.example.com/services"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Teeth whitening",
      "item": "https://www.example.com/services/teeth-whitening"
    }
  ]
}
</script>`,
        },
        {
          type: "p",
          text: "For a local business, LocalBusiness markup that repeats the name, address, phone number and opening hours shown on the page is usually the most useful place to start. We avoid markup for its own sake. FAQ markup, for example, no longer produces FAQ rich results for most businesses, and marking up reviews or prices that visitors cannot see breaks Google's guidelines. Every snippet we add is checked in the [Rich Results Test](https://search.google.com/test/rich-results) before it goes live.",
        },
      ],
    },
    {
      id: "on-page-seo-checklist",
      heading: "A practical on-page SEO checklist",
      blocks: [
        {
          type: "p",
          text: "Run through this checklist before a page goes live and whenever it is substantially edited. Each item takes minutes to check, and together they catch most of the on-page problems we find in audits.",
        },
        {
          type: "checklist",
          title: "Before you publish",
          items: [
            "The page targets one search intent, and no other page on the site competes for it.",
            "The title tag is unique, descriptive and natural, with the main topic near the start.",
            "The meta description summarizes the page honestly and gives a reason to click.",
            "There is one H1, and the H2s and H3s form a logical outline without repeated phrasing.",
            "The direct answer or offer appears early, and every factual claim is accurate and current.",
            "There is no keyword stuffing, no hidden text and no copy written only for crawlers.",
            "Body copy links to related pages with descriptive anchors, and at least one relevant page links here.",
            "Images have meaningful alt text, set dimensions and a sensible file size.",
            "The URL is short and readable, and the canonical tag points to the preferred version.",
            "Any structured data matches visible content and passes validation.",
            "The primary call to action is easy to find on a phone.",
          ],
        },
      ],
    },
  ],
  engagement: [
    {
      title: "Audit and intent map",
      text: "We review your priority pages, what ranks for their searches and how they perform in Search Console, then build a keyword-to-page map that shows gaps, overlaps and quick wins.",
    },
    {
      title: "Prioritized plan",
      text: "You get a plain-language plan ranked by likely impact and effort, with page-by-page recommendations for titles, headings, content, links, images and markup.",
    },
    {
      title: "Implementation",
      text: "We write and ship the changes in your CMS or codebase, or work alongside your developers, so recommendations actually reach the live site.",
    },
    {
      title: "Verify and refine",
      text: "After release we confirm the changes are crawled and indexed correctly, track impressions, clicks and inquiries, and refine pages based on what the data shows.",
    },
  ],
  faqs: [
    {
      question: "How many keywords should one page target?",
      answer:
        "A page should target one primary intent, which can include many related phrasings of the same question. Searches that need a different answer belong on a different page. Forcing unrelated keywords onto one page usually weakens it for all of them.",
    },
    {
      question: "Is there an ideal word count for SEO?",
      answer:
        "No. The right length is whatever fully answers the search without padding; some searches need a short, direct page and others need a thorough guide. Studying what the strongest current results cover is a better guide than any fixed number.",
    },
    {
      question: "Should we change the published date every time we edit a page?",
      answer:
        "Only when the edit is substantive, such as new information, revised advice or updated prices. Changing dates for cosmetic edits misleads readers and does not make a page more useful. When you do make a real update, show the new date clearly.",
    },
    {
      question: "Can you work on our existing website platform?",
      answer:
        "In most cases, yes. We work in common content management systems as well as custom-built sites, including Next.js and other React frameworks. If a platform limits what can be changed, such as headings locked in a theme, we explain the trade-off and the options.",
    },
    {
      question: "What do you need from us to get started?",
      answer:
        "Access to Google Search Console and your analytics, a list of the services or products that matter most, and someone who can answer questions about your offer and customers. CMS or repository access helps if you want us to implement changes directly.",
    },
  ],
  related: ["seo-standards", "technical-seo", "off-page-seo", "aeo", "web-development"],
  updated: "2026-10-19",
};
