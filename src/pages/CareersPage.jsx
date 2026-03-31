import { Navbar, CareerExplorer, IndustryTrends, CareerTimeline, Footer, ChatAssistant } from '../components';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-x-hidden">
      <div className="grid-pattern fixed inset-0 pointer-events-none" />
      <div className="noise-overlay" />
      <Navbar scrolled />

      <main className="relative z-10 page-shell">
        <section className="px-4 pt-4 pb-4">
          <div className="max-w-6xl mx-auto glass rounded-3xl p-6 sm:p-10 border border-white/10">
            <p className="text-xs tracking-[0.2em] uppercase text-cyan-300 mb-3">Explore Opportunities</p>
            <h1 className="font-orbitron text-3xl sm:text-5xl font-bold gradient-text mb-4">Career Universes</h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-3xl">
              Browse in-demand domains, market trends, and a realistic timeline to move from beginner to expert.
            </p>
          </div>
        </section>

        <CareerExplorer visible />
        <IndustryTrends visible />
        <CareerTimeline visible />
        <div className="mt-12">
          <Footer />
        </div>
      </main>

      <ChatAssistant />
    </div>
  );
}
