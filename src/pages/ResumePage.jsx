import { Link } from 'react-router-dom';
import { Download, Pencil } from 'lucide-react';
import PageLayout, { PageHero } from '../components/PageLayout';
import Reveal from '../components/Reveal';
import EmptyState from '../components/EmptyState';
import ResumePreview from '../components/ResumePreview';
import { useProfile } from '../lib/useProfile';
import { CAREER_PATHS } from '../data';
import { buildResumeData, downloadResumePdf } from '../lib/buildResumeData';

export default function ResumePage() {
  const { profile, hasProfile, selectedCareerId } = useProfile();
  const career = CAREER_PATHS.find((c) => c.id === selectedCareerId) || CAREER_PATHS[0];

  if (!hasProfile) {
    return (
      <PageLayout>
        <section className="section-y">
          <div className="max-w-lg mx-auto px-4">
            <EmptyState
              icon="📄"
              title="Profile required"
              description="Complete the profiler to generate a professional resume."
              actionLabel="Start profiler"
              actionTo="/profiler"
            />
          </div>
        </section>
      </PageLayout>
    );
  }

  const resume = buildResumeData(profile, career);

  return (
    <PageLayout>
      <PageHero
        eyebrow="Resume"
        title="Professional resume."
        subtitle={`Akshith-style layout for ${career.title}. Preview below, download as PDF.`}
      />

      <section className="section-y" style={{ paddingTop: 0 }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal className="flex flex-wrap gap-2 mb-6">
            <button
              type="button"
              className="ui-btn ui-btn-primary"
              onClick={() => downloadResumePdf(profile, career)}
            >
              <Download size={14} /> Download PDF
            </button>
            <Link to="/profiler" className="ui-btn ui-btn-secondary">
              <Pencil size={14} /> Edit contact info
            </Link>
            <Link to="/dashboard" className="ui-btn ui-btn-ghost">
              Dashboard
            </Link>
          </Reveal>

          <Reveal>
            <p className="text-xs mb-4 text-center" style={{ color: 'var(--text-faint)' }}>
              Tip: Add email, phone, LinkedIn & GitHub in profiler step 1 for a fully personalized header.
            </p>
            <div
              className="rounded-2xl p-4 sm:p-8 overflow-x-auto"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
            >
              <ResumePreview resume={resume} />
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
