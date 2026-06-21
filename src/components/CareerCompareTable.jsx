import { Link } from 'react-router-dom';
import { CAREER_PATHS } from '../data';
import { computeCareerMatch, computeReadiness } from '../lib/matchEngine';

export default function CareerCompareTable({ careerIds, profile, completedSkills }) {
  const careers = careerIds.map((id) => CAREER_PATHS.find((c) => c.id === id)).filter(Boolean);

  if (careers.length === 0) {
    return null;
  }

  const rows = [
    { label: 'Match score', fn: (c) => `${computeCareerMatch(c, profile, completedSkills).percent}%` },
    { label: 'Readiness', fn: (c) => `${computeReadiness(c, profile?.skills || [], completedSkills)}%` },
    { label: 'Salary', fn: (c) => c.salaryRange },
    { label: 'Trend', fn: (c) => c.trend },
    {
      label: 'Skills you have',
      fn: (c) =>
        c.requiredSkills.filter((s) => (profile?.skills || []).includes(s) || completedSkills.includes(s)).length,
    },
    {
      label: 'Skills to learn',
      fn: (c) =>
        c.requiredSkills.filter((s) => !(profile?.skills || []).includes(s) && !completedSkills.includes(s)).length,
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <th className="text-left py-3 pr-4" style={{ color: 'var(--text-muted)' }} />
            {careers.map((c) => (
              <th key={c.id} className="text-left py-3 px-3 font-semibold" style={{ color: 'var(--text)' }}>
                <span className="mr-2">{c.icon}</span>
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} style={{ borderBottom: '1px solid var(--border)' }}>
              <td className="py-3 pr-4" style={{ color: 'var(--text-muted)' }}>{row.label}</td>
              {careers.map((c) => (
                <td key={c.id} className="py-3 px-3" style={{ color: 'var(--text)' }}>
                  {row.fn(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-wrap gap-2 mt-6">
        {careers.map((c) => (
          <Link key={c.id} to={`/careers/${c.id}`} className="ui-btn ui-btn-secondary text-xs">
            View {c.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ComparePicker({ compareIds, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CAREER_PATHS.map((c) => {
        const active = compareIds.includes(c.id);
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onToggle(c.id)}
            className={`ui-chip ${active ? 'ui-chip-active' : ''}`}
          >
            {c.icon} {c.title}
          </button>
        );
      })}
    </div>
  );
}
