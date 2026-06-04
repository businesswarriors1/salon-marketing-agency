import { generateServiceMetadata, ServicePage } from "@/components/ServicePage";

export const metadata = generateServiceMetadata("social-media-marketing");

export default function SocialMediaMarketingPage() {
  return <ServicePage slug="social-media-marketing" />;
}
