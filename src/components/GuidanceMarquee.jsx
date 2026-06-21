import { useCallback, useEffect, useRef } from 'react';
import Reveal from './Reveal';
import { GUIDANCE_USERS } from '../data/guidanceUsers';

function PersonCard({ person }) {
  return (
    <article
      className="guidance-card flex-shrink-0 relative overflow-hidden rounded-2xl snap-center"
      style={{
        width: '168px',
        height: '220px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <img
        src={person.image}
        alt={person.name}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        loading="lazy"
        draggable={false}
      />
      <div
        className="absolute inset-x-0 bottom-0 px-3 py-3 pt-10 pointer-events-none select-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
        }}
      >
        <p className="text-sm font-semibold leading-tight text-white">{person.name}</p>
        <p className="text-[11px] mt-0.5 text-white/80">{person.role}</p>
      </div>
    </article>
  );
}

export default function GuidanceMarquee() {
  const loop = [...GUIDANCE_USERS, ...GUIDANCE_USERS];
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const resumeTimerRef = useRef(null);

  const pauseAuto = useCallback((ms = 3500) => {
    pausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, ms);
  }, []);

  const loopScroll = useCallback((el) => {
    const half = el.scrollWidth / 2;
    if (half > 0 && el.scrollLeft >= half - 1) el.scrollLeft -= half;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        loopScroll(el);
        pauseAuto();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    let raf = 0;
    const tick = () => {
      if (!pausedRef.current && !draggingRef.current && el.scrollWidth > el.clientWidth + 1) {
        el.scrollLeft += 0.7;
        loopScroll(el);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(raf);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [pauseAuto, loopScroll]);

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;
    draggingRef.current = true;
    pausedRef.current = true;
    dragStartRef.current = { x: e.clientX, scrollLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    el.classList.add('is-dragging');
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = dragStartRef.current.scrollLeft - (e.clientX - dragStartRef.current.x);
  };

  const endDrag = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const el = scrollRef.current;
    el?.classList.remove('is-dragging');
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    loopScroll(el);
    pauseAuto();
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el || draggingRef.current) return;
    loopScroll(el);
  };

  return (
    <section
      id="guidance-taken"
      className="section-y"
      style={{ background: 'var(--bg-subtle)', paddingTop: '3.5rem', paddingBottom: '3.5rem' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <Reveal className="text-center">
          <p className="eyebrow mb-3">Community</p>
          <h2 className="display-2" style={{ color: 'var(--text)' }}>
            Guidance taken by people
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Professionals across India used NexusCareer to plan their next move.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <div className="guidance-marquee-mask">
          <div
            ref={scrollRef}
            className="guidance-marquee-scroll"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onScroll={onScroll}
            onTouchStart={() => pauseAuto(5000)}
            role="region"
            aria-label="People who took guidance"
            tabIndex={0}
          >
            <div className="guidance-marquee-track flex items-stretch gap-4">
              {loop.map((person, i) => (
                <PersonCard key={`${person.id}-${i}`} person={person} />
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
