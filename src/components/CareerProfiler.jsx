import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import RadarChart from './RadarChart';
import Reveal from './Reveal';
import { SKILLS_DATA } from '../data';
import { useProfile } from '../lib/useProfile';

const STEPS = [
  { id: 1, label: 'Identity' },
  { id: 2, label: 'Skills' },
  { id: 3, label: 'Passion' },
  { id: 4, label: 'Goals' },
  { id: 5, label: 'Academics' },
];

export default function CareerProfiler({ onComplete, showHeader = true, redirectOnComplete = true }) {
  const navigate = useNavigate();
  const { setProfile, setSelectedCareer } = useProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    college: '',
    education: '',
    skills: [],
    passions: {
      technology: 50,
      arts: 50,
      business: 50,
      science: 50,
      social: 50,
      finance: 50,
      health: 50,
      education: 50,
    },
    salary: 1000000,
    workStyle: 'hybrid',
    timeline: '6months',
    subjects: '',
    gpa: '',
    extracurricular: '',
  });

  const handleSkillToggle = (skillId) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter((s) => s !== skillId)
        : [...prev.skills, skillId],
    }));
  };

  const handlePassionChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      passions: { ...prev.passions, [key]: value },
    }));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setProfile(formData);
      setSelectedCareer('swe');
      onComplete?.(formData);
      if (redirectOnComplete) navigate('/dashboard');
    }, 2400);
  };

  const fieldLabel = (text) => (
    <label
      className="block text-sm mb-2"
      style={{ color: 'var(--text-muted)', fontWeight: 500 }}
    >
      {text}
    </label>
  );

  return (
    <section id="profiler" className="section-y" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {showHeader && (
          <Reveal className="text-center mb-12">
            <p className="eyebrow mb-3">Profile</p>
            <h2 className="display-2" style={{ color: 'var(--text)' }}>
              Map your career DNA.
            </h2>
            <p
              className="mt-4 text-base max-w-xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              Five quick steps. Unlock personalized matches, skill gaps, and a roadmap.
            </p>
          </Reveal>
        )}

        <Reveal>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              {STEPS.map((step) => {
                const active = step.id <= currentStep;
                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center flex-1 text-center"
                    style={{ minWidth: 0 }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors"
                      style={{
                        background: active ? 'var(--accent)' : 'var(--bg-elevated)',
                        color: active ? '#fff' : 'var(--text-muted)',
                        border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                      }}
                    >
                      {step.id < currentStep ? <Check size={14} /> : step.id}
                    </div>
                    <span
                      className="mt-2 text-[11px]"
                      style={{ color: active ? 'var(--text)' : 'var(--text-faint)' }}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div
              className="h-[3px] rounded-full overflow-hidden"
              style={{ background: 'var(--bg-elevated)' }}
            >
              <div
                style={{
                  width: `${(currentStep / 5) * 100}%`,
                  height: '100%',
                  background: 'var(--accent)',
                  transition: 'width 400ms var(--ease-apple)',
                }}
              />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="ui-card p-6 sm:p-8 relative" style={{ boxShadow: 'var(--shadow-md)' }}>
            {currentStep === 1 && (
              <div className="space-y-6 page-enter">
                <h3 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
                  Tell us about you
                </h3>
                <div className="space-y-4">
                  <div>
                    {fieldLabel('Your name')}
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="ui-input"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    {fieldLabel('Age')}
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="ui-input"
                      placeholder="Your age"
                    />
                  </div>
                  <div>
                    {fieldLabel('Email')}
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="ui-input"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      {fieldLabel('Phone')}
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="ui-input"
                        placeholder="+91 XXXXXXXXXX"
                      />
                    </div>
                    <div>
                      {fieldLabel('City / location')}
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="ui-input"
                        placeholder="Hyderabad, Telangana"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      {fieldLabel('LinkedIn')}
                      <input
                        type="text"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        className="ui-input"
                        placeholder="linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      {fieldLabel('GitHub')}
                      <input
                        type="text"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        className="ui-input"
                        placeholder="github.com/username"
                      />
                    </div>
                  </div>
                  <div>
                    {fieldLabel('College / school (optional)')}
                    <input
                      type="text"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="ui-input"
                      placeholder="MVSR Engineering College"
                    />
                  </div>
                  <div>
                    {fieldLabel('Education level')}
                    <div className="flex flex-wrap gap-2">
                      {['High School', '12th Pass', 'Undergraduate', 'Graduate', 'Post Graduate', 'PhD'].map(
                        (edu) => (
                          <button
                            key={edu}
                            type="button"
                            onClick={() => setFormData({ ...formData, education: edu })}
                            className={`ui-chip ${
                              formData.education === edu ? 'ui-chip-active' : ''
                            }`}
                          >
                            {edu}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-5 page-enter">
                <h3 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
                  Pick your skills
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Select all skills you possess (minimum 3).
                </p>
                <div className="flex flex-wrap gap-2">
                  {SKILLS_DATA.map((skill) => {
                    const selected = formData.skills.includes(skill.id);
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => handleSkillToggle(skill.id)}
                        className={`ui-chip ${selected ? 'ui-chip-active' : ''}`}
                      >
                        {selected && <Check size={12} />}
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
                  Selected: {formData.skills.length} skill{formData.skills.length === 1 ? '' : 's'}
                </p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 page-enter">
                <h3 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
                  Your passion radar
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Adjust each slider to map your interests.
                </p>
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <RadarChart
                    values={Object.values(formData.passions)}
                    labels={['Technology', 'Arts', 'Business', 'Science', 'Social', 'Finance', 'Health', 'Education']}
                  />
                  <div className="flex-1 space-y-4 w-full">
                    {Object.entries(formData.passions).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="capitalize" style={{ color: 'var(--text)' }}>
                            {key}
                          </span>
                          <span style={{ color: 'var(--text-muted)' }}>{value}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={value}
                          onChange={(e) => handlePassionChange(key, parseInt(e.target.value, 10))}
                          className="w-full"
                          style={{ accentColor: 'var(--accent)' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6 page-enter">
                <h3 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
                  Goals and constraints
                </h3>
                <div className="space-y-6">
                  <div>
                    {fieldLabel(`Expected salary: ₹${(formData.salary / 100000).toFixed(1)}L / year`)}
                    <input
                      type="range"
                      min="300000"
                      max="10000000"
                      step="100000"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value, 10) })}
                      className="w-full"
                      style={{ accentColor: 'var(--accent)' }}
                    />
                    <div className="flex justify-between text-xs" style={{ color: 'var(--text-faint)' }}>
                      <span>₹3L</span>
                      <span>₹1Cr+</span>
                    </div>
                  </div>
                  <div>
                    {fieldLabel('Work style preference')}
                    <div className="flex gap-2">
                      {['remote', 'hybrid', 'onsite'].map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setFormData({ ...formData, workStyle: style })}
                          className={`ui-chip flex-1 justify-center capitalize ${
                            formData.workStyle === style ? 'ui-chip-active' : ''
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    {fieldLabel('Timeline')}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'immediate', label: 'Immediate' },
                        { id: '6months', label: '6 Months' },
                        { id: '1year', label: '1 Year' },
                        { id: 'longterm', label: 'Long-term' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeline: t.id })}
                          className={`ui-chip justify-center ${
                            formData.timeline === t.id ? 'ui-chip-active' : ''
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6 page-enter">
                <h3 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
                  Academic snapshot
                </h3>
                <div className="space-y-4">
                  <div>
                    {fieldLabel('Strong subjects')}
                    <input
                      type="text"
                      value={formData.subjects}
                      onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                      className="ui-input"
                      placeholder="e.g., Mathematics, Computer Science, Physics"
                    />
                  </div>
                  <div>
                    {fieldLabel('GPA / percentage')}
                    <input
                      type="text"
                      value={formData.gpa}
                      onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                      className="ui-input"
                      placeholder="e.g., 8.5 CGPA or 85%"
                    />
                  </div>
                  <div>
                    {fieldLabel('Extra-curricular activities')}
                    <textarea
                      value={formData.extracurricular}
                      onChange={(e) =>
                        setFormData({ ...formData, extracurricular: e.target.value })
                      }
                      className="ui-textarea"
                      placeholder="Coding clubs, hackathons, sports, volunteering..."
                    />
                  </div>
                </div>
              </div>
            )}

            <div
              className="flex items-center justify-between mt-8 pt-6"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="ui-btn ui-btn-ghost"
              >
                <ArrowLeft size={14} />
                Previous
              </button>
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                  className="ui-btn ui-btn-primary"
                >
                  Next
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button type="button" onClick={handleAnalyze} className="ui-btn ui-btn-primary">
                  <Brain size={16} />
                  Analyze profile
                </button>
              )}
            </div>
          </div>
        </Reveal>

        {isAnalyzing && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              animation: 'pageEnter 220ms var(--ease-apple)',
            }}
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-5 relative">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ border: '3px solid var(--border)' }}
                />
                <div
                  className="absolute inset-0 rounded-full spin"
                  style={{
                    border: '3px solid transparent',
                    borderTopColor: 'var(--accent)',
                  }}
                />
                <Brain
                  className="absolute inset-0 m-auto"
                  size={26}
                  style={{ color: 'var(--accent)' }}
                />
              </div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>
                Analyzing your profile
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Mapping your career DNA…
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
