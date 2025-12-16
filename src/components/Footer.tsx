import { Github, Linkedin, Mail, Shield } from 'lucide-react';
import { SITE } from '@/lib/constants';

const Footer = () => (
  <footer className="border-t border-[var(--border)] bg-[var(--card)]">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold">{SITE.name}</p>
          <p className="text-xs text-[var(--muted)]">Content version {SITE.contentVersion}</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <Shield className="h-4 w-4" aria-hidden="true" />
          Workflow automation focus: Rewst, n8n, Python, PowerShell across Azure/AWS.
        </div>
      </div>
      <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
        <a
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-2 hover:border-primary-200 hover:text-primary-600"
          href={SITE.github}
          target="_blank"
          rel="noreferrer"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
        </a>
        <a
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-2 hover:border-primary-200 hover:text-primary-600"
          href={SITE.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" />
          LinkedIn
        </a>
        <a
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-2 hover:border-primary-200 hover:text-primary-600"
          href={`mailto:${SITE.email}`}
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          {SITE.emailObfuscated}
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
