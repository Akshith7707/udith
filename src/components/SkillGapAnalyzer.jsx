import { Check, Target } from 'lucide-react';
import CircularProgress from './CircularProgress';
import { CAREER_PATHS, SKILLS_DATA } from '../data';

export default function SkillGapAnalyzer({ userSkills, targetCareer, visible }) {
  const selectedCareer = CAREER_PATHS.find((c) => c.id === targetCareer) || CAREER_PATHS[0];
  
  const skillGap = {
    have: selectedCareer.requiredSkills.filter((s) => userSkills.includes(s)),
    need: selectedCareer.requiredSkills.filter((s) => !userSkills.includes(s)),
  };

  const readinessScore = Math.round((skillGap.have.length / selectedCareer.requiredSkills.length) * 100);

  return (
    <section id="skillgap" className="py-20 px-4 bg-gradient-to-b from-transparent via-[#8B5CF6]/5 to-transparent">
      <div className={`max-w-6xl mx-auto transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="text-center mb-12">
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Your Skill Gap Report
          </h2>
          <p className="text-gray-400 text-lg">For: {selectedCareer.title}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* You Have */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-orbitron text-xl font-bold mb-4 text-[#10B981] flex items-center gap-2">
              <Check className="w-6 h-6" /> You Have
            </h3>
            <div className="space-y-3">
              {skillGap.have.length > 0 ? (
                skillGap.have.map((skillId) => {
                  const skill = SKILLS_DATA.find((s) => s.id === skillId);
                  return (
                    <div key={skillId} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="text-sm mb-1">{skill?.name}</div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#10B981] w-4/5 rounded-full" />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">Complete the profiler to see your skills</p>
              )}
            </div>
          </div>

          {/* Readiness Score */}
          <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center">
            <h3 className="font-orbitron text-xl font-bold mb-6">Readiness Score</h3>
            <div className="relative">
              <CircularProgress
                percent={readinessScore}
                size={180}
                strokeWidth={12}
                color="#8B5CF6"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-orbitron text-4xl font-bold">{readinessScore}%</span>
                <span className="text-gray-400 text-sm">Ready</span>
              </div>
            </div>
          </div>

          {/* You Need */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-orbitron text-xl font-bold mb-4 text-[#FF4D6D] flex items-center gap-2">
              <Target className="w-6 h-6" /> You Need
            </h3>
            <div className="space-y-3">
              {skillGap.need.map((skillId) => {
                const skill = SKILLS_DATA.find((s) => s.id === skillId);
                return (
                  <div key={skillId} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="text-sm mb-1">{skill?.name}</div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF4D6D]/50 w-1/4 rounded-full" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 90-Day Roadmap */}
        <div className="mt-12 glass rounded-2xl p-6">
          <h3 className="font-orbitron text-2xl font-bold mb-6 text-center">Your 90-Day Upskill Roadmap</h3>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#00F5FF] via-[#8B5CF6] to-[#FF4D6D]" />
            <div className="flex justify-between relative">
              {[
                { phase: 'Foundation', days: 'Day 1-30', icon: '📚' },
                { phase: 'Intermediate', days: 'Day 31-60', icon: '🚀' },
                { phase: 'Advanced', days: 'Day 61-90', icon: '🎯' },
              ].map((stage, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#020817] border-4 border-[#00F5FF] flex items-center justify-center text-2xl mb-2 pulse-glow">
                    {stage.icon}
                  </div>
                  <span className="font-orbitron font-bold">{stage.phase}</span>
                  <span className="text-gray-400 text-sm">{stage.days}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
