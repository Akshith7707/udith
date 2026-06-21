import { SKILLS_DATA } from '../data';
import { generateResumePdf } from './generateResumePdf';
import {
  CAREER_RESUME_CONTENT,
  SKILL_CATEGORY_MAP,
  collegeName,
  educationLabel,
  timelineToDates,
} from './resumeTemplates';

function slugify(name) {
  return (name || 'user')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function buildSkills(profile, careerId) {
  const content = CAREER_RESUME_CONTENT[careerId] || CAREER_RESUME_CONTENT.swe;
  const categories = { ...content.skillExtras };

  for (const id of profile.skills || []) {
    const skill = SKILLS_DATA.find((s) => s.id === id);
    if (!skill) continue;
    const cat = SKILL_CATEGORY_MAP[id] || 'Core Strengths';
    if (!categories[cat]) categories[cat] = [];
    if (!categories[cat].includes(skill.name)) categories[cat].push(skill.name);
  }

  return categories;
}

function parseExtracurricular(text) {
  if (!text?.trim()) return [];
  return text
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);
}

export function buildResumeData(profile, career) {
  const careerId = career?.id || 'swe';
  const content = CAREER_RESUME_CONTENT[careerId] || CAREER_RESUME_CONTENT.swe;
  const dates = timelineToDates(profile.timeline);
  const name = profile.name || 'Your Name';
  const slug = slugify(name.split(' ')[0]);

  const achievements = [
    ...parseExtracurricular(profile.extracurricular),
    'Participated in hackathons and collaborative software development projects.',
    'Actively contributed to technical clubs by organizing coding events and workshops.',
  ].slice(0, 4);

  return {
    name: name.toUpperCase(),
    location: profile.location || 'City, State',
    phone: profile.phone || '+91 XXXXXXXXXX',
    email: profile.email || `${slug}@email.com`,
    linkedin: profile.linkedin || `linkedin.com/in/${slug}`,
    github: profile.github || `github.com/${slug}`,
    summary: content.summary.replace(
      'job seekers',
      `${career?.title || 'professional'} aspirants`,
    ),
    education: [
      {
        school: profile.college || collegeName(profile.education),
        degree: educationLabel(profile.education, profile.subjects),
        dates: `${dates.start} – ${dates.end}`,
        gpa: profile.gpa ? `CPI: ${profile.gpa.replace(/cgpa|gpa/gi, '').trim()}` : '',
        detail: profile.subjects || '',
      },
      ...(profile.education === 'Undergraduate' || profile.education === 'Graduate'
        ? [
            {
              school: 'Senior Secondary School',
              degree: 'Higher Secondary (12th)',
              dates: `${parseInt(dates.start, 10) - 3} – ${parseInt(dates.start, 10) - 1}`,
              gpa: '',
              detail: profile.subjects || 'Science & Mathematics',
            },
          ]
        : []),
    ],
    experience: [
      {
        title: content.experience.title,
        company: content.experience.company,
        dates: 'Recent',
        location: profile.workStyle === 'remote' ? 'Remote' : 'Hybrid',
        bullets: content.experience.bullets,
      },
    ],
    projects: content.projects.map((p, i) => ({
      ...p,
      date: ['Feb 2026', 'Dec 2025', 'Apr 2026', 'Mar 2025'][i] || '2025',
    })),
    skills: buildSkills(profile, careerId),
    achievements,
    targetRole: career?.title || 'Professional',
  };
}

export function downloadResumePdf(profile, career) {
  generateResumePdf(buildResumeData(profile, career));
}
