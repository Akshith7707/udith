import { Link } from 'react-router-dom';
import { ArrowRight, Check, GitCompare } from 'lucide-react';
import CircularProgress from './CircularProgress';
import Reveal from './Reveal';
import Card from './Card';
import { CAREER_PATHS } from '../data';
import { rankCareers } from '../lib/matchEngine';
import { useProfile } from '../lib/useProfile';

const TREND_LABEL = { hot: 'Hot', rising: 'Rising', stable: 'Stable' };

function trendStyle(trend) {
  switch (trend) {
    case 'hot':
      return { color: 'var(--danger)', background: 'color-mix(in srgb, var(--danger) 12%, transparent)' };
    case 'rising':
      return { color: 'var(--warning)', background: 'color-mix(in srgb, var(--warning) 14%, transparent)' };
    default:
      return { color: 'var(--success)', background: 'color-mix(in srgb, var(--success) 14%, transparent)' };
  }
}

export default function CareerRecommendations({ userProfile: propProfile }) {
  const { profile: ctxProfile, selectedCareerId, setSelectedCareer, toggleCompare, compareIds, completedSkills } = useProfile();
  const userProfile = propProfile || ctxProfile;
  const ranked = rankCareers(CAREER_PATHS, userProfile, completedSkills);

  if (!userProfile) return null;

  return (
    <section id="recommendations" className="section-y" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="eyebrow mb-3">Your matches</p>
          <h2 className="display-2" style={{ color: 'var(--text)' }}>Six paths picked for you.</h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Ranked by skills, passion, salary fit, timeline, and education.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ranked.map(({ career, percent, breakdown }, index) => {
            const isActive = selectedCareerId === career.id;
            const inCompare = compareIds.includes(career.id);
            return (
              <Reveal key={career.id} delay={index * 0.05}>
                <Card hover active={isActive} className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <div className="text-3xl">{career.icon}</div>
                    <div className="relative">
                      <CircularProgress percent={percent} size={56} strokeWidth={4} />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold" style={{ color: 'var(--text)' }}>{percent}%</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>{career.title}</h3>
                  <p className="text-xs mb-3" style={{ color: 'var(--text-faint)' }}>
                    Skills {breakdown.skills}% · Passion {breakdown.passion}%
                  </p>
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{career.description}</p>

                  <div className="space-y-2 mb-5">
                    {career.reasons.map((reason, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text)' }}>
                        <Check size={14} style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }} />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm mt-auto mb-4">
                    <span style={{ color: 'var(--text)', fontWeight: 500 }}>{career.salaryRange}</span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium" style={trendStyle(career.trend)}>{TREND_LABEL[career.trend]}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="ui-btn ui-btn-primary flex-1" style={{ fontSize: '0.8125rem' }} onClick={() => setSelectedCareer(career.id)}>
                      Select path
                    </button>
                    <Link to={`/careers/${career.id}`} className="ui-btn ui-btn-secondary" style={{ fontSize: '0.8125rem' }}>
                      <ArrowRight size={14} />
                    </Link>
                    <button type="button" className={`ui-btn ${inCompare ? 'ui-btn-primary' : 'ui-btn-ghost'}`} style={{ fontSize: '0.8125rem', padding: '0.5rem' }} onClick={() => toggleCompare(career.id)} title="Compare">
                      <GitCompare size={14} />
                    </button>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="text-center mt-8">
          <Link to="/compare" className="ui-btn ui-btn-link">Open compare view →</Link>
        </Reveal>
      </div>
    </section>
  );
}
