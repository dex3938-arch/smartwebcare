import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/*
  Everything public is crawlable — including AI / answer-engine crawlers (OAI-SearchBot,
  GPTBot, PerplexityBot, ClaudeBot, Google-Extended…), on purpose: SmartWebCare sells
  AEO/GEO, so being readable by answer engines is the point. CSS/JS/images are never
  blocked. Only the internal URL dashboard is excluded.
  (robots.txt is not security — nothing private lives on this site.)
*/
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/internal/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
