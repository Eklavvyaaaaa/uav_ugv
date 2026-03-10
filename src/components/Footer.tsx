export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-2">Geofencing & GPS Spoofing Detection</h3>
            <p className="text-sm text-gray-400">Final Year Engineering Project</p>
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <span className="hover:text-white transition-colors cursor-pointer">Project Docs</span>
            <span className="hover:text-white transition-colors cursor-pointer">Source Code</span>
            <span className="hover:text-white transition-colors cursor-pointer">About Team</span>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} GeoGuard System. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
