import { withContacts } from "./site";
/**
 * Legal page content (privacy policy, terms, refund policy, disclaimer).
 * Inline text supports a tiny markup: [label](/path) links, **bold** and `code`.
 * Review LEGAL_TO_CONFIRM with the business owner / a lawyer before relying on these pages.
 */

export type LegalSection = { id: string; heading: string; paragraphs: string[]; bullets?: string[] };

export type LegalPage = {
  slug: "privacy-policy" | "terms-and-conditions" | "refund-policy" | "disclaimer";
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
};

const UPDATED = "2026-10-19";

const CONTACT_BULLETS: string[] = [
  "Email: {{EMAIL}}",
  "Phone: {{PHONE}}",
  "WhatsApp: use the WhatsApp button on this website",
  "Location: {{CITY}}, India",
];

const privacyPolicy: LegalPage = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy | SmartWebCare",
  metaDescription:
    "How SmartWebCare handles personal data: enquiries sent through the website form, WhatsApp or email, Calendly bookings, analytics tools, third-party providers and your rights.",
  lead:
    "This policy explains what personal data is involved when you use {{DOMAIN}} or work with us, how we use it and the choices you have. In short: the website has no accounts, logins or online payments, and the enquiry form only collects what you choose to send us.",
  updated: UPDATED,
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      paragraphs: [
        "SmartWebCare (\"we\", \"us\", \"our\") is a branding and marketing agency providing services including personal branding, social media and performance marketing, design, web development, SEO and AI automation. We are based in {{CITY}}, India.",
        "This policy applies to the website at {{URL}} and to enquiries and client relationships that start through it. If you have any questions about it, email us at {{EMAIL}}.",
      ],
    },
    {
      id: "information-we-collect",
      heading: "Information we collect",
      paragraphs: [
        "We collect only what we need to respond to you, run the website and deliver our services. There are no accounts, logins, online payments or checkout on this website, so we don't collect passwords or payment card details through it.",
        "Depending on how you interact with us, the information we handle can include:",
      ],
      bullets: [
        "**Enquiry details you choose to send us**, such as your name, phone number or email address, business details and the content of your message, when you contact us through the enquiry form, WhatsApp, phone or email.",
        "**Booking details** you enter in the Calendly scheduler, such as your name, email address, chosen time and any answers to booking questions.",
        "**Usage and device information** collected by analytics and advertising tools, if they're enabled on the site, such as pages visited, device and browser information, approximate location and how you interact with pages.",
        "**Server log data** recorded by our hosting provider, such as IP address, user agent (browser and device type) and timestamps.",
        "**Client information** shared during an engagement, such as business information, contact details for your team, and access to accounts or materials we need for the work.",
      ],
    },
    {
      id: "how-we-use-information",
      heading: "How we use information",
      paragraphs: [
        "We use personal data only for the purposes listed below, and we do not sell personal data.",
        "Where the law that applies to you requires a legal basis for processing, we rely on your consent, on steps you ask us to take before entering into an agreement, on performing an agreement with you, on our legitimate interests in running and improving our business, or on our legal obligations, as that law allows.",
      ],
      bullets: [
        "Responding to your enquiries and arranging consultations.",
        "Preparing proposals and delivering, supporting and invoicing the services you engage us for.",
        "Operating, securing and maintaining the website, including detecting and preventing misuse.",
        "Understanding how the website is used so we can improve its content and usability.",
        "Measuring the effectiveness of our advertising, where advertising tools are enabled.",
        "Meeting our legal, tax and accounting obligations, and establishing or defending legal claims.",
      ],
    },
    {
      id: "enquiries",
      heading: "Enquiries through the form, WhatsApp, phone and email",
      paragraphs: [
        "When you submit the enquiry form, the details you enter (your name, email, phone number, website, the service you're interested in and your message) are sent securely to our enquiry database, hosted by Supabase, so our team can reply. We also record the page you sent it from and the time. We use these details only to respond to your enquiry and follow up on it.",
        "While you're writing, a draft may be kept in your browser's session storage so you don't lose what you've typed. It stays in your browser and is cleared when you close the tab.",
        "If you choose to contact us through WhatsApp, a phone call or email instead, your message is handled by WhatsApp (operated by Meta), your phone network or your email provider under their own terms and privacy policies, and by us as an enquiry, for the purposes described in this policy.",
      ],
    },
    {
      id: "booking",
      heading: "Booking a consultation",
      paragraphs: [
        "Our [booking page](/book-consultation) uses an embedded scheduler provided by Calendly, a third-party service. The scheduler loads only when you open it.",
        "Details you enter in the scheduler are processed by Calendly under its own privacy policy and shared with us so we can hold the consultation. We use them to prepare for and follow up on your consultation.",
      ],
    },
    {
      id: "analytics-and-cookies",
      heading: "Analytics, advertising and cookies",
      paragraphs: [
        "The production website may use the analytics and advertising tools listed below. These tools may use cookies or similar technologies, and may process information such as the pages you visit, device and browser information, approximate location and how you interact with the site. They never run on preview builds of the website.",
      ],
      bullets: [
        "**Google Tag Manager**, which we use to manage and load the other tags on the site.",
        "**Google Analytics 4**, which helps us understand how visitors find and use the website.",
        "**Google Ads conversion tracking**, which helps us measure whether our ads lead to actions such as enquiries.",
        "**DataFast**, a website analytics tool that helps us understand where visitors come from and how they use the site.",
        "**Mouseflow**, which provides session replays and heatmaps showing how visitors scroll, click and move through pages, so we can find and fix usability problems.",
      ],
    },
    {
      id: "managing-cookies",
      heading: "Managing cookies and similar technologies",
      paragraphs: [
        "You can block or delete cookies through your browser settings, use private browsing, or use browser extensions that block trackers. Some providers, including Google, also offer their own settings or opt-out tools.",
        "Apart from these tools, the website uses your browser's session storage only to keep an enquiry draft, as described above. Fonts are served from our own hosting, so loading a page doesn't send requests to Google Fonts.",
      ],
    },
    {
      id: "third-party-providers",
      heading: "Third-party providers",
      paragraphs: [
        "We rely on the following providers to run the website and handle enquiries. Each processes data under its own terms and privacy policy, which we encourage you to read.",
        "For client engagements, we may also use other software, such as automation platforms and AI model providers, to deliver the work, as discussed with you during scoping.",
      ],
      bullets: [
        "**WhatsApp (Meta)**: messages you send us through WhatsApp.",
        "**Email providers**: yours and ours, for emails you send us.",
        "**Calendly**: the embedded booking scheduler and the details you enter in it.",
        "**Google**: Google Tag Manager, Google Analytics 4 and Google Ads conversion tracking, where enabled.",
        "**DataFast**: website analytics, where enabled.",
        "**Mouseflow**: session replays and heatmaps, where enabled.",
        "**Vercel**: website hosting, including standard server logs such as IP address, user agent and timestamps, used for security and operations.",
        "**Supabase**: the database that stores enquiries submitted through the website form, and the content database our Journal articles are read from.",
      ],
    },
    {
      id: "data-retention",
      heading: "How long we keep information",
      paragraphs: [
        "We keep enquiry and client information only for as long as we need it for the purposes described in this policy, such as responding to you, delivering and supporting our services, and meeting our legal, tax and accounting obligations. When it's no longer needed, we delete or anonymize it.",
        "Analytics and advertising providers keep the data they collect in line with their retention settings and policies. You can ask us to delete your information at any time by emailing {{EMAIL}}; if we need to keep some of it to meet a legal obligation, we'll tell you.",
      ],
    },
    {
      id: "security",
      heading: "Security",
      paragraphs: [
        "We use reasonable technical and organizational measures to protect personal data, including limiting access to the people who need it for their work. Because the website has no accounts, logins or online payments, and the enquiry form only asks for what we need to reply, we hold little personal data through the site in the first place. Enquiries are stored in an access-restricted database that website visitors can't read.",
        "No website, transmission or storage system is completely secure, so we can't guarantee absolute security. If a personal data breach occurs, we'll notify affected people and the authorities where the law requires it. If you think your information has been put at risk, contact us straight away.",
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights and how to make a request",
      paragraphs: [
        "Depending on where you live, you have rights over your personal data. Under India's Digital Personal Data Protection Act, 2023, as its provisions apply, these include the right to access information about how your data is processed, to have it corrected, completed or updated, to have it erased, to withdraw consent you've given, to nominate someone to exercise your rights if you're unable to, and to have your grievances addressed.",
        "If you're elsewhere, for example in the European Union or United Kingdom where the GDPR applies, you may have additional rights, such as the right to object to or restrict certain processing, the right to data portability and the right to complain to your local data protection authority.",
        "To make a request or raise a grievance, email {{EMAIL}} and tell us what you're asking for. We may need to verify your identity before acting on a request, and we'll respond within the time required by applicable law. If you're not satisfied with our response, you may be able to take your complaint to the relevant authority, such as the Data Protection Board of India.",
      ],
    },
    {
      id: "international-transfers",
      heading: "International transfers",
      paragraphs: [
        "We're based in India, but some of the providers listed above may store or process data outside India. When we work with clients abroad, we also exchange information with them across borders.",
        "Where data is transferred internationally, we take reasonable steps to make sure it stays protected in line with this policy and applicable law.",
      ],
    },
    {
      id: "children",
      heading: "Children",
      paragraphs: [
        "This website and our services are intended for businesses and adults, and are not directed at children. We don't knowingly collect personal data from children. If you believe a child has sent us personal data, contact us and we'll delete it.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      paragraphs: [
        "We may update this policy as the website, our services or the law change. The date at the top of this page shows when it was last updated, and we'll make significant changes clear on this page.",
      ],
    },
    {
      id: "contact",
      heading: "Contact us",
      paragraphs: ["For privacy questions or requests, you can reach us here:"],
      bullets: CONTACT_BULLETS,
    },
  ],
};

