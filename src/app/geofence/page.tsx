"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Settings, Loader2, MapPin, Crosshair, Server } from "lucide-react";
import { useLocationTracker } from "../../hooks/useLocationTracker";
import { LocationMonitor } from "../../components/LocationMonitor";
import { GeofenceConfig } from "../../types/Location";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#0a0a0a] border border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-black dark:bg-grid-white opacity-5"></div>
      <div className="flex flex-col items-center gap-4 text-blue-600 dark:text-blue-500 font-mono text-[10px] tracking-[0.2em]">
        <Crosshair className="w-8 h-8 animate-spin" />
        INITIALIZING SATELLITE LINK...
      </div>
    </div>
  ),
});

export default function GeofenceSimulation() {
  const [loading, setLoading] = useState(true);
  const [deviceId, setDeviceId] = useState("UNKNOWN");
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [manualRadius, setManualRadius] = useState("");

  const { state, config, updateLocation, setGeofenceConfig } = useLocationTracker({
    center: { lat: 0, lng: 0 },
    radius: 500,
  });

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch("/api/geofence-status");
        if (res.ok) {
          const json = await res.json();
          const { geofence, device } = json.data;
          
          setDeviceId(device.id);
          
          const initialConfig: GeofenceConfig = {
            center: { lat: geofence.center[0], lng: geofence.center[1] },
            radius: geofence.radiusMeters,
          };
          setGeofenceConfig(initialConfig);
          // Set initial device pos
          updateLocation(device.initialPosition[0], device.initialPosition[1]);
        }
      } catch (e) {
        console.error("Failed to fetch geofence config", e);
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManualOverride = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (manualLat && manualLng) {
      const lat = parseFloat(manualLat);
      const lng = parseFloat(manualLng);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        updateLocation(lat, lng);
      }
    }

    if (manualRadius) {
      const radius = parseFloat(manualRadius);
      if (!isNaN(radius) && radius > 0) {
        setGeofenceConfig({ ...config, radius });
      }
    }
  };

  if (loading || !state.currentLocation) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center relative">
         <div className="absolute inset-0 bg-grid-black dark:bg-grid-white opacity-5 pointer-events-none"></div>
         <div className="flex flex-col items-center gap-4 border border-black/10 dark:border-white/10 p-8 bg-white/50 dark:bg-black/50 backdrop-blur-sm relative z-10">
           <Loader2 className="w-8 h-8 text-black dark:text-white animate-spin" />
           <p className="text-gray-600 dark:text-gray-400 font-mono tracking-[0.3em] uppercase text-xs">BOOT SEQUENCE INITIATED...</p>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-black dark:bg-grid-white opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="mb-12 border-b border-black/10 dark:border-white/10 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-blue-500/[0.05] border border-blue-500/30 text-blue-600 dark:text-blue-400 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-6">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 bg-blue-500"></span>
                </span>
                LINK ESTABLISHED // {deviceId}
              </div>
              <h1 className="text-4xl md:text-5xl font-mono font-black uppercase text-black dark:text-white tracking-tighter">Geofence Terminal</h1>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 font-mono tracking-widest uppercase mb-1">Live Telemetry Feed</p>
              <div className="flex items-center gap-2 justify-end text-sm text-gray-600 dark:text-gray-400 font-mono">
                <Server className="w-4 h-4 text-emerald-500" /> SERVER: CONNECTED
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 p-px">
          {/* Map Area */}
          <div className="lg:col-span-8 h-[600px] order-2 lg:order-1 relative bg-gray-50 dark:bg-[#0a0a0a]">
            {/* HUD Map Overlays */}
            <div className="absolute top-4 left-4 z-[400] pointer-events-none">
              <div className="text-[10px] font-mono text-black/50 dark:text-white/50 tracking-[0.2em] bg-white/60 dark:bg-black/60 px-2 py-1 border border-black/10 dark:border-white/10 backdrop-blur-md">
                POS: {state.currentLocation.lat.toFixed(5)}, {state.currentLocation.lng.toFixed(5)}
              </div>
            </div>
            
            <Map 
              config={config} 
              locationState={state}
            />
          </div>

          {/* Controls & Status Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-px order-1 lg:order-2 bg-transparent">
            {/* Location Monitor Component */}
            <LocationMonitor state={state} />

            {/* Simulation Controls */}
            <div className="bg-gray-50 dark:bg-[#0a0a0a] p-8 flex-grow flex flex-col border-b border-transparent">
              <div className="flex items-center gap-3 mb-8 border-b border-black/10 dark:border-white/10 pb-4">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <h3 className="text-sm font-mono font-bold text-black dark:text-white uppercase tracking-widest">Manual Override</h3>
              </div>
              
              <div className="flex-grow flex flex-col justify-center items-center">
                <form onSubmit={handleManualOverride} className="w-full max-w-[240px] flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Latitude</label>
                    <input 
                      type="text" 
                      value={manualLat}
                      onChange={(e) => setManualLat(e.target.value)}
                      placeholder={state.currentLocation.lat.toFixed(5)}
                      className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 text-black dark:text-white font-mono text-xs p-3 w-full focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Longitude</label>
                    <input 
                      type="text" 
                      value={manualLng}
                      onChange={(e) => setManualLng(e.target.value)}
                      placeholder={state.currentLocation.lng.toFixed(5)}
                      className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 text-black dark:text-white font-mono text-xs p-3 w-full focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">Radius (Meters)</label>
                    <input 
                      type="text" 
                      value={manualRadius}
                      onChange={(e) => setManualRadius(e.target.value)}
                      placeholder={config.radius.toString()}
                      className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 text-black dark:text-white font-mono text-xs p-3 w-full focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-700"
                    />
                  </div>
                  <div className="flex gap-2 w-full mt-2">
                    <button 
                      type="submit"
                      className="flex-1 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 text-black dark:text-white p-3 flex items-center justify-center transition-all text-[10px] font-mono font-black tracking-widest uppercase"
                    >
                      OVERRIDE
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        updateLocation(config.center.lat, config.center.lng);
                        setGeofenceConfig({ ...config, radius: 500 });
                        setManualLat("");
                        setManualLng("");
                        setManualRadius("");
                      }} 
                      className="flex-none w-12 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 hover:border-rose-500/50 text-gray-600 dark:text-gray-400 hover:text-rose-500 p-3 flex items-center justify-center transition-all text-[10px] font-mono font-black tracking-widest uppercase"
                      title="Reset to Init"
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
                          const lat = position.coords.latitude;
                          const lng = position.coords.longitude;
                          setGeofenceConfig({ ...config, center: { lat, lng }});
                          updateLocation(lat, lng);
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
