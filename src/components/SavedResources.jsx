import { RESOURCES } from '../data';
import { useProfile } from '../lib/useProfile';
import Card from './Card';
import EmptyState from './EmptyState';
import Reveal from './Reveal';

export default function SavedResources() {
  const { bookmarks } = useProfile();

  const items = bookmarks
    .map((key) => {
      const dashIdx = key.indexOf('-');
      if (dashIdx === -1) return null;
      const category = key.slice(0, dashIdx);
      const id = Number(key.slice(dashIdx + 1));
      const resource = RESOURCES[category]?.find((r) => r.id === id);
      if (!resource) return null;
      return { ...resource, category, key };
    })
    .filter(Boolean);

  if (items.length === 0) {
    return (
      <EmptyState
        icon="📚"
        title="No saved resources"
        description="Bookmark courses and books from the resources page."
        actionLabel="Browse resources"
        actionTo="/resources"
      />
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <Reveal key={item.key} delay={i * 0.04}>
          <Card className="p-5 h-full">
            <div className="text-2xl mb-2">{item.icon}</div>
            <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{item.title}</h3>
            <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{item.category} · {item.platform}</p>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}
