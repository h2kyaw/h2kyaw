import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Collection for technical notes in personal/notes
const notes = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!**/README.md', '!**/readme.md'],
    base: '../personal/notes',
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    summary: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    status: z.string().optional(),
  }),
});

// Collection for engineering writeups & postmortems in personal/projects
const projects = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!**/_templates/**', '!**/README.md', '!**/readme.md'],
    base: '../personal/projects',
  }),
  schema: z.object({
    title: z.string().optional(),
    project: z.string().optional(),
    type: z.string().optional(), // 'adr', 'postmortem', 'feature', 'benchmark'
    date: z.union([z.string(), z.date()]).optional(),
    summary: z.string().optional(),
    scope: z.string().optional(),
    severity: z.string().optional(),
    status: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// Collection for reusable snippets in personal/snippets
const snippets = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!**/README.md', '!**/readme.md'],
    base: '../personal/snippets',
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    summary: z.string().optional(),
    language: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
  }),
});

export const collections = {
  notes,
  projects,
  snippets,
};
