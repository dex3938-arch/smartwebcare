/*
  Tiny inline markup used by the guide / FAQ / legal content:
  [label](/path) links, **bold** and `code`. Parsed into tokens (no HTML injection).
*/

export type Token =
  | { t: "text"; v: string }
  | { t: "bold"; v: string }
  | { t: "code"; v: string }
  | { t: "link"; v: string; href: string };

const RE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;

export function tokenize(text: string): Token[] {
  const out: Token[] = [];
  let last = 0;
  for (const m of text.matchAll(RE)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ t: "text", v: text.slice(last, i) });
    if (m[1] !== undefined) out.push({ t: "link", v: m[1], href: m[2] });
    else if (m[3] !== undefined) out.push({ t: "bold", v: m[3] });
    else if (m[4] !== undefined) out.push({ t: "code", v: m[4] });
    last = i + m[0].length;
  }
  if (last < text.length) out.push({ t: "text", v: text.slice(last) });
  return out;
}

/** Plain text (for meta descriptions and JSON-LD). */
export function stripMarkup(text: string) {
  return tokenize(text)
    .map((tk) => tk.v)
    .join("");
}
