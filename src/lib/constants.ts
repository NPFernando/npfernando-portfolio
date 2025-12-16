export const SITE = {
  name: 'Naveen Fernando',
  role: 'Automation & Systems Engineer',
  location: 'Colombo, Sri Lanka',
  focusAreas: [
    'Workflow orchestration (Rewst, n8n, Python)',
    'Cloud automation (Azure/AWS)',
    'Identity & lifecycle automation',
  ],
  summary:
    'Automation & Systems Engineer (B.Sc. Computer Systems & Networking) delivering multi-tenant workflow automation across Python, Rewst, n8n, PowerShell, and Azure/AWS to reduce operational toil for MSP teams.',
  resumeUrl: '/cv/index.html',
  email: 'fernandonaveen2000@gmail.com',
  emailObfuscated: 'fernandonaveen2000 [at] gmail.com',
  github: 'https://github.com/NPFernando',
  linkedin: 'https://www.linkedin.com/in/npfernando',
  contentVersion: '2025.12.16',
};

export const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'learning', label: 'Learning' },
  { id: 'contact', label: 'Contact' },
];

export const FEATURE_FLAGS = {
  azureFunctionsReady: true,
  entraIdReady: true,
  featureFlagScaffolding: true,
  telemetryHooks: true,
};

export const UI_FLAGS = {
  showProjects: import.meta.env.VITE_SHOW_PROJECTS !== 'false',
  showLearning: import.meta.env.VITE_SHOW_LEARNING !== 'false',
};

export const CTA_LINKS = [
  { label: 'GitHub', href: 'https://github.com/NPFernando' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/npfernando' },
  { label: 'Email', href: 'mailto:fernandonaveen2000@gmail.com' },
];
