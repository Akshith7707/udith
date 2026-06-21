import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import teamPhoto1 from '../assets/made-by-team.png';
import teamPhoto2 from '../assets/made-by-2.png';
import teamPhoto3 from '../assets/made-by-3.png';

const PHOTOS = [
  { src: teamPhoto1, alt: 'NexusCareer team outdoors' },
  { src: teamPhoto2, alt: 'NexusCareer team selfie' },
  { src: teamPhoto3, alt: 'NexusCareer team mirror photo' },
];

export default function MadeByModal({ onClose }) {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef(null);

  const goTo = (i) => {
    const next = (i + PHOTOS.length) % PHOTOS.length;
    setIndex(next);
    scrollRef.current?.children[next]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[0];
    if (!child) return;
    const w = child.getBoundingClientRect().width;
    const i = Math.round(el.scrollLeft / w);
    if (i !== index && i >= 0 && i < PHOTOS.length) setIndex(i);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'color-mix(in srgb, var(--text) 40%, transparent)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Made by team"
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden page-enter"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--accent)' }}>
              Made by
            </p>
            <h3 className="text-base font-semibold" style={{ color: 'var(--text)' }}>
              NexusCareer Team
            </h3>
          </div>
          <button type="button" onClick={onClose} className="focus-ring w-8 h-8 rounded-full inline-flex items-center justify-center">
            <X size={16} />
          </button>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex overflow-x-auto snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PHOTOS.map((photo) => (
              <div key={photo.alt} className="w-full flex-shrink-0 snap-center">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full block"
                  style={{ maxHeight: '70vh', objectFit: 'contain', background: 'var(--bg-elevated)' }}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className="focus-ring absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full inline-flex items-center justify-center"
            style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)', border: '1px solid var(--border)' }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full inline-flex items-center justify-center"
            style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)', border: '1px solid var(--border)' }}
            aria-label="Next photo"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex justify-center gap-2 py-3">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Photo ${i + 1}`}
              className="focus-ring rounded-full"
              style={{
                width: i === index ? 20 : 6,
                height: 6,
                background: i === index ? 'var(--accent)' : 'var(--border-strong)',
                border: 'none',
                transition: 'width 280ms var(--ease-apple)',
              }}
            />
          ))}
        </div>

        <p className="text-xs text-center pb-3 px-4" style={{ color: 'var(--text-muted)' }}>
          Swipe or use arrows · {index + 1} / {PHOTOS.length}
        </p>
      </div>
    </div>
  );
}
