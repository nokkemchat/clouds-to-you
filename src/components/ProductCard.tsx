"use client";

import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import VaporEffect from "./VaporEffect";
import FloatingNotes from "./FloatingNotes";
import { getFlavorTheme } from "@/utils/flavorThemes";
import { playHoverSound } from "@/utils/audio";
export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState(product.flavors?.[0] || "Standard");
  const [hoveredFlavor, setHoveredFlavor] = useState<string | null>(null);

  const activeTheme = hoveredFlavor ? getFlavorTheme(hoveredFlavor) : null;

  const handleAdd = () => {
    addItem(product, selectedFlavor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div 
      className="group relative rounded-[40px] overflow-hidden transition-all duration-700 flex flex-col h-full glass-ios hover:border-white/30 hover:shadow-[0_0_80px_rgba(255,255,255,0.05)]"
      onMouseLeave={() => setHoveredFlavor(null)}
    >
      <div className="glass-reflection" />
      {/* Dynamic Background Gradient */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 bg-gradient-to-br ${activeTheme?.bgGradient || "opacity-0"} z-0 pointer-events-none`} 
        style={{ opacity: activeTheme ? 0.4 : 0 }} 
      />

      {/* Vapor & Floating Notes */}
      {activeTheme && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
          <VaporEffect colorClass={activeTheme.vaporColor} isActive={!!hoveredFlavor} />
          <FloatingNotes notes={activeTheme.notes} isActive={!!hoveredFlavor} />
        </div>
      )}

      {/* Main Content Wrapper (must be above absolute effects) */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-black/40">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-secondary via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="p-6 relative z-10 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-semibold text-white tracking-tight">
            {product.name}
          </h3>
          <span className="text-lg font-medium text-brand-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-brand-cyan/80 text-sm tracking-wide font-medium mb-3">
          {product.tagline}
        </p>
        
        <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
          {product.description}
        </p>

        {/* Features list */}
        <ul className="space-y-2 mb-6 border-t border-white/5 pt-4">
          {product.features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-xs text-white/50 tracking-wide">
              <div className="w-1 h-1 rounded-full bg-brand-primary/50 mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        {/* Flavor Selector */}
        {product.flavors && product.flavors.length > 0 && (
          <div className="mb-6 relative z-20">
            <label className="block text-xs text-white/40 mb-3 uppercase tracking-widest font-semibold">
              Select Flavor
            </label>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x -mx-2 px-2">
              {product.flavors.map(f => (
                <button
                  key={f}
                  onClick={() => {
                    setSelectedFlavor(f);
                    setHoveredFlavor(f); // Allow theme preview on mobile tap
                  }}
                  onMouseEnter={() => {
                    setHoveredFlavor(f);
                    playHoverSound();
                  }}
                  className={`snap-start whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                    selectedFlavor === f 
                      ? "bg-brand-primary text-white border-brand-primary/50 shadow-[0_0_15px_rgba(255,106,0,0.3)]" 
                      : "bg-black/50 text-white/60 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          className={`relative z-20 w-full py-3.5 rounded-full flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-300 border mt-auto ${
            added 
              ? "bg-brand-cyan/20 border-brand-cyan text-brand-cyan shadow-[0_0_20px_rgba(0,214,255,0.3)]" 
              : "glass-card text-white hover:bg-white/10 hover:border-white/30"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  </div>
  );
}
