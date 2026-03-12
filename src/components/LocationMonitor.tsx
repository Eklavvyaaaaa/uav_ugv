import { ShieldCheck, ShieldAlert, Activity, Navigation, Radio, AlertTriangle } from "lucide-react";
import { LocationState } from "../types/Location";

export function LocationMonitor({ state }: { state: LocationState }) {
  const { geofenceStatus, spoofingStatus, currentLocation, speed, distanceFromCenter } = state;

  const isGeofenceSafe = geofenceStatus === 'INSIDE';

  return (
    <div className="flex flex-col gap-4">
      {/* Geofence Status Panel */}
      <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-500 relative overflow-hidden group border-b border-black/5 dark:border-white/10">
        <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${isGeofenceSafe ? "bg-emerald-500" : "bg-rose-500"}`} />
        <div className="flex items-center gap-6 relative z-10">
          <div className={`p-4 border ${isGeofenceSafe ? "border-emerald-500/30 text-emerald-500 bg-emerald-500/5" : "border-rose-500/50 text-rose-500 bg-rose-500/10"} transition-colors`}>
            {isGeofenceSafe ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6 animate-pulse" />}
          </div>
          <div>
            <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.3em] mb-1">Perimeter Status</h3>
            <p className={`font-mono font-bold text-lg uppercase tracking-wider ${isGeofenceSafe ? "text-emerald-500" : "text-rose-500"}`}>
              {geofenceStatus}
            </p>
          </div>
        </div>
      </div>

      {/* Spoofing Status Panel */}
      <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-500 relative overflow-hidden group border-b border-black/5 dark:border-white/10">
        <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${
          spoofingStatus === 'SAFE' ? "bg-blue-500" : 
          spoofingStatus === 'SUSPICIOUS' ? "bg-amber-500" : "bg-rose-600"
        }`} />
        <div className="flex items-center gap-6 relative z-10">
          <div className={`p-4 border transition-colors ${
            spoofingStatus === 'SAFE' ? "border-blue-500/30 text-blue-500 bg-blue-500/5" : 
            spoofingStatus === 'SUSPICIOUS' ? "border-amber-500/50 text-amber-500 bg-amber-500/10" : 
            "border-rose-600/50 text-rose-600 bg-rose-600/10"
          }`}>
            {spoofingStatus === 'SAFE' ? <Radio className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6 animate-pulse" />}
          </div>
          <div>
            <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.3em] mb-1">Sensor Integrity</h3>
            <p className={`font-mono font-bold text-lg uppercase tracking-wider ${
               spoofingStatus === 'SAFE' ? "text-blue-500" : 
               spoofingStatus === 'SUSPICIOUS' ? "text-amber-500" : "text-rose-600"
            }`}>
              {spoofingStatus}
            </p>
          </div>
        </div>
      </div>

      {/* Live Telemetry Data */}
      <div className="p-6 bg-gray-50 dark:bg-[#0a0a0a] border-b border-black/5 dark:border-white/10">
        <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
          <Activity className="w-3 h-3" /> Live Telemetry
        </h3>
        
        <div className="grid grid-cols-2 gap-4 gap-y-6">
          <div className="col-span-2">
            <p className="text-[10px] text-gray-500 dark:text-gray-600 font-mono tracking-widest uppercase mb-1">Coordinates</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-mono flex items-center gap-2">
              <Navigation className="w-3 h-3 text-emerald-500" />
              {currentLocation ? `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}` : 'AWAITING SIGNAL'}
            </p>
          </div>
          
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-600 font-mono tracking-widest uppercase mb-1">Distance (Center)</p>
            <p className="text-sm text-black dark:text-white font-mono">
              {distanceFromCenter.toFixed(1)} <span className="text-gray-500 text-xs">m</span>
            </p>
          </div>
          
          <div>
            <p className="text-[10px] text-gray-500 dark:text-gray-600 font-mono tracking-widest uppercase mb-1">Velocity</p>
            <p className={`text-sm font-mono ${speed > 60 ? "text-rose-500 dark:text-rose-400" : "text-black dark:text-white"}`}>
              {speed.toFixed(1)} <span className="text-gray-500 text-xs">m/s</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
