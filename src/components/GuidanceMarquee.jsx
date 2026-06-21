import Reveal from './Reveal';
import { GUIDANCE_USERS } from '../data/guidanceUsers';

function PersonCard({ person }) {
  return (
    <article
      className="guidance-card flex-shrink-0 relative overflow-hidden rounded-2xl"
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
          <div className="guidance-marquee-viewport" role="region" aria-label="People who took guidance">
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
