"use server";

import fs from "fs/promises";
import path from "path";
import { StoreLocation } from "@/data/locations";
import { revalidatePath } from "next/cache";

const dbPath = path.join(process.cwd(), "data", "locations.json");

export async function getLocations(): Promise<StoreLocation[]> {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data) as StoreLocation[];
  } catch (error) {
    console.error("Failed to read locations database:", error);
    return [];
  }
}

export async function addLocation(formData: FormData) {
  try {
    const locations = await getLocations();
    
    const newLocation: StoreLocation = {
      id: `loc_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      lat: parseFloat(formData.get("lat") as string),
      lng: parseFloat(formData.get("lng") as string),
      phone: formData.get("phone") as string,
      hours: formData.get("hours") as string,
      city: formData.get("city") as string,
    };

    locations.push(newLocation);
    await fs.writeFile(dbPath, JSON.stringify(locations, null, 2), "utf-8");
    
    revalidatePath("/locations");
    revalidatePath("/admin");
    
    return { success: true, location: newLocation };
  } catch (error) {
    console.error("Failed to add location:", error);
    return { success: false, error: "Failed to add location to database" };
  }
}

export async function deleteLocation(id: string) {
  try {
    const locations = await getLocations();
    const newLocations = locations.filter((l) => l.id !== id);
    
    await fs.writeFile(dbPath, JSON.stringify(newLocations, null, 2), "utf-8");
    
    revalidatePath("/locations");
    revalidatePath("/admin");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete location:", error);
    return { success: false, error: "Failed to delete location from database" };
  }
}
