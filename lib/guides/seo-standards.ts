import type { Guide } from "./types";

export const guide: Guide = {
  slug: "seo-standards",
  kind: "resource",
  navLabel: "SEO Standards",
  metaTitle: "SEO Standards: A Practical Framework | SmartWebCare",
  metaDescription:
    "How search engines crawl, index and rank pages, and the technical, on-page and off-page standards we use to build and audit sites that search can trust.",
  eyebrow: "SEO resource",
  title: "SEO standards: how search works and what good looks like",
  lead:
    "Search engine optimization is less about tricks and more about removing doubt: can a search engine reach the page, understand it, and trust it enough to show it? This guide explains the whole framework and links to our detailed pages on each layer.",
  summary: [
    "SEO is the practice of making pages easy for search engines to crawl, understand and trust, and worth choosing for the people who see them in results.",
    "Search works as a pipeline of crawling, rendering, indexing and ranking, and a page that fails at one stage never reaches the next.",
    "Technical, on-page and off-page SEO are three layers of one job, and weakness in any layer caps what the others can achieve.",
    "Nobody controls rankings, so honest SEO focuses on removing barriers and publishing content that genuinely satisfies the search.",
  ],
  sections: [
    {
      id: "what-is-seo",
      heading: "What is SEO?",
      blocks: [
        {
          type: "p",
          text: "SEO, or search engine optimization, is the work of helping the right pages appear in organic, unpaid search results for the people most likely to need them. It sits between three parties: the business that publishes the page, the search engine deciding what to show, and the person typing the query. Good SEO serves all three at once, which is why shortcuts that fool one of them rarely last.",
        },
        {
          type: "p",
          text: "In practice, SEO is a set of standards rather than a single task. Some standards are mechanical: a page must return the right status code, load quickly and be reachable through links. Others are editorial: the page must answer the question better than the alternatives and make clear who stands behind the answer. The rest depend on what other people say about you across the web.",
        },
        {
          type: "p",
          text: "We group that work into three layers, technical, on-page and off-page, each summarized below with a link to its detailed page. The same foundations also support direct answers and AI-generated summaries, which we cover separately under [answer engine optimization](/aeo) and [generative engine optimization](/geo).",
        },
      ],
    },
    {
      id: "how-search-works",
      heading: "How does search actually work?",
      blocks: [
        {
          type: "p",
          text: "Search engines work in four stages: they crawl the web to find pages, render them to see the content, index what they understand, and then rank and serve results when someone searches. Each stage is a filter, and passing one does not guarantee the next. A page can be crawled and never indexed, or indexed and rarely shown.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Crawl",
              text: "Automated crawlers such as Googlebot discover URLs through links, sitemaps and pages they already know, then request them. Server errors, blocked paths and slow responses all reduce how much of a site gets crawled.",
            },
            {
              title: "Render",
              text: "The crawler processes the HTML and, where needed, runs JavaScript to see the finished page. Content that only appears after a click or other user interaction may never be seen.",
            },
            {
              title: "Index",
              text: "The search engine analyzes the content, picks a canonical version among duplicates and decides whether the page is worth storing. Thin, duplicated or blocked pages are often left out.",
            },
            {
              title: "Rank and serve",
              text: "When someone searches, ranking systems weigh many signals, including relevance, quality, usability and location, to order results for that query, that person and that moment.",
            },
          ],
        },
        {
          type: "p",
          text: "Google documents this process openly in [Google Search Central](https://developers.google.com/search/docs), which remains the most reliable reference for how its systems behave. Other search engines differ in detail but follow the same broad pattern.",
        },
      ],
    },
    {
      id: "technical-seo-overview",
      heading: "What does technical SEO cover?",
      blocks: [
        {
          type: "p",
          text: "Technical SEO covers everything that determines whether search engines can reach, render and correctly interpret a site: server responses, redirects, canonical tags, robots rules, sitemaps, JavaScript rendering, speed and mobile behavior. It is the foundation, because content that cannot be crawled or indexed cannot rank, however good it is.",
        },
        {
          type: "p",
          text: "Most technical problems are invisible to visitors. A product page can look perfect in a browser while returning a soft 404 to crawlers, pointing its canonical tag at the home page, or loading its main text only after a script runs. These issues usually come from templates, so one mistake can affect thousands of URLs at once. A healthy baseline looks like this:",
        },
        {
          type: "list",
          items: [
            "Every important page returns a `200` status, and every retired page redirects or returns `404` or `410` on purpose.",
            "Each piece of content has one preferred URL, signaled consistently by links, canonical tags and the sitemap.",
            "Primary content and links are present in the HTML the server sends, not only after client-side scripts run.",
            "Releases are checked so a deploy cannot silently add `noindex` or block a whole section.",
          ],
        },
        {
          type: "p",
          text: "Our [technical SEO](/technical-seo) page covers each of these in depth, including our audit methodology and release checklist.",
        },
      ],
    },
    {
      id: "on-page-seo-overview",
      heading: "What does on-page SEO cover?",
      blocks: [
        {
          type: "p",
          text: "On-page SEO covers everything on the page itself that helps search engines and people understand what it is about and whether it answers the query: the title tag, meta description, headings, body content, images, internal links, URL and structured data. It is where search intent meets your writing and design.",
        },
        {
          type: "p",
          text: "The core discipline is giving each page one clear purpose. A page that tries to rank for a service, a price comparison and a beginner's tutorial at once usually does none of them well. Once the purpose is settled, the elements line up behind it: a descriptive title, a single H1, logical subheadings, original copy and images with meaningful alt text.",
        },
        {
          type: "p",
          text: "On-page work also has a commercial side. A page that ranks but never converts is a reporting win and a business loss, so we plan structure, calls to action and proof points alongside the search elements. See [on-page SEO](/on-page-seo) for our checklist and how an engagement runs.",
        },
      ],
    },
    {
      id: "off-page-seo-overview",
      heading: "What does off-page SEO cover?",
      blocks: [
        {
          type: "p",
          text: "Off-page SEO covers the signals that form outside your website: links from other sites, mentions of your brand, business listings, reviews and the referral traffic those sources send. Because you do not control these signals directly, they are harder to fake and carry weight as evidence of real-world reputation.",
        },
        {
          type: "p",
          text: "Links remain the best-known off-page signal. A relevant site linking to your research, tool or guide is a form of editorial endorsement, and search engines use links to discover pages as well as to judge them. That is exactly why buying links or trading them at scale is prohibited under Google's [spam policies](https://developers.google.com/search/docs/essentials/spam-policies).",
        },
        {
          type: "p",
          text: "The sustainable approach is to earn attention: publish something worth citing, build genuine industry relationships, keep listings accurate and look after your reviews. Our [off-page SEO](/off-page-seo) page explains how we do that within the rules, and [reputation management](/reputation-management) covers reviews and public feedback in more detail.",
        },
      ],
    },
    {
      id: "content-quality-and-intent",
      heading: "How do content quality and search intent fit together?",
      blocks: [
        {
          type: "p",
          text: "Search intent is the reason behind a search, and content quality is how well a page serves that reason; the pages that perform best get both right. A beautifully written article still fails if the searcher wanted a price, an address or a product to buy.",
        },
        {
          type: "table",
          caption: "Common types of search intent",
          columns: ["Intent", "What the searcher wants", "Page that usually fits"],
          rows: [
            ["Informational", "To learn or understand something", "Guide, explainer or how-to article"],
            ["Commercial", "To compare options before deciding", "Comparison or detailed service page"],
            ["Transactional", "To buy, book or sign up", "Product, pricing or booking page"],
            ["Navigational", "To reach a specific brand or page", "Home, login or contact page"],
            ["Local", "A provider in or near a place", "Location page or business profile"],
          ],
        },
        {
          type: "p",
          text: "Google's Search Quality Rater Guidelines describe quality through E-E-A-T: Experience, Expertise, Authoritativeness and Trustworthiness. It is a framework human raters use to evaluate results, not a single ranking factor you can switch on. In practice it rewards what readers already value: first-hand detail, accurate claims, clear authorship and honest information about who runs the site and how to reach them.",
        },
      ],
    },
    {
      id: "structured-data",
      heading: "What does structured data do?",
      blocks: [
        {
          type: "p",
          text: "Structured data is code, usually JSON-LD, that describes a page's content using the shared [schema.org](https://schema.org) vocabulary so search engines can interpret it without guessing. It can make a page eligible for rich results, such as product details or breadcrumbs, but eligibility never guarantees that Google will show them.",
        },
        {
          type: "code",
          lang: "html",
          caption: "A minimal Organization snippet in JSON-LD",
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Example Studio",
  "url": "https://www.example.com",
  "logo": "https://www.example.com/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/example-studio"
  ]
}
</script>`,
        },
        {
          type: "p",
          text: "Two rules matter most. First, markup must describe what is visible on the page; marking up reviews, prices or questions that users cannot see breaks Google's guidelines. Second, rich result features change. Since August 2023 Google shows FAQ rich results only for well-known, authoritative government and health sites, and HowTo rich results were removed in 2023, so FAQ markup alone is no reason to expect extra space in results.",
        },
        {
          type: "p",
          text: "Check markup with the [Rich Results Test](https://search.google.com/test/rich-results) for Google features and the [Schema Markup Validator](https://validator.schema.org) for general correctness.",
        },
      ],
    },
    {
      id: "indexability-and-crawlability",
      heading: "How do you make sure pages can be crawled and indexed?",
      blocks: [
        {
          type: "p",
          text: "You make pages crawlable by letting crawlers reach them through normal links and an accurate sitemap, and indexable by sending clear signals that each page is the preferred version and allowed in the index. The controls overlap, and mixing them up is one of the most common reasons pages go missing.",
        },
        {
          type: "table",
          caption: "Which control does what",
          columns: ["Control", "What it controls", "Common mistake"],
          rows: [
            ["robots.txt", "Whether crawlers may request a URL", "Using it to hide pages; a blocked URL can still be indexed without its content if other pages link to it"],
            ["Meta robots or X-Robots-Tag `noindex`", "Whether a crawled page may appear in results", "Also blocking the page in robots.txt, so the `noindex` is never seen"],
            ["`rel=\"canonical\"`", "Which duplicate you prefer", "Treating it as a command; Google may choose a different canonical"],
            ["XML sitemap", "Which URLs you want discovered", "Listing redirected, noindexed or broken URLs"],
          ],
        },
        {
          type: "p",
          text: "Google stopped supporting `noindex` rules inside robots.txt in 2019, so keeping a page out of results requires a `noindex` meta tag or header on a page crawlers can still fetch. Our guides to [robots.txt](/robots-txt) and [XML sitemaps](/xml-sitemap) cover syntax and examples, and the Page indexing report in [Google Search Console](https://search.google.com/search-console) shows which pages are indexed and why others are not.",
        },
      ],
    },
    {
      id: "core-web-vitals-and-mobile",
      heading: "Why do Core Web Vitals and mobile usability matter?",
      blocks: [
        {
          type: "p",
          text: "Core Web Vitals matter because they measure how real visitors experience loading, responsiveness and visual stability, and Google's ranking systems use them as part of page experience. They rarely outweigh relevance, but a poor experience is a disadvantage between similarly useful pages, and it costs conversions whatever your rankings.",
        },
        {
          type: "table",
          caption: "Core Web Vitals \"good\" thresholds, measured at the 75th percentile of real visits",
          columns: ["Metric", "What it measures", "Good"],
          rows: [
            ["Largest Contentful Paint (LCP)", "How quickly the main content appears", "2.5 seconds or less"],
            ["Interaction to Next Paint (INP)", "How quickly the page responds to input", "200 milliseconds or less"],
            ["Cumulative Layout Shift (CLS)", "How much the layout moves unexpectedly", "0.1 or less"],
          ],
        },
        {
          type: "p",
          text: "INP replaced First Input Delay as a Core Web Vital in March 2024. Lab tools such as Lighthouse help with debugging, but field data from the Chrome UX Report, shown in [PageSpeed Insights](https://pagespeed.web.dev) and Search Console, is what reflects real users. The metric definitions are maintained on [web.dev](https://web.dev/articles/vitals).",
        },
        {
          type: "p",
          text: "Mobile matters even more directly. Google uses mobile-first indexing, so the mobile version of a page is the one it primarily crawls and evaluates. Content, links or structured data that exist only on desktop may as well not exist.",
        },
      ],
    },
    {
      id: "monitoring-and-reporting",
      heading: "How should SEO be monitored and reported?",
      blocks: [
        {
          type: "p",
          text: "SEO should be monitored continuously for problems and reported periodically against business outcomes, not just rankings. Positions move daily, vary by location and device, and sit among ads, maps and AI-generated answers, so a single ranking number tells you little on its own.",
        },
        {
          type: "list",
          items: [
            "**Index health:** indexed versus excluded pages, crawl errors and the canonicals Google selects.",
            "**Search performance:** impressions, clicks and click-through rate by page and query group.",
            "**Experience:** Core Web Vitals field data and mobile issues on key templates.",
            "**Outcomes:** leads, sales or sign-ups from organic visits, tracked in your analytics.",
            "**Change log:** releases, content updates and migrations, so movements can be explained.",
          ],
        },
        {
          type: "p",
          text: "Monthly reporting suits most businesses, with alerts for sudden drops in indexed pages or traffic in between. Every report should say what changed, why we think it changed and what happens next. When organic search runs alongside paid campaigns, reviewing both together avoids crediting the wrong channel for a lead.",
        },
      ],
    },
    {
      id: "common-seo-mistakes",
      heading: "What are the most common SEO mistakes?",
      blocks: [
        {
          type: "p",
          text: "The most common SEO mistakes are not exotic penalties; they are ordinary oversights that quietly stop good pages from competing. These are the ones we see most often in audits:",
        },
        {
          type: "list",
          items: [
            "Launching a redesign or migration without mapping old URLs to new ones with `301` redirects.",
            "Leaving a staging `noindex` tag or a blanket robots.txt block in place after launch.",
            "Publishing many near-identical pages, such as city pages with only the place name swapped.",
            "Writing for a keyword instead of a person, which produces stuffed, repetitive copy.",
            "Relying on client-side JavaScript to render core content and navigation.",
            "Buying links or joining link exchanges, which breaks Google's spam policies and can lead to a manual action.",
            "Judging success by rankings for vanity terms rather than qualified traffic and inquiries.",
            "Treating SEO as a one-off project, so fixes erode with every release.",
          ],
        },
        {
          type: "p",
          text: "If you are not sure where your site stands, an audit is the quickest way to find out. We review technical health, on-page quality and off-page signals together, then hand you a prioritized plan in plain language. [Request an SEO audit](/contact) or [book a consultation](/book-consultation) to talk it through.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How long does SEO take to show results?",
      answer:
        "It depends on how healthy the site is, how competitive the searches are and how often search engines recrawl your pages. Technical fixes can take effect once the affected pages are recrawled, while content and authority usually build over months rather than weeks. Anyone who quotes a fixed timeline without looking at your site is guessing.",
    },
    {
      question: "Can any agency guarantee first-page rankings?",
      answer:
        "No. Search engines decide rankings, their systems change regularly, and competitors are working on the same searches. A credible agency can stand behind the quality of its work and the clarity of its reporting, not a position in someone else's results.",
    },
    {
      question: "Is SEO a one-time project?",
      answer:
        "The first audit and fixes are a project, but keeping the gains is ongoing work. Every release, new page and template change can introduce issues, and competitors keep publishing. Most sites benefit from continued monitoring and a steady content plan.",
    },
    {
      question: "Do we still need SEO if we already run paid search ads?",
      answer:
        "Usually, yes. Paid visibility stops when the budget does, while organic visibility can keep working long after the effort that earned it. Many of the same improvements, such as faster pages and clearer landing pages, also make paid traffic convert better.",
    },
    {
      question: "How does SEO relate to AEO and GEO?",
      answer:
        "SEO focuses on traditional search results, answer engine optimization targets direct answers such as featured snippets and voice responses, and generative engine optimization targets how AI-generated answers mention and cite you. All three rely on the same foundations: crawlable pages, clear structure and trustworthy content. Doing SEO well makes the other two far more achievable.",
    },
  ],
  related: ["on-page-seo", "off-page-seo", "technical-seo", "aeo", "geo"],
  updated: "2026-10-19",
};
