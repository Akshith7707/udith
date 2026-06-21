export default function CircularProgress({
  percent,
  size = 120,
  strokeWidth = 8,
  color,
  trackColor,
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, percent)) / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="-rotate-90"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={trackColor || 'var(--border)'}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color || 'var(--accent)'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transition: 'stroke-dashoffset 900ms var(--ease-apple), stroke 300ms var(--ease-apple)',
        }}
      />
    </svg>
  );
}
