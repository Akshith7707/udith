import { useState } from 'react';
import { Clock, Star, Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';
import Reveal from './Reveal';
import Card from './Card';
import { RESOURCES } from '../data';
import { useProfile } from '../lib/useProfile';

const TABS = ['courses', 'books', 'certifications', 'youtube', 'communities'];

function difficultyStyle(level) {
  switch (level) {
    case 'Beginner':
      return { color: 'var(--success)', background: 'color-mix(in srgb, var(--success) 14%, transparent)' };
    case 'Intermediate':
      return { color: 'var(--warning)', background: 'color-mix(in srgb, var(--warning) 16%, transparent)' };
    default:
      return { color: 'var(--danger)', background: 'color-mix(in srgb, var(--danger) 12%, transparent)' };
  }
}

export default function LearningResources({ showHeader = true }) {
  const [activeTab, setActiveTab] = useState('courses');
  const { bookmarks, toggleBookmark } = useProfile();
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  return (
    <section id="resources" className="section-y" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <Reveal className="text-center mb-12">
            <p className="eyebrow mb-3">Library</p>
            <h2 className="display-2" style={{ color: 'var(--text)' }}>
              Curated learning pathways.
            </h2>
            <p
              className="mt-4 text-base max-w-xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              Hand-picked resources to accelerate your growth. Click any card to open.
            </p>
          </Reveal>
        )}

        <Reveal className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="ui-segmented flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`ui-segmented-item capitalize ${
                  activeTab === tab ? 'ui-segmented-item-active' : ''
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <label
            className="flex items-center gap-2 text-sm cursor-pointer"
            style={{ color: 'var(--text-muted)' }}
          >
            <input
              type="checkbox"
              checked={showFreeOnly}
              onChange={(e) => setShowFreeOnly(e.target.checked)}
              style={{ accentColor: 'var(--accent)' }}
            />
            Free only
          </label>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESOURCES[activeTab]
            ?.filter((r) => !showFreeOnly || r.free)
            .map((resource, i) => {
              const bookmarkKey = `${activeTab}-${resource.id}`;
              const bookmarked = bookmarks.includes(bookmarkKey);
              const inner = (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleBookmark(bookmarkKey);
                    }}
                    aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    className="focus-ring absolute top-4 right-4 w-8 h-8 rounded-full inline-flex items-center justify-center z-10"
                    style={{
                      color: bookmarked ? 'var(--accent)' : 'var(--text-faint)',
                    }}
                  >
                    {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                  </button>

                  <div className="text-2xl mb-3" aria-hidden="true">
                    {resource.icon}
                  </div>
                  <h3
                    className="text-base font-semibold leading-snug mb-1.5 pr-8 flex items-center gap-1.5"
                    style={{ color: 'var(--text)' }}
                  >
                    {resource.title}
                    {resource.url && <ExternalLink size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                    {resource.platform}
                  </p>

                  <div className="flex items-center gap-3 text-xs mb-5 flex-wrap">
                    <span
                      className="inline-flex items-center gap-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <Clock size={12} />
                      {resource.duration}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={difficultyStyle(resource.difficulty)}
                    >
                      {resource.difficulty}
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-between mt-auto pt-3"
                    style={{ borderTop: '1px solid var(--border)' }}
                  >
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={13}
                          fill={idx < Math.floor(resource.rating) ? '#ff9f0a' : 'transparent'}
                          style={{
                            color: idx < Math.floor(resource.rating) ? '#ff9f0a' : 'var(--border-strong)',
                          }}
                        />
                      ))}
                      <span
                        className="text-xs ml-1"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {resource.rating}
                      </span>
                    </div>
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: resource.free ? 'var(--success)' : 'var(--text-muted)',
                      }}
                    >
                      {resource.free ? 'Free' : 'Paid'}
                    </span>
                  </div>
                </>
              );

              return (
                <Reveal key={resource.id} delay={i * 0.04}>
                  {resource.url ? (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full focus-ring rounded-2xl"
                      style={{ textDecoration: 'none' }}
                    >
                      <Card hover className="p-5 h-full flex flex-col relative">
                        {inner}
                      </Card>
                    </a>
                  ) : (
                    <Card hover className="p-5 h-full flex flex-col relative">
                      {inner}
                    </Card>
                  )}
                </Reveal>
              );
            })}
        </div>
      </div>
    </section>
  );
}
