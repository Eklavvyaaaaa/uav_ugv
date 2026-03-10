"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { ShieldCheck, ShieldAlert, Navigation, Settings, Loader2 } from "lucide-react";

// Dynamically import map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
    </div>
  ),
});

interface GeofenceData {
  geofence: { center: [number, number]; radiusMeters: number; colorHex: string };
  device: { initialPosition: [number, number]; id: string; status: string };
}

export default function GeofenceSimulation() {
  const [data, setData] = useState<GeofenceData | null>(null);
  const [devicePos, setDevicePos] = useState<[number, number] | null>(null);
  const [isInside, setIsInside] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch("/api/geofence-status");
        if (res.ok) {
          const json = await res.json();
          setData(json.data);
          setDevicePos(json.data.device.initialPosition);
        }
      } catch (e) {
        console.error("Failed to fetch geofence config", e);
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, []);

  const moveDevice = (direction: 'n' | 's' | 'e' | 'w') => {
    if (!devicePos) return;
    const step = 0.0005;
    setDevicePos(prev => {
      if(!prev) return null;
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

  if (loading || !data || !devicePos) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
           <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
           <p className="text-gray-400 animate-pulse font-mono tracking-widest text-sm">INITIALIZING SYSTEM DATA...</p>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            CONNECTED: {data.device.id}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Geofence Live View</h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            Interactive dashboard monitoring real-time telemetry against defined geographic boundaries loaded from our edge API.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
          {/* Map Area */}
          <div className="lg:col-span-2 h-full order-2 lg:order-1 relative z-0 shadow-2xl shadow-blue-500/5">
            <Map 
              center={data.geofence.center} 
              geofenceRadius={data.geofence.radiusMeters} 
              devicePosition={devicePos}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Controls & Status Sidebar */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            {/* Status Panel */}
            <div className={`p-6 rounded-2xl border transition-all duration-500 ${
                isInside 
                  ? "bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/30 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]" 
                  : "bg-gradient-to-br from-rose-500/10 to-transparent border-rose-500/30 shadow-[0_0_30px_-10px_rgba(244,63,94,0.3)]"
              }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-4 rounded-xl shadow-inner ${isInside ? "bg-emerald-500/20 shadow-emerald-500/20" : "bg-rose-500/20 shadow-rose-500/20"}`}>
                  {isInside ? (
                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  ) : (
                    <ShieldAlert className="w-8 h-8 text-rose-400 animate-bounce" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">System Status</h3>
                  <p className={isInside ? "text-emerald-400 font-bold text-lg" : "text-rose-400 font-bold text-lg animate-pulse"}>
                    {isInside ? "SECURE : NO BREACH" : "CRITICAL : BOUNDARY BREACHED"}
                  </p>
                </div>
              </div>
            </div>

            {/* Simulation Controls */}
            <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/10 p-6 rounded-2xl flex-grow shadow-xl">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                 <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">Manual Override</h3>
                 </div>
              </div>
              
              <div className="bg-black/60 p-6 rounded-xl border border-white/5 shadow-inner">
                <div className="grid grid-cols-3 gap-3 max-w-[200px] mx-auto">
                  <div />
                  <button onClick={() => moveDevice('n')} className="bg-white/5 hover:bg-blue-500/20 hover:border-blue-500/50 border border-white/10 p-4 rounded-xl flex items-center justify-center transition-all group">
                    <Navigation className="w-6 h-6 -rotate-45 text-gray-400 group-hover:text-blue-400" />
                  </button>
                  <div />
                  <button onClick={() => moveDevice('w')} className="bg-white/5 hover:bg-blue-500/20 hover:border-blue-500/50 border border-white/10 p-4 rounded-xl flex items-center justify-center transition-all group">
                    <Navigation className="w-6 h-6 -rotate-[135deg] text-gray-400 group-hover:text-blue-400" />
                  </button>
                  <button onClick={() => setDevicePos(data.device.initialPosition)} className="bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] p-4 rounded-xl flex items-center justify-center transition-all text-sm font-black tracking-widest border border-blue-500/30">
                    RST
                  </button>
                  <button onClick={() => moveDevice('e')} className="bg-white/5 hover:bg-blue-500/20 hover:border-blue-500/50 border border-white/10 p-4 rounded-xl flex items-center justify-center transition-all group">
                    <Navigation className="w-6 h-6 rotate-[45deg] text-gray-400 group-hover:text-blue-400" />
                  </button>
                  <div />
                  <button onClick={() => moveDevice('s')} className="bg-white/5 hover:bg-blue-500/20 hover:border-blue-500/50 border border-white/10 p-4 rounded-xl flex items-center justify-center transition-all group">
                    <Navigation className="w-6 h-6 rotate-[135deg] text-gray-400 group-hover:text-blue-400" />
                  </button>
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
