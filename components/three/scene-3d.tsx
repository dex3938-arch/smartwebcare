"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { canUse3D } from "@/components/three/capability";
import type { SceneVariant } from "@/components/three/scenes";
import { cn } from "@/lib/utils";

const Scenes = dynamic(() => import("@/components/three/scenes"), { ssr: false });

/*
  A light WebGL scene layered over a static fallback (the server-rendered children).
  Loads only on capable desktops, after the page is idle, and pauses off-screen —
  phones and reduced-motion users keep the static art, so pages stay fast.
*/
export function Scene3D({
  variant,
  children,
  className,
}: {
  variant: SceneVariant;
  children?: React.ReactNode;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const [want, setWant] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!canUse3D()) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const start = () => setWant(true);
    if (w.requestIdleCallback) w.requestIdleCallback(start, { timeout: 2000 });
    else window.setTimeout(start, 800);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "160px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className={cn("relative isolate overflow-hidden", className)}>
      <div className={cn("absolute inset-0 transition-opacity duration-1000", ready ? "opacity-0" : "opacity-100")}>{children}</div>
      {want && (
        <div aria-hidden className={cn("absolute inset-0 transition-opacity duration-[1400ms]", ready ? "opacity-100" : "opacity-0")}>
          <Scenes variant={variant} active={inView} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
