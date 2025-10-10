import {z} from 'zod';

export const projectSchema = z.object({
  number: z.number().min(1),
  title: z.string().min(2).max(1000),
  roomId: z.number().min(1),
});

export const projectUpdateSchema = projectSchema.partial();