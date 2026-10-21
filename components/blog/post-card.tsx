import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { NetworkField } from "@/components/art/network-field";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PostCard({
  post,
  priority = false,
  className,
  size = "md",
}: {
  post: BlogPost;
  priority?: boolean;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface-muted)]",
            size === "lg" ? "aspect-[16/10]" : "aspect-[4/3]"
          )}
        >
          {post.image ? (
            // eslint-disable-next-line @next/next/no-img-element -- CMS images on arbitrary hosts
            <img
              src={post.image}
              alt=""
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
              <NetworkField seed={post.slug} />
            </div>
          )}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.readTime && (
            <>
              <span aria-hidden>·</span>
              <span>{post.readTime}</span>
            </>
          )}
          {post.categories[0] && (
            <>
              <span aria-hidden>·</span>
              <span>{post.categories[0]}</span>
            </>
          )}
        </div>
        <h3
          className={cn(
            "mt-3 font-serif leading-snug text-ink transition-colors duration-300 group-hover:text-[var(--color-accent-text)]",
            size === "lg" ? "text-[clamp(1.6rem,2.6vw,2.3rem)]" : "text-[1.45rem]"
          )}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-3 line-clamp-3 leading-relaxed text-ink-muted">{post.excerpt}</p>
        )}
      </Link>
    </article>
  );
}
