import { z } from 'zod';
import { localExists } from '../services/localService';

export const projectSchema = z.object({
  number: z.number().int().min(1).nullish(),
  title: z.string().trim().min(2).max(1000),
  localId: z.string().refine(localExists, { message: 'Local inexistente no catálogo.' }),
  complemento: z.string().trim().max(200).nullish(),
});

export const projectUpdateSchema = projectSchema.partial();
