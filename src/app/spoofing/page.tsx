import { AlertTriangle, Activity, MapPin, FastForward, CheckCircle2, XCircle } from "lucide-react";

export default function SpoofingDetectionPage() {
  const mockLogs = [
    { time: "10:23:01", lat: "28.6139", lng: "77.2090", speed: "12 km/h", status: "normal" },
    { time: "10:23:05", lat: "28.6141", lng: "77.2092", speed: "15 km/h", status: "normal" },
    { time: "10:23:10", lat: "28.6145", lng: "77.2095", speed: "18 km/h", status: "normal" },
    { time: "10:23:11", lat: "19.0760", lng: "72.8777", speed: "8,500 km/h", status: "spoofed" },
    { time: "10:23:15", lat: "19.0762", lng: "72.8779", speed: "14 km/h", status: "spoofed" },
    { time: "10:24:00", lat: "28.6146", lng: "77.2096", speed: "12 km/h", status: "normal" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16">
          <h1 className="text-4xl font-extrabold text-white mb-4">GPS Spoofing Detection</h1>
          <p className="text-gray-400 max-w-3xl text-lg">
            GPS spoofing is a cyberattack where malicious actors broadcast counterfeit GPS signals, tricking a receiver into calculating a false location. Our system algorithmically detects these anomalies to ensure location authenticity.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Detection Scenario & Logic */}
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <AlertTriangle className="w-32 h-32 text-rose-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 relative z-10 flex items-center gap-3">
                <Activity className="text-blue-400" />
                Detection Mechanism
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6 relative z-10">
                The platform utilizes a combination of <span className="text-white font-medium">kinematic plausibility checks</span> and <span className="text-white font-medium">multi-sensor fusion</span> to detect spoofing attempts:
              </p>
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start gap-4">
                  <FastForward className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-200 block mb-1">Velocity Verification</strong>
                    <span className="text-sm text-gray-500">Calculates speed between consecutive GPS updates. If the calculated speed exceeds the physical limits of the vehicle (e.g., jumping 1000km in 1 second), a spoofing alert is raised.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Activity className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-200 block mb-1">IMU Cross-Validation</strong>
                    <span className="text-sm text-gray-500">Compares GPS-derived movement with onboard IMU (Accelerometer & Gyroscope) data. If GPS shows movement but IMU shows stationary state, the signal is flaged.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-rose-400 mb-2">Example Scenario</h3>
              <p className="text-sm text-gray-300">
                A drone flying in New Delhi (Lat: 28.61) suddenly reports its location as Mumbai (Lat: 19.07) just one second later. The calculated velocity of over 8,000 km/h is physically impossible for the drone, immediately triggering the anti-spoofing protocols and discarding the malicious coordinates.
              </p>
            </div>
          </div>

          {/* Simulated Logs Table */}
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                Live Location Telemetry
              </h2>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Logging Active</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-medium">Timestamp</th>
                    <th className="px-6 py-4 font-medium">Latitude</th>
                    <th className="px-6 py-4 font-medium">Longitude</th>
                    <th className="px-6 py-4 font-medium">Calc Speed</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {mockLogs.map((log, index) => {
                    const isSpoofed = log.status === "spoofed";
                    return (
                      <tr key={index} className={`transition-colors ${isSpoofed ? "bg-rose-500/10 border-l-[3px] border-l-rose-500" : "hover:bg-white/5 border-l-[3px] border-l-transparent"}`}>
                        <td className="px-6 py-4 text-gray-400">{log.time}</td>
                        <td className={`px-6 py-4 ${isSpoofed ? "text-rose-400" : "text-gray-300"}`}>{log.lat}</td>
                        <td className={`px-6 py-4 ${isSpoofed ? "text-rose-400" : "text-gray-300"}`}>{log.lng}</td>
                        <td className={`px-6 py-4 ${isSpoofed ? "text-rose-400 font-bold" : "text-gray-300"}`}>{log.speed}</td>
                        <td className="px-6 py-4">
                          {isSpoofed ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
                              <XCircle className="w-3.5 h-3.5" /> Spoofed
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium uppercase tracking-wider">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Valid
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
