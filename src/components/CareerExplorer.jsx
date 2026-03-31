import { useState } from 'react';
import { X } from 'lucide-react';
import { CAREER_DOMAINS } from '../data';

export default function CareerExplorer({ visible }) {
  const [activeCareer, setActiveCareer] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <section id="explorer" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Explore 50+ Career Universes
          </h2>
          <p className="text-gray-400 text-lg">Click on any domain to discover career paths within</p>
        </div>

        {/* Hexagonal Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {CAREER_DOMAINS.map((domain) => {
            const Icon = domain.icon;
            return (
              <div
                key={domain.id}
                onClick={() => {
                  setActiveCareer(domain.id);
                  setDrawerOpen(true);
                }}
                className="w-32 h-36 sm:w-40 sm:h-44 relative cursor-pointer group"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    border: `2px solid ${domain.color}40`,
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Icon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" style={{ color: domain.color }} />
                  <span className="text-sm font-medium text-center px-2">{domain.name}</span>
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    boxShadow: `0 0 30px ${domain.color}40`,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Side Drawer */}
      {drawerOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setDrawerOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] glass z-50 overflow-y-auto p-6">
            <button
              onClick={() => setDrawerOpen(false)}
              className="ui-btn min-h-0 absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {(() => {
              const domain = CAREER_DOMAINS.find((d) => d.id === activeCareer);
              if (!domain) return null;
              const Icon = domain.icon;
              return (
                <div className="mt-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `${domain.color}20` }}>
                      <Icon className="w-8 h-8" style={{ color: domain.color }} />
                    </div>
                    <div>
                      <h3 className="font-orbitron text-2xl font-bold">{domain.name}</h3>
                      <p className="text-gray-400">{domain.subcareers.length} career paths</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-[#00F5FF]">Popular Careers</h4>
                      <div className="space-y-2">
                        {domain.subcareers.map((career) => (
                          <div key={career} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                            {career}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-[#00F5FF]">Salary Range</h4>
                      <p className="text-gray-300">₹4L - ₹80L+ depending on role and experience</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-[#00F5FF]">Top Companies</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Swiggy'].map((company) => (
                          <span key={company} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 text-[#00F5FF]">A Day in the Life</h4>
                      <p className="text-gray-400 text-sm">
                        Professionals in {domain.name.toLowerCase()} typically spend their days solving complex problems,
                        collaborating with teams, and driving innovation in their respective fields.
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </>
      )}
    </section>
  );
}
