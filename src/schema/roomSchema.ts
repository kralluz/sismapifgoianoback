import {z} from 'zod';

export const roomSchema = z.object({
  name: z.string().min(2).max(100),
  x: z.number(),
  y: z.number(),
  description: z.string().max(500),
  path: z.any().optional(),
  projects: z.array(z.number().int()).optional()

});

export const roomUpdateSchema = roomSchema.partial().omit({ projects: true });
