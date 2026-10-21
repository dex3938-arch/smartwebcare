import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Prose } from "@/components/blog/prose";
import { PostCard } from "@/components/blog/post-card";
import { CtaBand } from "@/components/sections/cta-band";
import { getAllPosts, getHeadings, getPost, plainText } from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";
import { articleSchema } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

export const revalidate = 600;
export const dynamicParams = true; // new posts render on first visit

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: "Post not found", robots: { index: false } };
  return buildMetadata({
    title: post.title,
    description: post.excerpt || plainText(post.content),
    path: `/blog/${post.slug}`,
    eyebrow: post.categories[0] ?? "The Journal",
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const headings = (await getHeadings(post.content)).filter((h) => h.depth === 2);
  const related = (await getAllPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.excerpt || plainText(post.content),
          slug: post.slug,
          date: post.date,
          image: post.image ?? undefined,
        })}
      />
      <article>
        <header className="container-wide pt-28 md:pt-36">
          <Breadcrumbs
            items={[
              { name: "Journal", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
            className="fade-up"
          />
          <div className="mt-12 max-w-4xl">
            <div className="fade-up flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted" style={{ ["--i" as string]: 0 }}>
              {post.categories[0] && <span className="eyebrow !text-[var(--color-accent-text)]">{post.categories[0]}</span>}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.readTime && (
                <>
                  <span aria-hidden>·</span>
                  <span>{post.readTime}</span>
                </>
              )}
              {post.author && (
                <>
                  <span aria-hidden>·</span>
                  <span>By {post.author}</span>
                </>
              )}
            </div>
            <h1 className="mt-6 text-[length:var(--text-h1)] leading-[1] text-ink">
              <span className="reveal-line">
                <span>{post.title}</span>
              </span>
            </h1>
            {post.excerpt && (
              <p className="rise mt-7 max-w-2xl text-[length:var(--text-lead)] leading-relaxed text-ink-soft" style={{ ["--i" as string]: 1 }}>
                {post.excerpt}
              </p>
            )}
          </div>
          {post.image && (
            <div className="shutter relative mt-14 aspect-[21/9] overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-surface-muted)]">
              {/* eslint-disable-next-line @next/next/no-img-element -- CMS images on arbitrary hosts */}
              <img src={post.image} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          )}
        </header>

        <div className="container-wide mt-16 grid gap-12 md:mt-20 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20">
          <div className="max-w-[72ch]">
            <Prose markdown={post.content} />
            <Link href="/blog" className="link-underline mt-16 inline-flex items-center gap-2 text-sm text-ink">
              <ArrowLeft className="h-4 w-4" aria-hidden /> All journal entries
            </Link>
          </div>
          {headings.length > 2 && (
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-28">
                <p className="eyebrow mb-4">On this page</p>
                <ol className="space-y-2.5 border-l border-[var(--color-border)]">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 text-sm leading-snug text-ink-muted transition-colors hover:border-[var(--color-accent)] hover:text-ink">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-wide mt-28" aria-labelledby="more-title">
          <h2 id="more-title" className="eyebrow mb-10 border-b border-[var(--color-border)] pb-4">
            Keep reading
          </h2>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
