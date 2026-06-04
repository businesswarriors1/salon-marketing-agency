import { generateServiceMetadata, ServicePage } from "@/components/ServicePage";

export const metadata = generateServiceMetadata("meta-ads");

export default function MetaAdsPage() {
  return <ServicePage slug="meta-ads" />;
}
