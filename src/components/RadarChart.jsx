export default function RadarChart({ values, labels }) {
  const size = 280;
  const center = size / 2;
  const radius = 110;
  const angleStep = (2 * Math.PI) / labels.length;

  const points = values.map((v, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = (v / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg
      width={size}
      height={size}
      className="mx-auto"
      aria-hidden="true"
      style={{ overflow: 'visible' }}
    >
      {[20, 40, 60, 80, 100].map((r) => (
        <circle
          key={r}
          cx={center}
          cy={center}
          r={(r / 100) * radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
        />
      ))}
      {labels.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angle)}
            y2={center + radius * Math.sin(angle)}
            stroke="var(--border)"
            strokeWidth="1"
          />
        );
      })}
      <path
        d={pathD}
        fill="var(--accent)"
        fillOpacity="0.14"
        stroke="var(--accent)"
        strokeWidth="1.5"
        style={{ transition: 'd 500ms var(--ease-apple)' }}
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="var(--accent)" />
      ))}
      {labels.map((label, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const labelR = radius + 24;
        return (
          <text
            key={i}
            x={center + labelR * Math.cos(angle)}
            y={center + labelR * Math.sin(angle)}
            fill="var(--text-muted)"
            fontSize="11"
            fontWeight="500"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}
