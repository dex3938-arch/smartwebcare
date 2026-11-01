import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { getTopic, type Insight } from "@/lib/insights";
import { readingMinutes } from "@/lib/subpages";
import { stripMarkup } from "@/lib/markup";
import { cn } from "@/lib/utils";

export function insightMinutes(a: Insight) {
  return readingMinutes(a.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets ?? [])]));
}

/** Article card used in carousels and grids. */
export function InsightCard({ article, className }: { article: Insight; className?: string }) {
  const topic = getTopic(article.category);
  return (
    <Link
      href={`/insights/${article.slug}`}
      className={cn(
        "glass group flex h-full min-h-[280px] flex-col rounded-[26px] p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-lift)] md:p-7",
        className
      )}
    >
      <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--color-accent-text)]">{topic?.label}</span>
      <h3 className="mt-4 font-serif text-[1.45rem] leading-snug text-[var(--color-heading)]">{article.title}</h3>
      <p className="mt-3 line-clamp-3 flex-1 text-[0.96rem] leading-relaxed text-ink-muted">{stripMarkup(article.lead)}</p>
      <span className="mt-6 flex items-center justify-between text-sm text-ink-muted">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" aria-hidden /> {insightMinutes(article)} min read
        </span>
        <ArrowUpRight className="h-5 w-5 text-[var(--color-accent-text)] transition-transform duration-300 group-hover:rotate-45" aria-hidden />
      </span>
    </Link>
  );
}
