import type { Faq } from "@/lib/subpages";

/*
  Sub-pages of About, Testimonials and Contact. Built only from facts the business has
  published (founders, mission, stats, ways of working) — no invented history, clients
  or numbers. Inline markup: [label](/path) and **bold**.
*/

export type CompanyBlock =
  | { type: "text"; heading: string; paragraphs: string[] }
  | { type: "cards"; heading: string; intro?: string; carousel?: boolean; items: { title: string; body: string; icon: string }[] }
  | { type: "steps"; heading: string; intro?: string; items: { title: string; body: string; points: string[] }[] }
  | { type: "split"; heading: string; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  | { type: "checklist"; heading: string; intro?: string; items: { title: string; body: string }[] }
  | { type: "stats" }
  | { type: "founders" }
  | { type: "form"; heading: string; intro: string }
  | { type: "scene"; variant: "pipeline" | "orbit" | "constellation"; caption: string };

export type CompanyPage = {
  section: "about" | "clients" | "contact";
  slug: string;
  navLabel: string;
  blurb: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  blocks: CompanyBlock[];
  faqs: Faq[];
};

export const SECTION_META = {
  about: { label: "About", href: "/about" },
  clients: { label: "Testimonials", href: "/clients" },
  contact: { label: "Contact", href: "/contact" },
} as const;

export const COMPANY_PAGES: CompanyPage[] = [
  /* ─────────────────────────────── About ─────────────────────────────── */
  {
    section: "about",
    slug: "our-story",
    navLabel: "Our story",
    blurb: "Why SmartWebCare exists and what we set out to build.",
    eyebrow: "About · Our story",
    title: "From raw ideas to brands people remember.",
    metaTitle: "Our Story — Why SmartWebCare Exists",
    metaDescription:
      "The story behind SmartWebCare: two founders who believe brand-building is a responsibility, and an agency built to build, scale and grow brands with purpose.",
    lead: "SmartWebCare started with a simple belief: every business has a story worth telling well, and most never get the partner they need to tell it.",
    blocks: [
      {
        type: "text",
        heading: "It started with a frustration",
        paragraphs: [
          "Before SmartWebCare, our founders kept meeting the same kind of business owner. They had a good product and real customers, but their brand looked like an afterthought: a logo made in a hurry, social pages that went quiet for weeks, a website nobody had touched since launch.",
          "Most of them had already tried an agency. The story was usually the same: an exciting pitch, a templated plan, then slow replies once the contract was signed. Nobody had sat down to understand the business first.",
          "SmartWebCare was built to be the opposite of that experience. We start by learning how your business actually makes money, who it serves and what makes it different, and only then decide what to design, post or build.",
        ],
      },
      {
        type: "cards",
        heading: "Build. Scale. Grow.",
        intro: "Our mission is to turn ideas into iconic brands. In practice that means three kinds of work, often for the same client over time.",
        carousel: true,
        items: [
          { icon: "sparkles", title: "Build from scratch", body: "Naming, identity, packaging, a website and the first content — the foundations a new brand stands on. See [brand development](/brand-development)." },
          { icon: "trending", title: "Scale with strategy", body: "Positioning, channel plans and campaigns that turn early traction into a repeatable engine. See [strategic marketing](/strategic-marketing)." },
          { icon: "heart", title: "Grow with purpose", body: "Consistent content, community, search visibility and automation that compound month after month. See [social media marketing](/social-media-marketing)." },
          { icon: "bot", title: "Work smarter with AI", body: "AI agents and automations that answer leads faster and free your team for the work only people can do. See [AI agents](/ai-agents)." },
        ],
      },
      {
        type: "text",
        heading: "What we refused to become",
        paragraphs: [
          "We don't do templated work. Two clinics in the same city still have different patients, different doctors and different reasons to be chosen, so their brands shouldn't look interchangeable.",
          "We don't ghost clients after onboarding. Communication is WhatsApp-first, and you'll talk to people who know your account rather than a ticket queue.",
          "And we don't treat brand-building as a transaction. We work as partners, not vendors, because the decisions we help you make will shape how customers see your business for years.",
        ],
      },
      { type: "stats" },
      {
        type: "text",
        heading: "Where we are today",
        paragraphs: [
          "Today SmartWebCare is a full-service branding, marketing and AI studio based in New Delhi, working with businesses across India and abroad. The work ranges from product packaging and Instagram presence to [web development](/web-development), [SEO](/seo) and [AI automation](/ai-automations).",
          "The approach hasn't changed: combine design thinking, content creativity and real-time data to craft stories that convert. Read how that works day to day on [how we work](/about/how-we-work), or meet [the founders](/about/founders).",
        ],
      },
    ],
    faqs: [
      { q: "What kind of businesses does SmartWebCare work with?", a: "Founders launching a first product, established businesses refreshing how they look online, and professionals building a personal brand. Clients range from skincare and coffee brands to coaches, creators and B2B companies." },
      { q: "Is SmartWebCare only for Indian businesses?", a: "No. We're based in New Delhi and work with businesses across India, and we also support brands in markets such as the UAE, UK, US, Canada and Australia." },
      { q: "Do you only do social media?", a: "No. We cover branding, design, websites, search, performance marketing and AI automation as well, so one team can carry a brand from first idea to steady growth. Browse [all services](/services)." },
    ],
  },
  {
    section: "about",
    slug: "founders",
    navLabel: "Founders",
    blurb: "Meet Khyati Arora and Kartik Sahni.",
    eyebrow: "About · Founders",
    title: "Meet the founders.",
    metaTitle: "Founders — Khyati Arora & Kartik Sahni",
    metaDescription:
      "Meet SmartWebCare's co-founders: Khyati Arora, a decade in social media and brand building, and Kartik Sahni, who has crafted brands from scratch for 5+ years.",
    lead: "SmartWebCare is founder-led. When you book a consultation, you speak with the people who will shape your strategy.",
    blocks: [
      { type: "founders" },
      {
        type: "split",
        heading: "Two halves of the same brief",
        left: {
          title: "Khyati — strategy with soul",
          items: [
            "A decade of hands-on work in social media and brand building.",
            "Turns scattered ideas into stories that stop the scroll and stick.",
            "Keeps every plan anchored to what makes the brand human.",
          ],
        },
        right: {
          title: "Kartik — marketing with bite",
          items: [
            "More than five years crafting brands from scratch.",
            "Brings bold ideas and sharp commercial instincts to every launch.",
            "Loves building things that last beyond one campaign.",
          ],
        },
      },
      {
        type: "text",
        heading: "Why founder-led matters to you",
        paragraphs: [
          "In many agencies the senior people win the pitch and juniors run the account. At SmartWebCare the founders stay close to the work: they lead the first conversations, guide the strategy and remain reachable when decisions need a quick answer.",
          "That keeps the thinking consistent from the first call to the hundredth post, and it means the people who promised the plan are accountable for delivering it.",
          "You can see how a typical engagement runs on [how we work](/about/how-we-work), or start the conversation with a [free 30-minute consultation](/book-consultation).",
        ],
      },
    ],
    faqs: [
      { q: "Will I speak to a founder directly?", a: "Yes. Consultations are with the founders, and they stay involved in strategy and key reviews throughout an engagement." },
      { q: "Where can I learn more about Khyati and Kartik?", a: "Both share their work on LinkedIn; you'll find links to their profiles on this page." },
      { q: "Who else works on my account?", a: "Depending on the scope, specialists in design, content, video, development and ads join the project, with the founders guiding direction and quality." },
    ],
  },
  {
    section: "about",
    slug: "how-we-work",
    navLabel: "How we work",
    blurb: "Our four-stage process, communication and reporting.",
    eyebrow: "About · How we work",
    title: "How a SmartWebCare engagement works.",
    metaTitle: "How We Work — Process, Updates & Reporting",
    metaDescription:
      "How SmartWebCare runs a project: discovery, strategy, content and execution, WhatsApp-first communication, monthly reporting and clear approvals at every step.",
    lead: "Every engagement follows the same four stages. What changes is the work inside them, because no two businesses need the same plan.",
    blocks: [
      { type: "scene", variant: "pipeline", caption: "Discovery → Strategy → Content → Execution & growth" },
      {
        type: "steps",
        heading: "The four stages",
        intro: "Each stage ends with something you can review and approve before we move on.",
        items: [
          { title: "Discovery", body: "We learn your business, goals and the audience you need to reach.", points: ["A conversation about how the business makes money and what's working today", "A look at your current brand, channels, website and competitors", "Agreement on goals and how we'll measure them"] },
          { title: "Strategy", body: "We turn what we learned into a platform-specific plan.", points: ["Positioning and messaging the whole team can use", "Channel choices with a reason for each one", "A roadmap with priorities for the first months"] },
          { title: "Content", body: "We design and produce what the plan calls for.", points: ["Content calendars planned around your calendar and launches", "Design, copy and video made for each channel", "Drafts shared for feedback before anything goes live"] },
          { title: "Execution & growth", body: "We launch, track performance and improve every month.", points: ["Publishing, campaign management and community replies as scoped", "Monthly reporting on the measures agreed in discovery", "Regular reviews to double down on what works and drop what doesn't"] },
        ],
      },
      {
        type: "cards",
        heading: "How we stay in touch",
        carousel: true,
        items: [
          { icon: "message", title: "WhatsApp-first", body: "A direct line to the team instead of ticket queues. Quick questions get quick answers." },
          { icon: "clock", title: "24-hour response", body: "We reply within a working day at the latest, and usually much sooner." },
          { icon: "check", title: "Clear approvals", body: "Nothing public goes live without your sign-off on the plan, the creative or the copy." },
          { icon: "chart", title: "Monthly reporting", body: "A plain-English report on the agreed measures, what we learned and what we'll change next. See [how we measure results](/clients/how-we-measure-results)." },
          { icon: "lock", title: "Confidential by default", body: "Your ideas, numbers and plans stay with us." },
        ],
      },
      {
        type: "text",
        heading: "What we ask from you",
        paragraphs: [
          "Good work needs a few things from your side: access to the accounts and tools involved, one person who can give feedback and approvals, and honesty about what has and hasn't worked before.",
          "If you're preparing to brief us, our [project brief guide](/contact/project-brief) lists what to share so the first call is as useful as possible.",
        ],
      },
    ],
    faqs: [
      { q: "How long does each stage take?", a: "It depends on scope. A focused project can move through discovery and strategy quickly, while a full brand build takes longer. You'll get a timeline with the proposal." },
      { q: "Can we skip straight to execution?", a: "Sometimes, if you already have a clear strategy and brand. We'll still run a short discovery so the work fits your goals." },
      { q: "How do you report results?", a: "Monthly, against the measures agreed at the start, with notes on what we learned and what we'll change. Read more in [how we measure results](/clients/how-we-measure-results)." },
    ],
  },
  {
    section: "about",
    slug: "values",
    navLabel: "Our values",
    blurb: "The principles behind every decision we make.",
    eyebrow: "About · Values",
    title: "The values behind the work.",
    metaTitle: "Our Values — How SmartWebCare Works",
    metaDescription:
      "The principles that guide SmartWebCare: strategy with soul, human-first communication, partnership over vendorship, honesty about results and respect for your data.",
    lead: "Values only matter if they change what you do on an ordinary Tuesday. Here are ours, and what each one means in practice.",
    blocks: [
      {
        type: "cards",
        heading: "What we stand for",
        items: [
          { icon: "sparkles", title: "Strategy + soul", body: "We build with purpose, not just pixels. Every design, post and page should serve a business goal and still feel human." },
          { icon: "users", title: "Human-first communication", body: "Plain language, quick replies and a real person on the other end. A client-first culture starts with being easy to reach." },
          { icon: "heart", title: "Obsess like it's ours", body: "We care about your brand as if it carried our name: the details, the consistency and the long-term reputation." },
          { icon: "target", title: "Crisp execution", body: "Ideas are cheap. We value doing the agreed work well, on time and to a standard we're proud to show." },
          { icon: "handshake", title: "Partners, not vendors", body: "We'd rather tell you a plan won't work than take money for it. Brand-building is a responsibility, not just a service." },
          { icon: "shield", title: "Honest about results", body: "We never promise rankings, viral reach or overnight growth. We agree on measures we can influence and report them truthfully." },
        ],
      },
      {
        type: "text",
        heading: "Values we apply to technology",
        paragraphs: [
          "As more of our work involves AI — from content tools to [AI agents](/ai-agents) — we hold it to the same standards. AI should make customers' lives easier, not trick them. We design automations with clear hand-offs to people, and we're careful with personal data.",
          "Our thinking on this is in the [responsible AI marketing checklist](/insights/responsible-ai-marketing-checklist).",
        ],
      },
      {
        type: "text",
        heading: "Respect for your data",
        paragraphs: [
          "Your ideas and numbers stay with us. We ask only for the access a project needs, and we're happy to sign an NDA before you share sensitive details. How the website itself handles personal data is explained in our [privacy policy](/privacy-policy).",
        ],
      },
    ],
    faqs: [
      { q: "Will you tell me if an idea won't work?", a: "Yes. Being partners means giving honest advice, even when it means recommending less work rather than more." },
      { q: "Do you guarantee results?", a: "No honest agency can guarantee rankings, reach or revenue, because platforms and markets are outside anyone's control. We commit to clear goals, good work and transparent reporting." },
      { q: "Can you sign an NDA?", a: "Yes. Ask before the consultation or proposal stage and we'll put one in place." },
    ],
  },
  {
    section: "about",
    slug: "why-smartwebcare",
    navLabel: "Why SmartWebCare",
    blurb: "Is SmartWebCare the right fit for you? An honest answer.",
    eyebrow: "About · Why us",
    title: "Why businesses choose SmartWebCare.",
    metaTitle: "Why SmartWebCare — Is It the Right Fit?",
    metaDescription:
      "Why founders and brands choose SmartWebCare: one team for brand, content, web, search and AI, founder-led strategy, WhatsApp-first service — and when we're not the right fit.",
    lead: "We're not just your agency — we're your brand's favorite co-founder. Here's what that means, and an honest look at who we're best suited to.",
    blocks: [
      {
        type: "cards",
        heading: "Six reasons clients pick us",
        carousel: true,
        items: [
          { icon: "rocket", title: "Built 100+ brands from scratch", body: "Experience across skincare, coffee, coaching, creators, FMCG and B2B means fewer beginner mistakes on your budget." },
          { icon: "message", title: "WhatsApp-first", body: "Fast, real and always reachable. No waiting days for an email reply." },
          { icon: "sparkles", title: "Strategy + soul", body: "Plans grounded in your business goals, executed with craft and personality." },
          { icon: "layers", title: "One team, every channel", body: "Brand, content, video, websites, search, ads and AI under one roof, so nothing gets lost between agencies." },
          { icon: "users", title: "Founder-led", body: "The founders lead discovery and strategy and stay involved in quality." },
          { icon: "target", title: "Crisp execution", body: "Clear scopes, clear approvals and work delivered when promised." },
        ],
      },
      { type: "stats" },
      {
        type: "split",
        heading: "An honest fit check",
        left: {
          title: "We're a great fit if you…",
          items: [
            "Want one partner across brand, content, web and growth",
            "Value quick, direct communication",
            "Are ready to give feedback and approvals on time",
            "Care about a brand that lasts, not just this month's numbers",
          ],
        },
        right: {
          title: "We may not be right if you…",
          items: [
            "Need guaranteed rankings or follower numbers",
            "Want the cheapest possible option for one-off posts",
            "Can't share access or feedback during the project",
            "Need a very large in-house-style team on site",
          ],
        },
      },
      {
        type: "text",
        heading: "Compare your options",
        paragraphs: [
          "Weighing an agency against a freelancer or an in-house hire? Our comparisons lay out the trade-offs: [agency vs freelancer](/compare/agency-vs-freelancer) and [AI vs human marketing](/compare/ai-vs-human-marketing). Or read what clients say on [Testimonials](/clients).",
        ],
      },
    ],
    faqs: [
      { q: "How is SmartWebCare different from a freelancer?", a: "A freelancer is often excellent at one skill. We bring strategy, design, content, video, web, search and AI together, so the work stays consistent across channels." },
      { q: "Do I have to sign a long contract?", a: "Engagements are scoped to your needs, and terms are set out in the proposal before any work starts." },
      { q: "What's the first step?", a: "A free 30-minute consultation. We'll listen, ask questions and tell you honestly what we'd do first. [Book a time](/book-consultation)." },
    ],
  },

  /* ──────────────────────────── Testimonials ──────────────────────────── */
  {
    section: "clients",
    slug: "working-with-us",
    navLabel: "Working with us",
    blurb: "What it's like to be a SmartWebCare client, week to week.",
    eyebrow: "Testimonials · Working with us",
    title: "What it's like to work with us.",
    metaTitle: "Working With SmartWebCare — The Client View",
    metaDescription:
      "What to expect as a SmartWebCare client: onboarding, the first month, communication on WhatsApp, approvals, reporting and how we handle feedback and changes.",
    lead: "Clients mention the same things again and again: we're easy to reach, we listen, and the work feels like theirs. Here's how that experience is designed.",
    blocks: [
      {
        type: "steps",
        heading: "Your first weeks",
        items: [
          { title: "Kick-off", body: "A working session to confirm goals, audiences, priorities and who approves what.", points: ["Access to the accounts and tools in scope", "A direct WhatsApp line to the team", "Agreed measures of success"] },
          { title: "Plan and first drafts", body: "We turn the kick-off into a plan and share the first creative for feedback.", points: ["A clear calendar of what's coming", "First designs, scripts or pages to react to", "Space to say what feels on-brand and what doesn't"] },
          { title: "Launch", body: "Approved work goes live and we start measuring.", points: ["Publishing or campaigns as scoped", "Quick fixes when something needs adjusting", "Early signals shared as they come in"] },
          { title: "Monthly rhythm", body: "A steady cycle of creating, publishing, measuring and improving.", points: ["A monthly report in plain English", "A review call to agree next month's focus", "Ongoing ideas, not just maintenance"] },
        ],
      },
      {
        type: "cards",
        heading: "What clients can count on",
        items: [
          { icon: "message", title: "Reachable", body: "WhatsApp-first communication and a reply within 24 hours, usually much sooner." },
          { icon: "check", title: "In control", body: "Nothing goes live without your approval." },
          { icon: "refresh", title: "Feedback that sticks", body: "We note your preferences so the same correction never needs repeating." },
          { icon: "lock", title: "Confidential", body: "Your plans and numbers stay private." },
        ],
      },
      {
        type: "text",
        heading: "Hear it from clients",
        paragraphs: [
          "The best evidence is what clients say in their own words. Read their stories on [Testimonials](/clients), and see how we report progress on [how we measure results](/clients/how-we-measure-results).",
        ],
      },
    ],
    faqs: [
      { q: "How many revisions are included?", a: "Revision rounds are set out in each proposal so expectations are clear before work begins." },
      { q: "Can I change priorities mid-month?", a: "Yes, within the agreed scope. Tell us on WhatsApp and we'll re-plan; bigger changes are discussed openly first." },
      { q: "Who do I contact with a problem?", a: "The same team you work with every day, and the founders are always one message away for anything serious." },
    ],
  },
  {
    section: "clients",
    slug: "how-we-measure-results",
    navLabel: "How we measure results",
    blurb: "The metrics we report — and the vanity numbers we don't chase.",
    eyebrow: "Testimonials · Measuring results",
    title: "How we measure results.",
    metaTitle: "How We Measure Marketing Results",
    metaDescription:
      "How SmartWebCare sets goals and reports on them: business outcomes first, channel measures second, vanity metrics last — with honest monthly reporting.",
    lead: "Likes are easy to count and easy to misread. We agree on what success means for your business first, then report on the measures that move it.",
    blocks: [
      {
        type: "checklist",
        heading: "Three levels of measurement",
        intro: "Every report connects channel activity to the outcomes you care about.",
        items: [
          { title: "Business outcomes", body: "Enquiries, bookings, sales, qualified leads or applications — whatever the business actually needs more of." },
          { title: "Channel performance", body: "Reach to the right audience, saves and shares, profile visits, website sessions, search visibility, cost per lead." },
          { title: "Brand health", body: "How people describe you, the quality of comments and messages, review ratings and branded searches over time." },
        ],
      },
      {
        type: "cards",
        heading: "What we look at, by service",
        carousel: true,
        items: [
          { icon: "camera", title: "Social media", body: "Reach among your target audience, saves, shares, profile actions and DMs that turn into enquiries. See the [Instagram guide](/instagram-marketing/guide)." },
          { icon: "search", title: "SEO & AEO", body: "Queries and pages gaining visibility, clicks from search, mentions in AI answers and enquiries from organic traffic. See the [SEO guide](/seo/guide)." },
          { icon: "trending", title: "Performance marketing", body: "Cost per qualified lead or sale, conversion rate and return on ad spend against agreed targets." },
          { icon: "bot", title: "AI & automation", body: "Response times, conversations handled, hand-offs to your team and hours saved." },
          { icon: "globe", title: "Websites", body: "Speed and Core Web Vitals, conversion rate on key pages and form or call completions." },
        ],
      },
      {
        type: "text",
        heading: "Our reporting promises",
        paragraphs: [
          "Reports arrive monthly, in plain English, with the numbers that matter at the top. If something underperformed, we say so and explain what we'll change.",
          "We never present vanity metrics as wins on their own, and we never promise outcomes like rankings or viral reach that no one can control. For the thinking behind budgets and channel mix, read [how to split a small marketing budget](/insights/marketing-budget-allocation-small-business).",
        ],
      },
    ],
    faqs: [
      { q: "What tools do you report from?", a: "We use the platforms' own analytics plus tools such as Google Analytics and Search Console where they're part of the scope, so the numbers can be checked at the source." },
      { q: "How soon will I see results?", a: "It depends on the channel. Paid campaigns produce data quickly; SEO and brand-building compound over months. We set realistic expectations during discovery." },
      { q: "What if the numbers go down?", a: "We tell you, explain why if we can, and propose what to change. Honest reporting is part of the partnership." },
    ],
  },

  /* ─────────────────────────────── Contact ─────────────────────────────── */
  {
    section: "contact",
    slug: "project-brief",
    navLabel: "Project brief guide",
    blurb: "What to share so your first call is genuinely useful.",
    eyebrow: "Contact · Project brief",
    title: "How to brief us (or any agency).",
    metaTitle: "How to Write a Marketing Project Brief",
    metaDescription:
      "A practical checklist for briefing a marketing or branding agency: goals, audience, budget, timing, assets and how you'll measure success — then send us yours.",
    lead: "A good brief saves weeks. You don't need a formal document — just honest answers to the questions below. Then send it through the form.",
    blocks: [
      {
        type: "checklist",
        heading: "What to include",
        intro: "Short answers are fine. If you don't know something yet, say so — that's useful too.",
        items: [
          { title: "Your business in two lines", body: "What you sell, to whom, and what makes you different from the obvious alternatives." },
          { title: "The goal", body: "What should change because of this project: more enquiries, a launch, a rebrand, better reviews, less time answering the same questions." },
          { title: "Your audience", body: "Who you want to reach, where they spend time and what they worry about before buying." },
          { title: "What exists today", body: "Logo and brand files, website, social accounts, past campaigns and what did or didn't work." },
          { title: "Timing", body: "Launch dates, seasonal peaks or deadlines we should plan around." },
          { title: "Budget range", body: "A rough range helps us recommend the right scope instead of guessing." },
          { title: "Decision-makers", body: "Who gives feedback and who signs off, so approvals don't stall." },
          { title: "How you'll judge success", body: "The two or three numbers or signs that would make this project a win for you." },
        ],
      },
      {
        type: "text",
        heading: "Briefs we see most often",
        paragraphs: [
          "**Launching something new?** Tell us the launch date and what you already have; [brand development](/brand-development) and [go-to-market strategy](/go-to-market-strategy) often go together.",
          "**Refreshing an existing brand?** Share what customers already like about you so a [rebrand](/rebranding) keeps it. **Want more leads?** Share where enquiries come from today; we may suggest [performance marketing](/performance-marketing) or [AI agents](/ai-agents) to respond faster.",
        ],
      },
      { type: "form", heading: "Send your brief", intro: "Paste your answers into the message box — or just the parts you know. We'll reply by email or phone." },
    ],
    faqs: [
      { q: "Do I need a formal document?", a: "No. A few honest paragraphs in the form are enough to start. We'll fill the gaps together on the call." },
      { q: "What if I don't know my budget?", a: "Tell us what you're hoping to achieve and we'll suggest options at different levels of investment." },
      { q: "Will you share my brief with anyone?", a: "No. Your brief stays confidential, and we can sign an NDA before you share sensitive details." },
    ],
  },
  {
    section: "contact",
    slug: "faq",
    navLabel: "Contact FAQ",
    blurb: "Response times, consultations and what happens after you get in touch.",
    eyebrow: "Contact · FAQ",
    title: "Getting in touch: your questions answered.",
    metaTitle: "Contact FAQ — Response Times & Next Steps",
    metaDescription:
      "What happens after you contact SmartWebCare: how fast we reply, the free 30-minute consultation, WhatsApp vs form vs phone, and how your details are handled.",
    lead: "Everything you might want to know before you message, call or send the form.",
    blocks: [
      {
        type: "cards",
        heading: "Pick the channel that suits you",
        items: [
          { icon: "message", title: "WhatsApp", body: "The fastest way to reach us for a quick question or to start a conversation." },
          { icon: "phone", title: "Phone", body: "Prefer to talk? Call us — the number is in the header and footer of every page." },
          { icon: "mail", title: "Enquiry form", body: "Best for detailed briefs. Your message goes straight to the team. Try the [project brief guide](/contact/project-brief)." },
          { icon: "calendar", title: "Book a call", body: "Pick a time for a free 30-minute consultation with the founders. [Book now](/book-consultation)." },
        ],
      },
      {
        type: "steps",
        heading: "What happens after you get in touch",
        items: [
          { title: "We reply", body: "Within 24 hours at the latest, and usually much sooner.", points: ["A real person, not an auto-responder", "Questions to understand your goal"] },
          { title: "A free consultation", body: "A 30-minute call to understand your business and goals.", points: ["No obligation to go ahead", "Honest advice on what to do first"] },
          { title: "A written proposal", body: "If there's a good fit, we send a scoped proposal.", points: ["Scope, deliverables and timeline", "Terms set out before work starts"] },
        ],
      },
    ],
    faqs: [
      { q: "How quickly will you reply?", a: "We aim to reply within 24 hours, and on WhatsApp it's often within minutes." },
      { q: "Is the consultation really free?", a: "Yes. The 30-minute consultation is free and comes with no obligation to work with us." },
      { q: "Do you work with businesses outside India?", a: "Yes. We're based in New Delhi and also work with brands in markets such as the UAE, UK, US, Canada and Australia, working together over calls and WhatsApp." },
      { q: "What should I prepare before the call?", a: "Your goals, what exists today and a rough budget range help most. The [project brief guide](/contact/project-brief) has a full checklist." },
      { q: "What happens to the details I send?", a: "We use them only to reply to your enquiry and follow up on it. You can ask us to delete them at any time — see the [privacy policy](/privacy-policy)." },
    ],
  },
];

export const getCompanyPage = (section: CompanyPage["section"], slug: string) =>
  COMPANY_PAGES.find((p) => p.section === section && p.slug === slug);

export const getCompanyPages = (section: CompanyPage["section"]) => COMPANY_PAGES.filter((p) => p.section === section);
