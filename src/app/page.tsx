import Link from "next/link";
import { ShieldCheck, MapPin, Activity, Radio, Cpu, Database, ServerCrash, Crosshair, Target } from "lucide-react";
import ImageSequence from "@/components/ImageSequence";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full bg-[#050505]">
      {/* Scroll Sequence Hero */}
      <ImageSequence 
        frameCount={240} 
        imageFolder="/Photos" 
        imagePrefix="ezgif-frame-" 
        imageExtension=".jpg" 
      />

      {/* Product Overview */}
      <section className="w-full py-32 relative z-10 -mt-32 border-t border-white/[0.05] bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="flex flex-col md:flex-row gap-16 mb-24 items-end">
            <div className="flex-1">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/[0.03] border border-blue-500/20 text-blue-400 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-8">
                <Target className="w-3.5 h-3.5" />
                SYSTEM.INTEL.ARCHITECTURE // v2.0
              </div>
              <h2 className="text-4xl md:text-6xl font-mono font-black uppercase text-white tracking-tighter leading-[0.9]">
                Core Platform Capability
              </h2>
            </div>
            <div className="flex-1 pb-2">
              <p className="text-sm text-gray-400 font-mono tracking-wide leading-relaxed uppercase border-l border-blue-500/30 pl-6">
                The system is a comprehensive location security monitoring platform for Unmanned Systems. By combining precise polygon geofencing with advanced kinematic analysis, the system actively identifies spoofing vectors and zero-day topological anomalies.
              </p>
            </div>
          </div>

          {/* Asymmetric Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/[0.05] border border-white/[0.05] p-px">
            <div className="md:col-span-8 bg-[#0a0a0a]">
              <FeatureCard
                icon={<MapPin className="text-white w-6 h-6" />}
                title="Real-time Geofencing"
                description="Establish dynamic, polygonal or circular virtual perimeters to monitor device movement boundaries instantly."
                metric="LATENCY < 50ms"
                accent="group-hover:text-blue-400"
              />
            </div>
            <div className="md:col-span-4 bg-[#0a0a0a]">
              <FeatureCard
                icon={<ShieldCheck className="text-white w-6 h-6" />}
                title="Spoofing Detection"
                description="Algorithmic verification of GPS signals using multi-sensor fusion (IMU + GPS) to detect location manipulation."
                metric="FUSION SYNC: TRUE"
                accent="group-hover:text-amber-400"
              />
            </div>
            
            <div className="md:col-span-4 bg-[#0a0a0a]">
              <FeatureCard
                icon={<Activity className="text-white w-6 h-6" />}
                title="Trajectory Analysis"
                description="Analyze movement patterns and verify physical constraints (speed, acceleration) to identify simulated paths."
                metric="KINEMATIC CHECK"
                accent="group-hover:text-emerald-400"
              />
            </div>
            <div className="md:col-span-4 bg-[#0a0a0a]">
              <FeatureCard
                icon={<Database className="text-white w-6 h-6" />}
                title="Persistent Telemetry"
                description="Secure, immutable logging of all location data and system events via NoSQL database for post-mission audit."
                metric="DB: CONNECTED"
                accent="group-hover:text-purple-400"
              />
            </div>
            <div className="md:col-span-4 bg-[#0a0a0a]">
              <FeatureCard
                icon={<ServerCrash className="text-white w-6 h-6" />}
                title="Edge API Ready"
                description="Designed to integrate seamlessly with flight controllers via modular Node.js API endpoint ingestion."
                metric="NODE.JS: ACTIVE"
                accent="group-hover:text-rose-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Progress & Tech Stack Section */}
      <section className="w-full py-32 bg-[#050505] border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
              <Crosshair className="text-blue-500 w-6 h-6" />
              <h2 className="text-3xl font-mono font-black uppercase text-white tracking-tighter">Engineering.Status</h2>
            </div>
            <div className="space-y-4">
              <ProgressItem title="System Architecture & Data Flow Design" status="completed" />
              <ProgressItem title="Technology Stack & Framework Selection" status="completed" />
              <ProgressItem title="Dynamic API Endpoint Infrastructure" status="completed" />
              <ProgressItem title="Live Geofencing Dashboard Integration" status="completed" />
              <ProgressItem title="Anomaly & Spoofing Detection Logic" status="completed" />
              <ProgressItem title="Aerospace UI/UX Redesign" status="completed" />
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
              <Cpu className="text-amber-500 w-6 h-6" />
              <h2 className="text-3xl font-mono font-black uppercase text-white tracking-tighter">Tech.Arsenal</h2>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/[0.05] border border-white/[0.05]">
              <TechBadge name="Next.js 14" type="Server React" />
              <TechBadge name="Tailwind CSS" type="Utility Layout" />
              <TechBadge name="Framer Motion" type="GPU Animation" />
              <TechBadge name="Leaflet.js" type="Map Rendering" />
              <TechBadge name="Node.js API" type="Edge Ingestion" />
              <TechBadge name="MongoDB" type="Event Persistence" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, metric, accent }: { icon: React.ReactNode, title: string, description: string, metric: string, accent: string }) {
  return (
    <div className="group relative h-full bg-[#0a0a0a] p-10 transition-colors hover:bg-white/[0.02] flex flex-col justify-between">
      <div>
        <div className="mb-8 p-3 border border-white/10 inline-flex transition-colors group-hover:border-white/30">
          <div className={`transition-colors ${accent}`}>
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-mono font-bold uppercase text-white mb-4 tracking-tight">{title}</h3>
        <p className="text-sm text-gray-400 font-sans leading-relaxed">{description}</p>
      </div>
      <div className="mt-12 pt-4 border-t border-white/[0.05] flex justify-between items-center">
        <span className="text-[10px] font-mono text-gray-600 tracking-widest uppercase">{metric}</span>
        <div className={`w-1.5 h-1.5 bg-white/20 transition-colors ${accent.replace('text', 'bg')}`} />
      </div>
    </div>
  );
}

function ProgressItem({ title, status }: { title: string, status: 'completed' | 'in-progress' | 'pending' }) {
  const isComplete = status === 'completed';
  return (
    <div className="group relative flex items-center justify-between p-4 border border-white/5 bg-black/40 hover:bg-white/[0.02] hover:border-white/20 transition-all">
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">
          {isComplete ? '[OK]' : '[..]'}
        </span>
        <h4 className={`text-sm font-mono tracking-wide uppercase ${isComplete ? 'text-gray-300' : 'text-blue-400 animate-pulse'}`}>
          {title}
        </h4>
      </div>
      <div className={`w-2 h-2 border ${isComplete ? 'bg-white/20 border-white/40' : 'bg-blue-500/50 border-blue-400'} transition-colors`} />
    </div>
  );
}

function TechBadge({ name, type }: { name: string, type: string }) {
  return (
    <div className="bg-[#0a0a0a] hover:bg-white/[0.02] p-6 transition-colors flex flex-col justify-between h-32 group">
      <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase group-hover:text-blue-400 transition-colors">{type}</span>
      <span className="text-lg font-mono font-bold uppercase tracking-tight text-white">{name}</span>
    </div>
  );
}
