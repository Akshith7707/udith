import { useState } from 'react';
import { Navbar, CareerProfiler, CareerRecommendations, SkillGapAnalyzer, Footer, ChatAssistant } from '../components';

export default function ProfilerPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);

  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-x-hidden">
      <div className="grid-pattern fixed inset-0 pointer-events-none" />
      <div className="noise-overlay" />
      <Navbar scrolled />

      <main className="relative z-10 page-shell">
        <section className="px-4 pt-4 pb-6">
          <div className="max-w-6xl mx-auto glass rounded-3xl p-6 sm:p-10 border border-white/10">
            <p className="text-xs tracking-[0.2em] uppercase text-cyan-300 mb-3">Guided Assessment</p>
            <h1 className="font-orbitron text-3xl sm:text-5xl font-bold gradient-text mb-4">Career Profiler</h1>
            <p className="text-gray-300 text-sm sm:text-lg max-w-3xl">
              Complete your profile step-by-step and unlock career matches, skill-gap analysis, and a personalized roadmap.
            </p>
          </div>
        </section>

        <CareerProfiler visible onComplete={setUserProfile} showHeader={false} />

        {userProfile && (
          <CareerRecommendations
            userProfile={userProfile}
            onSelectCareer={setSelectedCareer}
            visible
          />
        )}

        {userProfile && selectedCareer && (
          <SkillGapAnalyzer userSkills={userProfile.skills} targetCareer={selectedCareer} visible />
        )}

        <section className="px-4 pb-12 pt-2">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
            {[
              { title: 'Fast Completion', desc: 'Built to finish in under 3 minutes with progressive steps.' },
              { title: 'Data-Driven Match', desc: 'Recommendations are tied to your chosen skills and goals.' },
              { title: 'Actionable Output', desc: 'Get practical next actions instead of generic advice.' },
            ].map((item) => (
              <div key={item.title} className="glass rounded-2xl p-5 border border-white/10">
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12">
          <Footer />
        </div>
      </main>

      <ChatAssistant />
    </div>
  );
}
