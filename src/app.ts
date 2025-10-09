import express from 'express';
import swaggerUi from 'swagger-ui-express';
import authRouter from './routers/authRouter';
import roomRouter from './routers/roomRouter';
import projectRouter from './routers/projectRouter';
import cors from 'cors';
import path from 'path';

const swaggerDocument = require(path.join(process.cwd(), 'swagger-output.json'));

const app = express();

// CORS configuration (configurable via env)
// Set CORS_ORIGINS to a comma-separated list of allowed origins (e.g. https://example.com,https://app.example.com)
const rawOrigins = process.env.CORS_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000';
const allowedOrigins = rawOrigins.split(',').map(o => o.trim()).filter(Boolean);

// Allow all origins (be careful in production)
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json());

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRouter);
app.use('/api/room', roomRouter);
app.use('/api/project', projectRouter);

export default app;