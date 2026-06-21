import { Check, Target } from 'lucide-react';
import CircularProgress from './CircularProgress';
import Reveal from './Reveal';
import Card from './Card';
import { CAREER_PATHS, SKILLS_DATA } from '../data';
import { useProfile } from '../lib/useProfile';
import { computeReadiness } from '../lib/matchEngine';

export default function SkillGapAnalyzer({ userSkills: propSkills, targetCareer: propCareer }) {
  const { profile, selectedCareerId, completedSkills, toggleCompletedSkill } = useProfile();
  const userSkills = propSkills || profile?.skills || [];
  const careerId = propCareer || selectedCareerId;
  const selectedCareer = CAREER_PATHS.find((c) => c.id === careerId) || CAREER_PATHS[0];

  if (!userSkills.length && !profile) return null;

  const allHave = new Set([...userSkills, ...completedSkills]);
  const skillGap = {
    have: selectedCareer.requiredSkills.filter((s) => allHave.has(s)),
    need: selectedCareer.requiredSkills.filter((s) => !allHave.has(s)),
  };

  const readinessScore = computeReadiness(selectedCareer, userSkills, completedSkills);

  return (
    <section id="skillgap" className="section-y" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="eyebrow mb-3">Skill report</p>
          <h2 className="display-2" style={{ color: 'var(--text)' }}>
            Where you stand.
          </h2>
          <p className="mt-4 text-base" style={{ color: 'var(--text-muted)' }}>
            For: <span style={{ color: 'var(--text)' }}>{selectedCareer.title}</span>
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-5">
          <Reveal>
            <Card className="p-6 h-full">
              <h3
                className="text-base font-semibold mb-5 flex items-center gap-2"
                style={{ color: 'var(--text)' }}
              >
                <span
                  className="w-7 h-7 rounded-full inline-flex items-center justify-center"
                  style={{
                    background: 'color-mix(in srgb, var(--success) 16%, transparent)',
                    color: 'var(--success)',
                  }}
                >
                  <Check size={14} />
                </span>
                You have
              </h3>
              <div className="space-y-3.5">
                {skillGap.have.length > 0 ? (
                  skillGap.have.map((skillId) => {
                    const skill = SKILLS_DATA.find((s) => s.id === skillId);
                    return (
                      <div key={skillId}>
                        <div
                          className="text-sm mb-1.5 flex justify-between"
                          style={{ color: 'var(--text)' }}
                        >
                          <span>{skill?.name}</span>
                          <span style={{ color: 'var(--text-faint)' }}>80%</span>
                        </div>
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ background: 'var(--bg-elevated)' }}
                        >
                          <div
                            style={{
                              height: '100%',
                              width: '80%',
                              background: 'var(--success)',
                              borderRadius: '999px',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Complete the profiler to see your skills.
                  </p>
                )}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <Card className="p-6 h-full flex flex-col items-center justify-center">
              <h3
                className="text-base font-semibold mb-6"
                style={{ color: 'var(--text)' }}
              >
                Readiness score
              </h3>
              <div className="relative">
                <CircularProgress percent={readinessScore} size={170} strokeWidth={10} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-4xl font-semibold"
                    style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
                  >
                    {readinessScore}%
                  </span>
                  <span className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    Ready
                  </span>
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="p-6 h-full">
              <h3
                className="text-base font-semibold mb-5 flex items-center gap-2"
                style={{ color: 'var(--text)' }}
              >
                <span
                  className="w-7 h-7 rounded-full inline-flex items-center justify-center"
                  style={{
                    background: 'color-mix(in srgb, var(--warning) 16%, transparent)',
                    color: 'var(--warning)',
                  }}
                >
                  <Target size={14} />
                </span>
                You need
              </h3>
              <div className="space-y-3.5">
                {skillGap.need.length === 0 && (
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    You’re fully covered. Nice.
                  </p>
                )}
                {skillGap.need.map((skillId) => {
                  const skill = SKILLS_DATA.find((s) => s.id === skillId);
                  const learned = completedSkills.includes(skillId);
                  return (
                    <div key={skillId}>
                      <div className="text-sm mb-1.5 flex justify-between items-center" style={{ color: 'var(--text)' }}>
                        <button type="button" className="text-left focus-ring" onClick={() => toggleCompletedSkill(skillId)} style={{ color: learned ? 'var(--success)' : 'var(--text)' }}>
                          {learned ? '✓ ' : ''}{skill?.name}
                        </button>
                        <span style={{ color: 'var(--text-faint)' }}>{learned ? '100%' : '25%'}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                        <div style={{ height: '100%', width: learned ? '100%' : '25%', background: learned ? 'var(--success)' : 'var(--warning)', borderRadius: '999px', transition: 'width 400ms var(--ease-apple)' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </Reveal>
        </div>

        <Reveal>
          <Card className="mt-8 p-6 sm:p-10 text-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Your full 90-day plan with weekly tasks and learning links is in the{' '}
              <a href="#timeline" className="font-medium" style={{ color: 'var(--accent)' }}>
                Roadmap
              </a>{' '}
              section below — switch to &quot;90-day plan&quot; for details.
            </p>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
