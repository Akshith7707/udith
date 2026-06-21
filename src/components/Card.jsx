export default function Card({
  hover = false,
  active = false,
  className = '',
  style,
  children,
  ...rest
}) {
  const base = hover ? 'ui-card ui-card-hover' : 'ui-card';
  return (
    <div
      className={`${base} ${className}`}
      style={{
        ...(active
          ? {
              borderColor: 'var(--accent)',
              boxShadow: '0 0 0 1px var(--accent), var(--shadow-md)',
            }
          : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
