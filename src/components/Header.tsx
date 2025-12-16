import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { CTA_LINKS, NAV_ITEMS, SITE, UI_FLAGS } from '@/lib/constants';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [open, setOpen] = useState(false);
  const navItems = NAV_ITEMS.filter(
    (item) =>
      (item.id !== 'projects' || UI_FLAGS.showProjects) &&
      (item.id !== 'learning' || UI_FLAGS.showLearning),
  );

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-sm font-semibold uppercase text-white shadow-card overflow-hidden">
            <img src="/img/npf-logo.png" alt="Logo" className="h-full w-full object-cover" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">{SITE.name}</p>
            <p className="text-xs text-[var(--muted)]">{SITE.role}</p>
          </div>
        </div>

        <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm font-medium sm:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-[var(--muted)] transition hover:text-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          {CTA_LINKS.slice(0, 2).map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--muted)] transition hover:border-primary-200 hover:text-primary-600"
            >
              {cta.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] sm:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--card)] sm:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-4 text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="py-2 text-[var(--muted)] transition hover:text-primary-500"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex items-center gap-3">
              {CTA_LINKS.slice(0, 2).map((cta) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--muted)] transition hover:border-primary-200 hover:text-primary-600"
                >
                  {cta.label}
                </a>
              ))}
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
