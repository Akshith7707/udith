import { useState } from 'react';
import { Star } from 'lucide-react';
import Reveal from './Reveal';
import Card from './Card';
import BookingModal from './BookingModal';
import { MENTORS } from '../data';

export default function MentorshipConnect() {
  const [expandedMentor, setExpandedMentor] = useState(null);
  const [bookingMentor, setBookingMentor] = useState(null);

  return (
    <section id="mentorship" className="section-y" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="eyebrow mb-3">Mentors</p>
          <h2 className="display-2" style={{ color: 'var(--text)' }}>
            Learn from those who walked it.
          </h2>
          <p
            className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            Book a session with industry experts who guide you 1:1.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {MENTORS.map((mentor, i) => {
            const expanded = expandedMentor === mentor.id;
            return (
              <Reveal key={mentor.id} delay={i * 0.05}>
                <Card hover className="p-6 h-full flex flex-col">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center font-semibold text-base flex-shrink-0"
                      style={{
                        background: 'var(--bg-elevated)',
                        color: 'var(--text)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {mentor.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          className="font-semibold text-base"
                          style={{ color: 'var(--text)' }}
                        >
                          {mentor.name}
                        </h3>
                        {mentor.available && (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                            style={{
                              color: 'var(--success)',
                              background: 'color-mix(in srgb, var(--success) 14%, transparent)',
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: 'var(--success)' }}
                            />
                            Available
                          </span>
                        )}
                      </div>
                      <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {mentor.title} · {mentor.company}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
                        {mentor.experience} years experience
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 my-4">
                    {mentor.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="px-2.5 py-1 rounded-full text-[11px]"
                        style={{
                          background: 'var(--bg-elevated)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {exp}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex items-center gap-3 mb-4 text-sm"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={13}
                          fill={idx < Math.floor(mentor.rating) ? '#ff9f0a' : 'transparent'}
                          style={{
                            color: idx < Math.floor(mentor.rating) ? '#ff9f0a' : 'var(--border-strong)',
                          }}
                        />
                      ))}
                      <span className="ml-1.5" style={{ color: 'var(--text)' }}>
                        {mentor.rating}
                      </span>
                    </div>
                    <span>{mentor.reviews} reviews</span>
                  </div>

                  {expanded && (
                    <p
                      className="text-sm mb-4 leading-relaxed page-enter"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {mentor.bio}
                    </p>
                  )}

                  <div className="flex gap-2 mt-auto">
                    <button
                      type="button"
                      onClick={() => setExpandedMentor(expanded ? null : mentor.id)}
                      className="ui-btn ui-btn-ghost flex-1"
                      style={{ fontSize: '0.8125rem' }}
                    >
                      {expanded ? 'Show less' : 'View profile'}
                    </button>
                    <button
                      type="button"
                      className="ui-btn ui-btn-primary flex-1"
                      style={{ fontSize: '0.8125rem' }}
                      disabled={!mentor.available}
                      onClick={() => mentor.available && setBookingMentor(mentor)}
                    >
                      {mentor.available ? 'Book session' : 'Unavailable'}
                    </button>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
      {bookingMentor && <BookingModal mentor={bookingMentor} onClose={() => setBookingMentor(null)} />}
    </section>
  );
}
