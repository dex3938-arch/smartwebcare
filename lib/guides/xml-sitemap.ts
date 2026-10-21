import type { Guide } from "./types";

export const guide: Guide = {
  slug: "xml-sitemap",
  kind: "resource",
  navLabel: "XML Sitemap",
  metaTitle: "XML Sitemaps: Setup, Limits and Errors | SmartWebCare",
  metaDescription:
    "Learn what an XML sitemap does, which URLs to include, how to build one in Next.js, submit it in Search Console and fix common sitemap errors.",
  eyebrow: "Resource · Technical SEO",
  title: "XML Sitemaps: A Practical Guide",
  lead:
    "An XML sitemap is a file that lists the URLs you want search engines to discover and crawl. This guide covers what belongs in it, how to generate one in Next.js and how to keep it accurate as your site changes.",
  summary: [
    "An XML sitemap helps search engines discover and recrawl your URLs, but it does not boost rankings or force pages into the index.",
    "List only canonical, indexable URLs that return a 200 status, written in one consistent format.",
    "Each sitemap file can hold up to 50,000 URLs or 50 MB uncompressed, and larger sites tie several files together with a sitemap index.",
    "Submit sitemaps in Google Search Console and reference them in robots.txt, because Google no longer accepts sitemap pings.",
    "Set lastmod only when it reflects a real content change, since Google ignores priority and changefreq and discounts unreliable dates.",
  ],
  sections: [
    {
      id: "what-it-does",
      heading: "What does an XML sitemap do?",
      blocks: [
        {
          type: "p",
          text: "An XML sitemap tells search engines which URLs on your site you consider important and, optionally, when each one last changed. It is a discovery aid: it helps crawlers find pages and notice updates, but it is not a ranking factor and does not guarantee that any listed URL will be indexed.",
        },
        {
          type: "p",
          text: "Search engines mainly find pages by following links. A sitemap adds a direct route, which matters most when links alone are not enough. [Google's sitemap documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) highlights these cases:",
        },
        {
          type: "list",
          items: [
            "Large sites, where some pages may be overlooked during crawling.",
            "New sites with few external links pointing to them.",
            "Sites whose pages are poorly connected by internal links.",
            "Sites with a lot of rich media or news content, where extra details help discovery.",
          ],
        },
        {
          type: "p",
          text: "A small site whose pages are all well linked can be discovered without one. Even so, a sitemap is cheap to maintain and unlocks useful reporting in Search Console, so we treat it as a standard part of every site build.",
        },
      ],
    },
    {
      id: "which-urls",
      heading: "Which URLs should a sitemap include?",
      blocks: [
        {
          type: "p",
          text: "A sitemap should list only canonical, indexable URLs that return a 200 status code and that you want to appear in search results. Anything else is noise that wastes crawling and makes the sitemap a less reliable signal.",
        },
        {
          type: "table",
          caption: "What to include and what to leave out",
          columns: ["Include", "Leave out"],
          rows: [
            ["Canonical versions of pages", "Duplicates such as parameter, sort or print versions"],
            ["URLs that return 200 OK", "Redirects (3xx) and missing pages (404 or 410)"],
            ["Indexable pages", "Pages with a noindex meta tag or X-Robots-Tag header"],
            ["Pages crawlers are allowed to fetch", "URLs blocked by robots.txt"],
            ["Public content worth finding in search", "Logins, carts, account pages, internal search results and staging URLs"],
          ],
        },
        {
          type: "p",
          text: "Make sure the sitemap agrees with every other signal. If a listed URL redirects or its canonical tag points elsewhere, you are sending mixed messages and search engines will lean on the other signals instead. Thin or near-duplicate pages, such as automatically generated tag pages with little unique content, are usually better left out until they offer real value.",
        },
      ],
    },
    {
      id: "url-format",
      heading: "What URL format should a sitemap use?",
      blocks: [
        {
          type: "p",
          text: "Use absolute URLs in exactly the format you have chosen as canonical, and use that same format in your sitemap, canonical tags, internal links and redirects. Consistency removes any doubt about which version of a page is the preferred one.",
        },
        {
          type: "list",
          items: [
            "**Protocol:** list `https://` URLs only once your site runs on HTTPS.",
            "**Host:** choose `www` or the bare domain, and redirect the other to it.",
            "**Trailing slashes:** pick one style, such as `/services` or `/services/`, and match how your server responds.",
            "**Parameters:** leave out tracking parameters such as `utm_source`.",
            "**Encoding:** save the file as UTF-8 and escape special characters, so `&` becomes `&amp;`.",
            "**Same site:** list URLs from the host that serves the sitemap, unless you have verified the other hosts in Search Console.",
          ],
        },
        {
          type: "p",
          text: "In Next.js, the `trailingSlash` setting in `next.config` decides which style your routes use, so build sitemap URLs from the same base URL your canonical tags use. Our [SEO standards](/seo-standards) page lists the URL conventions we apply on every project, and [technical SEO](/technical-seo) covers redirect and canonical clean-up.",
        },
      ],
    },
    {
      id: "sample-xml",
      heading: "What does a valid sitemap file look like?",
      blocks: [
        {
          type: "p",
          text: "A valid sitemap is a UTF-8 XML file with a `<urlset>` root element in the sitemaps.org namespace and one `<url>` entry per page. Each entry needs a `<loc>` containing the full URL; `<lastmod>` is optional but useful when it is accurate.",
        },
        {
          type: "code",
          lang: "xml",
          caption: "A minimal sitemap. Dates use the W3C Datetime format: a date on its own, or a full timestamp with a time zone.",
          code: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.example.com/</loc>
    <lastmod>2026-10-02</lastmod>
  </url>
  <url>
    <loc>https://www.example.com/services/web-development</loc>
    <lastmod>2026-09-18</lastmod>
  </url>
  <url>
    <loc>https://www.example.com/blog/choosing-a-cms</loc>
    <lastmod>2026-10-14T09:30:00+05:30</lastmod>
  </url>
</urlset>`,
        },
        {
          type: "p",
          text: "The protocol also defines `<changefreq>` and `<priority>`. Google ignores both, so tuning them achieves nothing; other search engines may read them, and including them does no harm. The full specification is at [sitemaps.org](https://www.sitemaps.org/protocol.html). Hand-written files break easily on a single unescaped character, so generate the sitemap from code wherever you can. Google also supports extensions for images, video and news, plus `xhtml:link` entries for alternate language versions.",
        },
      ],
    },
    {
      id: "limits-and-index",
      heading: "What are the size limits, and when do you need a sitemap index?",
      blocks: [
        {
          type: "p",
          text: "A single sitemap can list up to 50,000 URLs and must not exceed 50 MB uncompressed. If you pass either limit, split the URLs across several sitemaps and list those files in a sitemap index. Most small business sites never come close, but large catalogs, listings sites and publishers often do.",
        },
        {
          type: "code",
          lang: "xml",
          caption: "A sitemap index that points to two child sitemaps.",
          code: `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.example.com/sitemaps/pages.xml</loc>
    <lastmod>2026-10-14</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.example.com/sitemaps/products-1.xml</loc>
    <lastmod>2026-10-18</lastmod>
  </sitemap>
</sitemapindex>`,
        },
        {
          type: "list",
          items: [
            "Files may be compressed with gzip, but the 50 MB limit applies to the uncompressed size.",
            "An index lists sitemaps, not other index files, and has the same 50,000-entry and 50 MB limits.",
            "Submitting the index in Search Console covers every sitemap it lists.",
            "Splitting by content type, such as pages, posts and products, makes problems easier to trace even on smaller sites.",
          ],
        },
      ],
    },
    {
      id: "nextjs-sitemap",
      heading: "How do you generate a sitemap in Next.js?",
      blocks: [
        {
          type: "p",
          text: "In the Next.js App Router, add `app/sitemap.ts` and default-export a function that returns an array typed as `MetadataRoute.Sitemap`. Next.js serves the result as XML at `/sitemap.xml`, so the sitemap is generated from the same data as your pages.",
        },
        {
          type: "code",
          lang: "ts",
          caption: "app/sitemap.ts — fixed routes plus posts from a data source.",
          code: `import type { MetadataRoute } from "next";

const BASE_URL = "https://www.example.com";

type Post = { slug: string; updatedAt: string };

// Placeholder: replace with your CMS or database query.
// Return only published, indexable posts.
async function getPublishedPosts(): Promise<Post[]> {
  return [
    { slug: "choosing-a-cms", updatedAt: "2026-09-30" },
    { slug: "website-migration-checklist", updatedAt: "2026-10-12" },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  const pages: MetadataRoute.Sitemap = [
    { url: BASE_URL },
    { url: \`\${BASE_URL}/services\` },
    { url: \`\${BASE_URL}/blog\` },
    { url: \`\${BASE_URL}/contact\` },
  ];

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: \`\${BASE_URL}/blog/\${post.slug}\`,
    lastModified: post.updatedAt,
  }));

  return [...pages, ...postEntries];
}`,
        },
        {
          type: "p",
          text: "Each entry accepts `url`, `lastModified`, `changeFrequency` and `priority`. The example sets `lastModified` only where a real update date exists and skips the two fields Google ignores. The route is cached by default, so if content changes between deployments, add a `revalidate` export or revalidate the sitemap when you publish. Keep the base URL in one shared constant or environment variable so sitemap URLs and canonical tags always agree. The [Next.js sitemap reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) covers image, video and alternate-language fields.",
        },
      ],
    },
    {
      id: "nextjs-large-sites",
      heading: "How do you split a large sitemap in Next.js?",
      blocks: [
        {
          type: "p",
          text: "Split it by exporting a `generateSitemaps` function from the sitemap file. That function returns an array of objects with an `id`, and Next.js calls your sitemap function once for each id, serving every file at a path such as `/products/sitemap/0.xml`.",
        },
        {
          type: "code",
          lang: "ts",
          caption: "app/products/sitemap.ts — one sitemap file per 50,000 products.",
          code: `import type { MetadataRoute } from "next";

const BASE_URL = "https://www.example.com";
const URLS_PER_SITEMAP = 50_000;

type Product = { slug: string; updatedAt: Date };

// Placeholders: replace with real database queries.
async function countProducts(): Promise<number> {
  return 120_000;
}

async function getProducts(offset: number, limit: number): Promise<Product[]> {
  // e.g. SELECT slug, updated_at FROM products ORDER BY id LIMIT limit OFFSET offset
  return [];
}

export async function generateSitemaps() {
  const total = await countProducts();
  const files = Math.ceil(total / URLS_PER_SITEMAP);
  return Array.from({ length: files }, (_, id) => ({ id }));
}

export default async function sitemap(props: {
  id: Promise<string> | string;
}): Promise<MetadataRoute.Sitemap> {
  // Next.js 16 passes id as a promise; Next.js 15 passes the value directly.
  const id = Number(await props.id);
  const products = await getProducts(id * URLS_PER_SITEMAP, URLS_PER_SITEMAP);

  return products.map((product) => ({
    url: \`\${BASE_URL}/products/\${product.slug}\`,
    lastModified: product.updatedAt,
  }));
}`,
        },
        {
          type: "p",
          text: "Next.js serves each child file, but search engines still need to find them. Unless your setup already produces an index, list every file as a `Sitemap:` line in robots.txt or serve a sitemap index from a route handler, then submit it in Search Console. Order records by a stable key, such as the database id, so each URL stays in the same file between builds and errors are easier to trace. If you upgrade to Next.js 16, note that `id` arrives as a promise; the example already awaits it.",
        },
      ],
    },
    {
      id: "submit",
      heading: "How do you submit a sitemap to search engines?",
      blocks: [
        {
          type: "p",
          text: "Submit the sitemap in Google Search Console and reference it in your robots.txt file; together these cover Google and most other search engines. Google retired its sitemap ping endpoint in 2023, so pinging a URL no longer does anything.",
        },
        {
          type: "steps",
          items: [
            {
              title: "Verify your site",
              text: "Add and verify a domain or URL-prefix property in [Google Search Console](https://search.google.com/search-console).",
            },
            {
              title: "Open the Sitemaps report",
              text: "Go to Indexing, then Sitemaps, enter the URL of your sitemap or sitemap index and select Submit.",
            },
            {
              title: "Reference it in robots.txt",
              text: "Add a line such as `Sitemap: https://www.example.com/sitemap.xml` using the full URL. It can sit anywhere in the file, and you can add several.",
            },
            {
              title: "Add it to Bing Webmaster Tools",
              text: "Submit the same sitemap there so Bing can report on it as well.",
            },
          ],
        },
        {
          type: "p",
          text: "Submission is a hint, not an instruction: search engines still decide what to crawl and index. Our [robots.txt guide](/robots-txt) shows where the Sitemap line fits alongside your other rules.",
        },
      ],
    },
    {
      id: "find-errors",
      heading: "How do you find and fix sitemap errors?",
      blocks: [
        {
          type: "p",
          text: "Use Search Console's Sitemaps report to see whether each file was fetched and read, and the Page indexing report to see what happened to the URLs it lists. URL Inspection then diagnoses individual pages.",
        },
        {
          type: "table",
          caption: "Common sitemap problems and how to fix them",
          columns: ["What you see", "Likely cause", "Fix"],
          rows: [
            [
              "Couldn't fetch",
              "Wrong URL, 404, server error, login wall or a robots.txt block",
              "Open the sitemap URL in a private window and check its status code and robots rules",
            ],
            [
              "Has errors",
              "Invalid XML, an unescaped `&` or the wrong namespace",
              "Validate the XML and generate it from code rather than by hand",
            ],
            [
              "URL not allowed",
              "URLs on a different host or protocol from the sitemap",
              "List only URLs from the same verified property",
            ],
            [
              "Excluded by ‘noindex’ tag",
              "Noindex pages listed in the sitemap",
              "Remove them, or remove the noindex if the page should be indexed",
            ],
            [
              "Page with redirect or Not found (404)",
              "Outdated URLs left in the sitemap",
              "Replace them with final URLs or remove them",
            ],
          ],
        },
        {
          type: "p",
          text: "In the Page indexing report, use the filter at the top to show only submitted pages or a single sitemap. Treat “Crawled – currently not indexed” as a content-quality question rather than a sitemap fault; our [on-page SEO guide](/on-page-seo) covers how to strengthen thin pages.",
        },
      ],
    },
    {
      id: "maintenance",
      heading: "How should you handle removed URLs and lastmod dates?",
      blocks: [
        {
          type: "p",
          text: "Remove any URL that has been deleted, redirected or set to noindex, and set lastmod only to the date a page's content genuinely changed. A sitemap should describe the pages you want indexed today, with dates search engines can trust.",
        },
        {
          type: "list",
          items: [
            "**Removed pages:** return a 404 or 410, delete the URL from the sitemap and update internal links to it.",
            "**Redirected pages:** list only the final destination, and point internal links straight at it.",
            "**Noindex pages:** take them out; listing a URL while asking search engines not to index it is contradictory.",
            "**Merged pages:** keep the surviving canonical URL and drop the rest.",
          ],
        },
        {
          type: "p",
          text: "Google uses `<lastmod>` only when it is consistently and verifiably accurate. Update it for meaningful changes to the main content, structured data or important links, not for a new copyright year or a site-wide rebuild. Never stamp every entry with the current time; in Next.js, that means avoiding `lastModified: new Date()` unless the page really changed at that moment. If your CMS does not record real update dates, leaving lastmod out is better than inventing one.",
        },
        {
          type: "p",
          text: "The easiest way to stay accurate is to build the sitemap from the same source as your pages, filtering out drafts, unpublished entries and noindex content inside the sitemap function.",
        },
      ],
    },
    {
      id: "checklist",
      heading: "XML sitemap checklist",
      blocks: [
        {
          type: "p",
          text: "Run through this checklist before you submit a sitemap and after any significant change to your site structure.",
        },
        {
          type: "checklist",
          title: "Before and after you submit",
          items: [
            "Every listed URL returns a 200 status code.",
            "Every URL is the canonical version and matches the page's canonical tag.",
            "No listed URL carries noindex or is blocked by robots.txt.",
            "All URLs use https, one host and one trailing-slash style.",
            "The file is valid UTF-8 XML with special characters escaped.",
            "Each file stays under 50,000 URLs and 50 MB uncompressed.",
            "Large sites use a sitemap index that lists every child sitemap.",
            "lastmod reflects real content changes, or is left out.",
            "The sitemap is generated from the same data that publishes your pages.",
            "The sitemap is submitted in Search Console and listed in robots.txt.",
            "The Sitemaps and Page indexing reports are reviewed after each major release.",
          ],
        },
        {
          type: "p",
          text: "If you would like us to build sitemap generation into your site, our [web development](/web-development) team handles it as part of every build.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Does an XML sitemap improve rankings?",
      answer:
        "No. A sitemap helps search engines discover and recrawl URLs, but it is not a ranking factor. Pages still need useful content, sound internal linking and solid [SEO fundamentals](/seo) to rank.",
    },
    {
      question: "Does a small website need a sitemap?",
      answer:
        "Not strictly. If every page is linked from navigation or other pages, search engines can usually find it. A sitemap is still worth having because it is easy to generate and makes Search Console's indexing reports more useful.",
    },
    {
      question: "Do I need to resubmit my sitemap every time I publish?",
      answer:
        "No. Once Google knows your sitemap, it refetches it periodically, and a dynamically generated sitemap picks up new pages automatically. Resubmitting is mainly useful after a large restructure or after fixing a broken file.",
    },
    {
      question: "Why are fewer pages indexed than my sitemap lists?",
      answer:
        "Listing a URL does not oblige a search engine to index it. Google may skip pages it considers duplicates, low value or not yet worth crawling. The Page indexing report, filtered to your sitemap, shows the reason for each excluded URL.",
    },
    {
      question: "Should images and videos go in the sitemap?",
      answer:
        "They can. Image and video sitemap extensions help search engines find media they might otherwise miss, such as images loaded by scripts. Next.js supports `images` and `videos` fields on sitemap entries for this purpose.",
    },
    {
      question: "Where should the sitemap file live?",
      answer:
        "Usually at the root of your host, such as `https://www.example.com/sitemap.xml`. A sitemap generally applies only to URLs in its own directory and below, so the root is the safest location for a site-wide file.",
    },
  ],
  related: ["robots-txt", "technical-seo", "seo-standards", "on-page-seo", "web-development"],
  updated: "2026-10-19",
};
