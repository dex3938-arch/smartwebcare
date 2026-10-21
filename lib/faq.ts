import { withContacts } from "./site";
/**
 * FAQ content, grouped by category.
 * Inline text supports a tiny markup: [label](/path) links, **bold** and `code`.
 */

export type FaqItem = { question: string; answer: string };
export type FaqCategory = { id: string; title: string; intro: string; items: FaqItem[] };

export const FAQ_CATEGORIES: FaqCategory[] = withContacts([
  {
    id: "general",
    title: "About SmartWebCare",
    intro: "Who we are, where we work and what it's like to start a project with us.",
    items: [
      {
        question: "Who is SmartWebCare?",
        answer:
          "SmartWebCare is a full-service branding & marketing agency founded by Khyati Arora and Kartik Sahni, on a mission to turn ideas into iconic brands. We build brands from scratch, scale them with strategy and grow them with purpose — from personal branding and social media to performance marketing, design, websites and AI automation. You can see everything we offer on our [services page](/services).",
      },
      {
        question: "Where are you based, and do you work with clients outside India?",
        answer:
          "We're based in New Delhi, India, and work with clients both in India and abroad. Day-to-day communication happens over WhatsApp and email, so we can work together wherever you're located. If your team prefers a particular channel for updates, tell us and we'll agree on it at the start.",
      },
      {
        question: "How do I get started?",
        answer:
          "The simplest way is to [book a free 30-minute consultation](/book-consultation), where we learn about your goals, current setup and constraints, with no obligation to go ahead. You can also send an enquiry through the [contact page](/contact), message us using the WhatsApp button, call us on {{PHONE}}, or email {{EMAIL}}. If there's a good fit, we'll scope the work and send you a written proposal.",
      },
      {
        question: "How long does a typical project take?",
        answer:
          "It depends on the scope: a single focused automation and a full website rebuild are very different pieces of work. Once we understand what you need, we set out the timeline and milestones in the written proposal so you know what to expect. Timelines also depend on how quickly feedback, approvals and access come through on both sides.",
      },
      {
        question: "Will you keep our information confidential, and can you sign an NDA?",
        answer:
          "Yes. We treat the business information you share with us as confidential and use it only to scope and deliver your work. If you'd like a non-disclosure agreement in place before sharing details, ask and we can put one in place before the consultation or proposal stage. How the website itself handles data is explained in our [privacy policy](/privacy-policy).",
      },
    ],
  },
  {
    id: "seo-basics",
    title: "SEO basics",
    intro: "The fundamentals of search engine optimization, and what to realistically expect from it.",
    items: [
      {
        question: "What is SEO?",
        answer:
          "Search engine optimization is the work of making your site easy for search engines to crawl, understand and trust, so it can appear when people search for what you offer. It covers the technical health of the site, the content and structure of each page, and your reputation across the wider web. Our [SEO standards guide](/seo-standards) explains the fundamentals we work to, and our [SEO service](/seo) shows how we apply them.",
      },
      {
        question: "How long does SEO take to show results?",
        answer:
          "SEO typically takes months rather than weeks, and there's no fixed timeline. How quickly you see movement depends on your starting point, how competitive your market is, how much work the site needs and how consistently improvements are made. Be wary of anyone who promises results by a specific date.",
      },
      {
        question: "Can you guarantee first-page rankings?",
        answer:
          "No, and nobody honestly can. Search engines decide rankings with their own systems, which change regularly and weigh many factors outside any agency's control. What we can commit to is doing the work well, explaining our reasoning and reporting on progress transparently.",
      },
      {
        question: "What's the difference between SEO, AEO and GEO?",
        answer:
          "SEO focuses on visibility in traditional search results. [AEO](/aeo) (answer engine optimization) focuses on making your content easy to use as a direct answer, for example in featured snippets or voice assistants, while [GEO](/geo) (generative engine optimization) focuses on how AI tools such as ChatGPT, Perplexity or Google's AI Overviews understand and reference your brand. They overlap heavily, and a technically sound site with clear, trustworthy content is the foundation for all three.",
      },
      {
        question: "Do I need SEO if I already run paid ads?",
        answer:
          "Paid ads and organic search do different jobs. Ads can bring traffic as soon as a campaign is live but stop when the budget does, while SEO builds visibility that can keep working over time. Many businesses use both, and data from [performance marketing](/performance-marketing) campaigns can help show which search terms are worth targeting organically.",
      },
    ],
  },
  {
    id: "on-page-seo",
    title: "On-page SEO",
    intro: "How the content, structure and markup of each page help people and search engines understand it.",
    items: [
      {
        question: "What does on-page SEO include?",
        answer:
          "On-page SEO covers everything on the page itself: the title tag, headings, body content, internal links, image alt text, URL and structured data. The goal is for each page to clearly answer what a searcher is looking for and make its topic obvious to search engines. Our [on-page SEO guide](/on-page-seo) walks through each element.",
      },
      {
        question: "Do meta descriptions and meta keywords affect rankings?",
        answer:
          "Google ignores the meta keywords tag entirely, so it's not worth spending time on. Meta descriptions aren't a direct ranking factor, but a clear, accurate description can encourage people to click when it's shown in results. Google may also rewrite the snippet using text from your page if it thinks that better matches the search.",
      },
      {
        question: "Should each page target one keyword?",
        answer:
          "It's better to think in terms of one main topic or search intent per page, rather than a single exact phrase. A good page naturally covers related terms and questions, and search engines are good at understanding synonyms. What you want to avoid is several pages competing for the same intent, which splits your signals and confuses visitors.",
      },
      {
        question: "Does adding structured data guarantee rich results?",
        answer:
          "No. Structured data (schema markup) helps search engines understand your content and can make a page eligible for certain rich results, but Google decides whether to show them. For example, since August 2023 Google shows FAQ rich results only for well-known, authoritative government and health websites, so adding FAQ markup to a business site generally won't produce them.",
      },
      {
        question: "How long should a page's content be?",
        answer:
          "There's no ideal word count, and Google has said it doesn't prefer any particular length. A page should be as long as it needs to be to answer the question fully and clearly, without padding. Looking at what already ranks for your topic is a useful guide to the depth people expect.",
      },
    ],
  },
  {
    id: "off-page-seo",
    title: "Off-page SEO",
    intro: "How links, mentions and reputation beyond your own website influence search visibility.",
    items: [
      {
        question: "What is off-page SEO?",
        answer:
          "Off-page SEO covers the signals that come from outside your website, mainly links from other sites, mentions of your brand, reviews and local listings. These help search engines judge how relevant and trustworthy your business is. Our [off-page SEO guide](/off-page-seo) explains how we approach it.",
      },
      {
        question: "Is it okay to buy backlinks?",
        answer:
          "Buying links that pass ranking value violates Google's spam policies and can lead to lower rankings or a manual action against your site. If you pay for a placement, such as a sponsored article, the link should be marked with `rel=\"sponsored\"` or `rel=\"nofollow\"`. Sustainable links come from being genuinely worth referencing, through useful content, digital PR, partnerships and community involvement.",
      },
      {
        question: "How do online reviews affect search visibility?",
        answer:
          "For local searches, Google says the number of reviews and their ratings factor into local ranking, alongside relevance, distance and prominence. Reviews also shape whether people choose to contact you once they find you. They must come from real customers: fake or paid-for reviews break platform policies and can be removed, along with the trust they were meant to build.",
      },
      {
        question: "Should I use Google's disavow tool?",
        answer:
          "Most sites never need it. Google is generally good at ignoring spammy links on its own, and the disavow tool is meant for cases where a site has many unnatural links that have caused, or are likely to cause, a manual action. Disavowing the wrong links can remove value you were getting, so get advice before using it.",
      },
    ],
  },
  {
    id: "technical-seo",
    title: "Technical SEO",
    intro: "The foundations that let search engines crawl, render and index your site properly.",
    items: [
      {
        question: "What does technical SEO cover?",
        answer:
          "Technical SEO makes sure search engines can find, crawl, render and index your pages. It includes site architecture, internal linking, status codes and redirects, canonical tags, HTTPS, mobile friendliness, page speed, structured data and how JavaScript content is handled. Our [technical SEO guide](/technical-seo) covers each area in more depth.",
      },
      {
        question: "Why isn't my page showing up in Google?",
        answer:
          "Common causes include a `noindex` tag, a robots.txt rule that stops Google crawling the page, a canonical tag pointing to a different URL, few or no internal links to the page, or the page simply being new. Google also doesn't index every page it crawls, especially thin or duplicate ones. The URL Inspection tool in Google Search Console shows how Google sees a specific page and is the best place to start.",
      },
      {
        question: "What's the difference between a redirect and a canonical tag?",
        answer:
          "A 301 redirect sends both visitors and search engines to a new URL, and is the right choice when a page has permanently moved. A canonical tag leaves the page accessible but tells search engines which version you prefer to have indexed when similar or duplicate versions exist. Google treats a canonical as a strong hint rather than a strict rule, so make sure your internal links and sitemap point to the same preferred URL.",
      },
      {
        question: "Does Google index the mobile or desktop version of my site?",
        answer:
          "Google uses mobile-first indexing, which means it primarily uses the mobile version of a page's content for indexing and ranking. If your mobile site hides content, structured data or links that appear on desktop, that information may be missed. A responsive design that serves the same content on every device avoids the problem.",
      },
      {
        question: "Can search engines read content that loads with JavaScript?",
        answer:
          "Google can render JavaScript, but it adds a processing step, and issues such as content that only appears after a click, or links without a real `href`, can stop pages being discovered. Some other crawlers, including some used by AI tools, don't run JavaScript at all. Serving important content in the initial HTML, through server-side rendering or static generation, is the most reliable approach.",
      },
    ],
  },
  {
    id: "aeo",
    title: "Answer engine optimization (AEO)",
    intro: "Structuring content so search engines and assistants can use it as a direct answer.",
    items: [
      {
        question: "How do I write content that can be used as a direct answer?",
        answer:
          "Lead each section with the question people actually ask, then answer it plainly in the first sentence or two before adding detail. Use descriptive headings, short paragraphs, and lists or tables where the information is naturally step-by-step or comparative. Our [AEO guide](/aeo) covers the patterns we use.",
      },
      {
        question: "Which questions should we answer on our site?",
        answer:
          "Start with the questions your customers already ask your sales and support teams, then add ones that appear in search features like People Also Ask and in your Google Search Console queries. Prioritize questions closely tied to what you sell, where a clear answer helps someone decide to get in touch. Each important question deserves a focused, well-structured answer rather than a passing mention.",
      },
      {
        question: "If our answer appears directly in search results, will people still visit our site?",
        answer:
          "Some won't, because a short answer can fully satisfy a simple question. Being the source shown still builds visibility and trust, and questions that need more detail, comparison or a next step still give people a reason to click through. That's why we focus AEO effort on questions where a clear answer naturally leads to further reading or an enquiry.",
      },
      {
        question: "How do you measure AEO results?",
        answer:
          "There's no single AEO metric, so we look at a mix of signals: the queries your pages appear for in Google Search Console, whether they're shown in features such as featured snippets, and changes in clicks and enquiries from those pages. Some answer surfaces, like voice assistants, report very little data, so measurement is directional rather than exact. Search engines decide which answer to show, so AEO improves your chances rather than guaranteeing a placement.",
      },
    ],
  },
  {
    id: "geo",
    title: "Generative engine optimization (GEO)",
    intro: "How AI assistants and AI search features find, understand and reference your brand.",
    items: [
      {
        question: "How do AI assistants decide which sources to mention?",
        answer:
          "Each AI tool works differently, but many combine what the model learned during training with web results retrieved for the specific question. Sources that are crawlable, clearly written, consistent about who you are and what you do, and referenced by other reputable sites are generally easier for these systems to use. Our [GEO guide](/geo) explains what we focus on.",
      },
      {
        question: "Can you guarantee our brand will be cited by ChatGPT or Google's AI Overviews?",
        answer:
          "No. AI tools generate answers on the fly, often vary their responses to the same question, and don't publish exactly how they choose sources. GEO improves the clarity and credibility of the information about your business, which can make citations more likely, but the outcome is never under anyone's direct control.",
      },
      {
        question: "Do we need an llms.txt file or special AI markup?",
        answer:
          "`llms.txt` is a proposed convention rather than an established standard, and there's limited evidence that AI tools rely on it. Google's guidance says you don't need special AI text files or markup to appear in its AI features; the usual fundamentals of crawlable, helpful content apply. We prioritize clear, well-structured pages first and treat extras like this as optional.",
      },
      {
        question: "How can we check how AI tools describe our business?",
        answer:
          "Ask the AI assistants your customers are likely to use the questions they'd ask, and note whether you're mentioned, how you're described and which sources are cited. Because answers vary between sessions, repeat the same prompts over time rather than relying on a single check. Inaccurate descriptions often trace back to outdated or inconsistent information about you on the web, which GEO work can help correct.",
      },
    ],
  },
  {
    id: "xml-sitemaps",
    title: "XML sitemaps",
    intro: "What a sitemap does, what belongs in it, and which settings search engines actually use.",
    items: [
      {
        question: "What is an XML sitemap, and does my site need one?",
        answer:
          "An XML sitemap is a file that lists the URLs you want search engines to discover, with optional details such as when each page last changed. It's most helpful for large sites, new sites with few external links, and sites whose pages aren't well linked internally. Small, well-linked sites can usually be crawled fine without one, but a sitemap is easy to maintain and rarely a bad idea. Our [XML sitemap guide](/xml-sitemap) covers the details.",
      },
      {
        question: "Do the priority and changefreq values matter?",
        answer:
          "Not for Google, which ignores `priority` and `changefreq`. Google does use `lastmod` if it's consistently accurate, meaning it reflects meaningful changes to the page rather than the date the sitemap was generated. Setting every page's `lastmod` to today's date can lead Google to stop trusting it.",
      },
      {
        question: "Which URLs should be in a sitemap?",
        answer:
          "Include only canonical, indexable URLs that return a 200 status: the pages you actually want to appear in search. Leave out redirects, error pages, `noindex` pages, duplicates and URLs blocked by robots.txt, because they send mixed signals. Your sitemap should agree with the rest of your site's signals, not contradict them.",
      },
      {
        question: "How do search engines find my sitemap?",
        answer:
          "You can submit it in Google Search Console and Bing Webmaster Tools, and reference it in your robots.txt file with a `Sitemap:` line giving its full URL. A single sitemap can hold up to 50,000 URLs or 50 MB uncompressed, so larger sites split their URLs across several sitemaps listed in a sitemap index file. Submitting a sitemap helps discovery, but it doesn't guarantee that every listed page will be indexed.",
      },
    ],
  },
  {
    id: "robots-txt",
    title: "Robots.txt",
    intro: "What the robots.txt file controls, what it doesn't, and how to avoid costly mistakes.",
    items: [
      {
        question: "What does a robots.txt file do?",
        answer:
          "A robots.txt file sits at the root of your domain (for example, `https://example.com/robots.txt`) and tells crawlers which paths they may or may not crawl. It controls crawling, not indexing, and crawlers follow it voluntarily. Each subdomain needs its own file. Our [robots.txt guide](/robots-txt) explains the syntax.",
      },
      {
        question: "Will blocking a page in robots.txt keep it out of Google?",
        answer:
          "Not reliably. A `Disallow` rule stops Google from crawling a page, but the URL can still be indexed, usually without a description, if other pages link to it. To keep a page out of search results, allow it to be crawled and add a `noindex` meta tag or `X-Robots-Tag` HTTP header, or put it behind a password.",
      },
      {
        question: "Can I add a noindex rule to robots.txt?",
        answer:
          "No. Google stopped supporting `noindex` and other unofficial rules in robots.txt in 2019, so such a line has no effect. Also note that if a page is blocked from crawling, Google can't see a `noindex` tag on the page itself either, so don't combine the two for the same URL.",
      },
      {
        question: "Can I block AI crawlers with robots.txt?",
        answer:
          "Many AI companies publish user-agent names for their crawlers, such as OpenAI's `GPTBot`, which you can disallow like any other crawler. Google's `Google-Extended` token lets you control whether content Google crawls is used for its Gemini models, without affecting how your site appears in Google Search. Compliance is voluntary, and blocking these crawlers may also reduce your visibility in those tools, so it's a business decision worth making deliberately.",
      },
      {
        question: "What are the most common robots.txt mistakes?",
        answer:
          "The most damaging is a leftover `Disallow: /` from a staging site, which blocks crawling of the entire site. Others include blocking CSS or JavaScript files that Google needs to render pages, using robots.txt to hide sensitive URLs (the file itself is public), and relying on `crawl-delay`, which Google ignores. After any change, check the robots.txt report in Google Search Console to confirm Google has fetched the new version without errors.",
      },
    ],
  },
  {
    id: "website-performance",
    title: "Website performance",
    intro: "Core Web Vitals, how speed is measured, and what usually makes the biggest difference.",
    items: [
      {
        question: "What are Core Web Vitals, and what scores should we aim for?",
        answer:
          "Core Web Vitals are Google's metrics for real-world page experience: **Largest Contentful Paint (LCP)** for loading, **Interaction to Next Paint (INP)** for responsiveness and **Cumulative Layout Shift (CLS)** for visual stability. A page passes when, at the 75th percentile of visits, LCP is 2.5 seconds or less, INP is 200 milliseconds or less and CLS is 0.1 or less. Mobile and desktop are assessed separately.",
      },
      {
        question: "What's the difference between lab data and field data?",
        answer:
          "Lab data, such as a Lighthouse test, measures a page load in a controlled, simulated environment, which makes it useful for debugging and comparing changes. Field data comes from real Chrome users through the Chrome User Experience Report, and it's what the Core Web Vitals assessment is based on. Lab tools can't measure INP directly because it depends on real interactions, and sites with little traffic may not have enough field data to report at all.",
      },
      {
        question: "Do Core Web Vitals affect rankings?",
        answer:
          "Google uses Core Web Vitals as part of its page experience signals, but relevance and content quality matter far more. A fast page won't outrank a more helpful one simply because it's faster. Good performance is still worth the effort because it shapes whether visitors stay, read and get in touch.",
      },
      {
        question: "What usually makes a website slow?",
        answer:
          "The most common culprits are large, unoptimized images, slow server response times, too much JavaScript (often from third-party scripts such as chat widgets and trackers), and fonts or stylesheets that block rendering. Layout shifts usually come from images, ads or embeds that load without reserved space. We address these through [web development](/web-development) and [technical SEO](/technical-seo) work.",
      },
      {
        question: "Should the main image at the top of a page be lazy-loaded?",
        answer:
          "No. The largest image at the top of the page is often the element that defines LCP, and lazy-loading it delays when the browser starts fetching it. Load it straight away, size it properly and, where useful, give it `fetchpriority=\"high\"`; save lazy-loading for images further down the page.",
      },
    ],
  },
  {
    id: "ai-and-automation",
    title: "AI and automation",
    intro: "What AI agents, automations and AI receptionists are, and how we build them responsibly.",
    items: [
      {
        question: "What's the difference between an AI agent and an automation?",
        answer:
          "An automation follows a fixed set of steps you define, such as \"when a lead comes in, add it to the CRM and send a welcome email\", and suits predictable, repetitive work. An AI agent uses a language model to handle less predictable tasks, deciding which steps to take and which tools to use within limits you set. Many useful systems combine both. See [AI agents](/ai-agents) and [AI automations](/ai-automations) for more on each.",
      },
      {
        question: "Which platforms do you build automations on?",
        answer:
          "We typically build automations in n8n or Make, which connect the apps you already use, such as your CRM, email, spreadsheets and messaging tools, and pass data between them when something happens. n8n can also be self-hosted, which can suit businesses that want more control over where data is processed. We recommend a platform during scoping based on your existing tools, budget and data requirements.",
      },
      {
        question: "What does an AI receptionist do?",
        answer:
          "An [AI receptionist](/ai-receptionist) handles routine incoming conversations for your business, such as answering common questions, capturing customer details and helping with bookings. It works from information you approve, like your services, hours and policies. When a conversation needs a person, it hands over to your team.",
      },
      {
        question: "How is our data handled in an AI system you build?",
        answer:
          "We design each system to use only the data it needs, and agree during scoping which data it can access, where it's stored and which providers process it. AI models and automation platforms process data under their own terms, so we choose and configure them with your requirements in mind and, where possible, set them up in accounts you own. If sensitive or regulated data is involved, tell us early so we can plan for it.",
      },
      {
        question: "Can AI make mistakes, and when does a human step in?",
        answer:
          "Yes, language models can misunderstand requests or give confident but incorrect answers. We reduce that risk by limiting what each system is allowed to do, grounding its answers in your approved information, testing before launch, and building clear handoffs to a person for anything unusual, sensitive or high-stakes. You decide which actions need human approval.",
      },
    ],
  },
  {
    id: "pricing-and-process",
    title: "Pricing and process",
    intro: "How we quote, what goes into a proposal, and what working together looks like.",
    items: [
      {
        question: "How much do your services cost?",
        answer:
          "We don't have a public price list, because the right scope varies a lot from one business to the next. After a [free consultation](/book-consultation), we prepare a quote based on what you need and set it out in a written proposal before any work begins. The consultation itself costs nothing.",
      },
      {
        question: "What's included in a proposal?",
        answer:
          "The written proposal, or statement of work, sets out the scope, deliverables, timeline, fees, payment terms and what each side is responsible for. Work starts once you've accepted it, and it's the reference point if questions come up later. If your needs change during the project, we agree the change in writing before doing the extra work.",
      },
      {
        question: "What will you need from us?",
        answer:
          "Usually a clear picture of your goals, a single point of contact, and access to the relevant accounts, such as your website, analytics, Google Search Console, ad accounts or the apps an automation connects to. We'll also need any brand assets or content you want us to use, confirmation that you have the rights to them, and timely feedback and approvals. The proposal lists exactly what your project needs.",
      },
      {
        question: "How do you report on progress?",
        answer:
          "Reporting is agreed in the proposal: which metrics we track, how often you hear from us and in what format. We focus on measures tied to your goals, such as enquiries or qualified leads, and explain what changed, why, and what we plan to do next. Questions in between can come to us over WhatsApp or email whenever they come up.",
      },
      {
        question: "What if we need to cancel or ask for a refund?",
        answer:
          "Cancellations and refunds follow the terms in your written proposal or agreement. Our [refund policy](/refund-policy) explains how to make a request and how we review it.",
      },
    ],
  },
]);
