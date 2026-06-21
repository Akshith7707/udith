import { useEffect, useState } from 'react';

export default function SectionNav({ sections }) {
  const [active, setActive] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className="sticky top-16 z-30 mb-8 -mx-4 px-4 py-3 overflow-x-auto"
      style={{
        background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
      aria-label="Page sections"
    >
      <div className="flex gap-1 min-w-max max-w-6xl mx-auto">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            className={`ui-chip ${active === id ? 'ui-chip-active' : ''}`}
            style={{ fontSize: '0.8125rem' }}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
