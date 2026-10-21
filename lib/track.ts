/*
  Conversion events, pushed to Google Tag Manager's dataLayer (and gtag when present).
  Safe to call anywhere: does nothing until analytics is configured, and never carries
  personal data — only an event name and coarse, non-identifying context.
*/

export type TrackEvent =
  | "service_page_view"
  | "contact_cta_click"
  | "contact_form_started"
  | "contact_form_submitted"
  | "contact_form_failed"
  | "phone_click"
  | "email_click"
  | "whatsapp_click";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

let last: { event: TrackEvent; at: number } | null = null;

export function track(event: TrackEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  // The site-wide link listener (ContactDock) re-reports clicks a component already
  // tracked; drop the duplicate that arrives within the same click.
  const now = Date.now();
  if (last && last.event === event && now - last.at < 400) return;
  last = { event, at: now };
  try {
    if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, ...params });
    else if (typeof window.gtag === "function") window.gtag("event", event, params);
  } catch {
    /* analytics must never break the page */
  }
}