const termsAndConditions: LegalPage = {
  slug: "terms-and-conditions",
  title: "Terms and Conditions",
  metaTitle: "Terms and Conditions | SmartWebCare",
  metaDescription:
    "The terms for using the SmartWebCare website, how written proposals govern our services, intellectual property, liability and the law that applies.",
  lead:
    "These terms apply to your use of {{DOMAIN}}. Our services themselves are always provided under a written proposal or agreement, which sets out the specific terms for that work.",
  updated: UPDATED,
  sections: [
    {
      id: "about-these-terms",
      heading: "About these terms",
      paragraphs: [
        "These terms and conditions apply to your use of the website at {{URL}}, which is operated by SmartWebCare (\"we\", \"us\", \"our\"), based in {{CITY}}, India. By using the website, you agree to these terms. If you don't agree, please don't use the website.",
        "Please read these terms together with our [privacy policy](/privacy-policy), [refund policy](/refund-policy) and [disclaimer](/disclaimer).",
      ],
    },
    {
      id: "using-the-website",
      heading: "Using the website",
      paragraphs: [
        "The website provides information about our services, along with guides, articles and free tools. You may use it for lawful purposes and in line with these terms.",
        "We work to keep the website accurate and up to date, but we may change, suspend or remove any part of it at any time. There are no accounts, logins, online payments or checkout on the website.",
      ],
    },
    {
      id: "services-and-proposals",
      heading: "Our services and written proposals",
      paragraphs: [
        "The services described on this website, and any examples, guides or tool results, are for general information only. They aren't an offer, and they don't create a contract between you and us.",
        "The actual scope, fees, timelines and deliverables for any engagement are set out in a written proposal, statement of work or agreement that we prepare for you after a consultation. That document governs the engagement, and if anything in it differs from this website or these terms, the written proposal or agreement prevails.",
      ],
    },
    {
      id: "client-responsibilities",
      heading: "Client responsibilities",
      paragraphs: [
        "The quality and timing of our work depend partly on you. Unless your proposal or agreement says otherwise, as a client you're responsible for:",
      ],
      bullets: [
        "Giving us accurate, complete and up-to-date information about your business, goals and requirements.",
        "Providing timely access to the accounts, systems, platforms and people we need to do the work.",
        "Reviewing work and giving feedback and approvals within the agreed timeframes.",
        "Making sure you own, or have the right to use, any content, brand assets, data and other materials you give us, and that our use of them for your project won't infringe anyone else's rights.",
        "Complying with the laws and platform policies that apply to your business, including for campaigns, messages and data processing we set up on your behalf.",
      ],
    },
    {
      id: "fees-and-payment",
      heading: "Fees and payment",
      paragraphs: [
        "Fees, invoicing, payment schedules and payment methods are set out in each proposal or agreement. No payments are taken through this website.",
        "Costs paid to third parties for your project, such as advertising spend, domains, hosting and software licenses, are handled as described in your proposal and are subject to those providers' own terms.",
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      paragraphs: [
        "The content of this website, including its text, graphics, design, logos and code, belongs to us or our licensors and is protected by intellectual property laws. You may view it and share links to it, but you may not copy, reproduce or reuse it for commercial purposes without our written permission.",
        "Ownership of the deliverables we create for clients, and any license to use them, is set out in the relevant proposal or agreement. Materials you supply to us remain yours, and you give us permission to use them as needed to deliver the work. Third-party components, such as open-source software, fonts, stock media and platforms, remain subject to their own licenses.",
      ],
    },
    {
      id: "acceptable-use",
      heading: "Acceptable use",
      paragraphs: ["When using the website, you agree not to:"],
      bullets: [
        "Use it in any way that breaks the law or infringes anyone's rights.",
        "Try to gain unauthorized access to the website, its hosting or related systems, or interfere with their security or performance.",
        "Introduce malware or any other harmful code.",
        "Use automated tools in a way that places excessive load on the website, or copy its content in bulk without our permission.",
        "Send false, misleading, abusive or spam enquiries, or impersonate another person or business.",
      ],
    },
    {
      id: "third-party-services-and-links",
      heading: "Third-party services and links",
      paragraphs: [
        "The website connects with services run by others, including WhatsApp, Calendly, your email app and analytics providers, and may link to other websites. We don't control these services or sites, and your use of them is governed by their own terms and privacy policies.",
        "A link to another website doesn't mean we endorse it, and we aren't responsible for its content or availability.",
      ],
    },
    {
      id: "no-guarantee-of-outcomes",
      heading: "No guarantee of specific outcomes",
      paragraphs: [
        "We commit to doing our work with care and skill, but we can't guarantee specific results. Search rankings, website traffic, visibility in AI tools and answer engines, advertising performance and lead volumes depend on factors outside our control, including search engine and platform algorithms, competition, market conditions and your own business decisions.",
        "Any targets, estimates or projections we discuss reflect our professional judgment at the time, not promises.",
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of liability",
      paragraphs: [
        "The website and its content are provided on an \"as is\" and \"as available\" basis. To the maximum extent permitted by applicable law, we are not liable for any indirect, incidental, special or consequential loss, or for any loss of profits, revenue, data or business opportunity, arising from your use of, or inability to use, the website or its content.",
        "Our liability in connection with client engagements is governed by the relevant proposal or agreement. Nothing in these terms excludes or limits any liability that cannot be excluded or limited under applicable law.",
      ],
    },
    {
      id: "suspension-and-termination",
      heading: "Suspension and termination of access",
      paragraphs: [
        "We may suspend or restrict your access to the website, or any part of it, if we reasonably believe you've breached these terms or are misusing the website.",
        "Ending your access to the website doesn't affect any written proposal or agreement between us, which ends only as set out in that document.",
      ],
    },
    {
      id: "governing-law",
      heading: "Governing law and jurisdiction",
      paragraphs: [
        "These terms are governed by the laws of India, and courts at New Delhi have jurisdiction.",
        "If a proposal or agreement sets out its own terms on governing law or disputes, those terms apply to that engagement.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to these terms",
      paragraphs: [
        "We may update these terms from time to time. The date at the top of this page shows when they were last updated, and continuing to use the website after a change means you accept the updated terms.",
      ],
    },
    {
      id: "contact",
      heading: "Contact us",
      paragraphs: ["If you have questions about these terms, you can reach us here:"],
      bullets: CONTACT_BULLETS,
    },
  ],
};

const refundPolicy: LegalPage = {
  slug: "refund-policy",
  title: "Refund Policy",
  metaTitle: "Refund Policy | SmartWebCare",
  metaDescription:
    "How refunds and cancellations work at SmartWebCare: no online purchases, client work follows your written proposal, and how to make a refund request.",
  lead:
    "There are no online purchases on this website. Refunds and cancellations for client work follow the written proposal or agreement for that engagement, and this page explains how to make a request.",
  updated: UPDATED,
  sections: [
    {
      id: "no-online-purchases",
      heading: "No online purchases",
      paragraphs: [
        "This website has no shop, checkout or online payments, so nothing can be bought through it. Any payment for our services is made under a written proposal or agreement, not through the website.",
      ],
    },
    {
      id: "client-engagements",
      heading: "Refunds for client engagements",
      paragraphs: [
        "Every engagement is carried out under a written proposal, statement of work or agreement. Whether a refund or cancellation is available, and on what terms, is determined by the cancellation and refund clauses in that document.",
        "If you're unsure what your proposal says, contact us and we'll go through it with you.",
      ],
    },
    {
      id: "free-consultations",
      heading: "Free consultations",
      paragraphs: [
        "Consultations booked through our [booking page](/book-consultation) are free and involve no payment, so there's nothing to refund. If you can't make your consultation, you can reschedule or cancel it using the details in your Calendly confirmation.",
      ],
    },
    {
      id: "third-party-costs",
      heading: "Amounts paid to third parties",
      paragraphs: [
        "Some projects involve amounts paid to third parties on your behalf, such as advertising spend, domain registrations, hosting and software licenses. These amounts are governed by those providers' terms and generally can't be refunded by us.",
        "If a provider has its own refund or credit process, we can point you to it.",
      ],
    },
    {
      id: "how-to-request",
      heading: "How to request a refund",
      paragraphs: [
        "Email {{EMAIL}} with \"Refund request\" in the subject line, and include your invoice or proposal reference and the reason for your request. Writing from the email address linked to your engagement helps us find your records quickly.",
      ],
    },
    {
      id: "what-we-need",
      heading: "What to include",
      paragraphs: ["To review your request, we'll need:"],
      bullets: [
        "Your name, business name and contact details.",
        "Your invoice number or proposal reference.",
        "The payment or part of the work your request relates to.",
        "The reason for your request, with any supporting details, such as relevant messages or files.",
      ],
    },
    {
      id: "how-requests-are-reviewed",
      heading: "How requests are reviewed",
      paragraphs: [
        "We review each request case by case, against the terms of your proposal or agreement and the work already delivered or in progress. We may ask follow-up questions or request more information.",
        "We'll let you know the outcome by email. If a refund is approved, it's processed as set out in your agreement, or in another way we agree with you.",
      ],
    },
    {
      id: "your-legal-rights",
      heading: "Your legal rights",
      paragraphs: [
        "Nothing in this policy limits any rights you have under applicable law that can't be excluded or limited by agreement.",
      ],
    },
    {
      id: "contact",
      heading: "Contact us",
      paragraphs: ["If you have questions about refunds or cancellations, you can reach us here:"],
      bullets: CONTACT_BULLETS,
    },
  ],
};

const disclaimer: LegalPage = {
  slug: "disclaimer",
  title: "Disclaimer",
  metaTitle: "Disclaimer | SmartWebCare",
  metaDescription:
    "The SmartWebCare website offers general information, not professional advice. Outcomes such as rankings, traffic and AI visibility can't be guaranteed.",
  lead:
    "The content on this website is here to inform you and help you make decisions, not to replace professional advice or promise particular results. Please read this disclaimer before relying on it.",
  updated: UPDATED,
  sections: [
    {
      id: "general-information",
      heading: "General information only",
      paragraphs: [
        "The guides, articles, examples, comparisons and tool results on this website are general information. They are not legal, financial, tax or other professional advice, and they aren't tailored to your circumstances.",
        "Content reflects our understanding at the time it was written, and some of it may become outdated. Before making significant decisions, consider getting advice specific to your situation.",
      ],
    },
    {
      id: "no-guarantee-of-results",
      heading: "No guarantee of results",
      paragraphs: [
        "We don't guarantee search rankings, website traffic, visibility in answer engines or generative AI tools (AEO or GEO), citations in AI-generated answers, advertising performance, leads or revenue. These outcomes depend on many factors outside our control, including competition, market conditions and how each platform's systems work.",
      ],
    },
    {
      id: "third-party-platforms",
      heading: "Dependence on third-party platforms",
      paragraphs: [
        "Much of our work relies on platforms run by other companies, such as search engines, social and messaging platforms, AI assistants, automation tools and hosting services. Their algorithms, features, policies and availability can change at any time, often without notice, and those changes can affect results.",
        "We don't control these platforms and aren't responsible for the decisions they make.",
      ],
    },
    {
      id: "testimonials-and-examples",
      heading: "Testimonials and examples",
      paragraphs: [
        "Testimonials, examples and client stories on this website reflect individual experiences. They come from clients of work our team has delivered.",
        "Every business is different, and those experiences aren't a promise or prediction of the results you'll achieve.",
      ],
    },
    {
      id: "tools-provided-as-is",
      heading: "Free tools",
      paragraphs: [
        "The tools on this website are provided as is, without warranties of any kind. Their output is a starting point and may contain errors or omissions, so review it before relying on or publishing it.",
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-party links",
      paragraphs: [
        "The website may link to websites and services operated by others. We don't control them and aren't responsible for their content, accuracy, availability or privacy practices, and a link doesn't mean we endorse them.",
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of liability",
      paragraphs: [
        "To the extent permitted by law, we aren't liable for any loss or damage arising from your reliance on the content or tools on this website. Nothing in this disclaimer excludes or limits any rights you have as a consumer, or any liability that can't be excluded or limited under applicable law.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this disclaimer",
      paragraphs: [
        "We may update this disclaimer from time to time. The date at the top of this page shows when it was last updated.",
      ],
    },
    {
      id: "contact",
      heading: "Contact us",
      paragraphs: ["If you have questions about this disclaimer, you can reach us here:"],
      bullets: CONTACT_BULLETS,
    },
  ],
};

/** Contact placeholders ({{EMAIL}}, {{PHONE}}, {{CITY}}, {{URL}}, {{DOMAIN}}) are filled from the env-driven SITE config. */
export const LEGAL_PAGES: Record<LegalPage["slug"], LegalPage> = withContacts({
  "privacy-policy": privacyPolicy,
  "terms-and-conditions": termsAndConditions,
  "refund-policy": refundPolicy,
  disclaimer,
});

/** Items the business owner / a lawyer must confirm before relying on these pages. Shown only in internal docs, never on the site. */
export const LEGAL_TO_CONFIRM: string[] = [
  "Registered legal entity name, entity type and registered address for SmartWebCare (and whether SmartWebCare is a trading name of the SocialGuava business), so the operator can be named on all four pages.",
  "Governing law and jurisdiction: confirm \"These terms are governed by the laws of India, and courts at New Delhi have jurisdiction\" (terms-and-conditions).",
  "Grievance officer name, designation and contact details for privacy complaints under the DPDP Act, 2023, and whether a dedicated privacy email should replace {{EMAIL}} on the legal pages.",
  "Confirm standard refund/cancellation terms used in proposals",
  "Which analytics/advertising tools are actually enabled in production (Google Tag Manager, Google Analytics 4, Google Ads conversion tracking, DataFast, Mouseflow), and whether any others are used, such as remarketing audiences or other ad pixels.",
  "Data retention periods for enquiries (WhatsApp and email), Calendly bookings, client records and analytics data (for example, the GA4 data retention setting), if specific periods should be stated.",
  "Whether a cookie consent banner or consent mode is required for the markets served (for example, visitors from the EU/UK), given that GA4, Google Ads and Mouseflow may set cookies.",
  "If Mouseflow is enabled, confirm that form fields (including the enquiry form) are masked so session replays don't capture what visitors type.",
  "How the DPDP Act, 2023 and the DPDP Rules apply to the business and from when, and whether the rights wording in the privacy policy matches the provisions in force.",
  "Whether consultations or client calls are recorded or transcribed (for example, with meeting-notes tools); if so, add this to the privacy policy.",
  "Whether the website terms should also include an indemnity or a liability cap, or whether these belong only in client agreements.",
];
