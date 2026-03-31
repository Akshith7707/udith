import { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import CircularProgress from './CircularProgress';
import { CAREER_PATHS, SKILLS_DATA } from '../data';

export default function CareerRecommendations({ userProfile, onSelectCareer, visible }) {
  const userSkills = userProfile?.skills || [];
  const [activeCareer, setActiveCareer] = useState(null);
  const profileSeed = userSkills.length;

  const getCareerMatch = (career) => {
    const matchedSkills = career.requiredSkills.filter((s) => userSkills.includes(s));
    const baseMatch = career.matchPercent;
    const skillBonus = (matchedSkills.length / career.requiredSkills.length) * 20;
    const jitter = (career.id.length + profileSeed) % 5;
    return Math.min(99, Math.round(baseMatch + skillBonus - 10 + jitter));
  };

  return (
    <section id="recommendations" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Your AI Career Matches
          </h2>
          <p className="text-gray-400 text-lg">NexusAI has identified 6 optimal career paths for you</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAREER_PATHS.map((career, index) => {
            const matchPercent = getCareerMatch(career);
            return (
              <div
                key={career.id}
                className={`glass rounded-2xl p-6 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,245,255,0.2)] transition-all duration-300 cursor-pointer relative overflow-hidden shimmer-hover ${
                  activeCareer === career.id ? 'ring-2 ring-[#00F5FF]' : ''
                }`}
                onClick={() => {
                  setActiveCareer(career.id);
                  onSelectCareer(career.id);
                }}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{career.icon}</div>
                  <div className="relative">
                    <CircularProgress percent={matchPercent} size={60} strokeWidth={4} />
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                      {matchPercent}%
                    </span>
                  </div>
                </div>

                <h3 className="font-orbitron text-xl font-bold mb-2">{career.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{career.description}</p>

                <div className="space-y-2 mb-4">
                  {career.reasons.map((reason, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-[#00F5FF]" />
                      {reason}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#10B981]">{career.salaryRange}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      career.trend === 'hot'
                        ? 'bg-red-500/20 text-red-400'
                        : career.trend === 'rising'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {career.trend === 'hot' ? '🔥 Hot' : career.trend === 'rising' ? '📈 Rising' : '✅ Stable'}
                  </span>
                </div>

                <button className="ui-btn ui-btn-secondary w-full mt-4">
                  Explore Path <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
