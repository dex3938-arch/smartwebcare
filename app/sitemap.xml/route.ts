import { sitemapIndexResponse } from "@/lib/sitemap-data";

/* /sitemap.xml — sitemap index pointing at the grouped sitemaps in /sitemaps/*. */
export const dynamic = "force-static";

export function GET() {
  return sitemapIndexResponse();
}
