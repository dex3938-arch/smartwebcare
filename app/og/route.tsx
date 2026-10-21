import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

// Light-stroke SWC emblem for the navy card (pre-sized, ~640px wide).
const EMBLEM = `data:image/png;base64,${readFileSync(path.join(process.cwd(), "public/brand/og-emblem.png")).toString("base64")}`;
const HOST = new URL(SITE.url).hostname;

/** Dynamic Open Graph card: /og?title=…&eyebrow=… (1200×630). */
export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "AI, Software & SEO Studio").slice(0, 120);
  const eyebrow = (searchParams.get("eyebrow") || SITE.tagline).slice(0, 60);
  const size = title.length > 70 ? 56 : title.length > 40 ? 66 : 78;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(125deg, #081b3a 0%, #0d2550 55%, #1d4ed8 120%)",
          color: "#ffffff",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: "radial-gradient(circle at center, rgba(103,232,249,0.28) 0%, rgba(103,232,249,0.08) 45%, rgba(103,232,249,0) 70%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori (ImageResponse) requires a plain <img> */}
        <img src={EMBLEM} width={420} height={175} style={{ position: "absolute", right: 64, top: 70, opacity: 0.95 }} alt="" />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 76px", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>SmartWebCare</div>
            <div style={{ fontSize: 16, letterSpacing: 6, textTransform: "uppercase", color: "#a9b8cf" }}>AI • Software • SaaS</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
            <div style={{ fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "#67e8f9" }}>{eyebrow}</div>
            <div style={{ fontSize: size, lineHeight: 1.06, letterSpacing: -1.5, fontFamily: "serif" }}>{title}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#c7d5ea" }}>
            <div style={{ width: 36, height: 3, borderRadius: 3, background: "linear-gradient(90deg,#2563eb,#67e8f9)" }} />
            {HOST}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" },
    }
  );
}
