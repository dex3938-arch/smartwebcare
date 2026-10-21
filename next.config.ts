import type { NextConfig } from "next";

/*
  Public site URL (canonical links, sitemap.xml, robots.txt, OG tags), resolved at build:
  1. NEXT_PUBLIC_SITE_URL if you set it (e.g. https://smartwebcare.com once the domain
     points at Vercel);
  2. otherwise Vercel's own production domain (e.g. https://smartwebcare.vercel.app), so
     canonicals never point at a domain that isn't serving this site;
  3. otherwise https://smartwebcare.com.
*/
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "https://smartwebcare.com"
).replace(/\/$/, "");

const securityHeaders = [
  // HSTS, nosniff, referrer policy, framing and permissions — safe defaults for a marketing site.
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: { NEXT_PUBLIC_SITE_URL: SITE_URL },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Long-lived caching for the static brand files.
      { source: "/brand/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/assets/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
    deviceSizes: [384, 540, 640, 750, 828, 960, 1080, 1280, 1920],
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
  async redirects() {
    // Friendly aliases and old SocialGuava links → the right page (never a 404).
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/sitemap", destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap.html", destination: "/sitemap.xml", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
      { source: "/refund", destination: "/refund-policy", permanent: true },
      { source: "/work", destination: "/clients", permanent: false },
      { source: "/testimonials", destination: "/clients", permanent: true },
      { source: "/reviews", destination: "/clients", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/book", destination: "/book-consultation", permanent: true },
      { source: "/consultation", destination: "/book-consultation", permanent: true },
      { source: "/journal", destination: "/blog", permanent: true },
      { source: "/journal/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/india/allahabad", destination: "/india/prayagraj", permanent: true },
      { source: "/india/allahabad/:path*", destination: "/india/prayagraj/:path*", permanent: true },
      { source: "/services/:slug", destination: "/:slug", permanent: false },
      { source: "/service/:slug", destination: "/:slug", permanent: false },
      { source: "/service", destination: "/services", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/blogs/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/contactus", destination: "/contact", permanent: true },
      { source: "/aboutus", destination: "/about", permanent: true },
      { source: "/client", destination: "/clients", permanent: true },
      { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
      { source: "/resources/:path+", destination: "/resources", permanent: false },
      // Links the old site listed but never had (from its footer / robots.txt).
      { source: "/ai-agents-automations", destination: "/ai-agents", permanent: true },
      { source: "/video-graphic-design", destination: "/graphic-design", permanent: true },
      { source: "/content-creation", destination: "/social-media-marketing", permanent: true },
    ];
  },
};

export default nextConfig;
