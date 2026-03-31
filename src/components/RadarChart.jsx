export default function RadarChart({ values, labels }) {
  const size = 300;
  const center = size / 2;
  const radius = 120;
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
    <svg width={size} height={size} className="mx-auto">
      {/* Grid circles */}
      {[20, 40, 60, 80, 100].map((r) => (
        <circle
          key={r}
          cx={center}
          cy={center}
          r={(r / 100) * radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
      ))}
      {/* Axis lines */}
      {labels.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + radius * Math.cos(angle)}
            y2={center + radius * Math.sin(angle)}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        );
      })}
      {/* Data polygon */}
      <path
        d={pathD}
        fill="rgba(0, 245, 255, 0.2)"
        stroke="#00F5FF"
        strokeWidth="2"
        className="transition-all duration-500"
      />
      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill="#00F5FF" className="drop-shadow-[0_0_8px_#00F5FF]" />
      ))}
      {/* Labels */}
      {labels.map((label, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const labelR = radius + 30;
        return (
          <text
            key={i}
            x={center + labelR * Math.cos(angle)}
            y={center + labelR * Math.sin(angle)}
            fill="#94a3b8"
            fontSize="11"
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
