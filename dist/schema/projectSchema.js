"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectUpdateSchema = exports.projectSchema = void 0;
const zod_1 = require("zod");
exports.projectSchema = zod_1.z.object({
    number: zod_1.z.number().min(1),
    title: zod_1.z.string().min(2).max(100),
    roomId: zod_1.z.number().min(1),
});
exports.projectUpdateSchema = exports.projectSchema.partial();
//# sourceMappingURL=projectSchema.js.map