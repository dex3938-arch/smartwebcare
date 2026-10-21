import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/*
  Blog posts are read from a Supabase project (table `blog_posts`) — point the env vars at SmartWebCare's own project.
  Queries mirror the original site exactly:
    list:   select("*").eq("published", true).order("date", { ascending: false })
    single: select("*").eq("slug", slug).eq("published", true).single()
  but now run on the server, so posts ship as crawlable HTML instead of a
  client-side "Loading blog posts…" state.
*/

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown
  date: string; // ISO
  author: string | null;
  readTime: string | null;
  image: string | null;
  categories: string[];
};

type Row = {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  date: string;
  author: string | null;
  read_time: string | number | null;
  featured_image: string | null;
  categories: string[] | null;
};

let client: SupabaseClient | null | undefined;

function getClient() {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn(
      "[blog] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY not set — blog will render empty."
    );
    client = null;
    return client;
  }
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}

function toPost(r: Row): BlogPost {
  const rt = r.read_time;
  return {
    id: String(r.id),
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt ?? "",
    content: r.content ?? "",
    date: r.date,
    author: r.author,
    readTime: rt == null ? null : typeof rt === "number" ? `${rt} min read` : rt,
    image: r.featured_image,
    categories: r.categories ?? [],
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const sb = getClient();
  if (!sb) return [];
  const { data, error } = await sb
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });
  if (error) {
    console.error("[blog] list failed:", error.message);
    return [];
  }
  return (data as Row[]).map(toPost);
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const sb = getClient();
  if (!sb) return null;
  const { data, error } = await sb
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("[blog] post failed:", error.message);
    return null;
  }
  return data ? toPost(data as Row) : null;
}

/** Strip Markdown to plain text for meta descriptions / reading fallbacks. */
export function plainText(md: string, max = 160) {
  const text = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? text.slice(0, max - 1).trimEnd() + "…" : text;
}

/** Extract h2/h3 headings for the table of contents. Slugs match rehype-slug's output. */
export async function getHeadings(md: string) {
  const { default: GithubSlugger } = await import("github-slugger");
  const slugger = new GithubSlugger();
  const headings: { depth: 2 | 3; text: string; id: string }[] = [];
  let inFence = false;
  for (const line of md.split("\n")) {
    if (line.trim().startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
    headings.push({ depth: m[1].length as 2 | 3, text, id: slugger.slug(text) });
  }
  return headings;
}
