import Link from "next/link";
import { BookOpen, LayoutGrid, Route, Sparkles } from "lucide-react";
import { SUBPAGE_KINDS, getSubpages, type SubpageKind } from "@/lib/subpages";
import { cn } from "@/lib/utils";

const ICONS = { overview: LayoutGrid, guide: BookOpen, process: Route, useCases: Sparkles } as const;

/** Tabs linking a service's overview with its Guide, Process and Use-cases pages. */
export function ServiceSubnav({
  slug,
  title,
  active,
  className,
}: {
  slug: string;
  title: string;
  active: "overview" | SubpageKind;
  className?: string;
}) {
  if (!getSubpages(slug)) return null;
  const tabs = [
    { key: "overview" as const, href: `/${slug}`, label: "Overview" },
    ...SUBPAGE_KINDS.map((k) => ({ key: k.key, href: `/${slug}/${k.path}`, label: k.label })),
  ];
  return (
    <nav aria-label={`${title} pages`} className={cn("container-wide mt-12 md:mt-16", className)}>
      <ul className="glass flex gap-1 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none] sm:inline-flex">
        {tabs.map((t) => {
          const on = t.key === active;
          const Icon = ICONS[t.key];
          return (
            <li key={t.key} className="shrink-0">
              <Link
                href={t.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-2 rounded-full px-4 text-[0.92rem] font-semibold transition-colors duration-200 sm:px-5",
                  on ? "bg-[var(--color-navy)] text-white shadow-[0_8px_20px_-10px_rgba(8,27,58,0.7)]" : "text-ink-soft hover:bg-white hover:text-[var(--color-heading)]"
                )}
              >
                <Icon className={cn("h-4 w-4", on ? "text-[#67e8f9]" : "text-[var(--color-accent-text)]")} aria-hidden />
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
