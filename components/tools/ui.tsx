"use client";

import { useId, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/* Small, accessible form + result primitives shared by the free tools. */

const control =
  "mt-2 block w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 text-[1rem] text-ink placeholder:text-ink-muted/70 transition-colors focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]";

export function Field({
  label,
  required,
  hint,
  error,
  children,
  id,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-[var(--color-accent-text)]"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-ink-muted">{hint}</p>}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-[var(--color-error)]">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  required,
  hint,
  error,
  type = "text",
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const id = useId();
  return (
    <Field label={label} required={required} hint={hint} error={error} id={id}>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-required={required || undefined}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(control, "h-12", error && "border-[var(--color-error)]")}
      />
    </Field>
  );
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  const id = useId();
  return (
    <Field label={label} id={id}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(control, "h-12 appearance-none bg-no-repeat pr-10")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1.5l5 5 5-5' stroke='%23a8988c' stroke-width='1.5'/%3E%3C/svg%3E\")",
          backgroundPosition: "right 1rem center",
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

/** Toggle chips for multi-select (aria-pressed buttons). */
export function ChipGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium text-ink">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(o.value)}
              className={cn(
                "inline-flex min-h-10 items-center rounded-full border px-4 text-sm transition-colors",
                on
                  ? "border-ink bg-ink text-[var(--color-background)]"
                  : "border-[var(--color-border-strong)] text-ink-soft hover:border-ink"
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState<"idle" | "ok" | "fail">("idle");
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone("ok");
        } catch {
          setDone("fail");
        }
        setTimeout(() => setDone("idle"), 1800);
      }}
      className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border-strong)] px-3 text-xs text-ink-soft transition-colors hover:border-ink hover:text-ink"
      aria-label={`${label}: ${text.slice(0, 60)}`}
    >
      {done === "ok" ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
      <span aria-live="polite">{done === "ok" ? "Copied" : done === "fail" ? "Couldn't copy" : label}</span>
    </button>
  );
}

/** A list of generated text options, each copyable, with optional character budget. */
export function ResultList({
  items,
  limit,
  multiline = false,
}: {
  items: string[];
  /** Platform character limit — shows a count and flags overruns. */
  limit?: number;
  multiline?: boolean;
}) {
  return (
    <ol className="space-y-3">
      {items.map((t, i) => {
        const over = limit != null && t.length > limit;
        return (
          <li
            key={i}
            className="flex items-start justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            <div className="min-w-0">
              <p className={cn("text-[1rem] leading-relaxed text-ink", multiline && "whitespace-pre-line")}>{t}</p>
              {limit != null && (
                <p className={cn("tabular mt-2 text-xs", over ? "text-[var(--color-error)]" : "text-ink-muted")}>
                  {t.length}/{limit} characters{over ? " — over the limit, trim before using" : ""}
                </p>
              )}
            </div>
            <CopyButton text={t} />
          </li>
        );
      })}
    </ol>
  );
}

export const toolCard =
  "rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-9";
