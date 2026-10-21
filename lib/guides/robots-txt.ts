import type { Guide } from "./types";

export const guide: Guide = {
  slug: "robots-txt",
  kind: "resource",
  navLabel: "Robots.txt",
  metaTitle: "Robots.txt Guide: Rules, Testing, AI Bots | SmartWebCare",
  metaDescription:
    "How robots.txt works: crawling vs indexing, rule matching, common mistakes, testing in Search Console, Next.js robots.ts and choices for AI crawlers.",
  eyebrow: "Resource · Technical SEO",
  title: "Robots.txt: A Practical Guide to Crawler Access",
  lead:
    "A robots.txt file tells crawlers which parts of your site they may request. This guide explains how its rules work, where it helps, where it causes damage and how to decide which AI crawlers to allow.",
  summary: [
    "robots.txt controls crawling, not indexing, so a blocked URL can still appear in search results if other pages link to it.",
    "A crawler follows the single most specific user-agent group that matches it, and within that group the longest matching rule wins.",
    "To keep a page out of search results, let it be crawled and use a noindex meta tag or X-Robots-Tag header, because Google does not support noindex in robots.txt.",
    "robots.txt is a public, voluntary convention rather than a security control, so protect private areas with authentication.",
    "Allowing or blocking AI crawlers is a business decision with trade-offs, and the user agents change, so check each provider's current documentation.",
  ],
  sections: [
    {
      id: "what-it-does",
      heading: "What does robots.txt do?",
      blocks: [
        {
          type: "p",
          text: "A robots.txt file tells crawlers which URLs on a site they may and may not request. It is a plain-text file at the root of a host, such as `https://www.example.com/robots.txt`, and well-behaved crawlers read it before fetching other pages.",
        },
        {
          type: "list",
          items: [
            "**One file per host:** each combination of protocol, host and port needs its own file, so `shop.example.com` and the `http://` version of a site are treated separately.",
            "**A published standard:** the Robots Exclusion Protocol was formalized as [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309) in 2022.",
            "**Size limit:** Google reads the first 500 KiB of the file and ignores anything after that.",
            "**Caching:** Google generally caches robots.txt for up to 24 hours, so edits are not picked up instantly.",
            "**Status codes matter:** a 404 is treated as having no restrictions, while server errors can make Google pause crawling the site for a while.",
          ],
        },
        {
          type: "p",
          text: "Its main job is managing crawler traffic: keeping bots out of URL spaces that waste their time, such as endless filter combinations, and pointing them to your sitemaps. [Google's robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro) is the authoritative reference for how Googlebot reads the file.",
        },
      ],
    },
    {
      id: "crawling-vs-indexing",
      heading: "What is the difference between crawling and indexing?",
      blocks: [
        {
          type: "p",
          text: "Crawling is a search engine fetching a URL; indexing is storing and analyzing that page so it can appear in results. robots.txt controls crawling only, so a disallowed URL can still be indexed, usually without a description, if other pages link to it.",
        },
        {
          type: "p",
          text: "This decides which tool to use. A blocked page is never fetched, so a crawler never sees a `noindex` instruction on it. Google stopped supporting `noindex` inside robots.txt in September 2019, which leaves a robots meta tag or an `X-Robots-Tag` HTTP header, on a page crawlers are allowed to fetch, as the reliable way to keep it out of results.",
        },
        {
          type: "table",
          caption: "Choosing the right control",
          columns: ["Goal", "Use", "Not this"],
          rows: [
            ["Stop crawlers wasting time on a URL space", "robots.txt Disallow", "noindex alone, which still needs crawling"],
            ["Keep a page out of search results", "noindex meta tag or X-Robots-Tag, with crawling allowed", "robots.txt Disallow"],
            ["Consolidate duplicate pages", "Canonical tags or redirects", "robots.txt Disallow"],
            ["Keep private content private", "Authentication", "robots.txt of any kind"],
            ["Remove a URL from Google quickly", "Search Console Removals tool, then noindex or a 404/410", "Blocking it in robots.txt"],
          ],
        },
      ],
    },
    {
      id: "rule-matching",
      heading: "How are robots.txt rules matched?",
      blocks: [
        {
          type: "p",
          text: "A crawler first picks the one group whose `User-agent` line most specifically matches its name, then applies the most specific rule in that group, meaning the one with the longest matching path. If an `Allow` and a `Disallow` rule match with equal length, Google uses the less restrictive `Allow`.",
        },
        {
          type: "code",
          lang: "text",
          code: `User-agent: *
Disallow: /search
Allow: /search/help

User-agent: Googlebot
Disallow: /drafts/`,
        },
        {
          type: "p",
          text: "Here Googlebot follows only its own group, so it may crawl `/search` but not `/drafts/`. A crawler with its own group ignores the `*` group entirely; rules are not merged across groups. Every other crawler follows the `*` group, where `/search/help` is allowed because that rule is longer than `/search`.",
        },
        {
          type: "table",
          caption: "How paths and wildcards match",
          columns: ["Rule", "Matches", "Does not match"],
          rows: [
            ["`Disallow: /search`", "`/search`, `/search?q=shoes`, `/search-tips`", "`/Search`"],
            ["`Disallow: /search/`", "`/search/results`", "`/search`"],
            ["`Disallow: /*?sort=`", "`/shoes?sort=price`", "`/shoes?color=red&sort=price`"],
            ["`Disallow: /*.pdf$`", "`/files/guide.pdf`", "`/files/guide.pdf?v=2`"],
          ],
        },
        {
          type: "p",
          text: "`*` matches any sequence of characters and `$` marks the end of the URL. User-agent names are not case-sensitive, but paths are.",
        },
      ],
    },
    {
      id: "when-to-disallow",
      heading: "When is Disallow the right tool?",
      blocks: [
        {
          type: "p",
          text: "Use Disallow to stop crawlers spending time on URLs that have no search value and can multiply almost endlessly. It is a crawl-efficiency tool, and it matters most on large or highly dynamic sites.",
        },
        {
          type: "list",
          items: [
            "**Internal search results:** pages such as `/search?q=` can generate unlimited low-value URLs.",
            "**Faceted filters and sort orders:** combinations of color, size, price and sort can create huge numbers of near-duplicate URLs.",
            "**Calendars and other infinite spaces:** date pickers or “next” links that never run out.",
            "**Cart, checkout and account flows:** pages that only make sense for a signed-in visitor.",
            "**Staging and preview environments:** as a backup to authentication, never instead of it.",
          ],
        },
        {
          type: "p",
          text: "Do not use Disallow to fix duplicate content, remove indexed pages or hide sensitive information; the table above lists better tools for each. Never block CSS, JavaScript or images that pages need to render, because search engines evaluate pages as they appear once rendered. For crawl planning on larger sites, see our [technical SEO](/technical-seo) service.",
        },
      ],
    },
    {
      id: "sample-files",
      heading: "What does a good robots.txt file look like?",
      blocks: [
        {
          type: "p",
          text: "A good robots.txt file is short, blocks only what you have a clear reason to block and lists your sitemaps with full URLs. Most business websites need only a few lines.",
        },
        {
          type: "code",
          lang: "text",
          caption: "A typical business website.",
          code: `# https://www.example.com/robots.txt
User-agent: *
Disallow: /search
Disallow: /cart
Disallow: /account/

Sitemap: https://www.example.com/sitemap.xml`,
        },
        {
          type: "code",
          lang: "text",
          caption: "An online store that keeps crawlers out of sort and filter combinations.",
          code: `User-agent: *
Disallow: /search
Disallow: /checkout/
Disallow: /*sort=
Disallow: /*filter=

Sitemap: https://www.example.com/sitemap-index.xml`,
        },
        {
          type: "code",
          lang: "text",
          caption: "A staging environment. Pair this with authentication, and never deploy it to the live site.",
          code: `User-agent: *
Disallow: /`,
        },
        {
          type: "p",
          text: "`Sitemap:` lines are independent of user-agent groups, can appear anywhere in the file and must use absolute URLs. You can list several or point to a sitemap index; our [XML sitemap guide](/xml-sitemap) explains how to structure them. Google ignores `Crawl-delay` and `Host`, so leave them out unless another search engine you rely on uses them. Lines starting with `#` are comments, which are useful for noting why each rule exists.",
        },
      ],
    },
    {
      id: "not-security",
      heading: "Is robots.txt a security control?",
      blocks: [
        {
          type: "p",
          text: "No. robots.txt is a public, voluntary convention, not a security mechanism. Anyone can read the file in a browser, and while reputable crawlers choose to follow it, scrapers and malicious bots can simply ignore it.",
        },
        {
          type: "p",
          text: "That has two practical consequences. First, listing a sensitive path such as `/private-reports/` in robots.txt advertises exactly where it is. Second, a blocked URL that is linked from anywhere can still be discovered and, as explained above, can even appear in search results as a bare URL.",
        },
        {
          type: "list",
          items: [
            "Protect private areas with authentication, such as a login or HTTP basic auth on staging.",
            "Restrict internal tools with an IP allowlist or VPN where possible.",
            "Use noindex for public pages that simply should not appear in search.",
            "If confidential data has been exposed, remove it from the server, rotate any affected credentials and then request removal in Search Console.",
          ],
        },
      ],
    },
    {
      id: "common-mistakes",
      heading: "What are the most common robots.txt mistakes?",
      blocks: [
        {
          type: "p",
          text: "The most damaging mistakes are the ones that silently block important content or expect the file to do a job it cannot do. Check for these first:",
        },
        {
          type: "list",
          items: [
            "**`Disallow: /` left over from staging.** The site launches with the staging file and blocks every crawler until someone notices traffic falling.",
            "**Blocking CSS and JavaScript.** Rules such as `Disallow: /assets/` can stop search engines rendering pages properly.",
            "**Hiding private data with robots.txt.** The file is public and voluntary, as covered above.",
            "**Adding `noindex` to robots.txt.** Google has not supported it since September 2019, so it does nothing.",
            "**Blocking a page you want deindexed.** The crawler can no longer fetch the page, never sees its noindex tag, and the URL may linger in results.",
            "**Forgetting group precedence.** Adding a `Googlebot` group means Googlebot stops reading the `*` rules, including ones you still wanted applied.",
            "**Wrong location.** A file at `/blog/robots.txt` or on the wrong subdomain is ignored.",
            "**Case slips.** `Disallow: /Admin` does not block `/admin`.",
          ],
        },
      ],
    },
    {
      id: "testing",
      heading: "How do you test crawler access?",
      blocks: [
        {
          type: "p",
          text: "Test crawler access with Search Console's robots.txt report, which shows the files Google has fetched for your site, and the URL Inspection tool, which tells you whether a specific URL is blocked. Check both after any change to the file.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Fetch the file yourself",
              text: "Open `/robots.txt` on each host in a browser, or run `curl -I` against it, and confirm a 200 status with a plain-text content type.",
            },
            {
              title: "Review the robots.txt report",
              text: "In [Google Search Console](https://search.google.com/search-console), open Settings and then the robots.txt report to see when Google last fetched each file, the fetch status and any parsing problems. You can request a recrawl after an urgent fix.",
            },
            {
              title: "Inspect key URLs",
              text: "Run your most important pages through URL Inspection to confirm crawling is allowed, then use the live test to check the page renders with its CSS and JavaScript.",
            },
            {
              title: "Check other crawlers",
              text: "Bing Webmaster Tools has its own tester, and your server logs show which bots actually request which URLs.",
            },
          ],
        },
        {
          type: "p",
          text: "Add a robots.txt check to your release process, because a single deployment can overwrite the file without anyone noticing.",
        },
      ],
    },
    {
      id: "nextjs-robots",
      heading: "How do you create robots.txt in Next.js?",
      blocks: [
        {
          type: "p",
          text: "In the Next.js App Router, add `app/robots.ts` and default-export a function that returns a `MetadataRoute.Robots` object; Next.js serves it at `/robots.txt`. Generating the file in code lets you vary it by environment, so staging rules cannot reach production by accident.",
        },
        {
          type: "code",
          lang: "ts",
          caption: "app/robots.ts. APP_ENV is an example variable; use whatever flag your hosting sets for staging.",
          code: `import type { MetadataRoute } from "next";

const BASE_URL = "https://www.example.com";

export default function robots(): MetadataRoute.Robots {
  // Block everything only on a deployment explicitly marked as staging.
  if (process.env.APP_ENV === "staging") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/search", "/cart", "/account/"] },
      // Example policy: opt out of OpenAI model training while
      // OAI-SearchBot (ChatGPT search) still follows the * group.
      { userAgent: "GPTBot", disallow: "/" },
    ],
    sitemap: \`\${BASE_URL}/sitemap.xml\`,
  };
}`,
        },
        {
          type: "p",
          text: "`rules` accepts one object or an array of groups, each with `userAgent`, `allow` and `disallow`, and `sitemap` accepts a string or an array. Use either `app/robots.ts` or a static `public/robots.txt`, not both. Checking for staging rather than for production means a missing variable leaves the live site crawlable; staging should sit behind authentication regardless. The [Next.js robots reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) lists every option, and our [web development](/web-development) team can set this up alongside the sitemap route on new or existing Next.js sites.",
        },
      ],
    },
    {
      id: "ai-crawlers",
      heading: "Should you allow AI crawlers?",
      blocks: [
        {
          type: "p",
          text: "It depends on your goals, because this is a business decision rather than a technical default. Allowing crawlers that power AI search can make your pages eligible to be cited and linked in those products, while blocking training crawlers keeps your content out of future training by providers that honor robots.txt.",
        },
        {
          type: "table",
          caption: "Common AI-related user agents, as each provider describes them",
          columns: ["Provider", "User agent", "Purpose"],
          rows: [
            ["OpenAI", "GPTBot", "Crawling content that may be used to train OpenAI's models"],
            ["OpenAI", "OAI-SearchBot", "Finding and linking websites in ChatGPT search results"],
            ["OpenAI", "ChatGPT-User", "Fetching pages when a user asks ChatGPT to visit them"],
            ["Perplexity", "PerplexityBot", "Indexing websites for Perplexity's search results"],
            ["Google", "Google-Extended", "A token controlling use of content for Gemini training and grounding; it does not affect Google Search"],
            ["Anthropic", "ClaudeBot", "Collecting public web content that may be used to train Anthropic's models"],
          ],
        },
        {
          type: "list",
          items: [
            "Blocking a training crawler applies to future crawling; it does not withdraw content already collected or stop bots that ignore robots.txt.",
            "Blocking a search crawler such as OAI-SearchBot or PerplexityBot can reduce your visibility in that product.",
            "Google's AI Overviews and AI Mode are part of Google Search, so Googlebot access and snippet controls, not Google-Extended, govern how your content appears there.",
            "User-initiated fetchers may be treated differently from automated crawlers, so read each provider's notes.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Check current documentation",
          text: "AI user agents and the policies behind them change often. Before publishing rules, confirm names and purposes in each provider's current crawler documentation, and review your choices periodically.",
        },
        {
          type: "p",
          text: "If being cited in AI answers is a goal, our [AEO](/aeo) and [GEO](/geo) services cover the content side of the decision.",
        },
      ],
    },
    {
      id: "checklist",
      heading: "robots.txt checklist",
      blocks: [
        {
          type: "p",
          text: "Work through this checklist whenever you launch a site, migrate it or edit the file.",
        },
        {
          type: "checklist",
          title: "Before and after every change",
          items: [
            "The file sits at the root of every host and protocol you serve and returns a 200 status.",
            "No `Disallow: /` from staging remains on the live site.",
            "CSS, JavaScript and images needed for rendering are crawlable.",
            "Disallow rules target only crawl traps such as internal search, filters and checkout.",
            "Pages you want removed from search are crawlable and carry noindex.",
            "No private paths are listed; those areas use authentication instead.",
            "Crawler-specific groups repeat any `*` rules they still need.",
            "AI crawler rules reflect a deliberate, documented business decision.",
            "Every sitemap is listed with an absolute `Sitemap:` URL.",
            "The file is under 500 KiB and free of unsupported directives such as noindex.",
            "The Search Console robots.txt report shows a successful fetch.",
            "Key URLs pass URL Inspection after each deployment.",
          ],
        },
        {
          type: "p",
          text: "Our [technical SEO](/technical-seo) audits include a full review of crawler access, and our [SEO standards](/seo-standards) page lists the baseline rules we apply. [Contact us](/contact) to arrange a review.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Will blocking a page in robots.txt remove it from Google?",
      answer:
        "No. Blocking stops Google from crawling the page, but the URL can stay indexed, often without a description, if other pages link to it. To remove it, allow crawling and add a noindex tag, or return a 404 or 410.",
    },
    {
      question: "Do I need a robots.txt file at all?",
      answer:
        "Not strictly. If the file is missing and returns a 404, crawlers assume they may fetch everything. It is still worth having one to list your sitemaps and keep crawlers out of low-value URL spaces.",
    },
    {
      question: "Does Google follow Crawl-delay?",
      answer:
        "No. Googlebot ignores the Crawl-delay directive and adjusts its crawl rate based on how your server responds. Some other crawlers, including Bingbot, do honor it.",
    },
    {
      question: "How quickly do robots.txt changes take effect?",
      answer:
        "Google generally refreshes its cached copy within 24 hours, and you can request a faster recrawl from the robots.txt report in Search Console. Other crawlers follow their own schedules.",
    },
    {
      question: "If I block GPTBot, will my site disappear from ChatGPT?",
      answer:
        "Not necessarily. GPTBot relates to model training, while OAI-SearchBot is the crawler OpenAI uses for ChatGPT search, and each follows its own rules. Decide on each user agent separately and confirm the details in OpenAI's current documentation.",
    },
    {
      question: "Does blocking Google-Extended remove my site from AI Overviews?",
      answer:
        "No. Google-Extended controls whether your content is used for Gemini training and grounding, and Google states it does not affect inclusion or ranking in Google Search. AI Overviews are part of Search, so use snippet controls such as nosnippet if you want to limit how your content appears there.",
    },
  ],
  related: ["xml-sitemap", "technical-seo", "seo-standards", "geo", "aeo"],
  updated: "2026-10-19",
};
