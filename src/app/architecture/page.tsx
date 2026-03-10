import { Server, Smartphone, ShieldAlert, Cpu, Database, BellRing, Target, Crosshair } from "lucide-react";

export default function SystemArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#050505] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="mb-20 border-b border-white/10 pb-10">
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-blue-500/[0.05] border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-6">
            <Target className="w-3.5 h-3.5" />
            SYSTEM.TOPOLOGY.MAP // v2.0
          </div>
          <h1 className="text-4xl md:text-5xl font-mono font-black uppercase text-white tracking-tighter mb-4">Architecture Design</h1>
          <p className="text-sm text-gray-400 max-w-3xl font-mono uppercase tracking-widest leading-relaxed">
            A secure, scalable architecture designed for real-time data ingestion, processing, and anomaly detection. Explore the data workflow from the edge device back to the monitoring dashboard.
          </p>
        </header>

        {/* Visual Workflow Diagram */}
        <div className="relative py-12 max-w-5xl mx-auto mb-20">
          {/* Connection Lines (Desktop) */}
          <div className="hidden md:block absolute top-[120px] left-[10%] right-[10%] h-[1px] bg-white/10 z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-emerald-500/50 opacity-20" />
          </div>

          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-px bg-white/10 border border-white/10 p-px">
            <ArchitectureNode 
              icon={<Smartphone className="w-6 h-6 text-white" />}
              title="Edge Device (UAV/UGV)"
              description="Collects GPS & IMU telemetry"
              metric="SENS.LINK: OK"
              accent="text-blue-500"
            />
            <ArchitectureNode 
              icon={<Server className="w-6 h-6 text-white" />}
              title="Processing Engine"
              description="Geofence bounds & verification"
              metric="CORE.CALC: ACTIVE"
              accent="text-purple-500"
            />
            <ArchitectureNode 
              icon={<ShieldAlert className="w-6 h-6 text-white" />}
              title="Response System"
              description="Alert generation & logging"
              metric="THREAT.MON: 0"
              accent="text-emerald-500"
            />
          </div>
        </div>

        {/* Detailed Module Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 p-px">
          <ModuleDetails
            icon={<Cpu className="w-5 h-5 text-blue-400" />}
            title="Telemetry Ingestion"
            content="Devices stream their precise location (Latitude, Longitude, Altitude) alongside IMU data to the Node.js backend via WebSockets or HTTP POST requests at high frequency."
          />
          <ModuleDetails
            icon={<Crosshair className="w-5 h-5 text-purple-400" />}
            title="Geofence API"
            content="The backend calculates Haversine distance and vertex containment using Ray-Casting algorithms to determine precise spatial compliance."
          />
          <ModuleDetails
            icon={<ShieldAlert className="w-5 h-5 text-rose-400" />}
            title="Anomaly Matrix"
            content="Simultaneously compares positional delta against physical flight envelopes. Rejects GPS jumps without corresponding IMU acceleration."
          />
          <ModuleDetails
            icon={<BellRing className="w-5 h-5 text-amber-400" />}
            title="Live Alerts"
            content="Anomalies immediately trigger a 'Breach' or 'Spoof' event, pushed to the dashboard via WebSockets for instantaneous awareness."
          />
          <div className="md:col-span-2">
            <ModuleDetails
              icon={<Database className="w-5 h-5 text-emerald-400" />}
              title="Persistence Layer"
              content="All states are durably stored in a MongoDB cluster. This ensures full auditability of the mission profile, allowing for post-flight forensic analysis."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureNode({ icon, title, description, metric, accent }: { icon: React.ReactNode, title: string, description: string, metric: string, accent: string }) {
  return (
    <div className={`p-10 flex-1 text-center bg-[#0a0a0a] group hover:bg-white/[0.02] transition-colors relative overflow-hidden`}>
      <div className={`mx-auto w-14 h-14 border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/30 transition-colors`}>
        {icon}
      </div>
      <h3 className="font-mono font-bold text-white uppercase tracking-tight mb-2">{title}</h3>
      <p className="text-xs text-gray-500 font-sans leading-relaxed mb-6">{description}</p>
      <div className="pt-4 border-t border-white/5">
        <span className={`text-[10px] font-mono tracking-[0.2em] font-bold ${accent}`}>{metric}</span>
      </div>
    </div>
  );
}

function ModuleDetails({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="bg-[#0a0a0a] p-8 hover:bg-white/[0.02] transition-colors h-full flex flex-col justify-start">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-2 border border-white/10">
          {icon}
        </div>
        <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">{title}</h3>
      </div>
      <p className="text-xs text-gray-400 font-sans leading-relaxed">
        {content}
      </p>
    </div>
  );
}
