"use client";

import { track, type TrackEvent } from "@/lib/track";

/** A plain <a> that reports a conversion event on click (tel:, mailto:, WhatsApp, external). */
export function TrackedLink({
  event,
  location,
  onClick,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { event: TrackEvent; location?: string }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, location ? { location } : {});
        onClick?.(e);
      }}
    />
  );
}
