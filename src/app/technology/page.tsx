import { Cpu, Compass, Navigation2, Code2, Database, LayoutTemplate, Network, Box, Terminal } from "lucide-react";

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-[#050505] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[1px] h-full bg-gradient-to-t from-transparent via-blue-500/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="mb-20 border-b border-white/10 pb-10">
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-emerald-500/[0.05] border border-emerald-500/30 text-emerald-500 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-6">
            <Terminal className="w-3.5 h-3.5" />
            ENGINEERING.SPEC // STACK.V1
          </div>
          <h1 className="text-4xl md:text-5xl font-mono font-black uppercase text-white tracking-tighter mb-4">Technology & Sensors</h1>
          <p className="text-sm text-gray-400 max-w-3xl font-mono uppercase tracking-widest leading-relaxed">
            A comprehensive breakdown of the hardware components and software engineering stack powering the Geofencing and GPS Spoofing Detection dashboard.
          </p>
        </header>

        <div className="mb-24">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <h2 className="text-sm font-mono font-bold text-white uppercase tracking-[0.3em]">Hardware Sensors // Edge</h2>
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Status: Ready</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 p-px">
            <HardwareCard 
              icon={<Navigation2 className="w-5 h-5 text-blue-400" />}
              title="GPS Receiver"
              model="U-blox NEO-M8N"
              description="Provides raw GNSS data including latitude, longitude, and altitude geometry."
            />
            <HardwareCard 
              icon={<Compass className="w-5 h-5 text-emerald-400" />}
              title="Inertial Unit"
              model="MPU-6050"
              description="6-axis motion tracking combining gyroscope and accelerometer for vehicle kinematics."
            />
            <HardwareCard 
              icon={<Cpu className="w-5 h-5 text-amber-400" />}
              title="Controller"
              model="ESP32 / Pi"
              description="Processes sensor telemetry locally before pushing payloads to the cloud ingestion layer."
            />
          </div>
        </div>

        <div>
           <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
             <h2 className="text-sm font-mono font-bold text-white uppercase tracking-[0.3em]">Software Stack // Deployment</h2>
             <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Stack: Next14/Node/Mongo</div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 p-px">
             <SoftwareCard
               icon={<LayoutTemplate className="w-4 h-4 text-cyan-400" />}
               title="Frontend"
               tech="Next.js 14 + React"
               description="High-performance client dashboard with SSR for optimal load times."
             />
             <SoftwareCard
               icon={<Code2 className="w-4 h-4 text-purple-400" />}
               title="Styling"
               tech="Tailwind + Framer"
               description="Utility-first CSS enabling rapid UI with fluid micro-interactions."
             />
             <SoftwareCard
               icon={<Network className="w-4 h-4 text-rose-400" />}
               title="Map Engine"
               tech="Leaflet.js"
               description="Mapping library for robust geofence polygons and real-time tracking."
             />
             <SoftwareCard
               icon={<Database className="w-4 h-4 text-emerald-400" />}
               title="Backend"
               tech="Node.js + MongoDB"
               description="Event-driven environment managing API endpoints and telemetry logging."
             />
           </div>
        </div>
      </div>
    </div>
  );
}

function HardwareCard({ icon, title, model, description }: { icon: React.ReactNode, title: string, model: string, description: string }) {
  return (
    <div className="bg-[#0a0a0a] p-8 group hover:bg-white/[0.02] transition-colors relative h-full">
      <div className="w-12 h-12 border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/30 transition-colors">
        {icon}
      </div>
      <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-2">{title}</h3>
      <div className="text-[10px] font-mono text-blue-500 border border-blue-500/20 px-2 py-0.5 w-fit bg-blue-500/5 mb-4 uppercase tracking-[0.2em]">{model}</div>
      <p className="text-xs text-gray-500 leading-relaxed font-sans">{description}</p>
    </div>
  );
}

function SoftwareCard({ icon, title, tech, description }: { icon: React.ReactNode, title: string, tech: string, description: string }) {
  return (
    <div className="bg-[#050505] p-6 hover:bg-white/[0.02] transition-colors h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
        {icon}
        <h3 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-widest">{title}</h3>
      </div>
      <p className="text-[10px] font-mono font-bold text-emerald-500 mb-4 uppercase tracking-widest">{tech}</p>
      <p className="text-[10px] text-gray-500 font-sans leading-relaxed">{description}</p>
    </div>
  );
}
