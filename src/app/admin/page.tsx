import { getProducts } from "@/app/actions/productActions";
import { getLocations } from "@/app/actions/locationActions";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [initialProducts, initialLocations] = await Promise.all([
    getProducts(),
    getLocations()
  ]);

  return (
    <div className="p-8 lg:p-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Platform Control</h1>
        <p className="text-white/50 text-sm">Manage your inventory, locations, and live store listings.</p>
      </div>

      <AdminClient initialProducts={initialProducts} initialLocations={initialLocations} />
    </div>
  );
}
