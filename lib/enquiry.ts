/*
  Enquiry form contract — shared by the browser form and the /api/enquiry route so both
  validate exactly the same way. No server-only imports here.
*/

export type EnquiryFields = {
  name: string;
  email: string;
  phone: string;
  website: string;
  service: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryFields, string>>;

export const EMPTY_ENQUIRY: EnquiryFields = { name: "", email: "", phone: "", website: "", service: "", message: "" };

export const ENQUIRY_LIMITS = { name: 100, email: 200, phone: 30, website: 200, service: 120, message: 2000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SITE_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

/** Trim every field and cap it at its limit. Unknown keys are dropped. */
export function cleanEnquiry(input: Partial<Record<keyof EnquiryFields, unknown>>): EnquiryFields {
  const out = { ...EMPTY_ENQUIRY };
  (Object.keys(EMPTY_ENQUIRY) as (keyof EnquiryFields)[]).forEach((k) => {
    const v = input[k];
    out[k] = typeof v === "string" ? v.trim().slice(0, ENQUIRY_LIMITS[k]) : "";
  });
  return out;
}

export function validateEnquiry(f: EnquiryFields): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (f.name.trim().length < 2) e.name = "Please tell us your name.";
  const email = f.email.trim();
  if (!email) e.email = "Add your email so we can reply.";
  else if (!EMAIL_RE.test(email) || email.length > ENQUIRY_LIMITS.email) e.email = "That doesn't look like an email address.";
  const phone = f.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (phone && (digits.length < 7 || digits.length > 15 || /[^\d+\-\s().]/.test(phone)))
    e.phone = "Enter a phone number like +91 98765 43210 (or leave it blank).";
  const site = f.website.trim();
  if (site && (!SITE_RE.test(site) || site.length > ENQUIRY_LIMITS.website))
    e.website = "Enter a website like example.com (or leave it blank).";
  if (!f.service) e.service = "Pick the closest service — or “Not sure yet”.";
  if (f.message.trim().length < 10) e.message = "A sentence or two about the project helps us reply properly.";
  else if (f.message.length > ENQUIRY_LIMITS.message)
    e.message = `Keep it under ${ENQUIRY_LIMITS.message} characters — we'll go deeper on the call.`;
  return e;
}

/** Plain-text summary used for WhatsApp / email fallbacks and notification emails. */
export function composeEnquiry(f: EnquiryFields, brand: string) {
  return [
    `Hi ${brand}! I'd like to start a project.`,
    "",
    `Name: ${f.name.trim()}`,
    `Email: ${f.email.trim()}`,
    ...(f.phone.trim() ? [`Phone: ${f.phone.trim()}`] : []),
    ...(f.website.trim() ? [`Website: ${f.website.trim()}`] : []),
    `Service: ${f.service || "Not sure yet"}`,
    "",
    f.message.trim(),
  ].join("\n");
}

/** Response shape of POST /api/enquiry. */
export type EnquiryResponse =
  | { ok: true }
  | { ok: false; error: "invalid" | "rate_limited" | "too_fast" | "not_configured" | "failed"; fields?: EnquiryErrors };
