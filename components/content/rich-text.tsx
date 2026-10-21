import Link from "next/link";
import { tokenize } from "@/lib/markup";

/** Renders inline markup ([label](/path), **bold**, `code`) as safe React elements. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {tokenize(text).map((tk, i) => {
        switch (tk.t) {
          case "bold":
            return (
              <strong key={i} className="font-semibold text-[var(--color-heading)]">
                {tk.v}
              </strong>
            );
          case "code":
            return (
              <code key={i} className="rounded-md bg-[var(--color-light-blue)] px-1.5 py-0.5 font-mono text-[0.86em] text-[var(--color-accent-deep)]">
                {tk.v}
              </code>
            );
          case "link":
            return /^https?:\/\//.test(tk.href) ? (
              <a key={i} href={tk.href} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--color-accent-text)] underline decoration-[var(--color-accent)]/30 underline-offset-[3px] hover:decoration-[var(--color-accent)]">
                {tk.v}
              </a>
            ) : (
              <Link key={i} href={tk.href} className="font-medium text-[var(--color-accent-text)] underline decoration-[var(--color-accent)]/30 underline-offset-[3px] hover:decoration-[var(--color-accent)]">
                {tk.v}
              </Link>
            );
          default:
            return <span key={i}>{tk.v}</span>;
        }
      })}
    </>
  );
}
