import { useState } from 'react';
import {
  Download,
  ExternalLink,
  BookOpen,
  Hammer,
  Rocket,
  Flag,
  Layers,
  Code2,
  TrendingUp,
  Trophy,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Reveal from './Reveal';
import Card from './Card';
import { useProfile } from '../lib/useProfile';
import { CAREER_PATHS } from '../data';
import { exportRoadmapPdf } from '../lib/exportRoadmapPdf';
import { buildPersonalizedRoadmap } from '../lib/buildRoadmap';

const PHASE_ICONS = { book: BookOpen, hammer: Hammer, rocket: Rocket };
const MILESTONE_ICONS = { flag: Flag, layers: Layers, code: Code2, trending: TrendingUp, trophy: Trophy };

function ResourceChip({ resource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring flex items-start gap-2 p-3 rounded-xl transition-shadow hover:shadow-md"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        textDecoration: 'none',
      }}
    >
      <ExternalLink size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
      <div className="min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>
          {resource.title}
        </p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
          {resource.platform}
          {resource.free != null && (
            <span style={{ color: resource.free ? 'var(--success)' : 'var(--text-faint)' }}>
              {' '}
              · {resource.free ? 'Free' : 'Paid'}
            </span>
          )}
        </p>
      </div>
    </a>
  );
}

