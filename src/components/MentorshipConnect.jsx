import { useState } from 'react';
import { Star } from 'lucide-react';
import { MENTORS } from '../data';

export default function MentorshipConnect({ visible }) {
  const [expandedMentor, setExpandedMentor] = useState(null);

  return (
    <section id="mentorship" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Connect With Your Guide
          </h2>
          <p className="text-gray-400 text-lg">Learn from industry experts who've walked the path</p>
        </div>

        {/* Mentor Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {MENTORS.map((mentor) => (
            <div
              key={mentor.id}
              className="glass rounded-2xl p-6 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#FF4D6D] flex items-center justify-center font-orbitron font-bold text-xl">
                  {mentor.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{mentor.name}</h3>
                    {mentor.available && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                  </div>
                  <p className="text-gray-400 text-sm">
                    {mentor.title} at {mentor.company}
                  </p>
                  <p className="text-[#00F5FF] text-sm">{mentor.experience} years experience</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 my-4">
                {mentor.expertise.map((exp) => (
                  <span key={exp} className="px-3 py-1 bg-white/5 rounded-full text-xs">
                    {exp}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(mentor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-sm ml-1">{mentor.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">{mentor.reviews} reviews</span>
              </div>

              {expandedMentor === mentor.id && (
                <p className="text-gray-400 text-sm mb-4 animate-fadeIn">{mentor.bio}</p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setExpandedMentor(expandedMentor === mentor.id ? null : mentor.id)}
                  className="ui-btn ui-btn-ghost flex-1 text-sm"
                >
                  {expandedMentor === mentor.id ? 'Show Less' : 'View Profile'}
                </button>
                <button
                  className={`ui-btn flex-1 text-sm ${
                    mentor.available
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#FF4D6D] text-white'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!mentor.available}
                >
                  {mentor.available ? 'Book Session' : 'Unavailable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
