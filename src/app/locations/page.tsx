import { getLocations } from "@/app/actions/locationActions";
import LocationsClient from "@/components/LocationsClient";

export const dynamic = "force-dynamic";

export default async function LocationsPage() {
  const initialLocations = await getLocations();

  return <LocationsClient initialLocations={initialLocations} />;
}
