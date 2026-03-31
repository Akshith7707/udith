import { TRENDING_SKILLS } from '../data';

export default function IndustryTrends({ visible }) {
  return (
    <section id="trends" className="py-20 px-4 bg-gradient-to-b from-transparent via-[#00F5FF]/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Live Industry Intelligence
          </h2>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { value: '2.4M+', label: 'Jobs Available in India', color: '#00F5FF' },
            { value: '₹18.5L', label: 'Average Tech Salary', color: '#8B5CF6' },
            { value: '340+', label: 'In-Demand Skills Tracked', color: '#FF4D6D' },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center">
              <div className="font-orbitron text-4xl sm:text-5xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trending Skills Ticker */}
        <div className="overflow-hidden mb-12">
          <div className="flex animate-marquee">
            {[...TRENDING_SKILLS, ...TRENDING_SKILLS].map((skill, i) => (
              <span key={i} className="px-4 py-2 mx-2 bg-white/5 rounded-full text-sm whitespace-nowrap">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Job Market Heatmap */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-orbitron text-xl font-bold mb-6 text-center">Job Market Heatmap</h3>
          <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
            {[
              { name: 'Tech', status: 'hot' },
              { name: 'Finance', status: 'stable' },
              { name: 'Healthcare', status: 'hot' },
              { name: 'Education', status: 'stable' },
              { name: 'Retail', status: 'declining' },
              { name: 'Manufacturing', status: 'stable' },
              { name: 'Media', status: 'stable' },
              { name: 'Real Estate', status: 'declining' },
              { name: 'Consulting', status: 'hot' },
              { name: 'E-commerce', status: 'hot' },
              { name: 'Logistics', status: 'stable' },
              { name: 'Hospitality', status: 'stable' },
              { name: 'Agriculture', status: 'stable' },
              { name: 'Energy', status: 'hot' },
            ].map((sector, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium cursor-pointer hover:scale-105 transition-all ${
                  sector.status === 'hot'
                    ? 'bg-green-500/30 text-green-400'
                    : sector.status === 'stable'
                    ? 'bg-yellow-500/30 text-yellow-400'
                    : 'bg-red-500/30 text-red-400'
                }`}
                title={`${sector.name}: ${sector.status}`}
              >
                {sector.name.slice(0, 4)}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-green-500/50" /> Booming
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-yellow-500/50" /> Stable
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-red-500/50" /> Declining
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
