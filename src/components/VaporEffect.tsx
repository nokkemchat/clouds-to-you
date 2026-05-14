"use client";

import { useEffect, useState } from "react";

interface VaporEffectProps {
  colorClass: string;
  isActive: boolean;
}

export default function VaporEffect({ colorClass, isActive }: VaporEffectProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 overflow-hidden ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Vapor Blob 1 */}
      <div 
        className={`absolute bottom-[-10%] left-[20%] w-32 h-32 rounded-full blur-[40px] opacity-60 animate-vapor-drift ${colorClass}`}
        style={{ animationDelay: '0s', animationDuration: '8s' }}
      />
      {/* Vapor Blob 2 */}
      <div 
        className={`absolute bottom-[-20%] right-[20%] w-40 h-40 rounded-full blur-[50px] opacity-40 animate-vapor-drift-reverse ${colorClass}`}
        style={{ animationDelay: '2s', animationDuration: '10s' }}
      />
      {/* Vapor Blob 3 */}
      <div 
        className={`absolute top-[40%] left-[40%] w-24 h-24 rounded-full blur-[30px] opacity-30 animate-vapor-float ${colorClass}`}
        style={{ animationDelay: '1s', animationDuration: '6s' }}
      />
    </div>
  );
}
