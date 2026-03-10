import Link from 'next/link';
import { ShieldAlert, Map, Activity, Layers, Cpu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                <ShieldAlert className="w-6 h-6 text-blue-400" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">GeoGuard</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink href="/geofence" icon={<Map className="w-4 h-4" />} text="Simulation" />
              <NavLink href="/spoofing" icon={<Activity className="w-4 h-4" />} text="Detection" />
              <NavLink href="/architecture" icon={<Layers className="w-4 h-4" />} text="Architecture" />
              <NavLink href="/technology" icon={<Cpu className="w-4 h-4" />} text="Tech & Sensors" />
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
      className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all"
    >
      {icon}
      {text}
    </Link>
  );
}
