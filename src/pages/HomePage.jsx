import { useEffect, useState } from 'react';
import {
  Navbar,
  HeroSection,
  CareerProfiler,
  CareerRecommendations,
  CareerExplorer,
  SkillGapAnalyzer,
  LearningResources,
  IndustryTrends,
  MentorshipConnect,
  CareerTimeline,
  Testimonials,
  Footer,
  ChatAssistant,
} from '../components';

export default function HomePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, [userProfile]);

  const handleProfileComplete = (profile) => {
    setUserProfile(profile);
    setTimeout(() => {
      document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  const handleCareerSelect = (career) => {
    setSelectedCareer(career);
    setTimeout(() => {
      document.getElementById('skillgap')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white overflow-x-hidden">
      <div className="grid-pattern fixed inset-0 pointer-events-none" />
      <div className="noise-overlay" />

      <div className="fixed top-0 left-0 right-0 h-1 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-[#00F5FF] via-[#8B5CF6] to-[#FF4D6D]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navbar scrolled={scrolled} />

      <main className="relative z-10">
        <HeroSection visible />

        <CareerProfiler onComplete={handleProfileComplete} visible={visibleSections.profiler} />

        {userProfile && (
          <>
            <CareerRecommendations
              userProfile={userProfile}
              onSelectCareer={handleCareerSelect}
              visible={visibleSections.recommendations}
            />

            <CareerExplorer visible={visibleSections.explorer} />

            {selectedCareer && (
              <SkillGapAnalyzer
                userSkills={userProfile.skills}
                targetCareer={selectedCareer}
                visible={visibleSections.skillgap}
              />
            )}

            <LearningResources visible={visibleSections.resources} />
            <IndustryTrends visible={visibleSections.trends} />
            <MentorshipConnect visible={visibleSections.mentorship} />
            <CareerTimeline visible={visibleSections.timeline} />
            <Testimonials visible={visibleSections.testimonials} />
          </>
        )}

        <Footer />
      </main>

      <ChatAssistant />
    </div>
  );
}
