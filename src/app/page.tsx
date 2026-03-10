import Link from "next/link";
import { ArrowRight, ShieldCheck, MapPin, Activity, Radio, Cpu, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden bg-black py-32 md:py-48 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            System Live & Monitoring
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Geofencing & GPS <br className="hidden md:block" />
            Spoofing Detection
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
            Next-generation location security platform. Securing assets with intelligent geofencing boundaries and dynamic GPS spoofing detection algorithms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/geofence"
              className="px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all flex items-center justify-center gap-2 group"
            >
              View Simulation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/architecture"
              className="px-8 py-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center justify-center"
            >
              System Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="w-full py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Product Overview</h2>
            <p className="text-gray-400">
              GeoGuard is a comprehensive location security monitoring platform designed for UAV and UGV operations. By combining precise geofencing with advanced behavioral analysis, it ensures devices remain within designated safe zones while actively monitoring for GPS spoofing attacks that attempt to falsify location data.
            </p>
          </div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<MapPin className="text-blue-400 w-8 h-8" />}
              title="Real-time Geofencing"
              description="Establish dynamic, polygonal or circular virtual perimeters to monitor device movement boundaries instantly."
            />
            <FeatureCard
              icon={<ShieldCheck className="text-emerald-400 w-8 h-8" />}
              title="Spoofing Detection"
              description="Algorithmic verification of GPS signals using multi-sensor fusion (IMU + GPS) to detect location manipulation."
            />
            <FeatureCard
              icon={<Radio className="text-purple-400 w-8 h-8" />}
              title="Instant Alerts"
              description="Immediate notification generation when a device breaches geofence boundaries or exhibits anomalous behavior."
            />
            <FeatureCard
              icon={<Activity className="text-rose-400 w-8 h-8" />}
              title="Trajectory Analysis"
              description="Analyze movement patterns and verify physical constraints (speed, acceleration) to identify simulated paths."
            />
            <FeatureCard
              icon={<Database className="text-amber-400 w-8 h-8" />}
              title="Historical Logging"
              description="Secure, immutable logging of all location data and system events for post-mission audit and review."
            />
            <FeatureCard
              icon={<Cpu className="text-cyan-400 w-8 h-8" />}
              title="Hardware Agnostic"
              description="Designed to integrate seamlessly with various flight controllers and IoT location modules via API."
            />
          </div>
        </div>
      </section>

      {/* Progress & Tech Stack Section */}
      <section className="w-full py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-8 text-white">Project Progress</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              <ProgressItem title="System Architecture Design" status="completed" />
              <ProgressItem title="Technology Stack Selection" status="completed" />
              <ProgressItem title="Website UI and Structure" status="completed" />
              <ProgressItem title="Geofencing Simulation Concept" status="in-progress" />
              <ProgressItem title="Spoofing Detection Logic" status="pending" />
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-8 text-white">Technology Stack</h2>
            <div className="grid grid-cols-2 gap-4">
              <TechBadge name="Next.js 14" type="Frontend" />
              <TechBadge name="React" type="UI Library" />
              <TechBadge name="Tailwind CSS" type="Styling" />
              <TechBadge name="Leaflet.js" type="Mapping" />
              <TechBadge name="Node.js" type="Backend API" />
              <TechBadge name="MongoDB" type="Database" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group">
      <div className="bg-black/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

function ProgressItem({ title, status }: { title: string, status: 'completed' | 'in-progress' | 'pending' }) {
  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'bg-emerald-500 border-emerald-500';
      case 'in-progress': return 'bg-blue-500 border-blue-500 animate-pulse';
      case 'pending': return 'bg-transparent border-gray-600';
    }
  };

  return (
    <div className="relative flex items-center gap-6 md:justify-normal">
      <div className={`w-4 h-4 rounded-full border-2 z-10 ${getStatusColor()}`}></div>
      <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-xl flex-1">
        <h4 className={`font-medium ${status === 'pending' ? 'text-gray-500' : 'text-gray-200'}`}>{title}</h4>
      </div>
    </div>
  );
}

function TechBadge({ name, type }: { name: string, type: string }) {
  return (
    <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 p-4 rounded-xl flex flex-col">
      <span className="text-white font-bold">{name}</span>
      <span className="text-xs text-blue-400 mt-1">{type}</span>
    </div>
  );
}
