import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import Reveal from './Reveal';
import Card from './Card';
import { TESTIMONIALS } from '../data';

export default function Testimonials({ compact = false }) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="testimonials"
      className="section-y"
      style={{
        background: 'var(--bg)',
        paddingTop: compact ? '3rem' : undefined,
        paddingBottom: compact ? '3rem' : undefined,
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <p className="eyebrow mb-3">Stories</p>
          <h2 className="display-2" style={{ color: 'var(--text)' }}>
            From our community.
          </h2>
        </Reveal>

        <Reveal>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform"
              style={{
                transform: `translateX(-${testimonialIndex * 100}%)`,
                transitionDuration: '700ms',
                transitionTimingFunction: 'var(--ease-apple)',
              }}
            >
              {TESTIMONIALS.map((testimonial, i) => (
                <div key={i} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <Card className="p-8 sm:p-12 text-center">
                    <Quote
                      size={26}
                      style={{ color: 'var(--text-faint)', margin: '0 auto 1rem' }}
                    />
                    <p
                      className="text-lg sm:text-xl mb-7 leading-relaxed"
                      style={{ color: 'var(--text)', letterSpacing: '-0.01em' }}
                    >
                      “{testimonial.quote}”
                    </p>
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} size={14} fill="#ff9f0a" style={{ color: '#ff9f0a' }} />
                      ))}
                    </div>
                    <p
                      className="font-semibold text-base"
                      style={{ color: 'var(--text)' }}
                    >
                      {testimonial.author}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {testimonial.transition}
                    </p>
                  </Card>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTestimonialIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className="focus-ring rounded-full"
                  style={{
                    height: '6px',
                    width: i === testimonialIndex ? '22px' : '6px',
                    background: i === testimonialIndex ? 'var(--accent)' : 'var(--border-strong)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'width 320ms var(--ease-apple), background-color 320ms var(--ease-apple)',
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
