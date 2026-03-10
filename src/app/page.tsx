import Link from "next/link";
import { ArrowRight, ShieldCheck, MapPin, Activity, Radio, Cpu, Database, ServerCrash } from "lucide-react";
import ImageSequence from "@/components/ImageSequence";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Scroll Sequence Hero */}
      <ImageSequence 
        frameCount={240} 
        imageFolder="/Photos" 
        imagePrefix="ezgif-frame-" 
        imageExtension=".jpg" 
      />

      {/* Product Overview */}
      <section className="w-full py-32 bg-[#050505] relative z-10 -mt-32">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-[#050505]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">System Intel Architecture</h2>
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              GeoGuard is a comprehensive location security monitoring platform for Unmanned Aerial and Ground Vehicles. By combining precise polygon geofencing with advanced kinematic analysis, the system actively identifies spoofing vectors and zero-day topological anomalies.
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MapPin className="text-blue-400 w-8 h-8" />}
              title="Real-time Geofencing"
              description="Establish dynamic, polygonal or circular virtual perimeters to monitor device movement boundaries instantly."
              gradient="from-blue-500/10 to-transparent border-blue-500/20"
            />
            <FeatureCard
              icon={<ShieldCheck className="text-emerald-400 w-8 h-8" />}
              title="Spoofing Detection"
              description="Algorithmic verification of GPS signals using multi-sensor fusion (IMU + GPS) to detect location manipulation."
              gradient="from-emerald-500/10 to-transparent border-emerald-500/20"
            />
            <FeatureCard
              icon={<Radio className="text-purple-400 w-8 h-8" />}
              title="Instant Alerts"
              description="Immediate WebSocket notifications when a device breaches geofence boundaries or exhibits anomalous behavior."
              gradient="from-purple-500/10 to-transparent border-purple-500/20"
            />
            <FeatureCard
              icon={<Activity className="text-rose-400 w-8 h-8" />}
              title="Trajectory Analysis"
              description="Analyze movement patterns and verify physical constraints (speed, acceleration) to identify simulated paths."
              gradient="from-rose-500/10 to-transparent border-rose-500/20"
            />
            <FeatureCard
              icon={<Database className="text-amber-400 w-8 h-8" />}
              title="Persistent Telemetry"
              description="Secure, immutable logging of all location data and system events via NoSQL database for post-mission audit."
              gradient="from-amber-500/10 to-transparent border-amber-500/20"
            />
            <FeatureCard
              icon={<ServerCrash className="text-cyan-400 w-8 h-8" />}
              title="Edge API Ready"
              description="Designed to integrate seamlessly with flight controllers via modular Node.js API endpoint ingestion."
              gradient="from-cyan-500/10 to-transparent border-cyan-500/20"
            />
          </div>
        </div>
      </section>

      {/* Progress & Tech Stack Section */}
      <section className="w-full py-32 bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 relative z-10">
          <div className="flex-1">
            <h2 className="text-3xl font-black tracking-tight mb-8 text-white">Engineering Progress</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500/50 before:via-blue-500/20 before:to-transparent">
              <ProgressItem title="System Architecture & Data Flow Design" status="completed" />
              <ProgressItem title="Technology Stack & Framework Selection" status="completed" />
              <ProgressItem title="Dynamic API Endpoint Infrastructure" status="completed" />
              <ProgressItem title="Live Geofencing Dashboard Integration" status="completed" />
              <ProgressItem title="Anomaly & Spoofing Detection Logic" status="completed" />
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-black tracking-tight mb-8 text-white">Full-Stack Implementation</h2>
            <div className="grid grid-cols-2 gap-4">
              <TechBadge name="Next.js 14" type="Server React" icon={<Cpu className="w-4 h-4 text-blue-400" />} />
              <TechBadge name="Tailwind CSS" type="Utility Layout" icon={<Activity className="w-4 h-4 text-cyan-400" />} />
              <TechBadge name="Framer Motion" type="GPU Animation" icon={<Radio className="w-4 h-4 text-purple-400" />} />
              <TechBadge name="Leaflet.js" type="Map Rendering" icon={<MapPin className="w-4 h-4 text-emerald-400" />} />
              <TechBadge name="Node.js API" type="Edge Ingestion" icon={<ServerCrash className="w-4 h-4 text-rose-400" />} />
              <TechBadge name="MongoDB" type="Event Persistence" icon={<Database className="w-4 h-4 text-amber-400" />} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, gradient }: { icon: React.ReactNode, title: string, description: string, gradient: string }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group border shadow-2xl shadow-black/50 backdrop-blur-sm`}>
      <div className="bg-[#050505] w-14 h-14 rounded-xl border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{title}</h3>
      <p className="text-gray-400 font-light leading-relaxed">{description}</p>
    </div>
  );
}

function ProgressItem({ title, status }: { title: string, status: 'completed' | 'in-progress' | 'pending' }) {
  return (
    <div className="relative flex items-center gap-6 md:justify-normal group hover:bg-white/[0.02] p-2 rounded-xl transition-colors">
      <div className={`w-4 h-4 rounded-full border-2 z-10 bg-[#0a0a0a] border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] group-hover:scale-125 transition-transform`}></div>
      <div className="bg-[#111] border border-white/5 px-6 py-4 rounded-xl flex-1 shadow-inner">
        <h4 className="font-bold text-gray-200 tracking-wide">{title}</h4>
      </div>
    </div>
  );
}

function TechBadge({ name, type, icon }: { name: string, type: string, icon: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-[#111] to-black border border-white/5 p-5 rounded-xl flex flex-col shadow-lg hover:border-white/20 transition-colors">
      <div className="flex justify-between items-start mb-2">
         <span className="text-white font-bold">{name}</span>
         {icon}
      </div>
      <span className="text-xs font-mono text-gray-500 uppercase">{type}</span>
    </div>
  );
}
