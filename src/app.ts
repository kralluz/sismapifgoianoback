import express from 'express';
import swaggerUi from 'swagger-ui-express';
import authRouter from './routers/authRouter';
import roomRouter from './routers/roomRouter';
import projectRouter from './routers/projectRouter';
import cors from 'cors';
import path from 'path';

const swaggerDocument = require(path.join(process.cwd(), 'swagger-output.json'));

const app = express();

// CORS configuration for development
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', // Vite default port
    'http://localhost:4173', // Vite preview port
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json());

app.get('/health', (req, res) => {
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