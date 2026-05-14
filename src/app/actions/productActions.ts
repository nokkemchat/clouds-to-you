"use server";

import fs from "fs/promises";
import path from "path";
import { Product } from "@/data/products";
import { revalidatePath } from "next/cache";

const dbPath = path.join(process.cwd(), "data", "products.json");

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data) as Product[];
  } catch (error) {
    console.error("Failed to read products database:", error);
    return [];
  }
}

export async function addProduct(formData: FormData) {
  try {
    const products = await getProducts();
    
    // Process image file
    const file = formData.get("imageFile") as File | null;
    let imageUrl = formData.get("imageUrl") as string;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}_${file.name}`;
      const filepath = path.join(process.cwd(), "public", "uploads", filename);
      await fs.writeFile(filepath, buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const featuresString = formData.get("features") as string;
    const flavorsString = formData.get("flavors") as string;

    const newProduct: Product = {
      id: `prod_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: formData.get("name") as string,
      tagline: formData.get("tagline") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string) || 0,
      imageUrl: imageUrl || "",
      group: formData.get("group") as string,
      features: featuresString.split(",").map(f => f.trim()).filter(Boolean),
      flavors: flavorsString.split(",").map(f => f.trim()).filter(Boolean),
    };

    products.push(newProduct);
    await fs.writeFile(dbPath, JSON.stringify(products, null, 2), "utf-8");
    
    revalidatePath("/shop");
    revalidatePath("/admin");
    
    return { success: true, product: newProduct };
  } catch (error) {
    console.error("Failed to add product:", error);
    return { success: false, error: "Failed to add product to database" };
  }
}

export async function deleteProduct(id: string) {
  try {
    const products = await getProducts();
    const newProducts = products.filter((p) => p.id !== id);
    
    await fs.writeFile(dbPath, JSON.stringify(newProducts, null, 2), "utf-8");
    
    revalidatePath("/shop");
    revalidatePath("/admin");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete product from database" };
  }
}
