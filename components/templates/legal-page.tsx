import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { RichText } from "@/components/content/rich-text";
import { Toc } from "@/components/content/toc";
import { formatDate } from "@/lib/utils";
import type { LegalPage as Legal } from "@/lib/legal";

/** Plain, readable legal page with a sticky table of contents. */
export function LegalPage({ page }: { page: Legal }) {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-28 md:pb-32 md:pt-36" aria-labelledby="legal-title">
      <div aria-hidden className="grid-bg absolute inset-x-0 top-0 -z-10 h-[520px]" />
      <div aria-hidden className="aurora absolute inset-x-0 top-0 -z-10 h-[520px]" />
      <div className="container-wide">
        <Breadcrumbs items={[{ name: page.title, href: `/${page.slug}` }]} className="fade-up" />
        <div className="mt-10 max-w-3xl">
          <p className="eyebrow mb-5">Legal</p>
          <h1 id="legal-title" className="text-[length:var(--text-h1)] leading-[1]">
            {page.title}
          </h1>
          <p className="mt-6 text-[length:var(--text-lead)] leading-relaxed text-ink-soft">
            <RichText text={page.lead} />
          </p>
          <p className="mt-5 text-sm text-ink-muted">
            Last updated <time dateTime={page.updated}>{formatDate(page.updated)}</time>
          </p>
        </div>
        <div className="mt-14 grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <div data-lenis-prevent className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <Toc items={page.sections.map((s) => ({ id: s.id, label: s.heading }))} />
            </div>
          </aside>
          <article className="max-w-[46rem]">
            {page.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-[var(--color-border)] py-9 first:pt-0 last:border-b-0" aria-labelledby={`${s.id}-h`}>
                <h2 id={`${s.id}-h`} className="text-[clamp(1.5rem,2.3vw,2rem)] leading-tight">
                  {s.heading}
                </h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="mt-4 text-[1.03rem] leading-[1.8] text-ink-soft">
                    <RichText text={p} />
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-4 space-y-2 text-[1.01rem] leading-[1.7] text-ink-soft">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                        <span>
                          <RichText text={b} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>
        </div>
      </div>
    </section>
  );
}
