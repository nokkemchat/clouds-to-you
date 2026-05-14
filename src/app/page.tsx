"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CanvasScrollSequence from "@/components/CanvasScrollSequence";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Navigation2, CheckCircle2, ArrowRight, Map as MapIcon } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section 1: Hero (0% - 15%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // Section 2: Engineering Reveal (15% - 40%)
  const engOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.40], [0, 1, 1, 0]);
  const engY = useTransform(scrollYProgress, [0.15, 0.25, 0.40], [50, 0, -50]);

  // Section 3: Vapor Technology (40% - 65%)
  const techOpacity = useTransform(scrollYProgress, [0.40, 0.50, 0.60, 0.65], [0, 1, 1, 0]);
  const techY = useTransform(scrollYProgress, [0.40, 0.50, 0.65], [50, 0, -50]);

  // Section 4: Flavor Experience (65% - 85%)
  const flavorOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.80, 0.85], [0, 1, 1, 0]);
  const flavorScale = useTransform(scrollYProgress, [0.65, 0.75, 0.85], [0.95, 1, 1.05]);

  // Section 5: Reassembly + CTA (85% - 100%)
  const finalOpacity = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 1, 1]);
  const finalY = useTransform(scrollYProgress, [0.85, 0.95], [50, 0]);

  return (
    <div className="relative bg-background-primary">
      
      {/* Scroll Container (500vh tall to allow scrolling) */}
      <div ref={containerRef} className="relative h-[500vh] w-full">
        
        {/* Sticky viewport container */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
          
          <CanvasScrollSequence progress={scrollYProgress} />

          {/* Overlays Container */}
          <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto px-8 lg:px-16 flex items-center">
            
            {/* Hero Section */}
            <motion.div 
              style={{ opacity: heroOpacity, y: heroY }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center pb-[20vh]"
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-brand-cyan/20 drop-shadow-2xl">
                Clouds To You
              </h1>
              <p className="mt-6 text-xl md:text-2xl font-light tracking-wide text-white/70 max-w-lg mx-auto">
                Elevate every inhale.
              </p>
              <p className="mt-2 text-sm md:text-base text-white/40 uppercase tracking-widest font-medium">
                Luxury vaping technology engineered for modern nightlife.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-6">
                <Link 
                  href="/shop" 
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold tracking-wider text-lg hover:shadow-[0_0_40px_rgba(255,106,0,0.5)] transition-all duration-500 transform hover:scale-105"
                >
                  Shop Now
                </Link>
                <Link 
                  href="/locations" 
                  className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold tracking-wide text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-xl"
                >
                  Find a Store
                </Link>
              </div>
            </motion.div>

            {/* Engineering Reveal Section */}
            <motion.div 
              style={{ opacity: engOpacity, y: engY }}
              className="absolute left-8 right-8 lg:left-16 lg:right-auto lg:max-w-md flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
                Precision-built for pure vapor.
              </h2>
              <div className="relative glass-ios p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/10 overflow-hidden">
                <div className="glass-reflection" />
                <div className="space-y-4 text-sm md:text-lg text-white/60 font-light relative z-10">
                  <p>
                    Advanced airflow engineering and premium heating systems deliver smooth, consistent performance.
                  </p>
                  <p className="hidden sm:block">
                    Every component is crafted for flavor, balance, and all-day comfort.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vapor Technology Section */}
            <motion.div 
              style={{ opacity: techOpacity, y: techY }}
              className="absolute right-8 left-8 lg:left-auto lg:right-16 lg:max-w-md flex flex-col items-center lg:items-end text-center lg:text-right"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
                Smart vapor<br className="hidden lg:block" /> technology,<br className="hidden lg:block" /> redefined.
              </h2>
              <div className="relative glass-ios p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/10 overflow-hidden ml-auto">
                <div className="glass-reflection" />
                <div className="space-y-4 text-sm md:text-lg text-white/60 font-light relative z-10">
                  <p>
                    Precision airflow adapts instantly for smoother draws.
                  </p>
                  <p className="hidden sm:block">
                    Advanced heating systems maximize flavor and consistency.
                  </p>
                  <p className="text-brand-primary/80 font-medium">
                    Dense cinematic clouds with refined performance.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Flavor Experience Section */}
            <motion.div 
              style={{ opacity: flavorOpacity, scale: flavorScale }}
              className="absolute inset-0 flex flex-col items-center justify-end text-center pb-24"
            >
              <div className="relative max-w-2xl glass-ios p-12 rounded-[50px] border border-brand-primary/20 shadow-[0_0_80px_rgba(255,106,0,0.1)] overflow-hidden">
                <div className="glass-reflection" />
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-cyan mb-6">
                    Flavor that surrounds you.
                  </h2>
                  <div className="space-y-2 text-lg text-white/70 font-light">
                    <p>Premium vapor systems unlock richer flavor, smoother texture, and immersive clouds.</p>
                    <p>Engineered for nightlife, relaxation, and elevated experiences.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reassembly + CTA Section */}
            <motion.div 
              style={{ opacity: finalOpacity, y: finalY }}
              className="absolute inset-0 flex flex-col items-center justify-end text-center pb-[15vh]"
            >
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
                Inhale the future.
              </h2>
              <p className="text-xl md:text-2xl text-white/60 font-light mb-2">
                Clouds To You. Designed for flavor, crafted for lifestyle.
              </p>
              <p className="text-sm text-white/40 uppercase tracking-widest mb-10">
                Built for nightlife, travel, and everyday luxury.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link href="/shop" className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold tracking-wide text-lg hover:shadow-[0_0_30px_rgba(255,106,0,0.4)] transition-all duration-300 transform hover:scale-105">
                  Shop Devices
                </Link>
                <Link href="/shop" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium tracking-wide text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
                  Explore Flavors
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      <div className="relative z-20 bg-background-primary pt-20">
        {/* Store Locations Preview */}
        <section className="relative max-w-7xl mx-auto px-8 lg:px-16 py-32 border-t border-white/5 overflow-hidden rounded-[60px] my-20">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/kk.webp" 
              alt="Locations Background" 
              fill
              className="object-cover opacity-30 scale-110 blur-[2px]"
              quality={60}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background-primary via-background-primary/80 to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                  Visit a Clouds To You<br />Destination.
                </h2>
                <p className="text-lg text-white/50 font-light leading-relaxed max-w-lg">
                  Experience the future of flavor in person. Visit our luxury flagship stores to explore our full collection.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-6 glass-ios rounded-3xl border border-white/5">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                    <Navigation2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Global Flagships</h4>
                    <p className="text-sm text-white/40">From Harare to Bulawayo, find us everywhere.</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 glass-ios rounded-3xl border border-white/5">
                  <div className="w-12 h-12 bg-brand-cyan/10 rounded-2xl flex items-center justify-center text-brand-cyan">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Authentic Gear</h4>
                    <p className="text-sm text-white/40">Expert setup advice from our specialists.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link 
                  href="/locations"
                  className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold tracking-wide hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-3 group"
                >
                  Find Nearest Store
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <Link href="/locations" className="relative aspect-square lg:aspect-video rounded-[50px] overflow-hidden glass-ios border border-white/20 shadow-2xl group cursor-pointer">
              <div className="glass-reflection" />
              <div className="absolute inset-0 bg-[#0a0a0c]">
                <Image 
                  src="/222.jpg" 
                  alt="Store Radar" 
                  fill
                  className="object-cover opacity-40 grayscale blur-sm scale-110 group-hover:scale-100 transition-transform duration-1000"
                  quality={50}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background-primary via-background-primary/40 to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-primary/20 blur-[100px] animate-pulse" />
                    <div className="w-32 h-32 rounded-full border border-brand-primary/30 flex items-center justify-center relative z-10">
                      <div className="w-20 h-20 rounded-full border border-brand-primary/10 flex items-center justify-center">
                        <div className="w-5 h-5 bg-brand-primary rounded-full shadow-[0_0_30px_rgba(255,106,0,1)]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 flex items-center gap-4 z-20">
                  <div className="p-4 bg-brand-primary rounded-2xl text-white shadow-lg shadow-brand-primary/20">
                    <MapIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-0.5">Systems</p>
                    <p className="text-sm font-bold text-white uppercase tracking-widest">Radar Active</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 px-4 sm:px-8">
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
    </div>
  );
}
