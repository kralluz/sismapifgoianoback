"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomUpdateSchema = exports.roomSchema = void 0;
const zod_1 = require("zod");
exports.roomSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(100),
    x: zod_1.z.number(),
    y: zod_1.z.number(),
    description: zod_1.z.string().max(500),
    capacity: zod_1.z.number().min(1),
    type: zod_1.z.string().max(50),
    building: zod_1.z.string().max(100),
    path: zod_1.z.any().optional(),
    projects: zod_1.z.array(zod_1.z.number().int()).optional()
});
exports.roomUpdateSchema = exports.roomSchema.partial().omit({ projects: true });
//# sourceMappingURL=roomSchema.js.map