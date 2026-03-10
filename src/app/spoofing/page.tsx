"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Activity, MapPin, FastForward, CheckCircle2, XCircle, Loader2, Radar, ShieldCheck } from "lucide-react";

interface LogEntry {
  id: number;
  time: string;
  lat: string;
  lng: string;
  speed: string;
  status: string;
  altitude: string;
}

export default function SpoofingDetectionPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch("/api/spoofing-logs");
        if (res.ok) {
          const json = await res.json();
          setLogs(json.data);
        }
      } catch (e) {
        console.error("Failed to fetch logs", e);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
    
    // Simulate real-time polling every 5 seconds
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading && logs.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center relative">
         <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none"></div>
         <div className="flex flex-col items-center gap-4 bg-black/50 p-8 border border-white/10 relative z-10 backdrop-blur-sm">
           <Radar className="w-12 h-12 text-blue-500 animate-spin" />
           <p className="text-gray-400 animate-pulse font-mono tracking-[0.3em] text-xs text-center uppercase">
             CONNECTING TO TELEMETRY STREAM...<br/><span className="text-[10px] text-gray-600">ESTABLISHING SECURE HANDSHAKE</span>
           </p>
         </div>
      </div>
    );
  }

  const spoofCount = logs.filter(l => l.status === "spoofed").length;

  return (
    <div className="min-h-screen bg-[#050505] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="mb-16 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-amber-500/[0.05] border border-amber-500/30 text-amber-500 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-6">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            LIVE TELEMETRY ANALYSIS
          </div>
          <h1 className="text-4xl md:text-5xl font-mono font-black uppercase text-white mb-4 tracking-tighter">Kinematic Anomaly Detection</h1>
          <p className="text-sm text-gray-400 max-w-3xl font-mono uppercase tracking-widest leading-relaxed">
            Real-time algorithmic verification of geographic coordinates. The system analyzes kinematic feasibility and sensor fusion constraints to discard counterfeit GPS signals.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-px border border-white/10 bg-white/10 p-px">
          {/* Analysis Engine Details */}
          <div className="xl:col-span-4 bg-[#050505] flex flex-col gap-px h-[600px]">
            <div className={`p-8 bg-[#0a0a0a] relative overflow-hidden group transition-colors duration-500 border-b border-transparent flex-1 flex flex-col justify-center ${spoofCount > 0 ? "border-rose-500/50" : ""}`}>
              {spoofCount > 0 && (
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <AlertTriangle className="w-48 h-48 text-rose-500" />
                </div>
              )}
              <h2 className="text-lg font-mono font-bold uppercase tracking-tight text-white mb-8 relative z-10 flex items-center gap-3">
                <span className="p-2 border border-white/10 text-white bg-white/5">
                  <Activity className="w-5 h-5" />
                </span>
                Detection Engine
              </h2>
              
              <div className="space-y-4 relative z-10">
                <div className="bg-white/[0.02] p-4 border border-white/5 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Kinematic Envelope</span>
                    <span className="text-[10px] font-mono tracking-widest text-emerald-500 border border-emerald-500/30 px-2 py-0.5 bg-emerald-500/5">ACTIVE</span>
                  </div>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">Cross-references positional delta over time (Δp/Δt) against the physical flight envelope of the airframe (V_max).</p>
                </div>
                
                <div className="bg-white/[0.02] p-4 border border-white/5 hover:border-white/20 transition-colors">
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">Sensor Fusion</span>
                    <span className="text-[10px] font-mono tracking-widest text-emerald-500 border border-emerald-500/30 px-2 py-0.5 bg-emerald-500/5">ACTIVE</span>
                  </div>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">Correlates GNSS displacement vectors with high-frequency IMU absolute acceleration integers. Rejects GPS jumps without corresponding G-force events.</p>
                </div>
              </div>
            </div>

            {spoofCount > 0 ? (
              <div className="bg-[#0a0a0a] border-t border-rose-500/30 p-8 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500" />
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-5 h-5 text-rose-500 animate-pulse" />
                  <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-rose-500">Threat Detected</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest border-b border-white/5 pb-2">
                    <span className="text-gray-500">Anomalous Events</span>
                    <span className="text-rose-500 font-bold">{spoofCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest border-b border-white/5 pb-2">
                    <span className="text-gray-500">Action Taken</span>
                    <span className="text-white">PACKETS DISCARDED</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest">
                    <span className="text-gray-500">System Lock</span>
                    <span className="text-emerald-500">MAINTAINED</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#0a0a0a] border-t border-emerald-500/30 p-8 relative overflow-hidden flex flex-col justify-center items-center">
                 <ShieldCheck className="w-8 h-8 text-emerald-500/50 mb-4" />
                 <p className="text-[10px] font-mono text-emerald-500 tracking-[0.2em] uppercase text-center border border-emerald-500/20 px-4 py-2 bg-emerald-500/5">NOMINAL KINEMATICS<br/>NO THREATS DETECTED</p>
              </div>
            )}
          </div>

          {/* Simulated Logs Table */}
          <div className="xl:col-span-8 bg-[#0a0a0a] flex flex-col h-[600px] overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="p-2 border border-white/10">
                   <MapPin className="w-4 h-4 text-gray-400" />
                 </div>
                 <div>
                   <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-white">Ingestion Buffer</h2>
                   <p className="text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase mt-1">UAV-ALPHA-01 // GPS-TRK // PORT:8080</p>
                 </div>
               </div>
               <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 border border-emerald-500/20 cursor-default">
                 <span className="relative flex h-1.5 w-1.5">
                   <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex h-1.5 w-1.5 bg-emerald-500"></span>
                 </span>
                 <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest whitespace-nowrap">LINK SECURE</span>
               </div>
            </div>
            
            <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-[#111] text-gray-500 font-mono font-bold uppercase tracking-widest border-b border-white/5 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4">T-Stamp</th>
                    <th className="px-6 py-4">Latitude</th>
                    <th className="px-6 py-4">Longitude</th>
                    <th className="px-6 py-4">Alt / vCalc</th>
                    <th className="px-6 py-4 text-right">Integrity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono tracking-wider">
                  {logs.map((log) => {
                    const isSpoofed = log.status === "spoofed";
                    return (
                      <tr key={log.id} className={`transition-colors hover:bg-white/[0.04] ${isSpoofed ? "bg-rose-500/[0.05]" : ""}`}>
                        <td className="px-6 py-4 text-gray-500">{log.time}</td>
                        <td className={`px-6 py-4 ${isSpoofed ? "text-rose-500 font-bold" : "text-gray-300"}`}>{log.lat}</td>
                        <td className={`px-6 py-4 ${isSpoofed ? "text-rose-500 font-bold" : "text-gray-300"}`}>{log.lng}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-gray-500 text-[10px]">{log.altitude} MSL</span>
                            <span className={isSpoofed ? "text-amber-500 font-bold" : "text-blue-400"}>{log.speed}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {isSpoofed ? (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[10px] font-bold uppercase tracking-widest">
                              <XCircle className="w-3.5 h-3.5" /> REJECT
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 text-[10px] uppercase tracking-widest">
                              <CheckCircle2 className="w-3.5 h-3.5" /> VALID
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
