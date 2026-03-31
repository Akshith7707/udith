import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials({ visible, compact = false }) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className={`${compact ? 'py-12' : 'py-20'} px-4`}>
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">Success Stories</h2>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
          >
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className="w-full flex-shrink-0 px-4">
                <div className="glass rounded-2xl p-8 text-center">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xl italic mb-6 text-gray-300">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold text-lg">{testimonial.author}</p>
                    <p className="text-[#00F5FF]">{testimonial.transition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === testimonialIndex ? 'bg-[#00F5FF] w-6' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
