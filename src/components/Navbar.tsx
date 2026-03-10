import Link from 'next/link';
import { ShieldAlert, Map, Activity, Layers, Cpu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              {/* Branding removed */}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <NavLink href="/geofence" icon={<Map className="w-3.5 h-3.5" />} text="Simulation" />
              <NavLink href="/spoofing" icon={<Activity className="w-3.5 h-3.5" />} text="Detection" />
              <NavLink href="/architecture" icon={<Layers className="w-3.5 h-3.5" />} text="Architecture" />
              <NavLink href="/technology" icon={<Cpu className="w-3.5 h-3.5" />} text="Tech & Sensors" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 text-gray-400 hover:text-white border border-transparent hover:border-white/10 hover:bg-white/[0.02] px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-widest transition-all"
    >
      {icon}
      {text}
    </Link>
  );
}
