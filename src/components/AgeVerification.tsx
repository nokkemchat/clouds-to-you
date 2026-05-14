"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgeVerification() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const isVerified = localStorage.getItem("age-verified");
    if (!isVerified) {
      setIsVisible(true);
      // Prevent scrolling when popup is open
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem("age-verified", "true");
    setIsVisible(false);
    document.body.style.overflow = "auto";
  };

  const handleDecline = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-3xl p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="relative w-full max-w-md glass-ios rounded-[40px] p-6 sm:p-8 md:p-12 overflow-hidden border border-white/20 mx-4"
          >
            <div className="glass-reflection" />
            {/* Background Glow */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-brand-primary/20 blur-[80px] pointer-events-none rounded-full" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Company Logo */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-6 sm:mb-8 drop-shadow-[0_0_20px_rgba(255,106,0,0.3)]">
                <img
                  src="/logo.png"
                  alt="Clouds To You Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <h2 className="text-3xl font-bold mb-4 tracking-tight">
                Age Verification Required
              </h2>
              
              <p className="text-white/60 mb-10 leading-relaxed">
                Welcome to <span className="text-white font-medium">Clouds To You</span>. 
                You must be at least 18 years old to enter this site.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <button
                  onClick={handleVerify}
                  className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-[0_10px_30px_-10px_rgba(255,106,0,0.5)] border-t border-white/20"
                >
                  I am 18+
                </button>
                <button
                  onClick={handleDecline}
                  className="px-8 py-4 glass-card hover:bg-white/10 text-white/80 font-medium rounded-2xl transition-all active:scale-95 border border-white/5"
                >
                  No, exit site
                </button>
              </div>

              <p className="mt-8 text-[11px] text-white/30 uppercase tracking-[0.2em] font-semibold">
                Clouds To You &copy; 2026
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
