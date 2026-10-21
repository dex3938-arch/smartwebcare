import Script from "next/script";
import { SITE } from "@/lib/site";

/*
  SmartWebCare's measurement stack — every tracker is OFF until its ID is set in the
  environment (no IDs are baked in, so this site never reports into another brand's
  properties). Loaded after the page is interactive so it never blocks rendering.
  Production only — dev/preview builds send nothing. Conversion events (lib/track.ts)
  are pushed to GTM's dataLayer.

  NOTE: there is no cookie-consent flow. If you market to EU/UK visitors, add consent
  (e.g. Google Consent Mode) before enabling these for those regions.
*/

const id = (v: string | undefined) => (v && v !== "off" ? v : "");

const GTM = id(process.env.NEXT_PUBLIC_GTM_ID);
const GA4 = id(process.env.NEXT_PUBLIC_GA_ID);
const GADS = id(process.env.NEXT_PUBLIC_GADS_ID);
const DATAFAST = id(process.env.NEXT_PUBLIC_DATAFAST_ID);
const MOUSEFLOW = id(process.env.NEXT_PUBLIC_MOUSEFLOW_ID);

export function Analytics() {
  const isProd = process.env.NODE_ENV === "production";
  // On Vercel, only the production deployment reports (not preview URLs).
  const isVercelPreview = !!process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production";
  if (!isProd || isVercelPreview || process.env.NEXT_PUBLIC_ANALYTICS === "off") return null;
  const gtagIds = [GA4, GADS].filter(Boolean);

  return (
    <>
      {GTM && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');`}
        </Script>
      )}

      {/* One gtag.js load for both GA4 and Google Ads. */}
      {gtagIds.length > 0 && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagIds[0]}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${gtagIds
              .map((g) => `gtag('config','${g}');`)
              .join("")}`}
          </Script>
        </>
      )}

      {DATAFAST && (
        <Script
          src="https://datafa.st/js/script.js"
          data-website-id={DATAFAST}
          data-domain={new URL(SITE.url).hostname}
          strategy="lazyOnload"
        />
      )}

      {/* Session replay is heavy — load it only once the browser is idle. */}
      {MOUSEFLOW && (
        <Script id="mouseflow" strategy="lazyOnload">
          {`window._mfq=window._mfq||[];(function(){var mf=document.createElement("script");mf.type="text/javascript";mf.defer=true;mf.src="//cdn.mouseflow.com/projects/${MOUSEFLOW}.js";document.getElementsByTagName("head")[0].appendChild(mf);})();`}
        </Script>
      )}
    </>
  );
}
