import { Link } from 'react-router-dom';
import PageLayout, { PageHero } from '../components/PageLayout';
import Reveal from '../components/Reveal';
import Card from '../components/Card';
import CareerCompareTable, { ComparePicker } from '../components/CareerCompareTable';
import EmptyState from '../components/EmptyState';
import { useProfile } from '../lib/useProfile';

export default function ComparePage() {
  const { profile, hasProfile, compareIds, toggleCompare, completedSkills } = useProfile();

  if (!hasProfile) {
    return (
      <PageLayout>
        <section className="section-y">
          <div className="max-w-lg mx-auto px-4">
            <EmptyState icon="⚖️" title="Profile required" description="Complete the profiler to compare careers." actionLabel="Start profiler" actionTo="/profiler" />
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHero eyebrow="Compare" title="Side by side." subtitle="Pick up to three careers and compare match, salary, and skills." />

      <section className="section-y" style={{ paddingTop: 0 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-8">
            <ComparePicker compareIds={compareIds} onToggle={toggleCompare} />
          </Reveal>

          {compareIds.length >= 2 ? (
            <Reveal>
              <Card className="p-6 overflow-x-auto">
                <CareerCompareTable careerIds={compareIds} profile={profile} completedSkills={completedSkills} />
              </Card>
            </Reveal>
          ) : (
            <EmptyState icon="➕" title="Select at least 2 careers" description="Use the chips above to add careers to compare." />
          )}

          <div className="mt-8 text-center">
            <Link to="/dashboard" className="ui-btn ui-btn-ghost">Back to dashboard</Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
