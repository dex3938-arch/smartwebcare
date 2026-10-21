import { SITE } from "./site";
import { stripMarkup } from "./markup";

/** Organization structured data. Only real, verifiable facts. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/brand/logo.png`,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: { "@type": "PostalAddress", ...(SITE.address ? { streetAddress: SITE.address } : {}), addressLocality: SITE.city, addressCountry: "IN" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        telephone: SITE.phone,
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: Object.values(SITE.socials).filter(Boolean),
    founder: [
      { "@type": "Person", name: "Khyati Arora", sameAs: "https://www.linkedin.com/in/khyati-arora/" },
      { "@type": "Person", name: "Kartik Sahni", sameAs: "https://www.linkedin.com/in/kartik-sahni-5674991ab/" },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.href}`,
    })),
  };
}

export function serviceSchema(service: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/${service.slug}`,
    areaServed: ["IN", "AE", "GB", "US", "CA", "AU", "SG"],
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: post.image,
    author: { "@type": "Organization", name: SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/brand/logo.png` },
    },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: stripMarkup(f.q),
      acceptedAnswer: { "@type": "Answer", text: stripMarkup(f.a) },
    })),
  };
}

/** Long-form guide (Article) — authored by the organisation, dated by its review date. */
export function guideSchema(g: { title: string; description: string; slug: string; updated: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    datePublished: g.updated,
    dateModified: g.updated,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}/brand/logo.png` },
    },
    mainEntityOfPage: `${SITE.url}/${g.slug}`,
    inLanguage: "en",
  };
}
