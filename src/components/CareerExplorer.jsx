import { useEffect, useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { CAREER_DOMAINS } from '../data';

export default function CareerExplorer() {
  const [activeCareer, setActiveCareer] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <section id="explorer" className="section-y" style={{ background: 'var(--bg-subtle)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="eyebrow mb-3">Explore</p>
          <h2 className="display-2" style={{ color: 'var(--text)' }}>
            Fifty career universes.
          </h2>
          <p
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Tap any domain to see roles, salary, and a day in the life.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {CAREER_DOMAINS.map((domain, i) => {
            const Icon = domain.icon;
            return (
              <Reveal key={domain.id} delay={i * 0.03}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCareer(domain.id);
                    setDrawerOpen(true);
                  }}
                  className="ui-card ui-card-hover w-full p-5 flex flex-col items-start gap-3 text-left focus-ring"
                  style={{ background: 'var(--bg)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'var(--accent-soft)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text)' }}
                    >
                      {domain.name}
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {domain.subcareers.length} paths
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{
              background: 'color-mix(in srgb, var(--text) 30%, transparent)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              animation: 'pageEnter 220ms var(--ease-apple)',
            }}
            onClick={() => setDrawerOpen(false)}
          />
          <aside
            className="fixed right-0 top-0 h-full w-full sm:w-[440px] z-50 overflow-y-auto"
            style={{
              background: 'var(--bg)',
              borderLeft: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
              animation: 'drawerSlide 320ms var(--ease-apple)',
            }}
          >
            <style>{`@keyframes drawerSlide{from{transform:translateX(20px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close"
              className="focus-ring absolute top-4 right-4 w-9 h-9 rounded-full inline-flex items-center justify-center"
              style={{ color: 'var(--text)' }}
            >
              <X size={18} />
            </button>

            {(() => {
              const domain = CAREER_DOMAINS.find((d) => d.id === activeCareer);
              if (!domain) return null;
              const Icon = domain.icon;
              return (
                <div className="p-7 pt-12">
                  <div className="flex items-center gap-4 mb-7">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: 'var(--accent-soft)',
                        color: 'var(--accent)',
                      }}
                    >
                      <Icon size={26} />
                    </div>
                    <div>
                      <h3
                        className="text-xl font-semibold"
                        style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
                      >
                        {domain.name}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        {domain.subcareers.length} career paths
                      </p>
                    </div>
                  </div>

                  <Section title="Popular careers">
                    <div className="space-y-1.5">
                      {domain.subcareers.map((career) => (
                        <div
                          key={career}
                          className="flex items-center justify-between p-3 rounded-xl transition-colors"
                          style={{ background: 'var(--bg-elevated)' }}
                        >
                          <span style={{ color: 'var(--text)' }} className="text-sm">
                            {career}
                          </span>
                          <ArrowUpRight size={14} style={{ color: 'var(--text-faint)' }} />
                        </div>
                      ))}
                    </div>
                  </Section>

                  <Section title="Salary range">
                    <p style={{ color: 'var(--text)' }} className="text-sm">
                      ₹4L – ₹80L+ depending on role and experience.
                    </p>
                  </Section>

                  <Section title="Top companies">
                    <div className="flex flex-wrap gap-2">
                      {['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Swiggy'].map((company) => (
                        <span key={company} className="ui-chip" style={{ cursor: 'default' }}>
                          {company}
                        </span>
                      ))}
                    </div>
                  </Section>

                  <Section title="A day in the life">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Professionals in {domain.name.toLowerCase()} typically spend their days
                      solving complex problems, collaborating with teams, and driving innovation
                      in their respective fields.
                    </p>
                  </Section>
                </div>
              );
            })()}
          </aside>
        </>
      )}
    </section>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-7">
      <h4
        className="text-[11px] font-semibold uppercase tracking-wider mb-3"
        style={{ color: 'var(--text-faint)' }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}
