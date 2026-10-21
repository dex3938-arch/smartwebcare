/**
 * Renders one or more JSON-LD blocks. Server component — ships as plain <script>,
 * so structured data is present in crawlable HTML with zero client cost.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Structured data is static and trusted (built from our own config).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
