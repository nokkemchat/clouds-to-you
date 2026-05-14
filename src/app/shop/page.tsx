import { getProducts } from "@/app/actions/productActions";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getProducts();

  // Group products
  const groupedProducts = products.reduce((acc, product) => {
    const group = product.group || "Other";
    if (!acc[group]) acc[group] = [];
    acc[group].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <div className="min-h-screen bg-background-primary flex flex-col relative">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/222.jpg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-45 grayscale-[20%] brightness-[0.8]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/90 via-background-primary/40 to-background-primary" />
      </div>

      
      <div className="h-[72px] relative z-10" />

      <main className="flex-1 max-w-7xl mx-auto w-full px-8 lg:px-16 py-24 relative z-10">
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-white mb-8">
            The <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-primary via-white to-brand-cyan">Collection</span>
          </h1>
          <p className="text-xl text-white/50 tracking-wide font-light leading-relaxed">
            Experience the intersection of engineering and luxury. Our curated collection represents the peak of vapor technology.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex p-8 glass-ios rounded-[40px] border border-white/5 text-white/20">
              No products found in the database.
            </div>
          </div>
        ) : (
          <div className="space-y-40">
            {Object.entries(groupedProducts).map(([groupName, groupProducts]) => (
              <section key={groupName} className="relative">
                <div className="sticky top-24 z-30 mb-12 flex items-center gap-6 py-4">
                  <div className="glass-ios px-8 py-3 rounded-2xl border border-white/10 shadow-2xl">
                    <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary" />
                      {groupName}
                    </h2>
                  </div>
                  <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {groupProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-20 px-4 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto glass-ios rounded-[40px] p-8 sm:p-12 border border-white/10 overflow-hidden relative">
          <div className="glass-reflection" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div className="space-y-6">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                <p className="text-xl font-bold text-white tracking-tight">Clouds To You</p>
              </div>
              <p className="text-white/30 text-sm max-w-xs mx-auto md:mx-0">
                Redefining the vapor experience through precision engineering and modern luxury.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">
                <Link href="/" className="hover:text-brand-primary transition-colors">Privacy</Link>
                <Link href="/" className="hover:text-brand-primary transition-colors">Terms</Link>
                <Link href="/admin" className="hover:text-brand-primary transition-colors">Console</Link>
              </div>
              <div className="pt-6 border-t border-white/5 w-full md:w-auto text-center md:text-right">
                <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">© 2026 Clouds To You. All rights reserved.</p>
                <p className="mt-2 text-[10px] text-brand-primary/40 uppercase tracking-widest font-bold">Must be 18+ to purchase</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
