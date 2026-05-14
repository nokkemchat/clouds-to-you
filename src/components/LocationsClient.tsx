"use client";

import { useState, useEffect, useMemo } from "react";
import { StoreLocation } from "@/data/locations";
import StoreCard from "@/components/StoreCard";
import StoreMap from "@/components/StoreMap";
import { Search, Navigation2, Map as MapIcon, List } from "lucide-react";

interface LocationsClientProps {
  initialLocations: StoreLocation[];
}

export default function LocationsClient({ initialLocations }: LocationsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  useEffect(() => {
    // Get user location for "Find Nearest"
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => console.log("Geolocation denied")
      );
    }
  }, []);

  const filteredLocations = useMemo(() => {
    return initialLocations.filter(
      (loc) =>
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, initialLocations]);

  const sortedLocations = useMemo(() => {
    if (!userLocation) return filteredLocations;

    return [...filteredLocations].sort((a, b) => {
      const distA = Math.sqrt(Math.pow(a.lat - userLocation.lat, 2) + Math.pow(a.lng - userLocation.lng, 2));
      const distB = Math.sqrt(Math.pow(b.lat - userLocation.lat, 2) + Math.pow(b.lng - userLocation.lng, 2));
      return distA - distB;
    });
  }, [filteredLocations, userLocation]);

  const calculateDistance = (lat: number, lng: number) => {
    if (!userLocation) return undefined;
    const radlat1 = (Math.PI * lat) / 180;
    const radlat2 = (Math.PI * userLocation.lat) / 180;
    const theta = lng - userLocation.lng;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344;
    return dist;
  };

  return (
    <div className="min-h-screen bg-background-primary flex flex-col">
      <main className="flex-1 flex flex-col md:flex-row relative pt-[72px]">
        {/* Sidebar */}
        <div className="w-full md:w-[400px] lg:w-[450px] bg-background-secondary/50 backdrop-blur-3xl border-r border-white/5 flex flex-col z-20 overflow-hidden relative">
          <div className="glass-reflection" />
          {/* Search Header */}
          <div className="p-6 sm:p-8 space-y-6 border-b border-white/5 relative z-10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">Find a Store</h1>
              <p className="text-white/40 text-sm">Locate your nearest Clouds To You destination.</p>
            </div>

            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-brand-primary transition-colors" />
              <input
                type="text"
                placeholder="Search city or area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/20 transition-all font-medium"
              />
            </div>

            <div className="flex gap-2 p-1.5 glass-ios rounded-2xl border border-white/5 md:hidden">
              <button
                onClick={() => setViewMode("map")}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  viewMode === "map" ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white"
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                Map
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                  viewMode === "list" ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                List
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {sortedLocations.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-white/20">
                  <Search className="w-6 h-6" />
                </div>
                <p className="text-white/40">No stores found in this area.</p>
              </div>
            ) : (
              sortedLocations.map((loc) => (
                <StoreCard
                  key={loc.id}
                  location={loc}
                  isActive={selectedId === loc.id}
                  onClick={() => {
                    setSelectedId(loc.id);
                    setViewMode("map");
                  }}
                  distance={calculateDistance(loc.lat, loc.lng)}
                />
              ))
            )}
          </div>
        </div>

        {/* Map Container */}
        <div className={`flex-1 h-[calc(100vh-72px)] relative z-10 transition-opacity duration-300 ${
          viewMode === "list" ? "hidden md:block opacity-0 md:opacity-100" : "block opacity-100"
        }`}>
          <StoreMap
            locations={filteredLocations}
            selectedId={selectedId}
            onSelectStore={setSelectedId}
            userLocation={userLocation}
          />

          {/* Map Overlay HUD */}
          <div className="absolute top-6 right-6 flex flex-col gap-3">
            <button 
              onClick={() => {
                if (userLocation) {
                  // Centering handled by StoreMap
                }
              }}
              className="p-4 glass-ios rounded-2xl text-white hover:text-brand-primary transition-all border border-white/10 group shadow-2xl"
            >
              <Navigation2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
