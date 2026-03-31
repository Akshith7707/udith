import { Navbar, LearningResources, Testimonials, Footer, ChatAssistant } from '../components';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-x-hidden">
      <div className="grid-pattern fixed inset-0 pointer-events-none" />
      <div className="noise-overlay" />
      <Navbar scrolled />

      <main className="relative z-10 page-shell">
        <section className="px-4 pt-4 pb-4">
          <div className="max-w-6xl mx-auto glass rounded-3xl p-6 sm:p-10 border border-white/10">
            <p className="text-xs tracking-[0.2em] uppercase text-cyan-300 mb-3">Curated Library</p>
            <h1 className="font-orbitron text-3xl sm:text-5xl font-bold gradient-text mb-4">Resources Hub</h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-3xl">
              Access curated courses, books, certifications, and community picks tailored for career growth.
            </p>
          </div>
        </section>

        <LearningResources visible showHeader={false} />
        <div className="px-4 pb-4">
          <div className="max-w-6xl mx-auto border-t border-white/10" />
        </div>
        <Testimonials visible compact />
        <div className="mt-12">
          <Footer />
        </div>
      </main>

      <ChatAssistant />
    </div>
  );
}
