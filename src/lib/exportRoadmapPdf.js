import { jsPDF } from 'jspdf';
import { CAREER_PATHS, SKILLS_DATA } from '../data';
import { computeCareerMatch, computeReadiness } from './matchEngine';
import { buildPersonalizedRoadmap } from './buildRoadmap';

export function exportRoadmapPdf({ profile, selectedCareerId, milestones, completedSkills = [], roadmap: prebuilt }) {
  const doc = new jsPDF();
  const career = CAREER_PATHS.find((c) => c.id === selectedCareerId) || CAREER_PATHS[0];
  const { percent, breakdown } = computeCareerMatch(career, profile, completedSkills);
  const readiness = computeReadiness(career, profile.skills || [], completedSkills);
  const roadmap = prebuilt || buildPersonalizedRoadmap({
    careerId: selectedCareerId,
    profile,
    completedSkills,
    userMilestones: milestones,
  });

  let y = 20;
  const line = (text, size = 11, bold = false) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    const wrapped = doc.splitTextToSize(String(text), 170);
    doc.text(wrapped, 20, y);
    y += wrapped.length * (size * 0.45) + 4;
  };

  line('NexusCareer — Detailed Roadmap', 18, true);
  line(`Prepared for ${profile.name || 'You'} · Target: ${career.title}`, 11);
  line(`${percent}% match · ${readiness}% readiness · Skills ${breakdown.skills}% · Passion ${breakdown.passion}%`, 10);
  y += 4;

  line('5-Year Milestones', 13, true);
  roadmap.milestones.forEach((ms) => {
    line(`${ms.label} — ${ms.title}`, 11, true);
    line(ms.description, 10);
    if (ms.userNote) line(`Note: ${ms.userNote}`, 10);
    (ms.goals || []).slice(0, 3).forEach((g) => line(`  • ${g}`, 9));
    y += 2;
  });

  line('90-Day Plan', 13, true);
  roadmap.phases.forEach((phase, i) => {
    line(`Phase ${i + 1}: ${phase.title} (${phase.period})`, 11, true);
    phase.weeks.forEach((week) => {
      line(`Week ${week.week}: ${week.title}`, 10, true);
      week.tasks.forEach((t) => line(`  • ${t}`, 9));
    });
    y += 2;
  });

  line('Learning Resources', 13, true);
  [...roadmap.featured, ...roadmap.learnNext].slice(0, 8).forEach((res) => {
    line(`• ${res.title} — ${res.platform}`, 9);
    if (res.url) line(`  ${res.url}`, 8);
  });

  line('Skill Gaps', 13, true);
  const missing = career.requiredSkills.filter(
    (s) => !(profile.skills || []).includes(s) && !completedSkills.includes(s),
  );
  missing.forEach((id) => {
    const name = SKILLS_DATA.find((s) => s.id === id)?.name || id;
    line(`• ${name}`, 10);
  });

  doc.save(`nexuscareer-roadmap-${career.id}.pdf`);
}
