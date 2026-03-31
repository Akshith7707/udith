import { useState, useEffect } from 'react';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleCanvas from './ParticleCanvas';

const heroWords = ['DESTINY', 'PURPOSE', 'CALLING', 'FUTURE'];
const heroColors = ['#00F5FF', '#8B5CF6', '#FF4D6D', '#10B981'];
const orbitRoles = ['Software Engineer', 'Data Scientist', 'UX Designer', 'Product Manager', 'AI Researcher', 'Entrepreneur'];

export default function HeroSection({ visible }) {
  const [heroWordIndex, setHeroWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleCanvas />

      {/* Floating Career Badges - Desktop Only */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {orbitRoles.map((role, i) => (
          <div
            key={role}
            className="absolute left-1/2 top-1/2 glass px-4 py-2 rounded-full text-sm font-medium"
            style={{
              animation: `orbit ${20 + i * 5}s linear infinite`,
              animationDelay: `${i * -3}s`,
              transform: `rotate(${i * 60}deg) translateX(${280 + i * 30}px) rotate(-${i * 60}deg)`,
            }}
          >
            {role}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h1 className="font-orbitron text-5xl sm:text-6xl lg:text-8xl font-black mb-4">
            <span className="text-white">FIND YOUR</span>
            <br />
            <span
              className="typewriter-cursor inline-block transition-all duration-500"
              style={{ color: heroColors[heroWordIndex] }}
            >
              {heroWords[heroWordIndex]}
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            AI-powered career intelligence. Built for the ambitious.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/profiler"
              className="ui-btn ui-btn-primary px-8 py-4 font-orbitron text-base sm:text-lg"
            >
              Begin Your Journey <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/careers" className="ui-btn ui-btn-ghost px-8 py-4 font-orbitron text-base sm:text-lg">
              <Play className="w-5 h-5" /> Watch Demo
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-[#00F5FF]" />
        </div>
      </div>
    </section>
  );
}
