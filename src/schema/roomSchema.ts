import {z} from 'zod';

export const roomSchema = z.object({
  name: z.string().min(2).max(100),
  x: z.number(),
  y: z.number(),
  description: z.string().max(500),
  capacity: z.number().min(1),
  type: z.string().max(50),
  building: z.string().max(100),
  path: z.any().optional(),
  projects: z.array(z.number().int()).optional()

});

export const roomUpdateSchema = roomSchema.partial().omit({ projects: true });
