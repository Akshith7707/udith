import PageLayout, { PageHero } from '../components/PageLayout';
import MentorshipConnect from '../components/MentorshipConnect';

export default function MentorsPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Human guidance"
        title="Mentor connect."
        subtitle="Connect with mentors who have already walked the career path you're targeting."
      />
      <MentorshipConnect />
    </PageLayout>
  );
}