export default function CareerTimeline() {
  const { profile, milestones, setMilestones, selectedCareerId, completedSkills } = useProfile();
  const [view, setView] = useState('longterm');
  const [expandedMilestone, setExpandedMilestone] = useState('now');
  const [expandedWeek, setExpandedWeek] = useState('foundation-1');

  const careerId = selectedCareerId || 'swe';
  const career = CAREER_PATHS.find((c) => c.id === careerId) || CAREER_PATHS[0];
  const roadmap = buildPersonalizedRoadmap({
    careerId,
    profile,
    completedSkills,
    userMilestones: milestones,
  });

  const handleExport = () => {
    if (!profile) return;
    exportRoadmapPdf({ profile, selectedCareerId: careerId, milestones, completedSkills, roadmap });
  };

  return (
    <section id="timeline" className="section-y" style={{ background: 'var(--bg-subtle)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <p className="eyebrow mb-3">Roadmap</p>
          <h2 className="display-2" style={{ color: 'var(--text)' }}>
            Your {career.title} blueprint
          </h2>
          <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Step-by-step plan with milestones, weekly tasks, and curated learning links.
          </p>
        </Reveal>

        <Reveal className="ui-segmented mb-8 max-w-md mx-auto flex">
          <button
            type="button"
            className={`ui-segmented-item flex-1 ${view === 'longterm' ? 'ui-segmented-item-active' : ''}`}
            onClick={() => setView('longterm')}
          >
            5-year vision
          </button>
          <button
            type="button"
            className={`ui-segmented-item flex-1 ${view === 'ninety' ? 'ui-segmented-item-active' : ''}`}
            onClick={() => setView('ninety')}
          >
            90-day plan
          </button>
        </Reveal>

        {roadmap.missingSkillNames.length > 0 && (
          <Reveal>
            <Card
              className="p-4 mb-8 flex flex-col sm:flex-row sm:items-center gap-3"
              style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, var(--border))' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: 'var(--accent-soft)' }}
              >
                {career.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                  Priority skills to learn next
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {roadmap.missingSkillNames.join(' · ')}
                </p>
              </div>
            </Card>
          </Reveal>
        )}

        {view === 'longterm' && (
          <div className="space-y-4">
            {roadmap.milestones.map((ms, i) => {
              const Icon = MILESTONE_ICONS[ms.icon] || Flag;
              const open = expandedMilestone === ms.key;
              return (
                <Reveal key={ms.key} delay={i * 0.04}>
                  <Card className="overflow-hidden">
                    <button
                      type="button"
                      className="focus-ring w-full p-5 sm:p-6 flex items-start gap-4 text-left"
                      onClick={() => setExpandedMilestone(open ? null : ms.key)}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), var(--bg-elevated))`,
                          border: '1px solid var(--border)',
                          color: 'var(--accent)',
                        }}
                      >
                        <Icon size={22} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
                              {ms.label}
                            </span>
                            <h3 className="text-base font-semibold mt-0.5" style={{ color: 'var(--text)' }}>
                              {ms.title}
                            </h3>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>
                              {ms.subtitle}
                            </p>
                          </div>
                          {open ? <ChevronUp size={18} style={{ color: 'var(--text-faint)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-faint)' }} />}
                        </div>
                        {!open && (
                          <p className="text-sm mt-2 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                            {ms.description}
                          </p>
                        )}
                      </div>
                    </button>

                    {open && (
                      <div className="px-5 sm:px-6 pb-6 pt-0 page-enter">
                        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          {ms.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-5 mb-5">
                          <div>
                            <p className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-faint)' }}>
                              Goals
                            </p>
                            <ul className="space-y-2">
                              {(ms.goals || []).map((g) => (
                                <li key={g} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text)' }}>
                                  <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--success)' }} />
                                  {g}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-faint)' }}>
                              Checklist
                            </p>
                            <ul className="space-y-2">
                              {(ms.checklist || []).map((c) => (
                                <li key={c} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                                  <Circle size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--border-strong)' }} />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <label className="text-xs font-semibold uppercase block mb-2" style={{ color: 'var(--text-faint)' }}>
                          Your personal note
                        </label>
                        <input
                          type="text"
                          value={ms.userNote}
                          onChange={(e) => setMilestones({ ...milestones, [ms.key]: e.target.value })}
                          placeholder={`What does "${ms.label}" mean for you?`}
                          className="ui-input w-full text-sm"
                        />
                      </div>
                    )}
                  </Card>
                </Reveal>
              );
            })}
          </div>
        )}

        {view === 'ninety' && (
          <div className="space-y-8">
            {roadmap.phases.map((phase, pi) => {
              const PhaseIcon = PHASE_ICONS[phase.icon] || BookOpen;
              return (
                <Reveal key={phase.id} delay={pi * 0.06}>
                  <Card className="overflow-hidden">
                    <div
                      className="p-5 sm:p-6 flex items-center gap-4"
                      style={{
                        background: `linear-gradient(135deg, color-mix(in srgb, ${phase.color} 12%, var(--bg)), var(--bg))`,
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{
                          background: `color-mix(in srgb, ${phase.color} 20%, var(--bg))`,
                          color: phase.color,
                          border: `1px solid color-mix(in srgb, ${phase.color} 35%, transparent)`,
                        }}
                      >
                        <PhaseIcon size={26} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase" style={{ color: phase.color }}>
                          {phase.period}
                        </p>
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
                          Phase {pi + 1}: {phase.title}
                        </h3>
                        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          {phase.summary}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 space-y-3">
                      {phase.weeks.map((week) => {
                        const weekKey = `${phase.id}-${week.week}`;
                        const weekOpen = expandedWeek === weekKey;
                        return (
                          <div
                            key={weekKey}
                            className="rounded-xl overflow-hidden"
                            style={{ border: '1px solid var(--border)' }}
                          >
                            <button
                              type="button"
                              className="focus-ring w-full px-4 py-3 flex items-center justify-between text-left"
                              style={{ background: 'var(--bg-elevated)' }}
                              onClick={() => setExpandedWeek(weekOpen ? null : weekKey)}
                            >
                              <div>
                                <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
                                  Week {week.week}
                                </span>
                                <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                                  {week.title}
                                </p>
                              </div>
                              {weekOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>

                            {weekOpen && (
                              <div className="px-4 py-4 page-enter" style={{ background: 'var(--bg)' }}>
                                <ul className="space-y-2 mb-4">
                                  {week.tasks.map((task) => (
                                    <li key={task} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                                      <span
                                        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                                        style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                                      >
                                        {week.week}
                                      </span>
                                      {task}
                                    </li>
                                  ))}
                                </ul>
                                {week.resources.length > 0 && (
                                  <>
                                    <p className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-faint)' }}>
                                      Learn this week
                                    </p>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                      {week.resources.map((res) => (
                                        <ResourceChip key={res.url} resource={res} />
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        )}

        <Reveal>
          <Card className="mt-10 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-base font-semibold" style={{ color: 'var(--text)' }}>
                  Top resources for {career.title}
                </h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  Hand-picked courses, guides, and communities — click to open.
                </p>
              </div>
              <button type="button" className="ui-btn ui-btn-secondary flex-shrink-0" onClick={handleExport} disabled={!profile}>
                <Download size={14} /> Export PDF
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {roadmap.featured.map((res) => (
                <ResourceChip key={res.url} resource={res} />
              ))}
            </div>

            {roadmap.learnNext.length > 0 && (
              <>
                <p className="text-xs font-semibold uppercase mb-3" style={{ color: 'var(--text-faint)' }}>
                  Based on your skill gaps
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {roadmap.learnNext.map((res) => (
                    <ResourceChip key={res.url} resource={res} />
                  ))}
                </div>
              </>
            )}
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
