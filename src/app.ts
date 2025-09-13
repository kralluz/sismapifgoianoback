import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import authRouter from './routers/authRouter';
import roomRouter from './routers/roomRouter';
import projectRouter from './routers/projectRouter';
const swaggerDocument = require('../swagger-output.json');

const app = express();

// CORS configurado para permitir Content-Type
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime() 
  });
});

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRouter);
app.use('/api/room', roomRouter);
app.use('/api/project', projectRouter);

export default app;