import { z } from 'zod';

export const skillLevelEnum = z.enum(['foundation', 'working', 'advanced', 'expert']);

const LinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const SkillSchema = z.object({
  name: z.string(),
  level: skillLevelEnum,
  context: z.string(),
});

const CapabilitySchema = z.object({
  capability: z.string(),
  narrative: z.string(),
  skills: z.array(SkillSchema),
});

export const SkillsDocumentSchema = z.object({
  updated: z.string(),
  capabilities: z.array(CapabilitySchema),
});

export const ProjectSchema = z.object({
  name: z.string(),
  problem: z.string(),
  architecture: z.string(),
  tools: z.array(z.string()),
  tradeOffs: z.array(z.string()).optional(),
  status: z.string(),
  links: z.array(LinkSchema).optional(),
});

export const ProjectsDocumentSchema = z.array(ProjectSchema);

const LearningTrackSchema = z.object({
  title: z.string(),
  focus: z.string(),
  eta: z.string(),
  items: z.array(z.string()),
});

const CertificationSchema = z.object({
  title: z.string(),
  status: z.enum(['completed', 'planned']),
});

const RoadmapItemSchema = z.object({
  milestone: z.string(),
  impact: z.string(),
  timeline: z.string(),
});

export const LearningDocumentSchema = z.object({
  tracks: z.array(LearningTrackSchema),
  certifications: z.array(CertificationSchema),
  experiments: z.array(z.string()),
  roadmap: z.array(RoadmapItemSchema),
});

export type SkillLevel = z.infer<typeof skillLevelEnum>;
export type Skill = z.infer<typeof SkillSchema>;
export type Capability = z.infer<typeof CapabilitySchema>;
export type SkillsDocument = z.infer<typeof SkillsDocumentSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type LearningDocument = z.infer<typeof LearningDocumentSchema>;
