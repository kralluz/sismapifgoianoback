import { z } from 'zod';
export declare const projectSchema: z.ZodObject<{
    number: z.ZodNumber;
    title: z.ZodString;
    roomId: z.ZodNumber;
}, z.core.$strip>;
export declare const projectUpdateSchema: z.ZodObject<{
    number: z.ZodOptional<z.ZodNumber>;
    title: z.ZodOptional<z.ZodString>;
    roomId: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=projectSchema.d.ts.map