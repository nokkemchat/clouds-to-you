"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { StoreLocation } from "@/data/locations";
import { Navigation, Phone, Clock } from "lucide-react";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

interface StoreMapProps {
  locations: StoreLocation[];
  selectedId: string | null;
  onSelectStore: (id: string) => void;
  userLocation: { lat: number; lng: number } | null;
}

// Custom component to handle map centering and fly-to effects
function MapController({ center }: { center: [number, number] }) {
  // This needs to be inside a component rendered under MapContainer
  const map = (require("react-leaflet") as any).useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export default function StoreMap({ locations, selectedId, onSelectStore, userLocation }: StoreMapProps) {
  const [L, setL] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Import Leaflet directly for custom icon handling
    import("leaflet").then((leaf) => {
      setL(leaf);
    });
  }, []);

  const center = useMemo(() => {
    const selectedStore = locations.find((l) => l.id === selectedId);
    if (selectedStore) return [selectedStore.lat, selectedStore.lng] as [number, number];
    if (userLocation) return [userLocation.lat, userLocation.lng] as [number, number];
    if (locations.length > 0) return [locations[0].lat, locations[0].lng] as [number, number];
    return [-17.8252, 31.0335] as [number, number]; // Harare
  }, [selectedId, userLocation, locations]);

  if (!isMounted || !L) {
    return (
      <div className="w-full h-full bg-background-secondary animate-pulse flex items-center justify-center">
        <div className="text-white/20 font-bold tracking-widest uppercase">Initializing Radar...</div>
      </div>
    );
  }

  // Define custom icons
  const storeIcon = L.divIcon({
    className: "custom-div-icon",
    html: `<div class="w-8 h-8 rounded-full bg-brand-primary border-4 border-black shadow-lg flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-white animate-pulse"></div></div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  const selectedIcon = L.divIcon({
    className: "custom-div-icon",
    html: `<div class="w-10 h-10 rounded-full bg-brand-cyan border-4 border-black shadow-[0_0_20px_rgba(0,214,255,0.5)] flex items-center justify-center"><div class="w-3 h-3 rounded-full bg-white animate-ping"></div></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  const userIcon = L.divIcon({
    className: "custom-div-icon",
    html: `<div class="w-6 h-6 rounded-full bg-white border-2 border-brand-cyan shadow-lg"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%", background: "#050505" }}
        zoomControl={false}
      >
        {/* CartoDB Dark Matter tiles - FREE and looks premium */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <MapController center={center} />

        {locations.map((store) => (
          <Marker
            key={store.id}
            position={[store.lat, store.lng]}
            icon={store.id === selectedId ? selectedIcon : storeIcon}
            eventHandlers={{
              click: () => onSelectStore(store.id),
            }}
          >
            <Popup className="premium-popup">
              <div className="p-2 min-w-[200px] bg-background-primary text-white">
                <h4 className="font-bold text-brand-primary mb-2">{store.name}</h4>
                <div className="space-y-1 text-xs text-white/80">
                  <p className="flex items-center gap-2"><Phone className="w-3 h-3" /> {store.phone}</p>
                  <p className="flex items-center gap-2"><Clock className="w-3 h-3" /> {store.hours}</p>
                </div>
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`)}
                  className="mt-3 w-full py-2 bg-brand-primary rounded-lg text-[10px] font-bold uppercase tracking-wider text-white hover:brightness-110 transition-all"
                >
                  Directions
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {userLocation && (
          <Marker 
            position={[userLocation.lat, userLocation.lng]} 
            icon={userIcon}
          >
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Custom styles for Leaflet elements */}
      <style jsx global>{`
        .leaflet-container {
          background: #050505 !important;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(10, 10, 12, 0.8) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px !important;
          color: white !important;
          padding: 0 !important;
          overflow: hidden;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
        .leaflet-popup-tip {
          background: rgba(10, 10, 12, 0.8) !important;
        }
        .leaflet-bar {
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
          overflow: hidden;
        }
        .leaflet-bar a {
          background: rgba(20, 20, 25, 0.8) !important;
          color: white !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
        }
        .leaflet-bar a:hover {
          background: rgba(255, 106, 0, 0.2) !important;
          color: #FF6A00 !important;
        }
        .custom-div-icon {
          background: none !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
}
