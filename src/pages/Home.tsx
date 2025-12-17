import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  CloudCog,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import Section from '@/components/Section';
import { SITE, UI_FLAGS } from '@/lib/constants';
import { learningContent, projectsContent, skillsContent } from '@/lib/content';
import { getGitHubProfile, getRecentRepos, type GitHubProfile, type GitHubRepo } from '@/lib/github';
import type { SkillLevel } from '@/lib/schema';

const levelTone: Record<SkillLevel, Parameters<typeof Badge>[0]['tone']> = {
  foundation: 'info',
  working: 'default',
  advanced: 'success',
  expert: 'warning',
};

const levelLabel: Record<SkillLevel, string> = {
  foundation: 'Foundation',
  working: 'Working',
  advanced: 'Advanced',
  expert: 'Expert',
};

const heroStats = [
  { label: 'Workflow automation', value: 'Rewst / n8n / Power Automate', icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" /> },
  { label: 'Cloud automation', value: 'Azure / AWS / GWS', icon: <CloudCog className="h-4 w-4" aria-hidden="true" /> },
  { label: 'Service reliability', value: 'Approvals / audit / SLO-aware', icon: <Sparkles className="h-4 w-4" aria-hidden="true" /> },
];

const capabilityIconFor = (capability: string) => {
  const normalized = capability.toLowerCase();
  if (normalized.includes('orchestration')) return <Layers className="h-4 w-4 text-primary-500" aria-hidden="true" />;
  if (normalized.includes('cloud')) return <CloudCog className="h-4 w-4 text-primary-500" aria-hidden="true" />;
  if (normalized.includes('identity') || normalized.includes('security')) return <ShieldCheck className="h-4 w-4 text-primary-500" aria-hidden="true" />;
  if (normalized.includes('api') || normalized.includes('integration')) return <Sparkles className="h-4 w-4 text-primary-500" aria-hidden="true" />;
  if (normalized.includes('reliability')) return <Rocket className="h-4 w-4 text-primary-500" aria-hidden="true" />;
  return <Layers className="h-4 w-4 text-primary-500" aria-hidden="true" />;
};

type HeroProps = {
  onOpenCV: () => void;
  cvButtonRef: React.RefObject<HTMLButtonElement | null>;
};

const HeroStats = ({ className = '' }: { className?: string }) => (
  <div
    className={`relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-primary-500/12 via-primary-500/6 to-indigo-500/12 p-4 shadow-card backdrop-blur ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/0 dark:from-white/5" />
    <div className="relative grid gap-3 sm:grid-cols-3">
      {heroStats.map((item) => (
        <div key={item.label} className="flex items-center gap-3 rounded-xl bg-[var(--card)]/50 px-3 py-2 shadow-sm ring-1 ring-[var(--border)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100">
            {item.icon}
          </div>
          <div>
            <p className="text-xs text-[var(--muted)]">{item.label}</p>
            <p className="text-sm font-semibold">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Hero = ({ onOpenCV, cvButtonRef }: HeroProps) => (
  <section
    id="hero"
    className="relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50 pb-16 pt-14 dark:from-[#0c1229] dark:via-[#0b1021] dark:to-[#0d132e]"
  >
    <div className="absolute inset-0 bg-hero bg-cover bg-center opacity-35 dark:opacity-30" />
    <div className="absolute inset-0 bg-gradient-to-br from-white/88 via-white/80 to-white/82 dark:from-[#0c1229]/92 dark:via-[#0b1021]/90 dark:to-[#0d132e]/88" />
    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="flex flex-col gap-6">
          <span className="tag w-fit">Automation-led delivery</span>
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.12em] text-primary-700 dark:text-primary-200">
              {SITE.role}
            </p>
            <h1 className="max-w-3xl text-3xl font-semibold sm:text-4xl">
              {SITE.name} - building multi-tenant automation and systems that stay reliable as they
              scale.
            </h1>
            <p className="max-w-3xl text-base text-[var(--muted)]">{SITE.summary}</p>
            <div className="flex flex-wrap gap-2">
              {SITE.focusAreas.map((area) => (
                <Badge key={area}>{area}</Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary-500"
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              View GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              ref={cvButtonRef}
              type="button"
              onClick={onOpenCV}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-semibold text-[var(--muted)] shadow-card transition hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-600"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              View CV (PDF-ready)
            </button>
            <a
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-semibold text-[var(--muted)] shadow-card transition hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-600"
              href={`mailto:${SITE.email}`}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Say hello
            </a>
          </div>

          <HeroStats className="lg:hidden" />
        </div>

        <HeroStats className="hidden lg:block" />
      </div>
    </div>
  </section>
);

const About = () => (
  <Section
    id="about"
    title="Engineering approach"
    eyebrow="About"
    description="Automation-focused delivery for MSP environments - composable workflows with approvals, auditability, and predictable performance. B.Sc. Computer Systems & Networking; based in Colombo, Sri Lanka."
  >
    <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Who I am" subtitle="Personal snapshot">
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            I&apos;m Naveen Fernando, an Automation & Systems Engineer in Colombo. I build workflow
            automation for MSP environments with Rewst, n8n, Python, and PowerShell, and keep
            cloud automation lean across Azure and AWS. I value composability, safety, and clear
            guardrails so teams can move fast without surprises.
          </p>
        </Card>
        <Card title="Principles" subtitle="How I approach systems">
          <ul className="space-y-2">
            <li>Automations are products: versioned, observable, and reversible.</li>
            <li>Tenant boundaries and approvals are first-class to keep MSP operations safe.</li>
            <li>Accessibility and performance stay in scope even for internal tools.</li>
            <li>Guardrails beat gates - defaults should make the safe path the easy path.</li>
          </ul>
        </Card>
        <Card title="Delivery style" subtitle="Working with teams">
          <ul className="space-y-2">
            <li>Start with discovery and effort estimates; ship small, reversible increments.</li>
            <li>Document trade-offs so future contributors know why choices were made.</li>
            <li>Instrument flows with telemetry and cost signals so ROI stays visible.</li>
            <li>Design for change with feature flags, schema validation, and contract tests.</li>
          </ul>
        </Card>
        <Card title="Experience & education" subtitle="From LinkedIn profile">
          <ul className="space-y-2">
            <li className="flex flex-col">
              <span className="font-semibold">Systems Engineer | Offshore IT Solutions</span>
              <span className="text-xs text-[var(--muted)]">May 2025 - Present | Remote (Rewst, AWS automation)</span>
            </li>
            <li className="flex flex-col">
              <span className="font-semibold">Associate Systems Engineer | Offshore IT Solutions</span>
              <span className="text-xs text-[var(--muted)]">Oct 2023 - May 2025 | Sri Lanka (Rewst, PowerShell)</span>
            </li>
            <li className="flex flex-col">
              <span className="font-semibold">Systems Support Technician</span>
              <span className="text-xs text-[var(--muted)]">Apr 2023 - Oct 2023 | Sri Lanka</span>
            </li>
            <li className="flex flex-col">
              <span className="font-semibold">B.Sc. Computer Systems & Networking</span>
              <span className="text-xs text-[var(--muted)]">Curtin University | CWA 79.57%</span>
            </li>
          </ul>
        </Card>
      </div>
      <div className="card overflow-hidden p-0">
        <img
          src="/img/npf-photo.png"
          alt="Naveen portrait"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  </Section>
);

const Skills = () => (
  <Section
    id="skills"
    title="Skills matrix"
    eyebrow="Capabilities"
    description="Capabilities grouped by outcome rather than tools. Each skill includes the context where it delivered value."
  >
    <div className="grid auto-rows-fr gap-4 md:grid-cols-2">
      {skillsContent.capabilities.map((capability) => (
        <Card
          key={capability.capability}
          title={capability.capability}
          subtitle={capability.narrative}
          actions={
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-100">
              {capabilityIconFor(capability.capability)}
            </div>
          }
          className="flex h-full flex-col"
        >
          <div className="flex flex-wrap gap-2">
            {capability.skills.map((skill) => (
              <div key={skill.name} className="flex flex-col gap-1 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 shadow-sm">
                <div className="flex items-center gap-2">
                  <Badge tone={levelTone[skill.level]}>{levelLabel[skill.level]}</Badge>
                  <p className="text-sm font-semibold text-[var(--text)]">{skill.name}</p>
                </div>
                <p className="text-xs text-[var(--muted)]">{skill.context}</p>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  </Section>
);

const Projects = () => {
  return (
    <Section
      id="projects"
      title="Architecture-driven projects"
      eyebrow="Projects"
      description="Each project highlights the problem, the chosen architecture, the trade-offs made, and current status."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {projectsContent.map((project) => (
          <Card
            key={project.name}
            title={project.name}
            subtitle={project.problem}
            className="flex flex-col justify-between"
          >
            <div className="space-y-3">
              {project.architecture && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                    Architecture
                  </p>
                  <p>{project.architecture}</p>
                </div>
              )}
              {!!project.tools?.length && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                    Tools
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <Badge key={tool} tone="info">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {!!project.tradeOffs?.length && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                    Trade-offs
                  </p>
                  <ul className="space-y-2 list-spaced">
                    {project.tradeOffs.map((tradeOff) => (
                      <li key={tradeOff} className="flex items-start gap-2">
                        <Layers className="mt-0.5 h-4 w-4 text-primary-500" aria-hidden="true" />
                        <span>{tradeOff}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Badge tone="success">{project.status}</Badge>
              {!!project.links?.length && (
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition hover:text-primary-500"
                    >
                      {link.label}
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

const LiveGitHub = () => {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const username = import.meta.env.VITE_GITHUB_USERNAME || 'NPFernando';

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [p, r] = await Promise.all([getGitHubProfile(), getRecentRepos(6)]);
      setProfile(p);
      setRepos(r);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const SkeletonLine = ({ className = '' }: { className?: string }) => (
    <div className={`h-3 rounded-full bg-[var(--border)]/70 animate-pulse ${className}`} />
  );

  return (
    <Section
      id="github"
      title="Recent repositories"
      eyebrow="Live GitHub data"
      description={`Latest updates for ${username}. Provide a token via env to avoid rate limits.`}
    >
      <div className="card space-y-4 border-[var(--border)] bg-[var(--card)]/90 p-4 shadow-card">
        <div className="grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
          <Card
            title={profile?.name || username}
            subtitle={profile?.bio || 'GitHub profile'}
            className="h-full bg-transparent shadow-none border-0"
            actions={
              <a
                href={profile?.html_url || `https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-2 text-xs font-semibold text-[var(--muted)] transition hover:border-primary-200 hover:text-primary-600"
              >
                View profile
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            }
          >
            {loading && (
              <div className="space-y-3">
                <SkeletonLine className="w-2/3" />
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2].map((item) => (
                    <div key={item} className="rounded-xl border border-[var(--border)] p-3">
                      <SkeletonLine className="w-1/2" />
                      <SkeletonLine className="mt-2 w-1/3" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {error && (
              <div className="flex items-center justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
                <span>Could not load GitHub data. Check your token or rate limits ({error}).</span>
                <button
                  type="button"
                  onClick={loadData}
                  className="inline-flex items-center gap-1 rounded-full border border-red-500/40 px-2 py-1 text-xs font-semibold hover:bg-red-500/10"
                >
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                  Retry
                </button>
              </div>
            )}
            {!loading && !error && profile && (
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[var(--border)] p-3">
                    <p className="text-xs text-[var(--muted)]">Followers</p>
                    <p className="text-lg font-semibold">{profile.followers}</p>
                  </div>
                  <div className="rounded-xl border border-[var(--border)] p-3">
                    <p className="text-xs text-[var(--muted)]">Public repos</p>
                    <p className="text-lg font-semibold">{profile.public_repos}</p>
                  </div>
                </div>
                {profile.location && (
                  <p className="text-xs text-[var(--muted)]">Location: {profile.location}</p>
                )}
              </div>
            )}
            {!loading && !error && !profile && <p>No profile data available.</p>}
          </Card>

          <div className="space-y-2">
            {loading && (
              <div className="grid gap-3 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 p-4 shadow-sm">
                    <SkeletonLine className="w-2/3" />
                    <SkeletonLine className="mt-2 w-1/2" />
                    <div className="mt-3 space-y-2">
                      <SkeletonLine className="w-1/4" />
                      <SkeletonLine className="w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {error && (
              <div className="flex items-center justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
                <span>Could not load repos. {error}</span>
                <button
                  type="button"
                  onClick={loadData}
                  className="inline-flex items-center gap-1 rounded-full border border-red-500/40 px-2 py-1 text-xs font-semibold hover:bg-red-500/10"
                >
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                  Retry
                </button>
              </div>
            )}
            {!loading && !error && repos.length === 0 && <p>No recent repositories found.</p>}
            {!loading && !error && repos.length > 0 && (
              <div className="grid gap-3 md:grid-cols-2">
                {repos.map((repo) => (
                  <div key={repo.id} className="rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-primary-600 hover:text-primary-500"
                      >
                        {repo.name}
                      </a>
                      <Badge tone="info">{repo.language || 'N/A'}</Badge>
                    </div>
                    <p className="mt-2 text-xs text-[var(--muted)]">{repo.description || 'No description'}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-[var(--muted)]">
                      <span>Stars: {repo.stargazers_count}</span>
                      <span>Forks: {repo.forks_count}</span>
                      <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

const Learning = () => (
  <Section
    id="learning"
    title="Learning & growth path"
    eyebrow="Continuous improvement"
    description="Current learning tracks, certifications, and experiments to keep the stack future-ready."
  >
    <div className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
      <div className="space-y-4">
        {learningContent.tracks.map((track) => (
          <Card key={track.title} title={track.title} subtitle={`${track.focus} - ETA ${track.eta}`}>
            <ul className="space-y-2 list-spaced">
              {track.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <div className="space-y-4">
        <Card title="Certifications" subtitle="Completed and planned">
          <div className="grid gap-3 sm:grid-cols-2">
            {learningContent.certifications.map((cert) => (
              <div key={cert.title} className="flex items-start gap-2 rounded-xl border border-[var(--border)] p-3">
                <GraduationCap className="mt-0.5 h-4 w-4 text-primary-500" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold">{cert.title}</p>
                  <p className="text-xs text-[var(--muted)] capitalize">{cert.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Experiments" subtitle="Hands-on discovery work">
          <div className="flex flex-wrap gap-2">
            {learningContent.experiments.map((experiment) => (
              <span
                key={experiment}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs font-semibold text-[var(--muted)]"
              >
                <Sparkles className="h-4 w-4 text-primary-500" aria-hidden="true" />
                {experiment}
              </span>
            ))}
          </div>
        </Card>
        <Card title="Roadmap" subtitle="Near-term milestones">
          <div className="relative pl-5">
            <div className="absolute left-1 top-2 bottom-2 w-px bg-[var(--border)]" />
            {learningContent.roadmap.map((item) => (
              <div key={item.milestone} className="relative pb-4 last:pb-0">
                <span className="absolute left-[-6px] top-1 h-3 w-3 rounded-full bg-primary-500" />
                <div className="space-y-1 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 shadow-sm">
                  <p className="text-sm font-semibold">{item.milestone}</p>
                  <p className="text-xs text-[var(--muted)]">{item.impact}</p>
                  <p className="text-xs font-medium text-primary-600">{item.timeline}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </Section>
);

const Contact = () => (
  <Section
    id="contact"
    title="Contact & presence"
    eyebrow="Connect"
    description="Direct, low-friction channels. Email is obfuscated to reduce scraping."
  >
    <div className="grid gap-4 md:grid-cols-3">
      <Card title="Email" subtitle={SITE.emailObfuscated}>
        <a
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-primary-200 hover:text-primary-600"
          href={`mailto:${SITE.email}`}
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Start a thread
        </a>
      </Card>
      <Card title="GitHub" subtitle="Code, experiments, and infra modules">
        <a
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-primary-200 hover:text-primary-600"
          href={SITE.github}
          target="_blank"
          rel="noreferrer"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          Visit profile
        </a>
      </Card>
      <Card title="LinkedIn" subtitle="Professional updates and architecture posts">
        <a
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--muted)] transition hover:border-primary-200 hover:text-primary-600"
          href={SITE.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" />
          Connect
        </a>
      </Card>
    </div>
  </Section>
);

const HomePage = () => {
  const [cvOpen, setCvOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const cvButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleDownloadPdf = () => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.print();
    }
  };

  const handleCloseCv = () => {
    setCvOpen(false);
    cvButtonRef.current?.focus();
  };

  return (
    <>
      <Hero onOpenCV={() => setCvOpen(true)} cvButtonRef={cvButtonRef} />
      <About />
      <Skills />
      {UI_FLAGS.showProjects && <Projects />}
      <LiveGitHub />
      {UI_FLAGS.showLearning && <Learning />}
      <Contact />

      {cvOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="CV preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
          <div className="relative flex h-[80vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-[var(--card)] shadow-card">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-primary-500" aria-hidden="true" />
                  <p className="text-sm font-semibold">CV preview (PDF-ready)</p>
                </div>
                <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)] transition hover:border-primary-200 hover:text-primary-600"
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  aria-label="Close CV modal"
                  onClick={handleCloseCv}
                  className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[var(--muted)] transition hover:border-primary-200 hover:text-primary-600"
                >
                  Close
                </button>
              </div>
            </div>
            <iframe
              title="CV preview"
              src={SITE.resumeUrl}
              ref={iframeRef}
              className="h-full w-full border-0"
              loading="lazy"
            />
            <div className="border-t border-[var(--border)] px-4 py-3 text-xs text-[var(--muted)]">
              Tip: Download uses your browser&apos;s print-to-PDF with A4 sizing from the CV.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
