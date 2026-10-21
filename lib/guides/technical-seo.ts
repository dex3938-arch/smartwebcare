import type { Guide } from "./types";

export const guide: Guide = {
  slug: "technical-seo",
  kind: "service",
  navLabel: "Technical SEO",
  metaTitle: "Technical SEO Audits and Fixes | SmartWebCare",
  metaDescription:
    "Technical SEO audits and fixes for crawling, indexing, redirects, canonicals, sitemaps, JavaScript rendering and Core Web Vitals, using a transparent method.",
  eyebrow: "SEO service",
  title: "Technical SEO: a site search engines can crawl, render and trust",
  lead:
    "Technical SEO makes sure search engines can reach every page that matters, interpret it correctly and leave out the pages that should not appear. We audit with a transparent method, fix issues in code, and add checks so future releases do not undo the work.",
  summary: [
    "Technical SEO decides whether your pages can be crawled, rendered and indexed at all, which makes it the foundation for every other kind of SEO.",
    "Status codes, redirects, canonicals, robots rules and sitemaps must send consistent signals, because conflicting signals leave the decision to search engines.",
    "Server-rendered HTML is the most reliable way to make content visible to Google and to crawlers that do not run JavaScript.",
    "Core Web Vitals should be judged on field data from real users, not on a single lab score.",
    "Technical health erodes with every release unless checks are built into how the site ships.",
  ],
  sections: [
    {
      id: "what-is-technical-seo",
      heading: "What is technical SEO?",
      blocks: [
        {
          type: "p",
          text: "Technical SEO is the work of making a website's infrastructure easy for search engines to crawl, render, index and evaluate. It covers the server, the HTML that server sends, the way URLs behave and the signals that tell crawlers which pages matter.",
        },
        {
          type: "p",
          text: "It is mostly invisible to visitors, which is why problems persist. A site can look perfect in a browser while sending crawlers error codes, duplicate URLs, contradictory canonicals or near-empty HTML that only fills in after JavaScript runs. Because most of these issues live in templates and configuration, one fix often repairs thousands of pages, and one careless release can break them just as quickly.",
        },
        {
          type: "p",
          text: "Technical SEO supports the other layers rather than replacing them. It gives [on-page](/on-page-seo) work a fair chance to be seen, and it is a prerequisite for [AEO](/aeo) and [GEO](/geo), since answer engines and AI systems can only use what they can fetch and parse. Our [SEO standards](/seo-standards) guide shows how the layers fit together.",
        },
      ],
    },
    {
      id: "crawlability-and-indexability",
      heading: "What is the difference between crawlability and indexability?",
      blocks: [
        {
          type: "p",
          text: "Crawlability is whether search engines can find and fetch a page; indexability is whether, once fetched, the page is allowed and judged worth storing in the index. A page needs both, and being crawled never guarantees being indexed.",
        },
        {
          type: "p",
          text: "Crawlers discover pages mainly by following links, so internal link structure is the backbone of crawlability. Important pages should be reachable within a few clicks of the home page through standard `<a href>` links, not only through search boxes, filters or script-driven buttons. Orphan pages, which no internal link points to, may still be found through a sitemap but receive little signal about their importance.",
        },
        {
          type: "list",
          items: [
            "**Crawl blockers:** robots.txt disallow rules, login walls, server errors, timeouts and links that are not real anchors.",
            "**Index blockers:** `noindex` directives, canonicals pointing elsewhere, soft 404s and content judged duplicate or thin.",
            "**Wasted crawling:** endless parameter combinations, faceted filters, calendar pages and redirect chains.",
          ],
        },
        {
          type: "p",
          text: "The URL Inspection tool in [Google Search Console](https://search.google.com/search-console) shows when Google last crawled a URL, whether it is indexed and which canonical it selected.",
        },
      ],
    },
    {
      id: "status-codes-and-redirects",
      heading: "Which HTTP status codes and redirects should a site use?",
      blocks: [
        {
          type: "p",
          text: "Every URL should return the status code that matches its real state: `200` for live pages, a permanent redirect for moved content, and `404` or `410` for content that is gone. A page that says \"not found\" while returning `200`, known as a soft 404, sends search engines a confusing signal.",
        },
        {
          type: "table",
          caption: "Status codes that matter for SEO",
          columns: ["Code", "Meaning", "Use it when"],
          rows: [
            ["200", "OK, served normally", "The page is live and should be crawled"],
            ["301 or 308", "Moved permanently", "Content now lives at a new URL for good"],
            ["302 or 307", "Moved temporarily", "A short-term move, such as a seasonal page"],
            ["404", "Not found", "The URL has no content and no replacement"],
            ["410", "Gone", "You removed the content intentionally"],
            ["5xx", "Server error", "Never on purpose; use 503 with Retry-After for planned maintenance"],
          ],
        },
        {
          type: "p",
          text: "Redirect each old URL straight to its final destination in one hop. Chains, where A redirects to B and B to C, slow visitors and waste crawling; loops, where URLs redirect to each other, make pages unreachable. After a migration, update internal links to point at final URLs instead of leaning on redirects.",
        },
        {
          type: "code",
          lang: "nginx",
          caption: "A single-hop permanent redirect in nginx",
          code: `# Send the retired URL straight to its final destination
location = /old-pricing {
    return 301 https://www.example.com/pricing;
}`,
        },
        {
          type: "p",
          text: "In Next.js, a redirect configured with `permanent: true` returns `308`, which Google treats the same way as `301`.",
        },
      ],
    },
    {
      id: "canonicals-duplicates-and-hreflang",
      heading: "How should canonicals, duplicates and international versions be handled?",
      blocks: [
        {
          type: "p",
          text: "Handle duplicates by choosing one preferred URL for each piece of content and making every signal agree with it: redirects, internal links, the sitemap and a `rel=\"canonical\"` tag. The canonical tag is a strong hint, not a directive, so Google may pick a different URL when those signals conflict. Common sources of duplication include:",
        },
        {
          type: "list",
          items: [
            "Protocol and host variants, such as `http` and `https`, or `www` and non-`www`.",
            "Trailing slash, letter case and index-file variants of the same path.",
            "Tracking, sorting and filter parameters that do not change the main content.",
            "Print versions, staging copies left open to crawlers and syndicated articles.",
          ],
        },
        {
          type: "p",
          text: "Duplication is rarely a penalty; the cost is diluted signals and Google choosing a version you did not intend. Sites with the same content in several languages or for several regions also need `hreflang` annotations. Each version lists every alternate, including itself, the annotations must be reciprocal, and each version keeps a self-referencing canonical rather than pointing to another language.",
        },
        {
          type: "code",
          lang: "html",
          caption: "hreflang for English (India), English (United States) and a default page",
          code: `<link rel="canonical" href="https://www.example.com/en-in/pricing" />
<link rel="alternate" hreflang="en-IN" href="https://www.example.com/en-in/pricing" />
<link rel="alternate" hreflang="en-US" href="https://www.example.com/en-us/pricing" />
<link rel="alternate" hreflang="x-default" href="https://www.example.com/pricing" />`,
        },
      ],
    },
    {
      id: "robots-directives",
      heading: "What is the difference between robots.txt, meta robots and X-Robots-Tag?",
      blocks: [
        {
          type: "p",
          text: "robots.txt controls whether crawlers may fetch a URL, while the meta robots tag and the X-Robots-Tag HTTP header control whether a fetched resource may be indexed or shown in results. They solve different problems and are often confused. robots.txt follows the Robots Exclusion Protocol, standardized in 2022 as [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309).",
        },
        {
          type: "table",
          caption: "Choosing the right robots control",
          columns: ["Control", "Where it lives", "Best for"],
          rows: [
            ["robots.txt", "A file at the root of each host", "Keeping crawlers out of low-value areas such as internal search results"],
            ["Meta robots tag", "The `<head>` of an HTML page", "Keeping a specific page out of the index with `noindex`"],
            ["X-Robots-Tag header", "The HTTP response headers", "Applying `noindex` to PDFs, images and other non-HTML files"],
          ],
        },
        {
          type: "code",
          lang: "text",
          caption: "A simple robots.txt",
          code: `User-agent: *
Disallow: /internal/
Disallow: /search

Sitemap: https://www.example.com/sitemap.xml`,
        },
        {
          type: "callout",
          tone: "warn",
          title: "Blocking is not removing",
          text: "A URL disallowed in robots.txt can still be indexed, without its content, if other pages link to it. Google has not supported `noindex` inside robots.txt since 2019, and a `noindex` tag only works if crawlers may fetch the page and see it. To remove a page, allow crawling and serve `noindex`, or delete it and return `404` or `410`.",
        },
        {
          type: "p",
          text: "In the Next.js App Router, `app/robots.ts` generates the file through the Metadata API. Our [robots.txt guide](/robots-txt) covers syntax, user agents and common mistakes.",
        },
      ],
    },
    {
      id: "xml-sitemaps",
      heading: "What should an XML sitemap contain?",
      blocks: [
        {
          type: "p",
          text: "An XML sitemap should list only the canonical, indexable URLs you want search engines to find, each returning `200`, with an accurate last-modified date where you can provide one. It helps discovery, especially for new or deeply nested pages, but it does not force anything into the index.",
        },
        {
          type: "list",
          items: [
            "Each file can hold up to 50,000 URLs or 50 MB uncompressed; larger sites use a sitemap index that lists several files.",
            "Google ignores `<priority>` and `<changefreq>`, and uses `<lastmod>` only when it is consistently accurate.",
            "Redirects, `noindex` pages, error pages and parameter duplicates stay out.",
            "The sitemap is referenced in robots.txt and submitted in Search Console.",
          ],
        },
        {
          type: "code",
          lang: "ts",
          caption: "Generating sitemap.xml from app/sitemap.ts in the Next.js App Router",
          code: `import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.example.com/",
      lastModified: new Date("2026-10-01"),
    },
    {
      url: "https://www.example.com/services",
      lastModified: new Date("2026-09-12"),
    },
  ];
}`,
        },
        {
          type: "p",
          text: "The format is defined by the [sitemaps protocol](https://www.sitemaps.org/protocol.html), and our [XML sitemap guide](/xml-sitemap) explains structure and generation in more depth.",
        },
      ],
    },
    {
      id: "javascript-rendering",
      heading: "How does JavaScript affect crawling and indexing?",
      blocks: [
        {
          type: "p",
          text: "JavaScript can delay or hide content from search engines, so the safest approach is to send important content and links in server-rendered HTML. Google does render JavaScript with a recent version of Chromium, but rendering can happen after the initial crawl, and anything that depends on user interaction, such as a tab that fetches content when clicked, may never be seen.",
        },
        {
          type: "p",
          text: "Other crawlers are less capable. Some search engines render JavaScript less consistently, and many AI crawlers fetch the raw HTML without executing scripts at all, so content that exists only after client-side rendering may be invisible to the systems that generate AI answers.",
        },
        {
          type: "list",
          items: [
            "Use server-side rendering or static generation for indexable pages; in the Next.js App Router, server rendering is the default.",
            "Put titles, meta tags, canonicals and structured data in the initial HTML rather than injecting them later.",
            "Use real `<a href>` links for navigation, not click handlers on other elements.",
            "Return proper status codes from the server; a client-rendered \"not found\" message on a `200` response is a soft 404.",
            "Compare the raw HTML with the rendered page to spot content that only appears after scripts run.",
          ],
        },
        {
          type: "p",
          text: "When a rebuild is the better answer, our [web development](/web-development) team builds on server-rendered architecture from the start.",
        },
      ],
    },
    {
      id: "structured-data-validation",
      heading: "How should structured data be validated?",
      blocks: [
        {
          type: "p",
          text: "Validate structured data at two levels: first confirm it is syntactically correct schema.org markup, then confirm it meets the requirements of any Google feature you are targeting. The [Schema Markup Validator](https://validator.schema.org) handles the first check, and the [Rich Results Test](https://search.google.com/test/rich-results) handles the second.",
        },
        {
          type: "list",
          items: [
            "Markup describes content that is visible on the page, with matching names, prices and dates.",
            "Required properties for the target feature are present, and recommended ones are added where accurate.",
            "Template-generated markup is tested on several page types, not on one sample URL.",
            "Search Console's rich result reports are checked for new errors after each release.",
          ],
        },
        {
          type: "p",
          text: "Valid markup makes a page eligible for rich results; it never guarantees them. Google also retires and restricts features, as it did with FAQ and HowTo rich results in 2023, so we prioritize types that describe your business and content accurately over short-lived visual features.",
        },
      ],
    },
    {
      id: "core-web-vitals-and-mobile-usability",
      heading: "How do Core Web Vitals and mobile usability affect technical SEO?",
      blocks: [
        {
          type: "p",
          text: "Core Web Vitals measure real-user loading, responsiveness and visual stability and form part of Google's page experience signals, while mobile usability matters because Google uses mobile-first indexing and evaluates mainly the mobile version of each page. Both are technical concerns because they depend on code, hosting and how assets are delivered.",
        },
        {
          type: "table",
          caption: "Good thresholds at the 75th percentile of real-user visits",
          columns: ["Metric", "Good", "Common causes when it fails"],
          rows: [
            ["LCP", "2.5 s or less", "Slow server response, render-blocking resources, large or lazy-loaded hero images"],
            ["INP", "200 ms or less", "Heavy JavaScript, long main-thread tasks, expensive event handlers"],
            ["CLS", "0.1 or less", "Images and embeds without dimensions, late font swaps, injected banners"],
          ],
        },
        {
          type: "p",
          text: "INP replaced First Input Delay as a Core Web Vital in March 2024. We diagnose with lab tools such as Lighthouse but judge success on field data from the Chrome UX Report, shown in [PageSpeed Insights](https://pagespeed.web.dev) and Search Console, because a strong lab score does not prove that real visitors have a good experience. The metrics are defined on [web.dev](https://web.dev/articles/vitals).",
        },
        {
          type: "p",
          text: "For mobile, we check that content, links, structured data and metadata match between mobile and desktop, that tap targets are usable, and that nothing important hides behind interactions a crawler will not perform.",
        },
      ],
    },
    {
      id: "audit-methodology",
      heading: "How does our technical SEO audit work?",
      blocks: [
        {
          type: "p",
          text: "Our audit combines what search engines report, what a crawler finds and what the code actually does, then ranks every issue by impact and effort so you know what to fix first. We share the evidence behind each finding, so your team can verify it rather than take our word for it.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Collect search engine data",
              text: "We review Search Console's indexing, performance, Core Web Vitals and rich result reports, plus server logs where available, to see how crawlers actually behave on your site.",
            },
            {
              title: "Crawl the site two ways",
              text: "We crawl with and without JavaScript rendering, comparing raw and rendered HTML, status codes, canonicals, directives, internal links and sitemap coverage.",
            },
            {
              title: "Trace issues to their source",
              text: "We connect each issue to the template, configuration or component that causes it, so one fix covers every affected page.",
            },
            {
              title: "Prioritize and document",
              text: "Every finding comes with evidence, affected URLs, a recommended fix, an effort estimate and a severity rating, written plainly for owners and in detail for developers.",
            },
          ],
        },
        {
          type: "p",
          text: "We do not pad reports with tool warnings that make no practical difference. If an issue is unlikely to affect crawling, indexing or users, we say so.",
        },
      ],
    },
    {
      id: "monitoring-and-release-checks",
      heading: "How do you keep technical SEO from breaking after launch?",
      blocks: [
        {
          type: "p",
          text: "You keep technical SEO healthy by checking every release for regressions and watching search data for early warnings, because most technical problems arrive with routine deploys rather than search engine updates. A staging `noindex` copied to production or a changed routing rule can quietly remove pages from results.",
        },
        {
          type: "checklist",
          title: "Release verification checklist",
          items: [
            "Key templates return `200` with the expected HTML, including titles, canonicals and main content.",
            "No unintended `noindex` tags or X-Robots-Tag headers have appeared.",
            "robots.txt is unchanged, or any change was intentional and reviewed.",
            "Changed or removed URLs redirect in one hop to the right destination.",
            "The sitemap lists only live, canonical URLs, with accurate `lastmod` dates.",
            "Structured data on changed templates passes validation.",
            "Internal links point to final URLs, and no new broken links have appeared.",
            "Lab checks show no major Core Web Vitals regression on key templates.",
            "hreflang annotations are still reciprocal, if the site has international versions.",
          ],
        },
        {
          type: "p",
          text: "After each release we watch Search Console for drops in indexed pages, spikes in errors and shifts in Core Web Vitals field data.",
        },
      ],
    },
  ],
  engagement: [
    {
      title: "Access and baseline",
      text: "We get read access to Search Console, analytics and, where possible, your hosting or repository, and record a baseline of indexing, performance and Core Web Vitals.",
    },
    {
      title: "Audit and prioritized plan",
      text: "We run the audit described above and deliver a ranked list of fixes with evidence, so you can see why each one matters before committing time to it.",
    },
    {
      title: "Implementation",
      text: "We fix issues directly in your codebase or CMS, or brief and review the work with your developers, testing on staging before anything is released.",
    },
    {
      title: "Verification and monitoring",
      text: "We confirm fixes through live crawls and Search Console, then set up release checks and ongoing monitoring so the improvements hold.",
    },
  ],
  faqs: [
    {
      question: "How often should a technical SEO audit be done?",
      answer:
        "A full audit makes sense before and after major changes such as a redesign, migration or platform switch, and periodically for large or frequently updated sites. Between audits, release checks and Search Console monitoring catch most problems early. Small, stable sites need full audits less often than large catalogs.",
    },
    {
      question: "Do we need a perfect Lighthouse score?",
      answer:
        "No. Lighthouse is a lab test on a simulated device, useful for finding causes, but it is not how Google assesses real experience. Aim for good Core Web Vitals in field data on your important templates, and fix issues that affect real users before polishing a score.",
    },
    {
      question: "Will a site migration hurt our rankings?",
      answer:
        "Every migration carries risk, because search engines have to recrawl and reprocess each changed URL. Careful redirect mapping, keeping content stable where possible, updating internal links and sitemaps, and close monitoring after launch reduce that risk considerably. Some temporary fluctuation is common even when everything is done well.",
    },
    {
      question: "Should we block AI crawlers in robots.txt?",
      answer:
        "It is a business decision rather than a technical rule. Blocking a crawler can keep your content out of some AI products, but it can also keep you out of answers your customers read, and robots.txt only works for crawlers that choose to respect it. We help you decide crawler by crawler, based on your goals for AI visibility.",
    },
    {
      question: "Do you need access to our code?",
      answer:
        "Not always. Many issues can be diagnosed from the outside and fixed through a CMS, but template, routing and rendering problems usually need repository or developer access. Read access is enough for the audit; write access is only needed if you want us to implement fixes.",
    },
  ],
  related: ["seo-standards", "on-page-seo", "xml-sitemap", "robots-txt", "web-development"],
  updated: "2026-10-19",
};
