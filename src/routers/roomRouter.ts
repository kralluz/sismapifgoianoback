import { Router } from 'express';
import { getRooms, createRoom } from '../controllers/roomController';
import { authenticateToken, requireAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Rota protegida - qualquer usuário logado
router.get('/', authenticateToken, getRooms);

// Rota protegida - apenas admin
router.post('/', authenticateToken, requireAdmin, createRoom);

export default router;