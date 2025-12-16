import { Moon, SunMedium } from 'lucide-react';
import { useTheme } from '@/lib/theme';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-medium text-[var(--muted)] shadow-card transition hover:-translate-y-0.5 hover:text-primary-500"
    >
      {isDark ? <SunMedium className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
};

export default ThemeToggle;
