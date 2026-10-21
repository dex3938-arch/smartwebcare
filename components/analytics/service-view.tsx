"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Fires `service_page_view` once per service page visit. */
export function ServiceViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    track("service_page_view", { service: slug });
  }, [slug]);
  return null;
}
