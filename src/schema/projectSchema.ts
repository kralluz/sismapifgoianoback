import { title } from 'process';
import {z} from 'zod';

export const projectSchema = z.object({
  title: z.string().min(2).max(100),
  type: z.string().max(50),
  startAt: z.string().transform((s) => new Date(s)),
  endAt: z.string().transform((s) => new Date(s)),
  roomId: z.number().min(1),
});