import { z } from 'zod';
export declare const roomSchema: z.ZodObject<{
    name: z.ZodString;
    x: z.ZodNumber;
    y: z.ZodNumber;
    description: z.ZodString;
    capacity: z.ZodNumber;
    type: z.ZodString;
    building: z.ZodString;
    path: z.ZodOptional<z.ZodAny>;
    projects: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
}, z.core.$strip>;
export declare const roomUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    y: z.ZodOptional<z.ZodNumber>;
    x: z.ZodOptional<z.ZodNumber>;
    description: z.ZodOptional<z.ZodString>;
    capacity: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodString>;
    building: z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodOptional<z.ZodAny>>;
}, z.core.$strip>;
//# sourceMappingURL=roomSchema.d.ts.map