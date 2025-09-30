import express from 'express';
import swaggerUi from 'swagger-ui-express';
import authRouter from './routers/authRouter';
import roomRouter from './routers/roomRouter';
import projectRouter from './routers/projectRouter';
import cors from 'cors';
import path from 'path';

const swaggerDocument = require(path.join(process.cwd(), 'swagger-output.json'));

const app = express();

// Middleware para logging de requisições
app.use((req, res, next) => {
  console.log('=== Nova Requisição Recebida ===');
  console.log('Método:', req.method);
  console.log('URL:', req.url);
  console.log('Origin:', req.headers.origin);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  console.log('================================');
  next();
});

// CORS configuration for development
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', // Vite default port
    'http://localhost:5174', // Vite alternative port
    'http://localhost:4173', // Vite preview port
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:3000'
  ],
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