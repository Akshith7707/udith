import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

export default function CareerTimeline({ visible }) {
  const [milestones, setMilestones] = useState({
    now: 'Current Position',
    '6months': 'Learn core skills',
    '1year': 'First role in field',
    '3years': 'Mid-level position',
    '5years': 'Senior/Lead role',
  });

  return (
    <section id="timeline" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Build Your Career Blueprint
          </h2>
          <p className="text-gray-400 text-lg">Click on milestones to customize your journey</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-[#00F5FF] via-[#8B5CF6] to-[#FF4D6D]">
              <div className="absolute inset-0 animate-pulse opacity-50" />
            </div>

            {/* Milestones */}
            <div className="flex justify-between relative">
              {[
                { key: 'now', label: 'NOW' },
                { key: '6months', label: '6 MO' },
                { key: '1year', label: '1 YR' },
                { key: '3years', label: '3 YRS' },
                { key: '5years', label: '5 YRS' },
              ].map((milestone) => (
                <div key={milestone.key} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#020817] border-4 border-[#00F5FF] flex items-center justify-center mb-4 cursor-pointer hover:scale-110 transition-all pulse-glow">
                    <span className="text-xs font-bold">{milestone.label}</span>
                  </div>
                  <input
                    type="text"
                    value={milestones[milestone.key]}
                    onChange={(e) => setMilestones({ ...milestones, [milestone.key]: e.target.value })}
                    className="ui-input w-24 sm:w-32 text-center text-xs sm:text-sm bg-transparent border-b border-dashed border-gray-600 py-1 rounded-md"
                    placeholder="Your goal..."
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="ui-btn ui-btn-primary px-6 mx-auto">
              <ExternalLink className="w-5 h-5" /> Export Roadmap as PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
