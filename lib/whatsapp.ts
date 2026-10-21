import { SITE } from "./site";

/*
  One-touch WhatsApp.
  - If NEXT_PUBLIC_WHATSAPP_NUMBER is set (country code + digits, e.g. 9198XXXXXXXX),
    links use the standard click-to-chat format https://wa.me/<digits>?text=<message>.
  - Otherwise we fall back to the team's existing wa.link shortlink, which works but
    cannot carry a prefilled message. We never invent a number.
  Opening WhatsApp does NOT mean a message was sent — UI copy must say so.
*/

export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

/** True when links can carry a prefilled message (a wa.me number is configured). */
export const CAN_PREFILL = WHATSAPP_NUMBER.length >= 8;

export const DEFAULT_WHATSAPP_MESSAGE = "Hi SmartWebCare! I'd like to talk about growing my brand.";

/** WhatsApp number as shown to visitors ("+91 98XXXXXXXX"), or "" when only a shortlink is set. */
export const WHATSAPP_DISPLAY = CAN_PREFILL
  ? WHATSAPP_NUMBER.startsWith("91") && WHATSAPP_NUMBER.length === 12
    ? `+91 ${WHATSAPP_NUMBER.slice(2, 7)} ${WHATSAPP_NUMBER.slice(7)}`
    : `+${WHATSAPP_NUMBER}`
  : "";

export function whatsappHref(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  if (CAN_PREFILL) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }
  return SITE.whatsapp;
}
