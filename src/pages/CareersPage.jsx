import PageLayout, { PageHero } from '../components/PageLayout';
import CareerExplorer from '../components/CareerExplorer';
import IndustryTrends from '../components/IndustryTrends';
import CareerTimeline from '../components/CareerTimeline';

export default function CareersPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Explore opportunities"
        title="Career universes."
        subtitle="Browse in-demand domains, market trends, and a realistic timeline from beginner to expert."
      />
      <CareerExplorer />
      <IndustryTrends />
      <CareerTimeline />
    </PageLayout>
  );
}
