import { useState } from 'react';
import { Brain, Check } from 'lucide-react';
import RadarChart from './RadarChart';
import { SKILLS_DATA } from '../data';

export default function CareerProfiler({ visible, onComplete, showHeader = true }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    education: '',
    skills: [],
    passions: { technology: 50, arts: 50, business: 50, science: 50, social: 50, finance: 50, health: 50, education: 50 },
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
      onComplete(formData);
    }, 3000);
  };

  return (
    <section id="profiler" className="py-14 px-4 relative">
      <div className="max-w-5xl mx-auto">
        {showHeader && (
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-orbitron text-4xl sm:text-5xl font-bold mb-4 gradient-text">
              Map Your Career DNA
            </h2>
            <p className="text-gray-400 text-lg">Complete your mission briefing to unlock personalized insights</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step <= currentStep
                    ? 'bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] text-white'
                    : 'bg-white/10 text-gray-500'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] transition-all duration-500"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Quiz Steps */}
        <div className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          {/* Step 1: Identity */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="font-orbitron text-2xl font-bold text-[#00F5FF]">STEP 1: IDENTITY</h3>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="ui-input"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="ui-input"
                    placeholder="Your age"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Education Level</label>
                  <div className="flex flex-wrap gap-3">
                    {['High School', '12th Pass', 'Undergraduate', 'Graduate', 'Post Graduate', 'PhD'].map((edu) => (
                      <button
                        key={edu}
                        onClick={() => setFormData({ ...formData, education: edu })}
                        className={`ui-btn min-h-0 px-4 py-2 rounded-full border ${
                          formData.education === edu
                            ? 'bg-[#00F5FF] border-[#00F5FF] text-black'
                            : 'border-white/20 hover:border-[#00F5FF]'
                        }`}
                      >
                        {edu}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Skills Matrix */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="font-orbitron text-2xl font-bold text-[#00F5FF]">STEP 2: SKILLS MATRIX</h3>
              <p className="text-gray-400">Select all skills you possess (minimum 3)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {SKILLS_DATA.map((skill) => (
                  <button
                    key={skill.id}
                    onClick={() => handleSkillToggle(skill.id)}
                    className={`ui-btn min-h-0 px-3 py-2 rounded-xl text-sm border relative overflow-hidden ${
                      formData.skills.includes(skill.id)
                        ? 'bg-gradient-to-r from-[#00F5FF]/20 to-[#8B5CF6]/20 border-[#00F5FF] text-white pulse-glow'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    {formData.skills.includes(skill.id) && (
                      <Check className="absolute top-1 right-1 w-4 h-4 text-[#00F5FF]" />
                    )}
                    {skill.name}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500">Selected: {formData.skills.length} skills</p>
            </div>
          )}

          {/* Step 3: Passion Radar */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="font-orbitron text-2xl font-bold text-[#00F5FF]">STEP 3: PASSION RADAR</h3>
              <p className="text-gray-400">Adjust sliders to map your interests</p>
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <RadarChart
                  values={Object.values(formData.passions)}
                  labels={['Technology', 'Arts', 'Business', 'Science', 'Social', 'Finance', 'Health', 'Education']}
                />
                <div className="flex-1 space-y-4 w-full">
                  {Object.entries(formData.passions).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize">{key}</span>
                        <span className="text-[#00F5FF]">{value}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => handlePassionChange(key, parseInt(e.target.value))}
                        className="w-full accent-[#00F5FF]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Goals & Constraints */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="font-orbitron text-2xl font-bold text-[#00F5FF]">STEP 4: GOALS & CONSTRAINTS</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Expected Salary: ₹{(formData.salary / 100000).toFixed(1)}L/year
                  </label>
                  <input
                    type="range"
                    min="300000"
                    max="10000000"
                    step="100000"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) })}
                    className="w-full accent-[#00F5FF]"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹3L</span>
                    <span>₹1Cr+</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Work Style Preference</label>
                  <div className="flex gap-3">
                    {['remote', 'hybrid', 'onsite'].map((style) => (
                      <button
                        key={style}
                        onClick={() => setFormData({ ...formData, workStyle: style })}
                        className={`ui-btn flex-1 rounded-xl border capitalize ${
                          formData.workStyle === style
                            ? 'bg-[#00F5FF] border-[#00F5FF] text-black'
                            : 'border-white/20 hover:border-[#00F5FF]'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Timeline</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'immediate', label: 'Immediate' },
                      { id: '6months', label: '6 Months' },
                      { id: '1year', label: '1 Year' },
                      { id: 'longterm', label: 'Long-term' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setFormData({ ...formData, timeline: t.id })}
                        className={`ui-btn rounded-xl border ${
                          formData.timeline === t.id
                            ? 'bg-[#8B5CF6] border-[#8B5CF6] text-white'
                            : 'border-white/20 hover:border-[#8B5CF6]'
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

          {/* Step 5: Academic Snapshot */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="font-orbitron text-2xl font-bold text-[#00F5FF]">STEP 5: ACADEMIC SNAPSHOT</h3>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Strong Subjects</label>
                  <input
                    type="text"
                    value={formData.subjects}
                    onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                    className="ui-input"
                    placeholder="e.g., Mathematics, Computer Science, Physics"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">GPA / Percentage</label>
                  <input
                    type="text"
                    value={formData.gpa}
                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                    className="ui-input"
                    placeholder="e.g., 8.5 CGPA or 85%"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Extra-curricular Activities</label>
                  <textarea
                    value={formData.extracurricular}
                    onChange={(e) => setFormData({ ...formData, extracurricular: e.target.value })}
                    className="ui-textarea h-24 resize-none"
                    placeholder="Coding clubs, hackathons, sports, volunteering..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="ui-btn ui-btn-ghost px-6"
            >
              Previous
            </button>
            {currentStep < 5 ? (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                className="ui-btn ui-btn-primary px-6"
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleAnalyze}
                className="ui-btn ui-btn-primary px-8"
              >
                <Brain className="w-5 h-5" /> Analyze My Profile
              </button>
            )}
          </div>
        </div>

        {/* Analyzing Animation */}
        {isAnalyzing && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4 border-[#00F5FF]/20" />
                <div className="absolute inset-0 rounded-full border-4 border-t-[#00F5FF] animate-spin" />
                <Brain className="absolute inset-0 m-auto w-12 h-12 text-[#00F5FF] animate-pulse" />
              </div>
              <h3 className="font-orbitron text-2xl font-bold text-white mb-2">Analyzing Your Profile</h3>
              <p className="text-gray-400">NexusAI is mapping your career DNA...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
