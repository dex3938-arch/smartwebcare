import { NextResponse, type NextRequest } from "next/server";
import { cleanEnquiry, composeEnquiry, validateEnquiry, type EnquiryResponse } from "@/lib/enquiry";
import { SITE } from "@/lib/site";

/*
  POST /api/enquiry — saves a website enquiry.

  1. Validates with the same rules as the form, and screens out bots (hidden honeypot
     field + minimum fill time + a best-effort per-IP rate limit).
  2. Inserts the row into Supabase (table `enquiries`, see supabase/schema.sql) over the
     REST API. Uses SUPABASE_SERVICE_ROLE_KEY when set (server-only, never sent to the
     browser), otherwise the public anon key, which the schema allows to INSERT only.
  3. Optionally notifies the team: ENQUIRY_WEBHOOK_URL (Zapier / Make / Slack / Sheets)
     and/or an email through Resend (RESEND_API_KEY + ENQUIRY_TO_EMAIL).

  Succeeds when at least one destination accepted the enquiry. Personal data is never
  logged.
*/

export const dynamic = "force-dynamic";

const MIN_FILL_MS = 1500;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded on long-lived instances
  return recent.length > MAX_PER_WINDOW;
}

const reply = (body: EnquiryResponse, status = 200) => NextResponse.json(body, { status });

const supabaseUrl = () => (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
const supabaseKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

async function saveToSupabase(row: Record<string, string | null>) {
  const url = supabaseUrl();
  const key = supabaseKey();
  if (!url || !key) return null; // not configured
  const table = process.env.SUPABASE_ENQUIRIES_TABLE || "enquiries";
  const res = await fetch(`${url}/rest/v1/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
    cache: "no-store",
  });
  if (!res.ok) console.error(`[enquiry] Supabase insert failed: HTTP ${res.status}`);
  return res.ok;
}

async function notifyWebhook(payload: Record<string, unknown>) {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return null;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) console.error(`[enquiry] Webhook failed: HTTP ${res.status}`);
  return res.ok;
}

async function notifyEmail(subject: string, text: string, replyTo: string) {
  const key = process.env.RESEND_API_KEY;
  const to = (process.env.ENQUIRY_TO_EMAIL || SITE.email).split(",").map((s) => s.trim()).filter(Boolean);
  if (!key || !to.length) return null;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL || `${SITE.name} Website <onboarding@resend.dev>`,
      to,
      reply_to: replyTo,
      subject,
      text,
    }),
    cache: "no-store",
  });
  if (!res.ok) console.error(`[enquiry] Email notification failed: HTTP ${res.status}`);
  return res.ok;
}

export async function POST(req: NextRequest) {
  if (Number(req.headers.get("content-length") ?? 0) > 20_000) return reply({ ok: false, error: "invalid" }, 413);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return reply({ ok: false, error: "invalid" }, 400);
  }
  if (!body || typeof body !== "object") return reply({ ok: false, error: "invalid" }, 400);

  // Bots fill the hidden field — accept quietly so they don't retry, but store nothing.
  if (typeof body.company_fax === "string" && body.company_fax.trim()) return reply({ ok: true });

  const startedAt = Number(body.startedAt);
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS)
    return reply({ ok: false, error: "too_fast" }, 400);

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return reply({ ok: false, error: "rate_limited" }, 429);

  const fields = cleanEnquiry(body);
  const errors = validateEnquiry(fields);
  if (Object.keys(errors).length) return reply({ ok: false, error: "invalid", fields: errors }, 422);

  const page = typeof body.page === "string" ? body.page.slice(0, 300) : null;
  const source = typeof body.source === "string" ? body.source.slice(0, 40) : "website";
  const row = {
    name: fields.name,
    email: fields.email,
    phone: fields.phone || null,
    website: fields.website || null,
    service: fields.service || null,
    message: fields.message,
    page,
    source,
    user_agent: (req.headers.get("user-agent") ?? "").slice(0, 300) || null,
  };

  const subject = `New enquiry — ${fields.service || "Website"} — ${fields.name}`;
  const text = `${composeEnquiry(fields, SITE.name)}\n\n—\nSent from ${SITE.url}${page ?? ""}`;

  const results = await Promise.allSettled([
    saveToSupabase(row),
    notifyWebhook({ type: "enquiry", site: SITE.url, created_at: new Date().toISOString(), ...row }),
    notifyEmail(subject, text, fields.email),
  ]);
  const outcomes = results.map((r) => (r.status === "fulfilled" ? r.value : false));
  if (results.some((r) => r.status === "rejected")) console.error("[enquiry] A destination threw (network error).");

  if (outcomes.every((o) => o === null)) {
    console.error("[enquiry] No destination configured — set NEXT_PUBLIC_SUPABASE_URL + a Supabase key.");
    return reply({ ok: false, error: "not_configured" }, 503);
  }
  if (outcomes.some((o) => o === true)) return reply({ ok: true });
  return reply({ ok: false, error: "failed" }, 502);
}
