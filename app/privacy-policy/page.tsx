import { LegalPage } from "@/components/templates/legal-page";
import { LEGAL_PAGES } from "@/lib/legal";
import { buildMetadata } from "@/lib/metadata";

const page = LEGAL_PAGES["privacy-policy"];

export const metadata = buildMetadata({
  title: page.metaTitle,
  absoluteTitle: true,
  description: page.metaDescription,
  path: "/privacy-policy",
  eyebrow: "Legal",
});

export default function Page() {
  return <LegalPage page={page} />;
}
