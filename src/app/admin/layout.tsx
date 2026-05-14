import { Inter } from "next/font/google";
import Link from "next/link";
import { ArrowLeft, Database, LayoutDashboard, MapPin, Package, Settings, ShoppingBag } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-[#050505] text-white flex`}>
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-background-secondary p-8 flex flex-col hidden lg:flex">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
            <Database className="w-6 h-6 text-brand-primary" />
          </div>
          <div>
            <h2 className="font-bold tracking-tight text-white">Console v1.0</h2>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Cloud Control</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-brand-primary bg-brand-primary/5 border border-brand-primary/10 rounded-xl">
            <Package className="w-4 h-4" />
            Inventory & Shop
          </Link>
          <Link href="/locations" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <MapPin className="w-4 h-4" />
            Store Locations
          </Link>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all opacity-40">
            <Settings className="w-4 h-4" />
            Site Settings
          </Link>
        </nav>

        <div className="space-y-4">
          <Link href="/shop" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/60 hover:text-white border border-white/5 rounded-xl transition-all bg-white/[0.02]">
            <ShoppingBag className="w-4 h-4" />
            View Live Store
          </Link>
          <div className="pt-6 border-t border-white/5">
            <Link href="/" className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-6 border-b border-white/5 bg-background-secondary">
          <div className="flex items-center gap-3 text-brand-primary">
            <Database className="w-5 h-5" />
            <span className="font-bold tracking-tight text-white">Console</span>
          </div>
          <Link href="/" className="text-sm text-white/50">Exit</Link>
        </div>

        <div className="p-8 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}
