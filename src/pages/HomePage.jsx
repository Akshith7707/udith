import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import HomeBento from '../components/HomeBento';
import GuidanceMarquee from '../components/GuidanceMarquee';
import Testimonials from '../components/Testimonials';
import { useProfile } from '../lib/useProfile';

export default function HomePage() {
  const { hasProfile } = useProfile();

  return (
    <PageLayout>
      {hasProfile && (
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <div className="ui-card p-4 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ background: 'var(--accent-soft)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>Your profile is saved. Continue on your dashboard.</p>
            <Link to="/dashboard" className="ui-btn ui-btn-primary">Open dashboard</Link>
          </div>
        </div>
      )}
      <HomeBento />
      <GuidanceMarquee />
      <Testimonials compact />
    </PageLayout>
  );
}
