import { GuidePage } from "@/components/templates/guide-page";
import { getGuide } from "@/lib/guides";
import { buildMetadata } from "@/lib/metadata";

const guide = getGuide("seo-standards")!;

export const metadata = buildMetadata({
  title: guide.metaTitle,
  absoluteTitle: true,
  description: guide.metaDescription,
  path: "/seo-standards",
  eyebrow: guide.navLabel,
});

export default function Page() {
  return <GuidePage guide={guide} />;
}
