import { generateServiceMetadata, ServicePage } from "@/components/ServicePage";

export const metadata = generateServiceMetadata("website-design");

export default function WebsiteDesignPage() {
  return <ServicePage slug="website-design" />;
}
