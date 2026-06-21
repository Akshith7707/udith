import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { staggerReveal } from '../lib/motion';

export default function HeroSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const targets = root.querySelectorAll('[data-hero-item]');
    staggerReveal(Array.from(targets), { gap: 0.09, y: 14, duration: 0.7 });
  }, []);

  return (
    <section
      id="home"
      className="relative flex items-center justify-center"
      style={{
        minHeight: 'calc(100vh - var(--nav-height))',
        background: 'var(--bg)',
      }}
    >
      <div
        ref={containerRef}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20"
      >
        <div data-hero-item className="eyebrow mb-5" style={{ opacity: 0 }}>
          NexusCareer
        </div>

        <h1
          data-hero-item
          className="display-1 mb-5"
          style={{ color: 'var(--text)', opacity: 0 }}
        >
          Find your calling.
          <br />
          <span style={{ color: 'var(--text-muted)' }}>Built for the ambitious.</span>
        </h1>

        <p
          data-hero-item
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10"
          style={{ color: 'var(--text-muted)', opacity: 0 }}
        >
          AI-powered career intelligence that maps your skills, passions, and goals
          to the path you were meant to walk.
        </p>

        <div
          data-hero-item
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          style={{ opacity: 0 }}
        >
          <Link to="/profiler" className="ui-btn ui-btn-primary" style={{ padding: '0.85rem 1.4rem', fontSize: '0.9375rem' }}>
            Begin your journey
            <ArrowRight size={16} />
          </Link>
          <Link to="/careers" className="ui-btn ui-btn-link" style={{ padding: '0.85rem 0.5rem' }}>
            Explore careers <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ color: 'var(--text-faint)' }}
        aria-hidden="true"
      >
        <ChevronDown
          size={22}
          style={{ animation: 'pageEnter 1.6s var(--ease-apple) infinite alternate' }}
        />
      </div>
    </section>
  );
}
