"use client";

import { StoreLocation } from "@/data/locations";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { motion } from "framer-motion";

interface StoreCardProps {
  location: StoreLocation;
  isActive?: boolean;
  onClick?: () => void;
  distance?: number;
}

export default function StoreCard({ location, isActive, onClick, distance }: StoreCardProps) {
  const handleDirections = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative cursor-pointer p-6 rounded-[32px] transition-all duration-300 border ${
        isActive 
          ? "glass-ios border-brand-primary/50 shadow-[0_0_50px_rgba(255,106,0,0.2)]" 
          : "bg-white/5 border-white/5 hover:border-white/20"
      }`}
    >
      {isActive && <div className="glass-reflection" />}
      {isActive && (
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
      )}

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
            {location.name}
          </h3>
          <div className="flex items-center gap-1.5 text-white/40 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{location.address}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Phone className="w-3 h-3 text-brand-primary/60" />
            {location.phone}
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Clock className="w-3 h-3 text-brand-primary/60" />
            {location.hours}
          </div>
        </div>

        {distance !== undefined && (
          <div className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest mt-1">
            {distance.toFixed(1)} km from you
          </div>
        )}

        <button
          onClick={handleDirections}
          className="w-full mt-2 py-3 rounded-2xl bg-white/5 hover:bg-brand-primary hover:text-white text-white/80 text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 group border border-white/5"
        >
          <Navigation className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          Get Directions
        </button>
      </div>
    </motion.div>
  );
}
