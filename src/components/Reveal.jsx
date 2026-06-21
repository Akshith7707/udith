import { useEffect, useRef } from 'react';
import { revealOnScroll } from '../lib/motion';

export default function Reveal({
  children,
  delay = 0,
  y = 12,
  duration = 0.6,
  className = '',
  style,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const cleanup = revealOnScroll(ref.current, { delay, y, duration });
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, [delay, y, duration]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: `translateY(${y}px)`, willChange: 'opacity, transform', ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
