export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left flex flex-col gap-1">
            <h3 className="text-sm font-mono font-black uppercase tracking-widest text-white">System Monitoring Dashboard</h3>
          </div>
          <div className="flex space-x-8 text-xs font-mono font-bold uppercase tracking-widest text-gray-500">
            <span className="hover:text-blue-400 transition-colors cursor-pointer border-b border-transparent hover:border-blue-400/50 pb-1">Documentation</span>
            <span className="hover:text-blue-400 transition-colors cursor-pointer border-b border-transparent hover:border-blue-400/50 pb-1">System Feed</span>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono tracking-widest uppercase">
          <span>&copy; {new Date().getFullYear()} System Core. All rights reserved.</span>
          <span className="flex items-center gap-2">
            Status: <span className="text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">Operational</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
