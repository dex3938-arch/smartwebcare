import type { Metadata, Viewport } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ContactDock } from "@/components/layout/contact-dock";
import { Analytics } from "@/components/analytics/analytics";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { getServiceMenu } from "@/lib/content";

// Editorial display serif (true italics for accents) + a crisp geometric grotesk for UI.
// Headings use a single static weight (500, roman + italic) and aren't preloaded, so the
// body font — which carries the LCP paragraph — gets the bandwidth first. Fallback metrics
// are size-adjusted by next/font, so the swap doesn't shift layout.
const display = Newsreader({
  subsets: ["latin"],
  weight: "500",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
  variable: "--font-display",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

// Base metadata only. Canonical URLs, Open Graph and Twitter tags are set per page via
// buildMetadata() — never here, or every page would inherit the home page's canonical.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — AI, Software & SEO Studio`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // The live site's Services menu: every service, in its original order.
  const serviceGroups = [{ label: "Services", items: getServiceMenu() }];

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <SmoothScroll>
            <SiteHeader serviceGroups={serviceGroups} />
            <main id="main">{children}</main>
            <SiteFooter />
          </SmoothScroll>
          <ContactDock />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
