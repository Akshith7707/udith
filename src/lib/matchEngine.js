const DOMAIN_PASSION_MAP = {
  tech: ['technology', 'science'],
  design: ['arts', 'technology'],
  business: ['business', 'finance'],
  finance: ['finance', 'business'],
  science: ['science', 'technology'],
  healthcare: ['health', 'science'],
  media: ['arts', 'social'],
  education: ['education', 'social'],
};

const TIMELINE_SCORE = {
  immediate: { immediate: 100, '6months': 80, '1year': 60, longterm: 40 },
  '6months': { immediate: 90, '6months': 100, '1year': 85, longterm: 70 },
  '1year': { immediate: 70, '6months': 85, '1year': 100, longterm: 90 },
  longterm: { immediate: 50, '6months': 70, '1year': 85, longterm: 100 },
};

const EDUCATION_RANK = {
  'High School': 1,
  '12th Pass': 2,
  Undergraduate: 3,
  Graduate: 4,
  'Post Graduate': 5,
  PhD: 6,
};

const CAREER_EDUCATION_MIN = {
  swe: 2,
  ds: 3,
  pm: 3,
  ux: 2,
  consultant: 4,
  ai: 4,
};

function skillScore(career, userSkills, completedSkills) {
  const all = new Set([...userSkills, ...completedSkills]);
  const required = career.requiredSkills || [];
  if (required.length === 0) return 0;
  const matched = required.filter((s) => all.has(s)).length;
  return (matched / required.length) * 100;
}

function passionScore(career, passions) {
  const keys = career.passionKeys || DOMAIN_PASSION_MAP[career.domain] || ['technology'];
  if (!passions || keys.length === 0) return 50;
  const avg = keys.reduce((sum, k) => sum + (passions[k] || 0), 0) / keys.length;
  return avg;
}

function salaryScore(career, expectedSalary) {
  const min = career.salaryMin || 400000;
  const max = career.salaryMax || 5000000;
  if (expectedSalary >= min && expectedSalary <= max) return 100;
  if (expectedSalary < min) return Math.max(20, 100 - ((min - expectedSalary) / min) * 60);
  return Math.max(40, 100 - ((expectedSalary - max) / max) * 40);
}

function timelineScore(career, userTimeline) {
  const careerTimeline = career.idealTimeline || '6months';
  const table = TIMELINE_SCORE[userTimeline] || TIMELINE_SCORE['6months'];
  return table[careerTimeline] ?? 70;
}

function educationScore(career, education) {
  const userRank = EDUCATION_RANK[education] || 2;
  const minRank = CAREER_EDUCATION_MIN[career.id] || 2;
  if (userRank >= minRank) return 100;
  return Math.max(30, (userRank / minRank) * 100);
}

export function computeCareerMatch(career, profile, completedSkills = []) {
  if (!profile) return { percent: 0, breakdown: {} };

  const skills = skillScore(career, profile.skills || [], completedSkills);
  const passion = passionScore(career, profile.passions);
  const salary = salaryScore(career, profile.salary || 1000000);
  const timeline = timelineScore(career, profile.timeline || '6months');
  const education = educationScore(career, profile.education || 'Undergraduate');

  const percent = Math.round(
    skills * 0.4 + passion * 0.25 + salary * 0.15 + timeline * 0.1 + education * 0.1,
  );

  return {
    percent: Math.min(99, Math.max(0, percent)),
    breakdown: {
      skills: Math.round(skills),
      passion: Math.round(passion),
      salary: Math.round(salary),
      timeline: Math.round(timeline),
      education: Math.round(education),
    },
  };
}

export function rankCareers(careers, profile, completedSkills = []) {
  return careers
    .map((career) => {
      const { percent, breakdown } = computeCareerMatch(career, profile, completedSkills);
      return { career, percent, breakdown };
    })
    .sort((a, b) => b.percent - a.percent);
}

export function computeReadiness(career, userSkills, completedSkills = []) {
  const all = new Set([...userSkills, ...completedSkills]);
  const required = career.requiredSkills || [];
  if (required.length === 0) return 0;
  const matched = required.filter((s) => all.has(s)).length;
  return Math.round((matched / required.length) * 100);
}
