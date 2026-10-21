import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { PostCard } from "@/components/blog/post-card";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/metadata";

// Posts come from Supabase; rebuild the list at most every 10 minutes.
export const revalidate = 600;

export const metadata = buildMetadata({
  title: "Journal — Branding & Marketing Insights",
  description:
    "Fresh insights on social media marketing, branding, AI and digital strategy from SmartWebCare — trends and tips to help your brand grow juicy and unforgettable.",
  path: "/blog",
  eyebrow: "The Journal",
});

export default async function BlogIndex() {
  const posts = await getAllPosts();
  const [feature, ...rest] = posts;

  return (
    <>
      <PageHero
        crumbs={[{ name: "Journal", href: "/blog" }]}
        eyebrow="The journal"
        title="Fresh thinking on brand, social and growth."
        lead="Insights on social media marketing, branding, and digital strategy — the latest trends and tips to help your brand grow juicy and unforgettable."
      />

      {posts.length === 0 ? (
        <section className="container-wide mt-20">
          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center md:p-16">
            <p className="font-serif text-[2rem] text-ink">New entries are on their way.</p>
            <p className="mx-auto mt-3 max-w-md text-ink-muted">
              The journal couldn&rsquo;t be loaded right now. In the meantime, ask us anything directly.
            </p>
            <Button href="/contact" variant="accent" className="mt-8">
              Start a conversation
            </Button>
          </div>
        </section>
      ) : (
        <>
          <section className="container-wide mt-16 md:mt-20" aria-label="Latest post">
            <PostCard post={feature} size="lg" priority className="md:[&>a]:grid md:[&>a]:grid-cols-[1.25fr_1fr] md:[&>a]:items-end md:[&>a]:gap-10" />
          </section>
          {rest.length > 0 && (
            <section className="container-wide mt-20 md:mt-28" aria-label="All posts">
              <h2 className="eyebrow mb-10 border-b border-[var(--color-border)] pb-4">
                All entries · {posts.length}
              </h2>
              <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <CtaBand />
    </>
  );
}
