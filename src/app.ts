import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import authRouter from './routers/authRouter';
import roomRouter from './routers/roomRouter';
import projectRouter from './routers/projectRouter';
const swaggerDocument = require('../swagger-output.json');

const app = express();

// Configurar CORS para permitir todas as origens
app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sem origin (como mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Permitir todas as origens em desenvolvimento
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Access-Control-Request-Method', 'Access-Control-Request-Headers'],
  credentials: true,
  optionsSuccessStatus: 200 // Para browsers antigos
}));

// Middleware adicional para OPTIONS requests
app.options('*', cors());

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