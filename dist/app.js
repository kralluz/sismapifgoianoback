"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const roomRouter_1 = __importDefault(require("./routers/roomRouter"));
const projectRouter_1 = __importDefault(require("./routers/projectRouter"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const swaggerDocument = require(path_1.default.join(process.cwd(), 'swagger-output.json'));
const app = (0, express_1.default)();
// CORS configuration (configurable via env)
// Set CORS_ORIGINS to a comma-separated list of allowed origins (e.g. https://example.com,https://app.example.com)
const rawOrigins = process.env.CORS_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000';
const allowedOrigins = rawOrigins.split(',').map(o => o.trim()).filter(Boolean);
// Allow all origins (be careful in production)
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express_1.default.json());
app.get('/health', 
// #swagger.tags = ['System']
// #swagger.summary = 'Health check do sistema'
// #swagger.description = 'Endpoint para verificar se a API está funcionando'
/* #swagger.responses[200] = {
  description: 'Sistema funcionando normalmente',
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          status: { type: "string", example: "ok" },
          timestamp: { type: "string", format: "date-time", example: "2023-09-03T10:30:00.000Z" },
          uptime: { type: "number", example: 123.456 }
        }
      }
    }
  }
} */
(req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/auth', authRouter_1.default);
app.use('/api/room', roomRouter_1.default);
app.use('/api/project', projectRouter_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map