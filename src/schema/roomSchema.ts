import {z} from 'zod';

export const roomSchema = z.object({
  name: z.string().min(2).max(100),
  x: z.number().min(0),
  y: z.number().min(0),
  description: z.string().max(500),
  capacity: z.number().min(1),
  type: z.string().max(50),
  floor: z.number().min(0),
  building: z.string().max(100),
  amenities: z.array(z.string().max(100)),
  path: z.any().optional(),
  projects: z.array(z.number().int()).optional()

});

export const roomUpdateSchema = roomSchema.partial().omit({ projects: true });
