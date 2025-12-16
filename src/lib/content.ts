import skillsRaw from '@/content/skills.json';
import projectsRaw from '@/content/projects.json';
import learningRaw from '@/content/learning.json';
import {
  LearningDocumentSchema,
  ProjectsDocumentSchema,
  SkillsDocumentSchema,
  type LearningDocument,
  type Project,
  type SkillsDocument,
} from './schema';

export const skillsContent: SkillsDocument = SkillsDocumentSchema.parse(skillsRaw);
export const projectsContent: Project[] = ProjectsDocumentSchema.parse(projectsRaw);
export const learningContent: LearningDocument = LearningDocumentSchema.parse(learningRaw);
