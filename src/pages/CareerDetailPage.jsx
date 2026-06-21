import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Reveal from '../components/Reveal';
import Card from '../components/Card';
import { CAREER_PATHS } from '../data';
import { useProfile } from '../lib/useProfile';
import { computeCareerMatch } from '../lib/matchEngine';

export default function CareerDetailPage() {
  const { id } = useParams();
  const { profile, completedSkills, setSelectedCareer, toggleCompare, compareIds } = useProfile();
  const career = CAREER_PATHS.find((c) => c.id === id);

  if (!career) return <Navigate to="/careers" replace />;

  const match = profile ? computeCareerMatch(career, profile, completedSkills) : null;
  const inCompare = compareIds.includes(career.id);

  return (
    <PageLayout>
      <section className="section-y">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Link to="/careers" className="ui-btn ui-btn-link mb-8 inline-flex items-center gap-1">
              <ArrowLeft size={14} /> All careers
            </Link>
            <div className="flex items-start gap-4 mb-6">
              <span className="text-5xl">{career.icon}</span>
              <div>
                <p className="eyebrow mb-2">{career.domain} · {career.trend}</p>
                <h1 className="display-2" style={{ color: 'var(--text)' }}>{career.title}</h1>
                {match && (
                  <p className="mt-2 text-lg font-medium" style={{ color: 'var(--accent)' }}>
                    {match.percent}% match for your profile
                  </p>
                )}
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
              {career.longDescription || career.description}
            </p>
          </Reveal>

          <Reveal>
            <Card className="p-6 mb-5">
              <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--text)' }}>A day in the life</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{career.dayInLife}</p>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="p-6 mb-5">
              <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--text)' }}>Top companies</h2>
              <div className="flex flex-wrap gap-2">
                {(career.companies || []).map((co) => (
                  <span key={co} className="ui-chip" style={{ cursor: 'default' }}>{co}</span>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="p-6 mb-8">
              <h2 className="text-base font-semibold mb-3" style={{ color: 'var(--text)' }}>Certifications</h2>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                {(career.certifications || []).map((cert) => (
                  <li key={cert}>· {cert}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm" style={{ color: 'var(--text)' }}>
                Salary: <strong>{career.salaryRange}</strong>
              </p>
            </Card>
          </Reveal>

          <div className="flex flex-wrap gap-3">
            <button type="button" className="ui-btn ui-btn-primary" onClick={() => setSelectedCareer(career.id)}>
              Set as target <ArrowRight size={14} />
            </button>
            <button type="button" className={`ui-btn ${inCompare ? 'ui-btn-primary' : 'ui-btn-secondary'}`} onClick={() => toggleCompare(career.id)}>
              {inCompare ? 'In compare' : 'Add to compare'}
            </button>
            <Link to="/dashboard" className="ui-btn ui-btn-ghost">Dashboard</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
