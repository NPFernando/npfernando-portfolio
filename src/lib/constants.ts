export const SITE = {
  name: 'Naveen Fernando',
  role: 'Automation & Systems Engineer',
  location: 'Colombo, Sri Lanka',
  focusAreas: [
    'Workflow orchestration (Rewst, n8n, Power Automate)',
    'Cloud automation (Azure/AWS/GWS)',
    'Identity & lifecycle automation',
  ],
  summary:
    'Automation & Systems Engineer at Platinum Technology, working remotely from Sri Lanka on MSP workflow automation, API integrations, identity lifecycle automation, and operations tooling across Rewst, n8n, Power Automate, Python, PowerShell, TypeScript, and Azure/AWS/GWS.',
  resumeUrl: '/cv/index.html',
  email: 'fernandonaveen2000@gmail.com',
  emailObfuscated: 'fernandonaveen2000 [at] gmail.com',
  github: 'https://github.com/NPFernando',
  linkedin: 'https://www.linkedin.com/in/npfernando',
  contentVersion: '2025.12.16',
};

export const CURRENT_FOCUS = [
  'MSP workflow automation and service desk runbooks',
  'n8n, Rewst, and Power Automate workflow design',
  'API/webhook integrations between SaaS and IT operations tools',
  'Entra ID and Microsoft Graph lifecycle automation',
  'Python and PowerShell utilities for daily IT operations',
  'Monitoring, rollback, and reliability guardrails for automations',
];

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
