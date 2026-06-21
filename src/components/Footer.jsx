import { useState } from 'react';
import { Globe, Mail, Phone } from 'lucide-react';
import MadeByModal from './MadeByModal';

const LINK_COLUMNS = [
  {
    title: 'Platform',
    links: ['Career Profiler', 'AI Recommendations', 'Skill Analysis', 'Learning Hub'],
  },
  { title: 'Resources', links: ['Blog', 'Guides', 'Webinars', 'Podcasts'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
];

export default function Footer() {
  const [showMadeBy, setShowMadeBy] = useState(false);

  return (
    <footer
      style={{
        background: 'var(--bg-subtle)',
        borderTop: '1px solid var(--border)',
        marginTop: '4rem',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: 'var(--accent)' }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
              >
                NexusCareer
              </span>
            </div>
            <p
              className="text-sm mb-6 max-w-sm leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              AI-powered career intelligence for India’s next generation of
              professionals.
            </p>
            <div className="flex gap-2">
              {[Globe, Mail, Phone].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="focus-ring inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors"
                  style={{
                    background: 'var(--bg)',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {LINK_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4
                className="text-[11px] font-semibold uppercase tracking-wider mb-4"
                style={{ color: 'var(--text-faint)' }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="focus-ring text-sm transition-colors"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl p-6 sm:p-7 mb-10"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex-1">
              <h4
                className="text-base font-semibold mb-1"
                style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
              >
                Stay ahead of the curve
              </h4>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Weekly career insights, in your inbox.
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="ui-input"
                style={{ minWidth: '240px' }}
              />
              <button type="button" className="ui-btn ui-btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs"
          style={{ color: 'var(--text-faint)', borderTop: '1px solid var(--border)' }}
        >
          <p>© {new Date().getFullYear()} NexusCareer. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <p>Made for India&apos;s next generation.</p>
            <span style={{ color: 'var(--border-strong)' }}>·</span>
            <button
              type="button"
              onClick={() => setShowMadeBy(true)}
              className="focus-ring text-xs font-medium transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              Made by
            </button>
          </div>
        </div>
      </div>
      {showMadeBy && <MadeByModal onClose={() => setShowMadeBy(false)} />}
    </footer>
  );
}
