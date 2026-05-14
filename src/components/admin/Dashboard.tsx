"use client";

import { Package, MapPin, TrendingUp, Users, ShoppingBag, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: "orange" | "cyan" | "white";
}

function StatCard({ label, value, icon, trend, color }: StatCardProps) {
  const colorMap = {
    orange: "text-brand-primary bg-brand-primary/10 border-brand-primary/20",
    cyan: "text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20",
    white: "text-white bg-white/10 border-white/20",
  };

  return (
    <div className="bg-background-secondary p-6 rounded-3xl border border-white/5 shadow-xl relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 pointer-events-none transition-opacity group-hover:opacity-40 ${color === 'orange' ? 'bg-brand-primary' : 'bg-brand-cyan'}`} />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-2xl border ${colorMap[color]}`}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-lg">
            {trend}
          </span>
        )}
      </div>
      
      <div className="relative z-10">
        <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );
}

export default function Dashboard({ productCount, locationCount }: { productCount: number, locationCount: number }) {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Welcome Back, Admin</h1>
        <p className="text-white/40">Here's what's happening with <span className="text-white font-medium">Clouds To You</span> today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard 
          label="Total Inventory" 
          value={productCount} 
          icon={<Package className="w-6 h-6" />} 
          trend="+4 new" 
          color="orange" 
        />
        <StatCard 
          label="Store Locations" 
          value={locationCount} 
          icon={<MapPin className="w-6 h-6" />} 
          color="cyan" 
        />
        <StatCard 
          label="Total Sales" 
          value="$12,840" 
          icon={<TrendingUp className="w-6 h-6" />} 
          trend="+12%" 
          color="white" 
        />
        <StatCard 
          label="Active Users" 
          value="1,204" 
          icon={<Users className="w-6 h-6" />} 
          color="cyan" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-bold text-white tracking-tight">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            <button className="flex items-center justify-between p-5 glass-ios rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="font-semibold text-white/80 group-hover:text-white">Add New Product</span>
              </div>
            </button>
            <button className="flex items-center justify-between p-5 glass-ios rounded-2xl border border-white/5 hover:border-brand-cyan/30 transition-all group text-left">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-cyan group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-semibold text-white/80 group-hover:text-white">Register Store</span>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity / Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white tracking-tight">System Status</h2>
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest animate-pulse">Operational</span>
          </div>
          <div className="bg-background-secondary rounded-3xl border border-white/5 p-8 flex flex-col items-center justify-center text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-white/20" />
             </div>
             <div>
               <p className="text-white font-bold">Cloud Sync Active</p>
               <p className="text-sm text-white/40 max-w-xs mx-auto">Your database is currently synchronized with the live storefront across all edge locations.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
