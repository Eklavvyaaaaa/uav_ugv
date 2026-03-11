"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { ShieldCheck, ShieldAlert, Navigation, Settings, Loader2, MapPin, Crosshair, Server } from "lucide-react";

// Dynamically import map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#0a0a0a] border border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white opacity-5"></div>
      <div className="flex flex-col items-center gap-4 text-blue-500 font-mono text-[10px] tracking-[0.2em]">
        <Crosshair className="w-8 h-8 animate-spin" />
        INITIALIZING SATELLITE LINK...
      </div>
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
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [manualRadius, setManualRadius] = useState("");

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

  const handleManualOverride = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (manualLat && manualLng) {
      const lat = parseFloat(manualLat);
      const lng = parseFloat(manualLng);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        setDevicePos([lat, lng]);
      }
    }

    if (manualRadius && data) {
      const radius = parseFloat(manualRadius);
      if (!isNaN(radius) && radius > 0) {
        setData(prev => prev ? {
          ...prev,
          geofence: { ...prev.geofence, radiusMeters: radius }
        } : null);
      }
    }
  };

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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center relative">
         <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none"></div>
         <div className="flex flex-col items-center gap-4 border border-white/10 p-8 bg-black/50 backdrop-blur-sm relative z-10">
           <Loader2 className="w-8 h-8 text-white animate-spin" />
           <p className="text-gray-400 font-mono tracking-[0.3em] uppercase text-xs">BOOT SEQUENCE INITIATED...</p>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-blue-500/[0.05] border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-6">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 bg-blue-500"></span>
                </span>
                LINK ESTABLISHED // {data.device.id}
              </div>
              <h1 className="text-4xl md:text-5xl font-mono font-black uppercase text-white tracking-tighter">Geofence Terminal</h1>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 font-mono tracking-widest uppercase mb-1">Live Telemetry Feed</p>
              <div className="flex items-center gap-2 justify-end text-sm text-gray-400 font-mono">
                <Server className="w-4 h-4 text-emerald-500" /> SERVER: CONNECTED
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10 p-px">
          {/* Map Area */}
          <div className="lg:col-span-8 h-[600px] order-2 lg:order-1 relative bg-[#0a0a0a]">
            {/* HUD Map Overlays */}
            <div className="absolute top-4 left-4 z-[400] pointer-events-none">
              <div className="text-[10px] font-mono text-white/50 tracking-[0.2em] bg-black/60 px-2 py-1 border border-white/10 backdrop-blur-md">
                POS: {devicePos[0].toFixed(5)}, {devicePos[1].toFixed(5)}
              </div>
            </div>
            
            <Map 
              center={data.geofence.center} 
              geofenceRadius={data.geofence.radiusMeters} 
              devicePosition={devicePos}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Controls & Status Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-px order-1 lg:order-2 bg-transparent">
            {/* Status Panel */}
            <div className={`p-8 bg-[#0a0a0a] transition-colors duration-500 flex flex-col justify-center h-48 relative overflow-hidden group border-b border-transparent`}>
              <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${isInside ? "bg-emerald-500" : "bg-rose-500"}`} />
              <div className="flex items-center gap-6 relative z-10">
                <div className={`p-4 border ${isInside ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/5 group-hover:bg-emerald-500/10" : "border-rose-500/50 text-rose-500 bg-rose-500/10 group-hover:bg-rose-500/20"} transition-colors`}>
                  {isInside ? (
                    <ShieldCheck className="w-8 h-8" />
                  ) : (
                    <ShieldAlert className="w-8 h-8 animate-pulse" />
                  )}
                </div>
                <div>
                  <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">Perimeter Status</h3>
                  <p className={`font-mono font-bold text-xl uppercase tracking-wider ${isInside ? "text-emerald-500" : "text-rose-500"}`}>
                    {isInside ? "SECURE_ZONE" : "BREACH_DETECTED"}
                  </p>
                </div>
              </div>
            </div>

            {/* Simulation Controls */}
            <div className="bg-[#0a0a0a] p-8 flex-grow flex flex-col">
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                <Settings className="w-5 h-5 text-gray-400" />
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">Manual Override</h3>
              </div>
              
              <div className="flex-grow flex flex-col justify-center items-center">
                <form onSubmit={handleManualOverride} className="w-full max-w-[240px] flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Latitude</label>
                    <input 
                      type="text" 
                      value={manualLat}
                      onChange={(e) => setManualLat(e.target.value)}
                      placeholder={devicePos ? devicePos[0].toFixed(5) : "Enter Lat"}
                      className="bg-[#0a0a0a] border border-white/10 text-white font-mono text-xs p-3 w-full focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Longitude</label>
                    <input 
                      type="text" 
                      value={manualLng}
                      onChange={(e) => setManualLng(e.target.value)}
                      placeholder={devicePos ? devicePos[1].toFixed(5) : "Enter Lng"}
                      className="bg-[#0a0a0a] border border-white/10 text-white font-mono text-xs p-3 w-full focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Radius (Meters)</label>
                    <input 
                      type="text" 
                      value={manualRadius}
                      onChange={(e) => setManualRadius(e.target.value)}
                      placeholder={data?.geofence.radiusMeters.toString() || "Enter Radius"}
                      className="bg-[#0a0a0a] border border-white/10 text-white font-mono text-xs p-3 w-full focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-700"
                    />
                  </div>
                  <div className="flex gap-2 w-full mt-2">
                    <button 
                      type="submit"
                      className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white p-3 flex items-center justify-center transition-all text-[10px] font-mono font-black tracking-widest uppercase"
                    >
                      OVERRIDE
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setDevicePos(data.device.initialPosition);
                        setData(prev => prev ? {
                          ...prev,
                          geofence: { ...prev.geofence, radiusMeters: 500 } // Or whatever the initial API radius should be (could also store original)
                        } : null);
                        setManualLat("");
                        setManualLng("");
                        setManualRadius("");
                      }} 
                      className="flex-none w-12 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-500/50 text-gray-400 hover:text-rose-500 p-3 flex items-center justify-center transition-all text-[10px] font-mono font-black tracking-widest uppercase"
                      title="Reset to Initial"
                    >
                      RST
                    </button>
                  </div>
                </form>
                
                <button 
                  onClick={() => {
                    if ("geolocation" in navigator) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const newPos: [number, number] = [position.coords.latitude, position.coords.longitude];
                          setData(prev => prev ? {
                            ...prev,
                            geofence: { ...prev.geofence, center: newPos },
                            device: { ...prev.device, initialPosition: newPos }
                          } : null);
                          setDevicePos(newPos);
                        },
                        (error) => {
                          console.error("Error getting location:", error);
                          alert("Could not get your location. Please check browser permissions.");
                        }
                      );
                    } else {
                      alert("Geolocation is not supported by your browser");
                    }
                  }}
                  className="w-full max-w-[240px] mt-6 bg-transparent hover:bg-emerald-500/5 text-emerald-500 p-4 flex items-center justify-center transition-all text-[10px] font-mono font-bold tracking-[0.2em] border border-emerald-500/30 hover:border-emerald-500 uppercase gap-3 group"
                >
                  <MapPin className="w-4 h-4 group-hover:animate-pulse" /> 
                  LOCALIZE FEED
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
