import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/useTheme';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`focus-ring inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors ${className}`}
      style={{
        color: 'var(--text)',
        background: 'transparent',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-elevated)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <span
        className="relative inline-block w-[18px] h-[18px]"
        style={{ transition: 'transform 400ms var(--ease-spring)' }}
      >
        <Sun
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: isDark ? 0 : 1 }}
          size={18}
        />
        <Moon
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: isDark ? 1 : 0 }}
          size={18}
        />
      </span>
    </button>
  );
}
