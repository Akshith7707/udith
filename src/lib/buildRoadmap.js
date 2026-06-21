import { SKILLS_DATA } from '../data';
import {
  CAREER_ROADMAPS,
  MILESTONE_META,
  SKILL_LEARNING_RESOURCES,
} from '../data/roadmaps';

export function getResourcesForSkills(skillIds, limit = 6) {
  const seen = new Set();
  const out = [];
  for (const id of skillIds) {
    for (const res of SKILL_LEARNING_RESOURCES[id] || []) {
      const key = res.url;
      if (!seen.has(key)) {
        seen.add(key);
        out.push({ ...res, skillId: id, skillName: SKILLS_DATA.find((s) => s.id === id)?.name });
      }
    }
    if (out.length >= limit) break;
  }
  return out.slice(0, limit);
}

export function buildPersonalizedRoadmap({
  careerId,
  profile,
  completedSkills = [],
  userMilestones = {},
}) {
  const template = CAREER_ROADMAPS[careerId] || CAREER_ROADMAPS.swe;
  const userSkills = profile?.skills || [];
  const allHave = new Set([...userSkills, ...completedSkills]);

  const missingSkills = (profile?.skills
    ? Object.keys(SKILL_LEARNING_RESOURCES).filter((id) => !allHave.has(id))
    : []);

  const careerRequired = template.phases.flatMap((p) => p.weeks.flatMap((w) => w.skillIds));
  const priorityMissing = [...new Set(careerRequired)].filter((id) => !allHave.has(id));

  const milestones = MILESTONE_META.map((meta) => {
    const tpl = template.milestoneTemplates[meta.key] || {};
    return {
      ...meta,
      ...tpl,
      userNote: userMilestones[meta.key] || '',
    };
  });

  const phases = template.phases.map((phase) => ({
    ...phase,
    weeks: phase.weeks.map((week) => ({
      ...week,
      resources: getResourcesForSkills(week.skillIds.filter((id) => !allHave.has(id)), 3),
      skillsComplete: week.skillIds.filter((id) => allHave.has(id)).length,
      skillsTotal: week.skillIds.length,
    })),
  }));

  const learnNext = getResourcesForSkills(priorityMissing.length ? priorityMissing : careerRequired.slice(0, 3), 6);
  const featured = template.featuredResources || [];

  return {
    milestones,
    phases,
    learnNext,
    featured,
    missingSkillNames: priorityMissing.map((id) => SKILLS_DATA.find((s) => s.id === id)?.name).filter(Boolean),
    completedCount: completedSkills.length,
  };
}
