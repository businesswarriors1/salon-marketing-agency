import { generateServiceMetadata, ServicePage } from "@/components/ServicePage";

export const metadata = generateServiceMetadata("email-marketing");

export default function EmailMarketingPage() {
  return <ServicePage slug="email-marketing" />;
}
