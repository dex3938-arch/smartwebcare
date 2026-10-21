import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "inverse" | "link";
type Size = "sm" | "md" | "lg";

// Labels may wrap on very narrow screens (min-height, not fixed height) so a long
// button can never force its container wider than the viewport.
const base =
  "group relative inline-flex items-center justify-center gap-2 text-center font-semibold leading-snug rounded-full transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-focus)] disabled:opacity-50 disabled:pointer-events-none select-none";

/* All pairs contrast-checked on white, the `.tint` scope and the `.navy` scope. */
const variants: Record<Variant, string> = {
  // Deep navy → blue on hover (white text 17:1 → 5.2:1).
  primary:
    "bg-[var(--color-navy)] text-white hover:bg-[var(--color-accent)] active:scale-[0.98] shadow-[0_10px_30px_-14px_rgba(8,27,58,0.6)]",
  // The signature CTA: electric blue → deeper blue (white text 5.2:1 → 6.7:1) with a cyan-blue glow.
  accent:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-deep)] hover:shadow-[0_14px_36px_-12px_rgba(37,99,235,0.75),0_0_0_4px_rgba(103,232,249,0.18)] active:scale-[0.98] shadow-[0_10px_30px_-12px_rgba(37,99,235,0.65)]",
  secondary:
    // Glass outline — adapts to white, tint and navy scopes via tokens.
    "bg-[var(--color-glass)] text-[var(--color-heading)] border border-[var(--color-border-strong)] backdrop-blur hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)] active:scale-[0.98]",
  ghost:
    "bg-transparent text-[var(--color-heading)] hover:bg-[var(--color-surface-muted)] active:scale-[0.98]",
  // For navy / blue bands: white pill, navy text (17:1).
  inverse:
    "bg-white text-[#081b3a] hover:bg-[#dbeafe] active:scale-[0.98]",
  link: "bg-transparent text-[var(--color-accent-text)] underline-offset-4 hover:underline px-0",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-6 py-2.5 text-[0.95rem]",
  lg: "min-h-14 px-7 py-3 text-base sm:px-8",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    base,
    variants[variant],
    variant !== "link" && sizes[size],
    className
  );

  const content = (
    <>
      {loading && (
        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center"
        >
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        </span>
      )}
      <span
        className={cn(
          "inline-flex items-center gap-2 transition-opacity",
          loading && "opacity-0"
        )}
      >
        {children}
      </span>
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorRest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      className={classes}
      disabled={loading || buttonRest.disabled}
      aria-busy={loading || undefined}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
