import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useProfile } from '../lib/useProfile';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Dashboard', path: '/dashboard', requiresProfile: true },
  { label: 'Profiler', path: '/profiler' },
  { label: 'Careers', path: '/careers' },
  { label: 'Resources', path: '/resources' },
  { label: 'Compare', path: '/compare', requiresProfile: true },
  { label: 'Mentors', path: '/mentors' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { hasProfile } = useProfile();

  const closeMobile = () => setMobileOpen(false);

  const visibleItems = navItems.filter((item) => !item.requiresProfile || hasProfile);

  return (
    <nav
      className="sticky top-0 left-0 right-0 z-50"
      style={{
        height: 'var(--nav-height)',
        background: 'var(--nav-bg)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="max-w-7xl h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to={hasProfile ? '/dashboard' : '/'} className="focus-ring flex items-center gap-2 font-medium" style={{ color: 'var(--text)', fontSize: '0.9375rem' }}>
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
          NexusCareer
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {visibleItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className="focus-ring text-[13px]" style={{ color: active ? 'var(--text)' : 'var(--text-muted)', fontWeight: active ? 500 : 400 }}>
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link to={hasProfile ? '/dashboard' : '/profiler'} className="ui-btn ui-btn-primary" style={{ padding: '0.5rem 1rem', minHeight: '2.125rem', fontSize: '0.8125rem' }}>
            {hasProfile ? 'Dashboard' : 'Get started'}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <ThemeToggle />
          <button type="button" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu" className="focus-ring inline-flex items-center justify-center w-9 h-9 rounded-full" style={{ color: 'var(--text)' }}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full page-enter" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col">
            {visibleItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={closeMobile} className="py-3 text-sm focus-ring" style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}>
                {item.label}
              </Link>
            ))}
            <Link to={hasProfile ? '/dashboard' : '/profiler'} onClick={closeMobile} className="ui-btn ui-btn-primary mt-3 w-full">
              {hasProfile ? 'Dashboard' : 'Get started'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
