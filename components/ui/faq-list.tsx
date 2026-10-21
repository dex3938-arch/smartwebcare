import { Plus } from "lucide-react";
import { RichText } from "@/components/content/rich-text";
import { cn } from "@/lib/utils";

/**
 * Accessible FAQ built on native <details>/<summary>: keyboard + screen-reader support
 * for free, works without JavaScript, and the answers remain in crawlable HTML.
 */
export function FaqList({
  faqs,
  className,
}: {
  faqs: { question: string; answer: string }[];
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]", className)}>
      {faqs.map((f, i) => (
        <details key={i} className="faq group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-[1.22rem] font-medium leading-snug text-[var(--color-heading)] md:text-[1.35rem]">
              {f.question}
            </span>
            <span
              aria-hidden
              className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--color-border-strong)] transition-transform duration-300 group-open:rotate-45 group-open:border-[var(--color-accent)] group-open:bg-[var(--color-accent)] group-open:text-white"
            >
              <Plus className="h-4 w-4" />
            </span>
          </summary>
          <div className="faq-body pb-7 pr-12">
            <p className="max-w-[68ch] leading-relaxed text-ink-soft">
              <RichText text={f.answer} />
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
