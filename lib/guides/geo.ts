import type { Guide } from "./types";

export const guide: Guide = {
  slug: "geo",
  kind: "service",
  navLabel: "GEO",
  metaTitle: "GEO — Generative Engine Optimization | SmartWebCare",
  metaDescription:
    "Generative engine optimization done honestly: original insight, clear entities, crawlable text and real measurement so AI search can reference your content.",
  eyebrow: "Service · Generative Engine Optimization",
  title: "GEO — Generative Engine Optimization",
  lead:
    "Generative engine optimization is the set of content and technical practices that help AI-driven search systems interpret your information correctly and reference it when it is genuinely useful. It builds on SEO, and it works best when your content is worth citing in the first place.",
  summary: [
    "GEO makes your content easier for generative search systems to interpret, attribute and reference, and it builds on established SEO rather than replacing it.",
    "Original research, accurate facts with evidence and named experts give these systems something worth referencing that they cannot find elsewhere.",
    "Consistent brand and entity information, expressed in visible content and matching structured data, helps machines connect your organization, people and topics.",
    "Key text must be crawlable, indexable and present in server-rendered HTML, and your robots.txt choices decide which AI crawlers can reach it.",
    "No one can guarantee that an AI model will cite or recommend a business, so we measure referral traffic and brand mentions instead of promising placements.",
  ],
  sections: [
    {
      id: "what-is-geo",
      heading: "What is generative engine optimization?",
      blocks: [
        {
          type: "p",
          text: "Generative engine optimization (GEO) is the practice of making your content and brand information easy for AI-driven search systems to find, interpret and reference accurately. Systems such as Google's AI Overviews and AI Mode, ChatGPT search, Perplexity and Microsoft Copilot compose answers from several sources instead of simply ranking pages.",
        },
        {
          type: "p",
          text: "The term gained traction through academic research published in 2023, and the field is still young. How language models select and weigh sources is only partly documented, so we base our work on what the platforms publish and on practices that improve content for people anyway: original insight, verifiable facts, clear structure and reliable technical access.",
        },
        {
          type: "p",
          text: "GEO overlaps with [answer engine optimization](/aeo). AEO focuses on answering specific questions in a quotable form; GEO looks more widely at how a system understands your organization, your people, your topics and the evidence behind your claims. Both sit on top of solid [SEO](/seo).",
        },
        {
          type: "callout",
          tone: "info",
          title: "A realistic promise",
          text: "No one can guarantee that a particular AI model will cite, mention or recommend your business. GEO removes the obstacles that stop systems from understanding you and gives them content worth referencing.",
        },
      ],
    },
    {
      id: "seo-vs-geo",
      heading: "How does GEO compare with established SEO?",
      blocks: [
        {
          type: "p",
          text: "GEO extends established SEO rather than replacing it: most of what helps generative systems reference your content is the same work that helps search engines rank it. The difference lies in emphasis and in a handful of newer practices that are still settling.",
        },
        {
          type: "table",
          caption: "Established SEO fundamentals and emerging GEO practices",
          columns: ["Area", "Established SEO fundamentals", "Emerging GEO practices"],
          rows: [
            [
              "Access",
              "Crawlable, indexable pages, XML sitemaps and sensible robots.txt rules",
              "Deciding which AI crawlers to allow and keeping key text in server-rendered HTML",
            ],
            [
              "Content",
              "Helpful, people-first pages that match search intent",
              "Original data and first-hand insight that a system cannot find elsewhere",
            ],
            [
              "Authority",
              "Quality backlinks and a strong reputation",
              "Consistent brand mentions and entity details across trusted sources",
            ],
            [
              "Structure",
              "Descriptive titles, headings and internal links",
              "Self-contained sections that keep their meaning when summarized",
            ],
            [
              "Structured data",
              "Markup for supported rich result features",
              "Organization and Person markup with sameAs to clarify entity relationships",
            ],
            [
              "Measurement",
              "Rankings, impressions and organic clicks",
              "Assistant referral traffic, brand mentions and repeated prompt checks",
            ],
          ],
        },
        {
          type: "p",
          text: "If your SEO foundations are weak, fix those first. Our [SEO standards](/seo-standards) page sets out the baseline we expect before investing in newer techniques.",
        },
      ],
    },
    {
      id: "original-insight",
      heading: "What makes content worth referencing?",
      blocks: [
        {
          type: "p",
          text: "Content is worth referencing when it adds something a system cannot get from a dozen other pages: original research, first-hand experience, specific expertise or a clearer explanation. Generative systems combine information from many sources, so a page that only rewords common knowledge gives them little reason to point to you.",
        },
        {
          type: "list",
          items: [
            "**Original research:** surveys, benchmarks or analyses of your own data, published with the method, sample and date.",
            "**First-hand experience:** what you learned delivering a service or using a product, including limitations and trade-offs.",
            "**Specific guidance:** pricing factors, timelines, requirements and decision criteria explained in concrete terms.",
            "**Definitions and comparisons:** precise explanations of terms and fair comparisons with stated criteria.",
            "**Maintained reference content:** documentation, glossaries and policies that stay accurate over time.",
          ],
        },
        {
          type: "p",
          text: "Original does not have to mean large. A business that explains its process clearly, answers cost and scope questions honestly and shares what it observes in its own work often has more distinctive material than it realizes. What it must never do is invent statistics or results to look authoritative.",
        },
      ],
    },
    {
      id: "facts-evidence",
      heading: "How should facts and sources be presented?",
      blocks: [
        {
          type: "p",
          text: "Present facts precisely and show where they come from, so readers and machines can both verify them. A specific, sourced statement is easier to trust and to reuse correctly than a broad claim.",
        },
        {
          type: "list",
          items: [
            "State figures with units, dates and scope, such as the country or period they apply to.",
            "Link to primary, authoritative sources rather than to articles that repeat them.",
            "Separate facts from opinion, and label estimates as estimates.",
            "Update or remove facts when they change, and keep the updated date honest.",
            "Keep each fact identical everywhere it appears on your site.",
          ],
        },
        {
          type: "callout",
          tone: "warn",
          title: "What we will not do",
          text: "We avoid keyword stuffing, fabricated statistics, fake reviews, invented credentials and unsupported claims about how ranking or language-model algorithms work. These tactics can breach search engines' spam policies, mislead customers and be repeated by AI systems long after you correct them.",
        },
        {
          type: "p",
          text: "Citations also connect your work to the wider body of knowledge on a topic. Linking to a regulator, a standards body or original research shows that your content is grounded, and it helps readers who want to go deeper.",
        },
      ],
    },
    {
      id: "authors-expertise",
      heading: "Why do named authors and expertise matter?",
      blocks: [
        {
          type: "p",
          text: "Named authors with relevant expertise make it clear who stands behind a piece of content and why they are qualified to write it. That helps readers judge credibility and gives machines a consistent person to associate with a topic.",
        },
        {
          type: "list",
          items: [
            "Add a byline to articles and guides, plus a reviewer where a specialist checked the content.",
            "Create an author page for each contributor with their role, relevant experience and links to professional profiles.",
            "Spell author names identically across your site, social profiles and external publications.",
            "Use real people. Invented personas and fictional credentials undermine trust when discovered.",
          ],
        },
        {
          type: "p",
          text: "Google's Search Quality Rater Guidelines describe experience, expertise, authoritativeness and trust as E-E-A-T. It is a framework raters use to assess quality, not a single ranking factor, and it cannot be added with a plugin. It reflects whether your content comes from people who know the subject and whether your business is open about who it is. Reputation earned off your site counts too, which is why [off-page SEO](/off-page-seo) and genuine digital PR complement this work.",
        },
      ],
    },
    {
      id: "entities",
      heading: "How do you make brand and entity relationships clear?",
      blocks: [
        {
          type: "p",
          text: "Describe your organization, its people and its offerings the same way everywhere, then express those connections in structured data that matches the visible page. Consistency lets systems confidently link your website, profiles and mentions to one real-world business.",
        },
        {
          type: "p",
          text: "Start with the basics: one official name, one short description, one logo and one set of contact details, used on your website, Google Business Profile, LinkedIn and directory listings. Then mark up the same facts on your site, as below.",
        },
        {
          type: "code",
          lang: "html",
          caption: "Organization and Person markup connected by @id. Replace every value with your real, visible details.",
          code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.example.com/#organization",
      "name": "Example Studio",
      "url": "https://www.example.com/",
      "logo": "https://www.example.com/logo.png",
      "sameAs": [
        "https://www.linkedin.com/company/example-studio",
        "https://www.instagram.com/examplestudio"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.example.com/team/jane-doe#person",
      "name": "Jane Doe",
      "jobTitle": "Head of Content",
      "worksFor": { "@id": "https://www.example.com/#organization" },
      "sameAs": ["https://www.linkedin.com/in/jane-doe-example"]
    }
  ]
}
</script>`,
        },
        {
          type: "p",
          text: "Point `sameAs` only at profiles you control or that genuinely describe you, such as your LinkedIn page or an official business registry. Check the markup with the [Schema Markup Validator](https://validator.schema.org) and use [schema.org](https://schema.org) for the full vocabulary. Markup clarifies relationships; it cannot create authority the visible content lacks.",
        },
      ],
    },
    {
      id: "headings-links",
      heading: "How do headings and internal links help machines interpret a site?",
      blocks: [
        {
          type: "p",
          text: "Descriptive headings and contextual internal links show what each part of a page covers and how your pages relate to one another. AI answers often quote or summarize individual passages, so sections that make sense on their own are easier to use accurately.",
        },
        {
          type: "list",
          items: [
            "Write headings that state the topic or question of the section in plain words.",
            "Keep each section to one idea, and name the subject instead of relying on “it” or “this”.",
            "Link to related pages from within the text, using anchor text that describes the destination.",
            "Build hub pages that introduce a topic and link to deeper guides, with those guides linking back.",
            "Find and fix orphan pages, which have no internal links pointing to them.",
          ],
        },
        {
          type: "p",
          text: "Internal links are also how you express depth across a topic. An article on crawling that links to your [XML sitemap reference](/xml-sitemap) and your [technical SEO](/technical-seo) service tells readers and machines that these subjects are connected and covered properly. Our [on-page SEO guide](/on-page-seo) explains heading and linking practice in more detail.",
        },
      ],
    },
    {
      id: "technical-access",
      heading: "What technical foundations does GEO need?",
      blocks: [
        {
          type: "p",
          text: "GEO needs the same foundations as SEO: pages that crawlers can fetch and index, with important text present in the HTML. Not every crawler executes JavaScript the way Googlebot does, so content that appears only after client-side rendering may be invisible to some AI systems.",
        },
        {
          type: "list",
          items: [
            "**Server-rendered text:** use server-side rendering or static generation for content pages, and check the raw HTML response, not just what the browser shows.",
            "**Indexability:** confirm pages return 200, carry the right canonical tag and are not accidentally set to noindex.",
            "**Discovery:** keep XML sitemaps accurate and link important pages internally.",
            "**robots.txt choices:** decide deliberately which AI crawlers may access your site. OpenAI's OAI-SearchBot supports ChatGPT search, while GPTBot relates to model training, and blocking one does not block the other. Our [robots.txt guide](/robots-txt) explains the options.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "About llms.txt",
          text: "llms.txt is an optional, emerging proposal for a plain-text file that summarizes a site for language models. Major search engines have not adopted it as a ranking signal, so treat it as a low-cost experiment at most, never as a substitute for crawlable, well-structured pages.",
        },
      ],
    },
    {
      id: "visual-content",
      heading: "How should charts, images and video be handled?",
      blocks: [
        {
          type: "p",
          text: "Pair every chart, image and video that carries meaning with a text equivalent, because text is far easier for crawlers and AI systems to read reliably than visuals. If a key finding exists only as pixels in an image, it may not be understood or attributed at all.",
        },
        {
          type: "list",
          items: [
            "Write alt text that describes what an informative image shows, and give decorative images an empty alt attribute.",
            "Summarize each chart's main finding in a caption or in the paragraph beside it.",
            "Publish the underlying numbers in an HTML table where practical, with the source and date.",
            "Provide transcripts for video and audio, and descriptive titles for embedded media.",
            "Keep headlines, prices and key facts out of images of text.",
          ],
        },
        {
          type: "p",
          text: "This is also an accessibility requirement, since people using screen readers rely on the same text alternatives. Doing it well serves both audiences at once and makes original research much easier to reference with the correct attribution.",
        },
      ],
    },
    {
      id: "measurement",
      heading: "How do you measure GEO?",
      blocks: [
        {
          type: "p",
          text: "Measure GEO by tracking referral traffic from AI assistants, monitoring how and where your brand is mentioned, and checking crawler activity in your server logs. Each signal is incomplete, so read them together and look at trends over months rather than week-to-week swings.",
        },
        {
          type: "code",
          lang: "text",
          caption: "A starting pattern for an analytics segment of AI assistant referrals. Review it regularly, because domains change.",
          code: String.raw`chatgpt\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai`,
        },
        {
          type: "list",
          items: [
            "**Referral traffic:** segment visits from assistant domains and see which pages they land on and whether those visitors get in touch.",
            "**Brand mentions:** run a fixed set of prompts about your category on major assistants each month, and log whether you appear, how accurately and which sources are cited.",
            "**Search Console:** Google counts traffic from its AI features within overall web search data, so watch query and page trends there.",
            "**Server logs:** confirm that the crawlers you allow are fetching your pages successfully.",
            "**Lead sources:** ask new inquiries how they found you, because some assistant traffic arrives without a referrer.",
          ],
        },
        {
          type: "p",
          text: "If you would like this tracking set up and reported for you, [contact us](/contact).",
        },
      ],
    },
  ],
  engagement: [
    {
      title: "Discovery and baseline",
      text: "We audit your content, entity details, structured data and technical access, and record a baseline of assistant referrals, crawler activity and how major AI assistants currently describe your business.",
    },
    {
      title: "Topic and entity plan",
      text: "We identify the topics where you have genuine expertise or original data, map the people, services and profiles that define your brand, and plan the content and evidence each topic needs.",
    },
    {
      title: "Content and technical implementation",
      text: "We create or upgrade content with named authors and sources, implement Organization and Person markup, fix rendering and indexability issues, and apply the robots.txt policy you choose for AI crawlers.",
    },
    {
      title: "Measure and iterate",
      text: "We report on referral traffic, brand mentions and crawler logs at an agreed cadence, then refine content that systems overlook or misread. We report what we observe, never promised placements.",
    },
  ],
  faqs: [
    {
      question: "What is the difference between GEO and AEO?",
      answer:
        "AEO concentrates on answering specific questions in a clear, quotable form. GEO is broader and covers how generative systems understand your brand, people, topics and evidence across many sources. They share most techniques, and we often deliver them together.",
    },
    {
      question: "Can you make ChatGPT or Gemini recommend our business?",
      answer:
        "No one can guarantee that. Each AI model decides what to mention based on its own systems, the user's question and the sources it can access, and all of these change over time. We work on what you can control: accurate, original, accessible content and consistent brand information.",
    },
    {
      question: "Should we add an llms.txt file?",
      answer:
        "You can, but keep expectations modest. llms.txt is an emerging proposal, and major search engines have not adopted it as a ranking signal. Crawlable HTML pages with clear structure matter far more.",
    },
    {
      question: "Should we block AI crawlers to protect our content?",
      answer:
        "It depends on your goals. Blocking training crawlers such as GPTBot or ClaudeBot limits future use of your content by providers that honor robots.txt, while blocking search crawlers such as OAI-SearchBot or PerplexityBot can reduce your visibility in those assistants. We help you decide crawler by crawler rather than all or nothing.",
    },
    {
      question: "Do we need original research to benefit from GEO?",
      answer:
        "No. Formal research helps, but first-hand experience, clear explanations of your process, honest pricing guidance and well-maintained reference content are also distinctive. What matters is offering something accurate and useful that is not simply repeated from elsewhere.",
    },
  ],
  related: ["aeo", "seo", "technical-seo", "off-page-seo", "robots-txt"],
  updated: "2026-10-19",
};
