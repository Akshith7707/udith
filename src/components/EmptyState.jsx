import { Link } from 'react-router-dom';

export default function EmptyState({ icon, title, description, actionLabel, actionTo, onAction }) {
  return (
    <div
      className="text-center py-14 px-6 rounded-2xl"
      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
    >
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
        {title}
      </h3>
      <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: 'var(--text-muted)' }}>
        {description}
      </p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="ui-btn ui-btn-primary">
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button type="button" onClick={onAction} className="ui-btn ui-btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
