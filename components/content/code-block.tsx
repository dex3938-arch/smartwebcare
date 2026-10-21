"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Dark code panel with a language label and a copy button. */
export function CodeBlock({ code, lang, caption }: { code: string; lang: string; caption?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <figure className="my-7 overflow-hidden rounded-2xl border border-[#1e3a66] bg-[#081b3a] shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[#7dd3fc]">{lang}</span>
        <button type="button" onClick={copy} className="inline-flex min-h-8 items-center gap-1.5 rounded-md px-2 text-[0.78rem] font-medium text-[#c7d5ea] hover:bg-white/10 hover:text-white">
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[0.86rem] leading-[1.65] text-[#eaf2ff]" tabIndex={0}>
        <code>{code}</code>
      </pre>
      {caption && <figcaption className="border-t border-white/10 px-4 py-2.5 text-[0.8rem] text-[#a9b8cf]">{caption}</figcaption>}
    </figure>
  );
}
