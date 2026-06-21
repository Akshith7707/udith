import { useEffect, useRef } from 'react';
import { inView } from 'motion';
import Reveal from './Reveal';
import Card from './Card';
import { TRENDING_SKILLS } from '../data';
import { countUp } from '../lib/motion';

const STATS = [
  { value: '2.4M+', label: 'Jobs available in India', animate: false },
  { value: '₹18.5L', label: 'Average tech salary', animate: false },
  { value: '340+', label: 'In-demand skills tracked', animate: true, numeric: 340, suffix: '+' },
];

const SECTORS = [
  { name: 'Tech', status: 'hot' },
  { name: 'Finance', status: 'stable' },
  { name: 'Healthcare', status: 'hot' },
  { name: 'Education', status: 'stable' },
  { name: 'Retail', status: 'declining' },
  { name: 'Manufacturing', status: 'stable' },
  { name: 'Media', status: 'stable' },
  { name: 'Real Estate', status: 'declining' },
  { name: 'Consulting', status: 'hot' },
  { name: 'E-commerce', status: 'hot' },
  { name: 'Logistics', status: 'stable' },
  { name: 'Hospitality', status: 'stable' },
  { name: 'Agriculture', status: 'stable' },
  { name: 'Energy', status: 'hot' },
];

function sectorStyle(status) {
  switch (status) {
    case 'hot':
      return {
        color: 'var(--success)',
        background: 'color-mix(in srgb, var(--success) 14%, transparent)',
        border: '1px solid color-mix(in srgb, var(--success) 30%, transparent)',
      };
    case 'declining':
      return {
        color: 'var(--danger)',
        background: 'color-mix(in srgb, var(--danger) 12%, transparent)',
        border: '1px solid color-mix(in srgb, var(--danger) 24%, transparent)',
      };
    default:
      return {
        color: 'var(--text)',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
      };
  }
}

function StatValue({ stat }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !stat.animate) return undefined;

    return inView(
      el,
      () => countUp(el, stat.numeric, { duration: 1.4, suffix: stat.suffix || '' }),
      { amount: 0.6, once: true },
    );
  }, [stat]);

  return (
    <div
      ref={ref}
      className="text-3xl sm:text-4xl font-semibold mb-1.5"
      style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
    >
      {stat.animate ? `0${stat.suffix || ''}` : stat.value}
    </div>
  );
}

export default function IndustryTrends() {
  return (
    <section id="trends" className="section-y" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="eyebrow mb-3">Industry pulse</p>
          <h2 className="display-2" style={{ color: 'var(--text)' }}>
            Live market intelligence.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <Card className="p-6 text-center h-full">
                <StatValue stat={stat} />
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mb-12">
            <h3
              className="text-[11px] font-semibold uppercase tracking-wider mb-3"
              style={{ color: 'var(--text-faint)' }}
            >
              Trending skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {TRENDING_SKILLS.map((skill) => (
                <span key={skill} className="ui-chip" style={{ cursor: 'default' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <Card className="p-6 sm:p-8">
            <h3
              className="text-lg font-semibold mb-6 text-center"
              style={{ color: 'var(--text)' }}
            >
              Job market heatmap
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {SECTORS.map((sector) => (
                <div
                  key={sector.name}
                  className="aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-medium cursor-default transition-transform hover:-translate-y-0.5"
                  style={sectorStyle(sector.status)}
                  title={`${sector.name}: ${sector.status}`}
                >
                  <span>{sector.name}</span>
                </div>
              ))}
            </div>
            <div
              className="flex flex-wrap justify-center gap-6 mt-6 text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              <span className="inline-flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: 'var(--success)' }}
                />
                Booming
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: 'var(--text-faint)' }}
                />
                Stable
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: 'var(--danger)' }}
                />
                Declining
              </span>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
