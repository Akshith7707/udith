import { Link } from 'react-router-dom';
import { ArrowRight, Download, Share2, FileText, GitCompare, RefreshCw } from 'lucide-react';
import PageLayout, { PageHero } from '../components/PageLayout';
import Reveal from '../components/Reveal';
import Card from '../components/Card';
import CircularProgress from '../components/CircularProgress';
import SkillGapAnalyzer from '../components/SkillGapAnalyzer';
import CareerTimeline from '../components/CareerTimeline';
import CareerRecommendations from '../components/CareerRecommendations';
import SectionNav from '../components/SectionNav';
import EmptyState from '../components/EmptyState';
import { useProfile } from '../lib/useProfile';
import { CAREER_PATHS, SKILLS_DATA } from '../data';
import { computeCareerMatch, rankCareers } from '../lib/matchEngine';
import { exportRoadmapPdf } from '../lib/exportRoadmapPdf';
import { buildShareUrl } from '../lib/shareProfile';

export default function DashboardPage() {
  const {
    profile,
    hasProfile,
    selectedCareerId,
    setSelectedCareer,
    completedSkills,
    milestones,
    clearProfile,
  } = useProfile();

  if (!hasProfile) {
    return (
      <PageLayout>
        <section className="section-y">
          <div className="max-w-lg mx-auto px-4">
            <EmptyState
              icon="📋"
              title="No profile yet"
              description="Complete the profiler or load a sample profile to unlock your dashboard."
              actionLabel="Start profiler"
              actionTo="/profiler"
            />
          </div>
        </section>
      </PageLayout>
    );
  }

  const ranked = rankCareers(CAREER_PATHS, profile, completedSkills);
  const top = ranked[0];
  const activeId = selectedCareerId || top.career.id;
  const activeCareer = CAREER_PATHS.find((c) => c.id === activeId) || top.career;
  const { percent, breakdown } = computeCareerMatch(activeCareer, profile, completedSkills);

  const missingSkills = activeCareer.requiredSkills
    .filter((s) => !profile.skills.includes(s) && !completedSkills.includes(s))
    .slice(0, 3)
    .map((id) => SKILLS_DATA.find((sk) => sk.id === id)?.name)
    .filter(Boolean);

  const handleShare = async () => {
    const url = buildShareUrl({ profile, selectedCareerId: activeId, completedSkills, milestones });
    try {
      await navigator.clipboard.writeText(url);
      alert('Share link copied to clipboard.');
    } catch {
      prompt('Copy this link:', url);
    }
  };

  return (
    <PageLayout>
      <PageHero
        eyebrow="Dashboard"
        title={`Welcome back, ${profile.name?.split(' ')[0] || 'there'}.`}
        subtitle={`Top match: ${top.career.title} at ${top.percent}%.`}
      />

      <section className="section-y" style={{ paddingTop: 0 }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-5 mb-8">
            <Reveal>
              <Card className="p-6 lg:col-span-2">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <CircularProgress percent={percent} size={120} strokeWidth={8} />
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold" style={{ color: 'var(--text)' }}>
                      {percent}%
                    </span>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="eyebrow mb-1">Active path</p>
                    <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>
                      {activeCareer.icon} {activeCareer.title}
                    </h2>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>{activeCareer.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs" style={{ color: 'var(--text-faint)' }}>
                      <span>Skills {breakdown.skills}%</span>
                      <span>·</span>
                      <span>Passion {breakdown.passion}%</span>
                      <span>·</span>
                      <span>{activeCareer.salaryRange}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.05}>
              <Card className="p-6 h-full flex flex-col">
                <p className="eyebrow mb-3">Next actions</p>
                <ul className="space-y-3 text-sm flex-1" style={{ color: 'var(--text)' }}>
                  {missingSkills.map((s) => (
                    <li key={s}>Learn <strong>{s}</strong></li>
                  ))}
                  <li>Review <Link to="/resources" style={{ color: 'var(--accent)' }}>curated resources</Link></li>
                  <li>Book a <Link to="/mentors" style={{ color: 'var(--accent)' }}>mentor session</Link></li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Link to={`/careers/${activeId}`} className="ui-btn ui-btn-secondary text-xs">Details</Link>
                  <Link to="/compare" className="ui-btn ui-btn-ghost text-xs"><GitCompare size={14} /> Compare</Link>
                </div>
              </Card>
            </Reveal>
          </div>

          <Reveal>
            <div className="flex flex-wrap gap-2 mb-8">
              {ranked.slice(0, 6).map(({ career, percent: p }) => (
                <button
                  key={career.id}
                  type="button"
                  onClick={() => setSelectedCareer(career.id)}
                  className={`ui-chip ${activeId === career.id ? 'ui-chip-active' : ''}`}
                >
                  {career.icon} {career.title} · {p}%
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                type="button"
                className="ui-btn ui-btn-secondary"
                onClick={() => exportRoadmapPdf({ profile, selectedCareerId: activeId, milestones, completedSkills })}
              >
                <Download size={14} /> Export PDF
              </button>
              <button type="button" className="ui-btn ui-btn-secondary" onClick={handleShare}>
                <Share2 size={14} /> Share results
              </button>
              <Link to="/resume" className="ui-btn ui-btn-secondary"><FileText size={14} /> Resume</Link>
              <Link to="/profiler" className="ui-btn ui-btn-ghost"><RefreshCw size={14} /> Edit profile</Link>
              <button type="button" className="ui-btn ui-btn-ghost" onClick={clearProfile}>Reset</button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionNav
          sections={[
            { id: 'recommendations', label: 'Matches' },
            { id: 'skillgap', label: 'Skills' },
            { id: 'timeline', label: 'Roadmap' },
          ]}
        />
      </div>

      <CareerRecommendations />
      <SkillGapAnalyzer />
      <CareerTimeline />
    </PageLayout>
  );
}
