"use client";

import { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { ShieldCheck, ShieldAlert, Navigation, Settings } from "lucide-react";

// Dynamically import map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  ),
});

export default function GeofenceSimulation() {
  const GEOFENCE_CENTER: [number, number] = [28.6139, 77.2090]; // Example: New Delhi
  const [devicePos, setDevicePos] = useState<[number, number]>([28.6140, 77.2091]);
  const [isInside, setIsInside] = useState(true);
  
  const moveDevice = (direction: 'n' | 's' | 'e' | 'w') => {
    const step = 0.0005;
    setDevicePos(prev => {
      switch (direction) {
        case 'n': return [prev[0] + step, prev[1]];
        case 's': return [prev[0] - step, prev[1]];
        case 'e': return [prev[0], prev[1] + step];
        case 'w': return [prev[0], prev[1] - step];
        default: return prev;
      }
    });
  };

  const handleStatusChange = useCallback((status: boolean) => {
    setIsInside(status);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">Geofence Simulation</h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Interactive demonstration of real-time geofence monitoring. Move the device using the controls below to see how the system detects boundary breaches.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
          {/* Map Area */}
          <div className="lg:col-span-2 h-full order-2 lg:order-1 relative z-0">
            <Map 
              center={GEOFENCE_CENTER} 
              geofenceRadius={300} 
              devicePosition={devicePos}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Controls & Status Sidebar */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            {/* Status Panel */}
            <div className={`p-6 rounded-2xl border transition-colors ${
                isInside 
                  ? "bg-emerald-500/10 border-emerald-500/30" 
                  : "bg-rose-500/10 border-rose-500/30"
              }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${isInside ? "bg-emerald-500/20" : "bg-rose-500/20"}`}>
                  {isInside ? (
                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  ) : (
                    <ShieldAlert className="w-8 h-8 text-rose-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">System Status</h3>
                  <p className={isInside ? "text-emerald-400 font-medium" : "text-rose-400 font-bold animate-pulse"}>
                    {isInside ? "SECURE : INSIDE GEOFENCE" : "ALERT : BOUNDARY BREACHED"}
                  </p>
                </div>
              </div>
            </div>

            {/* Simulation Controls */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex-grow">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Simulation Controls</h3>
              </div>
              
              <div className="bg-black/50 p-6 rounded-xl border border-white/5">
                <p className="text-sm text-gray-400 text-center mb-6">Device Movement Override</p>
                
                <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                  <div />
                  <button onClick={() => moveDevice('n')} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex items-center justify-center transition-colors">
                    <Navigation className="w-5 h-5 -rotate-45" />
                  </button>
                  <div />
                  <button onClick={() => moveDevice('w')} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex items-center justify-center transition-colors">
                    <Navigation className="w-5 h-5 -rotate-[135deg]" />
                  </button>
                  <button onClick={() => setDevicePos(GEOFENCE_CENTER)} className="bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 p-4 rounded-xl flex items-center justify-center transition-colors text-xs font-bold">
                    RST
                  </button>
                  <button onClick={() => moveDevice('e')} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex items-center justify-center transition-colors">
                    <Navigation className="w-5 h-5 rotate-[45deg]" />
                  </button>
                  <div />
                  <button onClick={() => moveDevice('s')} className="bg-white/10 hover:bg-white/20 p-4 rounded-xl flex items-center justify-center transition-colors">
                    <Navigation className="w-5 h-5 rotate-[135deg]" />
                  </button>
                  <div />
                </div>
              </div>
              
              <div className="mt-6 text-sm text-gray-400 leading-relaxed border-t border-white/10 pt-6">
                <p className="font-bold text-white mb-2">How it works:</p>
                The geofence is defined as a 300-meter radius around the center coordinates. A backend worker continuously calculates the Haversine distance between the UAV/UGV GPS coordinates and the geofence perimeter. If the distance exceeds the radius, an alert state is triggered.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
