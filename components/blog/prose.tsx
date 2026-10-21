import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { SITE } from "@/lib/site";

/*
  Server-rendered Markdown for journal posts. Raw HTML in post bodies is NOT rendered
  (react-markdown escapes it by default), so CMS content can't inject scripts.
  Heading ids come from rehype-slug and match the table of contents.
*/

const components: Components = {
  h2: ({ children, id }) => (
    <h2 id={id} className="mt-16 scroll-mt-28 font-serif text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.08] text-ink">
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="mt-10 scroll-mt-28 font-serif text-[1.6rem] leading-snug text-ink">
      {children}
    </h3>
  ),
  h4: ({ children }) => <h4 className="mt-8 text-lg font-medium text-ink">{children}</h4>,
  p: ({ children }) => <p className="mt-6 text-[1.1rem] leading-[1.75] text-ink-soft">{children}</p>,
  a: ({ href = "", children }) => {
    const external = /^https?:\/\//.test(href) && !href.includes(new URL(SITE.url).hostname);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="text-ink underline decoration-[var(--color-accent)] decoration-1 underline-offset-4 transition-colors hover:text-[var(--color-accent-text)]"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => <ul className="mt-6 list-disc space-y-2.5 pl-6 text-[1.08rem] leading-relaxed text-ink-soft marker:text-[var(--color-accent-text)]">{children}</ul>,
  ol: ({ children }) => <ol className="mt-6 list-decimal space-y-2.5 pl-6 text-[1.08rem] leading-relaxed text-ink-soft marker:text-ink-muted">{children}</ol>,
  li: ({ children }) => <li className="pl-1.5">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-10 border-l-2 border-[var(--color-accent)] pl-6 font-serif text-[1.55rem] italic leading-snug text-ink [&_p]:mt-0 [&_p]:text-inherit">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-14 border-[var(--color-border)]" />,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  img: ({ src, alt }) =>
    typeof src === "string" ? (
      // eslint-disable-next-line @next/next/no-img-element -- CMS images on arbitrary hosts
      <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" className="my-10 w-full rounded-[var(--radius-lg)]" />
    ) : null,
  code: ({ children, className }) =>
    className ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="rounded bg-[var(--color-surface-muted)] px-1.5 py-0.5 text-[0.92em] text-ink">{children}</code>
    ),
  pre: ({ children }) => (
    <pre className="my-8 overflow-x-auto rounded-[var(--radius-md)] bg-[var(--color-surface-muted)] p-5 text-sm leading-relaxed text-ink-soft">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-10 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--color-border)]">
      <table className="w-full min-w-[520px] border-collapse text-left text-[0.95rem]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[var(--color-surface)]">{children}</thead>,
  th: ({ children }) => <th className="border-b border-[var(--color-border)] px-4 py-3 font-medium text-ink">{children}</th>,
  td: ({ children }) => <td className="border-b border-[var(--color-border)] px-4 py-3 align-top text-ink-soft">{children}</td>,
};

export function Prose({ markdown }: { markdown: string }) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
