import { useSearchParams, Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import { decodeSharePayload } from '../lib/shareProfile';
import { CAREER_PATHS } from '../data';

export default function SharedResultsPage() {
  const [params] = useSearchParams();
  const data = decodeSharePayload(params.get('d') || '');
  const career = CAREER_PATHS.find((c) => c.id === data?.c) || CAREER_PATHS[0];

  if (!data) {
    return (
      <PageLayout>
        <section className="section-y">
          <div className="max-w-lg mx-auto px-4 text-center">
            <h1 className="display-2 mb-4" style={{ color: 'var(--text)' }}>Invalid link</h1>
            <Link to="/" className="ui-btn ui-btn-primary">Go home</Link>
          </div>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="section-y">
        <div className="max-w-lg mx-auto px-4 text-center">
          <p className="eyebrow mb-3">Shared results</p>
          <h1 className="display-2 mb-4" style={{ color: 'var(--text)' }}>
            {data.n || 'Someone'}&apos;s career match
          </h1>
          <Card className="p-8 mb-8">
            <div className="text-4xl mb-3">{career.icon}</div>
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>{career.title}</h2>
            <p className="text-3xl font-semibold mb-2" style={{ color: 'var(--accent)' }}>{data.m}% match</p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{career.description}</p>
          </Card>
          <Link to="/profiler" className="ui-btn ui-btn-primary">Build your own profile</Link>
        </div>
      </section>
    </PageLayout>
  );
}
