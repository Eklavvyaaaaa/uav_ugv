import { Server, Smartphone, ShieldAlert, Cpu, Database, CloudRain, BellRing } from "lucide-react";

export default function SystemArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#050505] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">System Architecture</h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            A secure, scalable architecture designed for real-time data ingestion, processing, and anomaly detection. Explore the data workflow from the edge device back to the monitoring dashboard.
          </p>
        </header>

        {/* Visual Workflow Diagram */}
        <div className="relative py-12 max-w-4xl mx-auto">
          {/* Connection Lines (Desktop) */}
          <div className="hidden md:block absolute top-[120px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-emerald-500/50 z-0"></div>

          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8">
            <ArchitectureNode 
              icon={<Smartphone className="w-8 h-8 text-blue-400" />}
              title="Edge Device (UAV/UGV)"
              description="Collects GPS & IMU telemetry"
              color="blue"
            />
            <ArchitectureNode 
              icon={<Server className="w-8 h-8 text-purple-400" />}
              title="Processing Engine"
              description="Geofence bounds & verification"
              color="purple"
            />
            <ArchitectureNode 
              icon={<ShieldAlert className="w-8 h-8 text-emerald-400" />}
              title="Response System"
              description="Alert generation & logging"
              color="emerald"
            />
          </div>
        </div>

        {/* Detailed Module Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
          <ModuleDetails
            icon={<Cpu className="w-6 h-6 text-indigo-400" />}
            title="Telemetry Ingestion"
            content="Devices stream their precise location (Latitude, Longitude, Altitude) alongside IMU data to the Node.js backend via WebSockets or HTTP POST requests at a high frequency (e.g., 10Hz)."
          />
          <ModuleDetails
            icon={<CloudRain className="w-6 h-6 text-cyan-400" />}
            title="Geofence Processing API"
            content="The backend calculates the Haversine distance between the incoming coordinates and the predefined boundary vertices. Polygons are evaluated using the Ray-Casting algorithm to determine containment."
          />
          <ModuleDetails
            icon={<ShieldAlert className="w-6 h-6 text-rose-400" />}
            title="Spoofing Detection Matrix"
            content="Simultaneously, the ingestion layer compares the distance covered against the time elapsed. If velocity > MAX_VEHICLE_SPEED, or if GPS shows displacement without corresponding IMU acceleration, a spoofing flag is raised."
          />
          <ModuleDetails
            icon={<BellRing className="w-6 h-6 text-amber-400" />}
            title="Alert Generation"
            content="Any anomalies immediately trigger a 'Breach' or 'Spoof' event, pushed to the React dashboard via WebSockets for instantaneous operational awareness and automated fail-safes."
          />
          <div className="md:col-span-2">
            <ModuleDetails
              icon={<Database className="w-6 h-6 text-emerald-400" />}
              title="Secure Database Logging"
              content="All states, normal or anomalous, are durably stored in a MongoDB cluster. This ensures full auditability of the mission profile, allowing for post-flight analysis of breach points and spoofing vectors."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureNode({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: 'blue' | 'purple' | 'emerald' }) {
  const getColors = () => {
    switch(color) {
      case 'blue': return "bg-blue-500/10 border-blue-500/20";
      case 'purple': return "bg-purple-500/10 border-purple-500/20";
      case 'emerald': return "bg-emerald-500/10 border-emerald-500/20";
    }
  };

  return (
    <div className={`p-6 rounded-2xl border flex-1 text-center bg-[#0a0a0a] backdrop-blur-sm shadow-xl ${getColors()}`}>
      <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${getColors()}`}>
        {icon}
      </div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

function ModuleDetails({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/[0.07] transition-colors">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-400 leading-relaxed text-sm">
        {content}
      </p>
    </div>
  );
}
