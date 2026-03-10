import { Cpu, Compass, Navigation2, Code2, Database, LayoutTemplate, Network } from "lucide-react";

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-[#050505] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">Technology & Sensors</h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            A comprehensive breakdown of the hardware components and software engineering stack powering the Geofencing and GPS Spoofing Detection dashboard.
          </p>
        </header>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Hardware Sensors (Edge Devices)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HardwareCard 
              icon={<Navigation2 className="w-8 h-8 text-blue-400" />}
              title="GPS Receiver"
              model="U-blox NEO-M8N"
              description="Provides raw global navigation satellite system (GNSS) data including latitude, longitude, and altitude geometry."
            />
            <HardwareCard 
              icon={<Compass className="w-8 h-8 text-emerald-400" />}
              title="Inertial Measurement Unit"
              model="MPU-6050"
              description="A 6-axis motion tracking device combining a 3-axis gyroscope and a 3-axis accelerometer to track vehicle kinematics."
            />
            <HardwareCard 
              icon={<Cpu className="w-8 h-8 text-amber-400" />}
              title="Microcontroller"
              model="ESP32 / Raspberry Pi"
              description="Processes initial sensor telemetry locally before pushing payloads over WebSocket/HTTP to the cloud ingestion layer."
            />
          </div>
        </div>

        <div>
           <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4">Software Architecture</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <SoftwareCard
               icon={<LayoutTemplate className="w-6 h-6 text-cyan-400" />}
               title="Frontend Interface"
               tech="Next.js 14 + React"
               description="High-performance client-side dashboard with server-side rendering for optimal load times and SEO."
             />
             <SoftwareCard
               icon={<Code2 className="w-6 h-6 text-purple-400" />}
               title="Styling & Animation"
               tech="Tailwind CSS + Framer"
               description="Utility-first CSS framework enabling rapid UI development paired with Framer Motion for fluid micro-interactions."
             />
             <SoftwareCard
               icon={<Network className="w-6 h-6 text-rose-400" />}
               title="Mapping Engine"
               tech="Leaflet.js"
               description="Open-source interactive mapping library utilized for drawing robust geofence polygons and real-time tracking points."
             />
             <SoftwareCard
               icon={<Database className="w-6 h-6 text-emerald-400" />}
               title="Backend & Storage"
               tech="Node.js + MongoDB"
               description="Event-driven backend environment managing API endpoints alongside a NoSQL database for flexible telemetry logging."
             />
           </div>
        </div>
      </div>
    </div>
  );
}

function HardwareCard({ icon, title, model, description }: { icon: React.ReactNode, title: string, model: string, description: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-colors">
      <div className="bg-[#0a0a0a] w-16 h-16 rounded-xl border border-white/5 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-xs font-mono text-gray-500 mb-4 uppercase tracking-wider">{model}</p>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function SoftwareCard({ icon, title, tech, description }: { icon: React.ReactNode, title: string, tech: string, description: string }) {
  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-bold text-gray-200">{title}</h3>
      </div>
      <p className="text-xs font-bold text-blue-400 mb-3 uppercase tracking-wider">{tech}</p>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
