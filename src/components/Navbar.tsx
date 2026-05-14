"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);
  const { itemCount, toggleCart } = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
    <motion.nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-4 sm:px-8 py-2 w-[95%] max-w-7xl h-[64px] rounded-full glass-ios border border-white/20 transition-all duration-500`}
      style={{
        opacity: isMounted ? 1 : 0,
        y: isMounted ? 0 : -20,
      }}
    >
      <div className="glass-reflection" />
      <div className="flex-1 flex justify-start items-center gap-4">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 bg-current transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <img 
            src="/logo.png" 
            alt="Clouds To You" 
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110" 
          />
          <span className="hidden md:block text-lg font-bold tracking-tight text-white">
            Clouds To You
          </span>
        </Link>
      </div>

      <div className="flex-1 hidden lg:flex items-center justify-center space-x-6 text-sm font-medium text-white/60">
        <Link href="/" className="hover:text-white transition-colors tracking-wide">Home</Link>
        <Link href="/shop" className="hover:text-white transition-colors tracking-wide">Vapes</Link>
        <Link href="/shop" className="hover:text-white transition-colors tracking-wide">Energy</Link>
        <Link href="/shop" className="hover:text-white transition-colors tracking-wide">Perfume</Link>
        <Link href="/shop" className="hover:text-white transition-colors tracking-wide">Cigarettes</Link>
        <Link href="/locations" className="hover:text-white transition-colors tracking-wide">Locations</Link>
        <Link href="/shop" className="text-white font-semibold transition-colors tracking-wide">Shop All</Link>
      </div>

      <div className="flex-1 flex justify-end items-center gap-3 sm:gap-6">
        <button 
          onClick={toggleCart} 
          className="relative text-white hover:text-brand-primary transition-colors p-2"
        >
          <ShoppingBag className="w-5 h-5" />
          {isMounted && itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>

        <Link href="/shop" className="hidden sm:flex relative group px-6 py-2.5 rounded-full bg-transparent overflow-hidden border border-white/10 hover:border-transparent transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-[--color-brand-primary] to-[--color-brand-cyan] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 text-sm font-semibold text-white tracking-wide">
            Shop Now
          </span>
        </Link>
      </div>
    </motion.nav>

    {/* Mobile Menu Overlay */}
    {isMobileMenuOpen && (
      <div className="fixed inset-0 z-40 lg:hidden">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className="absolute top-24 left-4 right-4 glass-ios rounded-[32px] p-8 border border-white/10 flex flex-col items-center gap-6 text-xl font-bold tracking-tight text-white animate-in fade-in slide-in-from-top-4 duration-300">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop Devices</Link>
          <Link href="/locations" onClick={() => setIsMobileMenuOpen(false)}>Store Locations</Link>
          <div className="h-px w-full bg-white/5 my-2" />
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-brand-primary">Shop All Products</Link>
        </div>
      </div>
    )}
    </>
  );
}
