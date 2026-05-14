"use client";

import { useState, useRef, useEffect } from "react";
import { Product } from "@/data/products";
import { addProduct, deleteProduct } from "@/app/actions/productActions";
import { addLocation, deleteLocation } from "@/app/actions/locationActions";
import { Trash2, Plus, Loader2, Upload, LayoutDashboard, Package, MapPin, Settings } from "lucide-react";
import Image from "next/image";
import Dashboard from "@/components/admin/Dashboard";
import { StoreLocation } from "@/data/locations";
import Link from "next/link";

export default function AdminClient({ initialProducts, initialLocations }: { initialProducts: Product[], initialLocations: StoreLocation[] }) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "inventory" | "locations" | "settings">("dashboard");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [locations, setLocations] = useState<StoreLocation[]>(initialLocations);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocSubmitting, setIsLocSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingLocId, setDeletingLocId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const locFormRef = useRef<HTMLFormElement>(null);

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const res = await addProduct(formData);
    if (res.success && res.product) {
      setProducts([...products, res.product]);
      formRef.current?.reset();
    } else {
      alert("Failed to add product");
    }
    setIsSubmitting(false);
  };

  const handleLocationAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLocSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const res = await addLocation(formData);
    if (res.success && res.location) {
      setLocations([...locations, res.location]);
      locFormRef.current?.reset();
    } else {
      alert("Failed to add location");
    }
    setIsLocSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeletingId(id);
    const res = await deleteProduct(id);
    if (res.success) {
      setProducts(products.filter(p => p.id !== id));
    }
    setDeletingId(null);
  };

  const handleLocationDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this location?")) return;
    setDeletingLocId(id);
    const res = await deleteLocation(id);
    if (res.success) {
      setLocations(locations.filter(l => l.id !== id));
    }
    setDeletingLocId(null);
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl w-fit border border-white/5">
        <button 
          onClick={() => setActiveTab("dashboard")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-white/40 hover:text-white'}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTab("inventory")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'inventory' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-white/40 hover:text-white'}`}
        >
          <Package className="w-4 h-4" />
          Inventory
        </button>
        <button 
          onClick={() => setActiveTab("locations")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'locations' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-white/40 hover:text-white'}`}
        >
          <MapPin className="w-4 h-4" />
          Locations
        </button>
        <button 
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'settings' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-white/40 hover:text-white'}`}
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>

      <div className="mt-12">
        {activeTab === "settings" && (
           <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-background-secondary p-8 rounded-3xl border border-white/5 shadow-xl">
                 <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                       <Settings className="w-5 h-5 text-white/40" />
                    </div>
                    General Settings
                 </h2>
                 
                 <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Store Name</label>
                          <input className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all" defaultValue="Clouds To You" />
                       </div>
                       <div>
                          <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Support Email</label>
                          <input className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all" defaultValue="support@cloudziii.co" />
                       </div>
                    </div>

                    <div>
                       <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Homepage Tagline</label>
                       <input className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all" defaultValue="Elevate every inhale." />
                    </div>

                    <div className="pt-6 border-t border-white/5">
                       <button className="px-8 py-3 bg-brand-primary rounded-xl text-white font-bold hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/10">
                          Update Global Config
                       </button>
                    </div>
                 </div>
              </div>

              <div className="bg-background-secondary p-8 rounded-3xl border border-white/5 shadow-xl">
                 <h2 className="text-xl font-bold text-white mb-6">Security</h2>
                 <p className="text-sm text-white/40 mb-6">Manage administrative access and session security.</p>
                 <button className="text-xs font-bold text-red-400 bg-red-400/10 px-4 py-2 rounded-lg hover:bg-red-400/20 transition-all">
                    Reset Admin Credentials
                 </button>
              </div>
           </div>
        )}

        {activeTab === "dashboard" && (
          <Dashboard productCount={products.length} locationCount={locations.length} />
        )}

        {activeTab === "inventory" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left Column: Form */}
            <div className="xl:col-span-1 space-y-6">
              <div className="bg-background-secondary p-8 rounded-3xl border border-white/5 shadow-xl">
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-brand-cyan" />
                  </div>
                  Add New Product
                </h2>

                <form ref={formRef} onSubmit={handleAdd} className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Product Name</label>
                    <input name="name" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-all" placeholder="e.g. Phantom X" />
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Tagline</label>
                    <input name="tagline" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-all" placeholder="e.g. The pinnacle of stealth." />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Price ($)</label>
                      <input name="price" required type="number" step="0.01" className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-all" placeholder="89.99" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Group</label>
                      <input name="group" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-all" placeholder="e.g. Pod Systems" />
                    </div>
                  </div>

                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl border-dashed">
                    <label className="block text-[10px] font-bold text-white/40 mb-3 uppercase tracking-widest">Product Image (.webp)</label>
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer flex items-center justify-center gap-2 bg-[#050505] hover:bg-white/10 text-brand-cyan border border-brand-cyan/30 px-4 py-3 rounded-xl transition-all text-sm w-full font-bold">
                        <Upload className="w-4 h-4" />
                        Choose WebP File
                        <input name="imageFile" type="file" accept="image/webp" className="hidden" />
                      </label>
                    </div>
                    <p className="text-[10px] text-white/20 mt-3 text-center uppercase tracking-widest">Or provide an Image URL instead</p>
                    <input name="imageUrl" className="w-full mt-2 bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-all text-sm" placeholder="https://..." />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Flavors (comma separated)</label>
                      <input name="flavors" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-all" placeholder="Mint, Mango, Classic..." />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Features (comma separated)</label>
                      <input name="features" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-all" placeholder="Ceramic Core, LED Ambient..." />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Description</label>
                    <textarea name="description" required rows={3} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-cyan transition-all resize-none" placeholder="Detailed product description..." />
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full py-4 mt-4 rounded-2xl bg-white text-black font-bold hover:bg-white/90 transition-all shadow-xl flex justify-center items-center gap-2">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save to Database"}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Database Table */}
            <div className="xl:col-span-2">
              <div className="bg-background-secondary rounded-3xl border border-white/5 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-black/40 text-white/30 uppercase tracking-[0.2em] text-[10px] font-bold border-b border-white/5">
                      <tr>
                        <th className="px-8 py-5 font-bold">Product</th>
                        <th className="px-8 py-5 font-bold">Group</th>
                        <th className="px-8 py-5 font-bold">Price</th>
                        <th className="px-8 py-5 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-8 py-20 text-center text-white/20 font-medium">No products found in database.</td>
                        </tr>
                      ) : (
                        products.map(product => (
                          <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-8 py-5 flex items-center gap-4">
                              <div className="w-14 h-14 rounded-xl bg-[#050505] relative overflow-hidden border border-white/10 flex-shrink-0 shadow-lg">
                                <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                              </div>
                              <div>
                                <p className="font-bold text-white text-base">{product.name}</p>
                                <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{product.flavors?.length || 0} Flavors Available</p>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <span className="px-3 py-1 bg-white/5 rounded-full text-white/60 text-xs font-medium border border-white/5">
                                {product.group}
                              </span>
                            </td>
                            <td className="px-8 py-5 font-bold text-brand-primary text-base">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="px-8 py-5 text-right">
                              <button 
                                onClick={() => handleDelete(product.id)}
                                disabled={deletingId === product.id}
                                className="p-3 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                              >
                                {deletingId === product.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "locations" && (
           <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
             {/* Left Column: Form */}
             <div className="xl:col-span-1 space-y-6">
               <div className="bg-background-secondary p-8 rounded-3xl border border-white/5 shadow-xl">
                 <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                     <Plus className="w-5 h-5 text-brand-primary" />
                   </div>
                   Add New Location
                 </h2>

                 <form ref={locFormRef} onSubmit={handleLocationAdd} className="space-y-5">
                   <div>
                     <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Store Name</label>
                     <input name="name" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all" placeholder="e.g. Clouds - Eastgate" />
                   </div>
                   
                   <div>
                     <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Full Address</label>
                     <input name="address" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all" placeholder="e.g. Shop 12, Eastgate Mall" />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Latitude</label>
                       <input name="lat" required type="number" step="any" className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all" placeholder="-17.8..." />
                     </div>
                     <div>
                       <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Longitude</label>
                       <input name="lng" required type="number" step="any" className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all" placeholder="31.0..." />
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">City</label>
                       <input name="city" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all" placeholder="e.g. Harare" />
                     </div>
                     <div>
                       <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Phone</label>
                       <input name="phone" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all" placeholder="+263..." />
                     </div>
                   </div>

                   <div>
                     <label className="block text-[10px] font-bold text-white/40 mb-2 uppercase tracking-widest">Opening Hours</label>
                     <input name="hours" required className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-all" placeholder="e.g. 8AM - 8PM" />
                   </div>

                   <button disabled={isLocSubmitting} type="submit" className="w-full py-4 mt-4 rounded-2xl bg-brand-primary text-white font-bold hover:bg-brand-primary/90 transition-all shadow-xl flex justify-center items-center gap-2">
                     {isLocSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Add Store to Map"}
                   </button>
                 </form>
               </div>
             </div>

             {/* Right Column: Database Table */}
             <div className="xl:col-span-2">
               <div className="bg-background-secondary rounded-3xl border border-white/5 shadow-xl overflow-hidden">
                 <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm">
                     <thead className="bg-black/40 text-white/30 uppercase tracking-[0.2em] text-[10px] font-bold border-b border-white/5">
                       <tr>
                         <th className="px-8 py-5 font-bold">Location</th>
                         <th className="px-8 py-5 font-bold">City</th>
                         <th className="px-8 py-5 font-bold">Coordinates</th>
                         <th className="px-8 py-5 font-bold text-right">Actions</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                       {locations.length === 0 ? (
                         <tr>
                           <td colSpan={4} className="px-8 py-20 text-center text-white/20 font-medium">No locations found in database.</td>
                         </tr>
                       ) : (
                         locations.map(loc => (
                           <tr key={loc.id} className="hover:bg-white/[0.02] transition-colors">
                             <td className="px-8 py-5">
                               <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                                   <MapPin className="w-5 h-5 text-brand-primary" />
                                 </div>
                                 <div>
                                   <p className="font-bold text-white text-base">{loc.name}</p>
                                   <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">{loc.address}</p>
                                 </div>
                               </div>
                             </td>
                             <td className="px-8 py-5">
                               <span className="px-3 py-1 bg-white/5 rounded-full text-white/60 text-xs font-medium border border-white/5">
                                 {loc.city}
                               </span>
                             </td>
                             <td className="px-8 py-5 font-mono text-[10px] text-white/40">
                               {loc.lat.toFixed(4)}, {loc.lng.toFixed(4)}
                             </td>
                             <td className="px-8 py-5 text-right">
                               <button 
                                 onClick={() => handleLocationDelete(loc.id)}
                                 disabled={deletingLocId === loc.id}
                                 className="p-3 text-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                               >
                                 {deletingLocId === loc.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                               </button>
                             </td>
                           </tr>
                         ))
                       )}
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}
