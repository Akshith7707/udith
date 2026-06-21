import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Compass, Sparkles, UserCircle } from 'lucide-react';
import Reveal from './Reveal';
import { useProfile } from '../lib/useProfile';

const TILES = [
  {
    title: 'Career profiler',
    desc: '5-step assessment maps your skills and passions.',
    to: '/profiler',
    icon: UserCircle,
  },
  {
    title: 'Explore careers',
    desc: 'Browse 50+ domains and role paths.',
    to: '/careers',
    icon: Compass,
  },
  {
    title: 'Market trends',
    desc: 'Live intelligence on skills and sectors.',
    to: '/careers',
    icon: BarChart3,
  },
  {
    title: 'NexusAI advisor',
    desc: 'Ask anything about your career path.',
    to: '/profiler',
    icon: Sparkles,
  },
];

export default function HomeBento() {
  const navigate = useNavigate();
  const { loadDemoProfile, hasProfile } = useProfile();

  const handleDemo = () => {
    loadDemoProfile();
    navigate('/dashboard');
  };

  return (
    <section className="section-y" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="eyebrow mb-3">NexusCareer</p>
          <h1 className="display-1 mb-4" style={{ color: 'var(--text)' }}>
            Your career, mapped.
          </h1>
          <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: 'var(--text-muted)' }}>
            AI-powered guidance for Indian students and professionals — from first step to dream role.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/profiler" className="ui-btn ui-btn-primary">
              Start profiler <ArrowRight size={16} />
            </Link>
            {!hasProfile && (
              <button type="button" onClick={handleDemo} className="ui-btn ui-btn-secondary">
                Try sample profile
              </button>
            )}
            {hasProfile && (
              <Link to="/dashboard" className="ui-btn ui-btn-secondary">
                Open dashboard
              </Link>
            )}
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {TILES.map((tile, i) => {
            const Icon = tile.icon;
            return (
              <Reveal key={tile.title} delay={i * 0.06}>
                <Link
                  to={tile.to}
                  className="ui-card ui-card-hover block p-6 h-full focus-ring"
                  style={{ background: 'var(--bg-elevated)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                  >
                    <Icon size={20} />
                  </div>
                  <h2 className="text-base font-semibold mb-1" style={{ color: 'var(--text)' }}>
                    {tile.title}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {tile.desc}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
