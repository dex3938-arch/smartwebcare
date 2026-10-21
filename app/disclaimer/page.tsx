import { LegalPage } from "@/components/templates/legal-page";
import { LEGAL_PAGES } from "@/lib/legal";
import { buildMetadata } from "@/lib/metadata";

const page = LEGAL_PAGES["disclaimer"];

export const metadata = buildMetadata({
  title: page.metaTitle,
  absoluteTitle: true,
  description: page.metaDescription,
  path: "/disclaimer",
  eyebrow: "Legal",
});

export default function Page() {
  return <LegalPage page={page} />;
}
