"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Activity, MapPin, FastForward, CheckCircle2, XCircle, Loader2, Radar } from "lucide-react";

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
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
           <Radar className="w-12 h-12 text-purple-500 animate-spin" />
           <p className="text-gray-400 animate-pulse font-mono tracking-widest text-sm text-center">
             CONNECTING TO TELEMETRY STREAM...<br/><span className="text-xs text-gray-600">ESTABLISHING SECURE HANDSHAKE</span>
           </p>
         </div>
      </div>
    );
  }

  const spoofCount = logs.filter(l => l.status === "spoofed").length;

  return (
    <div className="min-h-screen bg-[#050505] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
            <Activity className="w-3 h-3 animate-pulse" />
            LIVE TELEMETRY ANALYSIS
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">GPS Anomaly Detection</h1>
          <p className="text-gray-400 max-w-3xl text-lg">
            Real-time algorithmic verification of geographic coordinates. The system analyzes kinematic feasibility and sensor fusion constraints to discard counterfeit GPS signals.
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Analysis Engine Details */}
          <div className="xl:col-span-4 space-y-6">
            <div className={`p-8 rounded-2xl relative overflow-hidden group transition-colors duration-500 border ${spoofCount > 0 ? "bg-rose-500/5 border-rose-500/20" : "bg-white/5 border-white/10"}`}>
              {spoofCount > 0 && (
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <AlertTriangle className="w-32 h-32 text-rose-500" />
                </div>
              )}
              <h2 className="text-xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
                <span className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <Activity className="w-5 h-5" />
                </span>
                Detection Engine
              </h2>
              
              <div className="space-y-6 relative z-10">
                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-300">Kinematic Envelope</span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">ACTIVE</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">Cross-references positional delta over time (Δp/Δt) against the physical flight envelope of the airframe (V_max).</p>
                </div>
                
                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-300">Sensor Fusion</span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">ACTIVE</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">Correlates GNSS displacement vectors with high-frequency IMU absolute acceleration integers. Rejects GPS jumps without corresponding G-force events.</p>
                </div>
              </div>
            </div>

            {spoofCount > 0 && (
              <div className="bg-gradient-to-br from-rose-500/10 to-[#0a0a0a] border border-rose-500/30 p-6 rounded-2xl shadow-[0_0_30px_-10px_rgba(244,63,94,0.2)]">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-rose-500" />
                  <h3 className="text-lg font-bold text-rose-400">Threat Detected</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm border-b border-rose-500/10 pb-2">
                    <span className="text-gray-400">Anomalous Events</span>
                    <span className="font-mono font-bold text-white">{spoofCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-rose-500/10 pb-2">
                    <span className="text-gray-400">Action Taken</span>
                    <span className="font-mono text-emerald-400">PACKETS DISCARDED</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">System Lock</span>
                    <span className="font-mono text-emerald-400">MAINTAINED</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Simulated Logs Table */}
          <div className="xl:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-white/5 rounded-lg">
                   <MapPin className="w-5 h-5 text-gray-400" />
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-white">Ingestion Buffer</h2>
                   <p className="text-xs text-gray-500 font-mono mt-1">UAV-ALPHA-01 // GPS-TRK // PORT:8080</p>
                 </div>
               </div>
               <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 cursor-default">
                 <span className="relative flex h-2 w-2">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </span>
                 <span className="text-xs font-mono text-emerald-400 font-bold overflow-hidden tracking-widest whitespace-nowrap">LINK SECURE</span>
               </div>
            </div>
            
            <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#111] text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-white/5 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4">T-Stamp</th>
                    <th className="px-6 py-4">Latitude</th>
                    <th className="px-6 py-4">Longitude</th>
                    <th className="px-6 py-4">Alt / vCalc</th>
                    <th className="px-6 py-4 text-right">Integrity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {logs.map((log) => {
                    const isSpoofed = log.status === "spoofed";
                    return (
                      <tr key={log.id} className={`transition-colors hover:bg-white/[0.02] ${isSpoofed ? "bg-rose-500/[0.03]" : ""}`}>
                        <td className="px-6 py-4 text-gray-500">{log.time}</td>
                        <td className={`px-6 py-4 ${isSpoofed ? "text-rose-400 font-bold" : "text-gray-300"}`}>{log.lat}</td>
                        <td className={`px-6 py-4 ${isSpoofed ? "text-rose-400 font-bold" : "text-gray-300"}`}>{log.lng}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-gray-400 text-xs mb-1">{log.altitude} MSL</span>
                            <span className={isSpoofed ? "text-amber-400 font-bold" : "text-blue-400"}>{log.speed}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          {isSpoofed ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_-5px_rgba(244,63,94,0.4)]">
                              <XCircle className="w-4 h-4" /> Reject
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs font-medium uppercase tracking-wider">
                              <CheckCircle2 className="w-4 h-4" /> Valid
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
