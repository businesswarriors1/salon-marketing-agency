import { generateServiceMetadata, ServicePage } from "@/components/ServicePage";

export const metadata = generateServiceMetadata("seo");

export default function SeoPage() {
  return <ServicePage slug="seo" />;
}
