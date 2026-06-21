import { CAREER_PATHS, SKILLS_DATA } from '../data';
import { computeCareerMatch, computeReadiness } from './matchEngine';

export function buildChatContext(profile, selectedCareerId, completedSkills = []) {
  if (!profile) {
    return 'User has not completed the career profiler yet. Encourage them to complete it for personalized advice.';
  }

  const skillNames = (profile.skills || [])
    .map((id) => SKILLS_DATA.find((s) => s.id === id)?.name)
    .filter(Boolean);

  const career = CAREER_PATHS.find((c) => c.id === selectedCareerId);
  let careerBlock = 'No target career selected yet.';
  if (career) {
    const { percent, breakdown } = computeCareerMatch(career, profile, completedSkills);
    const readiness = computeReadiness(career, profile.skills || [], completedSkills);
    const missing = career.requiredSkills.filter(
      (s) => !(profile.skills || []).includes(s) && !completedSkills.includes(s),
    );
    const missingNames = missing
      .map((id) => SKILLS_DATA.find((s) => s.id === id)?.name)
      .filter(Boolean);

    careerBlock = `Target career: ${career.title}. Match: ${percent}% (skills ${breakdown.skills}%, passion ${breakdown.passion}%). Readiness: ${readiness}%. Missing skills: ${missingNames.join(', ') || 'none'}.`;
  }

  return [
    `User: ${profile.name || 'Anonymous'}, age ${profile.age || 'unknown'}, education: ${profile.education || 'unknown'}.`,
    `Skills: ${skillNames.join(', ') || 'none listed'}.`,
    `Salary goal: ₹${((profile.salary || 0) / 100000).toFixed(1)}L/year. Work style: ${profile.workStyle}. Timeline: ${profile.timeline}.`,
    careerBlock,
    'Focus on actionable advice for the Indian job market. Keep responses under 150 words.',
  ].join(' ');
}
