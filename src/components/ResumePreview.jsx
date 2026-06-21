import { buildResumeData } from '../lib/buildResumeData';

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <h2
        className="text-[11px] font-bold tracking-wide uppercase pb-1 mb-2"
        style={{ color: '#1d1d1f', borderBottom: '1px solid #333' }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function ResumePreview({ resume }) {
  if (!resume) return null;

  const contact = [resume.location, resume.phone, resume.email, resume.linkedin, resume.github]
    .filter(Boolean)
    .join('  |  ');

  return (
    <article
      className="mx-auto text-left shadow-lg"
      style={{
        maxWidth: '210mm',
        background: '#fff',
        color: '#1d1d1f',
        padding: '14mm 14mm 16mm',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '10pt',
        lineHeight: 1.45,
      }}
    >
      <header className="mb-4">
        <h1 className="text-[17pt] font-bold tracking-tight mb-1.5" style={{ color: '#141414' }}>
          {resume.name}
        </h1>
        <p className="text-[8.5pt]" style={{ color: '#444' }}>
          {contact}
        </p>
      </header>

      <Section title="Professional Summary">
        <p className="text-[9.5pt]" style={{ color: '#333' }}>
          {resume.summary}
        </p>
      </Section>

      <Section title="Education">
        {resume.education.map((edu) => (
          <div key={`${edu.school}-${edu.dates}`} className="mb-2.5">
            <div className="flex justify-between gap-4 text-[10pt] font-bold">
              <span>{edu.school}</span>
              <span className="font-normal text-[9.5pt] whitespace-nowrap">{edu.dates}</span>
            </div>
            <p className="text-[9.5pt]" style={{ color: '#333' }}>
              {[edu.degree, edu.gpa].filter(Boolean).join('  ')}
            </p>
            {edu.detail && (
              <p className="text-[9pt]" style={{ color: '#666' }}>
                {edu.detail}
              </p>
            )}
          </div>
        ))}
      </Section>

      {resume.experience?.length > 0 && (
        <Section title="Experience">
          {resume.experience.map((exp) => (
            <div key={exp.title} className="mb-3">
              <div className="flex justify-between gap-4 text-[10pt] font-bold">
                <span>{exp.title}</span>
                <span className="font-normal text-[9.5pt]">{exp.dates}</span>
              </div>
              <div className="flex justify-between gap-4 text-[9.5pt] mb-1">
                <span>{exp.company}</span>
                <span style={{ color: '#666' }}>{exp.location}</span>
              </div>
              <ul className="list-none space-y-1 pl-0">
                {exp.bullets.map((b) => (
                  <li key={b} className="text-[9.5pt] pl-3 relative" style={{ color: '#333' }}>
                    <span className="absolute left-0">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      <Section title="Projects">
        {resume.projects.map((proj) => (
          <div key={proj.title} className="mb-3">
            <div className="flex justify-between gap-3 items-start mb-1">
              <p className="text-[9.5pt] font-bold flex-1">
                {proj.title}  |  {proj.stack}
              </p>
              <span className="text-[9.5pt] whitespace-nowrap" style={{ color: '#444' }}>
                {proj.date}
              </span>
            </div>
            <ul className="list-none space-y-1">
              {proj.bullets.map((b) => (
                <li key={b} className="text-[9.5pt] pl-3 relative" style={{ color: '#333' }}>
                  <span className="absolute left-0">•</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Technical Skills">
        <div className="space-y-1">
          {Object.entries(resume.skills).map(([cat, items]) =>
            items?.length ? (
              <p key={cat} className="text-[9.5pt]" style={{ color: '#333' }}>
                <span className="font-bold">{cat}:</span> {items.join(', ')}
              </p>
            ) : null,
          )}
        </div>
      </Section>

      <Section title="Achievements">
        <ul className="list-none space-y-1">
          {resume.achievements.map((a) => (
            <li key={a} className="text-[9.5pt] pl-3 relative" style={{ color: '#333' }}>
              <span className="absolute left-0">•</span>
              {a}
            </li>
          ))}
        </ul>
      </Section>
    </article>
  );
}

export function ResumePreviewWrapper({ profile, career }) {
  const resume = buildResumeData(profile, career);
  return <ResumePreview resume={resume} />;
}
