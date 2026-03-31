import { useState } from 'react';
import { Menu, Rocket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ scrolled }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Profiler', path: '/profiler' },
    { label: 'Careers', path: '/careers' },
    { label: 'Resources', path: '/resources' },
    { label: 'Mentors', path: '/mentors' },
  ];

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 h-[76px] transition-all duration-300 ${
        scrolled
          ? 'bg-[#020817]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(2,8,23,0.45)]'
          : 'bg-[#020817]/80 backdrop-blur-xl border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5FF] to-[#8B5CF6] flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="font-orbitron text-xl font-bold gradient-text">NexusCareer</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative transition-colors group text-sm font-medium ${
                location.pathname === item.path ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 h-0.5 bg-[#00F5FF] transition-all duration-300 ${
                location.pathname === item.path
                  ? 'left-0 w-full'
                  : 'left-1/2 w-0 group-hover:w-full group-hover:left-0'
              }`} />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/profiler" className="ui-btn ui-btn-secondary">
            Sign In
          </Link>
          <Link to="/profiler" className="ui-btn ui-btn-primary">
            Get Started
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-xl p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block py-2 text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
