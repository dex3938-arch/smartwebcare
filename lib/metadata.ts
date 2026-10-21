import type { Metadata } from "next";
import { SITE } from "./site";

/**
 * Single source for per-page metadata. Every indexable page calls this so it gets
 * its own canonical URL, Open Graph/Twitter tags and a generated OG image —
 * nothing is accidentally inherited from the home page.
 */
export function buildMetadata({
  title,
  description,
  path,
  eyebrow,
  type = "website",
  noindex = false,
  absoluteTitle = false,
  keywords,
  publishedTime,
}: {
  title: string;
  description: string;
  /** Path beginning with "/" — becomes the canonical URL. */
  path: string;
  /** Small label rendered on the OG image (e.g. "Service", "Gurugram"). */
  eyebrow?: string;
  type?: "website" | "article";
  noindex?: boolean;
  /** Use the title verbatim instead of the "%s | SmartWebCare" template. */
  absoluteTitle?: boolean;
  keywords?: string[];
  publishedTime?: string;
}): Metadata {
  const desc = description.length > 300 ? description.slice(0, 297).trimEnd() + "…" : description;
  const ogTitle = title.replace(/\s*[|—–-]\s*Smart\s?Web\s?Care\s*$/i, "");
  const og = `/og?${new URLSearchParams({ title: ogTitle, ...(eyebrow ? { eyebrow } : {}) })}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    keywords,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type,
      url: path,
      siteName: SITE.name,
      title: ogTitle,
      description: desc,
      locale: "en_US",
      images: [{ url: og, width: 1200, height: 630, alt: ogTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: desc,
      images: [og],
    },
  };
}
