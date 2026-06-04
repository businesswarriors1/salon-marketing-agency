import { generateServiceMetadata, ServicePage } from "@/components/ServicePage";

export const metadata = generateServiceMetadata("google-ads");

export default function GoogleAdsPage() {
  return <ServicePage slug="google-ads" />;
}
