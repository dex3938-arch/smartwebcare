import type { Guide } from "./types";

export const guide: Guide = {
  slug: "aeo",
  kind: "service",
  navLabel: "AEO",
  metaTitle: "AEO — Answer Engine Optimization | SmartWebCare",
  metaDescription:
    "Structure your content so Google AI Overviews, featured snippets, ChatGPT search, Perplexity and voice assistants can find and quote clear answers.",
  eyebrow: "Service · Answer Engine Optimization",
  title: "AEO — Answer Engine Optimization",
  lead:
    "Answer engine optimization is the work of structuring your content so search features and AI assistants can find, understand and accurately quote your answers. We plan, write and build pages around the questions your customers actually ask.",
  summary: [
    "AEO means organizing pages around real customer questions and answering each one directly, accurately and in plain HTML text.",
    "Answer engines such as Google AI Overviews, ChatGPT search and Perplexity draw on pages they can crawl, index and trust, so strong SEO fundamentals come first.",
    "Structured data helps machines interpret a page only when it matches the visible content, and it never guarantees a rich result or an AI citation.",
    "Visibility in answers depends on the platform, the query, the quality of competing sources and other factors, so no one can promise inclusion.",
    "Measure AEO with Search Console, referral analytics and repeatable manual checks, then refine the pages that are being missed or misread.",
  ],
  sections: [
    {
      id: "what-is-aeo",
      heading: "What is answer engine optimization?",
      blocks: [
        {
          type: "p",
          text: "Answer engine optimization (AEO) is the practice of shaping your content so that systems which reply with an answer, rather than a list of links, can find a clear and accurate answer on your page and represent it correctly. Those systems include Google's featured snippets, AI Overviews and AI Mode, ChatGPT search, Perplexity, Microsoft Copilot and voice assistants.",
        },
        {
          type: "p",
          text: "AEO does not replace search engine optimization. Answer engines still rely on pages they can crawl, index and trust, so [SEO](/seo) fundamentals do most of the work. AEO adds a sharper focus on questions: which ones your customers ask, where each one is answered on your site, and whether that answer can be quoted on its own without losing its meaning. It overlaps with [generative engine optimization](/geo), which looks more broadly at how AI systems interpret brands and evidence.",
        },
        {
          type: "callout",
          tone: "info",
          title: "What AEO cannot do",
          text: "Nobody controls which source an answer engine chooses. Inclusion depends on the platform, the exact query, the user's context, the quality of competing sources and signals the platforms do not publish. Good AEO improves your eligibility and clarity; it cannot guarantee a placement.",
        },
      ],
    },
    {
      id: "answer-engines",
      heading: "Which answer engines does AEO cover?",
      blocks: [
        {
          type: "p",
          text: "AEO covers any search feature or assistant that answers a question directly, and each one sources its answers a little differently. The table summarizes what the platforms themselves document, which is the safest basis for planning.",
        },
        {
          type: "table",
          caption: "How common answer engines build responses",
          columns: ["Answer engine", "How it answers", "What it needs from your site"],
          rows: [
            [
              "Google featured snippets",
              "Shows a passage from an indexed page within the results",
              "An indexed page eligible for a snippet, with a passage that clearly answers the query",
            ],
            [
              "Google AI Overviews and AI Mode",
              "Generates a summary with links to supporting pages",
              "Standard SEO eligibility; Google states no special markup is required",
            ],
            [
              "ChatGPT search",
              "Searches the web and cites sources in its reply",
              "Access for OpenAI's OAI-SearchBot and answers written in clear text",
            ],
            [
              "Perplexity",
              "Retrieves web pages and cites them beside its answer",
              "Access for PerplexityBot and well-structured, sourced content",
            ],
            [
              "Voice assistants",
              "Reads a single short answer aloud",
              "Concise answers and accurate business details such as hours and location",
            ],
          ],
        },
        {
          type: "p",
          text: "Google's guidance on [AI features in Search](https://developers.google.com/search/docs/appearance/ai-features) confirms that the usual snippet controls, such as `nosnippet`, `data-nosnippet` and `max-snippet`, also apply to AI Overviews and AI Mode. A page that restricts its snippets therefore limits how it can be used in those features too.",
        },
      ],
    },
    {
      id: "question-planning",
      heading: "How do you plan question-led content?",
      blocks: [
        {
          type: "p",
          text: "You plan question-led content by collecting the real questions your audience asks, grouping them by intent and giving each group a clear home on your site. Guessing produces generic pages; evidence from your own customers produces pages that match how people actually search and speak.",
        },
        {
          type: "list",
          items: [
            "**Sales and support conversations:** what prospects ask before they buy and what customers ask afterward.",
            "**Search Console queries:** question-style searches that already earn impressions for your pages.",
            "**Site search logs:** what visitors look for on your site and fail to find.",
            "**Search results:** the related questions Google displays for your core topics.",
            "**Reviews and communities:** the words customers use to describe their problems.",
          ],
        },
        {
          type: "p",
          text: "Next, map each question to one page. A primary question usually deserves its own page or a dedicated section, while close follow-ups belong on the same page under their own headings. Avoid publishing near-identical pages for minor wording variations, because they compete with each other and dilute quality. Our [on-page SEO guide](/on-page-seo) explains how to align titles, headings and copy once the map is settled.",
        },
        {
          type: "p",
          text: "The output is a question-and-answer map: each question, its intent, the target page, the quality of the current answer and the evidence needed to answer it well.",
        },
      ],
    },
    {
      id: "direct-answers",
      heading: "How should you write answers that engines can quote?",
      blocks: [
        {
          type: "p",
          text: "Write the direct answer first, in one to three plain sentences, then support it with detail, conditions and examples. A reader skimming the page and a system extracting a passage should both get a correct answer from the opening lines of a section.",
        },
        {
          type: "table",
          caption: "Answer-first writing in practice",
          columns: ["Instead of", "Write"],
          rows: [
            ["Opening with background or a sales pitch", "The answer first, then the context"],
            ["“It depends” with nothing further", "The main factors it depends on, and a typical case"],
            ["Vague claims such as “industry-leading”", "Specific, verifiable facts with units, dates and sources"],
            ["Pronouns that need earlier context", "The subject named in full, so the passage stands alone"],
          ],
        },
        {
          type: "p",
          text: "Accuracy matters more than polish. An answer engine can repeat an outdated price, a discontinued feature or a wrong opening time as easily as a correct one, so give someone ownership of key facts and show when the page was last reviewed. Where an answer genuinely varies, say what it varies with instead of hiding behind a disclaimer.",
        },
        {
          type: "p",
          text: "Finally, keep one answer per question across your site; conflicting versions make it harder for any system to know what you mean.",
        },
      ],
    },
    {
      id: "headings-structure",
      heading: "How should headings, definitions and steps be structured?",
      blocks: [
        {
          type: "p",
          text: "Give each section a heading that describes exactly what it answers, and use the HTML format that fits the content: paragraphs for explanations, ordered lists for steps and tables for comparisons. Clear structure helps readers scan and helps machines tell which passage answers which question.",
        },
        {
          type: "list",
          items: [
            "**Descriptive headings:** phrase headings as the question or a specific topic, such as “How long does a website migration take?”, rather than labels like “Overview”.",
            "**Clear definitions:** introduce a term with a direct definition, such as “A canonical URL is the version of a page you want search engines to treat as the main one,” before adding nuance.",
            "**Step-by-step instructions:** use a real ordered list, start each step with a verb and keep to one action per step.",
            "**Comparisons:** use a table with consistent columns instead of spreading differences across several paragraphs.",
            "**Logical heading levels:** one H1 per page, H2s for main questions and H3s for sub-points, without skipping levels for styling.",
          ],
        },
        {
          type: "p",
          text: "Keep sections focused: when one starts answering a second question, give that question its own heading. The page then reads well from top to bottom and still makes sense when a single section is quoted alone.",
        },
      ],
    },
    {
      id: "faqs",
      heading: "Are FAQ sections still worth adding?",
      blocks: [
        {
          type: "p",
          text: "Yes, when they answer genuine follow-up questions the main content does not already cover. A good FAQ helps visitors who arrive with one specific concern and gives each question a clear, self-contained answer.",
        },
        {
          type: "p",
          text: "Useful FAQs are short, specific and maintained. Each answer resolves the question in a few sentences and links to deeper content where needed. Weak FAQs repeat the page's headings, pile up keyword variations or answer questions nobody asks; they add length without adding value.",
        },
        {
          type: "callout",
          tone: "warn",
          title: "FAQ markup and rich results",
          text: "Since August 2023, Google shows FAQ rich results only for well-known, authoritative government and health websites, and HowTo rich results have been removed. FAQPage structured data that accurately matches visible questions is still valid, but for most businesses it will not produce a rich result, and no markup guarantees a citation in an AI answer.",
        },
        {
          type: "p",
          text: "We write FAQs for people first. If markup is added, it mirrors the visible questions and answers exactly, and we judge success by whether the content helps, not by whether a search feature appears.",
        },
      ],
    },
    {
      id: "accessible-html",
      heading: "Why does accessible HTML text matter?",
      blocks: [
        {
          type: "p",
          text: "Answer engines can only use what they can read, and the most reliably readable format is text in the page's HTML. An answer locked in an image, a video without a transcript, a PDF-only download or content that appears only after client-side scripts run is harder for crawlers to access and quote.",
        },
        {
          type: "list",
          items: [
            "Render important content on the server so the answer is present in the initial HTML response.",
            "Use semantic elements such as headings, lists, tables and paragraphs instead of styled `<div>` blocks.",
            "Write meaningful alt text for informative images, and add captions or transcripts to audio and video.",
            "Keep answers on the page itself rather than in images of text or embedded documents.",
            "Make sure accordions and tabs carry their text in the HTML instead of loading it only after a click.",
          ],
        },
        {
          type: "p",
          text: "These are the same practices that make a site usable with a screen reader, which is why accessibility and AEO reinforce each other. If your site runs on a JavaScript framework, our [web development](/web-development) team can confirm exactly what crawlers receive before and after rendering.",
        },
      ],
    },
    {
      id: "trust-signals",
      heading: "How do evidence, authorship and entity details affect answers?",
      blocks: [
        {
          type: "p",
          text: "Evidence, clear authorship and consistent business details make your content easier to trust and easier to attribute correctly. Search systems aim to surface reliable information, and an answer backed by named sources and a credible author is a stronger candidate than an anonymous claim.",
        },
        {
          type: "list",
          items: [
            "**Cite sources:** link to primary sources for facts, data and regulations, and date any figure that can change.",
            "**Show authorship:** name the author or reviewer, explain their relevant experience and link to an author page.",
            "**Date honestly:** display a “last reviewed” date only when the content was actually reviewed.",
            "**Keep entity details consistent:** use the same business name, address, phone number, description and logo on your site, Google Business Profile, social profiles and directories.",
          ],
        },
        {
          type: "p",
          text: "Google's Search Quality Rater Guidelines describe these qualities as E-E-A-T: experience, expertise, authoritativeness and trust. It is a framework for judging quality, not a single ranking factor you can switch on, so treat it as a description of good practice rather than a list to game.",
        },
        {
          type: "p",
          text: "Knowledge panels work the same way. Google generates them automatically from information it considers reliable. You cannot create one directly, but consistent entity details help, and claiming an existing panel lets you suggest corrections.",
        },
      ],
    },
    {
      id: "structured-data",
      heading: "What role does structured data play?",
      blocks: [
        {
          type: "p",
          text: "Structured data helps search engines interpret what a page is about and who is behind it, but only when it accurately describes content that is visible on the page. It clarifies; it does not shortcut. Markup never guarantees a rich result, a featured snippet or an AI citation.",
        },
        {
          type: "table",
          caption: "Structured data types we commonly use",
          columns: ["Type", "Use it for", "Keep in mind"],
          rows: [
            [
              "Organization or LocalBusiness",
              "Name, logo, contact details, address and official profiles",
              "Must match the details shown on your site and profiles",
            ],
            [
              "Article or BlogPosting",
              "Headline, author, published and modified dates",
              "Dates must reflect real publishing and updates",
            ],
            [
              "BreadcrumbList",
              "Where a page sits in your site structure",
              "Should mirror the visible breadcrumb trail",
            ],
            [
              "Product",
              "Price, availability and description",
              "Keep values in sync with the page as they change",
            ],
            [
              "FAQPage",
              "Visible question-and-answer content",
              "Rich results are limited to authoritative government and health sites",
            ],
          ],
        },
        {
          type: "p",
          text: "Validate markup with Google's [Rich Results Test](https://search.google.com/test/rich-results) for features Google supports and the [Schema Markup Validator](https://validator.schema.org) for general schema.org syntax. Recheck after content updates, because stale markup that no longer matches the page sends conflicting signals.",
        },
      ],
    },
    {
      id: "crawlability",
      heading: "How do performance and crawlability affect answer visibility?",
      blocks: [
        {
          type: "p",
          text: "An answer engine cannot quote a page it cannot reach, so crawlability is the first technical requirement of AEO. Pages need to return a 200 status, be indexable, load reliably and be linked from elsewhere on your site.",
        },
        {
          type: "list",
          items: [
            "**Allow the crawlers you want to be visible in.** Googlebot and Bingbot power traditional search, OAI-SearchBot is used for ChatGPT search and PerplexityBot for Perplexity. Blocking them in robots.txt limits your eligibility on those platforms; our [robots.txt guide](/robots-txt) covers the options.",
            "**Separate training controls from search controls.** Google-Extended governs whether content is used for Gemini models; it does not affect inclusion or ranking in Google Search.",
            "**Help discovery.** Keep an accurate [XML sitemap](/xml-sitemap) and link important answers from related pages.",
            "**Keep pages fast and stable.** Slow responses and server errors can reduce how efficiently a site is crawled, and they frustrate visitors.",
          ],
        },
        {
          type: "p",
          text: "Our [technical SEO](/technical-seo) audits review status codes, rendering, canonical tags, internal links and robots rules together, because a problem in any one of them can hide an otherwise excellent answer.",
        },
      ],
    },
    {
      id: "measuring",
      heading: "How do you measure AEO results?",
      blocks: [
        {
          type: "p",
          text: "Measure AEO with a mix of platform data, analytics and repeatable manual checks, because no single tool reports every answer your brand appears in. The aim is to see trends and spot pages that are being misread, not to chase one number.",
        },
        {
          type: "list",
          items: [
            "**Google Search Console:** track impressions, clicks and queries for question-led pages. Traffic from Google's AI features is counted within overall web search data rather than reported separately.",
            "**Analytics referrals:** watch visits from assistant domains such as chatgpt.com and perplexity.ai, and note which pages they land on.",
            "**Manual answer checks:** run a fixed list of priority questions on each platform at regular intervals and record whether and how you are cited. Results vary by user, location and time, so look for patterns.",
            "**Lead sources:** ask new inquiries how they found you, since assistants do not always pass a referrer.",
          ],
        },
        {
          type: "p",
          text: "When a page is visible but misquoted, the fix is usually clearer wording or more current facts. When it is invisible, start with crawlability and whether the page really answers the question better than the alternatives. [Book a consultation](/book-consultation) if you would like us to set up this monitoring.",
        },
      ],
    },
  ],
  engagement: [
    {
      title: "Content and visibility audit",
      text: "We review your priority pages for crawlability, indexing, structure and accuracy, check your structured data and robots.txt rules, and record how your brand currently appears for important questions in search and AI assistants.",
    },
    {
      title: "Question and answer map",
      text: "We collect the questions your customers ask, group them by intent and assign each one to a page. For every page we define the headings, the direct answer, the supporting detail, the FAQs and the evidence it needs.",
    },
    {
      title: "Implementation",
      text: "We write and edit content, fix HTML and rendering issues, add structured data that matches what is on the page and align your brand details across the web, working in your CMS or alongside your developers.",
    },
    {
      title: "Monitor and refine",
      text: "We track Search Console data, assistant referrals and a fixed set of manual answer checks, then report what changed. Pages that are unclear, outdated or misquoted go back into the queue for revision.",
    },
  ],
  faqs: [
    {
      question: "How is AEO different from SEO?",
      answer:
        "SEO covers everything that helps a site get crawled, indexed and ranked. AEO is the part of that work focused on answering specific questions clearly enough to be shown or cited as an answer. They share the same foundations, and AEO rarely succeeds on a site with weak SEO.",
    },
    {
      question: "Can you guarantee we will appear in AI Overviews or ChatGPT answers?",
      answer:
        "No, and we would be wary of anyone who does. Each platform chooses its sources based on the query, the user and signals it does not fully disclose. We improve the clarity, accuracy and accessibility of your answers, which makes your pages stronger candidates.",
    },
    {
      question: "Do we need special markup to appear in Google AI Overviews?",
      answer:
        "No. Google states there are no additional requirements or special markup for AI Overviews or AI Mode. A page needs to be indexed and eligible to appear with a snippet, which comes down to standard SEO practice.",
    },
    {
      question: "Should we still add FAQ schema to our pages?",
      answer:
        "It is optional. Accurate FAQPage markup is valid, but Google limits FAQ rich results to authoritative government and health sites, so most businesses will see no visual change. We prioritize the visible FAQ content itself, which is what readers and answer engines actually use.",
    },
    {
      question: "Does AEO help with voice search?",
      answer:
        "It helps to the extent that voice assistants favor short, direct answers and accurate business details. Answer-first writing, clear hours, locations and contact information, and a well-maintained Google Business Profile all support voice queries. Each assistant uses its own data sources, so results vary.",
    },
  ],
  related: ["geo", "seo", "on-page-seo", "technical-seo", "seo-standards"],
  updated: "2026-10-19",
};
