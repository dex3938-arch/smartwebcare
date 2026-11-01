import { sitemapGroupResponse } from "@/lib/sitemap-data";

export const revalidate = 3600;

export function GET() {
  return sitemapGroupResponse("services");
}
