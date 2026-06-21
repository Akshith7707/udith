import PageLayout, { PageHero } from '../components/PageLayout';
import LearningResources from '../components/LearningResources';
import SavedResources from '../components/SavedResources';
import Testimonials from '../components/Testimonials';
import Reveal from '../components/Reveal';

export default function ResourcesPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Curated library"
        title="Resources hub."
        subtitle="Curated courses, books, certifications, and community picks."
      />
      <LearningResources showHeader={false} />
      <section className="section-y" style={{ background: 'var(--bg-subtle)', paddingTop: '2rem' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-8 text-center">
            <p className="eyebrow mb-3">Saved</p>
            <h2 className="display-2" style={{ color: 'var(--text)' }}>Your library.</h2>
          </Reveal>
          <SavedResources />
        </div>
      </section>
      <div className="px-4"><div className="max-w-6xl mx-auto hairline" /></div>
      <Testimonials compact />
    </PageLayout>
  );
}
