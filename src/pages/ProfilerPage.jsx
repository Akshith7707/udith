import PageLayout, { PageHero } from '../components/PageLayout';
import CareerProfiler from '../components/CareerProfiler';

export default function ProfilerPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Guided assessment"
        title="Career profiler."
        subtitle="Five quick steps. Unlock matches, skill gaps, and a personalized roadmap."
      />
      <CareerProfiler showHeader={false} redirectOnComplete />
    </PageLayout>
  );
}
