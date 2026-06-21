import Reveal from './Reveal';

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  align = 'center',
  className = '',
  bg,
}) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center';
  return (
    <section
      id={id}
      className={`section-y ${className}`}
      style={{ background: bg || 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || subtitle) && (
          <Reveal className={`mb-12 ${alignClass}`}>
            {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
            {title && (
              <h2 className="display-2" style={{ color: 'var(--text)' }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="mt-4 text-base sm:text-lg max-w-2xl mx-auto"
                style={{ color: 'var(--text-muted)' }}
              >
                {subtitle}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
